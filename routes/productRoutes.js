// KanxaSafariBackend/routes/productRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    getAllProducts, 
    getProductById,
    createOrder,
    getMyOrders
} = require('../controller/productController');

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected user routes
router.post('/orders', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;