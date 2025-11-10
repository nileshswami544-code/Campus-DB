// src/components/admin/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiBook, FiFileText, FiUsers, FiBarChart2, FiSettings, 
  FiMenu, FiX, FiLogOut, FiChevronDown, FiGrid 
} from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: FiHome,
      description: 'Overview and stats'
    },
    { 
      path: '/admin/subjects', 
      label: 'Subjects', 
      icon: FiBook,
      description: 'Manage subjects'
    },
    { 
      path: '/admin/materials', 
      label: 'Materials', 
      icon: FiFileText,
      description: 'Upload and manage materials'
    },
    { 
      path: '/admin/students', 
      label: 'Students', 
      icon: FiUsers,
      description: 'View and manage students'
    },
    { 
      path: '/admin/analytics', 
      label: 'Analytics', 
      icon: FiBarChart2,
      description: 'View reports and analytics'
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: FiSettings,
      description: 'System settings'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    addToast('success', 'Logged out successfully');
    navigate('/admin/login');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-gray-800 text-white transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FiGrid className="text-white" />
              </div>
              <h2 className={`font-bold text-xl transition-opacity duration-300 ${
                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
              }`}>
                Admin
              </h2>
            </div>
            <button
              className="hidden lg:block p-1 rounded hover:bg-gray-700 transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <FiChevronDown className={`transform transition-transform duration-300 ${
                isCollapsed ? 'rotate-90' : ''
              }`} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 group ${
                  isActive(item.path) 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className={`flex-shrink-0 ${
                  isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`} size={20} />
                <div className={`ml-3 transition-all duration-300 ${
                  isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                }`}>
                  <div className="font-medium">{item.label}</div>
                  {!isCollapsed && (
                    <div className="text-xs text-gray-400 group-hover:text-gray-300">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-gray-700 transition-colors group"
          >
            <FiLogOut className="flex-shrink-0 text-gray-400 group-hover:text-white" size={20} />
            <span className={`ml-3 transition-opacity duration-300 ${
              isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
            }`}>
              Logout
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
//rkd
export default AdminSidebar;