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
    label: `${i.toString().padStart(2, '0')}:00 - ${i.toString().padStart(2, '0')}:59`
  }));

  const activePair = SUPPORTED_PAIRS.find(p => p.symbol === selectedPair) || SUPPORTED_PAIRS[0];

  return (
    <div id="pair-selector-panel" className="luxurious-glass rounded-3xl p-5 sm:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.85)] border border-[#e5c17d]/15 bg-[#030606]/40 relative overflow-hidden">
      {/* Visual luxury accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#e5c17d]/20 to-transparent" />
      
      <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4.5 w-4.5 text-[#e5c17d]" />
          <h2 className="font-luxury text-sm font-bold text-[#e2e8f0] uppercase tracking-widest">
            {lang === 'en' ? 'VIP Algorithmic Configurator' : 'ভিআইপি অ্যালগরিদম কনফিগারেটর'}
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[#e5c17d] tracking-widest font-bold font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
          SECURE ENGINE
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* Market Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider">
            <Globe className="h-4 w-4 text-[#e5c17d]" />
            Select OTC Pair
          </label>
          <div className="relative">
            <select
              id="pair-selector"
              value={selectedPair}
              onChange={(e) => onPairChange(e.target.value)}
              className="w-full rounded-xl border border-zinc-850 bg-[#090e0e]/95 px-3.5 py-3 font-mono text-xs font-semibold text-white outline-none focus:border-[#e5c17d]/50 focus:ring-1 focus:ring-[#e5c17d]/20 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.5)] appearance-none"
            >
              {SUPPORTED_PAIRS.map((pair) => (
                <option key={pair.symbol} value={pair.symbol} className="bg-[#050808] text-white font-mono">
                  {pair.flag} {pair.symbol} ({pair.payout}%)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#e5c17d]">
              <span className="text-[10px]">&#9662;</span>
            </div>
          </div>
          <span className="text-[10px] text-zinc-500 italic mt-0.5 pl-1 font-mono">
            Payout: <span className="text-emerald-400 font-bold">{activePair.payout}%</span> &bull; {activePair.name}
          </span>
        </div>

        {/* Expiry / TF Selection */}
        <div className="flex flex-col gap-1.5 font-mono">
          <label className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider">
            <Hourglass className="h-4 w-4 text-[#e5c17d] animate-pulse" />
            Signal Expiry Length
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {EXPIRY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onExpiryChange(opt)}
                className={`rounded-xl border py-2.5 px-1 font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedExpiry === opt
                    ? 'border-[#e5c17d] bg-gradient-to-b from-[#e5c17d]/15 to-[#e5c17d]/5 text-[#e5c17d] shadow-[0_0_15px_rgba(229,193,125,0.25)] font-black'
                    : 'border-zinc-850 bg-[#090e0e]/50 text-zinc-400 hover:border-[#e5c17d]/20 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 italic mt-0.5 pl-1">
            Trade execution timeframe
          </span>
        </div>

        {/* Target Hour Selection */}
        <div className="flex flex-col gap-1.5 font-mono">
          <label className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-zinc-400 uppercase tracking-wider">
            <Calendar className="h-4 w-4 text-[#e5c17d]" />
            Target Signal Hour (Dhaka)
          </label>
          <div className="relative">
            <select
              id="hour-selector"
              value={selectedHour}
              onChange={(e) => onHourChange(parseInt(e.target.value))}
              className="w-full rounded-xl border border-zinc-850 bg-[#090e0e]/95 px-3.5 py-3 font-mono text-xs font-semibold text-white outline-none focus:border-[#e5c17d]/50 focus:ring-1 focus:ring-[#e5c17d]/20 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.5)] appearance-none"
            >
              {hoursList.map((hr) => (
                <option key={hr.val} value={hr.val} className="bg-[#050808] text-white font-mono">
                  {hr.label} {hr.val === currentHourDhaka ? ' (Current)' : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#e5c17d]">
              <span className="text-[10px]">&#9662;</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 mt-1">
            <button
              type="button"
              onClick={() => onHourChange(currentHourDhaka)}
              className="text-[10px] text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
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
            whileTap={isGenerating || isAlreadyGenerated ? undefined : { scale: 0.96 }}
            onClick={isAlreadyGenerated ? undefined : onTriggerGenerate}
            disabled={isGenerating || isAlreadyGenerated}
            className={`relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl font-mono text-xs font-black tracking-widest transition-all duration-300 focus:outline-none cursor-pointer px-4 py-3.5 border ${
              isAlreadyGenerated
                ? 'bg-zinc-900/30 text-zinc-500 border-zinc-850 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#e5c17d] to-[#aa8c2c] text-black hover:brightness-110 focus:ring-2 focus:ring-[#e5c17d]/40 shadow-[0_6px_25px_rgba(229,193,125,0.3)] animate-luxury-pulse'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating 
              ? (lang === 'en' ? 'ENGINE PROCESSING...' : 'অ্যালগরিদম প্রসেসিং...') 
              : isAlreadyGenerated 
              ? (lang === 'en' ? 'BOT STREAM ACTIVE' : 'বট সিগন্যাল সক্রিয় আছে') 
              : (lang === 'en' ? 'GENERATE 10 SIGNALS' : '১০টি সিগন্যাল জেনারেট করুন')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
