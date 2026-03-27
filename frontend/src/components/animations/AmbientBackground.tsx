import { useEffect, useRef } from "react";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    let initialized = false;

    const init = () => {
      if (initialized) return;
      initialized = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      const DURATION = 30_000; // 30 seconds loop
      let startTime: number | null = null;

      const draw = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = ((ts - startTime) % DURATION) / DURATION;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Convergence grid lines
        const LINES = 14;
        ctx.strokeStyle = "rgba(3, 4, 94, 0.06)";
        ctx.lineWidth = 1;

        for (let i = 0; i < LINES; i++) {
          const angle = (i / LINES) * Math.PI * 2;
          const far = Math.max(canvas.width, canvas.height) * 1.5;

          // Slowly rotate the grid
          const rotatedAngle = angle + progress * Math.PI * 2;

          const x1 = cx + Math.cos(rotatedAngle) * far;
          const y1 = cy + Math.sin(rotatedAngle) * far;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }

        // Concentric ripple rings
        const ringCount = 6;
        for (let i = 0; i < ringCount; i++) {
          const phase = (progress + i / ringCount) % 1;
          const r = phase * Math.max(canvas.width, canvas.height) * 0.75;
          const alpha = (1 - phase) * 0.05;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,180,216,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        animRef.current = requestAnimationFrame(draw);
      };

      animRef.current = requestAnimationFrame(draw);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animRef.current);
      };
    };

    // Lazy initialize after 2s idle or first user interaction
    let cleanupFn: (() => void) | undefined;
    const timer = setTimeout(() => { cleanupFn = init() ?? undefined; }, 2000);
    const onInteract = () => { clearTimeout(timer); cleanupFn = init() ?? undefined; };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
      cleanupFn?.();
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
