import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InputBox from "./components/Inputbox";
import ExtraOptions from "./components/ExtraOptions";
import OutputBox from "./components/OutputBox";
import Presets from "./components/Presets";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [data, setData] = useState("https://google.com");
  const [size, setSize] = useState(512);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#6366f1");
  const [level, setLevel] = useState("M");
  const [logo, setLogo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 800);
  };

  const applyPreset = (fg, bg) => {
    setFgColor(fg);
    setBgColor(bg);
    handleGenerate();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen py-10 md:py-20 px-4 flex flex-col items-center">
      <div className="mesh-gradient" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl space-y-16"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <main className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 md:gap-12 items-start">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass-card border-glow p-6 md:p-10 rounded-[2.5rem] space-y-8 shadow-2xl">
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Destination</label>
                  <InputBox setTemp={setData} handleClick={handleGenerate} initialValue={data} />
                </div>

                <div className="h-px bg-white/5 w-full" />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
                  <ExtraOptions
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                    fgColor={fgColor}
                    setFgColor={setFgColor}
                    size={size}
                    setSize={setSize}
                    level={level}
                    setLevel={setLevel}
                    setLogo={setLogo}
                  />
                  <Presets onSelect={applyPreset} currentFg={fgColor} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center sticky top-10"
          >
            <OutputBox
              data={data}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={level}
              logo={logo}
              isGenerating={isGenerating}
            />
          </motion.div>
        </main>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 py-10 border-t border-white/5 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-gray-600 text-[10px] font-bold uppercase tracking-widest"
      >
        <span>&copy; 2026 QR Studio Elite</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-indigo-400 transition-colors">Elite Documentation</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">API Access</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
