import { Github, Lock } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionReveal, RevealItem } from "./SectionReveal";

// Import project images
import ecofarmImg from "../assets/images/ecofarm.png";
import scholarlyImg from "../assets/images/scholarly.png";
import cofinoyImg from "../assets/images/cofinoy.png";
import cartImg from "../assets/images/cart.png";
import pacmanImg from "../assets/images/pacman.png";

export function Projects() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false); // suppresses click after drag
  const dragStartXRef = useRef(0);
  const scrollStartXRef = useRef(0);

  const projects = [
    {
      title: "EcoFarmAI",
      description: "A sustainable AI-powered land suitability assessment tool.",
      image: ecofarmImg,
      tags: ["React TS", "PostgreSQL", "TensorFlow", "CNN"],
      github: "https://github.com",
      accent: "violet",
      isPrivate: true,
    },
    {
      title: "SCHOLARLY",
      description: "A website for applying scholarships powered by Laravel and Bootstrap Framework.",
      image: scholarlyImg,
      tags: ["Laravel", "PHP", "Bootstrap", "MySQL"],
      github: "https://github.com",
      accent: "fuchsia",
      isPrivate: true,
    },
    {
      title: "COFINOY",
      description: "A Coffee Ordering System Showcasing Filipino Flavors and Traditions",
      image: cofinoyImg,
      tags: ["React", "Firebase", "C#", ".NET"],
      github: "https://github.com",
      accent: "cyan",
      isPrivate: true,
    },
    {
      title: "SCart",
      description: "A smart cart shopping app with budget adherence and insightful analytics.",
      image: cartImg,
      tags: ["Dart", "SQLite"],
      github: "https://github.com/Yunaaaard/SmartCart",
      accent: "violet",
      isPrivate: false,
    },
    {
      title: "PACMAN",
      description: "A simple PACMAN game with Machine Learning using Java - Object Oriented Programming",
      image: pacmanImg,
      tags: ["Java", "Machine Learning", "OOP"],
      github: "https://github.com/Yunaaaard/Pac-man",
      accent: "cyan",
      isPrivate: false,
    },
  ];

  const tagBg: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    fuchsia: "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  };

  const borderGlow: Record<string, string> = {
    violet: "hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    fuchsia: "hover:border-fuchsia-500/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  };

  // Triple-clone so seamless looping works even when dragging backward
  const loopingProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;
    let started = false;

    const startLoop = () => {
      const oneSetWidth = track.scrollWidth / 3;

      // Only start once scrollWidth is actually painted (non-zero)
      if (oneSetWidth === 0) {
        animationRef.current = window.requestAnimationFrame(startLoop);
        return;
      }

      if (!started) {
        // Jump to the middle clone set on first valid frame
        track.scrollLeft = oneSetWidth;
        started = true;
      }

      const animate = () => {
        const w = track.scrollWidth / 3;

        if (!isHoveringRef.current && !isDraggingRef.current) {
          track.scrollLeft += speed;

          if (track.scrollLeft >= w * 2) {
            track.scrollLeft -= w;
          }
          if (track.scrollLeft < w) {
            track.scrollLeft += w;
          }
        }

        animationRef.current = window.requestAnimationFrame(animate);
      };

      animationRef.current = window.requestAnimationFrame(animate);
    };

    animationRef.current = window.requestAnimationFrame(startLoop);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    scrollStartXRef.current = track.scrollLeft;
    track.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;

    // Only flag as "dragged" after a few pixels of movement
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
    }

    const oneSetWidth = track.scrollWidth / 3;
    let next = scrollStartXRef.current - deltaX;

    // Clamp within the middle set boundaries so looping stays seamless
    if (next < oneSetWidth) next += oneSetWidth;
    if (next >= oneSetWidth * 2) next -= oneSetWidth;

    track.scrollLeft = next;
  };

  const endDragging = () => {
    isDraggingRef.current = false;
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    // Suppress link navigation if the user was dragging
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 relative">
        <SectionReveal direction="up" stagger={0.1}>
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Featured{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-zinc-400 mb-16 text-center max-w-2xl mx-auto">
              Here are some of my recent works that showcase my skills and passion for development.
            </p>
          </RevealItem>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
            {/* Fade edges for a polished infinite feel */}
            <div className="pointer-events-none absolute left-6 lg:left-12 top-0 h-full w-16 z-10 bg-gradient-to-r from-[#06060f] to-transparent" />
            <div className="pointer-events-none absolute right-6 lg:right-12 top-0 h-full w-16 z-10 bg-gradient-to-l from-[#06060f] to-transparent" />

            <div
              ref={trackRef}
              className="projects-track flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden select-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={() => { isHoveringRef.current = true; }}
              onMouseLeave={() => { isHoveringRef.current = false; }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDragging}
              onPointerCancel={endDragging}
            >
              {loopingProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="w-[85vw] sm:w-[22rem] md:w-[23rem] lg:w-[24rem] shrink-0"
                >
                  <div
                    className={`group h-full bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${borderGlow[project.accent]}`}
                  >
                    <div className="relative h-48 overflow-hidden bg-black/30 flex items-center justify-center p-6 border-b border-white/5">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] to-transparent opacity-20 pointer-events-none" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-zinc-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 text-xs rounded-full font-medium ${tagBg[project.accent]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        {project.isPrivate ? (
                          <div className="relative group/code flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/5 bg-white/[0.01] text-zinc-400 select-none transition-all duration-300 hover:bg-white/[0.03] hover:border-zinc-800 cursor-default">
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-medium">Code</span>
                            <Lock className="w-3.5 h-3.5 text-zinc-500 group-hover/code:text-amber-400 group-hover/code:scale-110 transition-all duration-300" />
                            <div className="absolute bottom-full left-0 mb-2.5 w-max scale-95 opacity-0 pointer-events-none group-hover/code:scale-100 group-hover/code:opacity-100 transition-all duration-300 origin-bottom-left z-20">
                              <div className="bg-[#0f0f1a]/95 border border-white/10 text-zinc-400 text-xs px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md font-medium tracking-wide">
                                This repository is private
                              </div>
                            </div>
                          </div>
                        ) : (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClick}
                            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.1)] cursor-pointer"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-semibold">Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <style>{`
              .projects-track::-webkit-scrollbar { display: none; }
            `}</style>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}