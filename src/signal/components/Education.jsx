import { useState } from "react";
import { SECTION_TITLE_EDUCATION } from "@/config";
import { SCHOOLS } from "@/config/data";
import AccordionCard from "./AccordionCard";
import Win95Window from "./Win95Window";
import SectionCaption from "./SectionCaption";

/* ✅ Education from config */
const education = SCHOOLS;

export default function Education() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="education" className="relative py-16 sm:py-20 md:py-24">
      <div className="mx-auto w-[min(1000px,92vw)]">
        <SectionCaption channel={2}>{SECTION_TITLE_EDUCATION}</SectionCaption>

        <Win95Window
          title="education.exe"
          icon="🎓"
          status={[`${education.length} object(s)`, "Signal: OK"]}
        >
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
        </Win95Window>
      </div>
    </section>
  );
}
