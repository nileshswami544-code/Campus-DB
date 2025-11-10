import React from 'react';
import { FiBarChart2, FiTrendingUp, FiUsers, FiBook, FiDownload, FiActivity } from 'react-icons/fi';

const AdminAnalytics = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics & Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">Track platform usage and performance</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">1,250</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FiUsers className="text-2xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Today</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">342</p>
              <p className="text-sm text-green-600">+5% from yesterday</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <FiActivity className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Downloads</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">5,420</p>
              <p className="text-sm text-green-600">+18% from last week</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <FiDownload className="text-2xl text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Courses</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">45</p>
              <p className="text-sm text-gray-600">No change</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <FiBook className="text-2xl text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Engagement</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <FiBarChart2 className="text-4xl mb-2 mx-auto" />
              <p>Chart: User engagement over time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Material Usage</h2>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <FiTrendingUp className="text-4xl mb-2 mx-auto" />
              <p>Chart: Most accessed materials</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Department Performance</h2>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <FiBarChart2 className="text-4xl mb-2 mx-auto" />
            <p>Chart: Performance by department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;