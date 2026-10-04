import { useEffect, useState } from "react";
import BatCatMark from "@/components/BatCatMark";
import { SITE_NAME, FOOTER_ATTRIBUTION } from "@/config";

// Camcorder-style date stamp: "OCT 03 2026  12:17:35"
const vhsStamp = (d) => {
  const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const pad = (n) => String(n).padStart(2, "0");
  return `${mon} ${pad(d.getDate())} ${d.getFullYear()}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export default function Footer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative mt-8" role="contentinfo">
      {/* VHS on-screen display */}
      <div className="mx-auto w-[min(1000px,92vw)] flex items-end justify-between gap-4 pb-3 osd text-xl sm:text-2xl">
        <span aria-hidden="true">▶ PLAY</span>
        <span className="tabular-nums whitespace-pre">{vhsStamp(now)}</span>
      </div>

      {/* Status bar */}
      <div className="win !p-1">
        <div className="win-status !mt-0 mx-auto w-[min(1200px,100%)] flex-wrap">
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <BatCatMark size={16} />
            <span className="truncate">
              © {now.getFullYear()} Made by {SITE_NAME} · Signal wave UI
            </span>
          </div>
          <div className="truncate">{FOOTER_ATTRIBUTION}</div>
        </div>
      </div>
    </footer>
  );
}
