import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Smile,
  Paperclip,
  Send,
  CheckCheck,
  Languages,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Messages: React.FC = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedMessages, setTranslatedMessages] = useState<Record<number, string>>({});

  const messages = [
    { sender: 'Sarah', msg: 'Hi John! How is the React project coming along?', time: '10:25 AM', isMe: false, translation: 'नमस्ते जॉन! रिएक्ट प्रोजेक्ट कैसा चल रहा है?' },
    { sender: 'Me', msg: 'It is going well! I just finished the state management part.', time: '10:28 AM', isMe: true, translation: 'यह अच्छा चल रहा है! मैंने अभी स्टेट मैनेजमेंट का हिस्सा पूरा किया है।' },
    { sender: 'Sarah', msg: 'That is great to hear! Do you need any help with the API integration?', time: '10:29 AM', isMe: false, translation: 'यह सुनकर बहुत अच्छा लगा! क्या आपको एपीआई इंटीग्रेशन में किसी मदद की ज़रूरत है?' },
    { sender: 'Me', msg: 'Actually, yes. I was wondering about the best way to handle errors.', time: '10:30 AM', isMe: true, translation: 'दरअसल, हाँ। मैं त्रुटियों को संभालने के सर्वोत्तम तरीके के बारे में सोच रहा था।' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex glass-card overflow-hidden">
      {/* Chat List */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-white">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {[
            { name: 'Sarah Jenkins', last: 'See you at the session!', time: '10:30 AM', unread: 2, online: true },
            { name: 'Michael Chen', last: 'The resources have been uploaded.', time: 'Yesterday', unread: 0, online: false },
            { name: 'AI Tutor', last: 'I found 3 new practice problems for you.', time: 'Yesterday', unread: 0, online: true },
            { name: 'Study Group: React', last: 'Alex: Does anyone know how to...', time: 'Mar 8', unread: 5, online: true },
          ].map((chat, i) => (
            <div key={i} className={cn(
              "p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-50",
              i === 0 && "bg-indigo-50/50 border-l-4 border-indigo-600"
            )}>
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-slate-900 truncate">{chat.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{chat.time}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 truncate">{chat.last}</p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200" />
            <div>
              <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online Now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsTranslating(!isTranslating)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all border",
                isTranslating ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" : "bg-white border-slate-200 hover:bg-slate-50"
              )}
            >
              <Languages size={16} />
              <span className="text-xs font-bold">AI Translate</span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Phone size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Video size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Info size={20} /></button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={cn(
              "flex flex-col",
              m.isMe ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "max-w-[70%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed relative group",
                m.isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none"
              )}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isTranslating ? 'translated' : 'original'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isTranslating ? m.translation : m.msg}
                  </motion.div>
                </AnimatePresence>
                {isTranslating && (
                  <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1 rounded-full shadow-lg">
                    <Sparkles size={10} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <p className="text-[10px] text-slate-400 font-medium">{m.time}</p>
                {m.isMe && <CheckCheck size={12} className="text-indigo-500" />}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Paperclip size={20} /></button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Write your message..." 
                className="w-full pl-4 pr-10 py-3 bg-slate-100 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                <Smile size={20} />
              </button>
            </div>
            <button className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
