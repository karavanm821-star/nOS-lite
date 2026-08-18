import React, { useState, useRef, useEffect } from 'react';
import { useOs } from '../os/OsProvider';
import { Send, Bot, Sparkles } from 'lucide-react';

export default function AiAssistantApp() {
  const { openApp, username } = useOs();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Greetings, ${username}. I am Aura, the core intelligence of nOS Neo. How can I assist you?` }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processIntent = (text: string) => {
    const lower = text.toLowerCase();
    
    if (lower.includes('prohlížeč') || lower.includes('internet') || lower.includes('browser')) {
      openApp('browser');
      return 'Initializing browser environment...';
    }
    if (lower.includes('kalkulač') || lower.includes('počítej') || lower.includes('calc')) {
      openApp('calculator');
      return 'Calculation matrix loaded.';
    }
    if (lower.includes('poznámk') || lower.includes('zapiš') || lower.includes('notes')) {
      openApp('notes');
      return 'Opening memory block for text input.';
    }
    if (lower.includes('nastavení') || lower.includes('settings')) {
      openApp('settings');
      return 'Accessing system configuration.';
    }
    if (lower.includes('soubor') || lower.includes('složk') || lower.includes('files')) {
      openApp('files');
      return 'File system active.';
    }
    if (lower.includes('terminál') || lower.includes('cmd') || lower.includes('konzol')) {
      openApp('terminal');
      return 'Terminal gateway opened.';
    }

    if (lower.includes('+') || lower.includes('-') || lower.includes('*') || lower.includes('/')) {
      try {
        const sanitized = lower.replace(/[^0-9+\-*/(). ]/g, '');
        if (sanitized.trim().length > 2) {
          // eslint-disable-next-line no-eval
          const res = eval(sanitized);
          return `Computed result: ${res}`;
        }
      } catch (e) {}
    }

    return 'The Aura Neural Engine is operating in local safe-mode. Ask me to open applications or compute basic math.';
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      const response = processIntent(userText);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-200 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-indigo-600/10 blur-3xl pointer-events-none z-0"></div>
      <div className="flex-1 overflow-auto p-4 flex flex-col gap-4 relative z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-slate-700 text-white' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'}`}>
              {msg.role === 'user' ? username.charAt(0).toUpperCase() : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm shadow-md ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 border border-white/10 text-slate-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl flex gap-2 relative z-10 shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Command Aura..."
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-indigo-500 outline-none transition-colors text-white placeholder-slate-500"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:shadow-none"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
