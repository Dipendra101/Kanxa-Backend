// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 8,
    select: false, // This ensures the password is not sent back in API responses
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // We will add this field later when building the user profile section
  // profilePicture: {
  //   type: String,
  //   default: 'default-avatar.jpg'
  // },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Mongoose middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Mongoose instance method to compare candidate password with the stored hash
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;