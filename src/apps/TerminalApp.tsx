import React, { useState, useRef, useEffect } from 'react';
import { useOs } from '../os/OsProvider';

export default function TerminalApp() {
  const { username } = useOs();
  const [history, setHistory] = useState<string[]>([
    'nOS Neo-Glass Kernel v1.1.0',
    'Welcome to the system terminal.',
    'Type "help" for a list of commands.',
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `${username}@nos-neo:~$ ${input}`];

    if (cmd === 'help') {
      newHistory.push('Available commands: help, clear, date, whoami, echo, sysinfo');
    } else if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'date') {
      newHistory.push(new Date().toString());
    } else if (cmd === 'whoami') {
      newHistory.push(username);
    } else if (cmd.startsWith('echo ')) {
      newHistory.push(input.substring(5));
    } else if (cmd === 'sysinfo') {
      newHistory.push('OS: nOS Lite (Neo-Glass Edition)', 'Arch: WebAssembly/JS', 'RAM: 512MB Virtual', 'GPU: Aura Engine Active');
    } else {
      newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-full bg-black/80 text-emerald-400 font-mono text-sm p-4 flex flex-col backdrop-blur-3xl">
      <div className="flex-1 overflow-auto whitespace-pre-wrap break-all selection:bg-emerald-400/30">
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleCommand} className="flex mt-4 shrink-0 border-t border-white/10 pt-3">
        <span className="mr-2 text-emerald-600">{username}@nos-neo:~$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-emerald-300"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}
