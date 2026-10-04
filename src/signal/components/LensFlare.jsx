/**
 * Eight-ray lens-flare spark in red, blue and green, like the one between
 * the two hands in 80s computer ads.
 */
export default function LensFlare({ size = 96, className = "" }) {
  const rays = [
    { a: 0, c: "#ff3b5c", l: 1 },
    { a: 22, c: "#4d7bff", l: 0.55 },
    { a: 45, c: "#4dff7a", l: 0.8 },
    { a: 68, c: "#ff3b5c", l: 0.5 },
    { a: 90, c: "#4d7bff", l: 1 },
    { a: 112, c: "#4dff7a", l: 0.55 },
    { a: 135, c: "#ff3b5c", l: 0.8 },
    { a: 158, c: "#4d7bff", l: 0.5 },
  ];
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      className={`flare pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="flare-core">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {rays.map(({ a, c, l }) => (
        <line
          key={a}
          x1={-48 * l}
          y1="0"
          x2={48 * l}
          y2="0"
          stroke={c}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.9"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r="5" fill="url(#flare-core)" />
    </svg>
  );
}
