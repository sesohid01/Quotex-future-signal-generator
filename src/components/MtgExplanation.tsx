import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';

interface MtgExplanationProps {
  lang: 'en' | 'bn';
}

export default function MtgExplanation({ lang }: MtgExplanationProps) {
  return (
    <div id="mtg-education-section" className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 mb-5">
        <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
        <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
          {lang === 'en' ? 'Martingale (MTG) Strategy Hub' : 'মার্টিঙ্গেল (MTG) ট্রেডিং গাইড ও নির্দেশনা'}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Explanation Block */}
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed max-w-4xl">
            {lang === 'en' ? (
              <>
                <strong>What is Martingale (MTG)?</strong> Martingale is a mathematical trading strategy where you double or increase your investment on the next signal candle if your initial position ends in a loss. Doing this allows you to completely recover your previous loss and secure a net profit inside a single winning sequence.
              </>
            ) : (
              <>
                <strong>মার্টিঙ্গেল (MTG) আসলে কী?</strong> মার্টিঙ্গেল হলো এমন একটি ট্রেডিং কৌশল যেখানে আপনার প্রথম ট্রেডটি লস হলে সাথে সাথে পরবর্তী ক্যান্ডেলে একই ডিরেকশনে (CALL বা PUT) পূর্বের থেকে দ্বিগুণ বা ২.২ গুণ অ্যামাউন্ট দিয়ে আরেকটি ট্রেড প্লেস করতে হয়। এর ফলে পরবর্তী ক্যান্ডেলটি উইন হলেই আগের লস রিকভার হয়ে যায় এবং ফ্রেশ প্রফিট চলে আসে।
              </>
            )}
          </p>

          <div className="space-y-4 pt-2">
            <h4 className="font-mono text-[11px] sm:text-xs font-bold text-yellow-500 uppercase tracking-widest">
              {lang === 'en' ? 'Critical Action Checklist' : 'ট্রেড করার নিয়মাবলী ও চেকলিস্ট'}
            </h4>

            {lang === 'en' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">1</span>
                    <span className="text-xs font-bold text-zinc-200">Observe Expiry Ends</span>
                  </div>
                  <p className="text-xs text-zinc-400">Wait for your 1st trade to completely end. If it results in a loss (even by 1 pip), prepare for MTG instantly on the very next candle.</p>
                </div>

                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">2</span>
                    <span className="text-xs font-bold text-zinc-200">Same Direction Rule</span>
                  </div>
                  <p className="text-xs text-zinc-400">Always take the MTG trade in the exactly <strong>same direction</strong> (e.g. if the original signal was CALL, the MTG must also be CALL).</p>
                </div>

                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">3</span>
                    <span className="text-xs font-bold text-zinc-200">Double Valuation (Multiplier)</span>
                  </div>
                  <p className="text-xs text-zinc-400">Your investment multiplier should be 2x to 2.2x to handle the brokerage payout ratio and remain in profit (e.g., $10 ➔ $22).</p>
                </div>

                <div className="rounded-xl bg-red-950/10 border border-red-950/40 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs font-mono">4</span>
                    <span className="text-xs font-bold text-red-450 uppercase">Never Use MTG-2</span>
                  </div>
                  <p className="text-xs text-zinc-400">Limit your risk strictly to 1-Step Martingale (MTG-1). If MTG-1 loses, stop trading that signal immediately. Do not chase losses!</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">১</span>
                    <span className="text-xs font-bold text-zinc-200">ক্যান্ডেল শেষ হওয়া পর্যন্ত অপেক্ষা</span>
                  </div>
                  <p className="text-xs text-zinc-400">আপনার প্রথম ট্রেডের মেয়াদ শেষ হওয়া পর্যন্ত দেখুন। সামান্যতম ব্যবধানে লস হলেও সাথে সাথে MTG এর পজিশন নেওয়ার জন্য প্রস্তুত হন।</p>
                </div>

                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">২</span>
                    <span className="text-xs font-bold text-zinc-200">একই দিক বজায় রাখা</span>
                  </div>
                  <p className="text-xs text-zinc-400">মার্টিঙ্গেল ট্রেডটি অবশ্যই প্রথম সিগন্যালের <strong>একই ডিরেকশনে</strong> নিবেন (যেমন সফল সিগন্যাল CALL হলে MTG-ও CALL ডিরেকশনে নিবেন)।</p>
                </div>

                <div className="rounded-xl bg-zinc-950/40 border border-zinc-900 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-xs font-mono">৩</span>
                    <span className="text-xs font-bold text-zinc-200">দ্বিগুণ ইনভেস্টমেন্ট (গুনক)</span>
                  </div>
                  <p className="text-xs text-zinc-400">মার্টিঙ্গেল ট্রেডের অ্যামাউন্ট সর্বদা ১ম অ্যামাউন্টের ডাবল বা ২.২ গুণ করতে হবে যেন ব্রোকারের ফি কেটেও লাভ থাকে (যেমন: ১০০৳ হলে ২২০৳)।</p>
                </div>

                <div className="rounded-xl bg-red-950/10 border border-red-950/40 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 text-xs font-mono">৪</span>
                    <span className="text-xs font-bold text-red-450 uppercase">কখনোই MTG-2 নিবেন না</span>
                  </div>
                  <p className="text-xs text-zinc-400">যেকোনো সিগন্যালে সর্বোচ্চ ১-ধাপ মার্টিঙ্গেল (MTG-1) ব্যবহার করবেন। সেটিও লস হলে স্টপ করে পরবর্তী ফ্রেস সিগন্যালের জন্য অপেক্ষা করুন। লোভ পরিহার করুন।</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informational Warning footer info */}
        <div className="rounded-xl bg-red-950/20 border border-red-900/30 p-4 text-xs text-zinc-400 flex items-start gap-2.5 leading-relaxed">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 select-none mt-0.5" />
          <span>
            {lang === 'en' 
              ? 'Attention traders: Fast backtesting has proven that limiting to exactly 1-Step Martingale (MTG-1) increases safety. Always avoid MTG-2 or continuous compounding as it could wipe out your account. Trading includes financial risk, manage your stakes wisely.' 
              : 'বিশেষ সতর্কবার্তা: ব্যাকটেস্টিং থেকে প্রমাণিত যে সর্বোচ্চ ১-ধাপ মার্টিঙ্গেল (MTG-1) ব্যবহার অ্যাকাউন্ট নিরাপদ রাখে। কোনো অবস্থাতেই পর পর একাধিকবার (MTG-2 বা তার বেশি) ইনভেস্টমেন্ট বাড়াবেন না। ট্রেডিংয়ে মারাত্মক আর্থিক ঝুঁকি রয়েছে, নিজের রিস্ক মেনে ট্রেড করুন।'}
          </span>
        </div>
      </div>
    </div>
  );
}
