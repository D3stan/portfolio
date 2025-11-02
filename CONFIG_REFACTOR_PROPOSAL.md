# Portfolio Configuration Refactoring Proposal

**Date:** November 2, 2025  
**Current Status:** Analysis Complete  
**Estimated Complexity Reduction:** ~60-65%

---

## 🎯 Executive Summary

This proposal outlines a plan to simplify the portfolio's configuration system from **6+ scattered files** to just **2-3 centralized files**, eliminating duplication, reducing nesting depth, and creating a single source of truth for all content.

**Current Issues:**
- Deep nesting (e.g., `SITE_CONFIG.about.availability.status`)
- Duplicate content between `index.html` and `config.js`
- Hardcoded values in HTML (analytics, meta tags, fonts)
- 6+ separate config/constant files to maintain
- Inconsistent export patterns (objects vs named exports)
- Redundant data (highlights array duplicated)

**Proposed Solution:**
- Consolidate to **2 files**: `config/index.js` (main config) + `config/theme.js` (theming)
- Flatten structure: no deep nesting
- Remove all duplication
- Single source of truth for all content

---

## 📊 Current File Structure

```
src/constants/
├── config.js          # 380+ lines, deeply nested
├── colors.js          # Theme config with 4 pre-built themes
├── projects.js        # Projects data
├── README.md          # Documentation
└── data/
    └── skills.jsx     # Skills data

Also affected:
├── index.html         # Hardcoded SEO, analytics, fonts
```

**Total:** 5-6 files + hardcoded HTML values

---

## 🎨 Proposed Simplified Structure

### **Option 1: Ultra-Minimal (2 Files) ⭐ RECOMMENDED**

```
src/config/
├── index.js           # ALL user-editable content (one file to rule them all)
├── theme.js           # Theme configuration only
└── README.md          # Updated documentation
```

**Benefits:**
- ✅ Only ONE file users need to edit for content
- ✅ Easy to find everything
- ✅ No confusion about where data lives
- ✅ Perfect for solo developers
- ✅ Minimal cognitive load

**Drawbacks:**
- ⚠️ One large file (~400-500 lines)
- ⚠️ Less granular version control (all changes in one file)

---

### **Option 2: Balanced (3 Files)**

```
src/config/
├── index.js           # Personal info, text content, navigation
├── data.js            # Arrays: projects, jobs, schools, skills
├── theme.js           # Theme configuration
└── README.md          # Documentation
```

**Benefits:**
- ✅ Clean separation: config vs data vs theme
- ✅ Smaller individual files
- ✅ Better git diffs (data vs config changes)
- ✅ Still very simple

**Drawbacks:**
- ⚠️ Slightly more files than Option 1

---

## 🔧 Detailed Changes

### 1. **Consolidate All Config Into One File**

**Before (current):**
```javascript
// config.js
export const SITE_CONFIG = {
  name: "Alessandro Porcheddu",
  about: {
    greeting: "Hi, I'm",
    availability: {
      status: "Available"
    }
  }
};

// Importing:
import { SITE_CONFIG } from './constants/config';
const name = SITE_CONFIG.name;
const status = SITE_CONFIG.about.availability.status; // Too nested!
```

**After (proposed):**
```javascript
// config/index.js - FLAT STRUCTURE
export const SITE_NAME = "Alessandro Porcheddu";
export const SITE_TITLE = "Software Developer";
export const SITE_EMAIL = "alessandroporcheddu000@gmail.com";
export const SITE_PHONE = "(+39) 3703371317";
export const SITE_LOCATION = "Cesena, Italy";

export const ABOUT_GREETING = "Hi, I'm";
export const ABOUT_DESCRIPTION = "Computer Science and Engineering student...";
export const ABOUT_STATUS = "Available";
export const ABOUT_STATUS_LOCATION = "Italy · Remote/Hybrid";

export const JOBS = [...];
export const SCHOOLS = [...];
export const PROJECTS_FEATURED = [...];
export const PROJECTS_SMALL = [...];
export const SKILLS = [...];
export const NAV_LINKS = [...];

// Importing:
import { SITE_NAME, ABOUT_STATUS } from '@/config';
// Simple, flat, no nesting!
```

