const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
});

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
