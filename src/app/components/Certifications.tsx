import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { Calendar, ExternalLink, FileCheck, RotateCcw, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { SectionReveal, RevealItem } from "./SectionReveal";

// Import certificate images
import mongodbCert from "../assets/certifications/leonard-tariman-7b9297ae-8ae9-46d5-b386-82d9421d34a5-certificate_page-0001.jpg";
import vectorSearchCert from "../assets/certifications/leonard-tariman-c108ecf8-269c-4844-9110-a0df7efe2e35-certificate_page-0001.jpg";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  accent: "violet" | "fuchsia" | "cyan" | "emerald";
  suit: string;
  image: string;
}

const initialCertifications: Certification[] = [
  {
    title: "Schema Lifecycle Management",
    issuer: "MongoDB, Inc.",
    date: "Feb 23, 2025",
    credentialId: "MDBb4eit8rmpn",
    verifyUrl: "https://learn.mongodb.com/c/e5KXrorpRtWzhoLZQh00pQ",
    skills: ["MongoDB Schema", "Lifecycle Mgmt", "Data Modeling", "NoSQL Database"],
    accent: "emerald",
    suit: "✦",
    image: mongodbCert
  },
  {
    title: "Using Atlas Vector Search for RAG Applications",
    issuer: "MongoDB, Inc.",
    date: "Feb 2025",
    credentialId: "MDB8uep9h79mk",
    verifyUrl: "https://learn.mongodb.com/c/wQjs-CacSESREKDffv4uNQ",
    skills: ["System Admin", "MongoDB Atlas", "Vector Search", "MongoDB Schema"],
    accent: "emerald",
    suit: "✦",
    image: vectorSearchCert
  },
];

const accentStyles: Record<string, {
  glow: string;
  border: string;
  text: string;
  badge: string;
  bgGlow: string;
  shadowColor: string;
}> = {
  violet: {
    glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]",
    border: "border-violet-500/25 hover:border-violet-500/60",
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    bgGlow: "from-violet-500/5 to-transparent",
    shadowColor: "rgba(139,92,246,0.25)"
  },
  fuchsia: {
    glow: "hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]",
    border: "border-fuchsia-500/25 hover:border-fuchsia-500/60",
    text: "text-fuchsia-400",
    badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    bgGlow: "from-fuchsia-500/5 to-transparent",
    shadowColor: "rgba(217,70,239,0.25)"
  },
  cyan: {
    glow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]",
    border: "border-cyan-500/25 hover:border-cyan-500/60",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    bgGlow: "from-cyan-500/5 to-transparent",
    shadowColor: "rgba(6,182,212,0.25)"
  },
  emerald: {
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
    border: "border-emerald-500/25 hover:border-emerald-500/60",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    bgGlow: "from-emerald-500/5 to-transparent",
    shadowColor: "rgba(16,185,129,0.25)"
  }
};

