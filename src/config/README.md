# Configuration Files

This directory contains all customizable content for your portfolio. Edit these files to personalize your site.

## Files Overview

### `index.js` - Site Configuration
Contains personal information, metadata, and site settings:
- Personal info (name, email, phone, location)
- Social media links
- About section content
- SEO/meta tags
- Navigation links
- Contact form settings
- Resume settings
- Footer text
- Tech keywords for highlighting

### `data.jsx` - Content Data
Contains arrays of content:
- **PROJECTS_FEATURED** - Main showcase projects
- **PROJECTS_SMALL** - Additional smaller projects
- **JOBS** - Work experience entries
- **SCHOOLS** - Education entries
- **SKILLS** - Skills with icons and descriptions

### `theme.js` - Theme Configuration
Contains color scheme for light and dark modes:
- Accent color
- Light mode colors
- Dark mode colors
- Helper functions to apply themes

**Theme Auto-Detection**: The theme automatically detects your system's color scheme preference (light/dark) on first visit. Once you manually toggle the theme, your preference is saved to localStorage. The app also listens for system theme changes and will auto-switch if you haven't set a manual preference.

## How to Customize

1. **Update Personal Info**: Edit values in `index.js`
2. **Add/Edit Projects**: Modify arrays in `data.jsx`
3. **Change Colors**: Update color values in `theme.js`

## Importing

Use the `@/config` alias to import from these files:

```javascript
import { SITE_NAME, ABOUT_GREETING } from '@/config';
import { PROJECTS_FEATURED, SKILLS } from '@/config/data';
import { THEME, applyTheme } from '@/config/theme';
```

## Tech Stack Keywords

The `TECH_KEYWORDS` array in `index.js` is used to automatically highlight matching terms in your experience and education sections.
