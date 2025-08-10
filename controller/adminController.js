// KanxaSafariBackend/controllers/adminController.js

const Driver = require('../models/driver');
const Vehicle = require('../models/Vehicle');
const Route = require('../models/Route');

// --- Driver Management ---
exports.createDriver = async (req, res) => {
    try {
        const newDriver = await Driver.create(req.body);
        res.status(201).json({ status: 'success', data: { driver: newDriver } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({ status: 'success', data: { drivers } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// --- Vehicle Management ---
exports.createVehicle = async (req, res) => {
    try {
        const newVehicle = await Vehicle.create(req.body);
        res.status(201).json({ status: 'success', data: { vehicle: newVehicle } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('driver'); // Populate driver details
        res.status(200).json({ status: 'success', data: { vehicles } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// --- Route Management ---
exports.createRoute = async (req, res) => {
    try {
        const newRoute = await Route.create(req.body);
        res.status(201).json({ status: 'success', data: { route: newRoute } });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json({ status: 'success', data: { routes } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};