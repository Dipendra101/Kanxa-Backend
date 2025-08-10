// KanxaSafariBackend/routes/adminRoutes.js

const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { 
    createDriver, 
    getAllDrivers,
    createVehicle,
    getAllVehicles,
    createRoute,
    getAllRoutes
} = require('../controller/adminController');

const router = express.Router();

// All routes in this file are protected and for admins only
router.use(protect, adminOnly);

// Driver routes
router.route('/drivers').post(createDriver).get(getAllDrivers);

// Vehicle routes
router.route('/vehicles').post(createVehicle).get(getAllVehicles);

// Route routes
router.route('/routes').post(createRoute).get(getAllRoutes);

module.exports = router;