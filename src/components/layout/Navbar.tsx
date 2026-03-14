import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-slate-900 bg-background-light px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1">
            <span className="material-symbols-outlined text-white text-3xl">terminal</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">CODEX ITER</span>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link className="font-bold hover:text-primary transition-colors text-slate-900" to="/">Home</Link>
          <Link className="font-bold hover:text-primary transition-colors text-slate-900" to="/blogs">Blogs</Link>
          <Link className="font-bold hover:text-primary transition-colors text-slate-900" to="/events">Events</Link>
          <Link className="font-bold hover:text-primary transition-colors text-slate-900" to="/team">Team</Link>
          <button className="bg-primary text-white px-6 py-2 font-bold brutalist-shadow border-2 border-slate-900 transition-all hover:bg-white hover:text-slate-900">
            Join
          </button>
        </div>
        <button 
          className="md:hidden flex items-center justify-center cursor-pointer" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-slate-900 text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t-4 border-slate-900 flex flex-col gap-4">
          <Link onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-primary transition-colors text-slate-900 px-2 py-1" to="/">Home</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-primary transition-colors text-slate-900 px-2 py-1" to="/blogs">Blogs</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-primary transition-colors text-slate-900 px-2 py-1" to="/events">Events</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-primary transition-colors text-slate-900 px-2 py-1" to="/team">Team</Link>
          <button className="bg-primary text-white px-6 py-3 font-bold brutalist-shadow border-2 border-slate-900 transition-all hover:bg-white hover:text-slate-900 w-full mt-2 cursor-pointer">
            Join
          </button>
        </div>
      )}
    </nav>
  );
}
