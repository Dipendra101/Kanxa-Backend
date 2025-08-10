// KanxaSafariBackend/routes/garageRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    createServiceRequest,
    getMyServiceRequests,
} = require('../controller/garageController');

const router = express.Router();

// All routes here are for logged-in users
router.use(protect);

router.route('/requests').post(createServiceRequest);
router.route('/my-requests').get(getMyServiceRequests);

module.exports = router;