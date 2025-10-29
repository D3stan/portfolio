import { useEffect, useState } from "react";
import BatCatMark from "./BatCatMark";
import { SITE_CONFIG } from "../constants/config";

export default function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const ts = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  return (
   
    <footer className="relative mt-16" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-2 h-1 bg-border" />
      </div>

      <div className="mx-auto max-w-6xl my-3 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-2 border-2 border-border bg-accent shadow-[6px_6px_0_var(--shadow-weak)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-sm font-bold">
          <BatCatMark size={22} />
          <span>
            © {new Date().getFullYear()} {SITE_CONFIG.footer.copyright}
          </span>
        </div>
        <div className="font-mono text-sm">{ts}</div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-6">
        <p className="text-[12px] font-mono text-muted">
          {SITE_CONFIG.footer.attribution}
        </p>
      </div>
    </footer>
  );
}
