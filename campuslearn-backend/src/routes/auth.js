const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

// Public routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.get('/profile', require('../middleware/auth').authenticateToken, authController.getProfile);
router.put('/profile', require('../middleware/auth').authenticateToken, authController.updateProfile);

module.exports = router;