import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OTCSignal } from '../types';
import { Send, Copy, Check, MessageSquare, Award, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface TelegramConverterProps {
  signals: OTCSignal[];
  pair: string;
  expiry: string;
  hour: number;
  date: string;
  savedSignalResults: Record<string, 'WIN' | 'LOSS' | 'MTG_WIN' | undefined>;
  lang: 'en' | 'bn';
}

export default function TelegramConverter({ 
  signals, 
  pair, 
  expiry, 
  hour, 
  date,
  savedSignalResults,
  lang
}: TelegramConverterProps) {
  const [activeTab, setActiveTab] = useState<'signals' | 'report'>('report');
  const [copied, setCopied] = useState(false);

  // 1. ORIGINAL SIGNALS LIST FORMAT
  const getTelegramSignalsListFormat = () => {
    const marketName = pair.includes('(') ? pair : `${pair} (OTC)`;
    const signalLines = signals.map((sig) => {
      const dirStr = sig.direction === 'CALL' ? 'CALL (UP)' : 'PUT (DOWN)';
      return `\`🕘 ${sig.time} ➜ ${dirStr}\``;
    }).join('\n');

    return `🤖 QUOTEX OTC FUTURES SIGNALS 🤖

🗓 Date: ${date}
📊 Market: ${marketName}

⏳ Expiry: ${expiry}
🕘 Hour Slot: ${hour.toString().padStart(2, '0')}:00 - ${hour.toString().padStart(2, '0')}:59 (UTC+6)

🎯 Target: Win on Direct or
1-Step Martingale (M1)

⚡ TODAY'S HOURLY GENERATED SIGNALS

${signalLines}

⚠️ MONEY MANAGEMENT

• Risk 1–2% per trade.
• If loss, apply M1 on next candle.
• Practice on Demo first.

💸 Happy Trading! 🚀

🔥 Powered by Premium OTC Signal Bot`;
  };

  // 2. DYNAMIC CHANNEL RESULTS REPORT FORMAT (Requested 1-10 with percentage win rate)
  const getTelegramResultsReportFormat = () => {
    let winCount = 0;
    let totalTicked = 0;

    const marketName = pair.includes('(') ? pair : `${pair} (OTC)`;

    const resultsList = signals.map((sig) => {
      const outcome = savedSignalResults[sig.id];
      let outcomeText = '⏳';
      if (outcome === 'WIN') {
        outcomeText = '✅';
        winCount++;
        totalTicked++;
      } else if (outcome === 'LOSS') {
        outcomeText = '❌';
        totalTicked++;
      } else if (outcome === 'MTG_WIN') {
        outcomeText = '✅¹';
        winCount++;
        totalTicked++;
      }

      const dirStr = sig.direction === 'CALL' ? 'CALL' : 'PUT ';
      return `🕘 ${sig.time} ➜ ${dirStr} ➜ ${outcomeText}`;
    });

    const winRate = totalTicked > 0 ? Math.round((winCount / totalTicked) * 100) : 100;

    const rawLines = [
      `🏆 QUOTEX OTC SIGNAL RESULTS 🏆`,
      ``,
      `🗓 Date    : ${date}`,
      `📊 Market  : ${marketName}`,
      `⏳ Expiry  : ${expiry}`,
      ``,
      `📈 HOURLY RESULTS`,
      ``,
      ...resultsList,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `📊 Accuracy Rate ➜ 🔥 ${winRate}% (${winCount}/${totalTicked} Wins)`,
      `💰 Recovered, compound profits daily!`,
      ``,
      `🔥 Premium OTC Signal Bot`,
      `💸 Happy Trading! 🚀`
    ];

    // Align with Quote block (>) and Monospace (backticks) for each line
    return rawLines.map(line => line === '' ? '>' : `> \`${line}\``).join('\n');
  };

  const getFormatToCopy = () => {
    return activeTab === 'signals' ? getTelegramSignalsListFormat() : getTelegramResultsReportFormat();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormatToCopy());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Compute stats on actual saved signals
  let directWinsCount = 0;
  let mtgWinsCount = 0;
  let lossesCount = 0;
  let totalSaved = 0;

  signals.forEach(sig => {
    const r = savedSignalResults[sig.id];
    if (r === 'WIN') {
      directWinsCount++;
      totalSaved++;
    } else if (r === 'MTG_WIN') {
      mtgWinsCount++;
      totalSaved++;
    } else if (r === 'LOSS') {
      lossesCount++;
      totalSaved++;
    }
  });

  const liveAccuracy = totalSaved > 0 ? Math.round(((directWinsCount + mtgWinsCount) / totalSaved) * 100) : 0;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-5">
      {/* Panel Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            {lang === 'en' ? 'Telegram Broadcast Center' : 'টেলিগ্রাম ব্রডকাস্ট সেন্টার'}
          </h2>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center justify-center gap-1.5 w-fit">
          <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
          {lang === 'en' ? 'SOHID VIP Report Engine' : 'সোহিদ ভিআইপি রিপোর্ট ইঞ্জিন'}
        </span>
      </div>

      {/* Dynamic Counter Row representing your saved parameters */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 text-center">
          <div className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
            {lang === 'en' ? 'SAVED ACCURACY' : 'সেভড এক্যুরেসি'}
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {totalSaved > 0 ? `${liveAccuracy}%` : 'N/A'}
          </div>
          <div className="text-[8px] text-zinc-600 font-mono mt-0.5 uppercase">
            {totalSaved} {lang === 'en' ? 'Signals rated' : 'সিগন্যাল সেভড'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 text-center">
          <div className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
            {lang === 'en' ? 'DIRECT WINS' : 'ডাইরেক্ট উইন'}
          </div>
          <div className="text-xl font-black text-emerald-500 font-mono mt-1">
            {directWinsCount}
          </div>
          <div className="text-[8px] text-zinc-600 font-mono mt-0.5 uppercase">
            {lang === 'en' ? 'No martingale' : 'মার্টিঙ্গেল ছাড়া'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 text-center">
          <div className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
            {lang === 'en' ? 'MTG-1 WINS' : 'এমটিজি-১ উইন'}
          </div>
          <div className="text-xl font-black text-yellow-500 font-mono mt-1">
            {mtgWinsCount}
          </div>
          <div className="text-[8px] text-zinc-600 font-mono mt-0.5 uppercase">
            {lang === 'en' ? 'Recovered' : 'রিকভারি ট্রেড'}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 text-center">
          <div className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">
            {lang === 'en' ? 'SAVED LOSSES' : 'সেভড লস'}
          </div>
          <div className="text-xl font-black text-rose-500 font-mono mt-1">
            {lossesCount}
          </div>
          <div className="text-[8px] text-zinc-600 font-mono mt-0.5 uppercase">
            {lang === 'en' ? 'Discipline' : 'ডিসিপ্লিনড ট্রেড'}
          </div>
        </div>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed">
        {lang === 'en'
          ? 'Tap on the options above to select results. Once you save individual results in the cards above, they instantly recalculate accuracy metrics and populate the broadcast group card below.'
          : 'সিগন্যাল কার্ডে ডাইরেক্ট উইন, লস বা এমটিজি-১ সিলেক্ট করে এবং সেভ এ চাপ দেওয়ার পর নিচে রিপোর্টের এক্যুরেসি রেট, লস ও উইন ভ্যালু লাইভ পরিবর্তিত হবে।'}
      </p>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 rounded-xl border border-zinc-900">
        <button
          type="button"
          onClick={() => {
            setActiveTab('report');
            setCopied(false);
          }}
          className={`py-2 text-[11px] font-mono font-bold tracking-wider rounded-lg transition-all cursor-pointer uppercase ${
            activeTab === 'report'
              ? 'bg-emerald-500 text-black font-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          🏆 {lang === 'en' ? 'RESULTS REPORT' : 'ফলাফল রিপোর্ট'} ({totalSaved > 0 ? `${liveAccuracy}%` : '100%'})
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('signals');
            setCopied(false);
          }}
          className={`py-2 text-[11px] font-mono font-bold tracking-wider rounded-lg transition-all cursor-pointer uppercase ${
            activeTab === 'signals'
              ? 'bg-emerald-500 text-black font-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          ⚡ {lang === 'en' ? 'SIGNALS LIST (BEFORE)' : 'সিগন্যাল লিস্ট (পূর্বে)'}
        </button>
      </div>

      {/* Preview Terminals */}
      <div className="relative">
        <textarea
          id="telegram-markdown-output"
          readOnly
          value={getFormatToCopy()}
          rows={11}
          className="w-full rounded-xl border border-zinc-850 bg-zinc-950/90 p-4 font-mono text-[10.5px] leading-relaxed text-zinc-350 focus:outline-none focus:border-zinc-700 resize-none custom-scrollbar"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none rounded-b-xl" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="text-[10px] font-mono text-zinc-500">
          {lang === 'en'
            ? '* Copied text carries the Markdown formatting block that renders as Monospace on Telegram.'
            : '* কপিকৃত লেখাটি টেলিগ্রামে পেস্ট করলে স্বয়ংক্রিয়ভাবে Monospace (স্পেসড ফন্ট) হিসেবে শো করবে।'}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer w-full sm:w-auto ${
            copied
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {lang === 'en' ? 'COPIED IN SECURE MONOSPACE!' : 'মনোস্পেসে কপি হয়েছে!'}
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              {lang === 'en' ? 'COPY MONOSPACE BROADCAST' : 'মনোস্পেস ব্রডকাস্ট কপি করুন'}
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
