// src/components/student/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import SubjectCard from './SubjectCard';
import { 
  FiUser, FiBook, FiCalendar, FiClock, FiTrendingUp, FiAward,
  FiPlay, FiDownload, FiCheckCircle, FiBarChart2, FiTarget,
  FiActivity, FiZap, FiBookOpen, FiMessageSquare, FiHelpCircle, FiSearch, FiBookmark
} from 'react-icons/fi';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { subjects, materials } = useData();
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [recentMaterials, setRecentMaterials] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [completedMaterials, setCompletedMaterials] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentUser && subjects.length > 0) {
      // Filter subjects based on student profile
      const filtered = subjects.filter(subject => 
        subject.course === currentUser.course &&
        subject.department === currentUser.department &&
        subject.year === currentUser.year &&
        subject.sem === currentUser.semester
      );
      setFilteredSubjects(filtered);
      
      // Get recent materials for these subjects
      const subjectIds = filtered.map(s => s.id);
      const recent = materials
        .filter(m => subjectIds.includes(m.subjectId))
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .slice(0, 5);
      setRecentMaterials(recent);
      
      // Mock data for demonstration
      setStudyStreak(7);
      setCompletedMaterials(23);
      setTotalStudyTime(42); // in hours
      
      // Mock upcoming deadlines
      setUpcomingDeadlines([
        { id: 1, title: 'Data Structures Assignment', subject: 'Data Structures', date: '2023-12-15' },
        { id: 2, title: 'OS Lab Project', subject: 'Operating Systems', date: '2023-12-18' },
        { id: 3, title: 'Fluid Mechanics Quiz', subject: 'Fluid Mechanics', date: '2023-12-20' }
      ]);
    }
  }, [currentUser, subjects, materials]);

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isDeadlineSoon = (dateString) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your courses today.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Study Streak</p>
              <p className="text-3xl font-bold">{studyStreak} days</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FiZap className="text-2xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Completed</p>
              <p className="text-3xl font-bold">{completedMaterials}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FiCheckCircle className="text-2xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Study Time</p>
              <p className="text-3xl font-bold">{totalStudyTime}h</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FiClock className="text-2xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Active Courses</p>
              <p className="text-3xl font-bold">{filteredSubjects.length}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <FiBookOpen className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Subjects */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Subjects</h2>
              <Link to="/student/courses" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                View All
              </Link>
            </div>
            
            {filteredSubjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSubjects.map(subject => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiBook className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No subjects found for your profile.</p>
                <Link to="/student/profile" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Update your profile
                </Link>
              </div>
            )}
          </div>
          
          {/* Recent Materials */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Materials</h2>
              <Link to="/student/materials" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                View All
              </Link>
            </div>
            
            {recentMaterials.length > 0 ? (
              <div className="space-y-4">
                {recentMaterials.map(material => (
                  <div key={material.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-4 ${
                        material.type === 'notes' ? 'bg-blue-100 text-blue-600' :
                        material.type === 'ppt' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {material.type === 'notes' ? <FiDownload /> :
                         material.type === 'ppt' ? <FiBook /> :
                         <FiPlay />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">{material.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getSubjectName(material.subjectId)} • {material.type}
                        </p>
                      </div>
                    </div>
                    <Link 
                      to={`/student/subject/${material.subjectId}`}
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiDownload className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No recent materials.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Upcoming Deadlines</h2>
            
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-4">
                {upcomingDeadlines.map(deadline => (
                  <div key={deadline.id} className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      isDeadlineSoon(deadline.date) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FiCalendar />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 dark:text-white">{deadline.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{deadline.subject}</p>
                      <p className={`text-sm ${
                        isDeadlineSoon(deadline.date) ? 'text-red-600 font-medium' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatDate(deadline.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <FiCalendar className="text-3xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">No upcoming deadlines.</p>
              </div>
            )}
          </div>
          
          {/* Study Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Study Progress</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Week</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Month</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This Semester</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/student/progress" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                View Detailed Analytics
              </Link>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link to="/student/search" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiSearch className="text-indigo-600 mr-3" />
                <span className="text-gray-800 dark:text-white">Search Materials</span>
              </Link>
              
              <Link to="/student/bookmarks" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiBookmark className="text-indigo-600 mr-3" />
                <span className="text-gray-800 dark:text-white">Bookmarks</span>
              </Link>
              
              <Link to="/student/discussions" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiMessageSquare className="text-indigo-600 mr-3" />
                <span className="text-gray-800 dark:text-white">Discussion Forum</span>
              </Link>
              
              <Link to="/student/help" className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <FiHelpCircle className="text-indigo-600 mr-3" />
                <span className="text-gray-800 dark:text-white">Help & Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;