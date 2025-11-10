// src/components/admin/SubjectManagement.jsx
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { 
  FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiChevronDown,
  FiUpload, FiDownload, FiX, FiCheck, FiAlertCircle
} from 'react-icons/fi';

const SubjectManagement = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    course: 'BTech',
    department: 'CSE',
    year: '1st',
    sem: '1',
    description: '',
    credits: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSem, setFilterSem] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  // Filter subjects based on search and filters
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !filterCourse || subject.course === filterCourse;
    const matchesDepartment = !filterDepartment || subject.department === filterDepartment;
    const matchesYear = !filterYear || subject.year === filterYear;
    const matchesSem = !filterSem || subject.sem === filterSem;
    
    return matchesSearch && matchesCourse && matchesDepartment && matchesYear && matchesSem;
  });

  // Get unique values for filters
  const courses = [...new Set(subjects.map(s => s.course))];
  const departments = [...new Set(subjects.map(s => s.department))];
  const years = [...new Set(subjects.map(s => s.year))];
  const semesters = [...new Set(subjects.map(s => s.sem))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required';
    }
    
    if (!formData.credits.trim() || isNaN(formData.credits) || formData.credits <= 0) {
      newErrors.credits = 'Credits must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingSubject) {
        updateSubject(editingSubject.id, formData);
      } else {
        addSubject(formData);
      }
      
      resetForm();
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving subject:', error);
      setErrors({
        ...errors,
        form: 'Failed to save subject. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      course: 'BTech',
      department: 'CSE',
      year: '1st',
      sem: '1',
      description: '',
      credits: ''
    });
    setIsFormOpen(false);
    setEditingSubject(null);
    setErrors({});
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      course: subject.course,
      department: subject.department,
      year: subject.year,
      sem: subject.sem,
      description: subject.description || '',
      credits: subject.credits || ''
    });
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    deleteSubject(id);
    setDeleteConfirm(null);
  };

  const handleBulkImport = () => {
    // In a real app, this would parse the CSV and add subjects
    alert('Bulk import functionality would be implemented here');
    setIsBulkImportOpen(false);
    setCsvFile(null);
  };

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV
    alert('Export functionality would be implemented here');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCourse('');
    setFilterDepartment('');
    setFilterYear('');
    setFilterSem('');
  };

   if (subjects.length === 0 && !loading) {
         return (
           <div className="p-6">
             <div className="mb-6">
               <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subject Management</h1>
               <p className="text-gray-600 dark:text-gray-400">Manage subjects for all courses and departments</p>
             </div>
     
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
               <FiBook className="text-4xl text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No subjects found</h3>
               <p className="text-gray-600 dark:text-gray-400 mb-6">
                 Get started by adding your first subject.
               </p>
               <button
                 onClick={() => setIsFormOpen(true)}
                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
               >
                 Add Your First Subject
               </button>
             </div>
           </div>
         );
       }
  return (

    
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subject Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage subjects for all courses and departments</p>
      </div>
      
      {saveSuccess && (
        <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-400 p-4">
          <p>Subject saved successfully!</p>
        </div>
      )}
      
      {errors.form && (
        <div className="mb-6 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4">
          <p>{errors.form}</p>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
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
            <FiChevronDown className={`ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsBulkImportOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FiUpload className="mr-2" />
              Bulk Import
            </button>
            
            <button
              onClick={handleExportCSV}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiDownload className="mr-2" />
              Export
            </button>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <FiPlus className="mr-2" />
              Add Subject
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              
              <select
                value={filterSem}
                onChange={(e) => setFilterSem(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
              >
                <option value="">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Results Count */}
      <div className="mb-4 text-gray-600 dark:text-gray-400">
        Showing {filteredSubjects.length} of {subjects.length} subjects
      </div>
      
      {/* Subjects Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <tr key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{subject.name}</div>
                        {subject.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {subject.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {subject.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {subject.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {subject.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {subject.sem}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {subject.credits || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(subject)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(subject.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <FiAlertCircle className="text-4xl text-gray-300 mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">No subjects found</p>
                      <button
                        onClick={clearFilters}
                        className="mt-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add/Edit Subject Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Data Structures"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="BTech">BTech</option>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                      <option value="MTech">MTech</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="CSE">CSE</option>
                      <option value="Civil">Civil</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Semester
                    </label>
                    <select
                      name="sem"
                      value={formData.sem}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Credits *
                    </label>
                    <input
                      type="number"
                      name="credits"
                      value={formData.credits}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.credits ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 4"
                      min="1"
                      max="10"
                    />
                    {errors.credits && (
                      <p className="text-red-500 text-sm mt-1">{errors.credits}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Brief description of the subject..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : (editingSubject ? 'Update' : 'Add')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
                <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Subject</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this subject? This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bulk Import Modal */}
      {isBulkImportOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Bulk Import Subjects</h3>
              <button
                onClick={() => setIsBulkImportOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Upload a CSV file with subject information. The file should contain columns for name, course, department, year, semester, and credits.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {csvFile ? csvFile.name : 'Choose a CSV file or drag and drop'}
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                >
                  Select File
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsBulkImportOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkImport}
                disabled={!csvFile}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;