function PlayingCard({
  cert,
  isTop,
  onSwipe,
  stackIndex,
}: {
  cert: Certification;
  isTop: boolean;
  onSwipe: (dir: "left" | "right") => void;
  stackIndex: number;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 120;
    if (info.offset.x > swipeThreshold) {
      onSwipe("right");
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe("left");
    }
  };

  const styles = accentStyles[cert.accent];

  const stackStyle = !isTop
    ? {
      scale: Math.max(0.85, 1 - stackIndex * 0.04),
      y: stackIndex * 10,
      x: stackIndex % 2 === 0 ? stackIndex * 3 : stackIndex * -3,
      rotate: stackIndex % 2 === 0 ? stackIndex * 1.5 : stackIndex * -1.5,
      zIndex: 10 - stackIndex,
      pointerEvents: "none" as const,
    }
    : {
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
      zIndex: 10,
    };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={isTop ? { x, rotate, opacity } : {}}
      animate={stackStyle}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={isTop ? { scale: 1.025, y: -4 } : {}}
      className={`absolute w-full max-w-[280px] sm:max-w-[300px] aspect-[2.9/4] border rounded-3xl p-5 bg-zinc-950/90 backdrop-blur-md flex flex-col justify-between cursor-grab active:cursor-grabbing select-none shadow-2xl transition-shadow duration-300 ${styles.border} ${styles.glow}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGlow} rounded-3xl pointer-events-none`} />

      {/* Top Header Row */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col items-center leading-none">
          <span className={`text-xl font-bold ${styles.text}`}>{cert.suit}</span>
          <span className="text-[9px] font-mono text-zinc-500 mt-1 uppercase font-semibold">
            {cert.issuer.split(" ")[0]}
          </span>
        </div>
        <span className="text-[9px] text-zinc-500 font-bold font-mono-jb uppercase tracking-wider border border-zinc-800/80 px-2 py-0.5 rounded-full bg-zinc-900/50">
          Verified
        </span>
      </div>

      {/* Center Body */}
      <div className="my-auto py-3 text-center relative z-10">
        <h3 className="text-md sm:text-[16px] font-extrabold text-white leading-snug tracking-tight mb-1 px-1">
          {cert.title}
        </h3>
        <p className="text-xs text-zinc-400 font-semibold mb-3">
          {cert.issuer}
        </p>

        <div className="inline-flex flex-col gap-1 items-center text-[10px] text-zinc-500 font-medium">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-zinc-600" />
            <span>Issued {cert.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileCheck className="w-3 h-3 text-zinc-600" />
            <span className="font-mono text-[9px]">ID: {cert.credentialId}</span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-4 relative z-10">
        <div className="flex flex-wrap justify-center gap-1">
          {cert.skills.slice(0, 3).map((skill, sIdx) => (
            <span
              key={sIdx}
              className={`text-[9px] px-2 py-0.5 rounded-md border font-mono-jb font-medium ${styles.badge}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-end pt-3 border-t border-zinc-900/60">
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-white group/link transition-colors"
          >
            <span>Verify</span>
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200 text-zinc-600 group-hover/link:text-white" />
          </a>

          <div className="flex flex-col items-center leading-none rotate-180">
            <span className={`text-xl font-bold ${styles.text}`}>{cert.suit}</span>
            <span className="text-[9px] font-mono text-zinc-500 mt-1 uppercase font-semibold">
              {cert.issuer.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const [deck, setDeck] = useState<Certification[]>(initialCertifications);
  const [swipedCount, setSwipedCount] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    setDeck((prev) => prev.slice(1));
    setSwipedCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setDeck(initialCertifications);
    setSwipedCount(0);
  };

  const handleTriggerSwipe = (direction: "left" | "right") => {
    if (deck.length > 0) {
      handleSwipe(direction);
    }
  };

  // The active/top certificate is the first item in the deck
  const activeCert = deck[0];

  return (
    <section id="certifications" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionReveal direction="up" stagger={0.15} className="max-w-5xl mx-auto">
          <RevealItem>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Professional{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(167,139,250,0.4)]">
                Certifications
              </span>
            </h2>
            <p className="text-zinc-500 text-center mb-16 max-w-xl mx-auto font-mono-jb text-[14px]">
              Continuous training and credentials. Swipe the cards to slide through actual certificates.
            </p>
          </RevealItem>

          {/* Two-Column Side-By-Side Layout */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center justify-center">

            {/* Left Column: Playing Cards Deck Stack & Swipe Controls */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-[280px] sm:w-[300px] h-[410px] flex items-center justify-center">
                <AnimatePresence>
                  {deck.length > 0 ? (
                    deck.map((cert, index) => (
                      <PlayingCard
                        key={cert.title}
                        cert={cert}
                        isTop={index === 0}
                        onSwipe={handleSwipe}
                        stackIndex={index}
                      />
                    ))
                  ) : (
                    // Reshuffle UI
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full border-2 border-dashed border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 bg-zinc-950/20 backdrop-blur-sm"
                    >
                      <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                        <RotateCcw className="w-8 h-8 animate-pulse text-violet-400" />
                      </div>
                      <div>
                        <h3 className="text-md font-bold text-zinc-300 mb-1">End of Deck</h3>
                        <p className="text-xs text-zinc-500 max-w-[200px]">
                          You've swiped through all certifications.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 rounded-xl hover:bg-violet-500 shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-95 transition-all mt-2"
                      >
                        Reshuffle Deck
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Controls */}
              {deck.length > 0 && (
                <div className="flex gap-4 items-center justify-center mt-6 select-none">
                  <button
                    onClick={() => handleTriggerSwipe("left")}
                    className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-colors active:scale-90"
                    title="Swipe Left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono-jb text-zinc-500 w-16 text-center">
                    {swipedCount + 1} / {initialCertifications.length}
                  </span>
                  <button
                    onClick={() => handleTriggerSwipe("right")}
                    className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-green-400 transition-colors active:scale-90"
                    title="Swipe Right"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Dynamic Certificate Image Preview Panel */}
            <div className="lg:col-span-7 w-full flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-[1.414/1] rounded-3xl border border-white/10 bg-[#0a0a14]/60 overflow-hidden flex items-center justify-center p-3 backdrop-blur-md">

                {/* Glowing backdrop based on active card accent color */}
                <AnimatePresence mode="wait">
                  {activeCert && (
                    <motion.div
                      key={`glow-${activeCert.title}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -inset-1.5 rounded-3xl blur-xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${accentStyles[activeCert.accent].shadowColor} 0%, transparent 70%)`
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Inner layout grid dots inside preview box */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* Certificate Slide Transition */}
                <AnimatePresence mode="wait">
                  {activeCert ? (
                    <motion.div
                      key={activeCert.title}
                      initial={{ opacity: 0, x: 20, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                    >
                      <img
                        src={activeCert.image}
                        alt={`${activeCert.title} Certificate`}
                        className="w-full h-full object-cover rounded-2xl select-none"
                      />
                    </motion.div>
                  ) : (
                    // Default / empty deck image placeholder
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-zinc-600 gap-3 text-center"
                    >
                      <Award className="w-16 h-16 opacity-15 text-violet-400" />
                      <span className="text-xs uppercase tracking-widest font-semibold font-mono-jb opacity-30">
                        No Certificate Selected
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
