const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { validateSubjectCreation } = require('../middleware/validation');

// Public route (for getting subjects)
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);

// Protected routes (admin only)
router.post('/', 
  authenticateToken, 
  authorizeRole(['admin']), 
  validateSubjectCreation,
  subjectController.createSubject
);
router.put('/:id', authenticateToken, authorizeRole(['admin']), subjectController.updateSubject);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), subjectController.deleteSubject);

module.exports = router;