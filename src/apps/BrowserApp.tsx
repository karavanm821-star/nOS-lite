import React, { useState, useRef } from 'react';
import { Search, ArrowLeft, ArrowRight, RotateCw, AlertCircle, X } from 'lucide-react';

export default function BrowserApp() {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Main_Page');
  const [input, setInput] = useState('https://en.wikipedia.org/wiki/Main_Page');
  const [showWarning, setShowWarning] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNav = (e: React.FormEvent) => {
    e.preventDefault();
    let target = input.trim();
    
    if (!target) return;

    // Very basic check if it's a URL
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = 'https://' + target;
      } else {
        // Fallback to Wikipedia search since most search engines block iframes
        target = 'https://en.wikipedia.org/w/index.php?search=' + encodeURIComponent(target);
      }
    }
    
    setUrl(target);
    setInput(target);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      // Force refresh by resetting the src
      const currentUrl = url;
      setUrl('');
      setTimeout(() => setUrl(currentUrl), 50);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-200">
      <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <button className="p-1 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors cursor-not-allowed opacity-50"><ArrowLeft className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors cursor-not-allowed opacity-50"><ArrowRight className="w-4 h-4" /></button>
        <button className="p-1 hover:bg-white/10 rounded-md text-slate-400 hover:text-white transition-colors" onClick={handleRefresh}><RotateCw className="w-4 h-4" /></button>
        
        <form onSubmit={handleNav} className="flex-1 flex items-center bg-black/50 border border-white/10 rounded-md px-3 py-1.5 ml-2 shadow-inner focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          <Search className="w-3 h-3 text-slate-400 mr-2" />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder-slate-500"
            placeholder="Search Wikipedia or enter web address..."
          />
        </form>
      </div>
      
      {showWarning && (
        <div className="bg-blue-900/50 border-b border-blue-500/30 p-2 flex items-center justify-between text-xs text-blue-200 px-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <p><strong>Note:</strong> Many websites (like Google or YouTube) block embedding via X-Frame-Options. Wikipedia and Hacker News work well.</p>
          </div>
          <button onClick={() => setShowWarning(false)} className="p-1 hover:bg-blue-800/50 rounded-full transition-colors ml-4">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex-1 bg-white relative">
        {url && (
          <iframe 
            ref={iframeRef}
            src={url} 
            title="Browser" 
            className="w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            onError={(e) => console.log('Iframe error', e)}
          />
        )}
      </div>
    </div>
  );
}
