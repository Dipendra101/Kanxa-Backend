// routes/authRoutes.js

const express = require('express');
const authController = require('../controller/authController');
const rateLimiterMiddleware = require('../middleware/rateLimiter');

const router = express.Router();

// Route for user signup
router.post('/signup', authController.signup);

// Route for user login
// We apply the rate limiter middleware here specifically for the login route.
// This means the check will happen before the login logic is ever executed.
router.post('/login', rateLimiterMiddleware, authController.login);

module.exports = router;