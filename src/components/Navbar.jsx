import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SocialButtons from "./SocialButtons";
import BatCatLogo from "./BatCatLogo";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS, SITE_SHORT_NAME } from "@/config";

function TrayClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="text-[13px] tabular-nums px-1">
      {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

/**
 * Win95 taskbar pinned to the top: a Start-style home button, one taskbar
 * button per section and a sunken system tray.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50" aria-label="Main navigation">
      <div className="win !p-1 font-sans">
        <div className="flex items-center justify-between gap-2 mx-auto w-[min(1200px,100%)]">
          {/* Start-style home button */}
          <a
            href="#top"
            className="btn95 btn95-default !px-2 !py-1 select-none shrink-0"
            onClick={closeMenu}
          >
            <span className="rounded-full overflow-hidden flex">
              <BatCatLogo size={22} />
            </span>
            <span className="text-[14px] tracking-wide">{SITE_SHORT_NAME}</span>
          </a>

          {/* Desktop taskbar buttons */}
          <ul className="hidden md:flex items-center gap-1 flex-1 min-w-0 px-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="btn95 !py-1 !px-3 text-[13px]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop system tray */}
          <div className="hidden md:flex items-center gap-1 win-body !m-0 !px-1.5 !py-0.5 !bg-chrome !text-black">
            <SocialButtons />
            <ThemeToggle />
            <TrayClock />
          </div>

          {/* Mobile: theme toggle + menu */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="btn95 !p-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-pressed={open}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Start menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="win flex mx-2 mt-1">
          {/* Vertical banner, as on the Win95 Start menu */}
          <div
            className="w-8 shrink-0 flex items-end justify-center pb-2"
            style={{ background: "linear-gradient(to top, var(--title-from), var(--title-to))" }}
            aria-hidden="true"
          >
            <span className="text-white font-bold text-sm [writing-mode:vertical-rl] rotate-180 tracking-widest">
              {SITE_SHORT_NAME}<span className="font-normal">95</span>
            </span>
          </div>

          <div className="flex-1 py-1">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={closeMenu}
                    className="flex items-center px-4 py-3 text-[15px] text-black hover:bg-[var(--title-from)] hover:text-white focus-visible:bg-[var(--title-from)] focus-visible:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="groove mx-2 my-1" />
            <div className="px-3 py-2 flex">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
