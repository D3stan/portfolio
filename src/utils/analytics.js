/**
 * Analytics & Error Tracking Setup
 * 
 * This file provides utilities for setting up Google Analytics and Sentry error tracking.
 * Follow the instructions below to enable these services.
 */

/**
 * GOOGLE ANALYTICS (GA4) SETUP
 * ==============================
 * 1. Go to https://analytics.google.com
 * 2. Create a new GA4 property
 * 3. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 4. Add it to your .env file: VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 5. Uncomment the Google Analytics script in index.html
 * 6. Replace YOUR_GA_MEASUREMENT_ID with your actual ID
 */

/**
 * SENTRY ERROR TRACKING SETUP (OPTIONAL BUT RECOMMENDED)
 * ========================================================
 * 1. Create a free account at https://sentry.io
 * 2. Create a new React project
 * 3. Install Sentry: npm install @sentry/react
 * 4. Copy your DSN from the Sentry dashboard
 * 5. Add it to your .env file: VITE_SENTRY_DSN=your_dsn_here
 * 6. Import this file in src/main.jsx and call initSentry()
 * 
 * Example main.jsx integration:
 * 
 * import { initSentry } from './utils/analytics';
 * 
 * if (import.meta.env.PROD) {
 *   initSentry();
 * }
 */

/**
 * Initialize Sentry error tracking
 * Only runs in production mode
 */
export function initSentry() {
  // Uncomment when ready to use Sentry:
  /*
  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
      // Session Replay
      replaysSessionSampleRate: 0.1, // Sample 10% of sessions
      replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
      // Environment
      environment: import.meta.env.MODE,
    });
  });
  */
}

/**
 * Track custom events to Google Analytics
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Track page views to Google Analytics
 * @param {string} pagePath - Path of the page
 * @param {string} pageTitle - Title of the page
 */
export function trackPageView(pagePath, pageTitle) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}
