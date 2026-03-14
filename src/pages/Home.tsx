import { mockData } from "../data/mockData";

export default function Home() {
  const { hero, about, domains, updates } = mockData.home;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b-4 border-slate-900 grid-pattern bg-background-light">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          <div className="relative z-10">
            <div className="inline-block bg-primary text-white px-4 py-1 font-bold mb-6 text-sm uppercase tracking-widest">{hero.established}</div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-slate-900 mb-6 font-display">
              {hero.title} <br />
              <span className="text-primary italic">{hero.subtitle1}</span> <br />
              {hero.subtitle2}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-800 mb-10 max-w-lg border-l-4 border-primary pl-6">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 text-lg font-black brutalist-shadow-hover border-2 border-slate-900 transition-all font-display tracking-widest">
                {hero.exploreBtn}
              </button>
              <button className="bg-white text-slate-900 px-8 py-4 text-lg font-black brutalist-shadow-hover border-2 border-slate-900 transition-all font-display tracking-widest">
                {hero.stackBtn}
              </button>
            </div>
          </div>
          <div className="relative h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 border-4 border-slate-900 brutalist-shadow rotate-3"></div>
            <div className="absolute inset-0 bg-white border-4 border-slate-900 brutalist-shadow -rotate-2 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 grid-pattern"></div>
              {/* Cinematic 3D Placeholder Concept */}
              <div className="relative z-10 text-center">
                <span className="material-symbols-outlined text-[160px] text-primary leading-none">deployed_code</span>
                <div className="mt-4 font-mono text-slate-900 font-bold bg-background-light p-2 tracking-widest text-sm">
                  {hero.loadingText}
                </div>
              </div>
              {/* Floating Code Fragments */}
              <div className="absolute top-10 left-10 bg-slate-900 text-white p-2 font-mono text-xs rotate-12">{hero.codeFrag1}</div>
              <div className="absolute bottom-20 right-10 bg-primary text-white p-2 font-mono text-xs -rotate-6">{hero.codeFrag2}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white border-b-4 border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-5xl font-black text-slate-900 mb-8 uppercase font-display leading-[1.1]">
                {about.titlePart1} <br />
                {about.titlePart2} <span className="text-primary underline">{about.titleHighlight}</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-sans">
                <p>{about.desc1}</p>
                <p>{about.desc2}</p>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {about.stats.map((stat, i) => (
                <div
                  key={i}
                  className={`p-8 border-4 border-slate-900 brutalist-shadow ${stat.span === 2 ? 'bg-slate-900 text-white col-span-2' :
                    i === 0 ? 'bg-background-light' : 'bg-primary text-white'
                    }`}
                >
                  <div className={`text-5xl font-black mb-2 font-display ${i === 0 ? 'text-primary' : ''}`}>{stat.value}</div>
                  <div className={`font-bold uppercase tracking-wide text-sm ${i === 0 ? 'text-slate-900' : ''}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-24 bg-background-light border-b-4 border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-5xl font-black text-slate-900 uppercase leading-none font-display">
                What We <br /><span className="text-primary">Master</span>
              </h2>
            </div>
            <div className="hidden md:block text-right font-mono font-bold text-slate-900 opacity-60">
              // TECHNICAL SPECIALIZATIONS
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, i) => (
              <div key={i} className="bg-white border-4 border-slate-900 p-8 hover:bg-primary hover:text-white transition-colors group cursor-pointer">
                <span className="material-symbols-outlined text-5xl mb-6 text-primary group-hover:text-white transition-colors duration-300">
                  {domain.icon}
                </span>
                <h3 className="text-2xl font-black mb-4 uppercase font-display">{domain.title}</h3>
                <p className="font-medium opacity-80 text-sm leading-relaxed">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-24 bg-white overflow-hidden border-b-4 border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-slate-900 mb-16 text-center uppercase font-display">
            Pulse of the <span className="bg-primary text-white px-4 inline-block transform -rotate-2">Club</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {updates.map((post, i) => (
              <div key={i} className="group border-4 border-slate-900 brutalist-shadow-hover transition-all flex flex-col cursor-pointer bg-white">
                <div className="h-64 bg-slate-200 overflow-hidden relative border-b-4 border-slate-900 shrink-0">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    src={post.image}
                  />
                  <div className={`absolute top-4 left-4 text-white px-3 py-1 font-bold text-sm tracking-wider uppercase ${post.type === 'BLOG' ? 'bg-primary' : 'bg-slate-900'}`}>
                    {post.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="text-sm font-bold text-primary mb-2 tracking-wide">{post.date}</div>
                  <h4 className="text-2xl font-black mb-4 leading-tight group-hover:text-primary transition-colors font-display line-clamp-3">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 mb-6 font-medium text-sm leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 font-black uppercase text-sm border-b-2 border-slate-900 pb-1 group-hover:text-primary group-hover:border-primary transition-colors">
                      {post.cta} <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-primary py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase leading-none italic font-display">Are You Next?</h2>
          <p className="text-2xl font-bold text-white/90 mb-12 max-w-2xl mx-auto">
            Join the league of exceptional developers and help us build the next decade of engineering culture.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-white text-slate-900 px-12 py-6 text-xl md:text-2xl font-black brutalist-shadow-hover border-4 border-slate-900 transition-all w-full md:w-auto font-display tracking-widest uppercase">
              APPLY FOR MEMBERSHIP
            </button>
            <button className="bg-slate-900 text-white px-12 py-6 text-xl md:text-2xl font-black brutalist-shadow-hover border-4 border-slate-900 transition-all w-full md:w-auto font-display tracking-widest uppercase">
              PARTNER WITH US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
