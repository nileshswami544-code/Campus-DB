// src/components/common/ErrorMessage.jsx
import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 my-4">
      <div className="flex items-center">
        <FiAlertCircle className="mr-2" />
        <p>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto flex items-center text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
          >
            <FiRefreshCw className="mr-1" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;