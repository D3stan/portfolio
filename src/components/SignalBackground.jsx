import { memo } from "react";

/**
 * Signal wave backdrop.
 * Dark: a black broadcast void with specks, a glowing teal orbit ring with a
 * thermal-map globe ("We are here"), and a green wireframe floor.
 * Light: the "Gradient Plaza" blue → magenta desktop with a cyan haze.
 * A CRT layer (scanlines, grain, vignette) sits over everything.
 */
export default memo(function SignalBackground() {
  return (
    <>
      <div className="signal-bg fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Light mode: Gradient Plaza haze */}
        <div className="light-only absolute inset-0 signal-plaza" />

        {/* Dark mode: specks in the void */}
        <div className="dark-only absolute inset-0 signal-stars" />

        {/* Orbit ring + globe */}
        <svg
          className="orbit-drift absolute -right-[35vw] md:-right-[18vw] top-[6vh] w-[130vw] md:w-[95vw] max-w-[1500px] opacity-40"
          viewBox="0 0 1000 520"
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7cffd9" />
              <stop offset="55%" stopColor="#36f1cd" />
              <stop offset="100%" stopColor="#1fb7c9" />
            </linearGradient>
            <radialGradient id="globe" cx="40%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#5fa8ff" />
              <stop offset="70%" stopColor="#1f3fd6" />
              <stop offset="100%" stopColor="#0b1470" />
            </radialGradient>
            <filter id="ring-glow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse
            cx="560"
            cy="260"
            rx="420"
            ry="190"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="34"
            filter="url(#ring-glow)"
          />
          <ellipse cx="560" cy="248" rx="420" ry="190" fill="none" stroke="#c9fff2" strokeOpacity="0.45" strokeWidth="4" />
          <g transform="translate(150 300)" filter="url(#ring-glow)">
            <circle r="46" fill="url(#globe)" />
            <ellipse cx="-12" cy="-16" rx="16" ry="11" fill="#ff7a2e" opacity="0.85" />
            <ellipse cx="-9" cy="-15" rx="7" ry="5" fill="#ffe14d" opacity="0.9" />
            <ellipse cx="14" cy="18" rx="12" ry="9" fill="#ff4d3b" opacity="0.8" />
            <ellipse cx="24" cy="-6" rx="7" ry="10" fill="#3bd17a" opacity="0.7" />
          </g>
        </svg>

        {/* Dark mode: phosphor wireframe floor */}
        <div className="dark-only signal-floor" />
      </div>

      <div className="crt-overlay" aria-hidden="true" />
    </>
  );
});
