import { useEffect, useRef } from "react";

const GREEN = "#4dff7a";
const N = 22; // grid points per side

/**
 * Phosphor-green wireframe surface, slowly rippling and turning, like the
 * mesh hand in 80s computer ads. Fills its parent; drawn on a canvas.
 */
export default function WireframeMesh({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, w, h);

      const rot = t * 0.00012;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const scale = Math.min(w, h) * 0.9;

      // Project every grid point once per frame
      const pts = [];
      for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < N; j++) {
          const x = (i / (N - 1)) * 2 - 1;
          const z = (j / (N - 1)) * 2 - 1;
          const y =
            Math.sin(x * 3 + t * 0.0011) * Math.cos(z * 2.6 + t * 0.0008) * 0.22 +
            Math.sin((x + z) * 4 - t * 0.0015) * 0.05;
          // turn around the vertical axis, tilt toward the viewer
          const rx = x * cos - z * sin;
          const rz = x * sin + z * cos;
          const ty = y * 0.9 - rz * 0.42;
          const tz = rz * 0.9 + y * 0.42 + 2.6;
          const p = 1.6 / tz;
          row.push([w / 2 + rx * scale * p * 0.75, h * 0.52 + ty * scale * p * 0.75, tz]);
        }
        pts.push(row);
      }

      ctx.lineWidth = 1;
      ctx.shadowColor = GREEN;
      ctx.shadowBlur = 6;
      const line = (a, b) => {
        // farther segments fade out
        ctx.globalAlpha = Math.max(0.15, Math.min(1, 2.2 - (a[2] + b[2]) / 2.6));
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      };
      ctx.strokeStyle = GREEN;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (i < N - 1) line(pts[i][j], pts[i + 1][j]);
          if (j < N - 1) line(pts[i][j], pts[i][j + 1]);
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(canvas);

    if (reduceMotion) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
