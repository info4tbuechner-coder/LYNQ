import React from 'react';
import { Vote, CheckCircle2 } from 'lucide-react';

export const ExploreTab = ({ voted, handleVote }: any) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-10">
        <h2 className="text-3xl font-black italic uppercase text-white mb-2 leading-none">Governance</h2>
        <p className="text-slate-500 text-sm">Bestimme die Roadmap mit deinen LYQ Credits.</p>
      </section>

      <div className="bg-[#191C2B] rounded-[2.5rem] border border-indigo-500/20 p-8 mb-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <Vote size={120} />
        </div>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block italic">VOTING AKTIV</span>
        <h3 className="text-xl font-black text-white uppercase italic mb-4 leading-tight">Studio-Erweiterung: Phase 2</h3>
        <p className="text-slate-400 text-xs mb-8 leading-relaxed">Investition von <span className="text-white">500k LYQ</span> in Cloud-Rendering Kapazitäten für alle Member mit Rang 10+.</p>
        
        <div className="space-y-4">
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[72%] shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="text-indigo-400">Ja (72%)</span>
            <span>1.2M LYQ gestaked</span>
          </div>
          <button 
            onClick={handleVote}
            disabled={voted}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl ${voted ? 'bg-emerald-500 text-white' : 'bg-white text-indigo-900 hover:scale-[1.02]'}`}
          >
            {voted ? <><CheckCircle2 size={18}/> Stimme gezählt</> : <><Vote size={18}/> Jetzt Abstimmen</>}
          </button>
        </div>
      </div>

      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 mt-10 italic">Vergangene Entscheidungen</h3>
      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Community Fund #12', votes: '4.2k', status: 'Approved', color: 'text-emerald-400' },
          { title: 'Dark Mode Pro Upgrade', votes: '12k', status: 'In Review', color: 'text-yellow-400' }
        ].map((item, idx) => (
          <div key={idx} className="p-6 bg-[#191C2B]/40 rounded-[2.2rem] border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-[#191C2B]">
            <div>
              <h4 className="font-black italic text-sm text-slate-200 uppercase tracking-tight">{item.title}</h4>
              <p className="text-[9px] text-slate-500 font-black uppercase mt-1 tracking-widest">{item.votes} LYQ • {item.status}</p>
            </div>
            <div className={item.color}><CheckCircle2 size={20} /></div>
          </div>
        ))}
      </div>
    </div>
  );
};
