import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CoolBackground from "./components/CoolBackground"; // New background
import PageLoader from "./components/PageLoader";
import { useTheme } from "./hooks/useTheme";
import { SITE_CONFIG } from "./constants/config";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { applyTheme } = useTheme();

  useEffect(() => {
    // Initialize theme colors from colors.js on mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Simulate loading time for critical resources
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [applyTheme]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* Skip to main content for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-yellow-300 focus:border-2 focus:border-black focus:font-bold focus:shadow-[4px_4px_0_#000]"
      >
        {SITE_CONFIG.accessibility.skipToMain}
      </a>

      <main id="main-content" className="relative z-10 min-h-screen font-mono text-fg">
        {/* New single cool background */}
        <CoolBackground />

        <Navbar />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
