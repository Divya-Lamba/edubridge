import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Layout, 
  MessageSquare, 
  Users, 
  Settings, 
  PhoneOff,
  Smile,
  Paperclip,
  Send,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';

const mentorSpeech = [
  "Welcome back everyone to our session on React state management.",
  "Today we're going to dive deep into the concept of lifting state up.",
  "Think of state like a bucket of water that needs to be shared between siblings.",
  "If both siblings need the water, we put the bucket in the hands of the parent.",
  "This way, the parent can pass the water down to both children as needed.",
  "In React, this means moving the state to the closest common ancestor.",
  "Let's look at a code example to see how this works in practice.",
  "I'll share my screen now to show you the implementation details.",
  "Any questions so far about why we lift state up?",
  "Great, let's continue with the next part of our lesson."
];

export const LiveClassroom: React.FC = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { user: 'Sarah', msg: 'Can you explain the useEffect dependency array again?', time: '10:15' },
    { user: 'Alex', msg: 'I love how AI subtitles are helping with technical terms!', time: '10:18' },
    { user: 'Mentor', msg: 'Sure Sarah, let me show you an example on the whiteboard.', time: '10:20' },
  ]);
  const [sessionSummary, setSessionSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const text = mentorSpeech.join(' ');
      const response = await geminiService.chat(`Summarize this live lecture in 3 bullet points: \n${text}`);
      setSessionSummary(response);
    } catch (error) {
      console.error("Error summarizing:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      user: 'You',
      msg: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput('');
    
    // Simulate mentor response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        user: 'Mentor',
        msg: "That's a great point! I'll address that in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % mentorSpeech.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate real-time typing of subtitles
    let i = 0;
    const text = mentorSpeech[subtitleIndex];
    setCurrentSubtitle('');
    
    const timer = setInterval(() => {
      setCurrentSubtitle(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
      }
    }, 40); // Slightly slower for better readability

    return () => clearInterval(timer);
  }, [subtitleIndex]);

  return (
    <div className="h-auto md:h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-[400px] md:min-h-0">
        <div className="flex-1 bg-slate-900 rounded-3xl relative overflow-hidden shadow-2xl">
          {/* Main Feed */}
          <img 
            src="https://picsum.photos/seed/mentor_live/1280/720" 
            alt="Mentor Feed" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          
          {/* AI Subtitles */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={subtitleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-black/70 backdrop-blur-xl p-5 rounded-3xl border border-white/20 text-center min-h-[120px] flex flex-col justify-center shadow-2xl"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="flex gap-1">
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-indigo-400 rounded-full" 
                    />
                    <motion.div 
                      animate={{ opacity: [0.4, 1, 0.4] }} 
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="w-1.5 h-1.5 bg-indigo-400 rounded-full" 
                    />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">AI Live Transcription</span>
                </div>
                <p className="text-white text-xl font-medium leading-relaxed tracking-wide">
                  {currentSubtitle}
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-6 bg-indigo-400 ml-1 align-middle" 
                  />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* User Small Feed */}
          <div className="absolute top-6 right-6 w-48 aspect-video bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl">
            {isCamOn ? (
              <img src="https://picsum.photos/seed/user_live/300/200" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                <VideoOff size={32} />
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-[10px] text-white font-bold">
              You
            </div>
          </div>

          {/* Toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={cn(
                "p-3 rounded-full transition-all",
                isMicOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-rose-500 text-white hover:bg-rose-600"
              )}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button 
              onClick={() => setIsCamOn(!isCamOn)}
              className={cn(
                "p-3 rounded-full transition-all",
                isCamOn ? "bg-white/20 text-white hover:bg-white/30" : "bg-rose-500 text-white hover:bg-rose-600"
              )}
            >
              {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>
            <div className="w-px h-8 bg-white/20 mx-2" />
            <button className="p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-all">
              <Monitor size={20} />
            </button>
            <button className="p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-all">
              <Layout size={20} />
            </button>
            <button className="p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-all">
              <Settings size={20} />
            </button>
            <div className="w-px h-8 bg-white/20 mx-2" />
            <button className="p-3 bg-rose-500 text-white hover:bg-rose-600 rounded-full transition-all shadow-lg shadow-rose-500/40">
              <PhoneOff size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="w-full md:w-96 flex flex-col gap-4">
        <div className="flex-1 glass-card flex flex-col overflow-hidden min-h-[500px] md:min-h-0">
          <div className="flex border-b border-slate-100">
            <button className="flex-1 py-4 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50">Chat</button>
            <button className="flex-1 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50">Q&A</button>
            <button className="flex-1 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50">Participants</button>
          </div>

          <div className="p-4 border-b border-slate-100 bg-indigo-50/30">
            <button 
              onClick={handleSummarize}
              disabled={isSummarizing}
              className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Sparkles size={14} className={isSummarizing ? "animate-pulse" : ""} />
              {isSummarizing ? "Generating Summary..." : "AI Session Summary"}
            </button>
            <AnimatePresence>
              {sessionSummary && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-3 p-3 bg-white rounded-xl border border-indigo-100 text-[11px] text-slate-600 leading-relaxed"
                >
                  <p className="font-bold text-indigo-600 mb-1">Key Takeaways:</p>
                  {sessionSummary}
                  <button 
                    onClick={() => setSessionSummary(null)}
                    className="mt-2 text-indigo-600 font-bold hover:underline"
                  >
                    Dismiss
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((chat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{chat.user}</span>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <div className={cn(
                  "p-3 rounded-2xl rounded-tl-none text-sm",
                  chat.user === 'You' ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-600"
                )}>
                  {chat.msg}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..." 
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
                  <Smile size={18} />
                </button>
              </div>
              <button 
                onClick={handleSendMessage}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-shadow shadow-lg shadow-indigo-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center justify-between bg-indigo-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-medium opacity-80">Active Participants</p>
              <p className="text-lg font-bold">128 Students</p>
            </div>
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-white overflow-hidden">
                <img src={`https://picsum.photos/seed/p${i}/32/32`} alt="" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
