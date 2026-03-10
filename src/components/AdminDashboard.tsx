import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  BookOpen, 
  Settings, 
  Activity,
  AlertCircle,
  ArrowUpRight,
  Search,
  Filter,
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Admin 🛡️</h1>
          <p className="text-slate-500 mt-1">System status: All services operational.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            System Config
          </button>
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-200">
            Verify Mentors
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Verifications', value: '18', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Active Courses', value: '450', icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'System Load', value: '12%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start justify-between">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                <ArrowUpRight size={14} />
                +2.4%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <h3 className="text-lg font-bold text-slate-900">User Management</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
                />
              </div>
              <button className="p-2 bg-slate-50 rounded-lg text-slate-500 hover:bg-slate-100">
                <Filter size={18} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', joined: 'Mar 1, 2026' },
                  { name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'Mentor', status: 'Pending', joined: 'Mar 5, 2026' },
                  { name: 'Michael Chen', email: 'mike@example.com', role: 'Mentor', status: 'Active', joined: 'Feb 20, 2026' },
                  { name: 'Alice Wang', email: 'alice@example.com', role: 'Student', status: 'Active', joined: 'Mar 8, 2026' },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        user.role === 'Mentor' ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          user.status === 'Active' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        <span className="text-xs font-medium text-slate-600">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-8 bg-indigo-600 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={24} className="text-indigo-200" />
            <h3 className="text-lg font-bold">AI System Insights</h3>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Engagement Prediction', value: 'High', desc: 'Predicted 15% growth in active sessions next week.' },
              { label: 'Content Gap Analysis', value: 'Found', desc: 'AI suggests adding more "Mobile Development" courses for rural users.' },
              { label: 'Mentor Matching', value: '94%', desc: 'Current matching efficiency is at an all-time high.' },
            ].map((insight, i) => (
              <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">{insight.label}</p>
                  <span className="text-sm font-bold">{insight.value}</span>
                </div>
                <p className="text-sm opacity-90">{insight.desc}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-white text-indigo-600 text-sm font-bold rounded-xl hover:bg-indigo-50 transition-all">
            Generate Full AI Audit
          </button>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
