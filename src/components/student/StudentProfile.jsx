// src/components/student/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiEdit2, FiSave, FiX, FiCamera } from 'react-icons/fi';

const StudentProfile = () => {
  const { currentUser, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'BTech',
    department: 'CSE',
    year: '1st',
    semester: '1',
    phone: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        course: currentUser.course || 'BTech',
        department: currentUser.department || 'CSE',
        year: currentUser.year || '1st',
        semester: currentUser.semester || '1',
        phone: currentUser.phone || '',
        bio: currentUser.bio || ''
      });
      
      // Set profile image if available
      if (currentUser.profileImage) {
        setPreviewImage(currentUser.profileImage);
      }
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: 'Image size should be less than 5MB'
        });
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          profileImage: 'Please select an image file'
        });
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number should be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in localStorage
      const updatedUser = {
        ...currentUser,
        ...formData,
        profileImage: previewImage
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      login(updatedUser, 'student');
      
      setIsEditing(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({
        ...errors,
        form: 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        course: currentUser.course || 'BTech',
        department: currentUser.department || 'CSE',
        year: currentUser.year || '1st',
        semester: currentUser.semester || '1',
        phone: currentUser.phone || '',
        bio: currentUser.bio || ''
      });
      
      if (currentUser.profileImage) {
        setPreviewImage(currentUser.profileImage);
      } else {
        setPreviewImage(null);
      }
    }
    
    setProfileImage(null);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition"
            >
              <FiEdit2 />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition"
              >
                <FiX />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                <FiSave />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {saveSuccess && (
        <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-400 p-4">
          <p>Profile updated successfully!</p>
        </div>
      )}
      
      {errors.form && (
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4">
          <p>{errors.form}</p>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiUser className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                  <FiCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-2">{errors.profileImage}</p>
            )}
            
            {isEditing && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
                Click the camera icon to change your profile picture
              </p>
            )}
          </div>
          
          {/* Profile Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.name}</p>
                  )}
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.email}</p>
                  )}
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.phone || 'Not provided'}</p>
                  )}
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course
                  </label>
                  {isEditing ? (
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="BTech">BTech</option>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                      <option value="MTech">MTech</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.course}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  {isEditing ? (
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="CSE">CSE</option>
                      <option value="Civil">Civil</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.department}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year
                  </label>
                  {isEditing ? (
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                      <option value="4th">4th</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.year}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Semester
                  </label>
                  {isEditing ? (
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
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
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.semester}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    {formData.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;