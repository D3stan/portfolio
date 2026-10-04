import { memo } from "react";

// Swap this file to change the backdrop (any size; it is scaled to cover)
const BACKGROUND_IMAGE = "/images/signal/background.png";

/**
 * Signal wave backdrop: the "We are here" broadcast still, fixed behind the
 * page. In light mode it is screened over the Gradient Plaza gradient, so
 * its black drops out and only the glowing ring and globe remain.
 * A CRT layer (scanlines, grain, vignette) sits over everything.
 */
export default memo(function SignalBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="light-only absolute inset-0 signal-plaza" />
        <div
          className="signal-image absolute inset-0"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
        />
      </div>

      <div className="crt-overlay" aria-hidden="true" />
    </>
  );
});
