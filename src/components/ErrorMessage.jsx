import React from 'react';

const ErrorMessage = ({ error, onDismiss, onRetry }) => {
  const errorTypes = {
    validation: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    api: 'bg-red-50 border-red-200 text-red-800',
    network: 'bg-orange-50 border-orange-200 text-orange-800',
    default: 'bg-gray-50 border-gray-200 text-gray-800'
  };
  
  // Determine error type for styling
  let errorType = 'default';
  if (error?.includes('rate limit') || error?.includes('429')) errorType = 'api';
  else if (error?.includes('validation') || error?.includes('prompt')) errorType = 'validation';
  else if (error?.includes('network') || error?.includes('fetch')) errorType = 'network';
  
  return (
    <div 
      className={
        `border rounded-lg p-4 mb-4 flex items-start space-x-3 ${errorTypes[errorType] || errorTypes.default}`
      }
      role="alert"
      aria-live="polite"
    >
      <svg 
        className="w-5 h-5 flex-shrink-0 mt-0.5" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clipRule="evenodd" 
        />
      </svg>
      <div className="flex-1">
        <h3 className="font-semibold">Oops! Something went wrong</h3>
        <p className="text-sm mt-1">{error}</p>
        <div className="mt-3 flex gap-2">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="px-3 py-1 text-sm font-medium rounded-md bg-white border border-current hover:bg-opacity-80 transition"
            >
              Try Again
            </button>
          )}
          {onDismiss && (
            <button 
              onClick={onDismiss}
              className="px-3 py-1 text-sm font-medium rounded-md bg-white bg-opacity-50 border border-transparent hover:bg-opacity-80 transition"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;