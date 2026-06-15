import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { OTCSignal } from '../types';
import { ArrowUpRight, ArrowDownRight, Copy, Check, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface SignalCardProps {
  key?: string | number | null;
  signal: OTCSignal;
  currentDhakaTime: Date; // Keep in sync
  lang: 'en' | 'bn';
}

export default function SignalCard({ signal, currentDhakaTime, lang }: SignalCardProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<'PENDING' | 'ACTIVE' | 'WIN' | 'LOSE'>(signal.status);

  // Construct exact UTC milliseconds for the signal start and end
  const urlSafePair = signal.pair.replace(/\//g, '_');
  const [day, month, year] = signal.date.split('/');
  const yr = parseInt(year);
  const mo = parseInt(month) - 1; // 0-indexed for Date.UTC
  const dy = parseInt(day);

  // Dhaka is UTC+6, so we subtract 6 hours to get Universal Time (UTC)
  const signalStartUtcMs = Date.UTC(yr, mo, dy, signal.hour - 6, signal.minute, 0, 0);
  const expiryMinutes = parseInt(signal.expiry.split(' ')[0]) || 1;
  const signalEndUtcMs = signalStartUtcMs + (expiryMinutes * 60 * 1000);

  useEffect(() => {
    const updateCountdown = () => {
      const nowUtcMs = Date.now(); // Universal browser epoch ms

      if (nowUtcMs < signalStartUtcMs) {
        setCurrentStatus('PENDING');
        const diffSecs = Math.floor((signalStartUtcMs - nowUtcMs) / 1000);
        const mins = Math.floor(diffSecs / 60);
        const secs = diffSecs % 60;
        setTimeLeftStr(
          lang === 'en' 
            ? `Starts in ${mins}m ${secs.toString().padStart(2, '0')}s` 
            : `শুরু হবে ${mins}মিঃ ${secs.toString().padStart(2, '0')}সেকেন্ডে`
        );
      } else if (nowUtcMs >= signalStartUtcMs && nowUtcMs <= signalEndUtcMs) {
        setCurrentStatus('ACTIVE');
        const diffSecs = Math.floor((signalEndUtcMs - nowUtcMs) / 1000);
        const mins = Math.floor(diffSecs / 60);
        const secs = diffSecs % 60;
        setTimeLeftStr(
          lang === 'en' 
            ? `Active! Ends in ${mins}m ${secs.toString().padStart(2, '0')}s` 
            : `লাইভ! শেষ হবে ${mins}মিঃ ${secs.toString().padStart(2, '0')}সেকেন্ডে`
        );
      } else {
        setCurrentStatus(signal.status === 'PENDING' || signal.status === 'ACTIVE' ? 'WIN' : signal.status);
        setTimeLeftStr(lang === 'en' ? 'Completed' : 'সম্পন্ন');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [signalStartUtcMs, signalEndUtcMs, signal.status, lang]);

  const handleCopy = () => {
    const isCall = signal.direction === 'CALL';
    const directionName = isCall ? '🟢 CALL (UP)' : '🔴 PUT (DOWN)';
    
    // Convert e.g., "1 Min" or "5 Min" to "1 Minute" or "5 Minutes"
    const expNum = parseInt(signal.expiry.split(' ')[0]) || 1;
    const formattedExpiry = `${expNum} ${expNum === 1 ? 'Minute' : 'Minutes'}`;

    const rawTemplate = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      💎 OTC ELITE SIGNAL 💎
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🕐 Time       ➜ ${signal.time} (UTC+6)
📊 Pair       ➜ ${signal.pair}
📈 Position   ➜ ${directionName}
⏳ Expiry     ➜ ${formattedExpiry}
🎯 Accuracy   ➜ ${signal.accuracy}%

━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Rule:
• Use MTG-1 if first trade loses.
• Enter exactly at signal time.
• Manage your bankroll wisely.

━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Elite Signal Made by SOHID`;

    // Wrap in backticks to guarantee monospace format in Telegram
    const textToCopy = `\`${rawTemplate}\``;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const isCall = signal.direction === 'CALL';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
        currentStatus === 'ACTIVE'
          ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-zinc-900/90'
          : isCall
          ? 'border-zinc-800 bg-zinc-900/40 hover:border-emerald-500/30'
          : 'border-zinc-800 bg-zinc-900/40 hover:border-rose-500/30'
      }`}
    >
      {/* Glow highlight for active item */}
      {currentStatus === 'ACTIVE' && (
        <span className="absolute top-0 right-0 flex h-3 w-3 -translate-y-1 -translate-x-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      )}

      <div className="flex items-center justify-between">
        {/* Date and Expiry Badge */}
        <div className="flex gap-2">
          <span className="text-[10px] font-bold text-zinc-500 font-mono tracking-wider bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
            {signal.date}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">
            {signal.expiry}
          </span>
        </div>

        {/* Accuracy Level */}
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-emerald-400" />
          <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/10 px-1.5 py-0.5 rounded">
            {signal.accuracy}% Acc.
          </span>
        </div>
      </div>

      {/* Main Core Signal Panel */}
      <div className="grid grid-cols-2 gap-2 mt-3.5 items-center">
        {/* Entry Time Info */}
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
            {lang === 'en' ? 'Entry Time' : 'এন্ট্রি টাইম'}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 font-mono">
            <Clock className="h-4 w-4 text-zinc-400" />
            <span className="text-lg font-extrabold text-white tracking-widest leading-none">
              {signal.time}
            </span>
          </div>
        </div>

        {/* Signal Direction (CALL/PUT) */}
        <div className="flex justify-end">
          {isCall ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400 text-xs font-black tracking-wider shadow-[0_2px_10px_rgba(16,185,129,0.15)] uppercase font-mono leading-none">
              <ArrowUpRight className="h-4 w-4 stroke-[3]" />
              CALL (UP)
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-rose-400 text-xs font-black tracking-wider shadow-[0_2px_10px_rgba(239,68,68,0.15)] uppercase font-mono leading-none">
              <ArrowDownRight className="h-4 w-4 stroke-[3]" />
              PUT (DOWN)
            </div>
          )}
        </div>
      </div>

      {/* Warning details on Upcoming or Active */}
      {(currentStatus === 'PENDING' || currentStatus === 'ACTIVE') && (
        <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/20 px-2.5 py-2 mt-3 flex items-start gap-2 text-[10px] text-zinc-400 leading-normal animate-pulse">
          <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-yellow-500 block mb-0.5">
              {lang === 'en' ? 'MTG Warning Sign:' : 'মার্টিঙ্গেল সতর্কবার্তা:'}
            </span>
            {lang === 'en' 
              ? 'If 1st trade ends in loss, instantly take 1st Martingale (MTG-1) on next candle.' 
              : '১ম ট্রেডটি লস হলে সাথে সাথেই পরবর্তী ক্যান্ডেলে দ্বিগুণ ট্রেড ভলিউম নিয়ে MTG-1 নিবেন।'}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3 mt-4">
        {/* Status indicator context */}
        <div>
          {currentStatus === 'PENDING' && (
            <div className="text-[11px] font-bold text-yellow-500 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              {timeLeftStr}
            </div>
          )}
          {currentStatus === 'ACTIVE' && (
            <div className="text-[11px] font-black text-emerald-400 font-mono flex items-center gap-1 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />
              {timeLeftStr}
            </div>
          )}
          {(currentStatus === 'WIN' || currentStatus === 'LOSE') && (
            <div className="text-[11px] font-bold text-zinc-400 font-mono flex items-center gap-1">
              <span className="inline-block bg-zinc-900 border border-zinc-850 text-zinc-400 rounded text-[9px] px-2 py-0.5 font-bold uppercase">
                {lang === 'en' ? '✓ EXPIRED' : '✓ সম্পন্ন'}
              </span>
              <span className="text-[10px] text-zinc-500 font-normal">({signal.expiry})</span>
            </div>
          )}
        </div>

        {/* Copy single button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-emerald-400 cursor-pointer transition-colors"
          title="Copy Signal"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400 font-bold" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  );
}
