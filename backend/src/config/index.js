require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadPath: process.env.UPLOAD_PATH || './uploads/',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  allowedFileTypes: /jpeg|jpg|png|gif|pdf|doc|docx|ppt|pptx|mp4|avi|mov/,
  nodeEnv: process.env.NODE_ENV || 'development'
};