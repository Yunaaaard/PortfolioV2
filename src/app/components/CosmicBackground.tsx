import { useEffect, useRef } from "react";

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  ringColor: string | null;
  hasRing: boolean;
  ringTilt: number;
  floatSpeed: number;
  floatOffset: number;
  floatAmplitude: number;
  catType: number; // 0 = sitting, 1 = loaf, 2 = standing
  catScale: number;
  orbitDots: { angle: number; speed: number; dist: number; size: number; color: string }[];
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const mouse = { x: -9999, y: -9999 };
    const smoothMouse = { x: -9999, y: -9999 };
    const INTERACT_RADIUS = 160;

    interface Star {
      x: number; y: number; baseX: number; baseY: number;
      radius: number; opacity: number; twinkleSpeed: number;
      twinkleOffset: number; depth: number;
    }

    const stars: Star[] = [];

    const PLANET_CONFIGS = [
      {
        color: "#3b1f6e", ringColor: "#7c4dbd", hasRing: true, ringTilt: 0.3,
        catType: 0, radiusFactor: 0.042,
        orbitDotColors: ["#c084fc", "#a855f7"],
      },
      {
        color: "#0e4a5a", ringColor: null, hasRing: false, ringTilt: 0,
        catType: 1, radiusFactor: 0.032,
        orbitDotColors: ["#22d3ee", "#06b6d4"],
      },
      {
        color: "#4a1a3a", ringColor: "#d946ef", hasRing: true, ringTilt: -0.25,
        catType: 2, radiusFactor: 0.028,
        orbitDotColors: ["#f0abfc", "#e879f9"],
      },
      {
        color: "#1a3a2a", ringColor: null, hasRing: false, ringTilt: 0,
        catType: 0, radiusFactor: 0.022,
        orbitDotColors: ["#4ade80", "#22c55e"],
      },
      {
        color: "#2a1a0e", ringColor: "#fb923c", hasRing: true, ringTilt: 0.4,
        catType: 1, radiusFactor: 0.018,
        orbitDotColors: ["#fdba74", "#f97316"],
      },
    ];

    const planets: Planet[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
      generatePlanets();
    };

    const generatePlanets = () => {
      planets.length = 0;
      const w = canvas.width;
      const h = canvas.height;

      const positions = [
        { x: w * 0.12, y: h * 0.18 },
        { x: w * 0.82, y: h * 0.25 },
        { x: w * 0.68, y: h * 0.72 },
        { x: w * 0.22, y: h * 0.75 },
        { x: w * 0.50, y: h * 0.12 },
      ];

      PLANET_CONFIGS.forEach((cfg, i) => {
        const pos = positions[i];
        const radius = Math.min(w, h) * cfg.radiusFactor;
        const numDots = 3 + Math.floor(Math.random() * 3);
        const orbitDots = Array.from({ length: numDots }, (_, j) => ({
          angle: (j / numDots) * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.006,
          dist: radius * (1.8 + Math.random() * 0.8),
          size: 1.5 + Math.random() * 2,
          color: cfg.orbitDotColors[j % cfg.orbitDotColors.length],
        }));

        planets.push({
          x: pos.x, y: pos.y,
          radius,
          color: cfg.color,
          ringColor: cfg.ringColor,
          hasRing: cfg.hasRing,
          ringTilt: cfg.ringTilt,
          catType: cfg.catType,
          catScale: radius * 0.045,
          floatSpeed: 0.0006 + Math.random() * 0.0004,
          floatOffset: Math.random() * Math.PI * 2,
          floatAmplitude: radius * 0.4,
          orbitDots,
        });
      });
    };

    const generateStars = () => {
      stars.length = 0;
      const area = canvas.width * canvas.height;
      const count = Math.floor(area / 3000);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x, y, baseX: x, baseY: y,
          radius: Math.random() * 1.4 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.002 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          depth: Math.random(),
        });
      }
    };

    // Cat silhouette drawing functions
    const drawCatSitting = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(0,0,0,0.85)";

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 3.5, s * 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(0, -s * 4.8, s * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-s * 2.2, -s * 6.8);
      ctx.lineTo(-s * 3.5, -s * 9.5);
      ctx.lineTo(-s * 0.5, -s * 7.2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(s * 2.2, -s * 6.8);
      ctx.lineTo(s * 3.5, -s * 9.5);
      ctx.lineTo(s * 0.5, -s * 7.2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(s * 3, s * 1);
      ctx.quadraticCurveTo(s * 7, s * 3, s * 5, -s * 2);
      ctx.quadraticCurveTo(s * 6.5, -s * 4, s * 4.5, -s * 3.5);
      ctx.lineWidth = s * 1.8;
      ctx.strokeStyle = "rgba(0,0,0,0.85)";
      ctx.lineCap = "round";
      ctx.stroke();

      // Eyes (tiny glowing slits)
      ctx.fillStyle = "rgba(139,92,246,0.9)";
      ctx.beginPath();
      ctx.ellipse(-s * 1, -s * 5, s * 0.5, s * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(s * 1, -s * 5, s * 0.5, s * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawCatLoaf = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(0,0,0,0.85)";

      // Loaf body
      ctx.beginPath();
      ctx.ellipse(0, s, s * 5, s * 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head (tucked)
      ctx.beginPath();
      ctx.arc(0, -s * 1.8, s * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-s * 1.8, -s * 3.5);
      ctx.lineTo(-s * 3.2, -s * 6);
      ctx.lineTo(-s * 0.4, -s * 4);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(s * 1.8, -s * 3.5);
      ctx.lineTo(s * 3.2, -s * 6);
      ctx.lineTo(s * 0.4, -s * 4);
      ctx.fill();

      // Eyes (sleepy half-closed)
      ctx.fillStyle = "rgba(6,182,212,0.9)";
      ctx.beginPath();
      ctx.ellipse(-s * 0.9, -s * 1.8, s * 0.6, s * 0.2, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(s * 0.9, -s * 1.8, s * 0.6, s * 0.2, 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawCatStanding = (cx: number, cy: number, s: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = "rgba(0,0,0,0.85)";

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 2.5, s * 4.5, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(-s * 0.5, -s * 5.5, s * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      ctx.beginPath();
      ctx.moveTo(-s * 2.5, -s * 7);
      ctx.lineTo(-s * 3.8, -s * 10);
      ctx.lineTo(-s * 1, -s * 7.5);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(s * 0.8, -s * 7.2);
      ctx.lineTo(s * 2, -s * 10);
      ctx.lineTo(s * 1.8, -s * 7.5);
      ctx.fill();

      // Legs
      ctx.strokeStyle = "rgba(0,0,0,0.85)";
      ctx.lineWidth = s * 1.6;
      ctx.lineCap = "round";
      [[-s * 1.5, s * 3, -s * 1.8, s * 7], [s * 1, s * 3, s * 0.8, s * 7],
       [-s * 1.2, s * 1.5, -s * 2, s * 5.5], [s * 1.5, s * 1.5, s * 2.2, s * 5.5]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Tail
      ctx.beginPath();
      ctx.moveTo(s * 2, -s * 1);
      ctx.quadraticCurveTo(s * 8, s * 0, s * 6, -s * 5);
      ctx.lineWidth = s * 1.5;
      ctx.stroke();

      // Eyes
      ctx.fillStyle = "rgba(217,70,239,0.9)";
      ctx.beginPath();
      ctx.ellipse(-s * 1.5, -s * 5.5, s * 0.55, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(s * 0.3, -s * 5.8, s * 0.55, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawPlanet = (planet: Planet, time: number, scrollY: number) => {
      const floatY = Math.sin(time * planet.floatSpeed + planet.floatOffset) * planet.floatAmplitude;
      const floatX = Math.cos(time * planet.floatSpeed * 0.7 + planet.floatOffset) * planet.floatAmplitude * 0.4;
      
      // Scroll parallax offset based on planet size
      const scrollOffset = scrollY * (0.05 + planet.radius * 0.002);
      
      const px = planet.x + floatX;
      let py = (planet.y + floatY - scrollOffset) % canvas.height;
      if (py < 0) py += canvas.height;

      const r = planet.radius;

      // Soft opacity fade near top/bottom edges for seamless wrapping
      const margin = 120;
      let alpha = 1;
      if (py < margin) {
        alpha = Math.max(0, py / margin);
      } else if (py > canvas.height - margin) {
        alpha = Math.max(0, (canvas.height - py) / margin);
      }

      ctx.save();
      ctx.globalAlpha = alpha;

      // Ring behind planet
      if (planet.hasRing && planet.ringColor) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, Math.sin(Math.abs(planet.ringTilt)) * 0.6 + 0.15);
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.85, 0, Math.PI * 2);
        ctx.strokeStyle = planet.ringColor + "55";
        ctx.lineWidth = r * 0.35;
        ctx.stroke();
        ctx.restore();
      }

      // Planet body
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      // Subtle surface bands
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.clip();
      const bandGrad = ctx.createLinearGradient(px - r, py - r, px + r, py + r);
      bandGrad.addColorStop(0, "rgba(255,255,255,0.08)");
      bandGrad.addColorStop(0.4, "rgba(255,255,255,0.03)");
      bandGrad.addColorStop(0.6, "rgba(0,0,0,0.1)");
      bandGrad.addColorStop(1, "rgba(0,0,0,0.25)");
      ctx.fillStyle = bandGrad;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
      ctx.restore();

      // Ring in front of planet (lower half)
      if (planet.hasRing && planet.ringColor) {
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(1, Math.sin(Math.abs(planet.ringTilt)) * 0.6 + 0.15);
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.85, 0, Math.PI); // only bottom half
        ctx.strokeStyle = planet.ringColor + "99";
        ctx.lineWidth = r * 0.35;
        ctx.stroke();
        ctx.restore();
      }

      // Orbit dots
      planet.orbitDots.forEach(dot => {
        dot.angle += dot.speed;
        const dx = Math.cos(dot.angle) * dot.dist;
        const dy = Math.sin(dot.angle) * dot.dist * 0.4;
        ctx.beginPath();
        ctx.arc(px + dx, py + dy, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color + "cc";
        ctx.fill();
      });

      // Cat on top of planet
      const catFns = [drawCatSitting, drawCatLoaf, drawCatStanding];
      catFns[planet.catType](px, py - r, planet.catScale);

      ctx.restore(); // restore global alpha & canvas state
    };

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const draw = (time: number) => {
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (smoothMouse.x > 0 && smoothMouse.y > 0) {
        const glow = ctx.createRadialGradient(smoothMouse.x, smoothMouse.y, 0, smoothMouse.x, smoothMouse.y, INTERACT_RADIUS * 1.5);
        glow.addColorStop(0, "rgba(139, 92, 246, 0.06)");
        glow.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Stars with infinite scroll parallax
      for (const star of stars) {
        // Star depth-based vertical scroll
        let currentBaseY = (star.baseY - scrollY * (0.02 + star.depth * 0.12)) % canvas.height;
        if (currentBaseY < 0) currentBaseY += canvas.height;

        const dx = smoothMouse.x - star.baseX;
        const dy = smoothMouse.y - currentBaseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / INTERACT_RADIUS);
        const pushStrength = proximity * 18 * star.depth;
        const angle = Math.atan2(dy, dx);
        star.x += (star.baseX - Math.cos(angle) * pushStrength - star.x) * 0.1;
        star.y += (currentBaseY - Math.sin(angle) * pushStrength - star.y) * 0.1;

        const flicker = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const boostedOpacity = star.opacity * flicker + proximity * 0.5;
        const boostedRadius = star.radius + proximity * 2.5;
        const r = Math.round(255 - proximity * 116);
        const g = Math.round(255 - proximity * 163);
        const b = Math.round(255 - proximity * 9);

        ctx.beginPath();
        ctx.arc(star.x, star.y, boostedRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(boostedOpacity, 1)})`;
        ctx.fill();

        if (star.radius > 1 || proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, boostedRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${proximity > 0.3 ? proximity * 0.25 : boostedOpacity * 0.12})`;
          ctx.fill();
        }
      }

      // Planets with cats
      planets.forEach(p => drawPlanet(p, time, scrollY));

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
      <div className="shooting-star shooting-star-5" />
      <div className="shooting-star shooting-star-6" />
      <div className="shooting-star shooting-star-7" />
    </div>
  );
}