import React from 'react';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: any; // Lucide icon
  component: React.FC<{ windowId: string }>;
  defaultWidth?: number;
  defaultHeight?: number;
  canMaximize?: boolean;
}
