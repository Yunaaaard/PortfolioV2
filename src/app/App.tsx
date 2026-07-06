import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CosmicBackground } from "./components/CosmicBackground";
import { Chatbot } from "./components/Chatbot";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050510] text-white relative">
      {/* Top glowing scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 z-50 origin-left shadow-[0_0_12px_rgba(139,92,246,0.6)]"
        style={{ scaleX }}
      />

      {/* Cosmic Background — stars, nebulae, shooting stars */}
      <CosmicBackground />

      {/* Main Content Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Skills />
        <Contact />
        <Footer />
      </div>

      {/* Floating Chat Assistant */}
      <Chatbot />
    </div>
  );
}
