import React, { useState, useEffect } from 'react';
import { useOs } from '../os/OsProvider';

export default function SettingsApp() {
  const { username, setUsername, addToast } = useOs();
  const [localName, setLocalName] = useState(username);

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSave = () => {
    setUsername(localName);
    addToast({
      title: 'Settings Saved',
      message: `Username updated to ${localName}.`,
      type: 'success'
    });
  };

  return (
    <div className="p-8 text-slate-200 max-w-md mx-auto bg-slate-900 h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 text-white">System Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Username</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white"
            />
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors rounded-xl text-sm shadow-lg shadow-indigo-500/20"
            >
              Save
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">System Appearance</label>
          <div className="text-xs text-slate-400 bg-white/5 p-4 rounded-xl border border-white/10 shadow-inner">
            nOS is currently running the <strong>Neo-Glass Dark</strong> theme, optimized for low power with hardware acceleration.
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 mt-8">
          <h3 className="text-rose-400 font-semibold text-sm mb-2">Danger Zone</h3>
          <button 
            onClick={handleReset}
            className="px-4 py-3 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-colors rounded-xl text-sm font-semibold w-full text-left"
          >
            Erase all user data & restart system
          </button>
          <p className="text-xs text-slate-500 mt-2">This action clears all local storage, settings, and profile data.</p>
        </div>
      </div>
    </div>
  );
}
