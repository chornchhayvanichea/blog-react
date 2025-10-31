import React, { createContext, useContext, useEffect, useState } from "react";

// create context
const ThemeContext = createContext();

// provider component
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme !== null) {
      setDarkMode(storedTheme === "true");
    }
  }, []);

  // save theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook for using theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
