// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  FiLogOut, FiUser, FiMenu, FiX, FiSun, FiMoon, 
  FiSearch, FiBell, FiSettings, FiChevronDown, FiBookOpen 
} from 'react-icons/fi';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New material added to Data Structures', read: false },
    { id: 2, text: 'Assignment deadline tomorrow', read: false }
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logout();
    addToast('success', 'Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FiBookOpen className="text-white" />
            </div>
            <span className="text-xl font-bold">CampusLearn</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
              Home
            </Link>
            
            {currentUser && (
              <>
                <Link to="/student/dashboard" className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition ${location.pathname.includes('/student') ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                  Dashboard
                </Link>
                
                <Link to="/student/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Courses
                </Link>
                
                <Link to="/student/discussions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  Discussions
                </Link>
              </>
            )}
          </div>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar - Only show if logged in */}
            {currentUser && (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  <FiSearch />
                </button>
              </form>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            
            {currentUser ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition relative"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <FiBell />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      
                      {notifications.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {notifications.map(notification => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <p className="text-sm">{notification.text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <FiUser />
                    <span className="hidden lg:block">
                      {currentUser.name} 
                      {currentUser.userType === 'admin' && ' (Admin)'}
                    </span>
                    <FiChevronDown className={`transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                      <Link
                        to={currentUser.userType === 'admin' ? '/admin/dashboard' : '/student/profile'}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <FiUser />
                          <span>Profile</span>
                        </div>
                      </Link>
                      
                      <Link
                        to="/student/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <FiSettings />
                          <span>Settings</span>
                        </div>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <div className="flex items-center space-x-2">
                          <FiLogOut />
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              
              {currentUser ? (
                <>
                  <Link to="/student/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  
                  <Link to="/student/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Courses
                  </Link>
                  
                  <Link to="/student/discussions" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Discussions
                  </Link>
                  
                  <Link to="/student/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  
                  <Link to="/student/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  
                  <Link to="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                  
                  <Link to="/admin/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition" onClick={() => setIsMenuOpen(false)}>
                    Admin Login
                  </Link>
                </>
              )}
              
              <div className="flex items-center space-x-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <FiSun /> : <FiMoon />}
                </button>
                <span className="text-sm">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;