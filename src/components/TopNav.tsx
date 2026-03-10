import React from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  Wifi, 
  WifiOff, 
  Zap,
  Circle
} from 'lucide-react';
import { ConnectionMode } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TopNavProps {
  connectionMode: ConnectionMode;
  setConnectionMode: (mode: ConnectionMode) => void;
  aiAvailable: boolean;
  liveSessionsCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  connectionMode,
  setConnectionMode,
  aiAvailable,
  liveSessionsCount
}) => {
  const getConnectionIcon = () => {
    switch (connectionMode) {
      case 'Internet': return <Wifi size={18} className="text-emerald-500" />;
      case 'Edge Hub': return <Zap size={18} className="text-amber-500" />;
      case 'Satellite': return <Globe size={18} className="text-indigo-500" />;
    }
  };

  return (
    <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for courses, mentors, or topics..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm"
          />
        </div>
      </div>

      {/* Mobile Logo */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
          <span className="text-white font-bold text-xl">E</span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Real-time Indicators - Hidden on small mobile */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
          <div className="flex items-center gap-2">
            <Circle size={8} className={cn("fill-current", aiAvailable ? "text-emerald-500" : "text-slate-300")} />
            <span className="text-[10px] md:text-xs font-medium text-slate-600">AI</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <Circle size={8} className={cn("fill-current", liveSessionsCount > 0 ? "text-rose-500 animate-pulse" : "text-slate-300")} />
            <span className="text-[10px] md:text-xs font-medium text-slate-600">{liveSessionsCount} Live</span>
          </div>
        </div>

        {/* Connection Switcher - Simplified on mobile */}
        <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
          {getConnectionIcon()}
          <select 
            value={connectionMode}
            onChange={(e) => setConnectionMode(e.target.value as ConnectionMode)}
            className="text-[10px] md:text-xs font-semibold text-slate-700 outline-none bg-transparent cursor-pointer max-w-[60px] md:max-w-none"
          >
            <option value="Internet">Internet</option>
            <option value="Edge Hub">Edge</option>
            <option value="Satellite">Satellite</option>
          </select>
        </div>

        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 md:pl-4 md:border-l md:border-slate-200">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img 
              src="https://picsum.photos/seed/user123/100/100" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
