// src/components/common/Toast.jsx
import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle size={20} />;
      case 'error':
        return <FiAlertCircle size={20} />;
      case 'warning':
        return <FiAlertCircle size={20} />;
      case 'info':
        return <FiInfo size={20} />;
      default:
        return <FiInfo size={20} />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${getToastStyles()} transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-center">
        <span className="mr-3">{getIcon()}</span>
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-75 transition-opacity"
      >
        <FiX size={20} />
      </button>
    </div>
  );
};

export default Toast;