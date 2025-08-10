// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// A helper function to sign a JSON Web Token
const signToken = id => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '90d', // The token will be valid for 90 days
  });
};

// A helper function to create and send the token in the response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from the output for security
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Controller for user signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate that all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Please provide name, email, and password.' 
      });
    }

    // 2. Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ 
            status: 'fail', 
            message: 'An account with this email already exists.' 
        });
    }

    // 3. Create the new user (password will be hashed by the model's pre-save hook)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // 4. Create a token and send it back
    createSendToken(newUser, 201, res); // 201 Created

  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: 'Something went wrong during signup.', 
        error: error.message 
    });
  }
};

// Controller for user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Please provide email and password.' 
    });
    }

    // 2. Find the user and explicitly include the password for comparison
    const user = await User.findOne({ email }).select('+password');

    // 3. Check if user exists and if the password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      // Note: We will apply the rate limiter to the route that uses this controller.
      // The rate limiter will handle blocking the IP before this code is even reached on subsequent attempts.
      return res.status(401).json({ // 401 Unauthorized
        status: 'fail', 
        message: 'Incorrect email or password.' 
      });
    }

    // 4. If everything is correct, send the token to the client
    createSendToken(user, 200, res); // 200 OK

  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: 'Something went wrong during login.', 
        error: error.message 
    });
  }
};