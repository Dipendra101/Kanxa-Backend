// KanxaSafariBackend/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required.'],
        enum: ['Cement', 'Bricks', 'Sand & Gravel', 'Hardware', 'Pipes & Tanks'],
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required.'],
        default: 0,
    },
    images: [{
        type: String, // Array of image URLs
    }],
    // Unit of measurement, e.g., 'per bag', 'per piece', 'per tractor'
    unit: {
        type: String,
        default: 'per piece',
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;