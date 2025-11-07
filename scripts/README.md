# Scripts

This directory contains build and deployment scripts for the portfolio.

## inject-meta-tags.js

Automatically injects meta tags from `src/config/index.js` into `index.html` before the build process.

### What it does:

- Reads configuration values from `src/config/index.js`
- Extracts meta information (title, description, keywords, author, etc.)
- Generates and injects meta tags into `index.html`:
  - SEO meta tags (description, keywords, author, language)
  - Favicon link
  - Font preconnect and stylesheet links
  - Open Graph / Facebook meta tags
  - Twitter Card meta tags

### When it runs:

This script runs automatically as a `prebuild` hook before `npm run build`. The GitHub Actions deployment workflow will execute this script automatically when building the site.

### Why it's needed:

Social media crawlers and search engines need to see meta tags in the initial HTML response. Since the portfolio is a React SPA, meta tags added via JavaScript won't be visible to these crawlers. This script ensures the static HTML file has all the necessary meta tags before deployment.

### Usage:

Manually run (for testing):
```bash
node scripts/inject-meta-tags.js
```

Automatic execution:
```bash
npm run build  # Automatically runs the script first via prebuild hook
```

### Configuration:

All meta tag content is configured in `src/config/index.js`. Update that file to change:
- Site title and description
- Social media preview image
- Author information
- Keywords
- And more...
