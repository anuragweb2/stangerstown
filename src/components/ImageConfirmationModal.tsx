import React, { useState } from 'react';
import { X, Send, Clock, Infinity, Timer } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';

interface ImageConfirmationModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onConfirm: (expiry: number) => void;
}

const TIMER_OPTIONS = [
  { label: 'Keep in chat', value: 0, icon: Infinity, desc: 'Visible forever' },
  { label: '5 Seconds', value: 5000, icon: Timer, desc: 'Disappears quickly' },
  { label: '30 Seconds', value: 30000, icon: Timer, desc: 'Short view' },
  { label: '1 Minute', value: 60000, icon: Clock, desc: 'Standard expiry' },
];

export const ImageConfirmationModal: React.FC<ImageConfirmationModalProps> = ({ 
  isOpen, 
  imageSrc, 
  onClose, 
  onConfirm 
}) => {
  const [selectedTimer, setSelectedTimer] = useState(0);

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a1b26] rounded-3xl shadow-2xl w-full max-w-sm border border-slate-200 dark:border-white/10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 shrink-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Send Image</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
           {/* Image Preview */}
           <div className="bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden mb-6 border border-slate-200 dark:border-white/5 flex items-center justify-center min-h-[200px]">
              <img src={imageSrc} alt="Preview" className="max-w-full max-h-[300px] object-contain" />
           </div>

           {/* Timer Selection */}
           <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Disappearing Timer</label>
              <div className="grid grid-cols-1 gap-2">
                 {TIMER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedTimer(option.value)}
                      className={clsx(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                        selectedTimer === option.value
                          ? "bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20"
                          : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                      )}
                    >
                       <div className={clsx("p-2 rounded-full", selectedTimer === option.value ? "bg-white/20" : "bg-slate-100 dark:bg-white/10")}>
                          <option.icon size={18} />
                       </div>
                       <div>
                          <div className="text-sm font-bold">{option.label}</div>
                          <div className={clsx("text-xs opacity-80", selectedTimer === option.value ? "text-white" : "text-slate-500")}>{option.desc}</div>
                       </div>
                       {selectedTimer === option.value && <div className="ml-auto bg-white text-brand-500 rounded-full p-1"><X size={12} className="rotate-45" strokeWidth={4}/></div>}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex gap-3 shrink-0">
           <Button variant="secondary" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
           <Button onClick={() => onConfirm(selectedTimer)} className="flex-1 rounded-xl">
              <Send size={18} /> Send
           </Button>
        </div>

      </div>
    </div>
  );
};