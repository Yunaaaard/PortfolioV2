import { motion, type Variant } from "motion/react";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface SectionRevealProps {
  children: ReactNode;
  direction?: Direction;
  /** Extra delay in seconds before animation starts */
  delay?: number;
  /** Stagger children by this amount (seconds) */
  stagger?: number;
  className?: string;
  /** Trigger animation only once */
  once?: boolean;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const hiddenVariant = (dir: Direction): Variant => ({
  opacity: 0,
  x: directionOffsets[dir].x,
  y: directionOffsets[dir].y,
  scale: 0.98,
});

const visibleVariant: Variant = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
};

/**
 * Wraps children in a reveal animation triggered natively when entering the viewport.
 */
export function SectionReveal({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  once = false,
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
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
 * Animated child item that inherits stagger timings from parent.
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
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1], // Custom easeOutExpo
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
