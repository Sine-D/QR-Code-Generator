import React from "react";
import { Sparkles, Wind, Moon, Sun, Zap, Diamond } from "lucide-react";

const PRESETS = [
    {
        id: "ocean",
        name: "Deep Ocean",
        icon: Wind,
        fg: "#6366f1",
        bg: "#ffffff",
        description: "Elegant indigo on crisp white"
    },
    {
        id: "sunset",
        name: "Cyber Sunset",
        icon: Sun,
        fg: "#f43f5e",
        bg: "#ffffff",
        description: "Vibrant rose for high visibility"
    },
    {
        id: "midnight",
        name: "Dark Knight",
        icon: Moon,
        fg: "#ffffff",
        bg: "#030712",
        description: "Sleek inverted dark mode"
    },
    {
        id: "emerald",
        name: "Bio Hack",
        icon: Zap,
        fg: "#10b981",
        bg: "#ffffff",
        description: "Fresh emerald green tech look"
    }
];

function Presets({ onSelect, currentFg }) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="flex items-center gap-2 px-1">
                <Diamond size={12} className="text-indigo-400 fill-indigo-400/20" />
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                    Elite Presets
                </label>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {PRESETS.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => onSelect(p.fg, p.bg)}
                        className={`flex items-center gap-4 p-4 rounded-[2rem] border transition-all text-left group relative overflow-hidden ${currentFg === p.fg
                                ? 'bg-indigo-600/10 border-indigo-500/30'
                                : 'bg-gray-950/20 border-white/5 hover:border-white/10 hover:bg-gray-950/40'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${currentFg === p.fg ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-gray-900 text-gray-400'
                            }`}>
                            <p.icon size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-white uppercase tracking-wider">{p.name}</span>
                            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tight group-hover:text-gray-400">{p.description}</span>
                        </div>
                        {currentFg === p.fg && (
                            <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Presets;
