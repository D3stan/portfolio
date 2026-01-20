import { useState } from "react";
import { SECTION_TITLE_EDUCATION } from "@/config";
import { SCHOOLS } from "@/config/data";
import AccordionCard from "./shared/AccordionCard";

/* ✅ Education from config */
const education = SCHOOLS;

export default function Education() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-24 text-white grid-bg">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Heading */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="uppercase font-extrabold tracking-tight border-2 border-border bg-card text-fg px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)] text-2xl">
            {SECTION_TITLE_EDUCATION}
          </h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, idx) => (
            <AccordionCard
              key={idx}
              item={edu}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              config={{
                showPhoto: true,
                linkable: true,
                logoClickable: true,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
