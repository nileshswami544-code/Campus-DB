const dataAccess = require('../models/dataAccess');

/**
 * Get Student's Subjects
 */
exports.getStudentSubjects = async (req, res) => {
  try {
    const studentId = req.user.userId; // From auth middleware
    
    const enrollments = await dataAccess.getStudentSubjects(studentId);
    
    res.status(200).json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    console.error('Get student subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Enroll in Subject
 */
exports.enrollSubject = async (req, res) => {
  try {
    const { subjectId } = req.body;
    const studentId = req.user.userId;
    
    const enrollment = await dataAccess.enrollStudent(studentId, subjectId);
    
    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Enroll subject error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

/**
 * Unenroll from Subject
 */
exports.unenrollSubject = async (req, res) => {
  try {
    const { subjectId } = req.body;
    const studentId = req.user.userId;
    
    const unenrolled = await dataAccess.unenrollStudent(studentId, subjectId);
    
    if (!unenrolled) {
      return res.status(400).json({
        success: false,
        message: 'Not enrolled in this subject'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Unenrolled successfully'
    });
  } catch (error) {
    console.error('Unenroll subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};