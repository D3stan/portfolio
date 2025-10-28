# 🎨 Quick Customization Guide

This guide will help you customize your portfolio in 15 minutes or less!

## ⚡ The 5-Minute Setup

### 1. Update Your Info (2 minutes)

**File: `src/constants/config.js`**

Change these values:
```javascript
name: "John Doe",                    // Your name
title: "Full-Stack Developer",       // Your job title
email: "john@example.com",           // Your email
location: "San Francisco, CA",       // Your location

social: {
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  // ... update all social links
}
```

### 2. Add Your Resume (1 minute)

1. Save your resume as `JohnDoe-Resume.pdf`
2. Put it in the `/public` folder
3. Update `src/components/Resume.jsx` line 12-13:
   ```javascript
   const RESUME_URL = "/JohnDoe-Resume.pdf";
   const DOWNLOAD_NAME = "JohnDoe-Resume.pdf";
   ```

### 3. Setup Contact Form (2 minutes)

1. Go to [formspree.io](https://formspree.io) → Sign up (free)
2. Create a new form
3. Copy your form endpoint
4. Paste it in `src/constants/config.js`:
   ```javascript
   contact: {
     formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   }
   ```

Done! Your portfolio now has working contact and resume features! 🎉

---

## 📝 The 15-Minute Full Setup

### Step 4: Add Your Projects (5 minutes)

**File: `src/data/projects.js`**

1. **Take screenshots** of your projects (1200x800px recommended)
2. **Save them** to `/public` folder (e.g., `/public/my-ecommerce-app.png`)
3. **Update the data:**

```javascript
export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "My E-Commerce App",
    subtitle: "Online Shopping Platform",
    blurb: "Built a full-stack e-commerce platform with React and Node.js. Features include user authentication, product management, and Stripe payments.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/my-ecommerce-app.png",  // Your screenshot
    video: null,
    repo: "https://github.com/yourusername/ecommerce-app",
    demo: "https://my-ecommerce-app.vercel.app",
  },
  // Add 1-2 more featured projects
];

export const SMALL_PROJECTS = [
  {
    id: 3,
    title: "Weather App",
    blurb: "Real-time weather application",
    tech: ["React", "Weather API"],
    image: "/weather-app.png",
    repo: "https://github.com/yourusername/weather-app",
    demo: "https://my-weather-app.vercel.app",
  },
  // Add 3-5 smaller projects
];
```

### Step 5: Add Your Skills (3 minutes)

**File: `src/data/skills.js`**

1. **Pick icons** from [react-icons.github.io](https://react-icons.github.io/react-icons/)
2. **Import them** at the top:
   ```javascript
   import { FaReact, FaPython, FaDocker } from "react-icons/fa";
   import { SiTypescript, SiPostgresql } from "react-icons/si";
   ```

3. **Add your skills:**
   ```javascript
   export const skills = [
     {
       icon: <FaReact className="text-sky-500" />,
       name: "React",
       desc: "Building modern web apps",
     },
     {
       icon: <FaPython className="text-blue-600" />,
       name: "Python",
       desc: "Backend & data science",
     },
     // Add 10-16 skills total
   ];
   ```

### Step 6: Customize Colors (2 minutes)

**File: `src/index.css`**

Change the accent color (around line 12):

```css
:root {
  --accent: #ffd600;  /* Current: Yellow */
}
```

Try these popular alternatives:
```css
--accent: #ff6b6b;  /* Coral Red */
--accent: #4ecdc4;  /* Teal */
--accent: #a78bfa;  /* Purple */
--accent: #f59e0b;  /* Orange */
--accent: #10b981;  /* Green */
```

### Step 7: Update About Section (3 minutes)

**File: `src/components/About.jsx`**

Search for placeholder text and replace with your story:

1. Update your greeting and tagline
2. Write 2-3 paragraphs about:
   - Your background
   - Your skills and experience
   - What you're passionate about
   - What you're looking for

---

## 🎯 Common Customizations

### Change the Logo

The portfolio uses a custom "BatCat" logo. To replace it:

**Option 1: Keep the BatCat** (it's unique!)

**Option 2: Use Text Logo**

Edit `src/components/Navbar.jsx`:
```javascript
{/* Replace the BatCat component with: */}
<span className="text-2xl font-bold">JD</span>
```

**Option 3: Use Your Own SVG**

1. Add your logo to `/public/my-logo.svg`
2. Update Navbar:
   ```javascript
   <img src="/my-logo.svg" alt="Logo" className="w-8 h-8" />
   ```

### Add More Sections

Want to add a Blog or Testimonials section?

1. Create new component in `src/components/YourSection.jsx`
2. Import it in `src/App.jsx`
3. Add it to the page:
   ```javascript
   <YourSection />
   ```
4. Add navigation link in `src/components/Navbar.jsx`

### Change Fonts

**File: `src/index.css`** (line 2)

Current fonts: Inter, IBM Plex Mono, Space Grotesk

To change:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
```

Then update the CSS variable:
```css
:root {
  --font-sans: "Poppins", system-ui, sans-serif;
}
```

---

## 🖼️ Image Guidelines

### Project Screenshots
- **Recommended size**: 1200x800px (3:2 ratio)
- **Format**: PNG or JPG
- **Max file size**: 500KB (use [TinyPNG](https://tinypng.com) to compress)
- **Naming**: Use descriptive names (`ecommerce-dashboard.png`, not `IMG_1234.png`)

### Profile Image
- **Recommended size**: 400x400px (square)
- **Format**: PNG with transparent background or JPG
- **Style**: Professional but approachable

### General Tips
- Use consistent styling across all images
- Add subtle shadows or borders in your screenshots
- Show the most impressive features of your projects
- Optimize for web before uploading

---

## 📱 Test Before Deploy

### Checklist

- [ ] Test on desktop browser (Chrome, Firefox, Safari)
- [ ] Test on mobile (real device or Chrome DevTools)
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Contact form submits successfully
- [ ] Resume downloads correctly
- [ ] Navigation scrolls smoothly
- [ ] No console errors (F12 → Console tab)

### Browser Testing

```bash
# Start dev server
npm run dev

# Open in different browsers:
# - Chrome/Edge: http://localhost:5173
# - Firefox: Same URL
# - Safari (Mac): Same URL

# Test mobile:
# - Chrome DevTools: F12 → Toggle device toolbar
# - Responsive mode: Cmd+Opt+M (Mac) or Ctrl+Shift+M (Windows)
```

---

## 🚨 Common Mistakes to Avoid

1. **❌ Forgetting to update Formspree endpoint**
   - Your contact form won't work without it!

2. **❌ Using images with spaces in filenames**
   - Use `my-project.png`, not `my project.png`

3. **❌ Not testing on mobile**
   - 50%+ of visitors will be on mobile devices

4. **❌ Broken links**
   - Always test your GitHub and demo links

5. **❌ Huge image files**
   - Compress images to < 500KB each

6. **❌ Not updating meta tags**
   - Update `index.html` for better SEO and social sharing

---

## 🎓 Pro Tips

### Tip 1: Use GitHub Copilot (or similar)
When editing data files, AI assistants can help you write better descriptions.

### Tip 2: Screenshot Like a Pro
- Use browser extensions like "Full Page Screenshot"
- Capture your projects at 1920x1080 resolution
- Show interactive features (hover states, modals)

### Tip 3: Keep It Updated
Set a reminder to update your portfolio every 3 months with:
- New projects
- Updated skills
- Fresh resume
- New achievements

### Tip 4: A/B Test Your Copy
- Write 2-3 different versions of your "About" section
- Ask friends which sounds better
- Keep iterating

### Tip 5: Add Google Analytics (Optional)
See who's visiting your portfolio:

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 🆘 Need Help?

### Quick Fixes

**Nothing shows up?**
```bash
# Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**CSS looks broken?**
```bash
# Rebuild Tailwind
npm run build
npm run dev
```

**Deploy failed?**
- Check that all image paths start with `/`
- Verify `package.json` has correct build scripts
- Clear Vercel/Netlify cache and redeploy

### Resources

- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [MDN Web Docs](https://developer.mozilla.org)

---

**You're all set! 🚀 Now make it yours and ship it!**
