const prisma = require('../models/prisma')
const fs = require('fs')
const { upload } = require('../utils/cloudinary-service')


exports.addProduct = async (req, res, next) => {
    try {

        const { name, price, desc, type } = req.body;
        // const newProduct = JSON.parse(_newProduct);

        let cloudImageUrl = await upload(req.file.path)


        const product = await prisma.product.create({
            data: {
                name: name,
                price: +price,
                desc: desc,
                type: type,
                productImage: cloudImageUrl
            }
        });

        res.status(200).json({ product })


    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
    }
}

exports.updateProduct = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name, price, desc } = req.body;


        const request_body = {
            name: name,
            price: +price,
            desc: desc,
        }

        let cloudImageUrl;

        if (req.file) {
            cloudImageUrl = await upload(req.file.path)
            request_body.productImage = cloudImageUrl
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: +id
            },
            data: request_body
        })

        res.status(200).json({ updatedProduct })

    } catch (err) {
        console.log(err)
        next(err)
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
    }
}


exports.deleteProduct = async (req, res, next) => {

    try {
        const { id } = req.params;
        const result = await prisma.product.delete({
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


exports.getProduct = async (req, res, next) => {
    try {

        const products = await prisma.product.findMany();
        return res.status(200).json({ products })


    } catch (err) {
        next(err)
    }
}