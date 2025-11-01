// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import {
  setToken,
  getToken,
  setUser,
  getUser,
  clearAuthData,
} from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on mount
  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) return setLoading(false);

      const savedUser = getUser();
      if (savedUser) {
        setUserState(savedUser); // Use cached user
        setLoading(false); // ✅ Set loading false here
      }

      // Try to refresh in background
      try {
        const userData = await authService.currentUserProfile();
        setUserState(userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        // Only clear if 401 (token invalid)
        if (error.response?.status === 401) {
          clearAuthData();
          setUserState(null);
        }
        // Otherwise keep using cached user
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      setUser(data.user); // save to localStorage
      setUserState(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const signup = async ({ email, name, password, password_confirmation }) => {
    setLoading(true);
    try {
      const data = await authService.signup({
        email,
        name,
        password,
        password_confirmation,
      });
      setToken(data.token);
      setUser(data.user);
      setUserState(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      setUserState(null);
    }
  };

  // Refresh user profile
  const refreshUser = async () => {
    try {
      const userData = await authService.currentUserProfile();
      setUserState(userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // ❌ DON'T clear auth data on refresh failure
      // Only logout if it's a 401 (unauthorized) error
      if (error.response?.status === 401) {
        clearAuthData();
        setUserState(null);
      }
      throw error; // Re-throw so caller knows it failed
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
