import { useState, useEffect, useRef } from "react";

type Axis = "x" | "y" | "z";

interface Move {
  axis: Axis;
  layer: number; // -1, 0, or 1
  dir: 1 | -1;
}

type Mat3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number]
];

interface Cubie {
  id: number;
  pos: [number, number, number]; // [x, y, z] in {-1, 0, 1}
  matrix: Mat3;
  stickers: {
    top?: string;    // -Y
    bottom?: string; // +Y
    front?: string;  // +Z
    back?: string;   // -Z
    right?: string;  // +X
    left?: string;   // -X
  };
}

const CUBIE_SIZE = 42;
const GAP = 46;
const HALF_SIZE = CUBIE_SIZE / 2;

// Premium jewel-tone sticker styles
const STICKER_STYLES = {
  top: "bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-400 border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.25)]",
  bottom: "bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 border border-yellow-200/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.35)]",
  front: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 border border-emerald-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.4)]",
  back: "bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700 border border-sky-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.4)]",
  right: "bg-gradient-to-br from-rose-500 via-red-600 to-red-800 border border-rose-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.4)]",
  left: "bg-gradient-to-br from-amber-400 via-orange-500 to-orange-700 border border-amber-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.4)]",
};

// 90-degree standard rotation matrices
const ROT_MATS: Record<Axis, Record<1 | -1, Mat3>> = {
  x: {
    1: [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
    "-1": [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
  },
  y: {
    1: [[0, 0, 1], [0, 1, 0], [-1, 0, 0]],
    "-1": [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
  },
  z: {
    1: [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    "-1": [[0, 1, 0], [-1, 0, 0], [0, 0, 1]],
  },
};

function matMul(A: Mat3, B: Mat3): Mat3 {
  const C: Mat3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return C;
}

function multVec(M: Mat3, v: [number, number, number]): [number, number, number] {
  return [
    M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2],
    M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2],
    M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2],
  ];
}

// Convert 3x3 orientation matrix + translation into CSS matrix3d column-major format
function toCssMatrix3d(M: Mat3, tx: number, ty: number, tz: number): string {
  return `matrix3d(${M[0][0]}, ${M[1][0]}, ${M[2][0]}, 0, ${M[0][1]}, ${M[1][1]}, ${M[2][1]}, 0, ${M[0][2]}, ${M[1][2]}, ${M[2][2]}, 0, ${tx}, ${ty}, ${tz}, 1)`;
}

// Curated kinetic solve loop
const SEQUENCE: Move[] = [
  { axis: "y", layer: -1, dir: 1 },  // U
  { axis: "x", layer: 1, dir: -1 },  // R
  { axis: "z", layer: 1, dir: 1 },   // F
  { axis: "y", layer: -1, dir: -1 }, // U'
  { axis: "x", layer: 1, dir: 1 },   // R'
  { axis: "z", layer: 1, dir: -1 },  // F'
  { axis: "x", layer: -1, dir: 1 },  // L
  { axis: "y", layer: 1, dir: -1 },  // D'
  { axis: "x", layer: -1, dir: -1 }, // L'
  { axis: "y", layer: 1, dir: 1 },   // D
];

// Initialize all 27 cubies with their fixed physical stickers
const initialCubies: Cubie[] = [];
let idCounter = 0;
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      initialCubies.push({
        id: idCounter++,
        pos: [x, y, z],
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        stickers: {
          top: y === -1 ? STICKER_STYLES.top : undefined,
          bottom: y === 1 ? STICKER_STYLES.bottom : undefined,
          front: z === 1 ? STICKER_STYLES.front : undefined,
          back: z === -1 ? STICKER_STYLES.back : undefined,
          right: x === 1 ? STICKER_STYLES.right : undefined,
          left: x === -1 ? STICKER_STYLES.left : undefined,
        },
      });
    }
  }
}

