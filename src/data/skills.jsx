// ============================================
// SKILLS DATA
// ============================================
// Update this file with your own skills and technologies
// Each skill includes: icon (React component), name, and description

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

// You can add more icons from react-icons: https://react-icons.github.io/react-icons/
export const skills = [
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
