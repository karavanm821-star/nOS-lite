import React, { useState } from 'react';

const mockSystem = [
  { name: 'Documents', type: 'folder', items: ['notes.txt', 'ideas.txt'] },
  { name: 'Downloads', type: 'folder', items: ['installer.sh'] },
  { name: 'System', type: 'folder', items: ['config.sys', 'kernel.bin'] },
  { name: 'readme.md', type: 'file' },
];

export default function FilesApp() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  return (
    <div className="h-full flex flex-col text-slate-200 text-sm bg-black/20">
      <div className="p-3 border-b border-white/10 bg-black/40 flex items-center gap-2 text-slate-300 text-xs font-medium backdrop-blur-sm">
        <button onClick={() => setCurrentPath([])} className="hover:text-white transition-colors bg-white/10 px-2 py-1 rounded-md">Home</button>
        {currentPath.map((p, i) => (
          <React.Fragment key={i}>
            <span className="text-slate-500">/</span>
            <button className="hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-md">{p}</button>
          </React.Fragment>
        ))}
      </div>
      <div className="flex-1 p-6 grid grid-cols-4 gap-4 content-start">
        {currentPath.length === 0 ? mockSystem.map(item => (
          <div key={item.name} className="flex flex-col items-center gap-3 cursor-pointer hover:bg-white/10 p-3 rounded-2xl transition-all border border-transparent hover:border-white/10" onClick={() => item.type === 'folder' && setCurrentPath([...currentPath, item.name])}>
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl border ${item.type === 'folder' ? 'bg-blue-500/20 border-blue-400/30 text-blue-400 text-2xl shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 text-slate-400 text-xl'}`}>
              {item.type === 'folder' ? '📁' : '📄'}
            </div>
            <span className="text-xs font-medium text-slate-300 truncate w-full text-center">{item.name}</span>
          </div>
        )) : (
          <div className="col-span-4 text-center text-slate-500 mt-10">
            Empty folder
          </div>
        )}
      </div>
    </div>
  );
}
