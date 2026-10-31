import { memo } from "react";

export const CosmicBackground = memo(function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle architectural dot matrix */}
      <div className="portfolio-bg-grid" />

      {/* Restrained top monochrome light */}
      <div className="portfolio-ambient-glow" />

      {/* Vertical editorial structural guide rails on large screens */}
      <div className="hidden xl:block container mx-auto max-w-5xl h-full border-x border-white/[0.035]" />
    </div>
  );
});
