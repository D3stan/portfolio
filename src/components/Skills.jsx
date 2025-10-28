// src/components/Skills.jsx
import { skills } from "../data/skills.jsx";

// Skills are now imported from /src/data/skills.jsx
// Update that file to customize your skills

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="mx-auto w-[min(1100px,94vw)] text-center">
        <div className="inline-block border-2 border-border bg-card px-5 py-2 shadow-[6px_6px_0_var(--shadow-strong)] rounded-none mb-8">
          <h2 className="font-extrabold text-xl tracking-wide">SKILLS</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group border-2 border-border bg-card p-4 rounded-none
                         shadow-[6px_6px_0_var(--shadow-strong)] transition-transform
                         hover:translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-2 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="font-mono font-bold text-sm">{skill.name}</h3>
              <p className="mt-1 text-xs text-muted group-hover:opacity-90 transition-colors">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
