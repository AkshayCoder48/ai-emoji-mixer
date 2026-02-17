import React from 'react';
import { useEmojiStore } from '../store/useEmojiStore';

function HistoryGrid() {
  const { history } = useEmojiStore();

  if (history.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4 opacity-50">🎨</div>
        <h3 className="text-xl font-medium text-gray-300 mb-2">No creations yet</h3>
        <p className="text-gray-400">Your AI-generated emoji mixes will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
        >
          {/* Image Container */}
          <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.prompt || 'Generated emoji'}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading...</div>
              </div>
            )}
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
              <button
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition"
                title="Download"
              >
                ⬇️
              </button>
              <button
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>

          {/* Prompt & Metadata */}
          <div className="p-3">
            <p className="text-sm text-gray-300 line-clamp-2 min-h-[40px]" title={item.prompt}>
              {item.prompt || 'No prompt'}
            </p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>{new Date(item.timestamp).toLocaleDateString()}</span>
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 bg-purple-900/50 rounded text-purple-300">
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryGrid;