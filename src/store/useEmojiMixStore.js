import { create } from 'zustand';
import { generateImage } from '../services/puterService';

const useEmojiMixStore = create((set) => ({
  history: [],
  loading: false,
  error: null,
  generate: async (emojis, prompt) => {
    set({ loading: true, error: null });
    try {
      const fullPrompt = `Blend these emojis: ${emojis.join(' ')}. ${prompt}`;
      const imageUrl = await generateImage(fullPrompt);
      const newEntry = {
        id: Date.now(),
        emojis: [...emojis],
        prompt,
        imageUrl,
      };
      set((state) => ({
        history: [newEntry, ...state.history],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || 'Failed to generate image', loading: false });
    }
  },
  clearHistory: () => set({ history: [] }),
}));

export default useEmojiMixStore;