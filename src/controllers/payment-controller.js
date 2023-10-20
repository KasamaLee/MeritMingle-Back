const fs = require('fs')
const prisma = require('../models/prisma')
const { upload } = require('../utils/cloudinary-service')

// exports.getPayment = async (req, res, next) => {
//     try {

//         const response = await prisma.payment.findMany({
//             where:{
//                 id: 
//             }
//         })

//     } catch (err) {
//         next(err)
//     }
// }

exports.addPayment = async (req, res, next) => {
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

        for(let i = 0; i < carts.length; i++) {

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

        const order = await prisma.order.findMany({
            where: {
                paymentId: payment.id
            },
            include: {
                OrderItem: true
            }
        })

        res.status(200).json({order});


    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
    }
}