import React, { useState, useEffect } from 'react';
import { useOs } from '../os/OsProvider';
import { appsRegistry } from '../os/appsRegistry';
import Taskbar from './Taskbar';
import OsWindow from './Window';
import ToastContainer from './ToastContainer';

export default function Desktop() {
  const { windows, openApp, closeWindow, addToast } = useOs();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show a welcome toast on first load
    setTimeout(() => {
      addToast({
        title: 'System Ready',
        message: 'Welcome to nOS Neo-Glass environment.',
        type: 'info'
      });
    }, 1000);
  }, [addToast]);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden font-sans select-none bg-slate-900 text-white w-full h-full">
      {/* macOS Monterey/Ventura style Background */}
      <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{
        backgroundImage: 'radial-gradient(ellipse at bottom left, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)'
      }}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[60px]"></div>
        {/* Abstract glowing orbs to simulate the abstract macOS wallpapers */}
        <div className="absolute top-[-20%] left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/30 blur-[150px]"></div>
      </div>

      {/* Desktop Content Layer */}
      <div className="flex-1 flex relative z-10 pt-8">
        
        {/* Desktop Icons - Grid on the right like macOS */}
        <div className="p-6 grid grid-flow-col grid-rows-6 gap-6 w-fit h-fit items-start content-start absolute right-0">
          {appsRegistry.map((app, i) => {
            return (
              <div 
                key={app.id}
                className="flex flex-col items-center w-24 gap-1 cursor-pointer group"
                onClick={() => openApp(app.id)}
              >
                <div className="w-16 h-16 bg-blue-400/20 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex items-center justify-center text-blue-200 group-hover:bg-blue-400/40 transition-all duration-200">
                  <app.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md text-center bg-black/20 px-2 py-0.5 rounded-md">{app.name}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Windows */}
      {windows.map(win => (
        <OsWindow key={win.id} windowState={win} />
      ))}

      {/* Taskbar */}
      <Taskbar />

      {/* Global Notifications */}
      <ToastContainer />
    </div>
  );
}
