import { create } from 'zustand';

const useEmojiStore = create((set, get) => ({
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
  history: [],
  isLoading: false,
  
  generateEmoji: async () => {
    const { prompt } = get();
    if (!prompt.trim()) return;
    
    set({ isLoading: true });
    
    try {
      // TODO: Integrate Puter.js AI generation here
      // For now, simulate API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newItem = {
        id: Date.now(),
        prompt: prompt,
        imageUrl: `https://placehold.co/512x512/1a1a2e/FFF?text=${encodeURIComponent(prompt.substring(0, 20))}`,
        timestamp: new Date().toISOString(),
      };
      
      set(state => ({
        history: [newItem, ...state.history],
        isLoading: false,
        prompt: ''
      }));
      
    } catch (error) {
      console.error('Generation failed:', error);
      set({ isLoading: false });
    }
  },

  clearHistory: () => set({ history: [] }),
  
  deleteHistoryItem: (id) => set(state => ({
    history: state.history.filter(item => item.id !== id)
  }))
}));

// Selector hooks for optimized re-renders
export const usePrompt = () => useEmojiStore(state => state.prompt);
export const useSetPrompt = () => useEmojiStore(state => state.setPrompt);
export const useHistory = () => useEmojiStore(state => state.history);
export const useIsLoading = () => useEmojiStore(state => state.isLoading);

export default useEmojiStore;