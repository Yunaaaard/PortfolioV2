import { GraduationCap, Sparkles, Code, User } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";
import profileImg from "../assets/images/GRAD-PIC.png";

export function About() {

  const infoItems = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "BS Information Technology",
      color: "text-cyan-400"
    },
    {
      icon: Code,
      label: "Focus",
      value: "Software Development",
      color: "text-violet-400"
    },
    {
      icon: Sparkles,
      label: "Interests",
      value: "AI & Full-Stack Systems",
      color: "text-fuchsia-400"
    }
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6 relative">
        <SectionReveal direction="up" stagger={0.15} className="max-w-5xl mx-auto">
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
              About{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
          </RevealItem>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Left: Photo Frame Container */}
            <div className="md:col-span-5 flex justify-center">
              <RevealItem direction="left">
                <div
                  className="relative group w-full max-w-[340px]"
                >
                  {/* Cosmic glow layer behind frame */}
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 opacity-20 blur-lg group-hover:opacity-35 transition duration-500" />

                  {/* Inner container wrapper */}
                  <div className="relative aspect-square w-full rounded-3xl border border-white/10 bg-[#0a0a14] overflow-hidden flex items-center justify-center p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                    <img
                      src={profileImg}
                      alt="Profile Photo"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.photo-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />

                    <div className="photo-fallback hidden flex flex-col items-center justify-center text-zinc-500 gap-3">
                      <User className="w-16 h-16 opacity-30 text-violet-400" />
                      <span className="text-xs uppercase tracking-widest font-semibold opacity-50">Photo Placeholder</span>
                    </div>
                  </div>
                </div>
              </RevealItem>
            </div>

            {/* Right: Narrative / Bio Content */}
            <div className="md:col-span-7 space-y-8">
              <RevealItem direction="right">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Software Developer & IT Graduate
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Motivated and results-driven Information Technology graduate seeking a challenging position as a Software Developer. Offering a strong foundation in software engineering, systems design, and full-stack development, with a proven ability to build scalable solutions.
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    I enjoy solving complex technical problems, designing beautiful user interfaces, and learning new languages and architectures. My goal is to build software that is both elegant on the inside and impactful to users.
                  </p>
                </div>
              </RevealItem>

              <RevealItem direction="right">
                <div className="grid sm:grid-cols-3 gap-4">
                  {infoItems.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm space-y-2 hover:border-white/10 transition-colors"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{item.label}</div>
                        <div className="text-sm font-medium text-white">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealItem>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
