import React, { useEffect, useState } from "react";
import { History as HistoryIcon, Download, Trash2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function History({ data, trigger }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("qr-history");
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (data && trigger) {
            const newItem = {
                id: Date.now(),
                data: data,
                date: new Date().toLocaleString()
            };

            const updated = [newItem, ...history.slice(0, 9)];
            setHistory(updated);
            localStorage.setItem("qr-history", JSON.stringify(updated));
        }
    }, [trigger]);

    const deleteItem = (id) => {
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem("qr-history", JSON.stringify(updated));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("qr-history");
    };

    if (history.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto mt-12 space-y-6"
        >
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <HistoryIcon size={14} className="text-indigo-400" />
                    Recent Assets
                </div>
                <button
                    onClick={clearHistory}
                    className="text-[10px] font-bold text-gray-600 hover:text-red-400 uppercase tracking-tighter transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <AnimatePresence>
                    {history.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card p-4 rounded-3xl border-white/5 hover:border-indigo-500/20 transition-colors group"
                        >
                            <div className="flex flex-col gap-3">
                                <div className="truncate text-xs font-medium text-gray-300 pr-6">
                                    {item.data}
                                </div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                                    {item.date}
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => window.open(item.data.startsWith('http') ? item.data : `https://${item.data}`, '_blank')}
                                            className="p-1 px-2 rounded-lg bg-gray-950/40 text-gray-400 hover:text-indigo-400 transition-colors"
                                            title="Open Link"
                                        >
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-1 px-2 rounded-lg bg-gray-950/40 text-gray-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default History;
