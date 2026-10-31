import { SectionReveal, RevealItem, EditorialSectionHeader } from "./SectionReveal";

const techIcons: Record<string, JSX.Element> = {
  "C#": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#239120]">
      <path d="M11.5 17.5H8.3v-11h3.2v2H10.3v2.5h1.2v2H10.3v2.5h1.2v2zm6.2-7.5h-1.2V8h-1.5v2h-1.2v1.5h1.2v1.8h-1.2V15h1.2v2h1.5v-2h1.2v-1.7h-1.2v-1.8h1.2V10zm-2.7 3.3h-1.2v-1.8h1.2v1.8z" />
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#f89820]">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149m-.575-2.627s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.131-7.942-1.218m4.84-4.458c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573m7.56 10.919s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892m7.824 4.374c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.889 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627" />
    </svg>
  ),
  JavaScript: (
    <div className="w-4 h-4 bg-[#F7DF1E] text-black font-black text-[8px] flex items-end justify-end p-0.5 rounded-sm select-none">
      JS
    </div>
  ),
  TypeScript: (
    <div className="w-4 h-4 bg-[#3178C6] text-white font-black text-[8px] flex items-end justify-end p-0.5 rounded-sm select-none">
      TS
    </div>
  ),
  Kotlin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#7F52FF]">
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
  ".NET": (
    <span className="font-mono-jb font-bold text-[9px] text-[#7c5cff]">.NET</span>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-[#539E43]">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" strokeLinejoin="round" />
      <path d="M12 2v10M2 7l10 5 10-5" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#61DAFB]">
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
  MySQL: (
    <span className="font-mono-jb text-[9px] font-bold text-[#38bdf8]">SQL</span>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#47A248]">
      <path d="M12 1.5c-.3 0-.6.1-.9.2C8.7 2.8 5.6 7.4 5.6 12c0 4.1 2.5 8.1 5.5 10.3.3.2.6.2.9.2s.6-.1.9-.2c3-2.2 5.5-6.2 5.5-10.3 0-4.6-3.1-9.2-5.5-10.3-.3-.1-.6-.2-.9-.2zM12 4v16c-1.8-1.7-3.4-4.8-3.4-8S10.2 5.7 12 4z" />
    </svg>
  ),
  SQLite: (
    <span className="font-mono-jb text-[9px] font-bold text-[#7dd3fc]">LITE</span>
  ),
  Firebase: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FFA611]">
      <path d="M3.89 15.67L12 2.2l3.41 5.67 1.19-2.22c.1-.2.4-.2.5 0l3.01 5.62c.1.2.1.4 0 .6l-8.21 8.21c-.3.3-.8.3-1.1 0L3.89 15.67z" />
    </svg>
  ),
  Canva: (
    <span className="font-mono-jb font-bold text-[8px] text-[#00C4CC]">CNV</span>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#F24E1E]">
      <path d="M8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm0-7a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm0 14a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z M15.5 12a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
    </svg>
  ),
};

const skillGroups = [
  {
    index: "01",
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "C#", "Java", "Kotlin", "Python"],
  },
  {
    index: "02",
    title: "Frameworks & Runtimes",
    items: ["React", "Vue", "Node.js", ".NET", "Vite", "Robot"],
  },
  {
    index: "03",
    title: "Databases",
    items: ["MySQL", "MongoDB", "SQLite", "Firebase"],
  },
  {
    index: "04",
    title: "Design Tools",
    items: ["Figma", "Canva"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <SectionReveal direction="up" stagger={0.08}>
          <RevealItem>
            <EditorialSectionHeader
              index="04"
              label="Technical Stack"
              title="Tools &"
              serifWord="technologies."
              subtitle="Languages, frameworks, and databases I work with regularly."
            />
          </RevealItem>

          <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {skillGroups.map((group) => (
              <RevealItem key={group.title}>
                <div className="py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-4 flex items-baseline gap-3">
                    <span className="font-mono-jb text-xs text-zinc-600">
                      {group.index}
                    </span>
                    <h3 className="text-base font-medium text-zinc-200">
                      {group.title}
                    </h3>
                  </div>

                  <div className="md:col-span-8 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#0d0d10] border border-white/[0.07] hover:border-white/20 transition-colors"
                      >
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">
                          {techIcons[skill]}
                        </span>
                        <span className="text-xs font-medium text-zinc-200">
                          {skill}
                        </span>
                      </div>
                    ))}
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
