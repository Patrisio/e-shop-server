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

router.get('/:categoryId', async (req, res) => {
    try {
        const {categoryId} = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Категория не найдена'
                })
        }

        res
        .status(201)
        .send({
            success: true,
            data: category,
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

router.put('/:categoryId', async (req, res) => {
    try {
        const {categoryId} = req.params;
        const {name, color, icon} = req.body;
        const options = {new: true};
        
        const category = await Category.findByIdAndUpdate(categoryId, {
            name,
            color,
            icon,
        },
        options);

        if (!category) {
            return res
                .status(404)
                .send({
                    success: false,
                    message: 'Категория не может быть обновлена',
                });
        }

        res
            .status(201)
            .send({
                success: true,
                data: category,
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
