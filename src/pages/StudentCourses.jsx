import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import SubjectCard from '../components/student/SubjectCard';
import { FiBook, FiFilter, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const StudentCourses = () => {
  const { currentUser } = useAuth();
  const { subjects } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  // Filter subjects based on student profile and search
  const filteredSubjects = subjects.filter(subject => {
    const matchesProfile = subject.course === currentUser?.course &&
                          subject.department === currentUser?.department &&
                          subject.year === currentUser?.year &&
                          subject.sem === currentUser?.semester;
    
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourseFilter = !filterCourse || subject.course === filterCourse;
    const matchesDepartmentFilter = !filterDepartment || subject.department === filterDepartment;
    
    return matchesProfile && matchesSearch && matchesCourseFilter && matchesDepartmentFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access all your course materials and resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
            />
          </div>
          
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

      {/* Course Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(subject => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiBook className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters to find your courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;