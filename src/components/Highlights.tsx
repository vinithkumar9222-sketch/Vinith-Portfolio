"use client";

import { useEffect, useRef, useState } from "react";
import { highlights, type Highlight } from "@/data/portfolio";

const iconStyles: Record<Highlight["icon"], string> = {
  document: "bg-blue-100 text-blue-600",
  users: "bg-purple-100 text-purple-600",
  gear: "bg-teal-100 text-teal-600",
  chart: "bg-red-100 text-red-500",
};

function HighlightIcon({ icon }: { icon: Highlight["icon"] }) {
  switch (icon) {
    case "document":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z" opacity="0.25" />
          <path d="M14 2v6h6" opacity="0.4" />
          <rect x="7" y="13" width="10" height="1.6" rx="0.8" />
          <rect x="7" y="17" width="7" height="1.6" rx="0.8" />
        </svg>
      );
    case "users":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="8" r="4" />
          <path d="M1 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1H1z" />
          <circle cx="18" cy="9" r="3" opacity="0.5" />
          <path d="M17 13a5 5 0 0 1 6 5v1h-4v-1a7 7 0 0 0-2-5z" opacity="0.5" />
        </svg>
      );
    case "gear":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="14" width="4" height="7" rx="1" opacity="0.5" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="16" y="4" width="4" height="17" rx="1" opacity="0.75" />
        </svg>
      );
  }
}

function HighlightCard({
  highlight,
  active,
}: {
  highlight: Highlight;
  active?: boolean;
}) {
  return (
    <div
      className={`h-full rounded-2xl border bg-background p-4 transition-all duration-300 ${
        active === undefined
          ? "border-black/10 hover:border-black/20"
          : active
            ? "scale-100 border-accent opacity-100 shadow-lg shadow-accent/10"
            : "scale-90 border-black/10 opacity-40"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[highlight.icon]}`}
      >
        <HighlightIcon icon={highlight.icon} />
      </div>
      <h3 className="mt-3 text-sm font-semibold">{highlight.title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-foreground/70">
        {highlight.description}
      </p>
    </div>
  );
}

export default function Highlights() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Continuously find whichever card is nearest the container's center,
    // rather than relying on IntersectionObserver threshold crossings —
    // those can be skipped entirely during a fast swipe, leaving the
    // highlight stuck on a card that's no longer centered. The computation
    // is cheap (4 cards), so we run it on every scroll event directly
    // instead of throttling to rAF, which risked coalescing away exactly
    // the update that should have fired near a snap point. "scrollend" is
    // a belt-and-braces final check once the snap settle finishes.
    const updateActive = () => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      let closestIdx = 0;
      let closestDist = Infinity;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - centerX);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      setActive(closestIdx);
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    container.addEventListener("scrollend", updateActive);
    window.addEventListener("resize", updateActive);

    // Belt-and-braces: poll on a timer too, so the highlight is correct
    // even if a browser/engine quirk drops or delays the scroll event
    // itself (rather than trusting event dispatch is fully reliable).
    const poll = window.setInterval(updateActive, 150);

    return () => {
      container.removeEventListener("scroll", updateActive);
      container.removeEventListener("scrollend", updateActive);
      window.removeEventListener("resize", updateActive);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl shrink-0 px-6 pb-10 pt-6 lg:pb-6">
      {/* Mobile: horizontal snap carousel, centered card highlighted */}
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-visible py-3 sm:hidden"
      >
        <div className="w-[11%] shrink-0" aria-hidden="true" />
        {highlights.map((highlight, idx) => (
          <div
            key={highlight.title}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            data-index={idx}
            className="w-[78%] shrink-0 snap-center px-2"
          >
            <HighlightCard highlight={highlight} active={active === idx} />
          </div>
        ))}
        <div className="w-[11%] shrink-0" aria-hidden="true" />
      </div>

      {/* Tablet and up: static grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight) => (
          <HighlightCard key={highlight.title} highlight={highlight} />
        ))}
      </div>
    </section>
  );
}
