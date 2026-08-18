import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useOs } from '../os/OsProvider';
import { Battery, Wifi, Search, Command } from 'lucide-react';
import { appsRegistry } from '../os/appsRegistry';

export default function Taskbar() {
  const { windows, openApp, focusWindow, closeWindow, addToast, isMobile } = useOs();
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const spotlightRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showSpotlight && spotlightRef.current) {
      spotlightRef.current.focus();
    }
  }, [showSpotlight]);

  const activeWindow = windows
    .filter(w => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const activeAppName = activeWindow 
    ? appsRegistry.find(a => a.id === activeWindow.appId)?.name || 'nOS'
    : 'Desktop';

  const closeAllMenus = useCallback(() => {
    setMenuOpen(false);
    setActiveMenu(null);
    setShowSpotlight(false);
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K (Spotlight)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSpotlight(prev => {
          if (!prev) closeAllMenus(); // Close other menus when opening spotlight
          return !prev;
        });
      }
      
      // Escape (Close menus and spotlight)
      if (e.key === 'Escape') {
        closeAllMenus();
      }

      // Cmd/Ctrl + W (Close active window)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (activeWindow) {
          closeWindow(activeWindow.id);
        }
      }

      // Cmd/Ctrl + N (New Note)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openApp('notes');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindow, closeWindow, openApp, closeAllMenus]);

  const handleAction = (action: string) => {
    closeAllMenus();
    switch (action) {
      case 'new-browser':
        openApp('browser');
        break;
      case 'new-note':
        openApp('notes');
        break;
      case 'close-window':
        if (activeWindow) closeWindow(activeWindow.id);
        break;
      case 'copy':
      case 'paste':
        addToast({ title: 'Clipboard', message: `${action === 'copy' ? 'Copied to' : 'Pasted from'} clipboard.`, type: 'info' });
        break;
      case 'refresh':
        addToast({ title: 'View', message: 'Window refreshed.', type: 'success' });
        break;
      case 'about':
        openApp('about');
        break;
      case 'wifi':
        addToast({ title: 'Network', message: 'Connected to nOS_Network_5G', type: 'info' });
        break;
      case 'battery':
        addToast({ title: 'Power', message: 'Battery at 100%. Power source: Adapter.', type: 'info' });
        break;
    }
  };

  const handleSpotlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spotlightRef.current?.value) {
      openApp('browser');
      addToast({ title: 'Spotlight Search', message: `Searching for: ${spotlightRef.current.value}`, type: 'success' });
      closeAllMenus();
    }
  };

  return (
    <>
      {/* Top Menu Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 z-[9999] text-sm font-medium text-white shadow-sm">
        <div className="flex items-center gap-1">
          <div 
            className="flex items-center justify-center cursor-pointer hover:bg-white/20 px-2 h-6 rounded transition-colors"
            onClick={() => { setMenuOpen(!menuOpen); setActiveMenu(null); }}
          >
            <Command className="w-4 h-4" />
          </div>
          <span className="font-bold cursor-default px-2 h-6 flex items-center">{activeAppName}</span>
          
          <div className="relative hidden sm:block">
            <span 
              className={`px-2 h-6 flex items-center rounded cursor-pointer transition-colors ${activeMenu === 'file' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => handleMenuClick('file')}
            >File</span>
            {activeMenu === 'file' && (
              <div className="absolute top-8 left-0 w-48 bg-slate-800/90 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-lg p-1 animate-in fade-in duration-150">
                <button className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('new-browser')}>
                  <span>New Browser Window</span>
                </button>
                <button className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('new-note')}>
                  <span>New Note</span>
                  <span className="text-white/40 text-xs font-sans tracking-widest">⌘N</span>
                </button>
                <div className="h-px bg-white/10 my-1 mx-2"></div>
                <button 
                  className={`w-full flex justify-between items-center px-3 py-1.5 rounded text-sm ${activeWindow ? 'hover:bg-blue-500 text-white' : 'text-white/40 cursor-default'}`}
                  onClick={() => handleAction('close-window')}
                >
                  <span>Close Window</span>
                  <span className="text-white/40 text-xs font-sans tracking-widest">⌘W</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <span 
              className={`px-2 h-6 flex items-center rounded cursor-pointer transition-colors ${activeMenu === 'edit' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => handleMenuClick('edit')}
            >Edit</span>
            {activeMenu === 'edit' && (
              <div className="absolute top-8 left-0 w-48 bg-slate-800/90 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-lg p-1 animate-in fade-in duration-150">
                <button className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('copy')}>
                  <span>Copy</span>
                  <span className="text-white/40 text-xs font-sans tracking-widest">⌘C</span>
                </button>
                <button className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('paste')}>
                  <span>Paste</span>
                  <span className="text-white/40 text-xs font-sans tracking-widest">⌘V</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <span 
              className={`px-2 h-6 flex items-center rounded cursor-pointer transition-colors ${activeMenu === 'view' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => handleMenuClick('view')}
            >View</span>
            {activeMenu === 'view' && (
              <div className="absolute top-8 left-0 w-48 bg-slate-800/90 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-lg p-1 animate-in fade-in duration-150">
                <button className="w-full flex justify-between items-center px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('refresh')}>
                  <span>Reload Window</span>
                  <span className="text-white/40 text-xs font-sans tracking-widest">⌘R</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <span 
              className={`px-2 h-6 flex items-center rounded cursor-pointer transition-colors ${activeMenu === 'help' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => handleMenuClick('help')}
            >Help</span>
            {activeMenu === 'help' && (
              <div className="absolute top-8 left-0 w-48 bg-slate-800/90 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-lg p-1 animate-in fade-in duration-150">
                <button className="w-full text-left px-3 py-1.5 hover:bg-blue-500 rounded text-sm" onClick={() => handleAction('about')}>About nOS</button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Wifi className="w-4 h-4 cursor-pointer hover:text-white/80" onClick={() => handleAction('wifi')} />
          <Battery className="w-4 h-4 cursor-pointer hover:text-white/80" onClick={() => handleAction('battery')} />
          <Search className="w-4 h-4 cursor-pointer hover:text-white/80" onClick={() => { closeAllMenus(); setShowSpotlight(true); }} title="Spotlight (⌘K)" />
          <span className="cursor-default font-medium tracking-wide">
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Spotlight Search Modal */}
      {showSpotlight && (
        <div className="fixed inset-0 z-[10001] flex items-start justify-center pt-32 bg-black/10 backdrop-blur-sm transition-all">
          <form 
            onSubmit={handleSpotlightSubmit}
            className="w-[500px] bg-slate-800/80 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden flex items-center px-4 py-3 animate-in fade-in zoom-in-95 duration-200"
          >
            <Search className="w-6 h-6 text-slate-400 mr-3" />
            <input 
              ref={spotlightRef}
              type="text" 
              className="flex-1 bg-transparent border-none outline-none text-2xl font-light text-white placeholder-slate-400"
              placeholder="Spotlight Search"
            />
            <div className="text-xs text-slate-500 font-medium px-2 py-1 rounded bg-slate-900/50">ESC</div>
          </form>
        </div>
      )}

      {/* Bottom Dock */}
      {!isMobile && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 h-16 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-2xl px-3 flex items-end pb-2 gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[9999] transition-all">
          {appsRegistry.map(app => {
            const isAppOpen = windows.some(w => w.appId === app.id);
            const isAppFocused = activeWindow?.appId === app.id;
            
            const colors = ['bg-blue-500/80', 'bg-emerald-500/80', 'bg-slate-700/80', 'bg-amber-500/80', 'bg-indigo-500/80', 'bg-purple-500/80', 'bg-rose-500/80', 'bg-cyan-500/80', 'bg-fuchsia-500/80'];
            const colorClass = colors[appsRegistry.indexOf(app) % colors.length];

            return (
              <div key={app.id} className="relative flex flex-col items-center group">
                <button
                  onClick={() => {
                    const existingWindow = windows.find(w => w.appId === app.id);
                    if (existingWindow) {
                      focusWindow(existingWindow.id);
                    } else {
                      openApp(app.id);
                    }
                  }}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-200 hover:scale-125 hover:-translate-y-2 hover:mx-2
                    ${colorClass} shadow-md border border-white/20 text-white`}
                  title={app.name}
                >
                  <app.icon className="w-6 h-6" strokeWidth={1.5} />
                </button>
                {/* Indicator dot */}
                {isAppOpen && <div className={`absolute -bottom-1.5 w-1 h-1 rounded-full ${isAppFocused ? 'bg-white shadow-[0_0_4px_rgba(255,255,255,0.9)]' : 'bg-white/50'}`}></div>}
              </div>
            );
          })}
        </div>
      )}

      {/* Apple-style Menu / Launchpad */}
      {menuOpen && (
        <div className="fixed top-9 left-4 w-64 bg-slate-800/90 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-xl p-2 z-[10000] animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex flex-col gap-1 text-sm text-white font-medium">
            <button className="text-left px-3 py-1.5 hover:bg-blue-500 rounded-md transition-colors" onClick={() => handleAction('about')}>About This Mac...</button>
            <div className="h-px bg-white/20 my-1 mx-2"></div>
            <button className="text-left px-3 py-1.5 hover:bg-blue-500 rounded-md transition-colors" onClick={() => { openApp('settings'); closeAllMenus(); }}>System Settings...</button>
            <button className="text-left px-3 py-1.5 hover:bg-blue-500 rounded-md transition-colors" onClick={() => { openApp('browser'); closeAllMenus(); }}>App Store...</button>
            <div className="h-px bg-white/20 my-1 mx-2"></div>
            <button className="text-left px-3 py-1.5 hover:bg-blue-500 rounded-md transition-colors" onClick={closeAllMenus}>Sleep</button>
            <button className="text-left px-3 py-1.5 hover:bg-blue-500 rounded-md transition-colors" onClick={closeAllMenus}>Restart...</button>
            <button className="text-left px-3 py-1.5 hover:bg-rose-500 rounded-md transition-colors text-rose-400 hover:text-white" onClick={closeAllMenus}>Shut Down...</button>
          </div>
        </div>
      )}
      
      {/* Click outside to close menu */}
      {(menuOpen || activeMenu || showSpotlight) && (
        <div className="fixed inset-0 z-[9998]" onClick={closeAllMenus} />
      )}
    </>
  );
}
