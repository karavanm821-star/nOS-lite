import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { WindowState, Toast } from '../types';
import { appsRegistry } from './appsRegistry';

interface OsContextType {
  windows: WindowState[];
  toasts: Toast[];
  openApp: (appId: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  username: string;
  setUsername: (name: string) => void;
  isMobile: boolean;
}

const OsContext = createContext<OsContextType | undefined>(undefined);

export function OsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeZIndex, setActiveZIndex] = useState(10);
  const [username, setUsernameState] = useState(localStorage.getItem('nos_username') || 'User');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const setUsername = (name: string) => {
    setUsernameState(name);
    localStorage.setItem('nos_username', name);
  };

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
  }, [removeToast]);

  const openApp = (appId: string) => {
    const app = appsRegistry.find(a => a.id === appId);
    if (!app) return;

    // Check if single-instance app is already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === existingWindow.id ? { ...w, isMinimized: false } : w));
      }
      return;
    }

    const newZIndex = activeZIndex + 1;
    setActiveZIndex(newZIndex);

    // Center window slightly randomized
    const offset = Math.floor(Math.random() * 40);
    const width = isMobile ? window.innerWidth : (app.defaultWidth || 600);
    const height = isMobile ? window.innerHeight - 48 : (app.defaultHeight || 400); // 48 is taskbar height
    
    const x = isMobile ? 0 : Math.max(0, (window.innerWidth - width) / 2 + offset);
    const y = isMobile ? 0 : Math.max(0, (window.innerHeight - height - 48) / 2 + offset);

    const newWindow: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: app.name,
      isMinimized: false,
      isMaximized: isMobile,
      x,
      y,
      width,
      height,
      zIndex: newZIndex,
    };

    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    const newZIndex = activeZIndex + 1;
    setActiveZIndex(newZIndex);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const toggleMaximize = (id: string) => {
    if (isMobile) return;
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  return (
    <OsContext.Provider value={{
      windows, toasts, openApp, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateWindowPosition, addToast, removeToast, username, setUsername, isMobile
    }}>
      {children}
    </OsContext.Provider>
  );
}

export const useOs = () => {
  const context = useContext(OsContext);
  if (!context) throw new Error('useOs must be used within OsProvider');
  return context;
};
