import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Languages, 
  Calendar,
  MessageSquare,
  MapPin,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Mentor } from '../types';

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Dr. Aris Thorne',
    expertise: ['AI Ethics', 'Machine Learning'],
    experience: '12 years',
    rating: 4.9,
    languages: ['English', 'Spanish'],
    availability: 'Mon, Wed, Fri',
    image: 'https://picsum.photos/seed/mentor1/200/200',
    status: 'online'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    expertise: ['Frontend Dev', 'React', 'UI/UX'],
    experience: '8 years',
    rating: 4.8,
    languages: ['English', 'Hindi'],
    availability: 'Tue, Thu',
    image: 'https://picsum.photos/seed/mentor2/200/200',
    status: 'busy'
  },
  {
    id: '3',
    name: 'Michael Chen',
    expertise: ['Cloud Architecture', 'AWS'],
    experience: '15 years',
    rating: 5.0,
    languages: ['English', 'Mandarin'],
    availability: 'Flexible',
    image: 'https://picsum.photos/seed/mentor3/200/200',
    status: 'online'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    expertise: ['Data Science', 'Python'],
    experience: '6 years',
    rating: 4.7,
    languages: ['Spanish', 'Portuguese'],
    availability: 'Weekends',
    image: 'https://picsum.photos/seed/mentor4/200/200',
    status: 'offline'
  }
];

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export const MentorDiscovery: React.FC = () => {
  const [search, setSearch] = useState('');

  const getStatusColor = (status: Mentor['status']) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'busy': return 'bg-amber-500';
      case 'offline': return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Find Your Mentor</h2>
          <p className="text-slate-500">Connect with global experts who understand your context</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search expertise..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentors.map((mentor, i) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden group hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1 text-xs font-bold text-slate-900 shadow-sm">
                <Star size={12} className="text-amber-500 fill-current" />
                {mentor.rating}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900">{mentor.name}</h3>
                <div className={cn("w-2 h-2 rounded-full", getStatusColor(mentor.status))} title={mentor.status} />
                <CheckCircle size={14} className="text-indigo-500 ml-auto" />
              </div>
              <p className="text-xs text-slate-500 mb-4">{mentor.experience} experience</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.expertise.map((exp, j) => (
                  <span key={j} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full">
                    {exp}
                  </span>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Languages size={14} />
                  {mentor.languages.join(', ')}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={14} />
                  {mentor.availability}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100">
                  Book Session
                </button>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
