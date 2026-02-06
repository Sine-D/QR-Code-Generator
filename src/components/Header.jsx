import React from "react";
import { Sparkles } from "lucide-react";

function Header() {
  return (
    <header className="text-center space-y-4 animate-float-gentle">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-2">
        <Sparkles size={12} />
        <span>Next-Gen Engine</span>
      </div>
      <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
        <span className="gradient-text-premium">QR</span> Studio
      </h1>
      <p className="text-gray-400 font-medium text-lg max-w-lg mx-auto leading-relaxed">
        Crafting high-fidelity, scan-optimized QR codes with designer precision.
      </p>
    </header>
  );
}

export default Header;
