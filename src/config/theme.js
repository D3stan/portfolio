// ============================================
// THEME CONFIGURATION
// ============================================
// Color scheme for light and dark modes

// ========== MAIN ACCENT COLOR ==========
export const ACCENT_COLOR = "#aa96da"; // Purple

// ========== THEME COLORS ==========
export const THEME = {
  accent: ACCENT_COLOR,

  light: {
    bg: "#ffffff",
    fg: "#111111",
    border: "#111111",
    card: "#ffffff",
    muted: "#757575",
    highlight: "#0d9488", // teal-700 - for degree/role text
    shadowWeak: "rgba(0,0,0,0.12)",
    shadowStrong: "rgba(0,0,0,0.18)",
  },

  dark: {
    bg: "#0a0a0a",
    fg: "#f5f5f5",
    border: "#333333",
    card: "#111111",
    muted: "#aaaaaa",
    highlight: "#2dd4bf", // teal-400 - for degree/role text
    shadowWeak: "rgba(255,255,255,0.15)",
    shadowStrong: "rgba(255,255,255,0.25)",
  },
};

/**
 * Generate CSS custom properties for a given theme mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {Object} CSS variables object
 */
export function generateCSSVariables(mode = "light") {
  const colors = THEME[mode] || THEME.light;

  return {
    "--bg": colors.bg,
    "--fg": colors.fg,
    "--border": colors.border,
    "--card": colors.card,
    "--accent": THEME.accent,
    "--muted": colors.muted,
    "--highlight": colors.highlight,
    "--shadow-weak": colors.shadowWeak,
    "--shadow-strong": colors.shadowStrong,
  };
}

/**
 * Apply theme to document root
 * @param {string} mode - 'light' or 'dark'
 */
export function applyTheme(mode = "light") {
  const variables = generateCSSVariables(mode);
  const root = document.documentElement;

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
