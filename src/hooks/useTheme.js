import { useState, useEffect } from 'react';
import { generateCSSVariables } from '@/config/theme';

/**
 * Custom hook for theme management
 * Handles theme state, persistence, and application with automatic system preference detection
 * 
 * Note: To change colors, edit src/config/theme.js and refresh the browser
 */
export function useTheme() {
  // Detect system theme preference
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(() => {
    // Check localStorage first, fallback to system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || getSystemTheme();
  });

  useEffect(() => {
    // Apply theme on mount
    applyTheme(theme);

    // Listen for system theme changes (only if user hasn't manually set a theme)
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      // Only auto-switch if user hasn't set a preference
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const applyTheme = (themeName) => {
    const root = document.documentElement;

    // Apply theme attribute for CSS
    if (themeName === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', themeName);
    }

    // Apply CSS custom properties dynamically
    Object.entries(generateCSSVariables(themeName)).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, changeTheme, applyTheme };
}
