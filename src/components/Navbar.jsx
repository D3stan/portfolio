import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SocialButtons from "./SocialButtons";
import BatCatLogo from "./BatCatLogo";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS, SITE_CONFIG } from "../constants/config";

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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50" aria-label="Main navigation">
      <div className="bg-card border-2 border-border shadow-[6px_6px_0_var(--accent)] px-4 py-3 w-[min(1100px,92vw)] rounded-none">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Name */}
          <a
            href="#top"
            className="flex items-center gap-2 select-none"
            onClick={closeMenu}
          >
            <div className="border-2 border-border bg-card rounded-full p-1 shadow-[3px_3px_0_var(--shadow-strong)] hover:-translate-y-[2px] transition">
              <BatCatLogo size={32} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-fg">
              {SITE_CONFIG.shortName}<span className="ml-1"></span>
            </h1>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="inline-flex items-center justify-center px-3 py-2 border-2 border-border bg-card text-sm font-extrabold uppercase tracking-wide shadow-[3px_3px_0_var(--shadow-strong)] transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop socials + theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <SocialButtons />
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center border-2 border-border bg-card p-3 min-h-[44px] min-w-[44px] shadow-[3px_3px_0_var(--shadow-strong)] active:translate-y-[2px] transition-transform"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-3 border-t-2 border-border mt-3">
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={closeMenu}
                    className="block text-center px-3 py-2.5 min-h-[44px] border-2 border-border bg-card text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_var(--shadow-strong)] hover:bg-accent active:translate-y-[1px] transition-all"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile socials */}
            <div className="mt-3 pb-1 flex justify-center">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
