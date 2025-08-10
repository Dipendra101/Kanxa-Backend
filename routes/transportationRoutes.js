// KanxaSafariBackend/routes/transportationRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
    searchVehicles,
    createBooking,
    getMyBookings
} = require('../controller/transportationController');

const router = express.Router();

// Public route to search for vehicles
router.get('/search', searchVehicles);

// Protected routes for booking
router.post('/bookings', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;