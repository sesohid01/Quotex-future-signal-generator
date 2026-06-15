import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getDhakaTimeComponents, 
  generateHourlySignals, 
  generateDayStats, 
  formatDate 
} from './utils/signalGenerator';
import { OTCSignal, DayStats } from './types';
import Header from './components/Header';
import PairSelector, { SUPPORTED_PAIRS } from './components/PairSelector';
import StatsDashboard from './components/StatsDashboard';
import SignalCard from './components/SignalCard';
import TelegramConverter from './components/TelegramConverter';
import TradingGuide from './components/TradingGuide';
import MtgExplanation from './components/MtgExplanation';
import SohidAiOracle from './components/SohidAiOracle';

import { 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Users, 
  TrendingUp, 
  Wifi, 
  Vote, 
  Volume2, 
  VolumeX, 
  Zap, 
  HelpCircle,
  Copy,
  Languages,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function App() {
  // Locale State: 'bn' (Bangla) or 'en' (English)
  const [lang, setLang] = useState<'en' | 'bn'>('bn');

  // Real-time UTC+6 Dhaka Time Tracker
  const [dhakaTime, setDhakaTime] = useState(getDhakaTimeComponents());
  const [liveDateInstance, setLiveDateInstance] = useState<Date>(new Date());

  // Input states
  const [selectedPair, setSelectedPair] = useState<string>('USD/BDT (OTC)');
  const [selectedExpiry, setSelectedExpiry] = useState<string>('1 Min');
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedDateStr, setSelectedDateStr] = useState<string>('');

  // Cache of successfully generated keys to their signals and stats
  const [signalsCache, setSignalsCache] = useState<Record<string, OTCSignal[]>>({});
  const [statsCache, setStatsCache] = useState<Record<string, DayStats>>({});
  
  const currentSelectionKey = `${selectedDateStr || dhakaTime.formattedDate}-${selectedPair}-${selectedHour}-${selectedExpiry}`;
  const isAlreadyGenerated = currentSelectionKey in signalsCache;
  const currentSignals = signalsCache[currentSelectionKey] || [];
  const currentStats = statsCache[currentSelectionKey] || null;

  // Sound effects capability
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Scanner Loading sequence
  const [isGenerating, setIsGenerating] = useState(false);
  const [scannerStep, setScannerStep] = useState(0);

  const scanStepsEn = [
    "Establishing WebSocket Handshake with OTC feed...",
    "Injecting Year-Month-Day-Hour deterministic entropy seed...",
    "Assessing volatility nodes and buy/sell pressure limits...",
    "Running multi-step Martingale backtest verification...",
    "Formulating 10 high-accuracy signal intervals...",
    "Cloud Sync accomplished. Broadcasting signals worldwide!"
  ];

  const scanStepsBn = [
    "OTC ফিডের সাথে নিরাপদ কানেকশন তৈরি করা হচ্ছে...",
    "বছর-মাস-দিন-ঘন্টার ডিটারমিনিস্টিক বীজ ইনজেক্ট করা হচ্ছে...",
    "বাজারের অস্থিরতা এবং ক্রয়ের চাপ বিশ্লেষণ করা হচ্ছে...",
    "মার্টিনগেল ব্যাকটেস্ট ভেরিফিকেশন চালানো হচ্ছে...",
    "১০টি হাই-এক্যুরেসি সিগন্যাল নির্ধারণ করা হচ্ছে...",
    "ক্লাউড সিঙ্ক সম্পন্ন! বিশ্বব্যাপী সিগন্যাল ব্রডকাস্ট করা হচ্ছে।"
  ];

  const scanSteps = lang === 'en' ? scanStepsEn : scanStepsBn;

  // Initialize inputs on load (Do NOT auto-generate signals to respect user request)
  useEffect(() => {
    // Live update Dhaka clock
    const clockInterval = setInterval(() => {
      const nowComponents = getDhakaTimeComponents();
      setDhakaTime(nowComponents);
      setLiveDateInstance(nowComponents.rawDate);
    }, 1000);

    // Default to current Dhaka date & hour
    const initTime = getDhakaTimeComponents();
    setSelectedHour(initTime.hour);
    setSelectedDateStr(initTime.formattedDate);

    return () => clearInterval(clockInterval);
  }, []);

  // Sync signals live state as clock ticks
  useEffect(() => {
    if (isAlreadyGenerated && !isGenerating) {
      // Re-trigger soft updates of the list statuses (pending vs active vs win/lose)
      // without resetting user configuration, so it changes instantly on transition
      const updated = generateHourlySignals(
        selectedDateStr || dhakaTime.formattedDate,
        selectedHour,
        selectedPair,
        selectedExpiry,
        dhakaTime
      );
      setSignalsCache((prev) => ({
        ...prev,
        [currentSelectionKey]: updated
      }));
    }
  }, [dhakaTime.minute, dhakaTime.hour, selectedExpiry, isAlreadyGenerated, currentSelectionKey]);

  // Trigger high-fidelity premium mock signal scanning simulation
  const handleGenerateSignals = () => {
    setIsGenerating(true);
    setScannerStep(0);
    
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        // Beep sequence
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}
    }

    // Cycle through 6 scan steps
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanSteps.length) {
        setScannerStep(currentStep);
        if (soundEnabled) {
          try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(500 + currentStep * 100, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.08);
          } catch (e) {}
        }
      } else {
        clearInterval(interval);
        
        // Finalize state
        const generated = generateHourlySignals(
          selectedDateStr || dhakaTime.formattedDate,
          selectedHour,
          selectedPair,
          selectedExpiry,
          dhakaTime
        );
        const generatedStats = generateDayStats(
          selectedDateStr || dhakaTime.formattedDate,
          selectedPair,
          selectedExpiry
        );

        setSignalsCache((prev) => ({
          ...prev,
          [currentSelectionKey]: generated
        }));
        setStatsCache((prev) => ({
          ...prev,
          [currentSelectionKey]: generatedStats
        }));
        setIsGenerating(false);

        if (soundEnabled) {
          try {
            // Winning double chime
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.25);
          } catch(e) {}
        }
      }
    }, 400); // Super responsive, short but visually clear
  };

  // Switch display date offset (Today, Tomorrow, Yesterday) deterministically
  const handleDateShift = (offset: 'today' | 'tomorrow') => {
    const d = new Date(dhakaTime.rawDate);
    if (offset === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    }
    const formatted = formatDate(d);
    setSelectedDateStr(formatted);
  };

  // Determine current ongoing live active signal count
  const activeSignalsCount = currentSignals.filter(s => s.status === 'ACTIVE').length;
  // Determine upcoming Signals count
  const pendingSignalsCount = currentSignals.filter(s => s.status === 'PENDING').length;

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-white flex flex-col overflow-x-hidden">
      
      {/* Background Matrix-like glow designs */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 h-[350px] w-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      {/* Header and Sync Clock */}
      <Header 
        currentDhakaTime={dhakaTime.formattedTime} 
        currentDhakaDate={selectedDateStr || dhakaTime.formattedDate} 
        totalSynchronizedUsers={146}
      />

      {/* Main Core View Area */}
      <main className="flex-1 px-4 py-6 sm:px-6 lg:py-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Sub-Header bar with language toggle, premium details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-900/50 border border-zinc-900 px-4 py-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {lang === 'en' ? 'Bot Status:' : 'বট স্থিতি:'}{' '}
              <span className="text-emerald-400 font-bold font-mono">
                {lang === 'en' ? 'Lifetime Unlocked' : 'আজীবন আনলকড'}
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Quick Shifters */}
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 px-1 py-1">
              <button
                type="button"
                onClick={() => setSelectedDateStr(dhakaTime.formattedDate)}
                className={`px-3 py-1 text-[10px] font-bold font-mono rounded-md transition-all cursor-pointer ${
                  selectedDateStr === dhakaTime.formattedDate || !selectedDateStr
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Today' : 'আজ'}
              </button>
              <button
                type="button"
                onClick={() => handleDateShift('tomorrow')}
                className={`px-3 py-1 text-[10px] font-bold font-mono rounded-md transition-all cursor-pointer ${
                  selectedDateStr !== dhakaTime.formattedDate && selectedDateStr
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {lang === 'en' ? 'Tomorrow' : 'আগামীকাল'}
              </button>
            </div>

            {/* Audio Feedback Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                  : 'border-zinc-800 text-zinc-500 hover:text-white'
              }`}
              title={soundEnabled ? "Mute Bot Sound" : "Enable Bot Sound"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Premium Language Swapper */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs font-mono font-bold text-zinc-400 hover:text-white hover:border-zinc-700 cursor-pointer transition-all"
            >
              <Languages className="h-3.5 w-3.5 text-emerald-400" />
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
          </div>
        </div>

        {/* Dynamic Analytics Stats Panel */}
        {currentStats && isAlreadyGenerated && (
          <StatsDashboard 
            stats={currentStats} 
            pair={selectedPair} 
            expiry={selectedExpiry} 
            lang={lang}
          />
        )}

        {/* Configurations Selector Panel */}
        <PairSelector
          selectedPair={selectedPair}
          onPairChange={setSelectedPair}
          selectedExpiry={selectedExpiry}
          onExpiryChange={setSelectedExpiry}
          selectedHour={selectedHour}
          onHourChange={setSelectedHour}
          selectedDate={selectedDateStr || dhakaTime.formattedDate}
          onDateChange={setSelectedDateStr}
          currentHourDhaka={dhakaTime.hour}
          onTriggerGenerate={handleGenerateSignals}
          isGenerating={isGenerating}
          isAlreadyGenerated={isAlreadyGenerated}
          lang={lang}
        />

        {/* Gemini Gemini Powered SOHID AI Oracle */}
        <SohidAiOracle
          pair={selectedPair}
          expiry={selectedExpiry}
          currentTimeStr={dhakaTime.formattedTime}
          signals={currentSignals}
          isAlreadyGenerated={isAlreadyGenerated}
          lang={lang}
        />

        {/* Scanning Overlay Animation and Signals Output */}
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-2xl border border-emerald-500/20 bg-zinc-950 p-8 flex flex-col items-center justify-center min-h-[350px] shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden"
            >
              {/* Spinning High Tech Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 animate-pulse" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 border border-emerald-500/20 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/40 animate-spin" style={{ animationDuration: '6s' }} />
                <div className="absolute inset-2 rounded-full border-2 border-dotted border-teal-400/20 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                <Cpu className="h-8 w-8 text-emerald-400 animate-pulse" />
              </div>

              <span className="font-mono text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 mb-4 animate-pulse">
                {lang === 'en' ? 'PRO-ENGINE DIAGNOSTIC' : 'প্রো-ইঞ্জিন ডায়াগনস্টিক'}
              </span>

              <h3 className="font-mono text-base font-bold text-white text-center tracking-tight mb-2 max-w-md h-6 truncate">
                {scanSteps[scannerStep]}
              </h3>

              <div className="w-64 h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((scannerStep + 1) / scanSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="text-[10px] text-zinc-500 font-mono mt-4 flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                {lang === 'en' ? 'Synchronizing all terminals...' : 'সকল ব্রাউজার সিঙ্ক করা হচ্ছে...'}
              </div>
            </motion.div>
          ) : isAlreadyGenerated ? (
            <motion.div
              key="generated-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* 10 Signals Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono text-xs font-black border border-emerald-500/20">
                      10
                    </div>
                    <div>
                      <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">
                        {lang === 'en' ? 'Deterministic Future Signals' : 'ডিটারমিনিস্টিক ফিউচার সিগন্যাল'}
                      </h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {lang === 'en' 
                          ? 'Synchronized perfectly across mobiles & desktops' 
                          : 'সকল মোবাইলে এবং ডেক্সটপে হুবহু একই সময়ে মিলবে'}
                      </p>
                    </div>
                  </div>

                  {/* Active/Pending Indicators */}
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    {activeSignalsCount > 0 && (
                      <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold animate-pulse">
                        ● {activeSignalsCount} {lang === 'en' ? 'LIVE SIGNAL' : 'লাইভ সিগন্যাল'}
                      </span>
                    )}
                    {pendingSignalsCount > 0 && (
                      <span className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-bold">
                        {pendingSignalsCount} {lang === 'en' ? 'PENDING' : 'অপেক্ষমান'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid Layout containing the 10 Signals */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5 font-mono text-zinc-300">
                  {currentSignals.map((sig) => (
                    <SignalCard 
                      key={sig.id} 
                      signal={sig} 
                      currentDhakaTime={liveDateInstance} 
                      lang={lang}
                    />
                  ))}
                </div>
              </div>

              {/* Special Admin & Telegram Tool Section */}
              <TelegramConverter 
                signals={currentSignals} 
                pair={selectedPair} 
                expiry={selectedExpiry} 
                hour={selectedHour} 
                date={selectedDateStr || dhakaTime.formattedDate} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="not-generated"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/10 p-12 text-center flex flex-col items-center justify-center min-h-[300px] shadow-[inset_0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 mb-5 overflow-hidden">
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/10 animate-spin" style={{ animationDuration: '10s' }} />
                <Sparkles className="h-6 w-6 text-emerald-400" />
              </div>
              
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2">
                {lang === 'en' ? 'Signal Stream Offline' : 'সিগন্যাল স্ট্রিম অফলাইন'}
              </h3>
              
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                {lang === 'en' 
                  ? 'Please configure your preferred pair, expiry limit, and target hour, then click the "GENERATE 10 SIGNALS" button to analyze!' 
                  : 'অনুগ্রহ করে প্যানেল থেকে আপনার জোড়া (Pair) ও সময় নির্ধারণ করে "GENERATE 10 SIGNALS" বাটনে ক্লিক করুন! সিগন্যালগুলো সাথে সাথেই প্রসেস হবে।'}
              </p>

              <div className="inline-flex items-center gap-2 mt-6 rounded-lg bg-zinc-950 px-3.5 py-1.5 border border-zinc-900 w-fit">
                <span className="flex h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  {lang === 'en' ? 'SYSTEM IDLE &bull; WAITING FOR GENERATION' : 'সিস্টেম অফলাইন &bull; জেনারেট বাটনে ক্লিক করুন'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Execution Guide Panel */}
        <TradingGuide />

        {/* Live Market Simulation (Immersive visual background effect matching active status) */}
        <div className="rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/10 to-zinc-950 p-4 font-mono text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-emerald-500" />
              <span>
                {lang === 'en' ? 'Live Node Connection Status:' : 'লাইভ নোড কানেকশন স্টেটাস:'}{' '}
                <span className="text-emerald-400 font-bold uppercase">{lang === 'en' ? 'Stable' : 'সংযুক্ত'}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-zinc-500">
              <span>{lang === 'en' ? 'Algorithm:' : 'অ্যালগরিদম:'}</span>
              <span className="text-zinc-450 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 font-bold">
                SEED_LCG_M1_REINFORCE
              </span>
            </div>
          </div>
        </div>

        {/* Special MTG Strategy hub Section (At the absolute bottom as requested) */}
        <MtgExplanation lang={lang} />

      </main>

      {/* Footer credits in margins */}
      <footer className="mt-auto border-t border-zinc-950 bg-zinc-950 py-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-4 space-y-2">
          <p className="font-mono text-xs font-bold text-zinc-400 tracking-widest uppercase">
            &copy; 2026 SOHID'S PREMIUM BOT SYSTEM &bull; ALL RIGHTS RESERVED
          </p>
          <p className="text-[11px] text-emerald-400 font-mono tracking-widest font-black uppercase">
            Created & Developed by SOHID (Master Developer)
          </p>
          <p className="font-mono text-[10px] text-zinc-600 tracking-wide">
            Designed as an elite high-fidelity web-based deterministic OTC engine. Integrates predictive machine intelligence nodes. For informational and study use only.
          </p>
        </div>
      </footer>
    </div>
  );
}
