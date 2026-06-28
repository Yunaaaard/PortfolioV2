import { Github, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SectionReveal, RevealItem } from "./SectionReveal";

// Import project images
import ecofarmImg from "../assets/images/ecofarm.png";
import scholarlyImg from "../assets/images/scholarly.png";
import cofinoyImg from "../assets/images/cofinoy.png";
import cartImg from "../assets/images/cart.png";
import pacmanImg from "../assets/images/pacman.png";

export function Projects() {
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <RevealItem key={project.title}>
                <div className={`group bg-[#0d0d1a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${borderGlow[project.accent]}`}>
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
                        <span key={tag} className={`px-3 py-1 text-xs rounded-full font-medium ${tagBg[project.accent]}`}>
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

                          {/* Elegant Tooltip */}
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
                          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.1)] cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-semibold">Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
