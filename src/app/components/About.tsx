import { useState } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal, RevealItem, EditorialSectionHeader } from "./SectionReveal";

import gradImg from "../assets/images/GRAD-PIC.png";
import pogiImg from "../assets/images/yunard-pogi.jpg";
import chuyImg from "../assets/images/yunard-chuy.jpg";

interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  note: string;
}

const photos: PhotoItem[] = [
  {
    id: "portrait-1",
    src: pogiImg,
    alt: "Leonard Tariman",
    note: "Cebu City, PH",
  },
  {
    id: "portrait-2",
    src: chuyImg,
    alt: "Leonard Tariman portrait",
    note: "Off-desk",
  },
  {
    id: "grad",
    src: gradImg,
    alt: "Leonard Tariman graduation",
    note: "BS Information Technology",
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextPhoto = () => setActiveIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const activePhoto = photos[activeIndex];

  const details = [
    { label: "Degree", value: "BS Information Technology" },
    { label: "Base", value: "Cebu City, Philippines" },
    { label: "Primary Stack", value: "React, TypeScript, Flutter, .NET" },
    { label: "Availability", value: "Open for freelance projects" },
  ];

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <SectionReveal direction="up" stagger={0.1}>
          <RevealItem>
            <EditorialSectionHeader
              index="01"
              label="Background"
              title="About"
              serifWord="me."
            />
          </RevealItem>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Interactive Fanned Photo Stack */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
              <RevealItem direction="left" className="w-full max-w-[340px]">
                <div
                  className="relative aspect-[3/3.8] w-full select-none"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {photos.map((photo, index) => {
                    // Relative position in stack: 0 = front, 1 = middle, 2 = back
                    const offset = (index - activeIndex + photos.length) % photos.length;
                    const isFront = offset === 0;

                    const rotation =
                      offset === 0
                        ? 0
                        : offset === 1
                        ? isHovered
                          ? 6
                          : 3.5
                        : isHovered
                        ? -6
                        : -3.5;

                    const translateX =
                      offset === 0
                        ? 0
                        : offset === 1
                        ? isHovered
                          ? 18
                          : 10
                        : isHovered
                        ? -18
                        : -10;

                    const translateY = offset * 8;
                    const scale = 1 - offset * 0.04;

                    return (
                      <motion.div
                        key={photo.id}
                        animate={{
                          rotate: rotation,
                          x: translateX,
                          y: translateY,
                          scale,
                          zIndex: photos.length - offset,
                          opacity: offset === 0 ? 1 : 0.65 - offset * 0.15,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                        style={{ willChange: "transform, opacity" }}
                        onClick={() => {
                          if (isFront) {
                            nextPhoto();
                          } else {
                            setActiveIndex(index);
                          }
                        }}
                        className="absolute inset-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl cursor-pointer group"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          decoding="async"
                          className="w-full h-full object-cover"
                        />

                        {isFront && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-4">
                            <span className="text-xs font-mono-jb text-zinc-200">
                              {photo.note}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxOpen(true);
                              }}
                              className="p-2 rounded-full bg-black/70 border border-white/15 text-white hover:bg-black transition-colors"
                              aria-label="View full size"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Minimal Deck Controls */}
                <div className="flex items-center justify-between mt-6 pt-3 border-t border-white/[0.07]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-jb text-xs text-zinc-400">
                      0{activeIndex + 1} / 0{photos.length}
                    </span>
                    <span className="text-zinc-700">&middot;</span>
                    <span className="text-xs text-zinc-500">
                      {activePhoto.note}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-white/20 transition-colors cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:border-white/20 transition-colors cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </RevealItem>
            </div>

            {/* Right: Grounded Bio & Clean Fact Sheet */}
            <div className="lg:col-span-7 space-y-8">
              <RevealItem direction="right">
                <div className="space-y-5 text-zinc-300 text-base sm:text-[17px] leading-relaxed">
                  <p>
                    I&apos;m an Information Technology graduate from Cebu City with a focus on full-stack web and mobile application development.
                  </p>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    Most of my work involves building web applications with React, TypeScript, and Laravel/.NET, alongside cross-platform mobile apps in Flutter and Dart. I care about keeping codebases readable, structuring databases properly, and shipping interfaces that feel fast and straightforward to use.
                  </p>
                </div>
              </RevealItem>

              {/* Editorial Key-Value Specification Rows */}
              <RevealItem direction="right">
                <div className="border-t border-white/[0.08] divide-y divide-white/[0.07]">
                  {details.map((item) => (
                    <div
                      key={item.label}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <span className="font-mono-jb text-xs uppercase tracking-wider text-zinc-500">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-zinc-200">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealItem>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="about-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={activePhoto.src}
              alt={activePhoto.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[82vh] object-contain rounded-xl border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
