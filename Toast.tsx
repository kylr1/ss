import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0b172d]/95 text-slate-100 border border-blue-500/30 shadow-2xl shadow-blue-950/60 backdrop-blur-md">
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <Info className="w-5 h-5 text-blue-400 shrink-0" />
        )}
        <span className="text-sm font-medium tracking-tight text-white">{message}</span>
        <button
          onClick={onClose}
          className="mr-2 text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded transition-colors"
          aria-label="إغلاق"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
