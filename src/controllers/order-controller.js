const prisma = require('../models/prisma')
const fs = require('fs')
const { upload } = require('../utils/cloudinary-service')

exports.addOrder = async (req, res, next) => {
    try {
        const { type, carts: _carts } = req.body

        // if (!req.file) {
        //     throw new Error('no file found')
        // }
        const carts = JSON.parse(_carts);

        let cloudImageUrl = await upload(req.file.path)

        const payment = await prisma.payment.create({
            data: {
                type: type,
                slipURL: cloudImageUrl
            }
        })

        for (let i = 0; i < carts.length; i++) {

            const orderItems = carts[i].CartItem.map(item => {
                delete item.id
                delete item.product
                delete item.cartId
                return item
            })

            await prisma.order.create({
                data: {
                    totalPrice: carts[i].totalPrice,
                    userId: req.user.id,
                    locationId: carts[i].locationId,
                    paymentId: payment.id,
                    eventDate: carts[i].eventDate,
                    OrderItem: {
                        create: orderItems
                    }
                }
            })
        }

        for (let i = 0; i < carts.length; i++) {
            await prisma.cart.delete({
                where: {
                    id: carts[i].id
                }
            })

        }



        const order = await prisma.order.findMany({
            where: {
                paymentId: payment.id
            },
            include: {
                OrderItem: true
            }
        })

        res.status(200).json({ order });


    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
    }
}

exports.getOrder = async (req, res, next) => {
    try {

        let orders;

        if (req.user.role === 'USER') {
            orders = await prisma.order.findMany({
                where: {
                    userId: req.user.id
                },
                include: {
                    payment: true,
                    OrderItem: {
                        include: {
                            product: true
                        }
                    }
                }
            })
        } else if (req.user.role === 'ADMIN') {
            orders = await prisma.order.findMany({
                include: {
                    user: true,
                    location: true,
                    payment: true,
                    OrderItem: {
                        include: {
                            product: true
                        }
                    }
                }
            })
        }

        // console.log(req.user)
        res.status(200).json({ orders })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updatePaymentStatus = async (req, res, next) => {
    try {

        const { updatedPaymentId, status } = req.body

        const updatedOrder = await prisma.payment.update({
            where: {
                id: updatedPaymentId
            },
            data: {
                status: status
            }
        })
        res.status(200).json({updatedOrder})
    } catch (err) {
        console.log(err)
    }
}