export function RubiksCube() {
  const [cubies, setCubies] = useState<Cubie[]>(initialCubies);
  const [activeMove, setActiveMove] = useState<Move | null>(null);
  const [moveAngle, setMoveAngle] = useState(0);

  // Smooth orbital floating rotation
  const [baseRot, setBaseRot] = useState({ x: -24, y: 38 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const moveIdxRef = useRef(0);

  // Background autonomous kinetic solve loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runNextMove = () => {
      const move = SEQUENCE[moveIdxRef.current % SEQUENCE.length];
      moveIdxRef.current += 1;
      setActiveMove(move);
      setMoveAngle(0);

      const duration = 520;
      const startTime = performance.now();
      const targetDeg = 90 * move.dir;

      const animateStep = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        // Silky ease-in-out curve
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        setMoveAngle(targetDeg * ease);

        if (p < 1) {
          requestAnimationFrame(animateStep);
        } else {
          // Commit exact rotation matrix to each affected cubie
          const rotM = ROT_MATS[move.axis][move.dir];

          setCubies((prev) =>
            prev.map((c) => {
              const axisIdx = move.axis === "x" ? 0 : move.axis === "y" ? 1 : 2;
              if (c.pos[axisIdx] !== move.layer) return c;

              // Rotate spatial position
              const newPos = multVec(rotM, c.pos);
              // Multiply orientation matrix: M_new = rotM * M_old
              const newMatrix = matMul(rotM, c.matrix);

              return {
                ...c,
                pos: newPos,
                matrix: newMatrix,
              };
            })
          );

          setActiveMove(null);
          setMoveAngle(0);

          // Rest interval before next twist
          timeoutId = setTimeout(runNextMove, 900);
        }
      };

      requestAnimationFrame(animateStep);
    };

    timeoutId = setTimeout(runNextMove, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Continuous subtle orbital wobble
  useEffect(() => {
    let frameId: number;
    let t = 0;

    const floatLoop = () => {
      t += 0.015;
      if (!isDraggingRef.current) {
        setBaseRot((prev) => ({
          x: -24 + Math.sin(t * 0.8) * 4,
          y: prev.y + 0.18,
        }));
      }
      frameId = requestAnimationFrame(floatLoop);
    };

    frameId = requestAnimationFrame(floatLoop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Interactive mouse drag to tilt
  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    setBaseRot((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - dy * 0.5)),
      y: prev.y + dx * 0.5,
    }));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative flex flex-col items-center select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Precision Circular Stage Pedestal */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-grab active:cursor-grabbing">
        {/* Ambient radial lighting disc */}
        <div className="absolute inset-0 rounded-full border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div
          className="absolute inset-4 rounded-full pointer-events-none opacity-30 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 70%)",
          }}
        />

        {/* 3D Perspective Viewport */}
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            perspective: "850px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Main 3D Rotating Stage */}
          <div
            className="relative"
            style={{
              width: CUBIE_SIZE,
              height: CUBIE_SIZE,
              transformStyle: "preserve-3d",
              transform: `rotateX(${baseRot.x}deg) rotateY(${baseRot.y}deg)`,
              transition: isDraggingRef.current ? "none" : "transform 0.1s ease-out",
            }}
          >
            {/* Soft Shadow Floor */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-black/60 blur-md"
              style={{
                width: "150px",
                height: "150px",
                transform: "translateY(95px) rotateX(90deg)",
              }}
            />

            {/* 27 Rendered Cubies */}
            {cubies.map((c) => {
              const axisIdx =
                activeMove?.axis === "x" ? 0 : activeMove?.axis === "y" ? 1 : 2;
              const isMoving =
                activeMove && c.pos[axisIdx] === activeMove.layer;

              let layerRotation = "";
              if (isMoving && activeMove) {
                if (activeMove.axis === "y") layerRotation = `rotateY(${moveAngle}deg) `;
                if (activeMove.axis === "x") layerRotation = `rotateX(${moveAngle}deg) `;
                if (activeMove.axis === "z") layerRotation = `rotateZ(${moveAngle}deg) `;
              }

              // Exact 3D matrix translation and orientation
              const tx = c.pos[0] * GAP;
              const ty = c.pos[1] * GAP;
              const tz = c.pos[2] * GAP;
              const cubieMatrix = toCssMatrix3d(c.matrix, tx, ty, tz);

              return (
                <div
                  key={c.id}
                  className="absolute inset-0"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `${layerRotation}${cubieMatrix}`,
                  }}
                >
                  {/* Front Face (+Z) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.front && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.front}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Back Face (-Z) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `rotateY(180deg) translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.back && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.back}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Right Face (+X) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `rotateY(90deg) translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.right && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.right}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Left Face (-X) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `rotateY(-90deg) translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.left && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.left}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Top Face (-Y in CSS) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `rotateX(90deg) translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.top && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.top}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/30 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Face (+Y in CSS) */}
                  <div
                    className="absolute inset-0 bg-[#0d0d11] rounded-[6px] border border-black/80 flex items-center justify-center p-[2.5px]"
                    style={{
                      transform: `rotateX(-90deg) translateZ(${HALF_SIZE}px)`,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {c.stickers.bottom && (
                      <div className={`w-full h-full rounded-[4px] relative overflow-hidden ${c.stickers.bottom}`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
