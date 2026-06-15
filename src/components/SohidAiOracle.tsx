import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  BrainCircuit, 
  Send, 
  HelpCircle, 
  Cpu, 
  RefreshCw, 
  UserCheck, 
  Wallet, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Award,
  X,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SohidAiOracleProps {
  pair: string;
  expiry: string;
  currentTimeStr: string;
  signals: any[];
  isAlreadyGenerated: boolean;
  lang: 'en' | 'bn';
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function SohidAiOracle({
  pair,
  expiry,
  currentTimeStr,
  signals,
  isAlreadyGenerated,
  lang,
}: SohidAiOracleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHandbooks, setShowHandbooks] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: lang === 'en' 
            ? "Hello! I am **SOHID's Custom AI Trading Companion**. I am designed entirely by SOHID to help you master binary options setups.\n\nClick one of the quick setup guides below or ask me any question about **Quotex account creation, ID verification, setting up Binance**, or how to accurately enter trades on time using Martingale (MTG-1) rules!"
            : "হ্যালো! আমি **শহীদের তৈরি কাস্টম এআই ট্রেডিং সহচর**।\n\nকোট্যাক্স অ্যাকাউন্ট খোলা, আইডি ভেরিফিকেশন করা, বাইনান্স ওয়ালেট খোলা অথবা আমাদের ফিউচার সিগন্যাল ব্যবহার করে সঠিক নিয়মে ৩ সেকেন্ড বা MTG-1 রুলস জেনে কিভাবে প্রফেশনাল ট্রেড নিবেন তা শিখতে নিচের যেকোনো একটি গাইডে ক্লিক করুন অথবা সরাসরি বাংলায় প্রশ্ন টাইপ করুন!"
        }
      ]);
    }
  }, [lang]);

  // Auto-scroll chat history
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, isOpen]);

  // Handle preset quick guides
  const handleQuickGuide = async (topicKey: string, topicLabelBn: string, topicLabelEn: string) => {
    const userMsg = lang === 'bn' ? topicLabelBn : topicLabelEn;
    
    // Add user message to state
    const updatedMsgs = [...messages, { sender: 'user' as const, text: userMsg }];
    setMessages(updatedMsgs);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, lang })
      });
      if (!response.ok) throw new Error('Network response not ok');
      const data = await response.json();
      
      setMessages([...updatedMsgs, { sender: 'ai', text: data.text }]);
    } catch (err) {
      setMessages([
        ...updatedMsgs,
        {
          sender: 'ai',
          text: lang === 'bn' 
            ? "দুঃখিত, সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা আপনার প্রশ্নটি অন্যভাবে টাইপ করুন।"
            : "Sorry, connection timed out. Please try clicking the button again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Submit custom inquiry
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userText = inputValue;
    setInputValue('');
    const updatedMsgs = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(updatedMsgs);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, lang })
      });
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      
      setMessages([...updatedMsgs, { sender: 'ai', text: data.text }]);
    } catch (err) {
      setMessages([
        ...updatedMsgs,
        {
          sender: 'ai',
          text: lang === 'bn' 
            ? "দুঃখিত, শহীদ এআই সার্ভারে সংযোগ করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।"
            : "Connection error with SOHID AI backend. Please retry."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickTopics = [
    {
      id: 'quotex_open',
      bn: 'কোট্যাক্স অ্যাকাউন্ট খোলার নিয়ম?',
      en: 'How to open a Quotex account?',
      icon: <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
    },
    {
      id: 'quotex_verify',
      bn: 'কোট্যাক্স অ্যাকাউন্ট কিভাবে ভেরিফাই করব?',
      en: 'How to verify Quotex account?',
      icon: <UserCheck className="h-3.5 w-3.5 text-teal-400 shrink-0" />
    },
    {
      id: 'binance_open',
      bn: 'বাইনান্স অ্যাকাউন্ট খোলার নিয়ম?',
      en: 'How to open a Binance account?',
      icon: <Wallet className="h-3.5 w-3.5 text-amber-400 shrink-0" />
    },
    {
      id: 'signal_trade',
      bn: 'সিগন্যাল দিয়ে কিভাবে নিখুঁত ট্রেড নিবেন?',
      en: 'How to trade using future signals?',
      icon: <TrendingUp className="h-3.5 w-3.5 text-blue-400 shrink-0" />
    }
  ];

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setShowBubble(false);
  };

  return (
    <>
      {/* 1. Floating Circular Logo Icon / Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* Dynamic Bubble/Tooltip - drawing attention to the bot */}
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="pointer-events-auto mb-3 max-w-[240px] bg-zinc-950 border border-emerald-900/40 text-white rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(16,185,129,0.1)] relative"
            >
              {/* Little speech tail */}
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-zinc-950 border-r border-b border-emerald-900/40 rotate-45" />
              
              <div className="flex gap-2 items-start text-left">
                <BrainCircuit className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                    SOHID AI active
                  </span>
                  <span className="text-[11px] text-zinc-300 font-sans mt-0.5 leading-snug">
                    {lang === 'bn' 
                      ? "কোট্যাক্স, ভেরিফিকেশন ও বাইনান্স শিখতে চাপ দিন!"
                      : "Click to learn Quotex, Binance, & MTG setups!"}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Round Floating Trigger Button */}
        <motion.button
          onClick={handleToggleChat}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="pointer-events-auto cursor-pointer relative h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-600 to-teal-500 shadow-[0_4px_25px_rgba(16,185,129,0.45),0_0_10px_rgba(16,185,129,0.25)] flex items-center justify-center border-2 border-emerald-300/20 active:outline-none focus:outline-none focus:ring-0 group"
          id="sohid-floating-chat-trigger"
        >
          {/* Pulsing glow boundary */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-25 -z-10" />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <X className="h-6 w-6 text-zinc-950 stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative flex items-center justify-center"
              >
                <BrainCircuit className="h-7 w-7 text-zinc-950 stroke-[2.2] animate-pulse" />
                <div className="absolute -top-1.5 -right-2 text-[8px] bg-zinc-950 border border-emerald-400 text-emerald-400 px-1 rounded-md font-mono font-black scale-90 select-none shadow-md">
                  AI
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* 2. Slide-In Chat Window Widget overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[550px] max-h-[80vh] z-50 flex flex-col bg-zinc-950 border border-emerald-950/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_15px_rgba(16,185,129,0.05)] overflow-hidden"
            id="sohid-floating-chat-container"
          >
            {/* Header with deep emerald tint */}
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-900 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-emerald-500/10 blur animate-pulse" />
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-emerald-500/30 text-emerald-400">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-mono text-[12px] font-black text-white tracking-widest uppercase">
                      SOHID AI ASSISTANT
                    </h4>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1 py-0.2 rounded uppercase tracking-wider font-extrabold font-mono">
                      v4.5
                    </span>
                  </div>
                  <p className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                    <Award className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                    <span>Developed by master <strong className="text-emerald-400 font-bold uppercase">SOHID</strong></span>
                  </p>
                </div>
              </div>

              {/* Close Button Inside Header */}
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer h-7 w-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors border border-zinc-800"
                id="sohid-chat-close-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chats and Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-3.5 bg-zinc-950/20 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                >
                  {/* Sender Label */}
                  <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 mb-0.5">
                    {msg.sender === 'user' 
                      ? (lang === 'bn' ? 'আপনি' : 'You') 
                      : `SOHID AI INTEL`}
                  </span>
                  
                  {/* Message Bubble */}
                  <div 
                    className={`rounded-xl p-3 text-[11.5px] leading-relaxed font-sans border whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'w-full bg-zinc-900 text-zinc-200 border-zinc-800 rounded-tr-none'
                        : 'bg-emerald-950/10 text-zinc-300 border-emerald-950/30 rounded-tl-none markdown-body'
                    }`}
                  >
                    {msg.sender === 'ai' ? (
                      <div className="prose prose-invert max-w-none prose-xs text-[11px] leading-relaxed text-zinc-300">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="self-start flex flex-col max-w-[85%] items-start">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400 animate-pulse mb-0.5">
                    {lang === 'bn' ? 'শহীদ এআই টাইপ করছে...' : 'SOHID AI is typing...'}
                  </span>
                  <div className="bg-zinc-900/80 text-zinc-400 rounded-xl p-3 text-[11px] border border-zinc-900 rounded-tl-none flex items-center gap-2">
                    <RefreshCw className="h-3 w-3 animate-spin text-emerald-400" />
                    <span className="font-mono text-[9px] tracking-widest animate-pulse uppercase">
                      {lang === 'bn' ? 'ম্যাট্রিক্স খুঁজছে...' : 'Matching guides...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons tray inside floating panel (Collapsible) */}
            <div className="bg-zinc-900/30 border-t border-zinc-900/80 p-3.5 space-y-2">
              <button
                type="button"
                onClick={() => setShowHandbooks(!showHandbooks)}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                  <Cpu className="h-3 w-3 text-emerald-400 animate-pulse" />
                  {lang === 'en' ? 'Quick Setup Handbooks' : 'কুইক সেটআপ হ্যান্ডবুকস'}
                </span>
                <div className="flex items-center gap-1.5 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider">
                    {showHandbooks 
                      ? (lang === 'bn' ? 'লুকান' : 'HIDE') 
                      : (lang === 'bn' ? 'দেখান' : 'SHOW')}
                  </span>
                  {showHandbooks ? (
                    <ChevronDown className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <ChevronUp className="h-3 w-3 text-zinc-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {showHandbooks && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1.5">
                      {quickTopics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => handleQuickGuide(topic.id, topic.bn, topic.en)}
                          disabled={loading}
                          className="cursor-pointer text-left rounded-lg border border-zinc-900/60 bg-zinc-900/20 hover:bg-zinc-900/80 hover:border-emerald-950/40 p-2 flex items-center justify-between group transition-all"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            {topic.icon}
                            <span className="text-[10px] font-mono text-zinc-300 group-hover:text-emerald-400 transition-colors truncate">
                              {lang === 'bn' ? topic.bn : topic.en}
                            </span>
                          </div>
                          <ArrowRight className="h-2.5 w-2.5 text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input message bar */}
            <form onSubmit={handleSendMessage} className="bg-zinc-950 border-t border-zinc-900 p-3 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
                placeholder={
                  lang === 'bn' 
                    ? "শহীদ এআই সহকারীকে প্রশ্ন করুন..." 
                    : "Ask SOHID AI setup questions..."
                }
                className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs px-3.5 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 px-3.5 rounded-xl text-zinc-950 transition-all flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(16,185,129,0.2)]"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
