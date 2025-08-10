// KanxaSafariBackend/controllers/productController.js

const Product = require('../models/Product');
const Order = require('../models/Order');

// --- PUBLIC: Product Browse ---
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ status: 'success', data: { products } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }
        res.status(200).json({ status: 'success', data: { product } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};


// --- USER: Order Management ---
exports.createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ status: 'fail', message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json({ status: 'success', data: { order: createdOrder } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};