import React from 'react';
import { ShieldAlert, BookOpen, Layers, CheckCircle2, DollarSign, HelpCircle } from 'lucide-react';

export default function TradingGuide() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-4">
        <BookOpen className="h-5 w-5 text-emerald-400" />
        <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
          OTC Trading Execution Guide
        </h2>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed mb-5">
        To achieve maximum accuracy with our automated future signals, you must execute trades strictly according to the optimized mathematical model. Follow these premium rules below:
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Step-by-Step Execution */}
        <div className="space-y-4">
          <h3 className="font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Execution Steps
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">1</span>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Select OTC Market</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Open Quotex, locate the exact OTC pair (e.g. USD/BDT OTC) and set the chart timeframe matching the expiry choice (e.g., M1 or M5).</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">2</span>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Prepare Timer Entry</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Compare the time to the live clock. Open the trade precisely at the start of the 00th second of the designated minute (e.g., 14:02:00).</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 font-mono">3</span>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Match the CALL/PUT Action</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">If the signal says CALL, click the green Upwards arrow. If the signal says PUT, click the red Downwards arrow in Quotex.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Martingale Risk Management */}
        <div className="space-y-4">
          <h3 className="font-mono text-[11px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" />
            1-Step Martingale (M1) System
          </h3>

          <div className="rounded-xl border border-indigo-950/40 bg-indigo-950/10 p-3.5">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-indigo-300">How to use Martingale (M1):</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                  If the initial trade loses at the expiry minute, quickly open another trade in the **SAME direction** for the next immediate candle, but with **double (x2) or 2.2x** your trade value.
                </p>
                <p className="text-[11px] text-zinc-500 italic mt-2">
                  Our bot achieves over 94% win rate when incorporating 1-Step Martingale safely. Do NOT exceed M1; if Martingale 1 loses, exit the pair and wait for the next signal.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <DollarSign className="h-3.5 w-3.5 text-zinc-400" />
            Rule: Invest no more than 1% to 2% of your balance per spot.
          </div>
        </div>
      </div>
    </div>
  );
}
