import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] z-10">
      <div className="container mx-auto px-6 max-w-5xl py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="font-semibold text-sm text-white tracking-tight">
              Leonard Tariman
            </span>
            <span className="text-xs text-zinc-500 mt-0.5">
              Software Developer &bull; BS Information Technology
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs text-zinc-400">
            <a
              href="https://github.com/Yunaaaard"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yunaaaard/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:tarimanleonard28@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <div className="text-xs text-zinc-500 font-mono text-center sm:text-right">
            &copy; {new Date().getFullYear()} Leonard Tariman. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
