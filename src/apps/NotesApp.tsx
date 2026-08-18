import React, { useState, useEffect } from 'react';

export default function NotesApp() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('nos_notes');
    if (saved) setContent(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('nos_notes', e.target.value);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-200">
      <div className="h-10 bg-black/40 border-b border-white/10 flex items-center px-4 shrink-0 backdrop-blur-md">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Neo-Glass Notes</span>
      </div>
      <textarea 
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
        className="flex-1 w-full bg-black/20 p-6 outline-none resize-none text-slate-200 text-sm font-mono leading-relaxed placeholder-slate-600"
        spellCheck={false}
      />
    </div>
  );
}
