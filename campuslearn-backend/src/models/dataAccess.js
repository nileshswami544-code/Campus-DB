const mockData = require('../data/mockData');

/**
 * Data Access Layer - Abstraction for database operations
 * Easy to switch between mock data and real database
 */
class DataAccess {
  constructor() {
    this.useFirebase = false; // Switch to true when Firebase is ready
  }

  // ==================== USER OPERATIONS ====================
  
  async findUserByEmail(email) {
    if (this.useFirebase) {
      // Firebase implementation will go here
      return null;
    }
    return mockData.users.find(user => user.email === email);
  }

  async findUserById(id) {
    if (this.useFirebase) {
      return null;
    }
    return mockData.users.find(user => user.id === id);
  }

  async getAllUsers() {
    if (this.useFirebase) {
      return [];
    }
    return mockData.users;
  }

  async createUser(userData) {
    if (this.useFirebase) {
      return null;
    }
    
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockData.users.push(newUser);
    return newUser;
  }

  async updateUser(id, updateData) {
    if (this.useFirebase) {
      return null;
    }
    
    const index = mockData.users.findIndex(user => user.id === id);
    if (index !== -1) {
      mockData.users[index] = { 
        ...mockData.users[index], 
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      return mockData.users[index];
    }
    return null;
  }

  // ==================== SUBJECT OPERATIONS ====================
  
  async getAllSubjects(filters = {}) {
    if (this.useFirebase) {
      return [];
    }
    
    let subjects = [...mockData.subjects];
    
    // Apply filters
    if (filters.courseId) {
      subjects = subjects.filter(sub => sub.courseId === filters.courseId);
    }
    if (filters.departmentId) {
      subjects = subjects.filter(sub => sub.departmentId === filters.departmentId);
    }
    if (filters.year) {
      subjects = subjects.filter(sub => sub.year === filters.year);
    }
    if (filters.semester) {
      subjects = subjects.filter(sub => sub.semester === filters.semester);
    }
    
    return subjects;
  }

  async getSubjectById(id) {
    if (this.useFirebase) {
      return null;
    }
    return mockData.subjects.find(sub => sub.id === id);
  }

  async createSubject(subjectData) {
    if (this.useFirebase) {
      return null;
    }
    
    const newSubject = {
      id: `sub_${Date.now()}`,
      ...subjectData,
      createdAt: new Date().toISOString()
    };
    
    mockData.subjects.push(newSubject);
    return newSubject;
  }

  async updateSubject(id, updateData) {
    if (this.useFirebase) {
      return null;
    }
    
    const index = mockData.subjects.findIndex(sub => sub.id === id);
    if (index !== -1) {
      mockData.subjects[index] = { ...mockData.subjects[index], ...updateData };
      return mockData.subjects[index];
    }
    return null;
  }

  async deleteSubject(id) {
    if (this.useFirebase) {
      return false;
    }
    
    const index = mockData.subjects.findIndex(sub => sub.id === id);
    if (index !== -1) {
      mockData.subjects.splice(index, 1);
      // Also delete related materials and enrollments
      mockData.materials = mockData.materials.filter(mat => mat.subjectId !== id);
      mockData.studentSubjects = mockData.studentSubjects.filter(enr => enr.subjectId !== id);
      return true;
    }
    return false;
  }

  // ==================== MATERIAL OPERATIONS ====================
  
  async getAllMaterials(subjectId = null) {
    if (this.useFirebase) {
      return [];
    }
    
    let materials = [...mockData.materials];
    
    if (subjectId) {
      materials = materials.filter(mat => mat.subjectId === subjectId);
    }
    
    return materials;
  }

  async getMaterialById(id) {
    if (this.useFirebase) {
      return null;
    }
    return mockData.materials.find(mat => mat.id === id);
  }

  async createMaterial(materialData) {
    if (this.useFirebase) {
      return null;
    }
    
    const newMaterial = {
      id: `mat_${Date.now()}`,
      ...materialData,
      uploadDate: new Date().toISOString()
    };
    
    mockData.materials.push(newMaterial);
    return newMaterial;
  }

  async updateMaterial(id, updateData) {
    if (this.useFirebase) {
      return null;
    }
    
    const index = mockData.materials.findIndex(mat => mat.id === id);
    if (index !== -1) {
      mockData.materials[index] = { ...mockData.materials[index], ...updateData };
      return mockData.materials[index];
    }
    return null;
  }

  async deleteMaterial(id) {
    if (this.useFirebase) {
      return false;
    }
    
    const index = mockData.materials.findIndex(mat => mat.id === id);
    if (index !== -1) {
      mockData.materials.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== STUDENT ENROLLMENT OPERATIONS ====================
  
  async getStudentSubjects(studentId) {
    if (this.useFirebase) {
      return [];
    }
    
    const enrollments = mockData.studentSubjects.filter(enr => enr.studentId === studentId);
    return enrollments.map(enr => {
      const subject = mockData.subjects.find(sub => sub.id === enr.subjectId);
      return { ...enr, subject };
    });
  }

  async enrollStudent(studentId, subjectId) {
    if (this.useFirebase) {
      return null;
    }
    
    // Check if already enrolled
    const existingEnrollment = mockData.studentSubjects.find(
      enr => enr.studentId === studentId && enr.subjectId === subjectId
    );
    
    if (existingEnrollment) {
      throw new Error('Student already enrolled in this subject');
    }
    
    const enrollment = {
      id: `enroll_${Date.now()}`,
      studentId,
      subjectId,
      enrollmentDate: new Date().toISOString()
    };
    
    mockData.studentSubjects.push(enrollment);
    return enrollment;
  }

  async unenrollStudent(studentId, subjectId) {
    if (this.useFirebase) {
      return false;
    }
    
    const index = mockData.studentSubjects.findIndex(
      enr => enr.studentId === studentId && enr.subjectId === subjectId
    );
    
    if (index !== -1) {
      mockData.studentSubjects.splice(index, 1);
      return true;
    }
    return false;
  }

  // ==================== UTILITY METHODS ====================
  
  async getSubjectsByStudentProfile(studentId) {
    if (this.useFirebase) {
      return [];
    }
    
    const student = mockData.users.find(user => user.id === studentId);
    if (!student || student.role !== 'student') {
      return [];
    }
    
    return this.getAllSubjects({
      courseId: student.course,
      departmentId: student.department,
      year: student.year,
      semester: student.semester
    });
  }
}

module.exports = new DataAccess();