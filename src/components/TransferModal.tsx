import React from 'react';
import { XCircle, ArrowRight } from 'lucide-react';

export const TransferModal = ({ setIsTransferOpen, transferAmount, setTransferAmount, lyqBalance }: any) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTransferOpen(false)}></div>
      <div className="relative w-full max-w-lg bg-[#191C2B] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom-8 duration-300 shadow-2xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full sm:hidden"></div>
        <div className="flex justify-between items-center mb-8 mt-4 sm:mt-0">
          <h3 className="text-xl font-black italic uppercase text-white">Transfer LYQ</h3>
          <button onClick={() => setIsTransferOpen(false)} className="text-slate-500 hover:text-white transition-colors"><XCircle size={24}/></button>
        </div>
        
        <div className="bg-[#0F111A] rounded-[2rem] p-6 mb-6 border border-white/5 flex flex-col items-center">
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-4">Betrag eingeben</p>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="0.00" 
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="bg-transparent text-5xl font-black text-white text-center w-48 outline-none placeholder:text-slate-700"
              autoFocus
            />
          </div>
          <p className="text-indigo-400 font-bold text-xs mt-4">Max: {lyqBalance.toFixed(2)} LYQ</p>
        </div>

        <div className="space-y-3 mb-8">
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest px-2">Kürzliche Kontakte</p>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {['Neon_Ninja', 'Sarah_X', 'Node_Admin', 'Vault_Bot'].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-0.5 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all">
                  <div className="w-full h-full bg-[#191C2B] rounded-full flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl ${Number(transferAmount) > 0 ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}>
          Senden bestätigen <ArrowRight size={16}/>
        </button>
      </div>
    </div>
  );
};
