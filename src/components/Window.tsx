import React, { useState, useRef, useEffect } from 'react';
import { WindowState } from '../types';
import { useOs } from '../os/OsProvider';
import { X, Minus, Square } from 'lucide-react';
import { appsRegistry } from '../os/appsRegistry';

const Window: React.FC<{ windowState: WindowState }> = ({ windowState }) => {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateWindowPosition, isMobile } = useOs();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const app = appsRegistry.find(a => a.id === windowState.appId);
  if (!app) return null;

  const { id, title, isMinimized, isMaximized, x, y, width, height, zIndex } = windowState;

  if (isMinimized) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized || isMobile) return;
    focusWindow(id);
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return; // Don't drag from buttons

    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Bounds keeping so it can't be dragged under the 32px top bar
    newY = Math.max(32, newY);
    updateWindowPosition(id, newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  const currentX = isMaximized ? 0 : x;
  const currentY = isMaximized ? 32 : Math.max(32, y); // Enforce Y minimum logic dynamically too
  const currentWidth = isMaximized ? '100%' : `${width}px`;
  const currentHeight = isMaximized ? 'calc(100% - 32px)' : `${height}px`;

  return (
    <div
      ref={windowRef}
      onPointerDown={() => focusWindow(id)}
      className="absolute bg-slate-900 rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden backdrop-blur-3xl"
      style={{
        left: currentX,
        top: currentY,
        width: currentWidth,
        height: currentHeight,
        zIndex,
        transition: isDragging ? 'none' : 'width 0.2s, height 0.2s, left 0.2s, top 0.2s',
      }}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-white/10 backdrop-blur-md border-b border-white/10 flex items-center px-4 shrink-0 cursor-move rounded-t-2xl relative"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={() => !isMobile && app.canMaximize !== false && toggleMaximize(id)}
        style={{ cursor: isMaximized ? 'default' : 'move' }}
      >
        <div className="flex items-center gap-2 absolute left-4 z-10 group">
          <button onClick={() => closeWindow(id)} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center border border-black/10">
            <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black/60" strokeWidth={3} />
          </button>
          <button onClick={() => minimizeWindow(id)} className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center border border-black/10">
            <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black/60" strokeWidth={3} />
          </button>
          <button 
            onClick={() => { if (!isMobile && app.canMaximize !== false) toggleMaximize(id); }} 
            className={`w-3.5 h-3.5 rounded-full ${(!isMobile && app.canMaximize !== false) ? 'bg-[#27c93f]' : 'bg-white/20'} flex items-center justify-center border border-black/10`}
          >
            {(!isMobile && app.canMaximize !== false) && <Square className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" fill="currentColor" />}
          </button>
        </div>
        
        <div className="flex-1 flex justify-center items-center gap-2 pointer-events-none">
          <app.icon className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">{title}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white relative">
        <app.component windowId={id} />
      </div>
    </div>
  );
}

export default Window;
