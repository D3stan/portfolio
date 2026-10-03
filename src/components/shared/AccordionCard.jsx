import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Bullet, ImpactBullet } from "./Bullet";

/**
 * Unified accordion card component for Experience and Education sections
 * 
 * @param {Object} props
 * @param {Object} props.item - The data item (job or school)
 * @param {number} props.index - Index for key management
 * @param {boolean} props.isOpen - Whether accordion is expanded
 * @param {Function} props.onToggle - Toggle handler
 * @param {Object} props.config - Configuration options
 * @param {boolean} props.config.showImpact - Show impact section (for jobs)
 * @param {boolean} props.config.showPhoto - Show photo in dropdown (for education)
 * @param {boolean} props.config.linkable - Make title a link (for education)
 * @param {boolean} props.config.useAriaControls - Use aria-controls attribute
 * @param {boolean} props.config.logoClickable - Allow logo to be clicked without toggling
 */
export default function AccordionCard({ 
  item, 
  index, 
  isOpen, 
  onToggle,
  config = {}
}) {
  const {
    showImpact = false,
    showPhoto = false,
    linkable = false,
    useAriaControls = false,
    logoClickable = false,
  } = config;

  const bodyId = `card-${index}-body`;

  // Map item properties to generic names
  const title = item.company || item.school;
  const subtitle = item.role || item.degree;
  const logo = item.logo;
  const badge = item.badge;
  const period = item.period;
  const meta = item.sub || item.address;
  const details = item.bullets || item.details;
  const hasDetails = details?.length > 0;
  const url = item.url;

  return (
    <div className={index > 0 ? "groove" : ""}>
      {/* Row header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        {...(useAriaControls && { "aria-controls": bodyId })}
        className="w-full text-left px-3 py-4 md:px-5 md:py-5 hover:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] focus:outline-none focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-[var(--fg)] focus-visible:-outline-offset-4"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
          {/* Left group */}
          <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
            <div className="win-body !m-0 !p-0.5 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 !bg-white">
              {logo ? (
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  {...(logoClickable && { onClick: (e) => e.stopPropagation() })}
                />
              ) : (
                <span className="font-bold uppercase text-xs text-black">
                  {badge}
                </span>
              )}
            </div>

            <div className="min-w-0">
              {linkable && url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-display text-xl sm:text-2xl leading-tight underline decoration-1 decoration-accent underline-offset-4 hover:text-accent break-words"
                  onClick={(e) => e.stopPropagation()}
                >
                  {title}
                </a>
              ) : (
                <div className="font-display text-xl sm:text-2xl leading-tight break-words">
                  {title}
                </div>
              )}

              <div className="font-mono font-semibold text-sm mt-1 text-highlight">
                {subtitle}
              </div>

              {meta && (
                <div className="text-xs mt-1 text-muted">
                  {meta}
                </div>
              )}
            </div>
          </div>

          {/* Right group */}
          <div className="flex items-center justify-between md:justify-end gap-3 pl-14 md:pl-0">
            <div className="font-mono text-xs sm:text-sm text-muted tabular-nums">
              {period}
            </div>
            {hasDetails && (
              <span
                className="btn95 !p-0 w-5 h-5 text-sm font-bold leading-none"
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Collapsible body */}
      {hasDetails && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={bodyId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-3 pb-5 md:px-5 md:pl-[5.25rem]">
                {/* Main bullets */}
                <div className="pl-3 md:pl-4 border-l border-dashed" style={{ borderColor: 'var(--accent)' }}>
                  <ul className="list-none space-y-2">
                    {details.map((detail, idx) => (
                      <Bullet key={idx}>{detail}</Bullet>
                    ))}
                  </ul>
                </div>

                {/* Optional Impact section */}
                {showImpact && item.impactBullets?.length ? (
                  <div className="mt-5">
                    <div className="caption !tracking-[0.2em] text-sm !text-highlight" style={{ textShadow: 'none' }}>
                      {item.impactTitle || "Impact"}
                    </div>
                    <ul className="list-none mt-3 space-y-2">
                      {item.impactBullets.map((b, idx) => (
                        <ImpactBullet key={idx}>{b}</ImpactBullet>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Optional Photo section */}
                {showPhoto && item.hasDropdownPhoto && (
                  <DropdownPhoto />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/**
 * Photo component for education section
 */
function DropdownPhoto() {
  const cand = [
    "/images/profile/graduction.jpg",
    "/images/profile/graduction.jpeg",
    "/images/profile/graduction.png",
    "/images/profile/graduction.webp",
  ];
  const [srcIdx, setSrcIdx] = useState(0);
  const handleImgError = () =>
    setSrcIdx((i) => (i < cand.length - 1 ? i + 1 : i));

  return (
    <div className="mt-4 win-body !p-1 !bg-black">
      <img
        src={cand[srcIdx]}
        onError={handleImgError}
        alt="Graduation ceremony"
        className="w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain"
        loading="lazy"
      />
    </div>
  );
}

