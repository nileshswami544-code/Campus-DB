const dataAccess = require('../models/dataAccess');

/**
 * Get All Subjects
 */
exports.getAllSubjects = async (req, res) => {
  try {
    const { course, department, year, semester } = req.query;
    
    const filters = {};
    if (course) filters.courseId = course;
    if (department) filters.departmentId = department;
    if (year) filters.year = year;
    if (semester) filters.semester = semester;
    
    const subjects = await dataAccess.getAllSubjects(filters);
    
    res.status(200).json({
      success: true,
      data: subjects
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Get Subject by ID
 */
exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const subject = await dataAccess.getSubjectById(id);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: subject
    });
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Create New Subject
 */
exports.createSubject = async (req, res) => {
  try {
    const { name, code, courseId, departmentId, year, semester, description, credits, facultyName } = req.body;
    
    // Validation
    if (!name || !code || !courseId || !departmentId || !year || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }
    
    const newSubject = await dataAccess.createSubject({
      name,
      code,
      courseId,
      departmentId,
      year,
      semester,
      description,
      credits: parseInt(credits),
      facultyName
    });
    
    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: newSubject
    });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Update Subject
 */
exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedSubject = await dataAccess.updateSubject(id, updateData);
    
    if (!updatedSubject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Subject updated successfully',
      data: updatedSubject
    });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Delete Subject
 */
exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = await dataAccess.deleteSubject(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};