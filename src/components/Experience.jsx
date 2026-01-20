import { useState } from "react";
import { SECTION_TITLE_EXPERIENCE } from "@/config";
import { JOBS } from "@/config/data";
import AccordionCard from "./shared/AccordionCard";

/* ✅ Jobs from config - already imported from data.js */

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Header */}
        <div className="w-full flex justify-center mb-8 sm:mb-10">
          <div className="inline-block border-2 border-border bg-card px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)]">
            <h2 className="text-2xl font-extrabold tracking-wide">
              {SECTION_TITLE_EXPERIENCE}
            </h2>
          </div>
        </div>

        <div className="space-y-9">
          {JOBS.map((job, i) => (
            <AccordionCard
              key={i}
              item={job}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              config={{
                showImpact: true,
                useAriaControls: true,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
