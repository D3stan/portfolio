import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PROJECTS_FEATURED, PROJECTS_SMALL } from "@/config/data";
import {
  SECTION_TITLE_PROJECTS,
  PROJECTS_SMALL_LABEL,
  PROJECTS_CTA_TEXT,
  PROJECTS_CTA_BUTTON,
  PROJECTS_BUTTON_DEMO,
  PROJECTS_BUTTON_CODE,
  PROJECTS_BUTTON_LIVE_DEMO,
  SOCIAL_GITHUB,
} from "@/config";
import Win95Window from "./Win95Window";
import SectionCaption from "./SectionCaption";

// "JavaDyno" -> "javadyno.exe", for window title bars
const toFileName = (title) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")}.exe`;

function TechStack({ tech }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tech.map((t, idx) => (
        <span key={idx} className="chip">
          {t}
        </span>
      ))}
    </div>
  );
}

function ActionButton({ href, children, variant = "primary", icon: Icon }) {
  const base = "btn95 !px-3 !py-1.5 text-[13px]";
  const variants = {
    primary: "btn95-default",
    secondary: "",
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

const PREVIEW_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>" +
    "<rect width='400' height='300' fill='#030308'/>" +
    "<text x='50%' y='50%' font-family='monospace' font-size='18' letter-spacing='6' text-anchor='middle' fill='#36f1cd'>NO SIGNAL</text>" +
    "</svg>"
  );

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
          src={poster || PREVIEW_PLACEHOLDER}
          alt="Project preview"
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = PREVIEW_PLACEHOLDER;
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
          className="btn95 !p-3"
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
    <div className="win-body !m-0 w-72 flex-shrink-0">
      <div className="relative aspect-video bg-black">
        <VideoPlayer
          src={project.video}
          poster={project.image}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          className="h-full"
        />
      </div>

      <div className="p-4">
        <h4 className="font-display text-lg leading-tight mb-1">{project.title}</h4>
        <p className="text-xs text-muted mb-3">{project.blurb}</p>

        <div className="mb-3">
          <TechStack tech={project.tech} />
        </div>

        <div className="flex gap-2">
          {project.demo && (
            <ActionButton
              href={project.demo}
              variant="primary"
              icon={ExternalLink}
            >
              {project.buttons?.demo || PROJECTS_BUTTON_DEMO}
            </ActionButton>
          )}
          {project.repo && (
            <ActionButton href={project.repo} variant="secondary" icon={Github}>
              {project.buttons?.code || PROJECTS_BUTTON_CODE}
            </ActionButton>
          )}
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
    <Win95Window
      title={PROJECTS_SMALL_LABEL}
      icon="📁"
      as="h3"
      status={[`${projects.length} object(s)`, `${currentIndex + 1} of ${projects.length}`]}
    >
      <div className="p-3 sm:p-4">
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
          className="btn95 !px-3 !py-1 text-[13px]"
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
              className={`exclude-touch-target w-2.5 h-2.5 border border-accent ${
                index === currentIndex ? "bg-accent shadow-[0_0_6px_var(--glow)]" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="btn95 !px-3 !py-1 text-[13px]"
          aria-label="Next"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      </div>
    </Win95Window>
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
        <SectionCaption channel={4}>{SECTION_TITLE_PROJECTS}</SectionCaption>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {PROJECTS_FEATURED.map((project) => (
            <Win95Window
              key={project.id}
              title={toFileName(project.title)}
              icon="💾"
              className="flex flex-col"
              bodyClassName="flex-1"
            >
              {/* Video */}
              <div className="relative aspect-video bg-black">
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
                <h3 className="font-display text-2xl leading-tight mb-1">{project.title}</h3>
                <p className="font-semibold mb-3 text-sm text-highlight">
                  {project.subtitle}
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">{project.blurb}</p>

                <div className="mb-4">
                  <TechStack tech={project.tech} />
                </div>

                <div className="flex gap-2">
                  {project.demo && (
                    <ActionButton
                      href={project.demo}
                      variant="primary"
                      icon={ExternalLink}
                    >
                      {project.buttons?.demo || PROJECTS_BUTTON_LIVE_DEMO}
                    </ActionButton>
                  )}
                  {project.repo && (
                    <ActionButton
                      href={project.repo}
                      variant="secondary"
                      icon={Github}
                    >
                      {project.buttons?.code || PROJECTS_BUTTON_CODE}
                    </ActionButton>
                  )}
                </div>
              </div>
            </Win95Window>
          ))}
        </div>

        {/* Small Projects Slider */}
        <div className="mb-12">
          <SmallProjectsSlider projects={PROJECTS_SMALL} />
        </div>

        {/* Call to Action */}
        <div className="flex justify-center">
          <Win95Window title="GitHub" icon="🌐" className="w-[min(360px,100%)]" bodyClassName="!bg-chrome !text-black !shadow-none">
            <div className="p-4 flex flex-col items-center gap-4 font-sans">
              <p className="text-[14px] text-center">{PROJECTS_CTA_TEXT}</p>
              <a
                href={SOCIAL_GITHUB}
                target="_blank"
                rel="noreferrer"
                className="btn95 btn95-default min-w-[110px]"
              >
                <Github className="w-4 h-4" />
                {PROJECTS_CTA_BUTTON}
              </a>
            </div>
          </Win95Window>
        </div>
      </div>
    </section>
  );
}
