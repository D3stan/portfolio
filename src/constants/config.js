// ============================================
// SITE CONFIGURATION
// ============================================
// Update these constants with your personal information

export const SITE_CONFIG = {
  // Personal Information
  name: "Your Full Name",
  title: "Your Professional Title", // e.g., "Full-Stack Developer", "Software Engineer"
  location: "Your City, Country",
  email: "your.email@example.com",
  
  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/your-profile/",
    portfolio: "https://yourportfolio.com/",
    twitter: "https://twitter.com/yourusername", // Optional
  },
  
  // About Section
  about: {
    greeting: "Hi, I'm", // Greeting prefix
    tagline: "I build things for the web.", // Short tagline
    description: [
      "Your first paragraph about yourself and your experience.",
      "Your second paragraph highlighting your skills and what you do.",
      "Your third paragraph about your goals and what you're looking for.",
    ],
  },
  
  // Contact Form
  contact: {
    formspreeEndpoint: "https://formspree.io/f/your-form-id", // Get this from formspree.io
    title: "Get In Touch",
    description: "Have a project in mind or just want to connect? Feel free to reach out!",
  },
  
  // Resume
  resume: {
    fileName: "YourName-Resume.pdf", // Must match the file in /public folder
    downloadName: "YourName-Resume.pdf", // The filename when downloaded
  },
  
  // SEO & Meta Tags
  seo: {
    title: "Your Name | Professional Title",
    description: "Your professional description for search engines and social media previews.",
    keywords: ["keyword1", "keyword2", "keyword3", "your skills"],
    siteUrl: "https://yourportfolio.com",
    image: "/portfolio-preview.png", // Social media preview image in /public folder
  },
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
