import React, { useState, useEffect, useMemo } from 'react';
import { Search, Cpu, Layers, ShoppingBag, CheckCircle2, RefreshCw, AlertCircle, X } from 'lucide-react';

const MARKET_ITEMS = [
  { 
    id: 'm1', 
    title: 'Neon-V Skin Suite', 
    price: 450, 
    tags: ['Identity', 'Rare'], 
    img: 'bg-gradient-to-tr from-pink-500 to-rose-700',
    description: 'A vibrant, cyberpunk-inspired skin suite that alters your digital presence with neon accents.',
    stats: { aesthetics: '+15', visibility: '+10' },
    properties: ['Animated Glow', 'Custom Emotes']
  },
  { 
    id: 'm2', 
    title: 'Core-X Node Key', 
    price: 12500, 
    tags: ['Access', 'Elite'], 
    img: 'bg-gradient-to-tr from-indigo-500 to-blue-700',
    description: 'An elite cryptographic key granting access to restricted core nodes and premium features.',
    stats: { security: '+50', bandwidth: '+25' },
    properties: ['Bypass Level 3', 'Encrypted Comm']
  },
  { 
    id: 'm3', 
    title: 'VFX Booster Pack', 
    price: 120, 
    tags: ['Studio', 'Utility'], 
    img: 'bg-gradient-to-tr from-amber-500 to-orange-600',
    description: 'A collection of high-quality visual effects to enhance your studio productions.',
    stats: { rendering: '+5', creativity: '+10' },
    properties: ['Particle Systems', 'Lens Flares']
  },
  { 
    id: 'm4', 
    title: 'Holo-Badge "Pioneer"', 
    price: 850, 
    tags: ['Badge', 'Epic'], 
    img: 'bg-gradient-to-tr from-emerald-500 to-teal-700',
    description: 'An exclusive holographic badge awarded to early adopters and pioneers of the network.',
    stats: { reputation: '+20', influence: '+5' },
    properties: ['Holographic Projection', 'Account Flair']
  }
];

const getTagColor = (tag: string) => {
  switch (tag) {
    case 'Elite': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    case 'Epic': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
    case 'Rare': return 'bg-pink-500/20 text-pink-400 border border-pink-500/30';
    case 'Utility': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    default: return 'bg-white/5 text-slate-400 border border-white/10';
  }
};

