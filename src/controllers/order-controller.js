const prisma = require('../models/prisma')

exports.addToCart = async (req, res, next) => {
    try {


        // const location = await prisma.location.create({
        //     data: {
        //         lat: body.lat,
        //         lng: body.lng
        //     }
        // })

        // const cart = await prisma.cart.create({
        //     data: {
        //         totalPrice: body.totalPrice,
        //         userId: body.userId,
        //         eventDate: body.eventDate,
        //         locationId: location.id,
        //         CartItem: {
        //             create: body.cartItem
        //         }
        //     }
        // })

        const body = req.body;

        const newCartItem = body.cartItem.map(item => {
            delete item.type
            return item
        })

        const location = await prisma.location.create({
            data: {
                lat: body.lat,
                lng: body.lng,
                Cart: {
                    create: {
                        totalPrice: body.totalPrice,
                        userId: req.user.id,
                        eventDate: body.eventDate,
                        // locationId: location.id,
                        CartItem: {
                            create: newCartItem
                        }
                    }
                }
            }
        })

        const carts = await prisma.cart.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                CartItem: true
            }
        })

        res.status(200).json({ carts })

    } catch (err) {
        console.log(err)
        next(err)
    }
}