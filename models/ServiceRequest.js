// KanxaSafariBackend/models/ServiceRequest.js

const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vehicleType: {
        type: String,
        required: [true, 'Vehicle type is required (e.g., Tractor, Heavy Vehicle).'],
        trim: true,
    },
    serviceDescription: {
        type: String,
        required: [true, 'Please describe the service you need.'],
    },
    preferredDate: {
        type: Date,
    },
    contactNumber: {
        type: String,
        required: [true, 'A contact number is required.'],
    },
    status: {
        type: String,
        enum: ['Pending', 'In Review', 'Approved', 'Rejected', 'Completed'],
        default: 'Pending',
    },
    adminNotes: { // For admin to add private notes or a reply
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;