const rarityScore = (tags: string[]) => {
  if (tags.includes('Elite')) return 4;
  if (tags.includes('Epic')) return 3;
  if (tags.includes('Rare')) return 2;
  if (tags.includes('Utility')) return 1;
  return 0;
};

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex gap-1 flex-wrap">
    {tags.map((tag: string) => (
      <span key={tag} className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${getTagColor(tag)}`}>{tag}</span>
    ))}
  </div>
);

export const StudioTab = ({ lyqBalance, inventory, handleBuyItem, handleSellItem }: any) => {
  const [subTab, setSubTab] = useState('market'); // 'market' | 'inventory' | 'nfts'
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onBuy = (item: any) => {
    const result = handleBuyItem(item);
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
  };

  const onSell = (item: any) => {
    const result = handleSellItem(item);
    setToast({ message: result.message, type: result.success ? 'success' : 'error' });
  };

  const filteredAndSortedItems = useMemo(() => {
    return [...MARKET_ITEMS].filter(item => {
      const query = searchQuery.toLowerCase();
      const matchesQuery = !query || 
        item.title.toLowerCase().includes(query) || 
        item.tags.some(tag => tag.toLowerCase().includes(query));
      
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchesPrice = item.price >= min && item.price <= max;

      return matchesQuery && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rarity-desc') return rarityScore(b.tags) - rarityScore(a.tags);
      return 0;
    });
  }, [searchQuery, minPrice, maxPrice, sortBy]);

  const renderEmptyState = (icon: React.ReactNode, title: string, subtitle: string) => (
    <div className="text-center py-12 bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem]">
      <div className="mx-auto text-slate-600 mb-4 flex justify-center">{icon}</div>
      <p className="text-slate-400 font-bold">{title}</p>
      <p className="text-slate-500 text-xs mt-2">{subtitle}</p>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300 ${toast.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      <section className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white mb-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Marketplace</h2>
          <p className="text-slate-500 text-sm">Buy, sell & trade digital assets.</p>
        </div>
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`p-3 rounded-2xl border transition-all ${isSearchOpen ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
          <Search size={20} />
        </button>
      </section>

      {isSearchOpen && (
        <div className="mb-8 bg-[#191C2B] p-4 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Search Title or Tag</label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Neon, Epic..."
                className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Min Price (LYQ)</label>
                <input 
                  type="number" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">Max Price (LYQ)</label>
                <input 
                  type="number" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-8 bg-[#191C2B] p-1.5 rounded-2xl border border-white/5">
        {['market', 'inventory', 'nfts'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${subTab === tab ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab === 'market' ? 'Store' : tab === 'inventory' ? `My Assets (${inventory.length})` : 'NFT Gallery'}
          </button>
        ))}
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

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Exklusive Drops</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#191C2B] border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rarity-desc">Rarity: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredAndSortedItems.length === 0 ? (
              renderEmptyState(<Search size={48} />, "No items found.", "Try adjusting your search criteria.")
            ) : (
              filteredAndSortedItems.map((item) => {
                const isOwned = inventory.some((i: any) => i.id === item.id);
                const canAfford = lyqBalance >= item.price;
                
                return (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="group bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className={`w-full md:w-32 h-32 ${item.img} group-hover:scale-105 transition-transform duration-700`}></div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="mb-2"><TagList tags={item.tags} /></div>
                        <h4 className="text-white font-black italic uppercase text-base">{item.title}</h4>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-indigo-400 font-black italic text-sm uppercase">{item.price.toLocaleString('de-DE')} LYQ</span>
                        {isOwned ? (
                          <button 
                            disabled 
                            onClick={(e) => e.stopPropagation()}
                            className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                          >
                            <CheckCircle2 size={14} /> Owned
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onBuy(item);
                            }}
                            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${canAfford ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
                          >
                            <ShoppingBag size={14} /> Buy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {subTab === 'inventory' && (
        <>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Your Digital Assets</h3>
          {inventory.length === 0 ? (
            renderEmptyState(<Layers size={48} />, "No assets owned yet.", "Visit the store to acquire items.")
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {inventory.map((item: any) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#191C2B]/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="absolute top-4 right-4 z-10 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 size={10} /> Owned Asset
                  </div>
                  <div className={`w-full md:w-32 h-32 ${item.img} group-hover:scale-105 transition-transform duration-700`}></div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-2"><TagList tags={item.tags} /></div>
                      <h4 className="text-white font-black italic uppercase text-base">{item.title}</h4>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-slate-500 font-black italic text-xs uppercase">Est. Value: {(item.price * 0.8).toLocaleString('de-DE')} LYQ</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSell(item);
                        }}
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
      {subTab === 'nfts' && (
        <>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Your NFT Collection</h3>
          {inventory.length === 0 ? (
            renderEmptyState(<Layers size={48} />, "No NFTs owned yet.", "Visit the store to acquire items.")
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {inventory.map((item: any, index: number) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="group bg-[#191C2B] border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-xl cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className={`w-full aspect-square ${item.img} group-hover:scale-110 transition-transform duration-700`}></div>
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[8px] font-black text-white tracking-widest">
                      #{Math.abs(item.id.charCodeAt(0) * 123 + index * 999).toString().padStart(4, '0')}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={10} /> Owned
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-black italic uppercase text-sm truncate">{item.title}</h4>
                    <div className="mt-2"><TagList tags={item.tags} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#191C2B] border border-white/10 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className={`w-full h-48 ${selectedItem.img} relative`}>
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-3"><TagList tags={selectedItem.tags} /></div>
              
              <h3 className="text-2xl font-black italic uppercase text-white mb-2">{selectedItem.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{selectedItem.description}</p>
              
              {selectedItem.stats && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedItem.stats).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">{key}</div>
                        <div className="text-indigo-400 font-black">{value as React.ReactNode}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedItem.properties && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Properties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.properties.map((prop: string) => (
                      <span key={prop} className="text-xs font-bold text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-indigo-400 font-black italic text-lg uppercase">{selectedItem.price.toLocaleString('de-DE')} LYQ</span>
                {inventory.some((i: any) => i.id === selectedItem.id) ? (
                  <button 
                    onClick={() => {
                      onSell(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="px-6 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <RefreshCw size={16} /> Sell Item
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      onBuy(selectedItem);
                      setSelectedItem(null);
                    }}
                    disabled={lyqBalance < selectedItem.price}
                    className={`px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all ${lyqBalance >= selectedItem.price ? 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                  >
                    <ShoppingBag size={16} /> Buy Item
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
