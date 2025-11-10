const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get materials (public for students, protected for upload/delete)
router.get('/', materialController.getAllMaterials);
router.get('/subject/:subjectId', materialController.getMaterialsBySubject);

// Protected routes
router.post('/', 
  authenticateToken, 
  authorizeRole(['admin']), 
  upload.single('file'), 
  materialController.uploadMaterial
);
router.put('/:id', authenticateToken, authorizeRole(['admin']), materialController.updateMaterial);
router.delete('/:id', authenticateToken, authorizeRole(['admin']), materialController.deleteMaterial);

module.exports = router;