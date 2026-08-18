import React from 'react';
import { useOs } from '../os/OsProvider';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useOs();

  return (
    <div className="fixed top-12 right-4 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = Info;
        let colorClass = 'text-blue-400';
        let bgClass = 'bg-slate-900/80';
        let borderClass = 'border-blue-500/30';

        switch (toast.type) {
          case 'success':
            Icon = CheckCircle;
            colorClass = 'text-emerald-400';
            borderClass = 'border-emerald-500/30';
            break;
          case 'warning':
            Icon = AlertTriangle;
            colorClass = 'text-amber-400';
            borderClass = 'border-amber-500/30';
            break;
          case 'error':
            Icon = XCircle;
            colorClass = 'text-rose-400';
            borderClass = 'border-rose-500/30';
            break;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-2xl border ${borderClass} ${bgClass} text-white transform transition-all duration-300 animate-in slide-in-from-right-8 fade-in`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${colorClass}`} />
            <div className="flex-1 flex flex-col gap-1">
              <span className="text-sm font-semibold leading-none">{toast.title}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
