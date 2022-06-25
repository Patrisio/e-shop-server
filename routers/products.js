const express = require('express');
const {Product} = require('../models/product');
const router = express.Router();

router.post(`/`, async (req, res) => {
    try {
        console.log();
        const {name, image, countInStock} = req.body;
        const product = new Product({
            name,
            image,
            countInStock,
        });
        const createdProduct = await product.save();
    
        res
            .status(201)
            .send(createdProduct);
    } catch (err) {
        res
            .status(500)
            .json({
                err,
                success: false,
            })
    }
});

router.get(`/`, async (req, res) => {
    try {
        const productList = await Product.find();
        if (!productList) {
            return res
                .status(500)
                .send({
                    success: false,
                })
        }

        res
            .status(201)
            .send(productList);
    } catch (err) {
        res
            .status(500)
            .send({
                err,
                success: false,
            })
    }
});

module.exports = router;