import { motion, useScroll, useTransform, useSpring, type Variant } from "motion/react";
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
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

const hiddenVariant = (dir: Direction): Variant => ({
  opacity: 0,
  x: directionOffsets[dir].x,
  y: directionOffsets[dir].y,
  filter: "blur(8px)",
});

const visibleVariant: Variant = {
  opacity: 1,
  x: 0,
  y: 0,
  filter: "blur(0px)",
};

/**
 * Scroll-linked section reveal with continuous depth parallax and staggered blur-to-sharp children.
 */
export function SectionReveal({
  children,
  delay = 0,
  stagger = 0.09,
  className,
  once = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.1"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 0.22, 0.85, 1], [36, 0, 0, -24]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.88, 1], [0.975, 1, 1, 0.985]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.9, 1], [0.2, 1, 1, 0.55]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated child item that transitions from blurred + offset to razor-sharp on scroll.
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
  return (
    <motion.div
      variants={{
        hidden: hiddenVariant(direction),
        visible: {
          ...visibleVariant,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
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
    offset: ["start 0.92", "start 0.45"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
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
            style={{ scaleX: lineScale }}
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
