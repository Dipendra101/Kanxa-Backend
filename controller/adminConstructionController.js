// KanxaSafariBackend/controllers/adminConstructionController.js
const Product = require('../models/Product');
const Order = require('../models/Order');

// --- Product Management (Admin) ---
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            // Assuming admin user is already verified by middleware
            name: 'Sample Name',
            price: 0,
            description: 'Sample description',
            category: 'Cement',
            stockQuantity: 0,
            ...req.body
        });
        const createdProduct = await product.save();
        res.status(201).json({ status: 'success', data: { product: createdProduct } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.status(200).json({ status: 'success', data: { product: updatedProduct } });
        } else {
            res.status(404).json({ status: 'fail', message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne(); // or remove() depending on version
            res.status(200).json({ status: 'success', message: 'Product removed' });
        } else {
            res.status(404).json({ status: 'fail', message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};

// --- Order Management (Admin) ---
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.orderStatus = req.body.status || order.orderStatus;
            if (req.body.status === 'Delivered') {
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.status(200).json({ status: 'success', data: { order: updatedOrder } });
        } else {
            res.status(404).json({ status: 'fail', message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};