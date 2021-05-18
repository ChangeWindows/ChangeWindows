export const setLocal = (key, content) => (localStorage.setItem(`changewindows.${key}`, typeof(content) === 'object' ? JSON.stringify(content) : content));

export const getLocal = (key) => {
  try {
    return JSON.parse(localStorage.getItem(`changewindows.${key}`));
  } catch {
    return localStorage.getItem(`changewindows.${key}`);
  }
};