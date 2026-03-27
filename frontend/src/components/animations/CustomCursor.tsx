import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { stiffness: 300, damping: 28 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const particleId = useRef(0);

  useEffect(() => {
    // Only desktop
    if (prefersReduced || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 5);
      cursorY.set(e.clientY - 5);
    };

    const onEnter = (e: Event) => {
      const el = e.target as Element;
      if (el.matches('a,button,[role="button"],[tabindex],input,select,textarea,label')) {
        setIsHovering(true);
      }
    };
    const onLeave = (e: Event) => {
      const el = e.target as Element;
      if (el.matches('a,button,[role="button"],[tabindex],input,select,textarea,label')) {
        setIsHovering(false);
      }
    };

    const onClick = (e: MouseEvent) => {
      const id = ++particleId.current;
      const x = e.clientX;
      const y = e.clientY;
      setParticles((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== id)), 600);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, [cursorX, cursorY]);

  if (prefersReduced || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)) return null;

  const ANGLES = [45, 135, 225, 315];

  return (
    <>
      {/* Main cursor dot / ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={
            isHovering
              ? { width: 40, height: 40, borderRadius: "50%", backgroundColor: "transparent", border: "2px solid #00B4D8", top: -15, left: -15 }
              : { width: 10, height: 10, borderRadius: "50%", backgroundColor: "#00B4D8", border: "none", top: 0, left: 0 }
          }
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ position: "absolute" }}
        />
      </motion.div>

      {/* Click burst particles */}
      {particles.map((p) =>
        ANGLES.map((angle, i) => (
          <motion.div
            key={`${p.id}-${i}`}
            className="fixed pointer-events-none z-[99999] w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#00B4D8", left: p.x - 3, top: p.y - 3 }}
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              x: Math.round(Math.cos((angle * Math.PI) / 180) * 24),
              y: Math.round(Math.sin((angle * Math.PI) / 180) * 24),
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))
      )}
    </>
  );
}
