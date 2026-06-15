import React from 'react';
import { motion } from 'motion/react';
import { DayStats } from '../types';
import { AreaChart, TrendingUp, TrendingDown, Target, ShieldAlert, Sparkles, AlertTriangle, Zap } from 'lucide-react';

interface StatsDashboardProps {
  stats: DayStats;
  pair: string;
  expiry: string;
  lang: 'en' | 'bn';
}

export default function StatsDashboard({ stats, pair, expiry, lang }: StatsDashboardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Target/Fidelity Rate Visual */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-xl border border-emerald-950/40 bg-zinc-900/20 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
      >
        <div className="absolute top-0 right-0 h-16 w-16 -translate-y-4 translate-x-4 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
          <Sparkles className="h-3.5 w-3.5" />
          {lang === 'en' ? 'Signal Fidelity Score' : 'সিগন্যাল এক্যুরেসি স্কোর'}
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-mono text-3xl font-extrabold text-white tracking-tight glow-emerald">
            98.8%
          </span>
          <span className="text-[10px] text-emerald-500 font-bold font-mono">
            MAX
          </span>
        </div>
        {/* Animated Custom Progress Bar */}
        <div className="h-2 w-full bg-zinc-950 rounded-full mt-3 overflow-hidden border border-zinc-800/40">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `98.8%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
          />
        </div>
        <p className="text-[10px] text-zinc-500 mt-2">
          {lang === 'en' 
            ? 'Optimized under strict binary-reversal filters' 
            : 'কঠিন বাইনারি-রিভার্সাল ফিল্টার দ্বারা ভেরিফাইড'}
        </p>
      </motion.div>

      {/* Target Market Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/20 p-4"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
          <Target className="h-3.5 w-3.5 text-emerald-400" />
          {lang === 'en' ? 'Asset Configuration' : 'ট্রেড অ্যাসেট কনফিগারেশন'}
        </div>
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="font-mono text-xl font-extrabold text-white leading-none">
            {pair}
          </span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-3 pt-2 border-t border-zinc-850">
          <span>Timeframe:</span>
          <span className="text-emerald-400 font-extrabold font-mono uppercase bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
            {expiry}
          </span>
        </div>
      </motion.div>

      {/* COMPULSORY MTG COMPLIANCE WARNING */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-xl border border-red-950/50 bg-red-950/10 p-4"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest font-mono">
          <AlertTriangle className="h-3.5 w-3.5 text-red-500 animate-pulse" />
          {lang === 'en' ? 'MTG Trading Required' : 'মার্টিঙ্গেল ব্যবহার আবশ্যক'}
        </div>
        <p className="text-[11px] text-zinc-300 mt-2 leading-relaxed">
          {lang === 'en' 
            ? 'If the 1st Trade closes in a loss, you MUST place double trade amount on MTG-1 instant next candle.' 
            : '১ম ট্রেড লস হওয়ার সাথে সাথেই পরবর্তী ক্যান্ডেলে অবশ্যই দ্বিগুণ অ্যামাউন্ট দিয়ে MTG-1 নিবেন।'}
        </p>
      </motion.div>

      {/* OTC Market Trend Rating */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/20 p-4"
      >
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
          <AreaChart className="h-3.5 w-3.5 text-emerald-400" />
          OTC Volatility Trend
        </div>
        <div className="flex items-center gap-2 mt-2">
          {stats.trend === 'UPWARD' && (
            <>
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-emerald-400 font-mono uppercase">Strong Bullish</div>
                <div className="text-[10px] text-zinc-500">Stable buying cycles</div>
              </div>
            </>
          )}
          {stats.trend === 'DOWNWARD' && (
            <>
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <TrendingDown className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-rose-400 font-mono uppercase">Strong Bearish</div>
                <div className="text-[10px] text-zinc-500">Stable selling cycles</div>
              </div>
            </>
          )}
          {stats.trend === 'SIDEWAYS' && (
            <>
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <TrendingUp className="h-4 w-4 rotate-45" />
              </div>
              <div>
                <div className="text-sm font-bold text-orange-400 font-mono uppercase">Sideways Range</div>
                <div className="text-[10px] text-zinc-500">Reversal cycles ideal</div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
