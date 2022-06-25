const express = require('express');
const {Category} = require('../models/category');
const {Product} = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categoryList = await Product.find();
        if (!categoryList) {
            res
                .status(500)
                .send({
                    success: false,
                })
        }
        
        res
            .status(201)
            .send(categoryList);
    } catch (err) {
        res
            .status(500)
            .send({
                err,
                success: false,
            })
    }
});

router.post('/', async (req, res) => {
    const {name, icon, color} = req.body;

    let category = new Category({
        name,
        icon,
        color,
    });

    category = await category.save();

    if (!category) {
        res
            .status(404)
            .send('Категория не может быть создана');
    }

    res
        .status(201)
        .send('Категория создана');
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findByIdAndDelete(categoryId);
    
        if (!category) {
            req
                .status(404)
                .send({
                    success: false,
                    message: 'Категория не может быть удалена',
                });
        }
    
        req
            .status(201)
            .send({
                success: true,
                message: 'Категория успешно удалена',
            });
    } catch (err) {
        req
        .status(500)
        .send({
            success: false,
            error: err,
        });
    }
});

module.exports = router;
