import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CoolBackground from "./components/CoolBackground"; // New background
import PageLoader from "./components/PageLoader";
import MetaTags from "./components/MetaTags";
import { useTheme } from "./hooks/useTheme";
import {
  ACCESSIBILITY_SKIP_TO_MAIN,
  SOCIAL_LINKEDIN,
  SOCIAL_GITHUB,
  RESUME_FILE,
  SITE_EMAIL,
} from "@/config";

// Component to handle external redirects
const ExternalRedirect = ({ to, label }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  
  return <PageLoader text={`Redirecting to ${label}...`} />;
};

// Main home page component
function Home() {
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
            {/* Dynamic meta tags */}
            <MetaTags />

            {/* Skip to main content for screen readers */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-fg focus:border-2 focus:border-border focus:font-extrabold focus:uppercase focus:shadow-[6px_6px_0_var(--shadow-strong)] focus:outline-none"
            >
              {ACCESSIBILITY_SKIP_TO_MAIN}
            </a>

            <div className="relative z-10 min-h-screen font-mono text-fg">
              {/* New single cool background */}
              <CoolBackground />

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
    );
}

// Main App component with routing
export default function App() {
    return (
        <Router>
            <Routes>
                {/* Main portfolio page */}
                <Route path="/" element={<Home />} />

                {/* External redirect routes */}
                <Route 
                  path="/linkedin" 
                  element={<ExternalRedirect to={SOCIAL_LINKEDIN} label="LinkedIn" />} 
                />
                <Route 
                  path="/github" 
                  element={<ExternalRedirect to={SOCIAL_GITHUB} label="GitHub" />} 
                />
                <Route 
                  path="/resume" 
                  element={<ExternalRedirect to={RESUME_FILE} label="Resume" />} 
                />
                <Route 
                  path="/cv" 
                  element={<ExternalRedirect to={RESUME_FILE} label="CV" />} 
                />
                <Route 
                  path="/email" 
                  element={<ExternalRedirect to={`mailto:${SITE_EMAIL}`} label="Email" />} 
                />

                {/* Catch-all route - redirect to home */}
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}
