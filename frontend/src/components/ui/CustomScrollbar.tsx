import { useEffect, useRef } from "react";

export function CustomScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const thumbHeightRef = useRef(60);
  const rafId = useRef<number | null>(null);

  const updatePosition = () => {
    if (!thumbRef.current) return;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 0) {
      thumbRef.current.style.opacity = "0";
      return;
    }

    // Dynamic height: thin and a little long (min 60px, max 120px)
    const heightRatio = clientHeight / scrollHeight;
    const calculatedHeight = Math.min(Math.max(heightRatio * clientHeight, 60), 120);
    thumbHeightRef.current = calculatedHeight;
    thumbRef.current.style.height = `${calculatedHeight}px`;
    thumbRef.current.style.opacity = "1";

    const currentScroll = window.scrollY;
    const maxThumbTop = clientHeight - calculatedHeight - 16;
    const calculatedTop = (currentScroll / maxScroll) * maxThumbTop + 8;

    thumbRef.current.style.transform = `translate3d(0, ${calculatedTop}px, 0)`;
  };

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePosition);
    };

    const onResize = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = window.scrollY;
    document.body.style.userSelect = "none";

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = moveEvent.clientY - startY.current;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTop = clientHeight - thumbHeightRef.current - 16;

      const scrollDelta = (deltaY / Math.max(maxThumbTop, 1)) * maxScroll;
      const targetScroll = Math.max(0, Math.min(startScrollTop.current + scrollDelta, maxScroll));

      window.scrollTo({
        top: targetScroll,
        behavior: "instant",
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging.current) return;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - clientHeight;
    const clickRatio = e.clientY / clientHeight;
    window.scrollTo({
      top: clickRatio * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className="fixed inset-y-0 right-0 z-[9999] w-3.5 cursor-pointer group select-none"
    >
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-1 top-0 w-1.5 rounded-full bg-slate-500/35 hover:bg-slate-700/65 hover:w-2 active:bg-blue-600/80 transition-[width,background-color] duration-150 cursor-grab active:cursor-grabbing backdrop-blur-[1px]"
        style={{
          willChange: "transform, height",
        }}
      />
    </div>
  );
}
