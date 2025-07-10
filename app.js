const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./src/routes/books');
const authRoutes = require('./src/routes/auth'); // ✅ NEW

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Routes
app.use('/books', bookRoutes);
app.use('/auth', authRoutes); // ✅ NEW

module.exports = app;
