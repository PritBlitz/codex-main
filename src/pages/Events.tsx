import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { mockData } from "../data/mockData";
import { ScrollReveal } from "../components/animations/ScrollReveal";
import TiltCard from "../components/animations/TiltCard";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Radial pulse node — sits on the shared left-5 axis
function PulseNode() {
  if (prefersReduced) return null;
  return (
    // Positioned relative to each event's .relative wrapper
    // left-5 = 20px matches the line's left-5 anchor; -translate-x-1/2 centres the dot on the line
    <div className="absolute -left-9 top-8 -translate-x-1/2 hidden md:block z-20">
      <span className="w-3 h-3 bg-primary rounded-full relative block">
        <motion.span
          className="absolute inset-[-4px] rounded-full border-2"
          style={{ borderColor: "#00B4D8" }}
          animate={{ scale: [1, 2.5], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </span>
    </div>
  );
}


export default function Events() {
  const { hero, filters, items } = mockData.events;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-background-light text-primary min-h-screen">
      <main className="flex-1 px-6 py-12 md:px-20 max-w-7xl mx-auto w-full">

        {/* Header */}
        <ScrollReveal className="mb-16">
          <div className="inline-block px-4 py-1 text-white text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ backgroundColor: '#00B4D8' }}>
            {hero.label}
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter mb-6 font-display">
            {hero.titlePart1}<br /><span className="text-white bg-primary px-2">{hero.titlePart2}</span>
          </h2>
          <p className="max-w-xl text-lg font-bold leading-tight border-l-4 border-primary pl-4 uppercase">
            {hero.description}
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.1} className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`px-8 py-2 font-black uppercase text-sm border-2 border-primary transition-colors duration-200 cursor-pointer ${index === 0 ? 'bg-primary text-white' : 'bg-transparent text-primary hover:bg-primary/10'}`}
            >
              {filter}
            </motion.button>
          ))}
        </ScrollReveal>

        {/* Timeline — single column, line + dots share left-5 axis */}
        <div ref={containerRef} className="relative">
          {/* Scroll-driven dashed vertical line at left: 20px */}
          <div className="hidden md:block absolute left-5 top-0 bottom-0 w-px overflow-hidden">
            <motion.div
              className="w-full h-full origin-top"
              style={{
                scaleY,
                background: 'repeating-linear-gradient(to bottom, #03045E, #03045E 10px, transparent 10px, transparent 20px)',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 md:pl-14">
            {items.map((item, i) => {
              const cardRef = useRef<HTMLDivElement>(null);
              const inView = useInView(cardRef, { once: true, margin: "0px 0px -10% 0px" });
              const fromLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  ref={cardRef}
                  initial={prefersReduced ? {} : { opacity: 0, x: fromLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <PulseNode />
                  <TiltCard
                    maxTilt={6}
                    liftY={6}
                    className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-primary bg-white brutalist-shadow hover:shadow-[12px_12px_0px_0px_#03045E] cursor-pointer"
                  >
                    <div className="h-64 lg:h-full overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-primary relative shrink-0">
                      <div className={`absolute inset-0 mix-blend-multiply z-10 ${i % 2 === 0 ? 'bg-primary/20' : 'bg-[#00B4D8]/20'}`} />
                      <img
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                        src={item.image}
                        alt={item.title}
                      />
                      <div className="absolute top-4 left-4 z-20 bg-primary text-white px-3 py-1 font-bold text-xs">ID: {item.id}</div>
                    </div>
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-col">
                            <span className="font-black text-sm uppercase" style={{ color: '#00B4D8' }}>{item.date}</span>
                            <span className="text-primary/60 font-bold text-xs uppercase tracking-widest">{item.time}</span>
                          </div>
                          <span className="material-symbols-outlined" style={{ color: '#00B4D8' }}>{item.icon}</span>
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tight mb-4 font-display group-hover:text-[#00B4D8] transition-colors">{item.title}</h3>
                        <p className="text-primary font-medium leading-snug mb-8">{item.desc}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: "#00B4D8" }}
                          whileTap={{ scale: 0.97 }}
                          className="flex-1 bg-primary text-white py-4 px-6 font-black uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Register Now
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: "#03045E", color: "#ffffff" }}
                          whileTap={{ scale: 0.97 }}
                          className="p-4 border-4 border-primary transition-all cursor-pointer flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined block">share</span>
                        </motion.button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}

            <motion.div
              className="flex flex-col items-center justify-center border-4 border-dashed border-primary/40 py-12 bg-white/50"
              initial={prefersReduced ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="material-symbols-outlined text-primary/40 text-4xl mb-2">more_horiz</span>
              <p className="font-black uppercase tracking-[0.2em] text-primary/40">End of Current Iteration Cycle</p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
