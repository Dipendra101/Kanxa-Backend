// KanxaSafariBackend/routes/adminGarageRoutes.js
const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
    getAllServiceRequests,
    updateServiceRequest,
} = require('../controller/adminGarageController');

const router = express.Router();

// All routes here are protected and for admins only
router.use(protect, adminOnly);

router.route('/requests').get(getAllServiceRequests);
router.route('/requests/:id').put(updateServiceRequest);

module.exports = router;