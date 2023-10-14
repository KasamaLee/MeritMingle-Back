const prisma = require('../models/prisma')

exports.addToCart = async (req, res, next) => {
    try {

        const body = req.body;

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

        const location = await prisma.location.create({
            data: {
                lat: body.lat,
                lng: body.lng,
                Cart: {
                    create: {
                        totalPrice: body.totalPrice,
                        userId: body.userId,
                        eventDate: body.eventDate,
                        // locationId: location.id,
                        CartItem: {
                            create: body.cartItem
                        }
                    }
                }
            }
        })

        const carts = await prisma.cart.findMany({
            where: {
                userId: body.userId
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