import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';

export default function SysMonApp() {
  const [cpu, setCpu] = useState(15);
  const [ram, setRam] = useState(42);
  const [net, setNet] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30) + 10);
      setRam(Math.floor(Math.random() * 10) + 40);
      setNet(Math.floor(Math.random() * 20));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col p-4 bg-black/20 text-slate-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="text-indigo-400" /> System Monitor
      </h2>
      
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-400" /> CPU Usage</span>
            <span className="font-mono">{cpu}%</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${cpu}%` }} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-blue-400" /> Memory (RAM)</span>
            <span className="font-mono">{ram}% (215/512 MB)</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${ram}%` }} />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="flex items-center gap-2"><Network className="w-4 h-4 text-purple-400" /> Network</span>
            <span className="font-mono">{net} KB/s</span>
          </div>
          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${net}%` }} />
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 text-xs text-slate-500 text-center">
        nOS Lite Kernel - Optimized for Low-End Devices
      </div>
    </div>
  );
}
