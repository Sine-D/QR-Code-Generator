import React, { useState } from "react";
import { Palette, Maximize, ShieldCheck, Image as ImageIcon, Settings2, Sparkles, Diamond } from "lucide-react";

function ExtraOptions({
  bgColor, setBgColor,
  fgColor, setFgColor,
  size, setSize,
  level, setLevel,
  setLogo
}) {
  const [activeTab, setActiveTab] = useState("content");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: "content", label: "Core", icon: Settings2 },
    { id: "style", label: "Aura", icon: Palette },
    { id: "logo", label: "Brand", icon: ImageIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex bg-gray-950/60 p-1.5 rounded-[1.5rem] border border-white/5 relative group/tabs shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all relative z-10 ${activeTab === tab.id
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-400'
              }`}
          >
            <tab.icon size={14} className={activeTab === tab.id ? 'text-indigo-400' : ''} />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl -z-10 shadow-[0_0_20px_rgba(99,102,241,0.1)]" />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[240px]">
        {activeTab === "content" && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Size */}
            <div className="space-y-5">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <Maximize size={12} /> Master Resolution
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="128" max="1024" step="64"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-900 rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[9px] text-gray-700 font-black uppercase tracking-widest">
                  <span>Standard ({size}px)</span>
                  <span className="text-indigo-500/50">Lossless Vector</span>
                </div>
              </div>
            </div>

            {/* Precision / Level */}
            <div className="space-y-5">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <ShieldCheck size={12} /> Redundancy Tier
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['L', 'M', 'Q', 'H'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`py-3 text-[10px] font-black rounded-2xl transition-all border ${level === l
                        ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                        : 'bg-gray-950/30 border-white/5 text-gray-600 hover:text-gray-400 hover:border-white/10'
                      }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Colors */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] block">Data Aura</span>
                <div className="relative group/picker">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full h-16 bg-gray-950/40 cursor-pointer rounded-[1.5rem] border border-white/5 p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: fgColor }} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] block">Canvas Aura</span>
                <div className="relative group/picker">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-16 bg-gray-950/40 cursor-pointer rounded-[1.5rem] border border-white/5 p-2"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full border border-white/10" style={{ backgroundColor: bgColor }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-[1.5rem] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden">
              <div className="flex gap-3 relative z-10">
                <Sparkles size={14} className="text-indigo-400 shrink-0" />
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
                  <span className="text-indigo-400">Pro Tip:</span> Elite engines work best with high-luminance contrast profiles.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>
          </div>
        )}

        {activeTab === "logo" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-5">
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
                <ImageIcon size={12} /> Asset Injection
              </label>
              <div className="relative group h-44">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex flex-col items-center justify-center w-full h-full bg-gray-950/20 border border-white/5 border-dashed rounded-[2.5rem] cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group shadow-inner"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.05)]">
                    <ImageIcon className="text-indigo-400" size={28} />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 group-hover:text-indigo-300 uppercase tracking-[0.2em]">Upload Brand Asset</span>
                  <span className="text-[9px] text-gray-700 mt-2 font-bold uppercase tracking-tighter">AI, PNG, SVG Supported</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExtraOptions;
