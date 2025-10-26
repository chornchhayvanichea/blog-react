const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};

export const setToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

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
export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};
//check user role
export const hasRole = (role) => {
  const user = getUser();
  return user?.role === role;
};

export const clearAuthData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
