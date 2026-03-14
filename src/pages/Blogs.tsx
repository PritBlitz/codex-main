import { motion } from "framer-motion";
import { mockData } from "../data/mockData";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/animations/ScrollReveal";
import TiltCard from "../components/animations/TiltCard";

export default function Blogs() {
  const { hero, categories, posts } = mockData.blogs;

  return (
    <div className="bg-white min-h-screen">
      <main className="px-6 md:px-20 py-12 max-w-7xl mx-auto w-full">

        {/* Header Section */}
        <ScrollReveal className="mb-16">
          <div className="inline-block border-2 border-slate-900 brutalist-shadow px-4 py-1 mb-4" style={{ backgroundColor: '#00B4D8' }}>
            <span className="text-xs font-black uppercase text-slate-900">{hero.version}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-slate-900 font-display">
            {hero.titlePart1}<br /><span className="text-primary italic">{hero.titlePart2}</span>
          </h1>
          <p className="text-xl max-w-2xl font-medium border-l-4 border-primary pl-6 py-2 text-slate-800">
            {hero.description}
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <ScrollReveal delay={0.1} className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              className={`px-6 py-2 border-2 border-slate-900 font-bold uppercase text-sm tracking-widest transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-[#00B4D8]'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </ScrollReveal>

        {/* Blog Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <StaggerItem key={i}>
              <TiltCard
                maxTilt={8}
                liftY={8}
                className="bg-white border-2 border-slate-900 flex flex-col overflow-hidden group cursor-pointer h-full"
              >
                <div className="aspect-video w-full bg-slate-200 border-b-2 border-slate-900 overflow-hidden relative shrink-0">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    src={post.image}
                    alt={post.title}
                  />
                  <div
                    className={`absolute top-4 left-4 text-[10px] font-bold px-2 py-1 uppercase border-2 ${
                      ['Security', 'Wasm', 'React'].includes(post.category)
                        ? 'bg-primary text-white border-slate-900'
                        : post.category === 'Frontend' ? 'bg-[#00B4D8] text-slate-900 border-slate-900' : 'bg-slate-900 text-white border-white'
                    }`}
                  >
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-sm" style={{ color: '#00B4D8' }}>schedule</span>
                    <span className="text-[10px] font-bold uppercase text-slate-500">{post.readTime} • {post.date}</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase leading-tight mb-4 group-hover:text-primary transition-colors font-display line-clamp-3">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-8 flex-1 line-clamp-3 font-medium">{post.desc}</p>
                  <div className="flex items-center justify-between border-t-2 border-slate-900 pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-200">
                        <img className="w-full h-full object-cover" src={post.author.avatar} alt={post.author.name} />
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-900">{post.author.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-900">arrow_outward</span>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Pagination */}
        <ScrollReveal delay={0.2} className="mt-20 flex justify-center items-center gap-4">
          {['chevron_left', null, 'chevron_right'].map((icon, i) =>
            icon ? (
              <motion.button
                key={i}
                whileHover={{ scale: 1.08, backgroundColor: "#00B4D8" }}
                whileTap={{ scale: 0.93 }}
                className="size-12 border-2 border-slate-900 bg-white flex items-center justify-center text-slate-900 cursor-pointer"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </motion.button>
            ) : (
              <div key={i} className="flex items-center gap-2">
                {["01", "02", "03", "...", "12"].map((p) => (
                  <span key={p} className={`px-4 py-2 border-2 font-bold cursor-pointer transition-colors ${p === "01" ? 'border-slate-900 bg-primary text-white' : 'border-transparent hover:border-slate-300'}`}>{p}</span>
                ))}
              </div>
            )
          )}
        </ScrollReveal>
      </main>
    </div>
  );
}
