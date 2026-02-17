import React from 'react';
import EmojiPicker from './components/EmojiPicker';
import HistoryGrid from './components/HistoryGrid';
import { useEmojiStore } from './store/useEmojiStore';

function App() {
  const { prompt, setPrompt, generateEmoji, isLoading } = useEmojiStore();
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await generateEmoji();
  };

  const handleEmojiSelect = (emoji) => {
    setPrompt(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🔮</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EmojiMix AI
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition">Gallery</a>
              <a href="#" className="text-gray-300 hover:text-white transition">How it works</a>
              <a href="#" className="text-gray-300 hover:text-white transition">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Input Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mix Emojis into Something New
            </h2>
            <p className="text-gray-300 text-lg">
              Combine 2+ emojis with a description to create unique AI-generated emoji art
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Emoji Picker Toggle */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
                    title="Add emojis"
                  >
                    <span className="text-2xl">😀</span>
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute top-20 left-0 z-50">
                      <EmojiPicker onSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />
                    </div>
                  )}
                </div>

                {/* Text Input */}
                <div className="flex-1">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 🍕 + 🚀 = space pizza delivery, or describe your mix..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                  <div className="mt-2 text-sm text-gray-400 flex justify-between">
                    <span>Combine 2+ emojis or describe your creation</span>
                    <span>{prompt.length}/500</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Generate Mix
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPrompt('')}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results/History Section */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Recent Creations</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                Grid View
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                List View
              </button>
            </div>
          </div>
          <HistoryGrid />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Powered by AI • Made with ❤️ • EmojiMix © 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default App;