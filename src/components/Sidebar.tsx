import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Video, 
  BookOpen, 
  Map, 
  Globe, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  UserCircle,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { View } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userRole: 'student' | 'mentor' | 'admin';
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  collapsed, 
  setCollapsed,
  userRole,
  onLogout
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student'] },
    { id: 'mentor-dashboard', label: 'Mentor Hub', icon: UserCircle, roles: ['mentor'] },
    { id: 'admin-dashboard', label: 'Admin Panel', icon: ShieldCheck, roles: ['admin'] },
    { id: 'mentors', label: 'Mentors', icon: Users, roles: ['student'] },
    { id: 'live-sessions', label: 'Live Sessions', icon: Video, roles: ['student', 'mentor'] },
    { id: 'courses', label: 'Courses', icon: BookOpen, roles: ['student', 'mentor'] },
    { id: 'learning-path', label: 'Learning Path', icon: Map, roles: ['student'] },
    { id: 'community', label: 'Community', icon: Globe, roles: ['student', 'mentor'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['student', 'mentor', 'admin'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, roles: ['student', 'mentor'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['student', 'mentor', 'admin'] },
  ].filter(item => item.roles.includes(userRole) || (userRole === 'student' && item.roles.includes('student')));

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-50 flex items-center justify-around px-2">
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
              currentView === item.id ? "text-indigo-600" : "text-slate-400"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-rose-500"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Exit</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          "hidden md:flex h-screen bg-white border-r border-slate-200 flex-col sticky top-0 z-40"
        )}
      >
      <div className="p-6 flex items-center justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl text-slate-900">EduBridge</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewChange(item.id as View)}
            className={cn(
              "sidebar-item w-full group relative",
              currentView === item.id && "sidebar-item-active",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={22} className={cn(
              "transition-colors",
              currentView === item.id ? "text-white" : "text-slate-500 group-hover:text-indigo-600"
            )} />
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
            {currentView === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-2">
        <motion.div 
          whileHover={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}
          className={cn(
            "flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors",
            collapsed && "justify-center"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
            JD
          </div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-semibold text-slate-900 truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate capitalize">{userRole}</p>
            </motion.div>
          )}
        </motion.div>

        <button
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </motion.div>
    </>
  );
};
