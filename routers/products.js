const express = require('express');
const {Product} = require('../models/product');
const {Category} = require('../models/category');
const mongoose = require('mongoose');

const router = express.Router();

router.post(`/`, async (req, res) => {
    try {
        const {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated,
        } = req.body;

        const foundCategory = await Category.findById(category);

        if (!foundCategory) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Категория не найдена'
                });
        }
        
        const product = new Product({
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated,
        });
        const createdProduct = await product.save();

        if (!createdProduct) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: 'Продукт не может быть создан'
                });
        }
    
        res
            .status(201)
            .send({
                success: true,
                data: createdProduct,
            });
    } catch (err) {
        res
            .status(500)
            .json({
                err,
                success: false,
            })
    }
});

router.get(`/:productId`, async (req, res) => {
    try {
        const {productId} = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res
                .status(500)
                .send({
                    success: false,
                    message: 'Продукт не найден',
                })
        }

        res
            .status(201)
            .send({
                success: true,
                data: product,
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                err,
            })
    }
});

router.put(`/:productId`, async (req, res) => {
    try {
        const {productId} = req.params;
        const {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated,
        } = req.body;

        const options = {new: true};

        const product = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
            dateCreated,
        }, options);

        if (!product) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Продукт не найден'
                });
        }

        res
            .status(201)
            .send({
                success: true,
                data: product,
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                err,
            })
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!mongoose.isValidObjectId(productId)) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Некорректный productId',
                });
        }

        const product = await Product.findByIdAndDelete(productId);
    
        if (!product) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Продукт не может быть удален',
                });
        }
    
        res
            .status(201)
            .send({
                success: true,
                message: 'Продукт успешно удален',
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                error: err,
            });
    }
});

router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        
        if (!productCount) {
            return res
                .status(500)
                .send({
                    success: false,
                })
        }

        res
            .status(201)
            .send({
                success: true,
                data: productCount,
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                err,
            })
    }
});

router.get('/get/featured/:count', async (req, res) => {
    try {
        const {count} = req.params;
        const featuredProducts = await Product.find({isFeatured: true}).limit(count);
        
        if (!featuredProducts) {
            return res
                .status(500)
                .send({
                    success: false,
                })
        }

        res
            .status(201)
            .send({
                success: true,
                data: featuredProducts,
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                err,
            })
    }
});

router.get('/', async (req, res) => {
    try {
        const {categories} = req.query;
        let filter = {};

        if (categories) {
            filter = {
                category: categories.split(','),
            };
        }
        const featuredProducts = await Product.find(filter).populate('category');
        featuredProducts.map(p => {
            console.log(p.toJSON({virtuals: true}));
        });
        
        if (!featuredProducts) {
            return res
                .status(500)
                .send({
                    success: false,
                })
        }

        res
            .status(201)
            .send({
                success: true,
                data: featuredProducts,
            });
    } catch (err) {
        res
            .status(500)
            .send({
                success: false,
                err,
            })
    }
});

module.exports = router;
