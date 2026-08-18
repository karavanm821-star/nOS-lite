import React, { useState } from 'react';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (n: string) => {
    if (display === '0') setDisplay(n);
    else setDisplay(display + n);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEq = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="h-full flex flex-col p-5 bg-black/20 text-white select-none">
      <div className="bg-black/40 p-4 rounded-2xl flex flex-col items-end mb-5 border border-white/10 shadow-inner">
        <span className="text-slate-400 text-sm font-medium min-h-[20px]">{equation}</span>
        <span className="text-4xl font-light tracking-tight">{display}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-3 flex-1">
        <button onClick={handleClear} className="col-span-2 bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 border border-rose-500/30 rounded-xl transition-all text-sm font-bold">C</button>
        <button onClick={() => setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)} className="bg-white/10 text-slate-200 hover:bg-white/20 border border-white/5 rounded-xl transition-all text-sm font-semibold">+/-</button>
        <button onClick={() => handleOp('/')} className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-xl transition-all text-sm font-semibold">÷</button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 rounded-xl transition-all font-semibold text-lg">{n}</button>)}
        <button onClick={() => handleOp('*')} className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-xl transition-all text-sm font-semibold">×</button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 rounded-xl transition-all font-semibold text-lg">{n}</button>)}
        <button onClick={() => handleOp('-')} className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-xl transition-all text-sm font-semibold">-</button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNum(String(n))} className="bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 rounded-xl transition-all font-semibold text-lg">{n}</button>)}
        <button onClick={() => handleOp('+')} className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-xl transition-all text-sm font-semibold">+</button>
        
        <button onClick={() => handleNum('0')} className="col-span-2 bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 rounded-xl transition-all font-semibold text-lg">0</button>
        <button onClick={() => handleNum('.')} className="bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 rounded-xl transition-all font-semibold text-lg">.</button>
        <button onClick={handleEq} className="bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(79,70,229,0.4)]">=</button>
      </div>
    </div>
  );
}
