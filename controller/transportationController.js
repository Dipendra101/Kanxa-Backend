// KanxaSafariBackend/controllers/transportationController.js

const Route = require('../models/Route');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// Search for available vehicles on a specific route and date
exports.searchVehicles = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        if (!from || !to || !date) {
            return res.status(400).json({ status: 'fail', message: 'Please provide from, to, and date.' });
        }

        // Find routes that match the from and to locations
        const routes = await Route.find({ from, to });
        if (routes.length === 0) {
            return res.status(404).json({ status: 'fail', message: 'No routes found for the given locations.' });
        }

        // For simplicity, we'll assume all vehicles can run on all matched routes.
        // A more complex system would have a "ScheduledTrip" model.
        let availableVehicles = await Vehicle.find({ type: { $ne: 'Truck' } }).populate('driver');

        // Check seat availability for each vehicle on the given date
        const travelDate = new Date(date);
        
        const results = await Promise.all(availableVehicles.map(async (vehicle) => {
            const bookings = await Booking.find({ vehicle: vehicle._id, travelDate });
            
            const bookedSeatNumbers = bookings.flatMap(b => b.bookedSeats.map(s => s.seatNumber));
            const availableSeats = vehicle.capacity - bookedSeatNumbers.length;
            
            // Add availability info to the vehicle object
            return {
                ...vehicle.toObject(),
                availableSeats,
                totalSeats: vehicle.capacity,
                bookedSeatNumbers,
                route: routes[0] // Assuming one primary route for now
            };
        }));
        
        res.status(200).json({ status: 'success', data: { availableVehicles: results } });

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { vehicleId, routeId, travelDate, seats } = req.body;
        const userId = req.user._id; // from protect middleware

        // Basic validation
        if (!vehicleId || !routeId || !travelDate || !seats || seats.length === 0) {
            return res.status(400).json({ status: 'fail', message: 'Missing required booking information.'});
        }
        
        const vehicle = await Vehicle.findById(vehicleId);
        const route = await Route.findById(routeId);
        if (!vehicle || !route) {
            return res.status(404).json({ status: 'fail', message: 'Vehicle or Route not found.'});
        }

        // Check for double booking
        const existingBookings = await Booking.find({ vehicle: vehicleId, travelDate });
        const alreadyBooked = existingBookings.flatMap(b => b.bookedSeats.map(s => s.seatNumber));
        const doubleBookedSeat = seats.find(seat => alreadyBooked.includes(seat.seatNumber));

        if (doubleBookedSeat) {
            return res.status(409).json({ status: 'fail', message: `Seat ${doubleBookedSeat.seatNumber} is already booked.`});
        }
        
        const totalPrice = seats.length * route.basePrice;

        const newBooking = await Booking.create({
            user: userId,
            vehicle: vehicleId,
            route: routeId,
            travelDate,
            bookedSeats: seats,
            totalPrice,
            // Payment logic will be handled in a separate step
        });

        res.status(201).json({ status: 'success', data: { booking: newBooking }});

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('vehicle')
            .populate('route')
            .sort({ travelDate: -1 });
        res.status(200).json({ status: 'success', data: { bookings }});
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};