import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  liftY?: number;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 8,
  liftY = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 22 };
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]), springConfig);
  const translateY = useSpring(0, springConfig);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x * 2);
    rawY.set(y * 2);
    shineX.set((x + 0.5) * 100);
    shineY.set((y + 0.5) * 100);
    translateY.set(-liftY);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    translateY.set(0);
    shineX.set(50);
    shineY.set(50);
  }

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: translateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
        position: "relative",
        isolation: "isolate",
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}

      {/* Specular highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useTransform(
            [shineX, shineY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(0,180,216,0.12), transparent 60%)`
          ),
          zIndex: 10,
        }}
      />
    </motion.div>
  );
}
