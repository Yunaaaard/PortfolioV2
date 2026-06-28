import { SectionReveal, RevealItem } from "./SectionReveal";

// Simple SVG icons for each tech
const techIcons: Record<string, JSX.Element> = {
  "React Native": (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  "React JS": (
    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
    </svg>
  ),
  PHP: (
    <span className="w-8 h-8 flex items-center justify-center font-bold text-[13px] tracking-tight">PHP</span>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.627s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.131-7.942-1.218m4.84-4.458c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573m7.56 10.919s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892m7.824 4.374c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627" />
    </svg>
  ),
  Dart: (
    <span className="w-8 h-8 flex items-center justify-center font-bold text-[13px] tracking-tight">Dart</span>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M24 24H0V0h24L12 12z" />
    </svg>
  ),
  C: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z" />
    </svg>
  ),
};

const techStack = [
  { name: "React Native", color: "from-cyan-400 to-blue-500", glow: "rgba(6,182,212,0.5)" },
  { name: "React JS", color: "from-sky-400 to-cyan-500", glow: "rgba(56,189,248,0.5)" },
  { name: "PHP", color: "from-indigo-400 to-violet-500", glow: "rgba(129,140,248,0.5)" },
  { name: "Java", color: "from-orange-400 to-red-500", glow: "rgba(251,146,60,0.5)" },
  { name: "Dart", color: "from-blue-400 to-cyan-400", glow: "rgba(96,165,250,0.5)" },
  { name: "Python", color: "from-yellow-400 to-blue-500", glow: "rgba(250,204,21,0.5)" },
  { name: "Kotlin", color: "from-violet-400 to-orange-400", glow: "rgba(167,139,250,0.5)" },
  { name: "C", color: "from-blue-500 to-indigo-600", glow: "rgba(59,130,246,0.5)" },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 relative">
        <SectionReveal direction="up" stagger={0.06} className="max-w-4xl mx-auto">
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Technology{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-zinc-400 mb-16 text-center max-w-2xl mx-auto">
              The languages and frameworks I use to build robust, scalable applications.
            </p>
          </RevealItem>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStack.map((tech) => (
              <RevealItem key={tech.name}>
                <div className="group relative">
                  <div
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm
                               hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                  >
                    {/* Icon with gradient background */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center
                                 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 0 20px ${tech.glow}` }}
                    >
                      {techIcons[tech.name]}
                    </div>

                    {/* Label */}
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                      {tech.name}
                    </span>
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
