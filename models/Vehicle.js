// KanxaSafariBackend/models/Vehicle.js

const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
});

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vehicle name is required.'],
        trim: true,
    },
    type: {
        type: String,
        enum: ['Bus', 'Truck', 'Jeep', 'Car'],
        required: true,
    },
    capacity: {
        type: Number,
        required: [true, 'Vehicle capacity is required.'],
    },
    // NEW: Link to the Driver model
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver', // This tells Mongoose to populate from the Driver model
        default: null,
    },
    // An array of seats for buses, jeeps, etc.
    seats: [seatSchema],
    // A unique registration number for the vehicle
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;