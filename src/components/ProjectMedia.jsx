import { useEffect, useState } from "react";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Photo | 3D | Flow tabs over a project's media slot. `children` is the
// normal photo/video; projects without a `model` render it untouched.
export default function ProjectMedia({ model, flow, title, children }) {
  const [tab, setTab] = useState("photo");

  // The viewer (three.js) is only downloaded once someone opens a 3D tab.
  useEffect(() => {
    if (tab !== "photo") import("@google/model-viewer");
  }, [tab]);

  if (!model) return children;

  const tabs = [
    ["photo", "Photo"],
    ["3d", "3D"],
    flow && ["flow", "Flow"],
  ].filter(Boolean);

  return (
    <div className="relative h-full">
      {tab === "photo" ? (
        children
      ) : (
        <model-viewer
          key={tab}
          src={tab === "flow" ? flow : model}
          alt={`3D model of ${title}`}
          camera-controls
          disable-zoom
          touch-action="pan-y"
          interaction-prompt="none"
          shadow-intensity="0"
          autoplay
          auto-rotate={tab === "3d" && !reducedMotion}
          style={{ width: "100%", height: "100%", background: "var(--card)" }}
        />
      )}

      <div className="absolute top-2 right-2 flex" role="tablist" aria-label={`${title} media`}>
        {tabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`border-2 border-border px-2 text-xs font-bold -ml-0.5 first:ml-0 ${
              tab === id ? "bg-accent text-black" : "bg-card"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
