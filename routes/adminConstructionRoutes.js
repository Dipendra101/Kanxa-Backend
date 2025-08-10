// KanxaSafariBackend/routes/adminConstructionRoutes.js
const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus
} = require('../controller/adminConstructionController');

const router = express.Router();

// All routes here are protected and for admins only
router.use(protect, adminOnly);

// Product management routes
router.route('/products').post(createProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct);

// Order management routes
router.route('/orders').get(getAllOrders);
router.route('/orders/:id/status').put(updateOrderStatus);

module.exports = router;