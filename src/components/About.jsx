import { useEffect, useMemo, useState } from "react";
import { Mail, ArrowRight, FileText } from "lucide-react";
import ArtisticPortrait from "./ArtisticPortrait";
import HelloRotator from "./HelloRotator";
import Win95Window from "./shared/Win95Window";
import LensFlare from "./shared/LensFlare";
import {
  SITE_NAME,
  ABOUT_ROLES,
  ABOUT_STATUS,
  ABOUT_STATUS_LOCATION,
  ABOUT_DESCRIPTION,
} from "@/config";

function Typewriter({
  phrases,
  typingSpeed = 55,
  pause = 900,
  className = "",
}) {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (!list.length) return;
    const full = list[i % list.length];
    const done = dir === 1 && txt === full;
    const empty = dir === -1 && txt === "";

    const t = setTimeout(
      () => {
        if (done) return setDir(-1);
        if (empty) {
          setDir(1);
          setI((v) => (v + 1) % list.length);
          return;
        }
        setTxt(full.slice(0, txt.length + dir));
      },
      done ? pause : typingSpeed
    );

    return () => clearTimeout(t);
  }, [txt, dir, i, list, typingSpeed, pause]);

  return (
    <span className={className} aria-live="polite" aria-atomic>
      {txt}
      <span className="animate-blink ml-0.5" aria-hidden="true">_</span>
    </span>
  );
}

export default function About() {
  return (
    <>
      <section
        id="about"
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* LEFT: portrait window */}
          <aside className="md:col-span-5 order-2 md:order-1">
            <Win95Window
              title="portrait.bmp"
              icon="🖼"
              status={[
                <span key="s" className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#1fbf4f] shadow-[0_0_6px_#4dff7a]" />
                  <strong>{ABOUT_STATUS}</strong> · {ABOUT_STATUS_LOCATION}
                </span>,
              ]}
            >
              <div className="overflow-hidden bg-black">
                <ArtisticPortrait className="w-full h-auto" />
              </div>
            </Win95Window>
          </aside>

          {/* RIGHT: broadcast title card + about window */}
          <div className="md:col-span-7 order-1 md:order-2">
            <HelloRotator name={SITE_NAME} />

            <div className="relative">
              <LensFlare size={110} className="absolute -top-10 -right-2 sm:right-6 md:-right-4" />
              <h1 className="echo text-5xl sm:text-6xl lg:text-7xl leading-[1.05] pb-8">
                {SITE_NAME}
              </h1>
            </div>

            <p className="caption text-base sm:text-lg md:text-xl !tracking-[0.22em] mb-8 min-h-[1.8em]">
              <Typewriter phrases={ABOUT_ROLES} />
            </p>

            <Win95Window title="about.txt - Notepad" icon="📄" menu>
              <div className="p-4 sm:p-5">
                <p className="text-[0.98rem] leading-relaxed">
                  {ABOUT_DESCRIPTION}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 font-sans">
                  <a
                    href="/documents/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn95 btn95-default"
                  >
                    <FileText className="h-4 w-4" /> Resume
                  </a>
                  <a href="#projects" className="btn95">
                    <ArrowRight className="h-4 w-4" /> View Projects
                  </a>
                  <a href="#contact" className="btn95">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </div>
              </div>
            </Win95Window>
          </div>
        </div>
      </section>
    </>
  );
}
