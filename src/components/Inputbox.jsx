import React from "react";
import { ArrowRight, Clipboard } from "lucide-react";

function InputBox({ setTemp, handleClick, initialValue }) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTemp(text);
        const input = document.getElementById("qr-input");
        if (input) input.value = text;
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-1 w-full">
        <input
          id="qr-input"
          type="text"
          defaultValue={initialValue}
          onChange={(e) => setTemp(e.target.value)}
          placeholder="Enter URL or text..."
          className="input-premium w-full h-14 pl-5 pr-12 text-lg"
        />
        <button
          onClick={handlePaste}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-colors"
          title="Paste from clipboard"
        >
          <Clipboard size={20} />
        </button>
      </div>
      <button
        className="btn-premium h-14 w-full sm:w-auto flex items-center justify-center gap-3 group"
        onClick={handleClick}
      >
        <span>Generate</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export default InputBox;
