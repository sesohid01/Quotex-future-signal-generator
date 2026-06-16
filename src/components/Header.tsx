import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  ShieldCheck, 
  Clock, 
  MoreVertical, 
  SlidersHorizontal, 
  BrainCircuit, 
  MessageSquare, 
  BookOpen, 
  TrendingUp, 
  Trash2, 
  X, 
  Copy, 
  Check, 
  Award, 
  Send 
} from 'lucide-react';

interface HeaderProps {
  currentDhakaTime: string;
  currentDhakaDate: string;
  totalSynchronizedUsers: number;
  lang: 'en' | 'bn';
  onResetResults?: () => void;
}

export default function Header({ 
  currentDhakaTime, 
  currentDhakaDate, 
  totalSynchronizedUsers,
  lang,
  onResetResults 
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close 3-dot dropdown if user clicks elsewhere
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollToSection = (elementId: string) => {
    setMenuOpen(false);
    
    // If it's the AI Oracle, let's also simulate click to open the chat widget
    if (elementId === 'sohid-ai-oracle-panel') {
      const trigger = document.getElementById('sohid-floating-chat-trigger');
      if (trigger) {
        trigger.click();
      }
      return;
    }

    const target = document.getElementById(elementId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleResetChecklist = () => {
    setMenuOpen(false);
    if (onResetResults) {
      onResetResults();
      // Throw absolute visual response
      alert(lang === 'en' 
        ? '✓ Trade Checklist and report rates have been reset successfully!' 
        : '✓ সকল ট্রেড ফলাফল এবং রিপোর্টের এক্যুরেসি পুনরায় প্রস্তুত করা হয়েছে!'
      );
    }
  };

  const handleCopyTelegramHandle = () => {
    navigator.clipboard.writeText('@SohidVip');
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  const menuItems = [
    {
      labelEn: 'Signal Configurator',
      labelBn: 'সিগন্যাল কনফিগারেটর',
      icon: <SlidersHorizontal className="h-4 w-4 text-emerald-400" />,
      action: () => handleScrollToSection('pair-selector-panel')
    },
    {
      labelEn: 'Ask SOHID AI Oracle',
      labelBn: 'শহীদ এআই ওরাকল',
      icon: <BrainCircuit className="h-4 w-4 text-teal-400 animate-pulse" />,
      action: () => handleScrollToSection('sohid-ai-oracle-panel')
    },
    {
      labelEn: 'Telegram Broadcast',
      labelBn: 'টেলিগ্রাম ব্রডকাস্ট গ্রুপ',
      icon: <MessageSquare className="h-4 w-4 text-sky-450" />,
      action: () => handleScrollToSection('telegram-markdown-output')
    },
    {
      labelEn: 'Trading Instructions',
      labelBn: 'ট্রেডিং গাইড বুক',
      icon: <BookOpen className="h-4 w-4 text-yellow-500" />,
      action: () => handleScrollToSection('trading-guide-panel')
    },
    {
      labelEn: 'Martingale Rules',
      labelBn: 'মার্টিঙ্গেল থিওরি হাব',
      icon: <TrendingUp className="h-4 w-4 text-emerald-500" />,
      action: () => handleScrollToSection('mtg-explanation-panel')
    },
    {
      labelEn: 'SOHID VIP Contact',
      labelBn: 'শহীদ ভিআইপি কন্টাক্ট',
      icon: <Award className="h-4 w-4 text-yellow-400" />,
      action: () => {
        setMenuOpen(false);
        setContactModalOpen(true);
      }
    },
    {
      labelEn: 'Reset Saved Results',
      labelBn: 'ডাটা রিসেট করুন',
      icon: <Trash2 className="h-4 w-4 text-rose-500" />,
      action: handleResetChecklist,
      isDanger: true
    }
  ];

  return (
    <>
      <header id="header-panel" className="relative w-full border-b border-[#e5c17d]/15 bg-[#040707]/90 backdrop-blur-xl z-45 select-none transition-colors duration-350">
        {/* Decorative top ambient gold and emerald neon double bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-[#e5c17d] to-teal-500 shadow-[0_2px_20px_rgba(229,193,125,0.4)]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
          {/* Brand identity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex items-center gap-3.5"
          >
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-[#e5c17d] to-emerald-500 opacity-60 blur-md animate-luxury-pulse" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-[#090e0e] border border-[#e5c17d]/30 text-[#e5c17d]">
                <Cpu className="h-7 w-7 animate-pulse text-[#e5c17d]" />
              </div>
              <span className="absolute right-0 bottom-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] font-mono font-black text-black bg-[#e5c17d] px-2.5 py-0.5 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(229,193,125,0.25)] animate-pulse border border-[#e5c17d]/50">
                    {lang === 'en' ? 'GOLD DESIGN BY SOHID' : 'গোল্ড ডিজাইন বাই সোহিদ'}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/25">
                    PRO BOT V4.5
                  </span>
                </div>
                <h1 className="font-luxury text-xl font-extrabold tracking-widest text-[#e2e8f0] sm:text-2xl mt-1 select-none">
                  SOHID'S <span className="text-[#e5c17d] font-sans font-black tracking-normal">QUOTEX OTC</span> <span className="bg-gradient-to-r from-[#e5c17d] via-emerald-400 to-[#e5c17d] bg-clip-text text-transparent italic font-sans font-black">FUTURES</span>
                </h1>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-widest uppercase font-mono mt-0.5">
                {lang === 'en' 
                  ? "SOHID's Custom High-Fidelity Web-Based OTC Bot Engine" 
                  : "সোহিদ-এর স্পেশাল হাই-এন্ড ডিটারমিনিস্টিক ওটিসি ফিউচার অ্যালগরিদম"}
              </p>
            </div>
          </motion.div>

          {/* Real-time Clock Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:justify-end"
          >
            {/* UTC+6 Time Container */}
            <div className="flex flex-col items-center sm:items-end rounded-xl border border-[#e5c17d]/15 bg-[#090e0e]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] px-4 py-2 min-w-[170px] sm:min-w-[190px] backdrop-blur-md">
              <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#e5c17d] tracking-widest font-mono">
                <Clock className="h-3 w-3 animate-spin" style={{ animationDuration: '8s' }} />
                Bangladesh Time (UTC+6)
              </div>
              <div className="font-mono text-lg sm:text-xl font-extrabold text-[#e2e8f0] tracking-widest mt-0.5 glow-emerald">
                {currentDhakaTime}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-mono">
                Date: <span className="text-[#e5c17d] font-bold">{currentDhakaDate}</span>
              </div>
            </div>

            {/* SOHID Ownership Verification Badge */}
            <div className="hidden lg:flex flex-col items-start rounded-xl border border-emerald-900/30 bg-emerald-950/10 px-4 py-2">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase tracking-widest font-black font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                {lang === 'en' ? 'SOHID OWNED BOT' : 'সোহিদ ওনড বট'}
              </div>
              <span className="text-xs text-zinc-300 font-mono mt-0.5 font-semibold flex items-center gap-1">
                Verified Web-Based &bull; <span className="text-[#e5c17d] text-[9px] bg-[#e5c17d]/10 px-2 py-0.2 rounded border border-[#e5c17d]/30 font-bold uppercase">BY SOHID</span>
              </span>
            </div>

            {/* --- THREE-DOT DASHBOARD MENU --- */}
            <div className="relative" ref={menuRef}>
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border cursor-pointer transition-all duration-200 ${
                  menuOpen 
                    ? 'border-[#e5c17d] bg-[#e5c17d]/10 text-[#e5c17d] shadow-[0_0_15px_rgba(229,193,125,0.4)]' 
                    : 'border-zinc-800 bg-[#090e0e]/50 text-zinc-400 hover:text-white hover:border-[#e5c17d]/30'
                }`}
                title="SOHID VIP Options"
                type="button"
              >
                <MoreVertical className="h-5.5 w-5.5" />
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="absolute right-0 mt-3 w-68 origin-top-right rounded-2xl border border-[#e5c17d]/20 bg-[#050808]/95 p-2 shadow-[0_15px_45px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.05)] focus:outline-none z-50 overflow-hidden"
                  >
                    {/* Header of Menu */}
                    <div className="px-3.5 py-3 border-b border-zinc-900/60 mb-1.5 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-[#e5c17d]" />
                        {lang === 'en' ? 'SOHID MASTER MENU' : 'সোহিদ মাস্টার মেন্যু'}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    {/* Listing Menu Options */}
                    <div className="space-y-1">
                      {menuItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={item.action}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-3.5 transition-all cursor-pointer ${
                            item.isDanger
                              ? 'text-rose-400 hover:bg-rose-950/25 hover:text-rose-300'
                              : 'text-zinc-350 hover:bg-[#090e0e] hover:text-[#e5c17d] border border-transparent hover:border-[#e5c17d]/10'
                          }`}
                        >
                          <div className="shrink-0">{item.icon}</div>
                          <span className="flex-1 truncate">
                            {lang === 'en' ? item.labelEn : item.labelBn}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Quick Credit Info inside Menu */}
                    <div className="mt-2.5 pt-2.5 border-t border-zinc-900/60 text-center">
                      <span className="text-[9px] font-mono text-[#e5c17d] uppercase tracking-widest block leading-none py-1">
                        Quotex OTC Bot Engine v4.5
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- EXCLUSIVE SOHID VIP CONTACT DIALOG MODAL --- */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl overflow-y-auto">
            {/* Modal Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-[#e5c17d]/5 blur-[120px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#e5c17d]/20 bg-[#050808] p-7 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/50 text-zinc-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex flex-col items-center text-center mt-3 space-y-5">
                {/* Avatar with deep pulsing aura */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#e5c17d] to-emerald-400 opacity-60 blur-md animate-luxury-pulse" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#090e0e] border-2 border-[#e5c17d] text-[#e5c17d] text-xl font-extrabold font-mono tracking-widest shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
                    SOHID
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-[10px] font-mono font-black text-black bg-[#e5c17d] px-3 py-1 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(229,193,125,0.3)]">
                      ★ AUTHORISED SOHID DEVELOPER ★
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#e2e8f0] tracking-tight mt-3 font-luxury">
                    {lang === 'en' ? 'Get Exclusive SOHID Private Setup Access' : 'সোহিদ ভাইয়ের প্রাইভেট সেটাআপ অ্যাক্সেস'}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 font-mono">
                    {lang === 'en' 
                      ? 'Consult Directly with SOHID for custom automated trading strategies!' 
                      : 'যেকোনো কোড মডিফিকেশন বা ওটিসি সিগন্যাল বিষয়ক ওয়ান-অন-ওয়ান গাইডলাইনের জন্য কন্টাক্ট করুন।'}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="w-full rounded-2xl bg-[#090e0e]/80 border border-[#e5c17d]/10 p-5 font-mono text-[11px] text-left text-zinc-350 space-y-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#e5c17d] font-bold">✓</span>
                    <span>{lang === 'en' ? 'Exclusive Lifetime VIP Discord Hub Entrance.' : 'আজীবন ভিআইপি ডিসকর্ড হাবে প্রবেশ পথ।'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#e5c17d] font-bold">✓</span>
                    <span>{lang === 'en' ? 'Get custom algorithmic bot setups compiled with premium scripts.' : 'ক্রিপ্টো এবং সূচক স্ক্রিপ্টের বিশেষ প্রিমিয়াম সংস্করণ।'}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#e5c17d] font-bold">✓</span>
                    <span>{lang === 'en' ? 'Direct voice calling support for troubleshooting.' : 'অনলাইন কলিং এবং মেসেজ সাপোর্ট ভেরিফিকেশন।'}</span>
                  </div>
                </div>

                {/* SOHID Username copy block */}
                <div className="w-full space-y-2.5">
                  <div className="rounded-xl border border-zinc-900 bg-[#040707] p-3 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Send className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
                      <span className="text-white font-extrabold tracking-wider">@SohidVip</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyTelegramHandle}
                      className="px-3 py-1.5 bg-[#090e0e] hover:bg-zinc-900 text-[10px] font-bold text-[#e5c17d] hover:text-[#e5c17d] rounded border border-zinc-800 cursor-pointer transition-colors flex items-center gap-1 uppercase"
                    >
                      {copiedHandle ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedHandle ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                  
                  {/* Telegram Direct redirect block button */}
                  <a
                    href="https://t.me/SohidVip"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full select-none cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e5c17d] to-[#aa8c2c] hover:brightness-110 px-4 py-3.5 font-mono text-xs font-black text-black uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(229,193,125,0.25)]"
                  >
                    <Send className="h-4 w-4 fill-black stroke-none" />
                    {lang === 'en' ? 'MESSAGE SOHID ON TELEGRAM' : 'টেলিগ্রামে সরাসরি যোগাযোগ করুন'}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
