import React, { useState } from 'react';
import { FiSettings, FiMail, FiLock, FiDatabase, FiBell, FiSave } from 'react-icons/fi';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    maintenanceMode: false,
    twoFactorAuth: false,
    sessionTimeout: '30',
    platformName: 'CampusLearn',
    supportEmail: 'support@campuslearn.com'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">System Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure platform settings and preferences</p>
      </div>
      
      {saveSuccess && (
        <div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-400 p-4">
          <p>Settings saved successfully!</p>
        </div>
      )}
      
      <form onSubmit={handleSave}>
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FiSettings className="mr-2" />
              General Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform Name
                </label>
                <input
                  type="text"
                  name="platformName"
                  value={settings.platformName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
          
          {/* Email Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FiMail className="mr-2" />
              Email Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Send email notifications to students</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FiLock className="mr-2" />
              Security Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for admin accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Session Timeout
                </label>
                <select
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* System Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <FiDatabase className="mr-2" />
              System Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Maintenance Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily disable access for all users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;