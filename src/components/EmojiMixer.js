import React, { useState } from 'react';
import useEmojiMixStore from '../store/useEmojiMixStore';

const EmojiMixer = () => {
  const [emojisInput, setEmojisInput] = useState('');
  const [prompt, setPrompt] = useState('');
  const { history, loading, error, generate } = useEmojiMixStore();

  const handleGenerate = () => {
    const emojis = Array.from(emojisInput.trim()).filter(
      (char) => !/\s/.test(char)
    );
    if (emojis.length < 2) {
      alert('Please enter at least two emojis to mix.');
      return;
    }
    if (!prompt.trim()) {
      alert('Please enter a prompt.');
      return;
    }
    generate(emojis, prompt);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Emoji Mixer</h1>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Emojis (separated by spaces or just type together)
        </label>
        <input
          type='text'
          value={emojisInput}
          onChange={(e) => setEmojisInput(e.target.value)}
          placeholder='e.g., 😀🐶'
          className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          disabled={loading}
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Describe the image...'
          rows={3}
          className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          disabled={loading}
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && (
        <div className='mt-4 text-red-600'>
          Error: {error}
        </div>
      )}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-2'>History</h2>
        {history.length === 0 ? (
          <p>No images generated yet.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {history.map((item) => (
              <div key={item.id} className='border rounded p-3'>
                <img
                  src={item.imageUrl}
                  alt={item.prompt}
                  className='w-full h-auto rounded'
                />
                <p className='mt-2 text-sm'>
                  <strong>Source Emojis:</strong> {item.emojis.join(' ')}
                </p>
                <p className='text-sm'>
                  <strong>Prompt:</strong> {item.prompt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiMixer;