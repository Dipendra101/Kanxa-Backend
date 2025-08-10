// KanxaSafariBackend/models/Route.js

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, 'Origin location is required.'],
        trim: true,
    },
    to: {
        type: String,
        required: [true, 'Destination location is required.'],
        trim: true,
    },
    // The standard duration of the trip in hours (e.g., 8 hours)
    duration: {
        type: Number,
        required: [true, 'Trip duration is required.'],
    },
    // The standard price for a single seat on this route
    basePrice: {
        type: Number,
        required: [true, 'Base price is required.'],
    }
}, {
    timestamps: true,
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;