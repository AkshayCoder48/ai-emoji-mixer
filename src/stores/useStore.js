import create from 'zustand'

const useStore = create((set) => ({
  emoji1: '',
  emoji2: '',
  prompt: '',
  result: null,
  loading: false,
  error: null,
  setEmoji1: (emoji) => set({ emoji1: emoji }),
  setEmoji2: (emoji) => set({ emoji2: emoji }),
  setPrompt: (prompt) => set({ prompt }),
  setResult: (result) => set({ result }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))

export default useStore