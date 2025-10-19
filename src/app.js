const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes/api');

const app = express();

// CORS Configuration - Allow frontend to communicate
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));

// Middleware setup - Increase payload limit for file attachments (base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes - All routes now under /api
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CodedPad Pro API is running' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;