// src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Breadcrumb from './Breadcrumb';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 ml-0 lg:ml-64 overflow-auto">
        <div className="p-6">
          <Breadcrumb />
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
//rkd
export default AdminLayout;