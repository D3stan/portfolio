// ============================================
// PORTFOLIO DATA
// ============================================
// Projects, jobs, schools, and skills data
//
// 💡 TIP: Highlight keywords using {{keyword}} syntax
// Example: parseHighlight("Built with {{React}} and {{Node.js}}")

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaAws,
  FaCogs,
  FaEllipsisH,
  FaMicrosoft,
} from "react-icons/fa";
import {
  SiRedux,
  SiMongodb,
  SiExpress,
  SiCplusplus,
  SiFigma,
} from "react-icons/si";
import { parseHighlight } from "@/utils/TextHighlight";

// ========== FEATURED PROJECTS ==========
export const PROJECTS_FEATURED = [
  {
    id: 1,
    title: "JavaDyno",
    subtitle: "Engine Dynamometer Management Software",
    blurb:
      "Guided a group of 4 in developing an engine dynamometer management system (EDMS) with a group project team, overseeing complete data retrieval and graphical plotting. Implemented an MVC core structure for data exportation and session logging. Ensured OBD-II CAN bus compatibility for vehicle testing, enhancing real-world applicability. Integrated WebSocket and Serial connection support for versatile device communication.",
    tech: ["Java", "MVC", "WebSocket", "Serial", "OBD-II", "CANBUS"],
    image: "/images/projects/featured/javadyno.png",
    video: null,
    repo: "https://github.com/MattechIT/OOP24-java-dyno",
    demo: "https://github.com/MattechIT/OOP24-java-dyno/releases/tag/0.0.4",
    buttons: {
      demo: "Try It",
      code: "Code",
    },
  },
  {
    id: 2,
    title: "Motorcycle Exhaust Valve Control Unit",
    subtitle: "ESP32 Electronic Control Unit",
    blurb:
      "Developed an electronic exhaust valve control unit based on ESP32. Created a browser app to control the device via WiFi through WebSocket communication. Designed a custom PCB using KiCad and a custom 3D printed enclosure using Fusion360. Implemented secure OTA updates through a custom remote server based on NodeJS.",
    tech: [
      "ESP32",
      "WebSocket",
      "KiCad",
      "Fusion360",
      "Node.js",
      "OTA",
    ],
    image: "/images/projects/featured/exhaust-valve.png",
    video: null,
    repo: "https://github.com/D3stan/EV-Controller",
    demo: "https://d3stan.github.io/EV-Controller",
    buttons: {
      demo: "Live Demo",
      code: "Code",
    },
  },
];

// ========== SMALL PROJECTS ==========
export const PROJECTS_SMALL = [
  {
    id: 3,
    title: "Motorcycle Parts E-commerce Platform",
    blurb:
      "Built a full-stack e-commerce platform using Laravel, React, and Inertia.js. Implemented secure payment processing with Stripe via Laravel Cashier. Developed an admin dashboard for product, order, and customer management with analytics and reporting tools. Ensured robust security with mandatory email and webhook signature validation. Deployed using Linux VPS.",
    tech: ["Laravel 12", "React 19", "Inertia.js", "Stripe", "Shadcn"],
    image: "/images/projects/small/motorcycle-ecommerce.png",
    video: null,
    repo: null,
    demo: "https://rsp-industries.com",
  },
];

// ========== JOBS / EXPERIENCE ==========
export const JOBS = [
  {
    company: "University Motorsport Team (MotoStudent Project)",
    badge: "MS",
    logo: "/logos/unibo-motorsport.png",
    role: "E-Powertrain and Electronics Department Member",
    period: "Oct. 2025 - Present",
    sub: "University of Bologna, Italy",
    bullets: [
      parseHighlight("Member of the {{E-Powertrain and Electronics}} Department of the university's motorsport team, contributing to the development of an electric motorcycle."),
    ],
  },
  {
    company: "Enaip",
    badge: "EN",
    logo: "/logos/enaip.png",
    role: "System Administrator Intern",
    period: "Sept. 2025 - present",
    sub: "Cesena, Italy",
    bullets: [
      parseHighlight("Assisted in configuring and maintaining {{Windows Domain Controller}}, ensuring reliable system performance and uptime."),
      "Documented system configurations, network layouts, and maintenance procedures for internal use.",
      parseHighlight("Worked with virtualization tools such as {{VMware}} and {{Proxmox}} to create and test server environments."),
    ],
  },
  {
    company: "Cables",
    badge: "CA",
    logo: "/logos/cables.png",
    role: "Automation Technician",
    period: "Jun. 2023 - Sept. 2023",
    sub: "Cesena, Italy",
    bullets: [
      "Assisted in assembling electrical control panels for industrial automation systems, following detailed wiring diagrams and specifications.",
      parseHighlight("Helped troubleshoot basic {{PLC}} input/output issues and performed routine checks on control system hardware."),
    ],
  },
  {
    company: "Italmetal sp. z o. o.",
    badge: "IT",
    logo: "/logos/italmetal.png",
    role: "IT Assistant",
    period: "Jun. 2022 - Jul. 2022",
    sub: "Wrocław, Poland",
    bullets: [
      parseHighlight("Completed the {{Erasmus+}} 'Trainee for Industry 4.0 Plus' internship program, gaining practical experience in industrial environments."),
      "Assisted with the digitization of paper records by transferring them to solid-state storage systems.",
      "Participated in basic electrical work including the installation of sockets and lighting.",
    ],
  },
];

