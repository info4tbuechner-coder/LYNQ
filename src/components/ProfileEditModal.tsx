import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const ProfileEditModal = ({ isProfileEditOpen, setIsProfileEditOpen, editForm, setEditForm, setUserProfile }: any) => {
  if (!isProfileEditOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsProfileEditOpen(false)}></div>
      <div className="relative w-full max-w-lg bg-[#191C2B] border border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 animate-in slide-in-from-bottom-8 duration-300 shadow-2xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full sm:hidden"></div>
        <div className="flex justify-between items-center mb-8 mt-4 sm:mt-0">
          <h3 className="text-xl font-black italic uppercase text-white">Profil bearbeiten</h3>
          <button onClick={() => setIsProfileEditOpen(false)} className="text-slate-500 hover:text-white transition-colors"><XCircle size={24}/></button>
        </div>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 block">Username</label>
            <input 
              type="text" 
              value={editForm.username}
              onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              className="w-full bg-[#0F111A] border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 block">Bio</label>
            <input 
              type="text" 
              value={editForm.bio}
              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
              className="w-full bg-[#0F111A] border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2 block">Avatar Seed (DiceBear)</label>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#0F111A] flex items-center justify-center overflow-hidden shrink-0">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${editForm.avatarSeed}`} alt="Preview" className="w-10 h-10" />
              </div>
              <input 
                type="text" 
                value={editForm.avatarSeed}
                onChange={(e) => setEditForm({...editForm, avatarSeed: e.target.value})}
                className="flex-1 bg-[#0F111A] border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            setUserProfile(editForm);
            setIsProfileEditOpen(false);
          }}
          className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Speichern <CheckCircle2 size={16}/>
        </button>
      </div>
    </div>
  );
};
