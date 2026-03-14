import { mockData } from "../data/mockData";

export default function Team() {
  const { hero, filters, members, cta } = mockData.team;

  return (
    <div className="bg-background-light min-h-screen font-display text-slate-900">
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="inline-block bg-primary text-white px-4 py-1 mb-4 font-bold uppercase tracking-widest text-xs border-2 border-slate-900">
            {hero.label}
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase leading-none tracking-tighter mb-6 font-display">
            {hero.titlePart1}<br /><span className="text-primary italic">{hero.titlePart2}</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl text-slate-700 border-l-8 border-primary pl-6">
            {hero.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`px-8 py-3 font-bold uppercase border-2 transition-colors duration-200 cursor-pointer ${
                index === 0 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member) => (
            <div 
              key={member.id} 
              className="group relative bg-white border-4 border-slate-900 p-4 transition-all brutalist-shadow-hover hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_#0707f2] hover:outline-3 hover:outline-primary"
            >
              <div className="aspect-square bg-slate-200 mb-6 overflow-hidden border-2 border-slate-900 relative">
                <img 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src={member.image} 
                  alt={member.name} 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-primary p-4 flex justify-center gap-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {member.socials.map((icon, i) => (
                    <a key={i} href="#" className="text-white hover:scale-125 transition-transform">
                      <span className="material-symbols-outlined">{icon}</span>
                    </a>
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
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 p-12 bg-primary text-white border-4 border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{cta.title}</h2>
            <p className="text-lg opacity-80">{cta.desc}</p>
          </div>
          <button className="bg-white text-primary font-black px-10 py-4 uppercase text-lg border-2 border-slate-900 hover:bg-slate-100 transition-colors cursor-pointer">
            {cta.btnText}
          </button>
        </div>
      </main>
    </div>
  );
}
