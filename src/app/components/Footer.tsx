import { ArrowUpRight } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Subtle ambient glow on the left */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-violet-600/[0.06] blur-[100px] pointer-events-none" />

      {/* CTA Contact Section */}
      <div className="relative pt-28 pb-20">
        <div className="container mx-auto px-6">
          <SectionReveal direction="up" stagger={0.1} className="max-w-3xl mx-auto text-center">
            <RevealItem>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400/90 mb-6 block">
                Contact
              </span>
            </RevealItem>

            <RevealItem>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Let&apos;s build something{" "}
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  dependable.
                </span>
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto font-mono-jb">
                Open to conversations about full-stack development, mobile
                platforms, and practical engineering systems.
              </p>
            </RevealItem>

            <RevealItem>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Email Me — filled accent button */}
                <a
                  href="mailto:tarimanleonard28@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30 hover:scale-[1.03]"
                >
                  Email me
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* GitHub — outlined button */}
                <a
                  href="https://github.com/Yunaaaard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-full transition-all duration-300 bg-transparent hover:bg-white/[0.03]"
                >
                  GitHub
                </a>

                {/* LinkedIn — outlined button */}
                <a
                  href="https://www.linkedin.com/in/yunaaaard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-sm font-semibold rounded-full transition-all duration-300 bg-transparent hover:bg-white/[0.03]"
                >
                  LinkedIn
                </a>
              </div>
            </RevealItem>
          </SectionReveal>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/[0.04]">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-600 text-xs font-mono tracking-wide">
            © {new Date().getFullYear()} Leonard Tariman
          </p>
          <p className="text-zinc-600 text-xs font-mono tracking-wide italic">
            Just a kid with big dreams.
          </p>
        </div>
      </div>
    </footer>
  );
}
