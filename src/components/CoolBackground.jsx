import { memo } from "react";

/**
 * Simple gradient background that respects theme
 */
export default memo(function CoolBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: `
          linear-gradient(
            135deg,
            var(--bg) 0%,
            color-mix(in srgb, var(--bg) 95%, var(--accent) 5%) 25%,
            color-mix(in srgb, var(--bg) 97%, var(--muted) 3%) 50%,
            color-mix(in srgb, var(--bg) 95%, var(--accent) 5%) 75%,
            var(--bg) 100%
          )
        `,
      }}
    />
  );
});
