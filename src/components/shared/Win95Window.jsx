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
          <span className="win-ctrl">_</span>
          <span className="win-ctrl">□</span>
          <span className="win-ctrl ml-0.5">✕</span>
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