// ========== SCHOOLS / EDUCATION ==========
export const SCHOOLS = [
  {
    school: "University of Bologna",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "Sept. 2023 - Present",
    badge: "UNIBO",
    address: "Cesena, Italy",
    url: "https://www.unibo.it",
    logo: "/logos/unibo.png",
    details: [
      parseHighlight("Relevant Coursework: Algorithms & Data Structures ({{C}}), Object-Oriented Programming ({{Java}}), Linear Algebra for Machine Learning ({{Python}}), Programming ({{C}})"),
      parseHighlight("Extracurricular Activities: Member of the {{E-Powertrain and Electronics}} Department of the university's motorsport team ({{MotoStudent Project}}), contributing to the development of an electric motorcycle."),
    ],
    hasDropdownPhoto: false,
  },
  {
    school: "I.T.T. Montani",
    degree: "High School Diploma",
    period: "Sept. 2018 - Jun. 2023",
    badge: "ITT",
    address: "Fermo, Italy",
    url: "https://www.istitutomontani.edu.it",
    logo: "/logos/montani.png",
    details: [
      parseHighlight("Designed and implemented automation systems involving {{PLC}} and {{HMI}} programming."),
      parseHighlight("Participated in the {{Omron Smart Project Trophy 2023}} competition."),
      parseHighlight("Earned a {{Omron Robotics Operation and Programming Certificate}}."),
    ],
    hasDropdownPhoto: false,
  },
];

// ========== SKILLS ==========
export const SKILLS = [
  {
    icon: <FaHtml5 className="text-orange-600" />,
    name: "HTML",
    desc: "Semantic & accessible markup",
  },
  {
    icon: <FaCss3Alt className="text-blue-600" />,
    name: "CSS / Tailwind",
    desc: "Responsive & utility-first design",
  },
  {
    icon: <span className="text-yellow-500 font-bold">JS</span>,
    name: "JavaScript (ES6+)",
    desc: "Modern, scalable JavaScript",
  },
  {
    icon: <FaReact className="text-sky-500" />,
    name: "React",
    desc: "Component-based UIs",
  },
  {
    icon: <SiRedux className="text-purple-500" />,
    name: "Redux Toolkit",
    desc: "State management made simple",
  },
  {
    icon: <FaNodeJs className="text-green-600" />,
    name: "Node.js",
    desc: "Backend with JavaScript",
  },
  {
    icon: <SiExpress className="text-gray-700" />,
    name: "Express.js",
    desc: "Fast REST APIs",
  },
  {
    icon: <SiMongodb className="text-green-700" />,
    name: "MongoDB",
    desc: "NoSQL Database",
  },
  {
    icon: <FaDocker className="text-sky-600" />,
    name: "Docker",
    desc: "Containerized apps",
  },
  {
    icon: <FaGithub className="text-gray-900" />,
    name: "GitHub",
    desc: "Code collaboration platform",
  },
  {
    icon: <FaAws className="text-orange-500" />,
    name: "AWS",
    desc: "EC2, S3, Lambda, more",
  },
  {
    icon: <FaMicrosoft className="text-blue-700" />,
    name: "Azure",
    desc: "App Service, Functions",
  },
  {
    icon: <SiCplusplus className="text-blue-700" />,
    name: "C++",
    desc: "STL, OOP, performance",
  },
  {
    icon: <SiFigma className="text-pink-500" />,
    name: "Figma",
    desc: "Wireframes & handoff",
  },
  {
    icon: <FaCogs className="text-gray-800" />,
    name: "CI/CD",
    desc: "Pipelines & automation",
  },
  {
    icon: <FaEllipsisH className="text-gray-700" />,
    name: "Many more",
    desc: "Postgres, Vercel, Nginx…",
  },
];
