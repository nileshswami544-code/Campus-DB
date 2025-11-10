import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    course: 'BTech',
    department: 'CSE',
    year: '1st',
    semester: '1'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === formData.email)) {
        throw new Error('User with this email already exists');
      }

      // Add new user to localStorage
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-university-blue">
        Student Signup
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FiUser className="text-gray-500 mr-2" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FiMail className="text-gray-500 mr-2" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded-lg p-2">
            <FiLock className="text-gray-500 mr-2" />
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
              Course
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="BTech">BTech</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="MTech">MTech</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="CSE">CSE</option>
              <option value="Civil">Civil</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
              Semester
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-university-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-university-blue hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;