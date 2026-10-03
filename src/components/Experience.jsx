import { useState } from "react";
import { SECTION_TITLE_EXPERIENCE } from "@/config";
import { JOBS } from "@/config/data";
import AccordionCard from "./shared/AccordionCard";
import Win95Window from "./shared/Win95Window";
import SectionCaption from "./shared/SectionCaption";

/* ✅ Jobs from config - already imported from data.js */

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-[min(1000px,92vw)]">
        <SectionCaption channel={3}>{SECTION_TITLE_EXPERIENCE}</SectionCaption>

        <Win95Window
          title="experience.exe"
          icon="💼"
          status={[`${JOBS.length} object(s)`, "Signal: OK"]}
        >
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
        </Win95Window>
      </div>
    </section>
  );
}
