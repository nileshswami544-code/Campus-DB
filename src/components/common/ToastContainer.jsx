// src/components/common/ToastContainer.jsx
import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts = [], removeToast }) => {
  // Add a check to ensure toasts is an array before mapping
  if (!toasts || !Array.isArray(toasts)) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
};

export default ToastContainer;