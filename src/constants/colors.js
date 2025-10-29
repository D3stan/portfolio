/**
 * GLOBAL COLOR CONFIGURATION
 * 
 * This file contains all color configurations for the portfolio.
 * Change the colors here to update the entire website theme.
 * 
 * MAIN ACCENT COLOR: This is the primary brand color used throughout the site
 * for highlights, buttons, and interactive elements.
 */

export const COLORS = {
  // ========== MAIN ACCENT COLOR ==========
  // Change this to update the primary color across the entire website
  mainAccent: '#c7ceea', // Default: Bright Yellow
  
  // Alternative accent colors you can try:
  // mainAccent: '#ff6b6b', // Red
  // mainAccent: '#4ecdc4', // Teal
  // mainAccent: '#95e1d3', // Mint
  // mainAccent: '#f38181', // Pink
  // mainAccent: '#aa96da', // Purple
  // mainAccent: '#fcbad3', // Bubble Gum
  // mainAccent: '#ffffd2', // Cream
  // mainAccent: '#a8e6cf', // Mint Green
  // mainAccent: '#ff8b94', // Coral
  // mainAccent: '#c7ceea', // Lavender
};

/**
 * THEME CONFIGURATIONS
 * Define complete color schemes for different themes
 */
export const THEME_COLORS = {
  light: {
    bg: '#ffffff',
    fg: '#111111',
    border: '#111111',
    card: '#ffffff',
    accent: COLORS.mainAccent, // Uses main accent
    muted: '#757575',
    shadowWeak: 'rgba(0,0,0,0.12)',
    shadowStrong: 'rgba(0,0,0,0.18)',
  },
  
  'brutalist-dark': {
    bg: '#0a0a0a',
    fg: '#f5f5f5',
    border: '#333333',
    card: '#111111',
    accent: COLORS.mainAccent, // Uses main accent
    muted: '#aaaaaa',
    shadowWeak: 'rgba(255,255,255,0.15)',
    shadowStrong: 'rgba(255,255,255,0.25)',
  },
  
  noir: {
    bg: '#0b0e14',
    fg: '#e6edf3',
    border: '#1f2328',
    card: '#111826',
    accent: '#8b5cf6', // Purple accent for noir theme
    muted: '#9aa6b2',
    shadowWeak: 'rgba(16,20,27,0.45)',
    shadowStrong: 'rgba(16,20,27,0.6)',
  },
  
  ghibli: {
    bg: '#fbf6ee',
    fg: '#2b2b2b',
    border: '#2b2b2b',
    card: '#fffaf1',
    accent: '#5aa382', // Green accent for ghibli theme
    muted: '#6b7280',
    shadowWeak: 'rgba(43,43,43,0.12)',
    shadowStrong: 'rgba(43,43,43,0.18)',
  },
};

/**
 * UTILITY: Generate CSS custom properties
 * This function is used to dynamically update CSS variables
 */
export function generateCSSVariables(themeName = 'light') {
  const colors = THEME_COLORS[themeName] || THEME_COLORS.light;
  
  return {
    '--bg': colors.bg,
    '--fg': colors.fg,
    '--border': colors.border,
    '--card': colors.card,
    '--accent': colors.accent,
    '--muted': colors.muted,
    '--shadow-weak': colors.shadowWeak,
    '--shadow-strong': colors.shadowStrong,
  };
}

/**
 * UTILITY: Apply theme to document root
 * Use this to programmatically change themes
 */
export function applyThemeColors(themeName = 'light') {
  const variables = generateCSSVariables(themeName);
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
