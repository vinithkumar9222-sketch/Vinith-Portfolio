"use client";

import { useCallback, useEffect, useRef } from "react";

const COLS = 9;
const ROWS = 12;
const DOT_SIZE = 4;

// Deterministic hash so the scatter is stable across server/client render.
// Uses only 32-bit integer ops (imul/xor/shift), which the spec pins down
// exactly — unlike the classic `fract(sin(x) * 43758.5453)` trick, whose
// Math.sin precision is implementation-defined and differs just enough
// between Node's and the browser's V8 build to break SSR/CSR hydration.
function seededRandom(seed: number) {
  let t = (seed | 0) + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Every particle shares this duration so the whole grid reconstructs and
// pauses in lockstep every cycle. Only animation-delay differs per dot.
const DURATION = 7;
// Spread of the activation wave. Must stay comfortably under the 25% tail
// hold (75%-100% of DURATION) so every dot is provably at rest together
// before the next loop starts.
const MAX_STAGGER = 1.4;

// Cursor-follow tuning: dots within HOVER_RADIUS px of the pointer get
// pulled toward it, falling off to nothing at the edge of the radius.
const HOVER_RADIUS = 70;
const HOVER_STRENGTH = 18;

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);

  const recomputeCenters = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    centersRef.current = dotRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - rect.left,
        y: r.top + r.height / 2 - rect.top,
      };
    });
  }, []);

  useEffect(() => {
    recomputeCenters();
    window.addEventListener("resize", recomputeCenters);
    return () => window.removeEventListener("resize", recomputeCenters);
  }, [recomputeCenters]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      centersRef.current.forEach((c, idx) => {
        const el = dotRefs.current[idx];
        if (!el) return;
        const dx = mx - c.x;
        const dy = my - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist < HOVER_RADIUS && dist > 0.01) {
          const pull = (1 - dist / HOVER_RADIUS) * HOVER_STRENGTH;
          const tx = (dx / dist) * pull;
          const ty = (dy / dist) * pull;
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        } else {
          el.style.transform = "translate3d(0, 0, 0)";
        }
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    dotRefs.current.forEach((el) => {
      if (el) el.style.transform = "translate3d(0, 0, 0)";
    });
  }, []);

  const centerCol = (COLS - 1) / 2;
  const maxWave = ROWS - 1 + (COLS - 1);

  const particles = [];
  let i = 0;

  const cellW = 100 / COLS;
  const cellH = 100 / ROWS;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // Jittered within its own cell (deterministic, not Math.random) so the
      // resting formation reads as an organic scatter instead of a rigid grid,
      // while still being reproducible and evenly spread across the area.
      const jitterX = (seededRandom(i * 3.11 + 7) - 0.5) * cellW * 0.9;
      const jitterY = (seededRandom(i * 7.77 + 13) - 0.5) * cellH * 0.9;
      const leftPct = ((col + 0.5) / COLS) * 100 + jitterX;
      const topPct = ((row + 0.5) / ROWS) * 100 + jitterY;
      const dotSize = DOT_SIZE - 1 + seededRandom(i * 5.29 + 19) * 3;

      // Trajectory is a pure function of grid position (never random), so
      // neighbouring dots move together and the burst always folds back
      // into the exact same formation.
      const dx = (col - centerCol) * 2.4;
      const dy = -(14 + row * 1.6);
      const dz = ((row + col) % 2 === 0 ? 1 : -1) * (10 + row * 2.4);
      const peakScale =
        1.1 + (1 - Math.abs(col - centerCol) / centerCol) * 0.35;
      const blur = Math.min(1.2, Math.abs(dz) / 40);

      // Diagonal sweep: dots further from the top-left corner activate later.
      const wave = (row + col) / maxWave;
      const delay = wave * MAX_STAGGER;

      const burstStyle = {
        animationDuration: `${DURATION}s`,
        animationDelay: `${delay}s`,
        "--dx": `${dx}px`,
        "--dy": `${dy}px`,
        "--dz": `${dz}px`,
        "--peak-scale": peakScale,
        "--blur": `${blur}px`,
      } as React.CSSProperties;

      const index = i;
      particles.push(
        <div
          key={index}
          ref={(el) => {
            dotRefs.current[index] = el;
          }}
          className="hero-particle-wrap absolute"
          style={{ left: `${leftPct}%`, top: `${topPct}%` }}
        >
          <span
            className="hero-particle bg-blue-400"
            style={{ width: dotSize, height: dotSize, ...burstStyle }}
          />
        </div>
      );
      i++;
    }
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto relative h-full w-full"
      style={{ perspective: "700px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {particles}
      </div>
    </div>
  );
}
