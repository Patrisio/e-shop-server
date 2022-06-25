const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

exports.Product = Product;
