import React, { useState } from 'react';
import { useHistoryStore } from '@/stores/historyStore';

const HistoryGallery = () => {
  const { history, clearHistory } = useHistoryStore();
  const [copySuccess, setCopySuccess] = useState({});

  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'emoji-mix.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(imageUrl, '_blank');
    }
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ ...copySuccess, [id]: true });
      setTimeout(() => {
        setCopySuccess({ ...copySuccess, [id]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No history yet. Create your first emoji mix!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">History Gallery</h2>
        <button
          onClick={clearHistory}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleDownload(item.imageUrl, `emoji-mix-${item.id}.png`)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Download"
                  aria-label="Download image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleCopy(item.prompt, item.id)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Copy Prompt"
                  aria-label="Copy prompt to clipboard"
                >
                  {copySuccess[item.id] ? (
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl" role="img" aria-label="Source emojis">
                  {item.sourceEmojis?.join(' ') || '✨'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-sm text-gray-700 line-clamp-2" title={item.prompt}>
                {item.prompt}
              </p>
              
              {item.model && (
                <div className="mt-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {item.model}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryGallery;