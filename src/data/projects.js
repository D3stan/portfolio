// ============================================
// PROJECTS DATA
// ============================================
// Update this file with your own projects
// Each project should include: id, title, subtitle (optional), blurb, tech stack, image, video (optional), repo link, and demo link

// Featured Projects (main showcase projects)
export const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "JavaDyno",
    subtitle: "Engine Dynamometer Management Software",
    blurb:
      "Developed an engine dynamometer management system (EDMS) with a group project team, overseeing complete data retrieval and graphical plotting. Implemented an MVC core structure for data exportation and session logging. Ensured OBD-II CAN bus compatibility for vehicle testing, enhancing real-world applicability. Integrated WebSocket and Serial connection support for versatile device communication.",
    tech: ["Java", "MVC", "WebSocket", "Serial", "OBD-II", "CAN Bus"],
    image: "/images/projects/featured/javadyno.png", // TODO: Add your project image to /public folder
    video: null,
    repo: "https://github.com/MattechIT/OOP24-java-dyno", 
    demo: "https://github.com/MattechIT/OOP24-java-dyno/releases/tag/0.0.4",
  },
  {
    id: 2,
    title: "Motorcycle Parts E-commerce Platform",
    subtitle: "Full-Stack E-commerce Website",
    blurb:
      "Built a full-stack e-commerce platform using Laravel 12, React 19, and Inertia.js. Implemented secure payment processing with Stripe via Laravel Cashier. Designed responsive mobile UI with reusable components using the shadcn React library. Developed an admin dashboard for product, order, and customer management with analytics and reporting tools. Ensured robust security with mandatory email and webhook signature validation.",
    tech: ["Laravel 12", "React 19", "Inertia.js", "Stripe", "Shadcn"],
    image: "/images/projects/featured/motorcycle-ecommerce.png", // TODO: Add your project image to /public folder
    video: null,
    repo: "https://github.com/D3stan/motorcycle-parts", // TODO: Update with actual repo URL if public
    demo: "https://rsp-industries.com", // TODO: Add live demo URL if deployed
  },
];

// Smaller Projects (additional projects to showcase)
export const SMALL_PROJECTS = [
  {
    id: 3,
    title: "Motorcycle Exhaust Valve Control Unit",
    blurb: "Developed an electronic exhaust valve control unit based on ESP32. Created a browser app to control the device via WiFi through WebSocket communication. Designed a custom PCB using KiCad and a custom 3D printed enclosure using Fusion360. Implemented secure OTA updates through a custom remote server based on NodeJS.",
    tech: ["ESP32", "WebSocket", "WiFi", "KiCad", "Fusion360", "Node.js", "OTA"],
    image: "/exhaust-valve.png", // TODO: Add your project image to /public folder
    video: null,
    repo: "https://github.com/D3stan/exhaust-valve-control", // TODO: Update with actual repo URL if public
    demo: null,
  },
  // TODO: Add more projects from your portfolio
  // You can add GitHub repositories like:
  // - Calculator app
  // - Weather app
  // - Movie database
  // - Currency converter
  // Or any other projects you want to showcase
];
