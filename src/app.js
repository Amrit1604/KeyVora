const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes/api');

// Load env variables early (dotenv already required inside config/env.js but load defensively)
require('dotenv').config();

const app = express();

// CORS Configuration - allow configured frontend origins (comma-separated)
// FRONTEND_ORIGIN example: https://app.example.com,https://*.vercel.app
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Helper to check if origin matches (supports wildcards like *.vercel.app)
function isOriginAllowed(origin) {
  if (!origin) return true; // Allow no-origin (REST tools, same-origin)

  return allowedOrigins.some(allowed => {
    // Exact match
    if (allowed === origin) return true;

    // Wildcard match (e.g., https://*.vercel.app)
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*').replace(/\./g, '\\.');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(origin);
    }

    return false;
  });
}

app.use(cors({
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
}));

// Middleware setup - Increase payload limit for file attachments (base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Simple request logger to help debug incoming POST payloads in production.
// Logs method, path, origin and a trimmed preview of the JSON body (not full contents).
app.use((req, res, next) => {
  try {
    const origin = req.headers.origin || req.headers.host || '-';
    let bodyPreview = '';
    if (req.body) {
      try {
        const json = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        bodyPreview = json.length > 1000 ? json.slice(0, 1000) + '...[truncated]' : json;
      } catch (e) {
        bodyPreview = '[unserializable body]';
      }
    }
    // eslint-disable-next-line no-console
    console.info(`[REQ] ${req.method} ${req.originalUrl} origin=${origin} bodyPreview=${bodyPreview}`);
  } catch (e) {
    // ignore logging errors
  }
  next();
});

// API Routes - All routes now under /api
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'KeyVora API is running' });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;