import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { mockData } from "../data/mockData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/animations/ScrollReveal";
import TiltCard from "../components/animations/TiltCard";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Card flip state
function TeamCard({ member }: { member: typeof mockData.team.members[0] }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d", willChange: "transform", position: "relative", height: "100%" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front face */}
        <TiltCard
          maxTilt={12}
          liftY={10}
          className="bg-white border-4 border-slate-900 p-4 h-full"
        >
          <div className="aspect-square bg-slate-200 mb-6 overflow-hidden border-2 border-slate-900 relative">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              src={member.image}
              alt={member.name}
            />
            {/* Social overlay slides up */}
            <div className="absolute bottom-0 left-0 right-0 bg-primary p-4 flex justify-center gap-6 opacity-0 translate-y-full hover:opacity-100 hover:translate-y-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              {member.socials.map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-white"
                  initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">{member.name}</h3>
              <p className="text-primary font-bold uppercase text-sm mt-1">{member.role}</p>
            </div>
            <div className="text-slate-400 font-mono text-xs">/{member.id}</div>
          </div>
          {!prefersReduced && (
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-400 uppercase">Click to flip</div>
          )}
        </TiltCard>

        {/* Back face */}
        <div
          className="absolute inset-0 bg-primary text-white border-4 border-slate-900 p-8 flex flex-col justify-center items-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="material-symbols-outlined text-6xl mb-4 text-[#00B4D8]">{member.socials[0]}</span>
          <h3 className="text-2xl font-black uppercase mb-2">{member.name}</h3>
          <p className="font-bold text-white/80 text-sm uppercase tracking-widest mb-6">{member.role}</p>
          <p className="text-white/60 text-sm mb-6">Engineering excellence since Day 1.</p>
          <div className="flex gap-4">
            {member.socials.map((icon, i) => (
              <a key={i} href="#" className="border-2 border-white p-2 hover:bg-white hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const { hero, filters, members, cta } = mockData.team;

  return (
    <div className="bg-background-light min-h-screen font-display text-slate-900">
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-16">

        {/* Hero */}
        <ScrollReveal className="mb-20">
          <div className="inline-block bg-primary text-white px-4 py-1 mb-4 font-bold uppercase tracking-widest text-xs border-2 border-slate-900">
            {hero.label}
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase leading-none tracking-tighter mb-6 font-display">
            {hero.titlePart1}<br /><span className="text-primary italic">{hero.titlePart2}</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl text-slate-700 border-l-8 border-primary pl-6">
            {hero.description}
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1} className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`px-8 py-3 font-bold uppercase border-2 transition-colors duration-200 cursor-pointer ${index === 0 ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white'}`}
            >
              {filter}
            </motion.button>
          ))}
        </ScrollReveal>

        {/* 3D Card Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member) => (
            <StaggerItem key={member.id}>
              <div className="group relative">
                <TeamCard member={member} />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal delay={0.1} className="mt-32">
          <motion.div
            className="p-12 bg-primary text-white border-4 border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow"
          >
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{cta.title}</h2>
              <p className="text-lg opacity-80">{cta.desc}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#f1f5f9" }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-primary font-black px-10 py-4 uppercase text-lg border-2 border-slate-900 cursor-pointer"
            >
              {cta.btnText}
            </motion.button>
          </motion.div>
        </ScrollReveal>
      </main>
    </div>
  );
}
