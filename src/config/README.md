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
4. **Adjust Highlighting**: Edit the `highlight` color in `theme.js` to change the color of role/degree text throughout the site

## Importing

Use the `@/config` alias to import from these files:

```javascript
import { SITE_NAME, ABOUT_GREETING } from '@/config';
import { PROJECTS_FEATURED, SKILLS } from '@/config/data';
import { THEME, applyTheme } from '@/config/theme';
```

## Theme Colors

The following CSS variables are available throughout the app and automatically update based on the selected theme (light/dark):

- `--accent` - Main accent color (purple by default)
- `--highlight` - Secondary highlight color for roles, degrees, subtitles (teal by default)
- `--bg` - Background color
- `--fg` - Foreground (text) color
- `--border` - Border color
- `--card` - Card background color
- `--muted` - Muted text color
- `--shadow-weak` - Light shadow
- `--shadow-strong` - Strong shadow

Use these in your components like: `style={{ color: 'var(--highlight)' }}`
