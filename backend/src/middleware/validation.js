const { body, validationResult } = require('express-validator');

/**
 * Validate User Registration
 */
const validateRegistration = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
    
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    
  body('role')
    .optional()
    .isIn(['student', 'admin'])
    .withMessage('Role must be either student or admin'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
];

/**
 * Validate User Login
 */
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
    
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
];

/**
 * Validate Subject Creation
 */
const validateSubjectCreation = [
  body('name')
    .notEmpty()
    .withMessage('Subject name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Subject name must be between 2 and 100 characters'),
    
  body('code')
    .notEmpty()
    .withMessage('Subject code is required')
    .isLength({ min: 2, max: 20 })
    .withMessage('Subject code must be between 2 and 20 characters'),
    
  body('courseId')
    .notEmpty()
    .withMessage('Course is required'),
    
  body('departmentId')
    .notEmpty()
    .withMessage('Department is required'),
    
  body('year')
    .notEmpty()
    .withMessage('Year is required'),
    
  body('semester')
    .notEmpty()
    .withMessage('Semester is required'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateSubjectCreation
};
