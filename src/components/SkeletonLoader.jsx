import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="space-y-4" aria-hidden="true">
      {/* Skeleton for input area */}
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      
      {/* Skeleton for result */}
      <div className="flex justify-center">
        <div className="w-48 h-48 bg-gray-200 rounded-full animate-pulse" />
      </div>
      
      {/* Skeleton for history */}
      <div className="flex gap-2 justify-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;