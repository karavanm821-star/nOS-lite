import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';

export default function MediaPlayerApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const tracks = [
    { title: "Cyber City Ambient", artist: "NeuraWix Sounds" },
  ];

  return (
    <div className="h-full flex flex-col bg-black/30 text-white p-6 justify-between">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl mb-6 flex items-center justify-center shadow-2xl shadow-purple-900/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Music className="w-16 h-16 text-white/50" />
        </div>
        
        <h2 className="text-xl font-bold mb-1">{tracks[0].title}</h2>
        <p className="text-indigo-300 text-sm">{tracks[0].artist}</p>
      </div>

      <div className="w-full mt-6">
        <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
          <span>01:24</span>
          <span>04:12</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full mb-6 cursor-pointer overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="flex items-center justify-between px-4">
          <Volume2 className="w-5 h-5 text-slate-400" />
          <div className="flex items-center gap-6">
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
            >
              {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
          <Music className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
