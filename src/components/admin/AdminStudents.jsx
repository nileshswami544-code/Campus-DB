import React, { useState } from 'react';
import { FiUsers, FiSearch, FiFilter, FiEdit, FiTrash2, FiMoreVertical, FiMail, FiPhone } from 'react-icons/fi';

const AdminStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      course: 'BTech',
      department: 'CSE',
      year: '2nd',
      semester: '3',
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      course: 'BTech',
      department: 'Civil',
      year: '3rd',
      semester: '5',
      status: 'active',
      joinDate: '2022-08-20'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1234567892',
      course: 'MBA',
      department: 'Finance',
      year: '1st',
      semester: '2',
      status: 'inactive',
      joinDate: '2023-09-10'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !filterCourse || student.course === filterCourse;
    const matchesDepartment = !filterDepartment || student.department === filterDepartment;
    
    return matchesSearch && matchesCourse && matchesDepartment;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Student Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all registered students</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Export Students
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Add Student
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Courses</option>
                <option value="BTech">BTech</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="MTech">MTech</option>
              </select>
              
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electrical">Electrical</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Course</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Year/Sem</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">ID: STU{String(student.id).padStart(4, '0')}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <FiMail className="mr-1 text-gray-400" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <FiPhone className="mr-1" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {student.course}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {student.department}
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {student.year} / Sem {student.semester}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        <FiEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        <FiTrash2 />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;