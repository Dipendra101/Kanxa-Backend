// index.js

// 1. Load Environment Variables
require('dotenv').config();

// 2. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// 3. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5050;

// 4. Setup Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug log to confirm env vars
console.log('PORT:', PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Missing');

// 5. Connect to MongoDB and start server only after successful connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB.');

    // 6. Define API Routes
    app.use('/api/auth', authRoutes);

    // Test route
    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the Kanxa Safari API! 🐘' });
    });

    // 7. Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is up and running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });
