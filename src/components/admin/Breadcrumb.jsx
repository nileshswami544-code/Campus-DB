// src/components/admin/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const items = [];
    
    // Skip the first 'admin' if it exists
    const startIndex = pathnames[0] === 'admin' ? 1 : 0;
    
    for (let i = startIndex; i < pathnames.length; i++) {
      const path = pathnames[i];
      const routeTo = '/' + pathnames.slice(0, i + 1).join('/');
      const isLast = i === pathnames.length - 1;
      
      let label = path.charAt(0).toUpperCase() + path.slice(1);
      
      // Customize labels
      if (path === 'dashboard') label = 'Dashboard';
      if (path === 'subjects') label = 'Subjects';
      if (path === 'materials') label = 'Materials';
      if (path === 'students') label = 'Students';
      if (path === 'analytics') label = 'Analytics';
      if (path === 'settings') label = 'Settings';
      
      items.push({
        label,
        path: routeTo,
        isLast
      });
    }
    
    return items;
  };
  
  const items = getBreadcrumbItems();
  
  // Don't show breadcrumb on dashboard
  if (location.pathname === '/admin/dashboard') {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <Link 
        to="/admin/dashboard" 
        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      >
        Dashboard
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <FiChevronRight className="text-gray-400" />
          {item.isLast ? (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          ) : (
            <Link 
              to={item.path} 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
//rkd
export default Breadcrumb;