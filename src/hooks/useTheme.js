import { useState, useEffect } from 'react';
import { THEME_COLORS } from '../constants/colors';

/**
 * Custom hook for theme management
 * Handles theme state, persistence, and application
 */
export function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    const colors = THEME_COLORS[themeName] || THEME_COLORS.light;
    const root = document.documentElement;

    // Apply theme attribute for CSS
    if (themeName === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', themeName);
    }

    // Apply CSS custom properties dynamically
    root.style.setProperty('--bg', colors.bg);
    root.style.setProperty('--fg', colors.fg);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--card', colors.card);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--shadow-weak', colors.shadowWeak);
    root.style.setProperty('--shadow-strong', colors.shadowStrong);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, changeTheme, applyTheme };
}
