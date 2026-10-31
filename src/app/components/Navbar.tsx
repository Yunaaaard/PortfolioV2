import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import avatarImg from "../assets/images/yunard-pogi.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Credentials", href: "#certifications" },
    { name: "Stack", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
        {/* Identity & Freelance Status */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-zinc-900 shrink-0">
            <img
              src={avatarImg}
              alt="Leonard Tariman"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-xs sm:text-sm text-zinc-100 tracking-tight">
              Leonard Tariman
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for freelancing</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-100 px-3 py-1.5 rounded-full hover:bg-white/[0.04] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href="https://github.com/Yunaaaard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/yunaaaard/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="pro-btn-primary !py-1.5 !px-3.5 !text-xs ml-1"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#09090b]/95 border-b border-white/[0.08] backdrop-blur-xl px-6 py-5"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex gap-3">
                  <a
                    href="https://github.com/Yunaaaard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yunaaaard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="pro-btn-primary !text-xs !py-2 !px-4"
                >
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
