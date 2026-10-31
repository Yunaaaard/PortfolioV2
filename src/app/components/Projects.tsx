import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Lock, ArrowUpRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionReveal, RevealItem, EditorialSectionHeader } from "./SectionReveal";

import ecofarmImg from "../assets/images/ecofarm.png";
import scholarlyImg from "../assets/images/scholarly.png";
import cofinoyImg from "../assets/images/cofinoy.png";
import cartImg from "../assets/images/cart.png";
import pacmanImg from "../assets/images/pacman.png";

interface Project {
  id: string;
  index: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  isPrivate: boolean;
}

const projects: Project[] = [
  {
    id: "ecofarm",
    index: "01",
    title: "EcoFarmAI",
    year: "2025",
    summary: "AI-assisted land suitability assessment tool.",
    description:
      "A web application that evaluates soil and environmental inputs to help assess crop suitability, built with React, TypeScript, PostgreSQL, and a TensorFlow CNN model.",
    image: ecofarmImg,
    tags: ["React", "TypeScript", "PostgreSQL", "TensorFlow", "CNN"],
    github: "https://github.com",
    isPrivate: true,
  },
  {
    id: "scholarly",
    index: "02",
    title: "Scholarly",
    year: "2024",
    summary: "Scholarship application and review portal.",
    description:
      "A web platform built with Laravel, PHP, Bootstrap, and MySQL for submitting scholarship applications, managing applicant documents, and tracking review status.",
    image: scholarlyImg,
    tags: ["Laravel", "PHP", "Bootstrap", "MySQL"],
    github: "https://github.com",
    isPrivate: true,
  },
  {
    id: "cofinoy",
    index: "03",
    title: "Cofinoy",
    year: "2024",
    summary: "Coffee ordering system showcasing local Filipino blends.",
    description:
      "An ordering and catalog management system built with React, Firebase, C#, and .NET, designed around regional Filipino coffee varieties.",
    image: cofinoyImg,
    tags: ["React", "Firebase", "C#", ".NET"],
    github: "https://github.com",
    isPrivate: true,
  },
  {
    id: "scart",
    index: "04",
    title: "SCart",
    year: "2024",
    summary: "Mobile shopping cart companion with budget tracking.",
    description:
      "A mobile app written in Dart and Flutter using local SQLite storage to track shopping items against a set budget and view spending breakdowns.",
    image: cartImg,
    tags: ["Flutter", "Dart", "SQLite"],
    github: "https://github.com/Yunaaaard/SmartCart",
    isPrivate: false,
  },
  {
    id: "pacman",
    index: "05",
    title: "Pac-Man ML",
    year: "2023",
    summary: "Java OOP Pac-Man recreation with autonomous ghost behavior.",
    description:
      "A desktop Pac-Man game built in Java demonstrating object-oriented design patterns and pathfinding heuristics for ghost movement.",
    image: pacmanImg,
    tags: ["Java", "Machine Learning", "OOP"],
    github: "https://github.com/Yunaaaard/Pac-man",
    isPrivate: false,
  },
];

function ProjectCard({
  project,
  onSelect,
  featured = false,
}: {
  project: Project;
  onSelect: (p: Project) => void;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      className={`group relative pro-card overflow-hidden cursor-pointer flex flex-col justify-between ${
        featured ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Subtle monochrome cursor spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 0px) var(--my, 0px), rgba(255,255,255,0.055), transparent 75%)",
        }}
      />

      {/* Image Preview */}
      <div className="relative h-52 sm:h-56 bg-[#08080a] border-b border-white/[0.06] flex items-center justify-center p-6 overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="max-w-[85%] max-h-[160px] object-contain group-hover:scale-[1.04] transition-transform duration-500 ease-out"
        />
        <span className="absolute top-3.5 left-4 font-mono-jb text-[11px] text-zinc-500">
          {project.index}
        </span>
        <span className="absolute top-3.5 right-4 font-mono-jb text-[11px] text-zinc-500">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            {project.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono-jb text-[11px] text-zinc-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.isPrivate ? (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-mono-jb text-zinc-500 shrink-0"
              title="Private repository"
            >
              <Lock className="w-3 h-3" />
              <span>Private</span>
            </span>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white shrink-0 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <SectionReveal direction="up" stagger={0.08}>
          <RevealItem>
            <EditorialSectionHeader
              index="02"
              label="Selected Work"
              title="Projects &"
              serifWord="experiments."
              subtitle="A selection of academic, personal, and full-stack software builds."
            />
          </RevealItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, idx) => (
              <RevealItem
                key={project.id}
                className={idx === 0 ? "md:col-span-2" : "col-span-1"}
              >
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  featured={idx === 0}
                />
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Clean Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="project-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-2xl bg-[#0c0c0f] border border-white/10 p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-5">
                <div>
                  <span className="font-mono-jb text-xs text-zinc-500">
                    {selectedProject.index} &middot; {selectedProject.year}
                  </span>
                  <h3 className="text-2xl font-semibold text-zinc-100 mt-1">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="aspect-video w-full rounded-xl bg-[#08080a] border border-white/[0.06] flex items-center justify-center p-6">
                  <ImageWithFallback
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-jb text-xs px-2.5 py-1 rounded bg-white/[0.03] text-zinc-300 border border-white/[0.07]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between">
                  {selectedProject.isPrivate ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 font-mono-jb">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Private repository</span>
                    </span>
                  ) : (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pro-btn-primary !text-xs !py-2 !px-4"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View on GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="pro-btn-secondary !text-xs !py-2 !px-4"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
