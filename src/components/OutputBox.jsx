import React, { useRef, useState, useEffect } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Download, RefreshCw, FileImage, FileCode, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

function OutputBox({ data, size, bgColor, fgColor, level, logo, isGenerating }) {
  const [downloading, setDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const downloadPNG = () => {
    const canvas = document.getElementById("qr-canvas");
    if (!canvas) return;

    setDownloading(true);
    const pngUrl = canvas.toDataURL("image/png", 1.0);
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-studio-elite-${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      setDownloading(false);
      triggerSuccess();
    }, 800);
  };

  const downloadSVG = () => {
    const svg = document.getElementById("qr-svg");
    if (!svg) return;

    setDownloading(true);
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `qr-studio-elite-${Date.now()}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      setDownloading(false);
      triggerSuccess();
    }, 800);
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card border-glow p-10 md:p-14 rounded-[3.5rem] flex flex-col items-center gap-10 relative overflow-hidden group"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/15 rounded-full blur-[90px] group-hover:bg-indigo-600/25 transition-all duration-1000" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/15 rounded-full blur-[90px] group-hover:bg-purple-600/25 transition-all duration-1000" />

      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center h-[280px] w-[280px] bg-gray-950/30 rounded-[3rem] border border-white/5 backdrop-blur-xl"
            >
              <div className="relative">
                <RefreshCw className="animate-spin text-indigo-400 mb-4" size={48} />
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
              </div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Processing Asset</span>
            </motion.div>
          ) : (
            <motion.div
              key="qr"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="p-8 bg-white rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative z-10 group/qr active:scale-95 transition-transform overflow-hidden"
            >
              <div className="hidden">
                <QRCodeSVG
                  id="qr-svg"
                  value={data}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={level}
                  includeMargin={true}
                  imageSettings={logo ? { src: logo, height: size * 0.22, width: size * 0.22, excavate: true } : undefined}
                />
              </div>
              <QRCodeCanvas
                id="qr-canvas"
                value={data}
                size={256}
                bgColor={bgColor}
                fgColor={fgColor}
                level={level}
                includeMargin={true}
                imageSettings={logo ? {
                  src: logo,
                  height: 56,
                  width: 56,
                  excavate: true,
                } : undefined}
              />
              <div className="absolute inset-0 glow-sweep pointer-events-none opacity-40" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-indigo-500/15 border border-indigo-500/30 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-2xl backdrop-blur-md"
            >
              <CheckCircle2 size={14} className="text-indigo-400" />
              Manifest Compiled
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full space-y-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className="text-center space-y-3">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Verified for Instant Capture</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={downloadPNG}
            disabled={downloading || isGenerating}
            className="btn-premium flex items-center justify-center gap-3 text-xs py-5 rounded-[1.5rem] relative overflow-hidden group/btn"
          >
            <FileImage size={20} />
            <span>EXPORT PNG</span>
            {downloading && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
          </button>
          <button
            onClick={downloadSVG}
            disabled={downloading || isGenerating}
            className="px-6 py-5 bg-gray-950/50 hover:bg-gray-950/80 border border-white/5 hover:border-indigo-500/30 text-white rounded-[1.5rem] flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all active:scale-95 group/svg"
          >
            <FileCode size={20} className="text-indigo-400 group-hover/svg:scale-110 transition-transform" />
            <span>VECTOR SVG</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default OutputBox;
