import React from 'react';
import { 
  Award, 
  Plus, 
  RefreshCw, 
  Send, 
  MessageSquare, 
  Compass, 
  Users, 
  Globe, 
  ShieldCheck, 
  Key, 
  ChevronRight 
} from 'lucide-react';

const communityEvents = [
  { id: 1, title: 'Mainframe Meetup', type: 'Event', cost: '50 LYQ', status: 'Verfügbar', color: 'bg-indigo-500' },
  { id: 2, title: 'Beta-Access: Studio', type: 'Access', cost: 'Privat', status: 'Freigeschaltet', color: 'bg-emerald-500' },
  { id: 3, title: 'Voting: Design v2', type: 'Governance', cost: '0 LYQ', status: 'Aktiv', color: 'bg-purple-500' },
];

export const HubTab = ({ 
  userProfile, 
  lyqBalance, 
  isRefreshing, 
  refreshStatus, 
  setIsTransferOpen, 
  setIsLobbyOpen 
}: any) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Identity Section */}
      <section className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-600 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#0F111A] rounded-[1.35rem] flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.avatarSeed}`} alt="Avatar" className="w-12 h-12" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0F111A]"></div>
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tight text-white">{userProfile.username}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-[9px] text-indigo-400 font-black uppercase tracking-widest">Core Member</span>
              <span className="flex items-center gap-1 text-[9px] text-slate-500 font-black uppercase tracking-widest"><Award size={10} /> Rank 12</span>
            </div>
          </div>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl border border-white/10 text-indigo-400 hover:bg-indigo-500/10 transition-colors">
          <Plus size={24} />
        </button>
      </section>

      {/* Token Hub Card */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 mb-10 shadow-2xl shadow-indigo-500/30 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 italic">Ecosystem Credits</p>
              <p className="text-indigo-200 text-[9px] font-bold tracking-tighter uppercase">Netzwerk-Bestätigt</p>
            </div>
            <button onClick={refreshStatus} className={`p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
              <RefreshCw size={14} className="text-indigo-100" />
            </button>
          </div>
          <div className="flex items-baseline gap-3 mb-8">
            <h3 className="text-6xl font-black text-white italic tracking-tighter leading-none">
              {lyqBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-xl font-bold text-indigo-200 tracking-tighter">LYQ</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setIsTransferOpen(true)} className="bg-white text-indigo-700 font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
              <Send size={16} /> Transfer
            </button>
            <button className="bg-indigo-500/40 backdrop-blur-md text-white border border-white/20 font-black py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:bg-indigo-500/60 transition-all active:scale-95">
              <MessageSquare size={16} /> Support
            </button>
          </div>
        </div>
      </section>

      {/* Utility Grid */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
          <Compass size={14} className="text-indigo-500" /> Schnellzugriff
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setIsLobbyOpen(true)} className="bg-[#191C2B] p-6 rounded-[2.2rem] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group shadow-sm">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
              <Users size={20} />
            </div>
            <h4 className="font-bold text-sm mb-1 text-white">Lobby</h4>
            <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-black">14.2k Online</p>
          </div>
          <div className="bg-[#191C2B] p-6 rounded-[2.2rem] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group shadow-sm">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
              <Globe size={20} />
            </div>
            <h4 className="font-bold text-sm mb-1 text-white">World</h4>
            <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-black">3 Nodes Aktiv</p>
          </div>
        </div>
      </section>

      {/* Utility & Access List */}
      <section className="mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" /> Aktive Berechtigungen
        </h3>
        <div className="space-y-4">
          {communityEvents.map(event => (
            <div key={event.id} className="bg-[#191C2B]/50 border border-white/5 p-5 rounded-[2.2rem] flex items-center justify-between group cursor-pointer hover:bg-[#1E2135] transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${event.color} rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-black/20 group-hover:rotate-12 transition-transform`}>
                  <Key size={18} />
                </div>
                <div>
                  <h4 className="font-black italic text-sm text-slate-200 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{event.title}</h4>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter opacity-70 italic">{event.type} • {event.cost}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
