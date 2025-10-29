import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2, Diamond } from "lucide-react";
import { SITE_CONFIG } from "../constants/config";

/* 🔎 Keywords to emphasize inline */
const HIGHLIGHTS = [
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
  "Laravel Cashier",
  "Inertia.js",
  "ESP32",
  "KiCad",
  "Fusion360",
  "OTA",
  "Erasmus+",
  "Omron",
  "Robotics",
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

function ImpactBullet({ children }) {
  return (
    <li className="flex gap-2 leading-relaxed text-[15px]">
      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={{ color: 'var(--accent)' }} />
      <span>
        <Emph text={children} />
      </span>
    </li>
  );
}

/* ✅ Jobs (synced with your resume) */
const JOBS = [
  {
    company: "Enaip",
    badge: "EN",
    logo: "", // TODO: Add logo if available
    role: "System Administrator Intern",
    period: "Sept. 2024 – present",
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
    logo: "", // TODO: Add logo if available
    role: "Automation Technician",
    period: "Jun. 2023 – Sept. 2023",
    sub: "Cesena, Italy",
    bullets: [
      "Assisted in assembling electrical control panels for industrial automation systems, following detailed wiring diagrams and specifications.",
      "Helped troubleshoot basic PLC input/output issues and performed routine checks on control system hardware.",
    ],
  },
  {
    company: "Italmetal sp. z o. o.",
    badge: "IT",
    logo: "", // TODO: Add logo if available
    role: "IT Assistant",
    period: "Jun. 2022 – Jul. 2022",
    sub: "Wrocław, Poland",
    bullets: [
      "Completed the Erasmus+ 'Trainee for Industry 4.0 Plus' internship program, gaining practical experience in industrial environments.",
      "Assisted with the digitization of paper records by transferring them to solid-state storage systems.",
      "Participated in basic electrical work including the installation of sockets and lighting.",
    ],
  },
  {
    company: "University Motorsport Team (MotoStudent Project)",
    badge: "MS",
    logo: "", // TODO: Add logo if available (you have motostudent images in /public)
    role: "E-Powertrain and Electronics Department Member",
    period: "Sept. 2023 – Jul. 2026", // Estimated based on graduation
    sub: "University of Bologna, Italy",
    bullets: [
      "Member of the E-Powertrain and Electronics Department of the university's motorsport team (MotoStudent Project), contributing to the development of an electric motorcycle.",
    ],
  },
];

export default function Experience() {
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (idx) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Header */}
        <div className="w-full flex justify-center mb-8 sm:mb-10">
          <div className="inline-block border-2 border-border bg-card px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)]">
            <h2 className="text-2xl font-extrabold tracking-wide">
              {SITE_CONFIG.experience.title}
            </h2>
          </div>
        </div>

        <div className="space-y-9">
          {JOBS.map((job, i) => {
            const isOpen = open.has(i);
            const bodyId = `job-${i}-body`;

            return (
              <div
                key={i}
                className="border-2 border-border bg-card shadow-[8px_8px_0_var(--shadow-weak)]"
              >
                {/* Card header */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  className="w-full text-left p-4 md:p-5 border-b-2 border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                    {/* Left group */}
                    <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border overflow-hidden flex items-center justify-center bg-card shrink-0">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-extrabold">{job.badge}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-lg sm:text-xl font-extrabold leading-tight break-words">
                          {job.company}
                        </div>
                        <div className="font-mono text-teal-700 font-semibold mt-0.5">
                          {job.role}
                        </div>
                        {job.sub && (
                          <div className="text-xs mt-1 text-muted">
                            {job.sub}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right group */}
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
                      <div className="font-mono text-xs sm:text-sm">
                        {job.period}
                      </div>
                      <span
                        className={`border-2 border-border bg-card p-1 shadow-[4px_4px_0_var(--shadow-strong)] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Collapsible body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={bodyId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-5">
                        {/* Main bullets */}
                        <div className="pl-3 md:pl-4 border-l-4" style={{ borderColor: 'var(--accent)' }}>
                          <ul className="list-none mt-2 space-y-2">
                            {job.bullets.map((b, idx) => (
                              <Bullet key={idx}>{b}</Bullet>
                            ))}
                          </ul>
                        </div>

                        {/* Optional Impact section */}
                        {job.impactBullets?.length ? (
                          <div className="mt-5">
                            <div className="inline-flex items-center gap-2 rounded-md border-2 border-border bg-card px-3 py-1 shadow-[4px_4px_0_var(--shadow-strong)]">
                              <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                              <span className="text-sm font-extrabold">
                                {job.impactTitle || "Impact"}
                              </span>
                            </div>
                            <ul className="list-none mt-3 space-y-2">
                              {job.impactBullets.map((b, idx) => (
                                <ImpactBullet key={idx}>{b}</ImpactBullet>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
