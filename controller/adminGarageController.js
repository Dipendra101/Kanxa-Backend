// KanxaSafariBackend/controllers/adminGarageController.js
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Get all service requests
// @route   GET /api/admin/garage/requests
// @access  Admin
exports.getAllServiceRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ status: 'success', data: { requests } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server Error' });
    }
};

// @desc    Update a service request's status and add notes
// @route   PUT /api/admin/garage/requests/:id
// @access  Admin
exports.updateServiceRequest = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const request = await ServiceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ status: 'fail', message: 'Service request not found.' });
        }

        request.status = status || request.status;
        request.adminNotes = adminNotes || request.adminNotes;

        const updatedRequest = await request.save();
        res.status(200).json({ status: 'success', data: { request: updatedRequest } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};