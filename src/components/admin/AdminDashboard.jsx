// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiHome, FiBook, FiFileText, FiUsers, FiTrendingUp, FiCalendar,
  FiDownload, FiUpload, FiSettings, FiLogOut, FiBarChart2,
  FiActivity, FiZap, FiAlertCircle, FiCheckCircle, FiClock,
  FiPlus, FiEye, FiArrowUp, FiArrowDown, FiMoreHorizontal,
  FiRefreshCw
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    );
  }

  const getTrendIcon = () => {
    if (trend === 'up') return <FiArrowUp className="text-green-500" />;
    if (trend === 'down') return <FiArrowDown className="text-red-500" />;
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-2xl text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  );
};

const QuickActionCard = ({ title, description, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group"
  >
    <div className={`inline-flex p-3 rounded-lg ${color} mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="text-2xl text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </button>
);

const ActivityItem = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'success':
        return <FiCheckCircle className="text-green-500" />;
      case 'warning':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'info':
        return <FiClock className="text-blue-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-1">
        {getActivityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          {activity.action}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {activity.item}
        </p>
      </div>
      <span className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
        {activity.time}
      </span>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { subjects, materials, loading, error } = useData();
  const { addToast } = useToast();
  const [stats, setStats] = useState({
    totalSubjects: 0,
    totalMaterials: 0,
    totalStudents: 0,
    activeUsers: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!loading) {
      setStats({
        totalSubjects: subjects.length,
        totalMaterials: materials.length,
        totalStudents: 1250,
        activeUsers: 342
      });
      
      setRecentActivity([
        { id: 1, action: 'New material added', item: 'Data Structures Notes', time: '2 hours ago', type: 'success' },
        { id: 2, action: 'Subject updated', item: 'Operating Systems', time: '5 hours ago', type: 'info' },
        { id: 3, action: 'New student registered', item: 'John Doe', time: '1 day ago', type: 'success' },
        { id: 4, action: 'System maintenance', item: 'Scheduled for tonight', time: '2 days ago', type: 'warning' }
      ]);
    }
  }, [subjects, materials, loading]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addSubject':
        navigate('/admin/subjects');
        addToast('info', 'Navigate to Subjects page');
        break;
      case 'uploadMaterial':
        navigate('/admin/materials');
        addToast('info', 'Navigate to Materials page');
        break;
      case 'manageStudents':
        navigate('/admin/students');
        addToast('info', 'Navigate to Students page');
        break;
      case 'viewAnalytics':
        navigate('/admin/analytics');
        addToast('info', 'Navigate to Analytics page');
        break;
      default:
        break;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    addToast('success', 'Dashboard refreshed');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <StatCard key={i} loading={true} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
        <div className="flex items-center">
          <FiAlertCircle className="text-red-500 mr-3 text-xl" />
          <div>
            <h3 className="text-lg font-medium text-red-800 dark:text-red-400">Error loading data</h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-2 flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <FiRefreshCw className={`mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening on your platform today.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Subjects"
          value={stats.totalSubjects}
          icon={FiBook}
          color="bg-blue-500"
          trend="up"
          trendValue="12%"
          loading={loading}
        />
        <StatCard
          title="Total Materials"
          value={stats.totalMaterials}
          icon={FiFileText}
          color="bg-green-500"
          trend="up"
          trendValue="8%"
          loading={loading}
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={FiUsers}
          color="bg-purple-500"
          trend="up"
          trendValue="15%"
          loading={loading}
        />
        <StatCard
          title="Active Today"
          value={stats.activeUsers}
          icon={FiActivity}
          color="bg-orange-500"
          trend="up"
          trendValue="5%"
          loading={loading}
        />
      </div>
      
      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuickActionCard
                title="Add Subject"
                description="Create a new subject for courses"
                icon={FiPlus}
                color="bg-blue-500"
                onClick={() => handleQuickAction('addSubject')}
              />
              <QuickActionCard
                title="Upload Material"
                description="Add new study materials"
                icon={FiUpload}
                color="bg-green-500"
                onClick={() => handleQuickAction('uploadMaterial')}
              />
              <QuickActionCard
                title="Manage Students"
                description="View and manage student accounts"
                icon={FiUsers}
                color="bg-purple-500"
                onClick={() => handleQuickAction('manageStudents')}
              />
              <QuickActionCard
                title="View Analytics"
                description="Check platform statistics"
                icon={FiBarChart2}
                color="bg-orange-500"
                onClick={() => handleQuickAction('viewAnalytics')}
              />
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Activity</h2>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <FiMoreHorizontal />
            </button>
          </div>
          <div className="space-y-2">
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
//rkd
export default AdminDashboard;