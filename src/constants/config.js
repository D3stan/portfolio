// ============================================
// SITE CONFIGURATION
// ============================================
// Update these constants with your personal information

export const SITE_CONFIG = {
  // Personal Information
  name: "Manoj Adhikari",
  title: "Full-Stack Developer", 
  shortName: "MANOJ", // Used in navbar
  location: "Sydney, Australia",
  locationFull: "Sydney, New South Wales, Australia",
  email: "manojadhikari57@gmail.com",
  
  // Social Links
  social: {
    github: "https://github.com/manojadh57",
    linkedin: "https://www.linkedin.com/in/manojadh57/",
    portfolio: "https://yourportfolio.com/",
    twitter: "https://twitter.com/yourusername", // Optional
  },
  
  // About Section
  about: {
    greeting: "Hi, I'm",
    roles: ["Full-Stack Developer", "React • Node.js", "Simple, Reliable"],
    availability: {
      status: "Available",
      location: "Australia · Remote/Hybrid"
    },
    description: `A dedicated Full-Stack Developer skilled in crafting web applications using JavaScript, React.js, Node.js, and Express, complemented by proficiency in modern libraries and tooling. I value clean architecture, accessible UI, strong API design, and measurable performance.`,
    highlights: ["JavaScript", "React.js", "Node.js", "Express", "clean architecture", "accessible UI", "strong API design", "measurable performance"]
  },
  
  // Contact Form
  contact: {
    formspreeEndpoint: "https://formspree.io/f/mjkpyjon",
    title: "Contact",
    description: "Want to collaborate or hire me? Drop a message here — I'll reply ASAP.",
    directEmailPrompt: "or email me directly",
    emailSubject: "Hello%20Manoj"
  },
  
  // Resume
  resume: {
    fileName: "/documents/Resume.pdf", // Must match the file in /public folder
    downloadName: "ManojAdhikari-Resume.pdf", // The filename when downloaded
  },
  
  // Footer
  footer: {
    copyright: "Made by Manoj Adhikari — Brutalist / Swiss UI with yellow accent.",
    attribution: "BatCat mark inspired by Mark Horn."
  },
  
  // Projects
  projects: {
    title: "PROJECTS",
    smallProjectsLabel: "Other Projects",
    ctaText: "More projects on GitHub",
    ctaButton: "View All",
    buttons: {
      liveDemo: "Live Demo",
      demo: "Demo",
      code: "Code"
    }
  },
  
  // Skills
  skills: {
    title: "SKILLS"
  },
  
  // Experience
  experience: {
    title: "EXPERIENCE"
  },
  
  // Education
  education: {
    title: "Education",
    graduationCaption: "graduation day 2022, Sydney CBD"
  },
  
  // SEO & Meta Tags
  seo: {
    title: "Manoj Adhikari | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Node.js, and modern web technologies.",
    keywords: ["Full-Stack Developer", "React", "Node.js", "JavaScript", "Web Developer"],
    siteUrl: "https://yourportfolio.com",
    image: "/images/portfolio-preview.png",
  },
  
  // Accessibility
  accessibility: {
    skipToMain: "Skip to main content"
  }
};

// Navigation Links
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Footer Links (optional)
export const FOOTER_LINKS = {
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
