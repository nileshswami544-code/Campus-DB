const dataAccess = require('../models/dataAccess');
const path = require('path');

/**
 * Get All Materials
 */
exports.getAllMaterials = async (req, res) => {
  try {
    const { subjectId } = req.query;
    
    const materials = await dataAccess.getAllMaterials(subjectId);
    
    res.status(200).json({
      success: true,
      data: materials
    });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Get Materials by Subject
 */
exports.getMaterialsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    
    const materials = await dataAccess.getAllMaterials(subjectId);
    
    res.status(200).json({
      success: true,
      data: materials
    });
  } catch (error) {
    console.error('Get materials by subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Upload Material
 */
exports.uploadMaterial = async (req, res) => {
  try {
    const { subjectId, title, type } = req.body;
    const file = req.file;
    
    // Validation
    if (!subjectId || !title || !type || !file) {
      return res.status(400).json({
        success: false,
        message: 'Subject ID, title, type, and file are required'
      });
    }
    
    // Create file URL (in production, upload to cloud storage)
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUrl = `/uploads/${fileName}`;
    
    // Move file to uploads folder
    const fs = require('fs');
    fs.renameSync(file.path, path.join('uploads', fileName));
    
    const newMaterial = await dataAccess.createMaterial({
      subjectId,
      title,
      type,
      fileUrl,
      fileSize: file.size,
      uploadedBy: req.user.userId
    });
    
    res.status(201).json({
      success: true,
      message: 'Material uploaded successfully',
      data: newMaterial
    });
  } catch (error) {
    console.error('Upload material error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Update Material
 */
exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedMaterial = await dataAccess.updateMaterial(id, updateData);
    
    if (!updatedMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Material updated successfully',
      data: updatedMaterial
    });
  } catch (error) {
    console.error('Update material error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Delete Material
 */
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await dataAccess.deleteMaterial(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Material deleted successfully'
    });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};