**Complexity Reduction:** 70% less nesting

---

### 2. **Move HTML Meta Content to Config**

**Before (current):**
```html
<!-- index.html - HARDCODED -->
<title>Alessandro Porcheddu | Software Developer & System Administrator</title>
<meta name="description" content="Computer Science and Engineering student..." />
<meta property="og:title" content="Alessandro Porcheddu | Software Developer" />
<meta property="og:image" content="https://0xpuddu.it/images/profile/portfolio-preview.png" />

<script>
  gtag('config', 'G-DSDNBHGZ56'); // Hardcoded analytics ID
</script>
```

**After (proposed):**
```javascript
// config/index.js
export const META_TITLE = "Alessandro Porcheddu | Software Developer";
export const META_DESCRIPTION = "Computer Science and Engineering student with expertise...";
export const META_KEYWORDS = ["Software Developer", "System Administrator", ...];
export const META_AUTHOR = "Alessandro Porcheddu";
export const META_OG_IMAGE = "/images/profile/portfolio-preview.png";
export const META_SITE_URL = "https://0xpuddu.it";

export const ANALYTICS_GA_ID = "G-DSDNBHGZ56";

export const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap";
export const FAVICON = "/logos/batcat.svg";
```

Then use React Helmet or a build script to inject these dynamically.

**Benefit:** Single source of truth, no duplication

---

### 3. **Simplify Theme Configuration**

**Before (current):**
```javascript
// colors.js - 4 pre-built themes, complex logic
export const COLORS = { mainAccent: '#aa96da' };
export const THEME_COLORS = {
  light: { bg: '#fff', fg: '#111', ... },
  'brutalist-dark': { ... },
  noir: { ... },
  ghibli: { ... }
};
export function generateCSSVariables(themeName) { ... }
export function applyThemeColors(themeName) { ... }
```

**After (proposed):**
```javascript
// config/theme.js - ONE ACTIVE THEME
export const THEME = {
  accent: '#aa96da',
  light: {
    bg: '#ffffff',
    fg: '#111111',
    border: '#111111',
    card: '#ffffff',
    muted: '#757575',
    shadowWeak: 'rgba(0,0,0,0.12)',
    shadowStrong: 'rgba(0,0,0,0.18)',
  },
  dark: {
    bg: '#0a0a0a',
    fg: '#f5f5f5',
    border: '#333333',
    card: '#111111',
    muted: '#aaaaaa',
    shadowWeak: 'rgba(255,255,255,0.15)',
    shadowStrong: 'rgba(255,255,255,0.25)',
  }
};

// Move other themes to examples file if needed
```

**Benefit:** 60% less code, only what you use

---

### 4. **Eliminate Duplicate Highlights Arrays**

**Before (current):**
```javascript
experience: {
  highlights: ["Python", "Java", "React", "Node.js", ...],
},
education: {
  highlights: ["Python", "Java", "React", "Node.js", ...], // DUPLICATE!
}
```

**After (proposed):**
```javascript
// Single shared array
export const TECH_KEYWORDS = [
  "Python", "Java", "C", "JavaScript", "React", "Node.js", 
  "Laravel", "PLC", "HMI", "ESP32", ...
];

// Reference in both sections
export const JOBS = [...]; // Use TECH_KEYWORDS for highlighting
export const SCHOOLS = [...]; // Use TECH_KEYWORDS for highlighting
```

