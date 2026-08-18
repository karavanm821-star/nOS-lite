import React from 'react';

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-200">
      <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-indigo-500/30">
        <h1 className="text-4xl font-bold text-indigo-400 tracking-tighter">nW</h1>
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-1">NeuraBook OS</h2>
      <p className="text-sm font-mono text-indigo-300 mb-6">Version 1.1.0-NEO (Glass Edition)</p>
      
      <p className="text-sm text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
        Developed by <strong className="text-indigo-400">NeuraWix</strong>.<br/><br/>
        A lightweight operating system built on modern web technologies, utilizing Neo-Glass design patterns for stunning performance on minimal hardware.
      </p>
      
      <div className="text-xs font-medium text-slate-600">
        © 2026 NeuraWix Corp. All rights reserved.
      </div>
    </div>
  );
}
