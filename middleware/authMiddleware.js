// KanxaSafariBackend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes that require a logged-in user
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'Not authorized, no token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ status: 'fail', message: 'Not authorized, token failed.' });
    }
};

// Middleware to restrict access to admins only
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ status: 'fail', message: 'Not authorized as an admin.' });
    }
};