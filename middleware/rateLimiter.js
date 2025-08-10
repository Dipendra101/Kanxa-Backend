// middleware/rateLimiter.js

const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');

// We need to wait for the mongoose connection to be established
// before we can create the rate limiter.
const mongoConn = mongoose.connection;

let rateLimiter;

// It's safer to wait for the DB connection to be open before initializing the limiter
mongoConn.on('open', () => {
    rateLimiter = new RateLimiterMongo({
        storeClient: mongoConn,
        keyPrefix: 'login_fail_ip', // Tracks failed attempts by IP address
        points: 5, // The user has 5 attempts
        duration: 30 * 60, // The 5 attempts must be within a 30-minute window
        blockDuration: 30 * 60, // If they fail 5 times, they are blocked for 30 minutes
    });
});


const rateLimiterMiddleware = (req, res, next) => {
    // Check if the rate limiter has been initialized
    if (!rateLimiter) {
        // If the DB connection isn't open yet, we'll just let the request through.
        // This is a fallback for the very first few requests before the DB is ready.
        return next();
    }

    rateLimiter.consume(req.ip) // Consume 1 point for each attempt
        .then(() => {
            // Allowed to proceed
            next();
        })
        .catch((rej) => {
            // Blocked
            const secs = Math.ceil(rej.msBeforeNext / 1000);
            const mins = Math.ceil(secs / 60);
            res.status(429).json({ // 429 Too Many Requests
                status: 'fail',
                message: `Too many login attempts. Please try again in ${mins} minutes.`
            });
        });
};

module.exports = rateLimiterMiddleware;