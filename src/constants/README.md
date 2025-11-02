# Data Directory

This folder contains all the customizable data for your portfolio website. Update these files with your own information to personalize your portfolio.

## Files Overview

### `projects.js`
Contains all your project information including:
- **FEATURED_PROJECTS**: Your main showcase projects (2-3 large projects)
- **SMALL_PROJECTS**: Additional smaller projects (4-6 projects)

Each project should include:
- `id`: Unique identifier (number)
- `title`: Project name
- `subtitle`: Brief description (optional for small projects)
- `blurb`: Detailed project description
- `tech`: Array of technologies used
- `image`: Path to image in `/public` folder (e.g., "/my-project.png")
- `video`: Video URL (optional, can be null)
- `repo`: GitHub repository URL
- `demo`: Live demo URL

**How to add images:**
1. Place your project images in the `/public` folder
2. Reference them in the data file with "/" prefix (e.g., "/project-screenshot.png")

### `skills.js`
Contains all your technical skills with:
- `icon`: React icon component (from react-icons library)
- `name`: Skill/technology name
- `desc`: Brief description of your proficiency

**How to add new skills:**
1. Import the icon from react-icons (visit https://react-icons.github.io/react-icons/)
2. Add a new object to the skills array with icon, name, and description

## Quick Start Guide

1. **Update Projects:**
   - Replace placeholder project data with your own projects
   - Add your project screenshots to `/public` folder
   - Update all URLs to point to your repositories and demos

2. **Update Skills:**
   - Modify the skills array to reflect your actual skill set
   - Add/remove skills as needed
   - Keep icons and descriptions consistent with your expertise

3. **Keep it Organized:**
   - Keep related data together
   - Use meaningful descriptions
   - Maintain consistent formatting

## Tips

- Keep project descriptions concise but informative (2-3 sentences)
- Use high-quality screenshots (recommended: 1200x800px or similar aspect ratio)
- Test all links before deploying
- Update regularly as you complete new projects
