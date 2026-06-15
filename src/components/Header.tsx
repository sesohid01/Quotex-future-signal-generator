import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Clock, Layers, Flame } from 'lucide-react';

interface HeaderProps {
  currentDhakaTime: string;
  currentDhakaDate: string;
  totalSynchronizedUsers: number;
}

export default function Header({ currentDhakaTime, currentDhakaDate, totalSynchronizedUsers }: HeaderProps) {
  return (
    <header className="relative w-full border-b border-emerald-950/40 bg-zinc-950/80 backdrop-blur-md">
      {/* Decorative top ambient neon bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_1px_15px_rgba(16,185,129,0.7)]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
        {/* Brand identity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-70 blur-md animate-pulse" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-400">
              <Cpu className="h-6 w-6 animate-pulse" />
            </div>
            {/* Live Indicator Dot */}
            <span className="absolute right-0 bottom-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono font-black text-zinc-950 bg-gradient-to-r from-emerald-400 to-teal-400 px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse border border-emerald-300/30">
                  DEVELOPED BY SOHID
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
                  PRO BOT V4.5
                </span>
              </div>
              <h1 className="font-mono text-xl font-black tracking-tight text-white sm:text-2xl mt-1">
                SOHID'S <span className="text-emerald-400">QUOTEX OTC</span> <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">FUTURES</span>
              </h1>
            </div>
            <p className="text-[11px] text-zinc-500 tracking-wide mt-0.5">
              SOHID's Custom High-Fidelity Web-Based OTC Bot Engine
            </p>
          </div>
        </motion.div>

        {/* Real-time Clock Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:justify-end"
        >
          {/* UTC+6 Time Container */}
          <div className="flex flex-col items-center sm:items-end rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] px-4 py-2 min-w-[200px]">
            <div className="flex items-center gap-1 text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
              <Clock className="h-3 w-3 animate-spin-slow" />
              Bangladesh Time (UTC+6)
            </div>
            <div className="font-mono text-xl font-bold text-white tracking-widest mt-0.5 glow-emerald">
              {currentDhakaTime}
            </div>
            <div className="text-[10px] text-zinc-400 mt-0.5">
              Date: <span className="text-zinc-300 font-medium font-mono">{currentDhakaDate}</span>
            </div>
          </div>

          {/* SOHID Ownership Verification Badge */}
          <div className="hidden lg:flex flex-col items-start rounded-xl border border-emerald-950/50 bg-emerald-950/10 px-3.5 py-2">
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase tracking-widest font-black">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              SOHID OWNED BOT
            </div>
            <span className="text-xs text-zinc-300 font-mono mt-0.5 font-medium flex items-center gap-1">
              Verified Web-Based &bull; <span className="text-emerald-300 text-[9px] bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-400/30 font-bold">BY SOHID</span>
            </span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
