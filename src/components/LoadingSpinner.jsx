import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Generating your emoji...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div 
        className={
          `${sizeClasses[size]} animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600`
        }
        role="status"
        aria-label="Loading"
      />
      <p className="text-sm text-gray-600 animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;