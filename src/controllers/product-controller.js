const prisma = require('../models/prisma')


exports.addProduct = async (req, res, next) => {
    try {

        const body = req.body
        console.log(body)

        const product = await prisma.product.create({
            data: {
                name: body.name,
                price: body.price,
                type: body.type
            }
        });

        res.status(200).json({ product })


    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    try {

        const products = await prisma.product.findMany();
        return res.status(200).json({ products })


    } catch (err) {
        next(err)
    }
}