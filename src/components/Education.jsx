import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Diamond } from "lucide-react";
import { SITE_CONFIG } from "../constants/config";

/* 🔎 Keywords to emphasize inline */
const HIGHLIGHTS = [
  "Python",
  "Java",
  "C",
  "JavaScript",
  "React",
  "Node.js",
  "Algorithms",
  "Data Structures",
  "Object-Oriented Programming",
  "Linear Algebra",
  "Machine Learning",
  "Programming",
  "GPA",
  "E-Powertrain",
  "Electronics",
  "MotoStudent",
  "PLC",
  "HMI",
  "Omron",
  "Robotics",
  "Smart Project Trophy",
];

function Emph({ text }) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${HIGHLIGHTS.map(esc).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) =>
        HIGHLIGHTS.includes(part) ? (
          <strong key={i} className="font-semibold" style={{ color: 'var(--accent)' }}>
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-2 leading-relaxed text-[15px]">
      <Diamond className="mt-1 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
      <span>
        <Emph text={children} />
      </span>
    </li>
  );
}

const education = [
  {
    school: "University of Bologna",
    degree: "B.Sc. in Computer Science and Engineering",
    period: "Sept. 2023 - Jul. 2026", // Expected graduation
    badge: "UNIBO",
    address: "Cesena, Italy",
    url: "https://www.unibo.it",
    logo: "", // TODO: Add University of Bologna logo to /public folder
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
    logo: "", // TODO: Add school logo if available
    details: [
      "Designed and implemented automation systems involving PLC and HMI programming.",
      "Participated in the Omron Smart Project Trophy 2023 competition.",
      "Earned a Omron Robotics Operation and Programming Certificate.",
    ],
    hasDropdownPhoto: false,
  },
];

export default function Education() {
  const [openIndex, setOpenIndex] = useState(-1);

  const cand = [
    "/images/profile/graduction.jpg",
    "/images/profile/graduction.jpeg",
    "/images/profile/graduction.png",
    "/images/profile/graduction.webp",
  ];
  const [srcIdx, setSrcIdx] = useState(0);
  const handleImgError = () =>
    setSrcIdx((i) => (i < cand.length - 1 ? i + 1 : i));

  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-24 text-white grid-bg">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Heading */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="uppercase font-extrabold tracking-tight border-2 border-border bg-card text-fg px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)] text-2xl">
            {SITE_CONFIG.education.title}
          </h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border-2 border-border bg-card text-fg shadow-[8px_8px_0_var(--shadow-weak)]"
              >
                {/* Header: responsive stack on mobile */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className={[
                    "w-full text-left border-b-2 border-border",
                    "p-4 md:p-5",
                  ].join(" ")}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                    {/* Left group */}
                    <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border overflow-hidden flex items-center justify-center bg-card shrink-0">
                        {edu.logo ? (
                          <img
                            src={edu.logo}
                            alt={`${edu.school} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <span className="font-extrabold uppercase text-xs">
                            {edu.badge}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        {/* School link (don't toggle when clicked) */}
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-lg sm:text-xl font-extrabold leading-tight underline decoration-2 decoration-accent underline-offset-2 hover:opacity-90 break-words"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {edu.school}
                        </a>

                        <div className="font-mono font-semibold text-teal-700 dark:text-teal-400 mt-0.5">
                          {edu.degree}
                        </div>
                        <div className="text-xs mt-1 text-muted">
                          {edu.address}
                        </div>
                      </div>
                    </div>

                    {/* Right group (moves below on mobile) */}
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
                      <div className="font-mono text-xs sm:text-sm">
                        {edu.period}
                      </div>
                      {edu.details && (
                        <span
                          className="border-2 border-border bg-card p-1 shadow-[4px_4px_0_var(--shadow-strong)]"
                          aria-hidden="true"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`} />
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Dropdown: details */}
                {edu.details && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 md:p-5">
                          <div className="pl-3 md:pl-4 border-l-4" style={{ borderColor: 'var(--accent)' }}>
                            <ul className="list-none mt-2 space-y-2">
                              {edu.details.map((detail, i) => (
                                <Bullet key={i}>{detail}</Bullet>
                              ))}
                            </ul>
                          </div>

                          {/* Optional photo for graduation */}
                          {edu.hasDropdownPhoto && (
                            <div className="mt-4 border-2 border-border bg-card p-3 shadow-[6px_6px_0_var(--shadow-strong)]">
                              <img
                                src={cand[srcIdx]}
                                onError={handleImgError}
                                alt="Graduation ceremony"
                                className="w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain"
                                loading="lazy"
                              />
                              <p className="mt-2 text-xs text-muted">
                                {SITE_CONFIG.education.graduationCaption}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
