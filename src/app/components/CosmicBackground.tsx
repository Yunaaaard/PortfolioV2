import { useEffect, useRef } from "react";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Track mouse position with smooth lerping
    const mouse = { x: -9999, y: -9999 };
    const smoothMouse = { x: -9999, y: -9999 };
    const INTERACT_RADIUS = 160;

    interface Star {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      depth: number; // parallax depth layer (0-1)
    }

    const stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    const generateStars = () => {
      stars.length = 0;
      const area = canvas.width * canvas.height;
      const count = Math.floor(area / 3000);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: Math.random() * 1.4 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          depth: Math.random(),
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = (time: number) => {
      // Smooth lerp for mouse position
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a soft radial glow that follows the cursor
      if (smoothMouse.x > 0 && smoothMouse.y > 0) {
        const glow = ctx.createRadialGradient(
          smoothMouse.x, smoothMouse.y, 0,
          smoothMouse.x, smoothMouse.y, INTERACT_RADIUS * 1.5
        );
        glow.addColorStop(0, "rgba(139, 92, 246, 0.06)");
        glow.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (const star of stars) {
        const dx = smoothMouse.x - star.baseX;
        const dy = smoothMouse.y - star.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity factor: 1 when on top, 0 when far away
        const proximity = Math.max(0, 1 - dist / INTERACT_RADIUS);

        // Push stars away from cursor slightly based on depth
        const pushStrength = proximity * 18 * star.depth;
        const angle = Math.atan2(dy, dx);
        const targetX = star.baseX - Math.cos(angle) * pushStrength;
        const targetY = star.baseY - Math.sin(angle) * pushStrength;
        star.x += (targetX - star.x) * 0.1;
        star.y += (targetY - star.y) * 0.1;

        const flicker =
          0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);

        // Boost opacity & size when mouse is near
        const boostedOpacity = star.opacity * flicker + proximity * 0.5;
        const boostedRadius = star.radius + proximity * 2.5;

        // Color shift: white → violet/cyan near cursor
        const r = Math.round(255 - proximity * 116); // 255 → 139
        const g = Math.round(255 - proximity * 163); // 255 → 92
        const b = Math.round(255 - proximity * 9);   // 255 → 246

        ctx.beginPath();
        ctx.arc(star.x, star.y, boostedRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(boostedOpacity, 1)})`;
        ctx.fill();

        // Enhanced glow for nearby or bright stars
        if (star.radius > 1 || proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, boostedRadius * 3, 0, Math.PI * 2);
          const glowAlpha = proximity > 0.3
            ? proximity * 0.25
            : boostedOpacity * 0.12;
          ctx.fillStyle = `rgba(${r},${g},${b},${glowAlpha})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="cosmic-bg">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="absolute inset-0 cosmic-base-gradient" />

      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <div className="nebula nebula-4" />
      <div className="nebula nebula-5" />
      <div className="nebula nebula-6" />

      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
      <div className="shooting-star shooting-star-4" />
    </div>
  );
}

