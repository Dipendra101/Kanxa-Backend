// KanxaSafariBackend/controllers/garageController.js
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create a new service request
// @route   POST /api/garage/requests
// @access  Private
exports.createServiceRequest = async (req, res) => {
    try {
        const { vehicleType, serviceDescription, preferredDate, contactNumber } = req.body;

        if (!vehicleType || !serviceDescription || !contactNumber) {
            return res.status(400).json({ status: 'fail', message: 'Please provide all required fields.' });
        }

        const newRequest = await ServiceRequest.create({
            user: req.user._id,
            vehicleType,
            serviceDescription,
            preferredDate,
            contactNumber,
        });

        res.status(201).json({ status: 'success', data: { request: newRequest } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// @desc    Get all service requests for the logged-in user
// @route   GET /api/garage/my-requests
// @access  Private
exports.getMyServiceRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { requests } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};