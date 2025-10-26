import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import {
  setToken,
  clearAuthData,
  getToken,
  setUser as saveUser,
  getUser,
} from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ Start with true

  // ⬅️ Load user on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const savedUser = getUser(); // Get from localStorage

      if (token && savedUser) {
        // User data exists in localStorage
        setUser(savedUser);
        setLoading(false);
      } else if (token) {
        // Token exists but no user data - fetch it
        try {
          const userData = await authService.getCurrentUser();
          saveUser(userData);
          setUser(userData);
        } catch (error) {
          // Token invalid - clear it
          clearAuthData();
        }
        setLoading(false);
      } else {
        // No token
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.access_token);

      const userData = await authService.getCurrentUser();
      saveUser(userData); // ⬅️ Save to localStorage
      setUser(userData);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.signup(userData);
      setToken(data.access_token);

      const user = await authService.getCurrentUser();
      saveUser(user); // ⬅️ Save to localStorage
      setUser(user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      setUser(null);
      window.location.href = "/auth/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
