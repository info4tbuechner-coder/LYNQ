import React from 'react';
import { Fingerprint, Zap, ShieldCheck, Star, Vote, ShoppingBag, Trophy, Lock } from 'lucide-react';

const BADGES = [
  { id: 'b1', title: 'First Vote', description: 'Participated in governance.', icon: Vote, requirement: (stats: any) => stats.votesCast >= 1, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: 'b2', title: 'Active Citizen', description: 'Cast 5 votes.', icon: Vote, requirement: (stats: any) => stats.votesCast >= 5, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'b3', title: 'First Trade', description: 'Completed a marketplace transaction.', icon: ShoppingBag, requirement: (stats: any) => stats.tradesCompleted >= 1, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'b4', title: 'Market Maker', description: 'Completed 5 marketplace transactions.', icon: ShoppingBag, requirement: (stats: any) => stats.tradesCompleted >= 5, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'b5', title: 'High Roller', description: 'Spent over 1,000 LYQ.', icon: Zap, requirement: (stats: any) => stats.lyqSpent >= 1000, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { id: 'b6', title: 'Early Adopter', description: 'Joined the ecosystem.', icon: ShieldCheck, requirement: (stats: any) => stats.logins >= 1, color: 'text-blue-400', bg: 'bg-blue-500/10' },
];

export const IdentityTab = ({ userProfile, setEditForm, setIsProfileEditOpen, stats }: any) => {
  const unlockedBadges = BADGES.filter(b => b.requirement(stats));
  const lockedBadges = BADGES.filter(b => !b.requirement(stats));
  
  // Calculate level based on stats
  const totalPoints = (stats.votesCast * 10) + (stats.tradesCompleted * 20) + Math.floor(stats.lyqSpent / 100);
  const currentLevel = Math.floor(totalPoints / 100) + 1;
  const pointsToNextLevel = 100 - (totalPoints % 100);
  const progressPercentage = (totalPoints % 100);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-10 text-center">
        <div className="inline-block relative mb-6">
          <div className="w-32 h-32 rounded-[2.8rem] bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mx-auto shadow-2xl shadow-indigo-500/30">
            <div className="w-full h-full bg-[#0F111A] rounded-[2.5rem] flex items-center justify-center overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.avatarSeed}`} alt="Avatar" className="w-24 h-24" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-indigo-500 p-3 rounded-2xl border-4 border-[#0F111A] text-white shadow-xl">
            <Fingerprint size={20} />
          </div>
        </div>
        <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">{userProfile.username}</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">{userProfile.bio} <span className="text-indigo-500">#0042</span></p>
        <div className="flex justify-center items-center gap-3 mt-4">
          <button onClick={() => { setEditForm(userProfile); setIsProfileEditOpen(true); }} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-colors">
            Profil bearbeiten
          </button>
        </div>
      </section>

      <section className="p-8 bg-[#191C2B]/50 rounded-[2.5rem] border border-white/5 shadow-inner mb-10">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xs font-black uppercase text-white italic tracking-widest">Progress Level</h4>
          <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">Level {currentLevel}</span>
        </div>
        <div className="space-y-6">
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-pulse" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
            <p className="text-slate-500 italic">Noch <span className="text-white">{pointsToNextLevel} Points</span> zum Upgrade</p>
            <p className="text-indigo-400">{totalPoints} Total Points</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Trophy size={16} className="text-amber-400" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">Achievements & Badges</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {unlockedBadges.map((badge) => (
            <div key={badge.id} className="bg-[#191C2B] border border-white/10 rounded-[2rem] p-5 flex flex-col items-center text-center relative overflow-hidden group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${badge.bg} ${badge.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <badge.icon size={24} />
              </div>
              <h4 className="text-white font-black italic uppercase text-[10px] tracking-widest mb-1">{badge.title}</h4>
              <p className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">{badge.description}</p>
            </div>
          ))}
          
          {lockedBadges.map((badge) => (
            <div key={badge.id} className="bg-[#191C2B]/40 border border-white/5 rounded-[2rem] p-5 flex flex-col items-center text-center relative overflow-hidden opacity-50 grayscale">
              <div className="absolute top-3 right-3 text-slate-600">
                <Lock size={12} />
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-white/5 text-slate-500">
                <badge.icon size={24} />
              </div>
              <h4 className="text-slate-400 font-black italic uppercase text-[10px] tracking-widest mb-1">{badge.title}</h4>
              <p className="text-slate-600 text-[8px] font-bold uppercase tracking-wider">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
