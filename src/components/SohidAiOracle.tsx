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

function getClientSmartFallbackResponse(message: string, lang: 'en' | 'bn'): string {
  const msgLower = (message || "").toLowerCase();
  
  // 1. Praise/Creation/Sohid
  if (
    msgLower.includes("sohid") || 
    msgLower.includes("সহিদ") || 
    msgLower.includes("শহীদ") || 
    msgLower.includes("বানিয়েছে") || 
    msgLower.includes("তৈরি") || 
    msgLower.includes("creator") || 
    msgLower.includes("developer")
  ) {
    return lang === 'bn'
      ? `### 👑 শহীদ এআই-এর রূপকার (The Mastermind SOHID):\n\nশহীদ (SOHID) হলেন একজন অসাধারণ এবং অত্যন্ত প্রতিভাবান ফুল-স্ট্যাক ও ট্রেডিং অ্যালগরিদম ডেভেলপার। \n\nতিনি এই চমৎকার ফিউচার সিগন্যাল জেনারেটর সিস্টেম এবং কাস্টম শহীদ এআই ইন্টেলিজেন্ট বটটিকে একাই ডিজাইন ও ডেভেলপ করেছেন। \n\n* **উদ্দেশ্য**: বাংলাদেশের হাজারো উঠতি বাইনারি অপশন ট্রেডারদের সঠিক গাইডলাইন দেওয়া এবং প্রতারণার হাত থেকে বাঁচানো।\n* **সফলতা**: শহীদ-এর তৈরি অ্যালগরিদমগুলো প্রতিদিন ৯৮%+ কার্যকারিতা প্রমাণ করে আসছে!\n\nশহীদ-এর তৈরি এই বিশ্বস্ত নোডে আপনি সম্পূর্ণ নির্ভয়ে যেকোনো প্রফেশনাল সেটআপ গাইডলাইন শিখে নিতে পারেন।`
      : `### 👑 About Master SOHID (The Architect):\n\nSOHID is a highly accomplished full-stack software architect and binary trading automation pioneer. \n\nHe sole-handedly designed, built, and programmed this entire OTC predictive signals engine and the integrated SOHID AI Intelligent Bot.\n\n* **His goal**: To establish absolute guidance and protect general traders by providing accurate trading blueprints.\n* **His legacy**: Algorithms built by SOHID consistently manifest an aggregate win rate exceeding 98%.\n\nFeel proud to use these high-performance resources built by the master developer himself!`;
  }

  // 2. Quotex Account Setup
  if (
    msgLower.includes("quotex") || 
    msgLower.includes("account") || 
    msgLower.includes("অ্যাকাউন্ট") || 
    msgLower.includes("একাউন্ট") || 
    msgLower.includes("খুল") || 
    msgLower.includes("খোলা") || 
    msgLower.includes("signup") || 
    msgLower.includes("register")
  ) {
    return lang === 'bn'
      ? `### 📊 কোট্যাক্স (Quotex) অ্যাকাউন্ট খোলার সঠিক নিয়ম:\n\nশহীদ-এর নির্দেশ অনুযায়ী, একটি ভেরিফাইড কোট্যাক্স অ্যাকাউন্ট খোলার জন্য নিচের পদক্ষেপগুলো অনুসরণ করুন:\n\n1. **সঠিক লিংক ব্যবহার করুন**: প্রথমে প্রফেশনাল এবং ভেরিফাইড কোট্যাক্স রেজিস্ট্রেশন লিংকে প্রবেশ করুন।\n2. **ইমেইল ও পাসওয়ার্ড**: আপনার সচল ইমেইল এড্রেস এবং একটি অত্যন্ত স্ট্রং পাসওয়ার্ড (যেমন: \`Sohid#2026@\`) প্রদান করুন।\n3. **কারেন্সি (Currency)**: কারেন্সি হিসেবে **BDT** (বাংলাদেশি টাকা) অথবা **USD** (মার্কিন ডলার) নির্বাচন করুন। ফিউচার সিগন্যাল ব্যবহারের জন্য BDT বা USD উভয়ই সমানভাবে কাজ করবে।\n4. **শর্তাবলী**: "I am 18 years old or older" বক্সে টিক চিহ্ন দিন এবং **Registration / Sign Up** বাটনে ক্লিক করুন।\n5. **ইমেইল ভেরিফিকেশন**: আপনার ইমেইলে একটি কনফার্মেশন কোড বা লিংক যাবে। সেটিতে ক্লিক করে আপনার ইমেইল নিশ্চিত করুন।\n\n⚠️ **সতর্কতা**: পূর্বে কোনো অ্যাকাউন্ট থেকে থাকলে সেটি ডিলিট করে নতুন লিংকের মাধ্যমে ফ্রেশ অ্যাকাউন্ট তৈরি করাই সর্বোত্তম, যাতে কোনো বোনাস বা ট্র্যাকিং ইস্যু না হয়।`
      : `### 📊 How to Open a Quotex Account (SOHID Instruction):\n\nFollow these accurate steps designed by SOHID to set up your official Quotex account:\n\n1. **Use Checked Link**: Visit the registered and officially recognized Quotex sign-up terminal.\n2. **Details Input**: Fill in your active email address and set a highly secure password.\n3. **Select Currency**: Choose either **BDT** (Bangladeshi Taka) or **USD** (US Dollar) as your trading account's denomination.\n4. **Accept Terms**: Agree to the terms and click **Sign Up** to create the wallet node.\n5. **Confirm Email**: Access your inbox, open the validation message sent by Quotex, and click the confirmation link.\n\n💡 *Pro Tip: Always use real and verified coordinates so you face zero friction while deploying automated signal protocols!*`;
  }

  // 3. Verification
  if (
    msgLower.includes("verify") || 
    msgLower.includes("verification") || 
    msgLower.includes("ভেরিফাই") || 
    msgLower.includes("এনআইডি") || 
    msgLower.includes("nid") || 
    msgLower.includes("আইডি") || 
    msgLower.includes("পাসপোর্ট") || 
    msgLower.includes("passport")
  ) {
    return lang === 'bn'
      ? `### 🪪 কোট্যাক্স অ্যাকাউন্ট আইডি ভেরিফিকেশন (NID/Passport Guide):\n\nকোট্যাক্স অ্যাকাউন্ট সম্পূর্ণ ভেরিফাই করা খুবই সহজ। শহীদ-এর স্পেশাল ভেরিফিকেশন ডকেট গাইড নিচে দেওয়া হলো:\n\n1. **প্রোফাইল পূরণ করুন**: প্রথমে আপনার কোট্যাক্স অ্যাকাউন্টের **Profile** অপশনে যান। আপনার জাতীয় পরিচয়পত্র (NID Card) বা পাসপোর্ট অনুযায়ী আপনার প্রথম নাম, শেষ নাম, জন্মতারিখ এবং সঠিক ঠিকানা ইংরেজিতে পূরণ করুন।\n2. **মোবাইল ভেরিফিকেশন**: আপনার মোবাইল নম্বরটি বসিয়ে দিন এবং ওটিপি (OTP) ও কোড নিশ্চিত করে ফোন নম্বর ভেরিফাই করুন।\n3. **ডকুমেন্ট আপলোড**:\n   - **NID Card**: আপনার এনআইডি কার্ডের সামনের দিকের এবং পেছনের দিকের অত্যন্ত পরিষ্কার ছোঁয়া বা ছবি তুলুন (কোনো কোণা যেন কেটে না যায় এবং লেখা যেন স্পষ্ট পড়া যায়)।\n   - **Upload**: প্রোফাইল সেকশনের ডকুমেন্ট আপলোড অপশনে গিয়ে ফ্রন্ট পার্ট ও ব্যাক পার্ট আপলোড করুন।\n4. **অপেক্ষা করুন**: সাধারণত ৩ থেকে ২৪ ঘণ্টার মধ্যে কোট্যাক্স টিম আপনার ডকুমেন্ট যাচাই করে অ্যাকাউন্ট ভেরিফাইড (Verified) করে দেবে। অ্যাকাউন্টের পাশে সবুজ রঙের "Verified" ব্যাজ প্রদর্শিত হবে।\n\n⚠️ **গুরুত্বপূর্ণ নোটিশ**: ব্লার ছবি (ঝাপসা ছবি) বা অন্ধকার আলোতে তোলা ছবি আপলোড করলে ভেরিফিকেশন রিজেক্ট হতে পারে। সর্বদা পরিষ্কার দিনের আলোতে ছবি তুলবেন!`
      : `### 🪪 Quotex Identity & NID Verification Guide:\n\nEnsure your account is verified immediately to enjoy limitless withdrawals. Follow SOHID's guidelines:\n\n1. **Complete Profile Fields**: Access your **Profile Settings**. You must fill out your First Name, Last Name, Date of Birth, and Address exactly as they appear on your National ID Card, Passport, or Driving License.\n2. **Phone Number Binding**: Provide your active mobile number and complete the OTP verification step.\n3. **Upload Real Documents**:\n   - Save high-resolution, clear snapshots of the front and back of your NID Card/Passport.\n   - Ensure all 4 corners of the document are visible, and light glare does not block vital information.\n4. **Verification Window**: Submit the documents under the "Identity Verification" panel. The systems usually approve well within 3 to 12 hours, turning your status badge into green **Verified**.`;
  }

  // 4. Binance setup / Deposit
  if (
    msgLower.includes("binance") || 
    msgLower.includes("usdt") || 
    msgLower.includes("বাইনান্স") || 
    msgLower.includes("ডিপোজিট") || 
    msgLower.includes("উইথড্র") || 
    msgLower.includes("deposit") || 
    msgLower.includes("withdraw") || 
    msgLower.includes("dollar") || 
    msgLower.includes("bkash") || 
    msgLower.includes("nagad") || 
    msgLower.includes("rocket")
  ) {
    return lang === 'bn'
      ? `### 💳 বাইনান্স (Binance) অ্যাকাউন্ট খোলা ও লেনদেন গাইড:\n\nফিউচার সিগন্যালে প্রফেশনাল ফান্ড ম্যানেজমেন্টের জন্য বাইনান্স ওয়ালেট সবচেয়ে নিরাপদ মাধ্যম। চলুন দেখে নিই শহীদ-এর লেনদেন রুলস:\n\n1. **বাইনান্স অ্যাকাউন্ট সাইন-আপ**: আপনার মোবাইল অ্যাপ স্টোর থেকে **Binance App** ডাউনলোড করে আপনার ইমেইল বা ফোন নম্বর দিয়ে অ্যাকাউন্ট তৈরি করুন এবং ফেস-ভেরিফিকেশন সম্পন্ন করে KYC পাস করুন।\n2. **বিকাশ/নগদ দিয়ে ডলার ক্রয় (P2P)**:\n   - বাইনান্স অ্যাপে **P2P Trading** অপশনে যান。\n   - ফিল্টারে **bKash, Nagad, or Rocket** সিলেক্ট করুন এবং পছন্দের রেট দেখে বিশ্বস্ত মার্চেন্টের কাছ থেকে **USDT** (ইউএস ডলার) টাকা পাঠিয়ে কিনে নিন。\n3. **কোট্যাক্সে ডিপোজিট**:\n   - কোট্যাক্সের ডিপোজিট অপশনে গিয়ে **USDT (TRC20)** অথবা **Binance Pay** অপশনটি বেছে নিন。\n   - ডিপোজিট অ্যামাউন্ট লিখে পেজে দেওয়া উইথড্রয়াল অ্যাড্রেসটি কপি করুন。\n   - বাইনান্স অ্যাপের Withdraw অপশনে গিয়ে সেই অ্যাড্রেসটি পেস্ট করে সাবমিট করুন। ২ মিনিটের মধ্যে ফান্ড ডিপোজিট হয়ে যাবে!\n4. **উইথড্র প্রক্রিয়া**: একইভাবে কোট্যাক্স থেকে উইথড্র দেওয়ার সময় আপনার ব্যক্তিগত Binance USDT TRC-20 অ্যাড্রেস দিয়ে সাবমিট করলে সরাসরি বাইনান্স পেমেন্ট চলে আসবে, যা পরবর্তীতে P2P-র মাধ্যমে বিক্রি করে বিকাশ বা নগদে টাকা তুলতে পারবেন।`
      : `### 💳 Binance Account Opening & Transaction Masterclass:\n\nBinance is the absolute gold standard for secure deposit/withdrawal routing. SOHID's setup protocol:\n\n1. **App Installation & KYC**: Download the **Binance Mobile App**. Create an account and pass the fast facial/identity KYC verification.\n2. **P2P Trading (bKash/Nagad)**:\n   - Go to **P2P Option** in Binance.\n   - Filter methods by **bKash, Nagad, or Rocket** (for local users).\n   - Enter your purchase amount, select a highly rated trader, send BDT directly to their wallets, and release your **USDT (US Dollar)** secure tokens.\n3. **Funding Quotex**:\n   - On Quotex, click 'Deposit' and select **Binance Pay** or **USDT (TRC20)**.\n   - Paste the target network address inside Binance withdrawal tab and confirm with secure OTP. Funds arrive securely within 2 minutes!\n4. **Requesting Withdrawals**: Simply request payouts back to your personal Binance USDT address. Sell returned USDT instantly via P2P back into your paper currency.`;
  }

  // 5. Signals / MTG
  if (
    msgLower.includes("signal") || 
    msgLower.includes("trade") || 
    msgLower.includes("সিগন্যাল") || 
    msgLower.includes("ট্রেড") || 
    msgLower.includes("mtg") || 
    msgLower.includes("martingale") || 
    msgLower.includes("মার্টিনগেল")
  ) {
    return lang === 'bn'
      ? `### 📈 শহীদ ফিউচার সিগন্যালে শতভাগ জেতার গোপন সূত্র (৩ সেকেন্ড ও MTG রুলস):\n\nশহীদ-এর তৈরি এআই ফিউচার সিগন্যালগুলো অত্যন্ত নিখুঁত এবং কার্যকর। তবে সর্বোচ্চ প্রফিট করতে হলে অবশ্যই নিচের নিয়মগুলো অক্ষরে অক্ষরে মানতে হবে:\n\n1. **ক্যান্ডেল ও এক্সপায়ারি সেটিং**:\n   - কোট্যাক্স চার্টে গিয়ে ক্যান্ডেলের সময়সীমা **1 Minute** (M1) সেট করুন。\n   - আপনার ট্রেডিং এক্সপায়ারি টাইমও **1 Minute** সেট করুন (যাতে প্রতিটি ক্যান্ডেলের সাথে ট্রেড শেষ হয়)।\n2. **৩ সেকেন্ড আর্লি এন্ট্রি রুল (3-Second early entry)**:\n   - ধরুন, একটি সিগন্যাল আছে **12:35 PM** এ।\n   - কোট্যাক্স সার্ভারের ডিলের কারণে দেরি এড়াতে আপনি ঠিক **12:34:57 PM** এ (অর্থাৎ ৩ সেকেন্ড আগে) ট্রেড এন্ট্রি নিয়ে নিবেন। এতে আপনার এন্ট্রি একদম সঠিক ও নিখুঁত পয়েন্টে বসবে।\n3. **মার্টিনগেল (MTG-1) সেফটি রুল**:\n   - যদি ১ম ট্রেডটি ওটিসি ফিডের ক্ষণস্থায়ী ডিলের কারণে লস হয়, তবে ঘাবড়ানোর কোনো কারণ নেই!\n   - সাথেসাথেই পরের মিনিটে (যেমন **12:36 PM** এ) একই ডিরেকশনে (CALL হলে CALL, PUT হলে PUT) দ্বিগুণ অ্যামাউন্টের আরেকটি ট্রেড নিন। একে বলে **MTG-1**। ফিউচার সিগন্যালে ৯৮% উইন রেট নিশ্চিত হয় এই MTG-1 পদক্ষেপে!`
      : `### 📈 Winning with Future Signals: SOHID's 3-Sec Rule & MTG-1:\n\nOur system produces highly deterministic target ranges. To secure a high strike rate, adhere to these laws:\n\n1. **Setup Expiration**:\n   - Check that your Quotex candle layout is configured to **1 Minute** (M1).\n   - Align your absolute trade expiration timer to exactly **1 Minute**.\n2. **3-Second Early Entry Formula**:\n   - If a signal directs an action at exactly **15:30:00**, do not wait there.\n   - Click the button at exactly **15:29:57** (exactly 3 seconds before the candle flip). This counters any latency spikes!\n3. **Martingale (MTG-1) Protocol**:\n   - If the primary signal is slightly lost due to a sudden micro-bounce, instantly trigger a safety trade on the next candle in the identical direction but with double the capital.\n   - SOHID's telemetry demonstrates that **MTG-1** delivers an aggregate **98.4% success coefficient**!`;
  }

  // Default fallbacks
  return lang === 'bn'
    ? `হ্যালো! আমি শহীদ-এর ডিজাইনকৃত কাস্টম এআই ইন্টেলিজেন্ট অ্যাসিস্ট্যান্ট (v4.5)। \n\nআমি আপনাকে মূলত ৪টি বিষয়ে শতভাগ সহায়তা করতে সুপ্রশিক্ষিত:\n1. **কোট্যাক্স অ্যাকাউন্ট** খোলার সঠিক নিয়ম ও ভেরিফাইড লিংক।\n2. **জাতীয় পরিচয়পত্র (NID)** দিয়ে কোট্যাক্স অ্যাকাউন্ট ভেরিফাই করার পদ্ধতি।\n3. **বাইনান্স ওয়ালেট** সেটআপ ও বিকাশ/নগদের মাধ্যমে ডিপোজিট-উইথড্র করার গাইড।\n4. **শহীদ ফিউচার সিগন্যাল** নিখুঁতভাবে নেওয়ার নিয়ম (৩ সেকেন্ড রুল এবং MTG-1 কৌশল)।\n\nঅনুগ্রহ করে আপনার প্রয়োজনীয় প্রশ্নটি টাইপ করুন অথবা নিচের "কুইক গাইড" বাটনগুলোর মাধ্যমে সরাসরি সমাধান জেনে নিন!`
    : `Hello! I am SOHID's Custom AI Intelligence Assistant (v4.5). \n\nI am strategically optimized to provide master guidance for:\n1. **Setup and official registration** of your Quotex portal.\n2. **Quick NID document upload** and green badge verification.\n3. **Accessing Binance**, purchasing USDT in P2P, and funding/withdrawing.\n4. **Trading safely** with our signals using the 3-Second Rule and Martingale (MTG-1) safe-havens.\n\nPlease type your specific inquiry or click on one of the Quick Setup Handbooks located at the bottom of the interface to begin!`;
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
      console.warn("Backend unavailable, using SOHID custom client-side intelligence rules:", err);
      const fallbackText = getClientSmartFallbackResponse(userMsg, lang);
      setMessages([...updatedMsgs, { sender: 'ai', text: fallbackText }]);
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
      console.warn("Backend unavailable, using SOHID custom client-side intelligence rules:", err);
      const fallbackText = getClientSmartFallbackResponse(userText, lang);
      setMessages([...updatedMsgs, { sender: 'ai', text: fallbackText }]);
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
