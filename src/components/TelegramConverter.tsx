import React, { useState } from 'react';
import { motion } from 'motion/react';
import { OTCSignal } from '../types';
import { Send, Copy, Check, MessageSquare, Award } from 'lucide-react';

interface TelegramConverterProps {
  signals: OTCSignal[];
  pair: string;
  expiry: string;
  hour: number;
  date: string;
}

export default function TelegramConverter({ signals, pair, expiry, hour, date }: TelegramConverterProps) {
  const [copied, setCopied] = useState(false);

  // Helper to format the list for Telegram/Social channels
  const getTelegramFormat = () => {
    const header = `🤖 𝗤𝗨𝗢𝗧𝗘𝗫 𝗢𝗧𝗖 𝗙𝗨𝗧𝗨𝗥𝗘𝗦 𝗦𝗜𝗚𝗡𝗔𝗟𝗦 🤖\n`;
    const metadata = `🗓️ Date: ${date}\n📊 Market: **${pair}**\n⏳ Expiry: **${expiry}**\n⏰ Hour Slot: **${hour.toString().padStart(2, '0')}:00 - ${hour.toString().padStart(2, '0')}:59** (UTC+6)\n🎯 Target: Win on Direct or 1-Step Martingale (M1)\n\n⚡ **TODAY'S HOURLY GENERATED SIGNALS:**\n`;
    
    const body = signals.map((sig, idx) => {
      const emoji = sig.direction === 'CALL' ? '🟢 🟢 CALL (UP)' : '🔴 🔴 PUT (DOWN)';
      return `${idx + 1}. ⏰ **${sig.time}** ➡️ **${emoji}**  (Acc: ${sig.accuracy}%)`;
    }).join('\n');

    const footer = `\n\n⚠️ **MONEY MANAGEMENT NOTE:**\n- Set the trade amount to 1-2% of your capital.\n- If the direct trade loses, apply Martingale Step 1 (M1) on the same pair, same direction for the next candle.\n- Practice on Demo first. Happy Trading! 💸🚀\n\n🔥 Powered by premium OTC Signal Bot`;

    return header + metadata + body + footer;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTelegramFormat());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm sm:p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-400" />
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Telegram Channel Format Converter
          </h2>
        </div>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
          <Award className="h-3 w-3" />
          Admin Tool
        </span>
      </div>

      <p className="text-xs text-zinc-400 mb-4 tracking-wide leading-relaxed">
        Perfect format for Telegram channel announcements. Generate, copy, and broadcast all 10 hourly signals to your users with single-click ease.
      </p>

      {/* Markdown Preview Field */}
      <div className="relative">
        <textarea
          id="telegram-markdown-output"
          readOnly
          value={getTelegramFormat()}
          rows={8}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-[11px] leading-relaxed text-zinc-400 focus:outline-none focus:border-zinc-700 resize-none"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none rounded-b-xl" />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              COPIED TO TELEGRAM FORMAT!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              COPY FOR TELEGRAM BROADCAST
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
