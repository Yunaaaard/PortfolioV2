import { Navbar } from "./components/Navbar";
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
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090b] text-zinc-100 relative selection:bg-white/15 selection:text-white">
      {/* Precision Top Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-zinc-200 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Modern Ambient Architectural Background */}
      <CosmicBackground />

      {/* Floating Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Portfolio Assistant */}
      <Chatbot />
    </div>
  );
}
