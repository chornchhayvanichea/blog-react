const STORAGE_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken", // Add this
  USER: "user",
};

// Access Token
export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Refresh Token
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// User
export const setUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
};

// Set both tokens at once (convenience method)
export const setAuthTokens = (accessToken, refreshToken) => {
  setToken(accessToken);
  if (refreshToken) {
    setRefreshToken(refreshToken);
  }
};

// Role checks
export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const hasRole = (role) => {
  const user = getUser();
  return user?.role === role;
};

// Clear all auth data
export const clearAuthData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
