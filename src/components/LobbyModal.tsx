import React from 'react';
import { Users, X, Plus, Send } from 'lucide-react';

export const LobbyModal = ({ setIsLobbyOpen, userProfile }: any) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLobbyOpen(false)}></div>
      <div className="relative w-full h-[85vh] sm:h-[600px] max-w-lg bg-[#191C2B] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] flex flex-col animate-in slide-in-from-bottom-8 duration-300 shadow-2xl overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full sm:hidden z-10"></div>
        
        {/* Lobby Header */}
        <div className="p-6 pt-10 sm:pt-6 bg-[#1A1C2E] border-b border-white/5 flex justify-between items-center z-10 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center">
              <Users size={20}/>
            </div>
            <div>
              <h3 className="text-lg font-black italic uppercase text-white">Global Lobby</h3>
              <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> 14.2k Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsLobbyOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full"><X size={20}/></button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0F111A]/50">
          {[
            { user: 'Node_Admin', time: '14:22', msg: 'Willkommen in Phase 2, Leute! Staking yields sind live.', role: 'Admin', color: 'text-rose-400', bg: 'bg-rose-500/10' },
            { user: 'CryptoNinja', time: '14:25', msg: 'Hab grad gevotet. Cloud rendering für alle! 🚀', role: 'Member', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { user: 'Sarah_X', time: '14:26', msg: 'Weiß jemand, wann der Neon Skin droppt?', role: 'Member', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { user: userProfile.username, time: 'Gerade eben', msg: 'Laut Roadmap im nächsten Update. Halte meine LYQ bereit.', role: 'Core', color: 'text-emerald-400', bg: 'bg-emerald-500/10', seed: userProfile.avatarSeed }
          ].map((chat, i) => (
            <div key={i} className={`flex gap-3 ${chat.user === userProfile.username ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.seed || chat.user}`} alt={chat.user} className="w-full h-full" />
              </div>
              <div className={`flex flex-col ${chat.user === userProfile.username ? 'items-end' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-black italic text-slate-300">{chat.user}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-widest ${chat.bg} ${chat.color}`}>{chat.role}</span>
                  <span className="text-[8px] text-slate-600 font-black">{chat.time}</span>
                </div>
                <div className={`p-4 text-sm font-medium ${chat.user === userProfile.username ? 'bg-indigo-600 text-white rounded-[1.5rem] rounded-tr-none' : 'bg-[#191C2B] text-slate-300 rounded-[1.5rem] rounded-tl-none border border-white/5'} shadow-sm`}>
                  {chat.msg}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#1A1C2E] border-t border-white/5">
          <div className="flex items-center gap-2 bg-[#0F111A] rounded-full p-2 border border-white/5 focus-within:border-indigo-500/50 transition-colors">
            <button className="p-2 text-slate-500 hover:text-indigo-400 transition-colors"><Plus size={18}/></button>
            <input type="text" placeholder="Nachricht an die Lobby..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-600 font-medium" />
            <button className="p-2.5 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"><Send size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};
