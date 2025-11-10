const jwt = require('jsonwebtoken');
const dataAccess = require('../models/dataAccess');
const config = require('../config');

/**
 * Authenticate JWT Token
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Get user from database
    const user = await dataAccess.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

/**
 * Authorize Role
 */
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };