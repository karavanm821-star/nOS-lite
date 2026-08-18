import React, { useState, useEffect } from 'react';

export default function BootScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#f3f4f6] flex flex-col items-center justify-center text-slate-800 font-sans z-50">
      <div className="flex flex-col items-center mb-12 animate-pulse">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">NeuraBook</h1>
        <p className="text-xs font-semibold text-slate-500 mt-2 tracking-[0.2em] uppercase">powered by nOS Lite</p>
      </div>
      
      <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-blue-500 transition-all duration-200 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <div className="mt-4 text-[10px] font-bold text-slate-400 font-mono">
        LOADING KERNEL... {Math.min(100, progress)}%
      </div>
    </div>
  );
}
