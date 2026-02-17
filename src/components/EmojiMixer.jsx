import React, { useEffect, useState } from 'react';
import useEmojiStore from '../store/useEmojiStore';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';

const EmojiMixer = () => {
  const {
    prompt,
    setPrompt,
    generateEmoji,
    generatedUrl,
    isLoading,
    error,
    clearError,
    history,
    clearHistory
  } = useEmojiStore();
  
  const [showResultAnimation, setShowResultAnimation] = useState(false);
  const [showHistoryAnimation, setShowHistoryAnimation] = useState(false);
  
  // Trigger result animation when URL changes
  useEffect(() => {
    if (generatedUrl) {
      setShowResultAnimation(false);
      // Small delay to reset animation
      setTimeout(() => setShowResultAnimation(true), 50);
    }
  }, [generatedUrl]);
  
  // Trigger history animation when history changes
  useEffect(() => {
    if (history.length > 0) {
      setShowHistoryAnimation(false);
      setTimeout(() => setShowHistoryAnimation(true), 50);
    }
  }, [history]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      generateEmoji();
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Emoji Blender 🎨
          </h1>
          <p className="text-gray-600">
            Describe your dream emoji and let AI create it for you
          </p>
        </header>
        
        <main className="space-y-6">
          {/* Input Section */}
          <section className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label 
                  htmlFor="prompt-input" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What emoji do you want to create?
                </label>
                <div className="flex gap-2">
                  <input
                    id="prompt-input"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., 'a smiling cat with sunglasses'"
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    disabled={isLoading}
                    aria-describedby="prompt-help"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className={
                      `px-6 py-3 rounded-xl font-semibold transition-all duration-200 \
                      ${isLoading || !prompt.trim() 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      }`
                    }
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <LoadingSpinner size="small" message="" />
                        Generating...
                      </span>
                    ) : (
                      'Create Emoji ✨'
                    )}
                  </button>
                </div>
                <p id="prompt-help" className="mt-2 text-sm text-gray-500">
                  Be descriptive! Include emotions, colors, objects, or animals.
                </p>
              </div>
            </form>
          </section>
          
          {/* Error Section */}
          {error && (
            <section className="animate-fadeIn" role="region" aria-live="polite">
              <ErrorMessage 
                error={error} 
                onDismiss={clearError}
                onRetry={generateEmoji}
              />
            </section>
          )}
          
          {/* Loading State - Full screen skeleton */}
          {isLoading && (
            <section className="animate-fadeIn" aria-busy="true">
              <SkeletonLoader />
            </section>
          )}
          
          {/* Result Section */}
          {!isLoading && generatedUrl && (
            <section 
              className={
                `bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 transform \
                ${showResultAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
              }
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Your Custom Emoji
                </h2>
                <div className="relative inline-block">
                  <img 
                    src={generatedUrl} 
                    alt={`Generated emoji for: ${prompt}`}
                    className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl shadow-md"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <a 
                      href={generatedUrl} 
                      download={`emoji-${prompt.replace(/\s+/g, '-').toLowerCase()}.png`}
                      className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Download ↓
                    </a>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 italic">
                  "{prompt}"
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(prompt)}
                    className="px-4 py-2 border-2 border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50 transition"
                  >
                    Copy Prompt
                  </button>
                  <button
                    onClick={generateEmoji}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
                  >
                    Regenerate 🔄
                  </button>
                </div>
              </div>
            </section>
          )}
          
          {/* History Section */}
          {history.length > 0 && (
            <section 
              className={
                `bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 \
                ${showHistoryAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
              }
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Generations
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-sm text-gray-500 hover:text-red-600 transition"
                >
                  Clear History
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {history.map((url, index) => (
                  <div key={index} className="relative group flex-shrink-0">
                    <img 
                      src={url} 
                      alt={`History emoji ${index + 1}`}
                      className="w-16 h-16 object-contain rounded-xl border-2 border-gray-100 hover:border-indigo-300 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={url} 
                        download
                        className="bg-black bg-opacity-70 text-white p-1 rounded-full"
                      >
                        ↓
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by Puter.js AI • Emoji Blender v1.0</p>
        </footer>
      </div>
      
      {/* Add custom animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EmojiMixer;