import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Laptop, Rocket, Database, Palette, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

// Premium styled icons/badges for each technology
const techIcons: Record<string, JSX.Element> = {
  // Languages
  "C#": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#178600]">
      <path d="M11.5 17.5H8.3v-11h3.2v2H10.3v2.5h1.2v2H10.3v2.5h1.2v2zm6.2-7.5h-1.2V8h-1.5v2h-1.2v1.5h1.2v1.8h-1.2V15h1.2v2h1.5v-2h1.2v-1.7h-1.2v-1.8h1.2V10zm-2.7 3.3h-1.2v-1.8h1.2v1.8z" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#5382A1]">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.627s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.131-7.942-1.218m4.84-4.458c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573m7.56 10.919s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892m7.824 4.374c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627" />
    </svg>
  ),
  JavaScript: (
    <div className="w-5 h-5 bg-[#F7DF1E] text-black font-black text-[9px] flex items-end justify-end p-0.5 rounded-sm select-none">
      JS
    </div>
  ),
  TypeScript: (
    <div className="w-5 h-5 bg-[#3178C6] text-white font-black text-[9px] flex items-end justify-end p-0.5 rounded-sm select-none">
      TS
    </div>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#7F52FF]">
      <path d="M24 24H0V0h24L12 12z" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3776AB]">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  Dart: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#00b4ab]">
      <path d="M21.4 8.7L13.3.6c-.8-.8-2-.8-2.8 0L2.6 8.5c-.8.8-.8 2 0 2.8l8.1 8.1c.8.8 2 .8 2.8 0l8.1-8.1c.6-.6.6-1.8-.2-2.6zM12 17.5L6.5 12 12 6.5l5.5 5.5-5.5 5.5z" />
    </svg>
  ),

  // Frameworks
  ".NET": (
    <span className="font-extrabold text-[9px] text-[#512BD4] tracking-tighter">.NET</span>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#339933]">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" strokeLinejoin="round" />
      <path d="M12 2v10M2 7l10 5 10-5" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#61DAFB]">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#41B883]">
      <path d="M24 1.5h-4.5L12 15 4.5 1.5H0L12 22.5 24 1.5z" />
      <path d="M18.8 1.5h-3.4L12 7.3 8.6 1.5H5.2L12 13.3 18.8 1.5z" fill="#35495E" />
    </svg>
  ),
  Vite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[#BD34FE]">
      <path d="M2 4l10 16L22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2l-4 7h6L10 18l7-9h-6l3-7z" fill="#FFC517" stroke="none" />
    </svg>
  ),
  Robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#00C4B4]">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="8" cy="16" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
      <path d="M12 2v4M9 2h6" />
    </svg>
  ),

  // Databases
  MySQL: (
    <span className="font-black text-[9px] tracking-tight text-[#00758F] bg-[#00758F]/10 px-1 py-0.5 rounded border border-[#00758F]/20 select-none">MySQL</span>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#47A248]">
      <path d="M12 1.5c-.3 0-.6.1-.9.2C8.7 2.8 5.6 7.4 5.6 12c0 4.1 2.5 8.1 5.5 10.3.3.2.6.2.9.2s.6-.1.9-.2c3-2.2 5.5-6.2 5.5-10.3 0-4.6-3.1-9.2-5.5-10.3-.3-.1-.6-.2-.9-.2zM12 4v16c-1.8-1.7-3.4-4.8-3.4-8S10.2 5.7 12 4z" />
    </svg>
  ),
  SQLite: (
    <span className="font-black text-[8px] tracking-tight text-[#003B57] bg-[#003B57]/10 px-1.5 py-0.5 rounded border border-[#003B57]/20 select-none">SQLITE</span>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FFCA28]">
      <path d="M3.89 15.67L12 2.2l3.41 5.67 1.19-2.22c.1-.2.4-.2.5 0l3.01 5.62c.1.2.1.4 0 .6l-8.21 8.21c-.3.3-.8.3-1.1 0L3.89 15.67z" />
    </svg>
  ),

  // Design Kits
  Canva: (
    <span className="font-extrabold text-[8px] text-white bg-[#00C4CC] px-1 py-0.5 rounded-sm select-none">Canva</span>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#F24E1E]">
      <path d="M8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm0-7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm0 14a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z M15.5 12a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
    </svg>
  ),
};

