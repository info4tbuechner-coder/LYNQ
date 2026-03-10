import React, { useState } from 'react';
import { ChevronRight, Zap, LayoutDashboard, Vote, ShoppingBag, Fingerprint, Dices } from 'lucide-react';

export const Onboarding = ({ onComplete, userProfile, setUserProfile }: any) => {
  const [step, setStep] = useState(0);
  const [localUsername, setLocalUsername] = useState(userProfile.username);
  const [localAvatar, setLocalAvatar] = useState(userProfile.avatarSeed);

  const steps = [
    {
      id: 'welcome',
      icon: Zap,
      title: 'Welcome to LYNIQ',
      desc: 'Your gateway to the decentralized ecosystem. Let us show you around.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      id: 'hub',
      icon: LayoutDashboard,
      title: 'The Hub',
      desc: 'Your central command. Manage your LYQ balance, monitor node status, and transfer assets securely.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      id: 'gov',
      icon: Vote,
      title: 'Governance',
      desc: 'Shape the future of the ecosystem. Vote on active proposals and earn rewards for your participation.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      id: 'market',
      icon: ShoppingBag,
      title: 'Marketplace',
      desc: 'Acquire exclusive digital assets, node keys, and identity skins to upgrade your ecosystem experience.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      id: 'setup',
      icon: Fingerprint,
      title: 'Claim Identity',
      desc: 'Set up your resident profile to initialize your connection to the network.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      isSetup: true
    }
  ];

  const current = steps[step];

  const handleNext = () => {
    if (step === steps.length - 1) {
      setUserProfile({ ...userProfile, username: localUsername, avatarSeed: localAvatar });
      onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  const generateRandomAvatar = () => {
    const seeds = ['Alpha', 'Nexus', 'Cipher', 'Nova', 'Pulse', 'Echo', 'Vertex', 'Onyx'];
    setLocalAvatar(seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 1000));
  };

  return (
    <div className="min-h-screen bg-[#0F111A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-[#191C2B]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Progress indicators */}
        <div className="flex gap-2 mb-10 justify-center">
          {steps.map((s, i) => (
            <div key={s.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-indigo-500' : i < step ? 'w-3 bg-indigo-500/50' : 'w-3 bg-white/10'}`}></div>
          ))}
        </div>

        <div className="flex flex-col items-center text-center min-h-[280px]">
          <div key={current.id} className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 ${current.bg} ${current.color} shadow-2xl transition-all duration-500 animate-in zoom-in-50`}>
            <current.icon size={48} strokeWidth={1.5} />
          </div>
          
          <h2 key={`title-${current.id}`} className="text-3xl font-black italic uppercase text-white tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4">{current.title}</h2>
          <p key={`desc-${current.id}`} className="text-slate-400 text-sm leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-4 delay-100">{current.desc}</p>

          {current.isSetup && (
            <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 delay-200">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#0F111A] border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localAvatar}`} alt="Avatar" className="w-16 h-16" />
                </div>
                <button 
                  onClick={generateRandomAvatar}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-colors"
                >
                  <Dices size={20} />
                </button>
              </div>
              <div className="text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Username</label>
                <input 
                  type="text" 
                  value={localUsername}
                  onChange={(e) => setLocalUsername(e.target.value)}
                  className="w-full bg-[#0F111A] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors mt-1"
                  placeholder="Enter username"
                />
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleNext}
          className="w-full mt-8 bg-indigo-500 hover:bg-indigo-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
        >
          {step === steps.length - 1 ? 'Initialize Connection' : 'Continue'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
