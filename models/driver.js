// KanxaSafariBackend/models/Driver.js

const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Driver name is required.'],
        trim: true,
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required.'],
        unique: true,
    },
    licenseNumber: {
        type: String,
        required: [true, 'License number is required.'],
        unique: true,
    },
    photo: {
        type: String, // We'll store the URL of the uploaded image here
        default: 'default-driver.jpg',
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;