const prisma = require('../models/prisma')

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
                    payment: true,
                    OrderItem: {
                        include: {
                            product: true
                        }
                    }
                }
            })
        }

        console.log(req.user)
        res.status(200).json({ orders })

    } catch (err) {
        console.log(err)
        next(err)
    }
}