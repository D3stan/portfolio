import { useEffect, useMemo, useState } from "react";
import "./signal.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignalBackground from "./components/SignalBackground";
import PageLoader from "./components/PageLoader";
import MetaTags from "@/components/MetaTags";
import { useTheme } from "@/hooks/useTheme";
import { generateSignalVariables } from "./theme";
import { SignalThemeContext } from "./SignalThemeContext";
import { ACCESSIBILITY_SKIP_TO_MAIN } from "@/config";

/**
 * The hidden "signal wave" version of the site, served at /signal.
 * Reached by clicking the BatCat + name in the standard navbar twice.
 * Light/dark preference is shared with the standard site.
 */
export default function SignalApp() {
  const { theme, changeTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const mode = theme === "dark" ? "dark" : "light";
  const themeValue = useMemo(() => ({ theme: mode, changeTheme }), [mode, changeTheme]);

  return (
    <SignalThemeContext.Provider value={themeValue}>
      <div className="signal-root" data-mode={mode} style={generateSignalVariables(mode)}>
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <MetaTags />

            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-chrome focus:text-black focus:font-bold focus:outline focus:outline-1 focus:outline-black"
            >
              {ACCESSIBILITY_SKIP_TO_MAIN}
            </a>

            <div className="relative z-10 min-h-screen font-mono text-fg">
              {/* Broadcast void / Gradient Plaza backdrop + CRT layer */}
              <SignalBackground />

              <Navbar />

              <main id="main-content">
                <About />
                <Education />
                <Experience />
                <Projects />
                <Contact />
              </main>

              <Footer />
            </div>
          </>
        )}
      </div>
    </SignalThemeContext.Provider>
  );
}
