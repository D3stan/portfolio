import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
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
  const url = item.url;

  return (
    <div className="border-2 border-border bg-card shadow-[8px_8px_0_var(--shadow-weak)]">
      {/* Card header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        {...(useAriaControls && { "aria-controls": bodyId })}
        className="w-full text-left p-4 md:p-5 border-b-2 border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
          {/* Left group */}
          <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border overflow-hidden flex items-center justify-center bg-card shrink-0">
              {logo ? (
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  {...(logoClickable && { onClick: (e) => e.stopPropagation() })}
                />
              ) : (
                <span className="font-extrabold uppercase text-xs">
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
                  className="block text-lg sm:text-xl font-extrabold leading-tight underline decoration-2 decoration-accent underline-offset-2 hover:opacity-90 break-words"
                  onClick={(e) => e.stopPropagation()}
                >
                  {title}
                </a>
              ) : (
                <div className="text-lg sm:text-xl font-extrabold leading-tight break-words">
                  {title}
                </div>
              )}
              
              <div className="font-mono font-semibold mt-0.5" style={{ color: 'var(--highlight)' }}>
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
          <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
            <div className="font-mono text-xs sm:text-sm">
              {period}
            </div>
            {details && (
              <span
                className="border-2 border-border bg-card p-1 shadow-[4px_4px_0_var(--shadow-strong)]"
                aria-hidden="true"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`} />
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Collapsible body */}
      {details && (
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
              <div className="p-4 md:p-5">
                {/* Main bullets */}
                <div className="pl-3 md:pl-4 border-l-4" style={{ borderColor: 'var(--accent)' }}>
                  <ul className="list-none mt-2 space-y-2">
                    {details.map((detail, idx) => (
                      <Bullet key={idx}>{detail}</Bullet>
                    ))}
                  </ul>
                </div>

                {/* Optional Impact section */}
                {showImpact && item.impactBullets?.length ? (
                  <div className="mt-5">
                    <div className="inline-flex items-center gap-2 rounded-md border-2 border-border bg-card px-3 py-1 shadow-[4px_4px_0_var(--shadow-strong)]">
                      <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                      <span className="text-sm font-extrabold">
                        {item.impactTitle || "Impact"}
                      </span>
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
    <div className="mt-4 border-2 border-border bg-card p-3 shadow-[6px_6px_0_var(--shadow-strong)]">
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

// Import useState for DropdownPhoto
import { useState } from "react";
