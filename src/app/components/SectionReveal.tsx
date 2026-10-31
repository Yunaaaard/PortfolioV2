import { motion, useScroll, useSpring, type Variant } from "motion/react";
import { useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface SectionRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 22 },
  down: { x: 0, y: -22 },
  left: { x: 22, y: 0 },
  right: { x: -22, y: 0 },
};

/**
 * High-performance, GPU-composited staggered section reveal.
 * Optimized with cubic-bezier easing and hardware isolation for locked 60fps/120fps scrolling.
 */
export function SectionReveal({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  once = true,
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated child item that glides into position using silky ease-out deceleration.
 */
export function RevealItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      style={{ willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial section header with a scroll-animated hairline rule and index number.
 */
export function EditorialSectionHeader({
  index,
  label,
  title,
  serifWord,
  subtitle,
}: {
  index: string;
  label: string;
  title: string;
  serifWord?: string;
  subtitle?: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start 0.95", "start 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={headerRef} className="mb-14">
      {/* Top index row + animated scroll line */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono-jb text-xs text-zinc-500 tracking-widest">
          {index}
        </span>
        <div className="relative flex-1 h-px bg-white/[0.06] overflow-hidden">
          <motion.div
            style={{ scaleX: lineScale, willChange: "transform" }}
            className="absolute inset-0 bg-white/30 origin-left"
          />
        </div>
        <span className="font-mono-jb text-[11px] uppercase tracking-[0.2em] text-zinc-400">
          {label}
        </span>
      </div>

      {/* Main heading & optional description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 leading-[1.1]">
          {title}{" "}
          {serifWord && (
            <span className="font-serif-editorial italic font-normal text-zinc-300">
              {serifWord}
            </span>
          )}
        </h2>
        {subtitle && (
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
