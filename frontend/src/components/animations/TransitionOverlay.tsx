import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function TransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on very first render — page entrance is handled by PageTransition
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const wordmark = wordmarkRef.current;
    if (!overlay || !wordmark) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline();

    // [100ms] Sweep IN from left
    tl.fromTo(
      overlay,
      { clipPath: "inset(0 100% 0 0)", display: "flex" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.2, ease: "power2.inOut", display: "flex" },
      0.1
    )
    // [300ms] Flash wordmark
    .fromTo(
      wordmark,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
      0.3
    )
    .to(wordmark, { opacity: 0, duration: 0.1, ease: "power2.in" }, 0.5)
    // [400ms] Sweep OUT to right
    .to(
      overlay,
      { clipPath: "inset(0 0 0 100%)", duration: 0.2, ease: "power2.inOut" },
      0.4
    )
    .set(overlay, { display: "none" });

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] hidden items-center justify-center"
      style={{
        backgroundColor: "#03045E",
        clipPath: "inset(0 100% 0 0)",
        willChange: "clip-path",
      }}
    >
      <div
        ref={wordmarkRef}
        className="text-5xl font-black tracking-tighter uppercase opacity-0"
        style={{ color: "#00B4D8", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        CODEX
      </div>
    </div>
  );
}