const skillCategories = [
  {
    title: "Languages",
    icon: Laptop,
    color: "from-cyan-400 to-blue-500",
    glow: "shadow-[0_0_30px_-12px_rgba(6,182,212,0.2)]",
    bgColor: "rgba(6,182,212,0.03)",
    borderColor: "rgba(6,182,212,0.1)",
    description: "Primary programming languages used to build software applications, from script commands to compiled programs.",
    skills: [
      { name: "C#", color: "from-green-500 to-emerald-600", glow: "rgba(16,185,129,0.4)" },
      { name: "Java", color: "from-orange-400 to-red-500", glow: "rgba(251,146,60,0.4)" },
      { name: "JavaScript", color: "from-yellow-400 to-amber-500", glow: "rgba(250,204,21,0.4)" },
      { name: "TypeScript", color: "from-blue-500 to-sky-600", glow: "rgba(59,130,246,0.4)" },
      { name: "Kotlin", color: "from-violet-500 to-fuchsia-500", glow: "rgba(139,92,246,0.4)" },
      { name: "Python", color: "from-yellow-400 to-blue-500", glow: "rgba(250,204,21,0.3)" },
      { name: "Dart", color: "from-blue-400 to-cyan-500", glow: "rgba(56,189,248,0.4)" },
    ],
  },
  {
    title: "Frameworks",
    icon: Rocket,
    color: "from-violet-400 to-fuchsia-500",
    glow: "shadow-[0_0_30px_-12px_rgba(139,92,246,0.2)]",
    bgColor: "rgba(139,92,246,0.03)",
    borderColor: "rgba(139,92,246,0.1)",
    description: "Structured environments and web platforms enabling fast component building and service rendering.",
    skills: [
      { name: ".NET", color: "from-purple-500 to-indigo-600", glow: "rgba(168,85,247,0.4)" },
      { name: "Node.js", color: "from-green-400 to-emerald-600", glow: "rgba(74,222,128,0.4)" },
      { name: "React", color: "from-sky-400 to-cyan-500", glow: "rgba(6,182,212,0.4)" },
      { name: "Vue", color: "from-emerald-400 to-teal-500", glow: "rgba(65,184,131,0.4)" },
      { name: "Vite", color: "from-amber-400 to-purple-600", glow: "rgba(189,52,254,0.4)" },
      { name: "Robot", color: "from-cyan-600 to-blue-700", glow: "rgba(6,182,212,0.3)" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    color: "from-emerald-400 to-teal-500",
    glow: "shadow-[0_0_30px_-12px_rgba(16,185,129,0.2)]",
    bgColor: "rgba(16,185,129,0.03)",
    borderColor: "rgba(16,185,129,0.1)",
    description: "Database systems designed to model relationships, manage system memory, and store application states.",
    skills: [
      { name: "MySQL", color: "from-blue-400 to-sky-600", glow: "rgba(56,189,248,0.3)" },
      { name: "MongoDB", color: "from-emerald-500 to-green-600", glow: "rgba(16,185,129,0.3)" },
      { name: "SQLite", color: "from-sky-500 to-indigo-500", glow: "rgba(14,165,233,0.3)" },
      { name: "Firebase", color: "from-amber-400 to-orange-500", glow: "rgba(245,158,11,0.4)" },
    ],
  },
  {
    title: "Design Kits",
    icon: Palette,
    color: "from-orange-400 to-rose-500",
    glow: "shadow-[0_0_30px_-12px_rgba(249,115,22,0.2)]",
    bgColor: "rgba(249,115,22,0.03)",
    borderColor: "rgba(249,115,22,0.1)",
    description: "Visual canvas applications used to build vector components, prototypes, interfaces, and custom designs.",
    skills: [
      { name: "Canva", color: "from-teal-400 to-cyan-500", glow: "rgba(20,184,166,0.4)" },
      { name: "Figma", color: "from-orange-500 to-rose-500", glow: "rgba(249,115,22,0.4)" },
    ],
  },
];

// Animation variants for the card swipe transition
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 260, damping: 26 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { type: "spring", stiffness: 260, damping: 26 },
      opacity: { duration: 0.2 },
    },
  }),
};

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = swipe right, -1 = swipe left
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play swiping effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % skillCategories.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % skillCategories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  const handleTabClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeCategory = skillCategories[activeIndex];
  const CategoryIcon = activeCategory.icon;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Background ambient color glow adapting to active category */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 transition-all duration-700 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${activeCategory.color.split(" ")[1]?.replace("to-", "") || "#8b5cf6"} 0%, transparent 70%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <SectionReveal direction="up" stagger={0.08} className="max-w-4xl mx-auto">
          
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </RevealItem>
          
          <RevealItem>
            <p className="text-lg text-zinc-400 mb-12 text-center max-w-2xl mx-auto font-mono-jb text-[15px]">
              My structured toolbox for turning complex software designs into high-performance, real-world solutions.
            </p>
          </RevealItem>

          {/* Carousel Navigation Tab Bar */}
          <RevealItem>
            <div className="flex justify-center flex-wrap gap-2 mb-8 bg-zinc-950/40 p-1.5 rounded-2xl border border-white/5 max-w-2xl mx-auto backdrop-blur-sm select-none">
              {skillCategories.map((category, idx) => {
                const TabIcon = category.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={category.title}
                    onClick={() => handleTabClick(idx)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryTab"
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl -z-10`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <TabIcon className="w-4 h-4 flex-shrink-0" />
                    <span>{category.title}</span>
                  </button>
                );
              })}
            </div>
          </RevealItem>

          {/* Swipe Container Area */}
          <RevealItem>
            <div 
              className="relative select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="overflow-hidden min-h-[360px] md:min-h-[280px] relative w-full flex items-center justify-center p-0.5">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    <div 
                      className={`flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-3xl border backdrop-blur-md transition-all duration-500`}
                      style={{
                        backgroundColor: activeCategory.bgColor,
                        borderColor: activeCategory.borderColor,
                        boxShadow: `0 10px 40px -15px ${activeCategory.color.split(" ")[1]?.replace("to-", "") || "rgba(255,255,255,0.05)"}`
                      }}
                    >
                      {/* Left: Category Descriptor Info */}
                      <div className="w-full md:w-1/3 flex flex-col items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeCategory.color} flex items-center justify-center text-white shadow-lg`}>
                          <CategoryIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`text-2xl font-bold bg-gradient-to-r ${activeCategory.color} bg-clip-text text-transparent`}>
                            {activeCategory.title}
                          </h3>
                          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">
                            {activeCategory.skills.length} skills listed
                          </p>
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed font-mono-jb text-[13px]">
                          {activeCategory.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="hidden md:block w-px bg-white/5 self-stretch" />
                      <div className="md:hidden w-full h-px bg-white/5" />

                      {/* Right: Interactive Skills Badges list */}
                      <div className="w-full md:w-2/3 flex flex-wrap content-start gap-3">
                        {activeCategory.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="group/skill flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.03] bg-zinc-950/40 hover:border-white/10 hover:bg-zinc-900/40 transition-all duration-300 cursor-default relative overflow-hidden"
                          >
                            {/* Glow behind the skill on hover */}
                            <div 
                              className="absolute inset-0 rounded-xl opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 blur-md -z-10"
                              style={{
                                backgroundColor: skill.glow,
                              }}
                            />
                            
                            {/* Skill logo wrap */}
                            <div className="relative flex-shrink-0 w-7 h-7 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-400 group-hover/skill:text-white transition-all duration-300 overflow-hidden">
                              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300`} />
                              <div className="relative z-10 flex items-center justify-center w-full h-full">
                                {techIcons[skill.name]}
                              </div>
                            </div>

                            <span className="text-xs font-semibold text-zinc-300 group-hover/skill:text-white transition-colors duration-300">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows & Play/Pause controls */}
              <div className="flex items-center justify-between mt-6 px-2 select-none">
                
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/60 hover:border-white/15 transition-all duration-300"
                  aria-label="Previous Category"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Auto Play Indicator Progress Bar */}
                <div className="flex-1 max-w-[200px] sm:max-w-[280px] h-1 bg-white/5 rounded-full relative overflow-hidden mx-4 flex items-center">
                  <motion.div
                    key={activeIndex + "-" + isPaused} // Re-animate on slide switch or play/pause state change
                    initial={{ width: "0%" }}
                    animate={isPaused ? { width: "0%" } : { width: "100%" }}
                    transition={isPaused ? { duration: 0 } : { duration: 4.5, ease: "linear" }}
                    className={`h-full bg-gradient-to-r ${activeCategory.color}`}
                  />
                </div>

                {/* Play/Pause & Right Arrow */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/60 hover:border-white/15 transition-all duration-300"
                    aria-label={isPaused ? "Play Autoplay" : "Pause Autoplay"}
                  >
                    {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/60 hover:border-white/15 transition-all duration-300"
                    aria-label="Next Category"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>
          </RevealItem>

        </SectionReveal>
      </div>
    </section>
  );
}
