// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { FiSearch, FiFilter, FiBook, FiFileText, FiPlay } from 'react-icons/fi';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { subjects, materials } = useData();
  const [results, setResults] = useState({
    subjects: [],
    materials: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    type: '',
    course: '',
    department: ''
  });

  useEffect(() => {
    if (query) {
      // Search subjects
      const subjectResults = subjects.filter(subject =>
        subject.name.toLowerCase().includes(query.toLowerCase())
      );
      
      // Search materials
      const materialResults = materials.filter(material =>
        material.title.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults({
        subjects: subjectResults,
        materials: materialResults
      });
    }
  }, [query, subjects, materials]);

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Found {results.subjects.length + results.materials.length} results
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'all' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400'
            }`}
          >
            All ({results.subjects.length + results.materials.length})
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'subjects' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400'
            }`}
          >
            Subjects ({results.subjects.length})
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'materials' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400'
            }`}
          >
            Materials ({results.materials.length})
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option value="">All Types</option>
                  <option value="notes">Notes</option>
                  <option value="ppt">Presentations</option>
                  <option value="video">Videos</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course
                </label>
                <select
                  value={filters.course}
                  onChange={(e) => setFilters({...filters, course: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option value="">All Courses</option>
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
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
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
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {(activeTab === 'all' || activeTab === 'subjects') && results.subjects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Subjects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.subjects.map(subject => (
                  <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                        <FiBook className="text-xl text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{subject.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {subject.course} • {subject.department} • {subject.year} Year • Sem {subject.sem}
                        </p>
                        <a
                          href={`/student/subject/${subject.id}`}
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Materials
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'materials') && results.materials.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Materials</h3>
              <div className="space-y-4">
                {results.materials.map(material => (
                  <div key={material.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${
                        material.type === 'notes' ? 'bg-green-100 dark:bg-green-900/30' :
                        material.type === 'ppt' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {material.type === 'notes' ? 
                          <FiFileText className="text-xl text-green-600 dark:text-green-400" /> :
                          material.type === 'ppt' ? 
                          <FiFileText className="text-xl text-blue-600 dark:text-blue-400" /> :
                          <FiPlay className="text-xl text-purple-600 dark:text-purple-400" />
                        }
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">{material.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {getSubjectName(material.subjectId)} • {material.type}
                        </p>
                        <a
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Material
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {results.subjects.length === 0 && results.materials.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;