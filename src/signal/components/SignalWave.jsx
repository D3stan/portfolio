/**
 * A thin glowing sine trace, used as a rule under section captions.
 */
export default function SignalWave({ className = "" }) {
  // Amplitude decays toward both ends, like a signal fading in and out
  const pts = [];
  for (let x = 0; x <= 240; x += 2) {
    const env = Math.sin((x / 240) * Math.PI);
    const y = 12 + Math.sin(x / 7) * 8 * env;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="var(--void-fg)"
        strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 0 4px var(--glow))" }}
      />
    </svg>
  );
}
