import React, { useState } from 'react';

const EMOJI_CATEGORIES = {
  'Smileys': ['😀', '😂', '🥰', '😎', '🤩', '😍', '🤔', '😴', '🤯', '😱'],
  'Gestures': ['👍', '👎', '👏', '🙌', '🤝', '🤞', '✌️', '🤟', '🤘', '👌'],
  'Food': ['🍕', '🍔', '🍟', '🌮', '🍜', '🍩', '🍦', '🍪', '🍫', '🍿'],
  'Travel': ['🚗', '✈️', '🚀', '🛸', '🚁', '⛵️', '🚲', '🏍️', '🚄', '🚈'],
  'Nature': ['🌈', '🌺', '🌸', '🌻', '🌹', '🌳', '🌴', '🌵', '🌷', '💐'],
  'Objects': ['💡', '🔦', '📱', '💻', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲']
};

function EmojiPicker({ onSelect, onClose }) {
  const [activeCategory, setActiveCategory] = useState('Smileys');
  const [searchQuery, setSearchQuery] = useState('');

  const allEmojis = Object.values(EMOJI_CATEGORIES).flat();
  const filteredEmojis = searchQuery
    ? allEmojis.filter(emoji => 
        // Simple filter - in real app would use emoji names
        emoji.includes(searchQuery)
      )
    : EMOJI_CATEGORIES[activeCategory] || [];

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 w-80 border border-white/20 shadow-2xl">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emojis..."
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSearchQuery('');
            }}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              activeCategory === category && !searchQuery
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
        {filteredEmojis.map((emoji, idx) => (
          <button
            key={`${emoji}-${idx}`}
            onClick={() => onSelect(emoji)}
            className="aspect-square flex items-center justify-center text-2xl bg-white/5 hover:bg-white/20 rounded-lg transition hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EmojiPicker;