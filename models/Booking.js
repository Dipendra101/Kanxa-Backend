// KanxaSafariBackend/models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true,
    },
    travelDate: {
        type: Date,
        required: true,
    },
    bookedSeats: [{ // An array of seat numbers that the user has booked
        seatNumber: { type: String, required: true },
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
    // Store payment details from Khalti/eSewa if needed
    paymentDetails: {
        type: mongoose.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;