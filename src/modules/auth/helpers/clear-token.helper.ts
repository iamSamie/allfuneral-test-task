export const clearToken = () => {
  document.cookie = 'access_token=; path=/; max-age=0';
};
