# 📁 Assets Organization Guide

## Structure Overview

Your portfolio assets are now organized in a clean, scalable structure:

```
public/
├── documents/          # Documents and PDFs
│   └── Resume.pdf
│
├── logos/              # All company and education logos
│   ├── batcat.svg      # Site logo
│   ├── rebb.jpeg       # REBB TECH
│   ├── evolution.jpeg  # Evolution Hospitality
│   ├── aih.png         # Australian Institute
│   └── kii.png         # Kingsford International
│
└── images/
    ├── profile/        # Personal photos and portraits
    │   ├── manoj-portrait.svg
    │   └── graduation.png
    │
    └── projects/       # Project screenshots
        ├── featured/   # Main showcase projects
        │   ├── admin.png
        │   └── client.png
        │
        └── small/      # Smaller projects
            ├── calculator.png
            ├── currency.png
            ├── movie.png
            └── weather.png
```

## Where to Add New Assets

### 📄 Documents
- **Location**: `/public/documents/`
- **Examples**: Resume, certificates, PDFs
- **Path format**: `/documents/filename.pdf`

### 🏢 Logos
- **Location**: `/public/logos/`
- **Examples**: Company logos, education institution logos, site branding
- **Path format**: `/logos/filename.png`

### 🖼️ Profile Images
- **Location**: `/public/images/profile/`
- **Examples**: Portrait, graduation photos, headshots
- **Path format**: `/images/profile/filename.png`

### 🚀 Featured Projects
- **Location**: `/public/images/projects/featured/`
- **Examples**: Main portfolio projects, large showcases
- **Path format**: `/images/projects/featured/project-name.png`

### 📦 Small Projects
- **Location**: `/public/images/projects/small/`
- **Examples**: Side projects, smaller demos
- **Path format**: `/images/projects/small/project-name.png`

## Code References Updated

All file paths have been updated in:
- ✅ `src/constants/config.js` - Resume path and SEO image
- ✅ `src/data/projects.js` - All project images
- ✅ `src/components/Education.jsx` - Education logos and graduation photo
- ✅ `src/components/Experience.jsx` - Company logos
- ✅ `src/components/ArtisticPortrait.jsx` - Portrait image

## Adding New Assets - Quick Reference

### New Project Image
1. Add image to `/public/images/projects/featured/` or `small/`
2. Reference in `src/data/projects.js`:
   ```js
   image: "/images/projects/featured/my-new-project.png"
   ```

### New Company Logo
1. Add logo to `/public/logos/`
2. Reference in component:
   ```js
   logo: "/logos/company-name.png"
   ```

### New Document
1. Add file to `/public/documents/`
2. Reference as needed:
   ```js
   fileName: "/documents/document-name.pdf"
   ```

## Benefits
- 🎯 **Easy Navigation**: Find assets quickly by category
- 📈 **Scalable**: Add hundreds of projects without clutter
- 🔧 **Maintainable**: Clear conventions for the team
- 🚀 **Professional**: Industry-standard organization

---
*Last Updated: October 29, 2025*
