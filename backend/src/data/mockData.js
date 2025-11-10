const bcrypt = require('bcryptjs');

// Hashed passwords for demo users
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Mock users
const users = [
  {
    id: 'user_1',
    name: 'Admin User',
    email: 'admin@campuslearn.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyde4Zzq3/lyzJ.sB/bFqO9cEcyP2zKJ9nEdq7',
    role: 'admin',
    profileImage: 'https://ui-avatars.com/api/?name=Admin&background=random',
    phone: '+1234567890',
    bio: 'System administrator',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'user_2',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyde4Zzq3/lyzJ.sB/bFqO9cEcyP2zKJ9nEdq7',
    role: 'student',
    profileImage: 'https://ui-avatars.com/api/?name=John&background=random',
    phone: '+1234567891',
    bio: 'Computer Science student',
    course: 'BTech',
    department: 'CSE',
    year: '2nd',
    semester: '3',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'user_3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyde4Zzq3/lyzJ.sB/bFqO9cEcyP2zKJ9nEdq7',
    role: 'student',
    profileImage: 'https://ui-avatars.com/api/?name=Jane&background=random',
    phone: '+1234567892',
    bio: 'Computer Science student',
    course: 'BTech',
    department: 'CSE',
    year: '2nd',
    semester: '3',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'user_4',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyde4Zzq3/lyzJ.sB/bFqO9cEcyP2zKJ9nEdq7',
    role: 'student',
    profileImage: 'https://ui-avatars.com/api/?name=Mike&background=random',
    phone: '+1234567893',
    bio: 'MBA student',
    course: 'MBA',
    department: 'Finance',
    year: '1st',
    semester: '2',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  }
];

// Courses
const courses = [
  {
    id: 'course_1',
    name: 'BTech',
    description: 'Bachelor of Technology - 4 year engineering degree',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'course_2',
    name: 'MBA',
    description: 'Master of Business Administration - 2 year postgraduate degree',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'course_3',
    name: 'MCA',
    description: 'Master of Computer Applications - 3 year postgraduate degree',
    createdAt: '2023-10-15T10:30:00Z'
  }
];

// Departments
const departments = [
  {
    id: 'dept_1',
    name: 'CSE',
    courseId: 'course_1',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'dept_2',
    name: 'Civil',
    courseId: 'course_1',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'dept_3',
    name: 'Mechanical',
    courseId: 'course_1',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'dept_4',
    name: 'Electrical',
    courseId: 'course_1',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'dept_5',
    name: 'Finance',
    courseId: 'course_2',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'dept_6',
    name: 'Marketing',
    courseId: 'course_2',
    createdAt: '2023-10-15T10:30:00Z'
  }
];

// Subjects
const subjects = [
  {
    id: 'sub_1',
    name: 'Data Structures',
    code: 'CS301',
    courseId: 'course_1',
    departmentId: 'dept_1',
    year: '2nd',
    semester: '3',
    description: 'Study of data structures and algorithms including arrays, linked lists, stacks, queues, trees, and graphs',
    credits: 4,
    facultyName: 'Dr. Smith',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'sub_2',
    name: 'Database Systems',
    code: 'CS302',
    courseId: 'course_1',
    departmentId: 'dept_1',
    year: '2nd',
    semester: '3',
    description: 'Introduction to database management systems, SQL, and database design principles',
    credits: 4,
    facultyName: 'Dr. Johnson',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'sub_3',
    name: 'Operating Systems',
    code: 'CS303',
    courseId: 'course_1',
    departmentId: 'dept_1',
    year: '3rd',
    semester: '5',
    description: 'Study of operating system concepts, process management, memory management, and file systems',
    credits: 4,
    facultyName: 'Dr. Williams',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'sub_4',
    name: 'Web Development',
    code: 'CS304',
    courseId: 'course_1',
    departmentId: 'dept_1',
    year: '3rd',
    semester: '5',
    description: 'Modern web development technologies including HTML5, CSS3, JavaScript, React, and Node.js',
    credits: 3,
    facultyName: 'Dr. Brown',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'sub_5',
    name: 'Machine Learning',
    code: 'CS305',
    courseId: 'course_1',
    departmentId: 'dept_1',
    year: '4th',
    semester: '7',
    description: 'Introduction to machine learning algorithms, neural networks, and deep learning concepts',
    credits: 4,
    facultyName: 'Dr. Davis',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: 'sub_6',
    name: 'Financial Management',
    code: 'MBA201',
    courseId: 'course_2',
    departmentId: 'dept_5',
    year: '1st',
    semester: '2',
    description: 'Principles of financial management, corporate finance, and investment analysis',
    credits: 3,
    facultyName: 'Dr. Miller',
    createdAt: '2023-10-15T10:30:00Z'
  }
];

// Materials
const materials = [
  {
    id: 'mat_1',
    subjectId: 'sub_1',
    title: 'Introduction to Arrays',
    type: 'notes',
    fileUrl: 'https://example.com/arrays.pdf',
    fileSize: 1024000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'mat_2',
    subjectId: 'sub_1',
    title: 'Linked Lists Tutorial',
    type: 'video',
    fileUrl: 'https://example.com/linkedlists.mp4',
    fileSize: 5120000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-16T10:30:00Z'
  },
  {
    id: 'mat_3',
    subjectId: 'sub_1',
    title: 'Binary Search Trees',
    type: 'ppt',
    fileUrl: 'https://example.com/bst.pptx',
    fileSize: 2048000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-17T10:30:00Z'
  },
  {
    id: 'mat_4',
    subjectId: 'sub_2',
    title: 'Database Normalization',
    type: 'notes',
    fileUrl: 'https://example.com/normalization.pdf',
    fileSize: 1536000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-10T10:30:00Z'
  },
  {
    id: 'mat_5',
    subjectId: 'sub_2',
    title: 'SQL Basics Tutorial',
    type: 'video',
    fileUrl: 'https://example.com/sql-basics.mp4',
    fileSize: 8192000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-12T10:30:00Z'
  },
  {
    id: 'mat_6',
    subjectId: 'sub_3',
    title: 'Process Scheduling Algorithms',
    type: 'notes',
    fileUrl: 'https://example.com/scheduling.pdf',
    fileSize: 2560000,
    uploadedBy: 'user_1',
    uploadDate: '2023-10-08T10:30:00Z'
  }
];

// Student Subjects (Enrollments)
const studentSubjects = [
  {
    id: 'enroll_1',
    studentId: 'user_2',
    subjectId: 'sub_1',
    enrollmentDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'enroll_2',
    studentId: 'user_2',
    subjectId: 'sub_2',
    enrollmentDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'enroll_3',
    studentId: 'user_2',
    subjectId: 'sub_3',
    enrollmentDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'enroll_4',
    studentId: 'user_2',
    subjectId: 'sub_4',
    enrollmentDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'enroll_5',
    studentId: 'user_2',
    subjectId: 'sub_5',
    enrollmentDate: '2023-10-15T10:30:00Z'
  },
  {
    id: 'enroll_6',
    studentId: 'user_3',
    subjectId: 'sub_6',
    enrollmentDate: '2023-10-15T10:30:00Z'
  }
];

module.exports = {
  users,
  courses,
  departments,
  subjects,
  materials,
  studentSubjects
};