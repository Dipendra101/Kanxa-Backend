// KanxaSafariBackend/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); // <-- NEW
const transportationRoutes = require('./routes/transportationRoutes'); // <-- NEW

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB.'))
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/transport', adminRoutes); // <-- NEW
app.use('/api/transport', transportationRoutes); // <-- NEW

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Kanxa Safari API! 🐘' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is up and running on http://localhost:${PORT}`);
});