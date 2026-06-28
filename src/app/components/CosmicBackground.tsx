import { useEffect, useRef } from "react";

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Star {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
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
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.4 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const flicker =
          0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * flicker;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,210,255,${alpha * 0.12})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
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
