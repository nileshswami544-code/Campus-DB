const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const subjectRoutes = require('./routes/subjects');
const materialRoutes = require('./routes/materials');
const studentRoutes = require('./routes/students');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static(config.uploadPath));

// --------------------
// ✅ API ROUTES
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/students', studentRoutes);

// --------------------
// ✅ Base API route (fix for "Cannot GET /api")
// --------------------
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🚀 CampusLearn API is up and running!',
    availableRoutes: [
      '/api/auth',
      '/api/subjects',
      '/api/materials',
      '/api/students',
      '/api/health'
    ]
  });
});

// --------------------
// ✅ Health check endpoint
// --------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

// --------------------
// ❌ 404 handler for undefined API routes
// --------------------
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl
  });
});

// --------------------
// ⚠️ Error handling middleware
// --------------------
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Handle multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is ' + (config.maxFileSize / (1024 * 1024)) + 'MB'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected field name'
    });
  }

  // Handle validation errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format'
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: config.nodeEnv === 'production' ? 'Internal server error' : err.message
  });
});

module.exports = app;
