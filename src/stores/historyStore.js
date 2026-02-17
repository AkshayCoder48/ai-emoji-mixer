import { create } from 'zustand';

const useHistoryStore = create((set) => ({
  history: [],
  addToHistory: (item) => set((state) => ({
    history: [item, ...state.history].slice(0, 50), // Keep only last 50 items
  })),
  clearHistory: () => set({ history: [] }),
  removeFromHistory: (id) => set((state) => ({
    history: state.history.filter((item) => item.id !== id),
  })),
}));

export { useHistoryStore };