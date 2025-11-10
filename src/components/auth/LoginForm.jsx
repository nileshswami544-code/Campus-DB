import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginForm = ({ userType = 'student' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For admin login, use simple credentials
      if (userType === 'admin') {
        if (email === 'admin@campuslearn.com' && password === 'admin123') {
          login({ name: 'Admin', email }, 'admin');
          navigate('/admin/dashboard');
        } else {
          throw new Error('Invalid admin credentials');
        }
      } else {
        // For student login, check localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          login(user, 'student');
          navigate('/student/dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-university-blue">
        {userType === 'admin' ? 'Admin Login' : 'Student Login'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FiMail className="text-gray-500 mr-2" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FiLock className="text-gray-500 mr-2" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-university-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      {userType === 'student' && (
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="text-university-blue hover:underline">
              Sign up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;