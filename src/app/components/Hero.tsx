import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 z-10">
        <SectionReveal direction="up" stagger={0.18} className="max-w-4xl mx-auto text-center">
          <RevealItem direction="down">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              {"Hi, I'm "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(167,139,250,0.6)]">
                Leonard Tariman
              </span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 select-none">
              {"I love "}
              <motion.span
                className="inline-block cursor-pointer text-violet-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                whileHover={{ 
                  scale: 1.25, 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                milkte
              </motion.span>
              {" "}
              <motion.span
                className="inline-block cursor-pointer text-fuchsia-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]"
                whileHover={{ 
                  scale: 1.25, 
                  y: [0, -10, 0],
                  transition: { 
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                borjer
              </motion.span>
              {" at "}
              <motion.span
                className="inline-block cursor-pointer text-cyan-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                whileHover={{ 
                  scale: 1.25, 
                  skewX: [0, 15, -15, 15, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                chaka
              </motion.span>
              {" "}
              <motion.span
                className="inline-block cursor-pointer text-amber-400 font-semibold hover:drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                whileHover={{ 
                  scale: 1.25, 
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                frays
              </motion.span>
              {"."}
            </p>
          </RevealItem>

          <RevealItem>
            <div className="flex gap-4 justify-center mb-12">
              <a
                href="#contact"
                className="neon-btn px-8 py-3 rounded-lg text-white font-medium"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="neon-btn-outline px-8 py-3 rounded-lg border border-violet-500/50 text-violet-300 transition-all"
              >
                View Work
              </a>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex gap-6 justify-center">
              <a
                href="https://github.com/Yunaaaard"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yunaaaard/"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-icon text-zinc-500 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:tarimanleonard28@gmail.com"
                className="neon-icon text-zinc-500 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </RevealItem>
        </SectionReveal>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="neon-icon absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 transition-colors"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
