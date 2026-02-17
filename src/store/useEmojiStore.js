import create from 'zustand';

// Mock Puter.js API function - replace with actual implementation
const generateEmojiFromPuter = async (prompt) => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('API rate limit exceeded. Please try again in a moment.');
  }
  
  if (!prompt || prompt.trim().length < 2) {
    throw new Error('Please enter a more descriptive prompt (at least 2 characters)');
  }
  
  // Return mock image URL (replace with actual Puter.js response)
  return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/200/200`;
};

const useEmojiStore = create((set, get) => ({
  prompt: '',
  generatedUrl: null,
  isLoading: false,
  error: null,
  history: [],
  
  setPrompt: (prompt) => set({ prompt }),
  
  generateEmoji: async () => {
    const { prompt } = get();
    
    // Validation
    if (!prompt.trim()) {
      set({ error: 'Please enter a prompt to generate an emoji' });
      return;
    }
    
    if (prompt.length > 100) {
      set({ error: 'Prompt is too long. Please keep it under 100 characters' });
      return;
    }
    
    set({ 
      isLoading: true, 
      error: null, 
      generatedUrl: null 
    });
    
    try {
      const result = await generateEmojiFromPuter(prompt);
      set({ 
        generatedUrl: result,
        isLoading: false,
        history: [result, ...get().history].slice(0, 10) // Keep last 10
      });
    } catch (err) {
      set({ 
        error: err.message || 'Failed to generate emoji. Please try again.',
        isLoading: false,
        generatedUrl: null
      });
    }
  },
  
  clearError: () => set({ error: null }),
  clearHistory: () => set({ history: [] })
}));

export default useEmojiStore;