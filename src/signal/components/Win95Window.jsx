import { useState } from "react";

/**
 * Title-bar button (minimise / maximise / close). It presses and jolts like
 * the real thing but does nothing, so it stays out of the tab order and
 * away from screen readers.
 */
function WinCtrl({ glyph, className = "" }) {
  const [hits, setHits] = useState(0);
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      onClick={() => setHits((n) => n + 1)}
      className={`win-ctrl exclude-touch-target ${className}`}
    >
      {/* re-keyed on every click so the jolt animation replays */}
      <span key={hits} className={hits ? "win-ctrl-jolt" : undefined}>{glyph}</span>
    </button>
  );
}

/**
 * Windows 95 style window: bevelled grey frame, navy title bar,
 * optional menu bar and status bar. Decorative controls are hidden from
 * assistive tech; the title is exposed as a heading when `as` is given.
 */
export default function Win95Window({
  title,
  icon,
  as = "div",
  menu = false,
  status,
  children,
  className = "",
  bodyClassName = "",
}) {
  const TitleTag = as;

  return (
    <div className={`win ${className}`}>
      <div className="win-title">
        <TitleTag className="flex items-center gap-1.5 min-w-0 truncate text-[13px] font-bold">
          {icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
          <span className="truncate">{title}</span>
        </TitleTag>
        <span className="flex gap-0.5 shrink-0" aria-hidden="true">
          <WinCtrl glyph="_" />
          <WinCtrl glyph="□" />
          <WinCtrl glyph="✕" className="ml-0.5" />
        </span>
      </div>

      {menu && (
        <div className="win-menu" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      )}

      <div className={`win-body ${bodyClassName}`}>{children}</div>

      {status && (
        <div className="win-status">
          {Array.isArray(status)
            ? status.map((s, i) => (
                <div key={i} className={i === 0 ? "flex-1 min-w-0 truncate" : "shrink-0"}>
                  {s}
                </div>
              ))
            : <div className="flex-1 min-w-0 truncate">{status}</div>}
        </div>
      )}
    </div>
  );
}
