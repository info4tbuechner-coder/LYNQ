import React from 'react';
import { Wallet, Smartphone, ToggleRight, Wifi, Activity, Bell, HardDrive, RefreshCw, LogOut } from 'lucide-react';

export const ConfigTab = ({ bioAuth, setBioAuth, pushNotif, setPushNotif }: any) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="mb-10">
        <h2 className="text-3xl font-black italic uppercase text-white mb-2 leading-none">Settings</h2>
        <p className="text-slate-500 text-sm">Hardware, Sicherheit & Präferenzen.</p>
      </section>

      {/* Wallet & Auth */}
      <section className="mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 italic">Security & Access</h3>
        <div className="bg-[#191C2B] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                <Wallet size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Wallet Connection</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">0x1A4...f9B</p>
              </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-full hover:bg-rose-500/20 transition-colors">Trennung</button>
          </div>
          <div className="flex justify-between items-center cursor-pointer group" onClick={() => setBioAuth(!bioAuth)}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-slate-400 group-hover:text-indigo-400 transition-colors">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Biometrische Auth</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">FaceID / TouchID</p>
              </div>
            </div>
            {bioAuth ? <ToggleRight size={28} className="text-indigo-500" /> : <ToggleRight size={28} className="text-slate-600 rotate-180" />}
          </div>
        </div>
      </section>

      {/* Network & System */}
      <section className="mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 italic">System Status</h3>
        <div className="bg-[#191C2B] border border-white/5 rounded-[2.5rem] p-6 space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                <Wifi size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Active Node</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">EU-Central-1 • Ping: 14ms</p>
              </div>
            </div>
            <Activity size={18} className="text-emerald-500 animate-pulse" />
          </div>
          <div className="flex justify-between items-center pb-6 border-b border-white/5 cursor-pointer group" onClick={() => setPushNotif(!pushNotif)}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-slate-400 group-hover:text-indigo-400 transition-colors">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Push Notifications</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">Ecosystem Updates</p>
              </div>
            </div>
            {pushNotif ? <ToggleRight size={28} className="text-indigo-500" /> : <ToggleRight size={28} className="text-slate-600 rotate-180" />}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-slate-400">
                <HardDrive size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Lokaler Cache</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-0.5">Belegt: 42.5 MB</p>
              </div>
            </div>
            <button className="text-indigo-400 hover:text-white transition-colors"><RefreshCw size={18}/></button>
          </div>
        </div>
      </section>

      <button className="w-full p-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all">
        <LogOut size={16} /> Device abmelden
      </button>
    </div>
  );
};
