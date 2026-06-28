import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CosmicBackground } from "./components/CosmicBackground";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050510] text-white relative">
      {/* Cosmic Background — stars, nebulae, shooting stars */}
      <CosmicBackground />

      {/* Main Content Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
