export const getTokenFromCookie = () => {
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);

  return match?.[1] ?? null;
};
