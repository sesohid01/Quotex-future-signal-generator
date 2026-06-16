import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OTCSignal } from '../types';
import { ArrowUpRight, ArrowDownRight, Copy, Check, Clock, TrendingUp, AlertTriangle, Clipboard, Save } from 'lucide-react';

interface SignalCardProps {
  signal: OTCSignal;
  currentDhakaTime: Date; // Keep in sync
  lang: 'en' | 'bn';
  selectedResult: 'WIN' | 'LOSS' | 'MTG_WIN' | undefined;
  savedResult: 'WIN' | 'LOSS' | 'MTG_WIN' | undefined;
  onResultChange: (signalId: string, result: 'WIN' | 'LOSS' | 'MTG_WIN' | undefined) => void;
  onResultSave: (signalId: string, result: 'WIN' | 'LOSS' | 'MTG_WIN' | undefined) => void;
}

export default function SignalCard({ 
  signal, 
  currentDhakaTime, 
  lang,
  selectedResult,
  savedResult,
  onResultChange,
  onResultSave
}: SignalCardProps) {
  const [copied, setCopied] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');
  const [currentStatus, setCurrentStatus] = useState<'PENDING' | 'ACTIVE' | 'WIN' | 'LOSE'>(signal.status);
  const [isSavedSuccessfully, setIsSavedSuccessfully] = useState(false);

  // Construct exact UTC milliseconds for the signal start and end
  const urlSafePair = signal.pair.replace(/\/g/, '_');
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

  const handleCopyBaseSignal = () => {
    const isCall = signal.direction === 'CALL';
    const directionName = isCall ? '🟢 CALL (UP)' : '🔴 PUT (DOWN)';
    
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

    // Wrap in backticks for standard monospace
    const textToCopy = `\`${rawTemplate}\``;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCopyResultText = (resultVal: 'WIN' | 'LOSS' | 'MTG_WIN') => {
    const isCall = signal.direction === 'CALL';
    const directionName = isCall ? '🟢 CALL (UP)' : '🔴 PUT (DOWN)';

    const expNum = parseInt(signal.expiry.split(' ')[0]) || 1;
    const formattedExpiry = `${expNum} ${expNum === 1 ? 'Minute' : 'Minutes'}`;

    let templateText = '';
    if (resultVal === 'WIN') {
      templateText = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      🏆 OTC ELITE RESULT 🏆
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🕐 Time       ➜ ${signal.time} (UTC+6)
📊 Pair       ➜ ${signal.pair}
📈 Position   ➜ ${directionName}
⏳ Expiry     ➜ ${formattedExpiry}

━━━━━━━━━━━━━━━━━━━━━━━━

✅ RESULT     ➜ 🟢 WIN 🎉

💰 Profit Successfully Booked!
🔥 Congratulations Traders!

━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Elite Signal Made by SOHID`;
    } else if (resultVal === 'LOSS') {
      templateText = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      📉 OTC ELITE RESULT 📉
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🕐 Time       ➜ ${signal.time} (UTC+6)
📊 Pair       ➜ ${signal.pair}
📈 Position   ➜ ${directionName}
⏳ Expiry     ➜ ${formattedExpiry}

━━━━━━━━━━━━━━━━━━━━━━━━

❌ RESULT     ➜ 🔴 LOSS

⚠️ Apply MTG-1 Strategy
💪 Stay Calm & Follow Discipline

━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Elite Signal Made by SOHID`;
    } else {
      templateText = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
      💎 OTC ELITE RESULT 💎
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🕐 Time       ➜ ${signal.time} (UTC+6)
📊 Pair       ➜ ${signal.pair}
📈 Position   ➜ ${directionName}
⏳ Expiry     ➜ ${formattedExpiry}

━━━━━━━━━━━━━━━━━━━━━━━━

✅ RESULT     ➜ 🟡 MTG-1 WIN 🎯

🔥 Recovered Successfully!
💰 Profit Secured.

━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Elite Signal Made by SOHID`;
    }

    // Wrap in backticks to guarantee monospace format in Telegram
    const monospaceText = `\`${templateText}\``;

    navigator.clipboard.writeText(monospaceText);
    setCopiedResult(true);
    setTimeout(() => {
      setCopiedResult(false);
    }, 2000);
  };

  const handleResultToggle = (outcome: 'WIN' | 'LOSS' | 'MTG_WIN') => {
    // Select the outcome
    const newVal = selectedResult === outcome ? undefined : outcome;
    onResultChange(signal.id, newVal);
    
    if (newVal) {
      // Auto-copy instantly on selection with visual confirmation
      handleCopyResultText(newVal);
    }
  };

  const handleSaveResultLocally = () => {
    onResultSave(signal.id, selectedResult);
    setIsSavedSuccessfully(true);
    setTimeout(() => {
      setIsSavedSuccessfully(false);
    }, 2000);
  };

  const isCall = signal.direction === 'CALL';
  const hasChangesToSave = selectedResult !== savedResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl border p-4 transition-all flex flex-col justify-between h-full ${
        currentStatus === 'ACTIVE'
          ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-zinc-900/90'
          : isCall
          ? 'border-zinc-850 bg-zinc-900/30 hover:border-emerald-500/20'
          : 'border-zinc-850 bg-zinc-900/30 hover:border-rose-500/20'
      }`}
    >
      {/* Glow highlight for active item */}
      {currentStatus === 'ACTIVE' && (
        <span className="absolute top-0 right-0 flex h-3 w-3 -translate-y-1 -translate-x-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      )}

      <div>
        <div className="flex items-center justify-between">
          {/* Date and Expiry Badge */}
          <div className="flex gap-1.5">
            <span className="text-[9px] font-bold text-zinc-500 font-mono tracking-wider bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900">
              {signal.date}
            </span>
            <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-wider bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-950/20">
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
        <div className="grid grid-cols-2 gap-2 mt-3 items-center">
          {/* Entry Time Info */}
          <div>
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-mono block">
              {lang === 'en' ? 'Entry Time' : 'এন্ট্রি টাইম'}
            </span>
            <div className="flex items-center gap-1 mt-0.5 font-mono">
              <Clock className="h-4 w-4 text-zinc-400" />
              <span className="text-base font-extrabold text-white tracking-widest leading-none">
                {signal.time}
              </span>
            </div>
          </div>

          {/* Signal Direction (CALL/PUT) */}
          <div className="flex justify-end">
            {isCall ? (
              <div className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-400 text-[10px] font-black tracking-wider shadow-[0_2px_10px_rgba(16,185,129,0.15)] uppercase font-mono leading-none">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[3]" />
                CALL (UP)
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-rose-400 text-[10px] font-black tracking-wider shadow-[0_2px_10px_rgba(239,68,68,0.15)] uppercase font-mono leading-none">
                <ArrowDownRight className="h-3.5 w-3.5 stroke-[3]" />
                PUT (DOWN)
              </div>
            )}
          </div>
        </div>

        {/* --- TRADE RESULT CHECKBOX BOXES (Requested under Entry Time and above Expiry/Warning) --- */}
        <div id={`result-input-panel-${signal.id}`} className="mt-4 pt-3.5 border-t border-zinc-805/60 space-y-2 select-none shadow-[inset_0_4px_20px_rgba(0,0,0,0.1)] p-2 rounded-xl bg-zinc-950/60 border border-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
              {lang === 'en' ? '★ Choose Trade Result:' : '★ ট্রেডের ফলাফল নির্বাচন:'}
            </span>
            {savedResult ? (
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[8px] px-1.5 py-0.2 font-mono font-bold uppercase tracking-wider">
                {lang === 'en' ? 'Saved ✓' : 'সংরক্ষিত ✓'}
              </span>
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse" />
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            {/* DIRECT WIN CHECKBOX (Click instantly copies & selects) */}
            <button 
              type="button"
              onClick={() => handleResultToggle('WIN')}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg border cursor-pointer transition-all ${
                selectedResult === 'WIN'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-extrabold'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span className="text-xs mb-0.5">🟢</span>
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-center leading-none">
                {lang === 'en' ? 'Direct Win' : 'ডাইরেক্ট উইন'}
              </span>
            </button>

            {/* LOSS CHECKBOX */}
            <button 
              type="button"
              onClick={() => handleResultToggle('LOSS')}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg border cursor-pointer transition-all ${
                selectedResult === 'LOSS'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-400 font-extrabold'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span className="text-xs mb-0.5">🔴</span>
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-center leading-none">
                {lang === 'en' ? 'Loss' : 'লস'}
              </span>
            </button>

            {/* MTG 1 WIN CHECKBOX */}
            <button 
              type="button"
              onClick={() => handleResultToggle('MTG_WIN')}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg border cursor-pointer transition-all ${
                selectedResult === 'MTG_WIN'
                  ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500 font-extrabold'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <span className="text-xs mb-0.5">🟡</span>
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-center leading-none">
                {lang === 'en' ? 'MTG 1 Win' : 'এমটিজি-১ উইন'}
              </span>
            </button>
          </div>

          {/* DYNAMIC TEXT COPY & SAVE WRAP BLOCK */}
          {selectedResult && (
            <div className="flex flex-col gap-1.5 mt-2.5 p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 text-[9px] font-mono leading-none transition-all">
              <div className="flex items-center justify-between gap-1 text-[8px] text-zinc-400 font-mono px-1">
                <span>
                  {selectedResult === 'WIN' 
                    ? '🟢 Win Format Copied' 
                    : selectedResult === 'LOSS' 
                    ? '🔴 Loss Format Copied' 
                    : '🟡 MTG-1 Format Copied'}
                </span>
                {copiedResult && (
                  <span className="text-emerald-400 font-bold uppercase">Copied!</span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-1.5">
                {/* Manual Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopyResultText(selectedResult)}
                  className="px-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-[8px] font-black uppercase rounded cursor-pointer transition-colors flex items-center justify-center gap-1"
                >
                  <Clipboard className="h-2.5 w-2.5" />
                  {lang === 'en' ? 'RE-COPY' : 'রকপি'}
                </button>

                {/* SAVE BUTTON FOR CONVERSION ENGINE INTEGRATION */}
                <button
                  type="button"
                  onClick={handleSaveResultLocally}
                  className={`px-2 py-1.5 text-[8px] font-black uppercase rounded cursor-pointer transition-all flex items-center justify-center gap-1 ${
                    hasChangesToSave
                      ? 'bg-emerald-500 hover:bg-emerald-450 text-black font-black animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-850 cursor-default'
                  }`}
                  disabled={!hasChangesToSave && !isSavedSuccessfully}
                >
                  <Save className="h-2.5 w-2.5" />
                  {isSavedSuccessfully 
                    ? (lang === 'en' ? 'SAVED ✓' : 'সংরক্ষিত ✓') 
                    : (lang === 'en' ? 'SAVE RESULT' : 'সেভ করুন')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Warning details on Upcoming or Active */}
        {(currentStatus === 'PENDING' || currentStatus === 'ACTIVE') && (
          <div className="rounded-lg bg-yellow-500/5 border border-yellow-500/10 px-2 py-1.5 mt-3 flex items-start gap-1.5 text-[9px] text-zinc-400 leading-normal">
            <AlertTriangle className="h-3 w-3 text-yellow-500 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-yellow-500 block mb-0.5">
                {lang === 'en' ? 'MTG Check:' : 'মার্টিঙ্গেল চেক:'}
              </span>
              {lang === 'en' 
                ? 'If losses, take MTG-1 on next candle.' 
                : 'লস হলে পরবর্তী ক্যান্ডেলে MTG-1 টি নিবেন।'}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800/40 pt-3 mt-4">
        {/* Status indicator context */}
        <div>
          {currentStatus === 'PENDING' && (
            <div className="text-[10px] font-bold text-yellow-500 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              {timeLeftStr}
            </div>
          )}
          {currentStatus === 'ACTIVE' && (
            <div className="text-[10px] font-black text-emerald-400 font-mono flex items-center gap-1 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mr-0.5" />
              {timeLeftStr}
            </div>
          )}
          {(currentStatus === 'WIN' || currentStatus === 'LOSE') && (
            <div className="text-[10px] font-bold text-zinc-400 font-mono flex items-center gap-1">
              <span className="inline-block bg-zinc-900 border border-zinc-850 text-zinc-500 rounded text-[8px] px-1.5 py-0.5 font-bold uppercase">
                {lang === 'en' ? '✓ COMPLETED' : '✓ সম্পন্ন'}
              </span>
            </div>
          )}
        </div>

        {/* Copy single button (original) */}
        <button
          type="button"
          onClick={handleCopyBaseSignal}
          className="flex items-center justify-center h-7 w-7 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-emerald-400 cursor-pointer transition-colors"
          title="Copy Core Signal"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400 font-bold" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </motion.div>
  );
}
