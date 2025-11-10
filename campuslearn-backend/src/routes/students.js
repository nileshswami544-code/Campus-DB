const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');

// Protected routes
router.get('/subjects', authenticateToken, studentController.getStudentSubjects);
router.post('/enroll', authenticateToken, studentController.enrollSubject);
router.post('/unenroll', authenticateToken, studentController.unenrollSubject);

module.exports = router;