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

        const newCartItems = body.cartItem.map(item => {
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
                            create: newCartItems
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

exports.deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.cart.delete({
            where: {
                id: parseInt(id, 10)
            }
        });

        res.status(200).json({ result })

    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updateCart = async (req, res, next) => {
    try {

        const { id } = req.params;
        const body = req.body;

        console.log(body)

        // Delete all existing CartItem entries associated with the cart
        await prisma.cartItem.deleteMany({
            where: {
                cartId: parseInt(id, 10)
            }
        });

        const newCartItems = body.cartItem.map(item => {
            delete item.type
            return {
                ...item,
                cartId: parseInt(id, 10)
            }
        })

        // Create new CartItem entries
        await prisma.cartItem.createMany({
            data: newCartItems
        });


        // Add all cartItem to exist cart
        await prisma.cart.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                totalPrice: body.totalPrice,
                eventDate: body.eventDate,
            }
        });

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

exports.getCart = async (req, res, next) => {

    try {

        const carts = await prisma.cart.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                CartItem: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.status(200).json({ carts })

    } catch (err) {
        next(err)
    }
}

exports.getCartById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const cart = await prisma.cart.findUnique({
            where: {
                id: +id
            },
            include: {
                location: true,
                CartItem: {
                    include: {
                        product: true
                    }
                }
            }
        })

        res.status(200).json({cart})

    } catch (err) {
        console.log(err)
        next(err)
    }
}