import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Use admin@campuslearn.com / admin123 to login
          </p>
        </div>
        <LoginForm userType="admin" />
      </div>
    </div>
  );
};

export default AdminLogin;