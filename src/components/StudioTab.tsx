import React, { useState } from 'react';
import { Search, Cpu, Layers, ShoppingBag, CheckCircle2, RefreshCw } from 'lucide-react';

const MARKET_ITEMS = [
  { id: 'm1', title: 'Neon-V Skin Suite', price: 450, tags: ['Identity', 'Rare'], img: 'bg-gradient-to-tr from-pink-500 to-rose-700' },
  { id: 'm2', title: 'Core-X Node Key', price: 12500, tags: ['Access', 'Elite'], img: 'bg-gradient-to-tr from-indigo-500 to-blue-700' },
  { id: 'm3', title: 'VFX Booster Pack', price: 120, tags: ['Studio', 'Utility'], img: 'bg-gradient-to-tr from-amber-500 to-orange-600' },
  { id: 'm4', title: 'Holo-Badge "Pioneer"', price: 850, tags: ['Badge', 'Epic'], img: 'bg-gradient-to-tr from-emerald-500 to-teal-700' }
];

export const StudioTab = ({ lyqBalance, inventory, handleBuyItem, handleSellItem }: any) => {
  const [subTab, setSubTab] = useState('market'); // 'market' | 'inventory'

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white mb-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Marketplace</h2>
          <p className="text-slate-500 text-sm">Buy, sell & trade digital assets.</p>
        </div>
        <button className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">
          <Search size={20} />
        </button>
      </section>

      <div className="flex gap-2 mb-8 bg-[#191C2B] p-1.5 rounded-2xl border border-white/5">
        <button 
          onClick={() => setSubTab('market')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${subTab === 'market' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Store
        </button>
        <button 
          onClick={() => setSubTab('inventory')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${subTab === 'inventory' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
        >
          My Assets ({inventory.length})
        </button>
      </div>

      {subTab === 'market' && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-[2.5rem] shadow-xl relative overflow-hidden group cursor-pointer">
              <Cpu className="absolute -bottom-4 -right-4 text-white/10 group-hover:scale-125 transition-transform" size={100} />
              <h4 className="text-white font-black italic uppercase text-xs tracking-widest mb-1">Trending</h4>
              <p className="text-indigo-200 text-[10px] font-bold uppercase">Neon-V Suite</p>
            </div>
            <div className="bg-[#191C2B] border border-white/5 p-6 rounded-[2.5rem] shadow-xl flex flex-col justify-between cursor-pointer hover:border-indigo-500/20 transition-all">
              <Layers className="text-indigo-500 mb-4" size={24} />
              <div>
                <h4 className="text-white font-black italic uppercase text-xs tracking-widest mb-1">Balance</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase">{lyqBalance.toLocaleString('de-DE', { minimumFractionDigits: 2 })} LYQ</p>
              </div>
            </div>
          </div>

          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Exklusive Drops</h3>
          <div className="grid grid-cols-1 gap-6">
            {MARKET_ITEMS.map((item) => {
              const isOwned = inventory.some((i: any) => i.id === item.id);
              const canAfford = lyqBalance >= item.price;
              
              return (
                <div key={item.id} className="group bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-white/10 transition-all">
                  <div className={`w-full md:w-32 h-32 ${item.img} group-hover:scale-105 transition-transform duration-700`}></div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md text-slate-400">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-white font-black italic uppercase text-base">{item.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-indigo-400 font-black italic text-sm uppercase">{item.price.toLocaleString('de-DE')} LYQ</span>
                      {isOwned ? (
                        <button disabled className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 size={14} /> Owned
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBuyItem(item)}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${canAfford ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                        >
                          <ShoppingBag size={14} /> Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {subTab === 'inventory' && (
        <>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Your Digital Assets</h3>
          {inventory.length === 0 ? (
            <div className="text-center py-12 bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem]">
              <Layers size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 font-bold">No assets owned yet.</p>
              <p className="text-slate-500 text-xs mt-2">Visit the store to acquire items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {inventory.map((item: any) => (
                <div key={item.id} className="group bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-white/10 transition-all">
                  <div className={`w-full md:w-32 h-32 ${item.img} group-hover:scale-105 transition-transform duration-700`}></div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {item.tags.map((tag: string) => (
                          <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md text-slate-400">{tag}</span>
                        ))}
                      </div>
                      <h4 className="text-white font-black italic uppercase text-base">{item.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-slate-500 font-black italic text-xs uppercase">Est. Value: {(item.price * 0.8).toLocaleString('de-DE')} LYQ</span>
                      <button 
                        onClick={() => handleSellItem(item)}
                        className="px-4 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        <RefreshCw size={14} /> Sell
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
