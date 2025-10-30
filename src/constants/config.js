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
    description: `Computer Science and Engineering student at the University of Bologna with hands-on experience in software development, system administration, and embedded systems. Skilled in Java, C / C++, JavaScript, React, Node.js, and Laravel. Experienced in PLC and HMI programming, domain controller management, and building full-stack web applications for e-commerce and IoT projects.`,
    highlights: ["Embedded Systems", "Java", "C / C++", "JavaScript", "React", "Node.js", "Laravel", "PLC Programming", "System Administration", "Embedded Systems", "OOP"]
  },
  
  // Contact Form
  contact: {
    formspreeEndpoint: "https://formspree.io/f/mjkpyjon",
    title: "Contact",
    description: "Want to collaborate or just have a chat? Drop a message here.",
    directEmailPrompt: "or email me directly",
    emailSubject: "Hello%20Alessandro"
  },
  
  // Resume
  resume: {
    fileName: "/documents/Resume.pdf", // Must match the file in /public folder
    downloadName: "AlessandroPorcheddu-Resume.pdf", // The filename when downloaded
  },
  
  // Footer
  footer: {
    copyright: "Made by Alessandro Porcheddu — Brutalist / Swiss UI.",
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
    title: "EXPERIENCE",
    jobs: [
      {
        company: "University Motorsport Team (MotoStudent Project)",
        badge: "MS",
        logo: "/logos/unibo-motorsport.png", // TODO: Add logo if available (you have motostudent images in /public)
        role: "E-Powertrain and Electronics Department Member",
        period: "Oct. 2025 - Present",
        sub: "University of Bologna, Italy",
        bullets: [
          "Member of the E-Powertrain and Electronics Department of the university's motorsport team, contributing to the development of an electric motorcycle.",
        ],
      },
      {
        company: "Enaip",
        badge: "EN",
        logo: "/logos/enaip.png", // TODO: Add logo if available
        role: "System Administrator Intern",
        period: "Sept. 2025 - present",
        sub: "Cesena, Italy",
        bullets: [
          "Assisted in configuring and maintaining Windows Domain Controller, ensuring reliable system performance and uptime.",
          "Documented system configurations, network layouts, and maintenance procedures for internal use.",
          "Worked with virtualization tools such as VMware and Proxmox to create and test server environments.",
        ],
      },
      {
        company: "Cables",
        badge: "CA",
        logo: "/logos/cables.png", // TODO: Add logo if available
        role: "Automation Technician",
        period: "Jun. 2023 - Sept. 2023",
        sub: "Cesena, Italy",
        bullets: [
          "Assisted in assembling electrical control panels for industrial automation systems, following detailed wiring diagrams and specifications.",
          "Helped troubleshoot basic PLC input/output issues and performed routine checks on control system hardware.",
        ],
      },
      {
        company: "Italmetal sp. z o. o.",
        badge: "IT",
        logo: "/logos/italmetal.png", // TODO: Add logo if available
        role: "IT Assistant",
        period: "Jun. 2022 - Jul. 2022",
        sub: "Wrocław, Poland",
        bullets: [
          "Completed the Erasmus+ 'Trainee for Industry 4.0 Plus' internship program, gaining practical experience in industrial environments.",
          "Assisted with the digitization of paper records by transferring them to solid-state storage systems.",
          "Participated in basic electrical work including the installation of sockets and lighting.",
        ],
      },
    ],
    // Keywords to highlight in experience bullets
    highlights: [
      "Python",
      "Java",
      "C",
      "JavaScript",
      "React",
      "Node.js",
      "Laravel",
      "PLC",
      "HMI",
      "Domain Controller",
      "Windows",
      "VMware",
      "Proxmox",
      "Active Directory",
      "EDMS",
      "WebSocket",
      "Serial",
      "OBD-II",
      "MVC",
      "Stripe",
      "Inertia.js",
      "ESP32",
      "KiCad",
      "Fusion360",
      "OTA",
      "Erasmus+",
      "Omron",
      "Robotics",
    ],
  },
  
  // Education
  education: {
    title: "Education",
    schools: [
      {
        school: "University of Bologna",
        degree: "B.Sc. in Computer Science and Engineering",
        period: "Sept. 2023 - Jul. 2026", // Expected graduation
        badge: "UNIBO",
        address: "Cesena, Italy",
        url: "https://www.unibo.it",
        logo: "/logos/unibo.png", // TODO: Add University of Bologna logo to /public folder
        details: [
          "Relevant Coursework: Algorithms & Data Structures (C), 4.0 GPA, Object-Oriented Programming (Java), 4.0 GPA, Linear Algebra for Machine Learning (Python), 4.0 GPA, Programming (C), 4.0 GPA",
          "Extracurricular Activities: Member of the E-Powertrain and Electronics Department of the university's motorsport team (MotoStudent Project), contributing to the development of an electric motorcycle.",
        ],
        hasDropdownPhoto: false, // TODO: Set to true if you want to add a graduation/campus photo
      },
      {
        school: "I.T.T. Montani",
        degree: "High School Diploma",
        period: "Sept. 2018 - Jun. 2023",
        badge: "ITT",
        address: "Fermo, Italy",
        url: "https://www.istitutomontani.edu.it", // TODO: Verify URL
        logo: "/logos/montani.png", // TODO: Add school logo if available
        details: [
          "Designed and implemented automation systems involving PLC and HMI programming.",
          "Participated in the Omron Smart Project Trophy 2023 competition.",
          "Earned a Omron Robotics Operation and Programming Certificate.",
        ],
        hasDropdownPhoto: false,
      },
    ],
    // Keywords to highlight in education details
    highlights: [
      "Python",
      "Java",
      "C",
      "JavaScript",
      "React",
      "Node.js",
      "E-Powertrain",
      "Electronics",
      "MotoStudent",
      "PLC",
      "HMI",
      "Omron",
      "Robotics",
      "Smart Project Trophy",
    ],
  },
  
  // SEO & Meta Tags
  seo: {
    title: "Alessandro Porcheddu | Software Developer & System Administrator",
    description: "Computer Science and Engineering student with expertise in full-stack development, system administration, embedded systems, and PLC programming. Skilled in Python, Java, JavaScript, React, Node.js, and Laravel.",
    keywords: ["Software Developer", "System Administrator", "Full-Stack Developer", "React", "Node.js", "Python", "Java", "Laravel", "PLC Programming", "Embedded Systems", "Computer Science", "Engineering"],
    siteUrl: "https://0xpuddu.it", 
    image: "/images/profile/portfolio-preview.png",
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
