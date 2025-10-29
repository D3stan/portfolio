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
