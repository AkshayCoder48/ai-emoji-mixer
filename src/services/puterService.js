const getPuter = () => {
  if (typeof window !== 'undefined' && window.puter) {
    return window.puter;
  }
  throw new Error('Puter.js is not available. Make sure it is loaded.');
};

export const generateImage = async (prompt) => {
  const puter = getPuter();
  const result = await puter.ai.textToImage(prompt);
  return typeof result === 'string' ? result : result.url;
};