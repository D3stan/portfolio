// ============================================
// THEME CONFIGURATION
// ============================================
// "Signal wave" palette: lost late-night broadcasts, Win95 windows
// floating in a void, phosphor glow and VHS grain.
//
//   dark  = broadcast void (black, phosphor cyan / green, lavender text)
//   light = "Gradient Plaza" desktop (blue → magenta, white windows)

// ========== MAIN ACCENT COLOR ==========
export const ACCENT_COLOR = "#36f1cd"; // Phosphor cyan (the orbit ring)

// ========== THEME COLORS ==========
export const THEME = {
  accent: ACCENT_COLOR,

  light: {
    bg: "#2a17c9", // desktop base, painted over by the gradient backdrop
    fg: "#14102e", // text inside windows
    border: "#14102e",
    card: "#ffffff", // window client area
    accent: "#2414c9", // deep broadcast blue
    accentFg: "#ffffff",
    muted: "#4d4870",
    highlight: "#a1128e", // magenta, for degree/role text
    voidFg: "#f6e6ff", // text floating directly on the desktop
    glow: "rgba(255, 120, 245, 0.75)",
    chip: "#efeaff",
    shadowWeak: "rgba(10, 4, 60, 0.35)",
    shadowStrong: "rgba(10, 4, 60, 0.55)",
  },

  dark: {
    bg: "#030308",
    fg: "#ece6ff",
    border: "#36f1cd",
    card: "#07061a",
    accent: ACCENT_COLOR,
    accentFg: "#03030a",
    muted: "#9d97c9",
    highlight: "#4dff7a", // phosphor green, for degree/role text
    voidFg: "#f3dcff",
    glow: "rgba(54, 241, 205, 0.7)",
    chip: "#0d0c26",
    shadowWeak: "rgba(0, 0, 0, 0.6)",
    shadowStrong: "rgba(0, 0, 0, 0.85)",
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
    "--accent": colors.accent,
    "--accent-fg": colors.accentFg,
    "--muted": colors.muted,
    "--highlight": colors.highlight,
    "--void-fg": colors.voidFg,
    "--glow": colors.glow,
    "--chip": colors.chip,
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
