const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList) {
            return res
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
        return res
            .status(404)
            .send({
                success: false,
                message: 'Категория не может быть создана',
            });
    }

    res
        .status(201)
        .send({
            success: true,
            message: 'Категория создана',
        });
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const category = await Category.findByIdAndDelete(categoryId);
    
        if (!category) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Категория не может быть удалена',
                });
        }
    
        res
            .status(201)
            .send({
                success: true,
                message: 'Категория успешно удалена',
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

module.exports = router;
