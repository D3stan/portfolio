// ============================================
// SITE CONFIGURATION
// ============================================
// Update these constants with your personal information

export const SITE_CONFIG = {
  // Personal Information
  name: "Alessandro Porcheddu",
  title: "Software Developer & System Administrator", 
  shortName: "ALESSANDRO", // Used in navbar
  location: "Cesena, Italy",
  locationFull: "Cesena, Italy",
  email: "alessandroporcheddu000@gmail.com",
  phone: "(+39) 3703371317",
  
  // Social Links
  social: {
    github: "https://github.com/D3stan",
    linkedin: "https://www.linkedin.com/in/0xalessandro-porcheddu",
    portfolio: "https://0xpuddu.it/",
    twitter: "", // Optional
  },
  
  // About Section
  about: {
    greeting: "Hi, I'm",
    roles: ["Software Developer", "System Administrator", "Full-Stack Developer"],
    availability: {
      status: "Available",
      location: "Italy · Remote/Hybrid"
    },
    description: `Computer Science and Engineering student at the University of Bologna with hands-on experience in software development, system administration, and embedded systems. Skilled in Python, Java, C, JavaScript, React, Node.js, and Laravel. Experienced in PLC and HMI programming, domain controller management, and building full-stack web applications for e-commerce and IoT projects.`,
    highlights: ["Python", "Java", "C", "JavaScript", "React", "Node.js", "Laravel", "PLC Programming", "System Administration", "Embedded Systems", "OOP", "MVC", "EDMS"]
  },
  
  // Contact Form
  contact: {
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // TODO: Create your own Formspree endpoint at formspree.io
    title: "Contact",
    description: "Want to collaborate or hire me? Drop a message here — I'll reply ASAP.",
    directEmailPrompt: "or email me directly",
    emailSubject: "Hello%20Alessandro"
  },
  
  // Resume
  resume: {
    fileName: "/Resume.pdf", // Updated to match your actual resume file
    downloadName: "Alessandro-Porcheddu-Resume.pdf", // The filename when downloaded
  },
  
  // Footer
  footer: {
    copyright: "Made by Alessandro Porcheddu — Brutalist / Swiss UI with yellow accent.",
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
    title: "Alessandro Porcheddu | Software Developer & System Administrator",
    description: "Computer Science and Engineering student with expertise in full-stack development, system administration, embedded systems, and PLC programming. Skilled in Python, Java, JavaScript, React, Node.js, and Laravel.",
    keywords: ["Software Developer", "System Administrator", "Full-Stack Developer", "React", "Node.js", "Python", "Java", "Laravel", "PLC Programming", "Embedded Systems", "Computer Science", "Engineering"],
    siteUrl: "https://yourportfolio.com", // TODO: Update with your deployed portfolio URL
    image: "/portfolio-preview.png",
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
