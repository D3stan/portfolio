import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FEATURED_PROJECTS, SMALL_PROJECTS } from "../data/projects";
import { SITE_CONFIG } from "../constants/config";

// Featured Projects and Small Projects are now imported from /src/data/projects.js
// Update that file to customize your projects

function TechStack({ tech }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tech.map((t, idx) => (
        <span
          key={idx}
          className="inline-block border border-border px-2 py-0.5 text-xs font-mono bg-accent bg-opacity-40 shadow-[2px_2px_0_var(--shadow-weak)]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ActionButton({ href, children, variant = "primary", icon: Icon }) {
  const base =
    "inline-flex items-center gap-1 border-2 border-border font-semibold px-3 py-1.5 text-sm transition-all shadow-[3px_3px_0_var(--shadow-strong)] hover:shadow-[4px_4px_0_var(--shadow-strong)] hover:-translate-x-0.5 hover:-translate-y-0.5";
  const variants = {
    primary: "bg-accent hover:opacity-90",
    secondary: "bg-card hover:opacity-90",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${variants[variant]}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </a>
  );
}

function VideoPlayer({ src, poster, isPlaying, onPlayPause, className = "" }) {
  const videoRef = useRef(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isPlaying]);

  // If no video or video failed, show image only
  if (!src || hasVideoError) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={poster}
          alt="Project preview"
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "data:image/svg+xml;utf8," +
              encodeURIComponent(
                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>" +
                "<rect width='400' height='300' fill='white' stroke='black' stroke-width='4'/>" +
                "<text x='50%' y='50%' font-family='monospace' font-size='16' text-anchor='middle' fill='black'>Preview Coming Soon</text>" +
                "</svg>"
              );
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover"
        onError={() => {
          console.warn('Video failed to load:', src);
          setHasVideoError(true);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Hover controls */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={onPlayPause}
          className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}

// Small Project Card
function SmallProjectCard({ project, isPlaying, onPlayPause }) {
  return (
    <div className="border-2 border-border bg-card shadow-[4px_4px_0_var(--shadow-strong)] w-72 flex-shrink-0">
      <div className="relative aspect-video border-b-2 border-border">
        <VideoPlayer
          src={project.video}
          poster={project.image}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          className="h-full"
        />
      </div>

      <div className="p-4">
        <h4 className="font-extrabold mb-1 text-base">{project.title}</h4>
        <p className="text-xs text-muted mb-3">{project.blurb}</p>

        <div className="mb-3">
          <TechStack tech={project.tech} />
        </div>

        <div className="flex gap-2">
          <ActionButton
            href={project.demo}
            variant="primary"
            icon={ExternalLink}
          >
            {SITE_CONFIG.projects.buttons.demo}
          </ActionButton>
          <ActionButton href={project.repo} variant="secondary" icon={Github}>
            {SITE_CONFIG.projects.buttons.code}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function SmallProjectsSlider({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  // Card width math: w-72 (288) + gap-4 (16) = 304px per slide
  const SLIDE_PX = 304;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setPlayingVideo(null);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setPlayingVideo(null);
  };
  const handleVideoToggle = (projectId) => {
    setPlayingVideo(playingVideo === projectId ? null : projectId);
  };

  return (
    <div className="border-2 border-border bg-card backdrop-blur-sm p-4 shadow-[4px_4px_0_var(--shadow-strong)]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">{SITE_CONFIG.projects.smallProjectsLabel}</h3>
        <span className="font-mono text-xs text-muted">
          {currentIndex + 1} of {projects.length}
        </span>
      </div>

      <div className="overflow-hidden mb-4">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * SLIDE_PX}px)` }}
        >
          {projects.map((project) => (
            <SmallProjectCard
              key={project.id}
              project={project}
              isPlaying={playingVideo === project.id}
              onPlayPause={() => handleVideoToggle(project.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="flex items-center gap-1 border-2 border-border bg-card px-3 py-1 text-sm font-semibold shadow-[2px_2px_0_var(--shadow-strong)] hover:-translate-y-0.5 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex gap-1">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setPlayingVideo(null);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 border border-border ${
                index === currentIndex ? "bg-accent" : "bg-card"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center gap-1 border-2 border-border bg-card px-3 py-1 text-sm font-semibold shadow-[2px_2px_0_var(--shadow-strong)] hover:-translate-y-0.5 transition-all"
          aria-label="Next"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleVideoToggle = (projectId) => {
    setPlayingVideo(playingVideo === projectId ? null : projectId);
  };

  return (
    <section id="projects" className="py-16">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block border-2 border-border bg-card px-6 py-2 shadow-[8px_8px_0_var(--shadow-strong)]">
            <h2 className="text-2xl font-extrabold tracking-wide">{SITE_CONFIG.projects.title}</h2>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="border-2 border-border bg-card shadow-[6px_6px_0_var(--shadow-strong)]"
            >
              {/* Video */}
              <div className="relative aspect-video border-b-2 border-border">
                <VideoPlayer
                  src={project.video}
                  poster={project.image}
                  isPlaying={playingVideo === project.id}
                  onPlayPause={() => handleVideoToggle(project.id)}
                  className="h-full"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-lg font-extrabold mb-1">{project.title}</h4>
                <p className="text-teal-700 font-semibold mb-3 text-sm">
                  {project.subtitle}
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.blurb}
                </p>

                <div className="mb-4">
                  <TechStack tech={project.tech} />
                </div>

                <div className="flex gap-2">
                  <ActionButton
                    href={project.demo}
                    variant="primary"
                    icon={ExternalLink}
                  >
                    {SITE_CONFIG.projects.buttons.liveDemo}
                  </ActionButton>
                  <ActionButton
                    href={project.repo}
                    variant="secondary"
                    icon={Github}
                  >
                    {SITE_CONFIG.projects.buttons.code}
                  </ActionButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Projects Slider */}
        <div className="mb-12">
          <SmallProjectsSlider projects={SMALL_PROJECTS} />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block border-2 border-border bg-accent px-6 py-3 shadow-[4px_4px_0_var(--shadow-strong)]">
            <p className="font-semibold mb-2">{SITE_CONFIG.projects.ctaText}</p>
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-fg text-bg px-4 py-2 font-bold hover:opacity-90 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              {SITE_CONFIG.projects.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
