// ============================================
// PORTFOLIO DATA
// ============================================
// Projects, jobs, schools, and skills data
//
// Highlight keywords using {{keyword}} syntax (\textbf{...} in the resume)

/* eslint-disable react-refresh/only-export-components -- data module, not components */

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
import resume from "./resume.generated.json";

// ========== FROM THE RESUME ==========
// Projects, experience and education are read from the LaTeX resume in
// /resume (see resume/README.md). Edit the .tex files there: the PDF and
// this site both update. resume.generated.json is rebuilt on every
// `npm run dev` and `npm run build`.
const withHighlights = (list, key) =>
  list.map((item) => ({ ...item, [key]: item[key].map(parseHighlight) }));

// Extra projects live here, not in the resume, so the resume PDF stays untouched.
// shortcut: no screenshots yet (image null shows the placeholder), add them to public/images/projects/.
const byId = (list, id) => list.find((p) => p.id === id);
const EXTRA_FEATURED = [
  {
    id: 101,
    title: "AirML",
    subtitle: "Airbnb Price & Occupancy Prediction",
    blurb:
      "Predictive analytics for short-term rentals in Italy: feature engineering on listing and calendar data, price and occupancy models in Jupyter, and a web dashboard to explore the predictions. Group project for the Data Intensive Applications course.",
    tech: ["Python", "Jupyter", "Machine Learning", "Feature Engineering", "Web App"],
    image: "/images/projects/featured/airml.png",
    video: null,
    repo: "https://github.com/D3stan/AirML",
    demo: "https://airml.0xpuddu.com",
  },
  {
    id: 102,
    title: "CUDA Simplex Method",
    subtitle: "GPU Linear Programming Solver",
    blurb:
      "CUDA implementation of a two-phase simplex solver that reads .mps/.dat problems, builds the tableau and pivots on the GPU. Reports status, objective value, time and iterations, with JSON/CSV output to benchmark against CPU solvers.",
    tech: ["CUDA", "C++", "HPC", "Linear Programming"],
    image: "/images/projects/featured/cuda-simplex.png",
    video: null,
    repo: "https://github.com/D3stan/cuda-simplex-method",
    demo: null,
  },
];
const EXTRA_SMALL = [
  {
    id: 103,
    title: "AlmaStreet",
    subtitle: "University Meme Stock Market",
    blurb:
      "A stock-market simulator where students trade meme assets with campus currency. Prices come from an automated market maker bonding curve for guaranteed liquidity, with portfolios, a leaderboard and badges.",
    tech: ["PHP", "AMM", "MySQL", "Gamification"],
    image: "/images/projects/small/alma-street.png",
    video: null,
    repo: "https://github.com/D3stan/uni-meme-stock-market",
    demo: null,
  },
  {
    id: 104,
    title: "UniBo Lessons",
    subtitle: "Mobile-first Timetable Viewer",
    blurb:
      "Lightweight web app that pulls course timetables from the official UniBo JSON API and stores preferences locally, so students get a fast, offline-ready schedule without the slow official portal.",
    tech: ["TypeScript", "Preact", "Vite", "GitHub Pages"],
    image: "/images/projects/small/unibo-lessons.png",
    video: null,
    repo: "https://github.com/D3stan/unibo-lessons",
    demo: "https://d3stan.github.io/unibo-lessons/",
  },
  {
    id: 105,
    title: "Gradle Report Viewer",
    subtitle: "VS Code Extension",
    blurb:
      "Extension that opens Gradle build reports (Checkstyle, PMD, SpotBugs, JaCoCo, test results) directly inside VS Code instead of an external browser.",
    tech: ["TypeScript", "VS Code API", "Gradle"],
    image: "/images/projects/small/gradle-report-viewer.png",
    video: "/videos/projects/small/gradle-report-viewer.mp4",
    repo: "https://github.com/D3stan/gradle-report-viewer",
    demo: "https://github.com/D3stan/gradle-report-viewer/releases",
    buttons: { demo: "Download" },
  },
];

export const PROJECTS_FEATURED = [
  byId(resume.projectsFeatured, 3),
  ...EXTRA_FEATURED,
  byId(resume.projectsFeatured, 1),
].filter(Boolean);
export const PROJECTS_SMALL = [
  ...EXTRA_SMALL,
  ...resume.projectsSmall.map((p) =>
    p.id === 2 ? { ...p, repo: p.repo ?? "https://github.com/D3stan/rsp-ecom" } : p,
  ),
];
export const JOBS = withHighlights(resume.jobs, "bullets");
export const SCHOOLS = withHighlights(resume.schools, "details");

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
