import React from 'react';
import { motion } from 'motion/react';
import { OTCMarketPair } from '../types';
import { Globe, Hourglass, Calendar, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const SUPPORTED_PAIRS: OTCMarketPair[] = [
  { symbol: 'USD/BDT (OTC)', name: 'US Dollar / Bangladeshi Taka', payout: 96, flag: '🇧🇩' },
  { symbol: 'USD/MXN (OTC)', name: 'US Dollar / Mexican Peso', payout: 95, flag: '🇲🇽' },
  { symbol: 'EUR/USD (OTC)', name: 'Euro / US Dollar', payout: 92, flag: '🇪🇺' },
  { symbol: 'GBP/USD (OTC)', name: 'British Pound / US Dollar', payout: 91, flag: '🇬🇧' },
  { symbol: 'USD/INR (OTC)', name: 'US Dollar / Indian Rupee', payout: 93, flag: '🇮🇳' },
  { symbol: 'USD/BRL (OTC)', name: 'US Dollar / Brazilian Real', payout: 89, flag: '🇧🇷' },
  { symbol: 'USD/TRY (OTC)', name: 'US Dollar / Turkish Lira', payout: 88, flag: '🇹🇷' },
  { symbol: 'GBP/JPY (OTC)', name: 'British Pound / Japanese Yen', payout: 92, flag: '🇯🇵' }
];

export const EXPIRY_OPTIONS = ['1 Min', '2 Min', '3 Min'];

interface PairSelectorProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
  selectedExpiry: string;
  onExpiryChange: (expiry: string) => void;
  selectedHour: number;
  onHourChange: (hour: number) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  currentHourDhaka: number;
  onTriggerGenerate: () => void;
  isGenerating: boolean;
  isAlreadyGenerated: boolean;
  lang: 'en' | 'bn';
}

export default function PairSelector({
  selectedPair,
  onPairChange,
  selectedExpiry,
  onExpiryChange,
  selectedHour,
  onHourChange,
  selectedDate,
  onDateChange,
  currentHourDhaka,
  onTriggerGenerate,
  isGenerating,
  isAlreadyGenerated,
  lang
}: PairSelectorProps) {
  
  // Format local inputs
  const hoursList = Array.from({ length: 24 }, (_, i) => ({
    val: i,
    label: `${i.toString().padStart(2, '0')}:00 - ${(i).toString().padStart(2, '0')}:59`
  }));

  const activePair = SUPPORTED_PAIRS.find(p => p.symbol === selectedPair) || SUPPORTED_PAIRS[0];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-5">
        <SlidersHorizontal className="h-5 w-5 text-emerald-400" />
        <h2 className="font-mono text-base font-bold text-white uppercase tracking-wider">
          Configuration Control Panel
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* Market Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            Select OTC Pair
          </label>
          <div className="relative">
            <select
              id="pair-selector"
              value={selectedPair}
              onChange={(e) => onPairChange(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 font-mono text-xs font-semibold text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
            >
              {SUPPORTED_PAIRS.map((pair) => (
                <option key={pair.symbol} value={pair.symbol} className="bg-zinc-950 text-white">
                  {pair.flag} {pair.symbol} ({pair.payout}%)
                </option>
              ))}
            </select>
          </div>
          <span className="text-[10px] text-zinc-500 italic mt-0.5 pl-1">
            Payout: {activePair.payout}% &bull; {activePair.name}
          </span>
        </div>

        {/* Expiry / TF Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            <Hourglass className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            Signal Expiry Length
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {EXPIRY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onExpiryChange(opt)}
                className={`rounded-lg border px-1 py-2 font-mono text-xs font-bold transition-all ${
                  selectedExpiry === opt
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-400 italic mt-0.5 pl-1">
            Trade execution timeframe
          </span>
        </div>

        {/* Target Hour Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5 text-emerald-400" />
            Target Signal Hour (Dhaka)
          </label>
          <div className="relative">
            <select
              id="hour-selector"
              value={selectedHour}
              onChange={(e) => onHourChange(parseInt(e.target.value))}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 font-mono text-xs font-semibold text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
            >
              {hoursList.map((hr) => (
                <option key={hr.val} value={hr.val} className="bg-zinc-950 text-white">
                  {hr.label} {hr.val === currentHourDhaka ? ' (Current)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between px-1 mt-0.5">
            <button
              type="button"
              onClick={() => onHourChange(currentHourDhaka)}
              className="text-[10px] text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
            >
              Reset to Current
            </button>
            <button
              type="button"
              onClick={() => onHourChange((currentHourDhaka + 1) % 24)}
              className="text-[10px] text-zinc-400 hover:text-white cursor-pointer"
            >
              Select Next Hour
            </button>
          </div>
        </div>

        {/* Trigger Generator Button */}
        <div className="flex flex-col justify-end pt-1">
          <motion.button
            whileTap={isGenerating || isAlreadyGenerated ? undefined : { scale: 0.97 }}
            onClick={isAlreadyGenerated ? undefined : onTriggerGenerate}
            disabled={isGenerating || isAlreadyGenerated}
            className={`relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl font-mono text-xs font-bold tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black cursor-pointer px-4 py-3 ${
              isAlreadyGenerated
                ? 'bg-zinc-900/60 text-zinc-500 border border-zinc-800 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:brightness-110 focus:ring-emerald-400 shadow-[0_4px_15px_rgba(16,185,129,0.35)]'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating 
              ? (lang === 'en' ? 'CALCULATING ENGINE...' : 'আলগোরিদম প্রসেসিং...') 
              : isAlreadyGenerated 
              ? (lang === 'en' ? 'ALREADY GENERATED' : 'ইতিমধ্যে জেনারেট করা হয়েছে') 
              : (lang === 'en' ? 'GENERATE 10 SIGNALS' : '১০টি সিগন্যাল জেনারেট করুন')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