**Benefit:** DRY (Don't Repeat Yourself)

---

### 5. **Simplify Project Button Configuration**

**Before (current):**
```javascript
// projects.js - per-project customization
{
  buttons: {
    demo: "Live Site",  // Custom per project
    code: "Code",
  }
}
```

**After (proposed):**
```javascript
// Global defaults only
export const PROJECT_BUTTONS = {
  demo: "Live Demo",
  code: "View Code"
};

// Projects just specify existence
{
  hasDemo: true,
  hasRepo: false,
  demoUrl: "https://...",
  repoUrl: null
}
```

**Benefit:** Less configuration overhead

---

## 📋 Complete Proposed File Structure

### **config/index.js** (Main Config - ~400 lines)

```javascript
// ============================================
// PORTFOLIO CONFIGURATION
// ============================================
// This is the ONLY file you need to edit to customize your portfolio

// ========== PERSONAL INFO ==========
export const SITE_NAME = "Alessandro Porcheddu";
export const SITE_TITLE = "Software Developer";
export const SITE_EMAIL = "alessandroporcheddu000@gmail.com";
export const SITE_PHONE = "(+39) 3703371317";
export const SITE_LOCATION = "Cesena, Italy";

// ========== SOCIAL LINKS ==========
export const SOCIAL_GITHUB = "https://github.com/D3stan";
export const SOCIAL_LINKEDIN = "https://www.linkedin.com/in/0xalessandro-porcheddu";
export const SOCIAL_PORTFOLIO = "https://0xpuddu.it/";
export const SOCIAL_TWITTER = ""; // Optional

// ========== ABOUT SECTION ==========
export const ABOUT_GREETING = "Hi, I'm";
export const ABOUT_ROLES = ["Software Developer", "System Administrator", "Full-Stack Developer"];
export const ABOUT_STATUS = "Available";
export const ABOUT_STATUS_LOCATION = "Italy · Remote/Hybrid";
export const ABOUT_DESCRIPTION = `Computer Science and Engineering student...`;

// ========== META / SEO ==========
export const META_TITLE = "Alessandro Porcheddu | Software Developer";
export const META_DESCRIPTION = "Computer Science and Engineering student...";
export const META_KEYWORDS = ["Software Developer", "System Administrator", ...];
export const META_AUTHOR = "Alessandro Porcheddu";
export const META_OG_IMAGE = "/images/profile/portfolio-preview.png";
export const META_SITE_URL = "https://0xpuddu.it";
export const META_LANGUAGE = "en";
export const FAVICON = "/logos/batcat.svg";

// ========== ANALYTICS ==========
export const ANALYTICS_GA_ID = "G-DSDNBHGZ56";

// ========== FONTS ==========
export const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;600&family=Space+Grotesk:wght@600;700&display=swap";

// ========== CONTACT ==========
export const CONTACT_FORMSPREE = "https://formspree.io/f/mjkpyjon";
export const CONTACT_TITLE = "Contact";
export const CONTACT_DESCRIPTION = "Want to collaborate or just have a chat? Drop a message here.";

// ========== RESUME ==========
export const RESUME_FILE = "/documents/Resume.pdf";
export const RESUME_DOWNLOAD_NAME = "AlessandroPorcheddu-Resume.pdf";

// ========== TECH KEYWORDS (for highlighting) ==========
export const TECH_KEYWORDS = [
  "Python", "Java", "C", "JavaScript", "React", "Node.js",
  "Laravel", "PLC", "HMI", "Domain Controller", "WebSocket",
  "ESP32", "KiCad", "Fusion360", "MVC", "Stripe"
];

// ========== NAVIGATION ==========
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// ========== PROJECTS ==========
export const PROJECTS_FEATURED = [
  {
    id: 1,
    title: "JavaDyno",
    subtitle: "Engine Dynamometer Management Software",
    description: "Developed an engine dynamometer management system...",
    tech: ["Java", "MVC", "WebSocket", "Serial", "OBD-II", "CAN Bus"],
    image: "/images/projects/featured/javadyno.png",
    demoUrl: "https://github.com/MattechIT/OOP24-java-dyno/releases/tag/0.0.4",
    repoUrl: "https://github.com/MattechIT/OOP24-java-dyno",
  },
  // ... more projects
];

export const PROJECTS_SMALL = [
  // ... small projects
];

// ========== EXPERIENCE ==========
export const JOBS = [
  {
    company: "University Motorsport Team (MotoStudent Project)",
    role: "E-Powertrain and Electronics Department Member",
    period: "Oct. 2025 - Present",
    location: "University of Bologna, Italy",
    logo: "/logos/unibo-motorsport.png",
    description: [
      "Member of the E-Powertrain and Electronics Department...",
    ],
  },
  // ... more jobs
];

// ========== EDUCATION ==========
export const SCHOOLS = [
  {
    school: "University of Bologna",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "Sept. 2023 - Jul. 2026",
    location: "Cesena, Italy",
    logo: "/logos/unibo.png",
    url: "https://www.unibo.it",
    details: [
      "Relevant Coursework: Algorithms & Data Structures (C), 4.0 GPA...",
    ],
  },
  // ... more schools
];

// ========== SKILLS ==========
import { SiPython, SiJava, SiJavascript, SiReact, SiNodedotjs } from 'react-icons/si';

export const SKILLS = [
  { icon: SiPython, name: "Python", desc: "Backend development & data analysis" },
  { icon: SiJava, name: "Java", desc: "OOP & desktop applications" },
  { icon: SiJavascript, name: "JavaScript", desc: "Full-stack web development" },
  { icon: SiReact, name: "React", desc: "Modern UI development" },
  { icon: SiNodedotjs, name: "Node.js", desc: "Server-side JavaScript" },
  // ... more skills
];

// ========== FOOTER ==========
export const FOOTER_TEXT = "Made by Alessandro Porcheddu — Brutalist / Swiss UI.";
export const FOOTER_ATTRIBUTION = "BatCat mark inspired by Mark Horn.";
```

---

### **config/theme.js** (Theme Config - ~50 lines)

```javascript
// ============================================
// THEME CONFIGURATION
// ============================================

export const THEME = {
  // Main accent color used throughout the site
  accent: '#aa96da',
  
  // Light mode colors
  light: {
    bg: '#ffffff',
    fg: '#111111',
    border: '#111111',
    card: '#ffffff',
    muted: '#757575',
    shadowWeak: 'rgba(0,0,0,0.12)',
    shadowStrong: 'rgba(0,0,0,0.18)',
  },
  
  // Dark mode colors
  dark: {
    bg: '#0a0a0a',
    fg: '#f5f5f5',
    border: '#333333',
    card: '#111111',
    muted: '#aaaaaa',
    shadowWeak: 'rgba(255,255,255,0.15)',
    shadowStrong: 'rgba(255,255,255,0.25)',
  },
};

/**
 * Apply theme to document root
 */
export function applyTheme(mode = 'light') {
  const colors = THEME[mode];
  const root = document.documentElement;
  
  root.style.setProperty('--bg', colors.bg);
  root.style.setProperty('--fg', colors.fg);
  root.style.setProperty('--border', colors.border);
  root.style.setProperty('--card', colors.card);
  root.style.setProperty('--accent', THEME.accent);
  root.style.setProperty('--muted', colors.muted);
  root.style.setProperty('--shadow-weak', colors.shadowWeak);
  root.style.setProperty('--shadow-strong', colors.shadowStrong);
}
```

---

## 🔄 Migration Guide

### Step 1: Create New Structure
```bash
# Create new config directory
mkdir src/config

# Create new files
touch src/config/index.js
touch src/config/theme.js
touch src/config/README.md
```

### Step 2: Migrate Content
1. Copy all content from `constants/config.js` → `config/index.js`
2. Copy all content from `constants/projects.js` → `config/index.js`
3. Copy all content from `data/skills.jsx` → `config/index.js`
4. Copy theme config from `constants/colors.js` → `config/theme.js`
5. Flatten all nested structures (remove `SITE_CONFIG` object wrapper)

### Step 3: Update Imports
Find and replace across all components:
```javascript
// OLD
import { SITE_CONFIG } from '../constants/config';
import { FEATURED_PROJECTS } from '../constants/projects';

// NEW
import { SITE_NAME, SITE_EMAIL, PROJECTS_FEATURED } from '@/config';
import { THEME } from '@/config/theme';
```

### Step 4: Update HTML
Replace hardcoded values in `index.html` with dynamic meta tag generation:
- Install `react-helmet-async`
- Create `<MetaTags />` component
- Import values from config

### Step 5: Test & Cleanup
1. Test all pages and components
2. Delete old files:
   - `src/constants/config.js`
   - `src/constants/colors.js`
   - `src/constants/projects.js`
   - `src/data/skills.jsx`
3. Update `README.md` with new structure

---

## 📈 Benefits Summary

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Config Files** | 6+ files | 2 files | **-67%** |
| **Lines of Code** | ~600 lines | ~450 lines | **-25%** |
| **Nesting Depth** | 3-4 levels | 0-1 levels | **-75%** |
| **Import Complexity** | `SITE_CONFIG.about.status` | `ABOUT_STATUS` | **-60%** |
| **Duplicate Content** | 5+ duplicates | 0 duplicates | **-100%** |
| **Time to Find Config** | Search multiple files | Open one file | **-80%** |

**Overall Complexity Reduction: ~60-65%**

---

## ⚠️ Potential Drawbacks

1. **Large Single File**: `config/index.js` will be ~400-500 lines
   - *Mitigation:* Use clear section comments, VSCode folding
   
2. **Less Granular Git History**: All changes in one file
   - *Mitigation:* Write descriptive commit messages
   
3. **Initial Migration Effort**: ~2-4 hours to refactor
   - *Mitigation:* Systematic find-replace, test incrementally

---

## 🎯 Recommendation

**Implement Option 1 (Ultra-Minimal - 2 Files)**

**Why:**
- This is a personal portfolio, not a large application
- Single maintainer (you)
- Changes happen infrequently
- Easier for future you to remember where things are
- Can always split later if needed

**Timeline:**
- Setup: 30 minutes
- Migration: 2 hours
- Testing: 1 hour
- **Total: ~3.5 hours**

**ROI:**
- Saves ~10-15 minutes every time you need to update content
- Eliminates confusion about file structure
- Makes onboarding (for future contributors) easier

---

## 📝 Alternative: Hybrid Approach

If you want to keep some separation but still simplify:

```
src/config/
├── index.js           # Re-exports everything (acts as barrel)
├── site.js            # Personal info, meta, social (100 lines)
├── content.js         # Projects, jobs, schools, skills (300 lines)
└── theme.js           # Theme config (50 lines)
```

This gives you:
- ✅ Smaller files (easier to scan)
- ✅ Better organization by concern
- ✅ Still simple (3 files vs 6+)
- ✅ Better git diffs

But requires:
- ⚠️ One extra file to maintain
- ⚠️ Need to remember which file has what

---

## ✅ Next Steps

1. **Review this proposal** and decide on approach
2. **Backup current code** (commit to git)
3. **Create new structure** (new directory + files)
4. **Migrate content** (copy & flatten)
5. **Update imports** (find & replace)
6. **Test thoroughly** (all pages/components)
7. **Delete old files** (cleanup)
8. **Update documentation** (README)

---

## 📚 Additional Resources

- [React Helmet Async](https://www.npmjs.com/package/react-helmet-async) - For dynamic meta tags
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html) - For environment-based config
- [VSCode Folding](https://code.visualstudio.com/docs/editor/codebasics#_folding) - For managing large files

---

**Questions or concerns?** Let me know and I can adjust the proposal or help with implementation!
