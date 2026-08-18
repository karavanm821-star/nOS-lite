import React, { useState } from 'react';

export default function SetupScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && name.trim()) {
      localStorage.setItem('nos_setup_complete', 'true');
      localStorage.setItem('nos_username', name.trim());
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center text-slate-200 font-sans z-40 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden relative z-10">
        <div className="h-12 bg-white/5 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-3 text-xs font-bold text-slate-400 uppercase tracking-widest">nOS Lite Setup</span>
          </div>
          <div className="text-slate-500 text-xs font-mono">v1.1-NEO</div>
        </div>

        <div className="p-10 flex flex-col">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-8 text-center">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-indigo-400">nW</span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome to NeuraBook</h1>
                <p className="text-slate-400">The lightweight, neo-glass OS for peak efficiency</p>
              </div>
              
              <div className="space-y-4 mb-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/30">⚡</div>
                  <div>
                    <div className="text-sm font-bold text-slate-200">Hyper-Optimized Mode</div>
                    <div className="text-xs text-slate-400">Hardware acceleration enabled</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white mb-2">Create your profile</h2>
              <p className="text-slate-400 mb-8 text-sm text-center">Who is using this device?</p>
              
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-sm bg-black/40 border border-white/10 px-5 py-4 mb-10 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition-all text-white placeholder-slate-500 text-center text-lg"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
              
              <div className="flex justify-between items-center w-full max-w-sm">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-white/5 text-slate-300 rounded-xl text-sm font-semibold border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!name.trim()}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  Finish & Explore
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
