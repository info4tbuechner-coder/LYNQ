import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Settings, 
  Bell,
  Zap,
  Fingerprint,
  Vote,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

import { HubTab } from './components/HubTab';
import { ExploreTab } from './components/ExploreTab';
import { StudioTab } from './components/StudioTab';
import { IdentityTab } from './components/IdentityTab';
import { ConfigTab } from './components/ConfigTab';
import { TransferModal } from './components/TransferModal';
import { LobbyModal } from './components/LobbyModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { Onboarding } from './components/Onboarding';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('hub');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lyqBalance, setLyqBalance] = useState(1234.56);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [voted, setVoted] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    username: 'New_Resident',
    bio: 'Core Hub Resident',
    avatarSeed: 'Resident_42'
  });
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);

  // Settings States
  const [bioAuth, setBioAuth] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  // Modal States
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isLobbyOpen, setIsLobbyOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');

  // Marketplace State
  const [inventory, setInventory] = useState<any[]>([]);

  // Achievements & Stats State
  const [stats, setStats] = useState({
    votesCast: 0,
    tradesCompleted: 0,
    lyqSpent: 0,
    logins: 1
  });

  const handleBuyItem = (item: any) => {
    if (inventory.find(i => i.id === item.id)) {
      return { success: false, message: 'Item already owned.' };
    }
    if (lyqBalance < item.price) {
      return { success: false, message: 'Insufficient LYQ balance.' };
    }
    
    setLyqBalance(prev => prev - item.price);
    setInventory(prev => [...prev, item]);
    setStats(prev => ({
      ...prev,
      tradesCompleted: prev.tradesCompleted + 1,
      lyqSpent: prev.lyqSpent + item.price
    }));
    return { success: true, message: `Successfully purchased ${item.title}.` };
  };

  const handleSellItem = (item: any) => {
    if (!inventory.find(i => i.id === item.id)) {
      return { success: false, message: 'Item not found in inventory.' };
    }
    
    setLyqBalance(prev => prev + item.price * 0.8);
    setInventory(prev => prev.filter(i => i.id !== item.id));
    setStats(prev => ({
      ...prev,
      tradesCompleted: prev.tradesCompleted + 1
    }));
    return { success: true, message: `Successfully sold ${item.title}.` };
  };

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1200);
  }, []);

  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLyqBalance(prev => prev + (Math.random() * 2));
      setIsRefreshing(false);
    }, 1000);
  };

  const handleVote = () => {
    setVoted(true);
    setStats(prev => ({
      ...prev,
      votesCast: prev.votesCast + 1
    }));
    setTimeout(() => setVoted(false), 3000);
  };

  const notifications = [
    { id: 1, title: 'Staking Reward', desc: '+ 12.50 LYQ erhalten', time: 'Gerade eben', icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: 2, title: 'Governance', desc: 'Studio Phase 2 bestätigt', time: 'Vor 1 Std', icon: Vote, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { id: 3, title: 'Security', desc: 'Neuer Login erkannt (Node 42)', time: 'Vor 2 Std', icon: ShieldCheck, color: 'text-yellow-400', bg: 'bg-yellow-400/10' }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0F111A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl rotate-45 animate-spin mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
            <Zap className="text-white -rotate-45" size={32} />
          </div>
          <h1 className="text-white font-black tracking-[0.3em] text-2xl animate-pulse uppercase">LYNIQ</h1>
          <p className="text-indigo-500 text-[9px] uppercase tracking-[0.4em] mt-4 font-bold">Initialisiere Ecosystem...</p>
        </div>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={() => setHasCompletedOnboarding(true)} userProfile={userProfile} setUserProfile={setUserProfile} />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'hub':
        return <HubTab userProfile={userProfile} lyqBalance={lyqBalance} isRefreshing={isRefreshing} refreshStatus={refreshStatus} setIsTransferOpen={setIsTransferOpen} setIsLobbyOpen={setIsLobbyOpen} />;
      case 'explore':
        return <ExploreTab voted={voted} handleVote={handleVote} />;
      case 'studio':
        return <StudioTab lyqBalance={lyqBalance} inventory={inventory} handleBuyItem={handleBuyItem} handleSellItem={handleSellItem} />;
      case 'id':
        return <IdentityTab userProfile={userProfile} setEditForm={setEditForm} setIsProfileEditOpen={setIsProfileEditOpen} stats={stats} />;
      case 'config':
        return <ConfigTab bioAuth={bioAuth} setBioAuth={setBioAuth} pushNotif={pushNotif} setPushNotif={setPushNotif} />;
      default:
        return <div className="text-center text-slate-500 mt-20">In Entwicklung...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F111A] text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F111A]/80 backdrop-blur-xl px-6 py-5 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Zap size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight leading-none italic uppercase">LYNIQ</span>
            <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest italic leading-none mt-1">Ecosystem Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
            className={`p-2.5 rounded-full border transition-all relative ${isNotificationsOpen ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'}`}
          >
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(244,63,94,0.8)]"></span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 bg-white/5 rounded-full text-slate-400 border border-white/10 hover:text-white hover:bg-white/10 transition-all">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
             <div className="absolute top-14 right-0 w-80 bg-[#1A1C2E] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#191C2B]">
                   <h3 className="text-xs font-black uppercase text-white tracking-widest">Aktivitäten</h3>
                   <span className="text-[9px] text-indigo-400 font-bold cursor-pointer">Alle gelesen</span>
                </div>
                <div className="max-h-96 overflow-y-auto p-2">
                   {notifications.map(notif => (
                      <div key={notif.id} className="flex gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer group">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.bg} ${notif.color} group-hover:scale-110 transition-transform`}>
                            <notif.icon size={16} />
                         </div>
                         <div>
                            <h4 className="text-white text-xs font-black italic tracking-wide">{notif.title}</h4>
                            <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{notif.desc}</p>
                            <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-2">{notif.time}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0F111A] pt-28 px-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          {['Ecosystem', 'Identity', 'Governance', 'Studio', 'Vault'].map((item) => (
            <button key={item} className="block text-5xl font-black text-slate-800 hover:text-indigo-400 transition-all hover:translate-x-3 uppercase italic tracking-tighter">
              {item}
            </button>
          ))}
          <div className="pt-12 border-t border-white/5 flex flex-col gap-2">
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">LYNIQ Studio Group © 2024</p>
            <p className="text-indigo-500/50 text-[10px] font-black uppercase tracking-[0.2em]">Ecosystem Status: Connected_Secure</p>
          </div>
        </div>
      )}

      <main className="pt-28 pb-44 px-6 max-w-2xl mx-auto min-h-screen">
        {renderContent()}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 bg-[#1A1C2E]/90 backdrop-blur-3xl border border-white/10 p-2.5 rounded-[2.8rem] shadow-2xl flex justify-between items-center max-w-2xl mx-auto border-t border-indigo-500/20">
        {[
          { id: 'hub', icon: LayoutDashboard, label: 'Hub' },
          { id: 'explore', icon: Vote, label: 'Vote' },
          { id: 'studio', icon: ShoppingBag, label: 'Shop' },
          { id: 'id', icon: Fingerprint, label: 'Ident' },
          { id: 'config', icon: Settings, label: 'Set' }
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-[2rem] transition-all duration-300 ${activeTab === item.id ? 'text-indigo-400 bg-indigo-400/10 shadow-[inset_0_0_15px_rgba(99,102,241,0.05)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} className={activeTab === item.id ? 'scale-110' : 'scale-100'} />
            <span className="text-[8px] uppercase font-black tracking-widest leading-none mt-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Security Info Overlay Footer */}
      <div className="px-10 pb-44 text-center mt-10">
        <div className="inline-flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Core Secure v4.0.2</span>
          </div>
          <p className="text-[8px] text-slate-800 font-black uppercase tracking-[0.4em] mt-2">Verified Ecosystem Hub • Node 42-X</p>
        </div>
      </div>

      {/* Modals */}
      {isTransferOpen && <TransferModal setIsTransferOpen={setIsTransferOpen} transferAmount={transferAmount} setTransferAmount={setTransferAmount} lyqBalance={lyqBalance} />}
      {isLobbyOpen && <LobbyModal setIsLobbyOpen={setIsLobbyOpen} userProfile={userProfile} />}
      <ProfileEditModal isProfileEditOpen={isProfileEditOpen} setIsProfileEditOpen={setIsProfileEditOpen} editForm={editForm} setEditForm={setEditForm} setUserProfile={setUserProfile} />
    </div>
  );
};

export default App;
