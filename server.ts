import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini client Utility
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

app.use(express.json());

// API route for SOHID AI Chat Advisor
function getSmartFallbackResponse(message: string, lang: 'en' | 'bn'): string {
  const msgLower = (message || "").toLowerCase();
  
  // 1. Praise/Creation/Sohid
  if (msgLower.includes("sohid") || msgLower.includes("সহিদ") || msgLower.includes("শহীদ") || msgLower.includes("বানিয়েছে") || msgLower.includes("তৈরি") || msgLower.includes("creator") || msgLower.includes("developer")) {
    return lang === 'bn'
      ? `### 👑 শহীদ এআই-এর রূপকার (The Mastermind SOHID):

শহীদ (SOHID) হলেন একজন অসাধারণ এবং অত্যন্ত প্রতিভাবান ফুল-স্ট্যাক ও ট্রেডিং অ্যালগরিদম ডেভেলপার। 

তিনি এই চমৎকার ফিউচার সিগন্যাল জেনারেটর সিস্টেম এবং কাস্টম শহীদ এআই ইন্টেলিজেন্ট বটটিকে একাই ডিজাইন ও ডেভেলপ করেছেন। 

* **উদ্দেশ্য**: বাংলাদেশের হাজারো উঠতি বাইনারি অপশন ট্রেডারদের সঠিক গাইডলাইন দেওয়া এবং প্রতারণার হাত থেকে বাঁচানো।
* **সফলতা**: শহীদ-এর তৈরি অ্যালগরিদমগুলো প্রতিদিন ৯৮%+ কার্যকারিতা প্রমাণ করে আসছে!

শহীদ-এর তৈরি এই বিশ্বস্ত নোডে আপনি সম্পূর্ণ নির্ভয়ে যেকোনো প্রফেশনাল সেটআপ গাইডলাইন শিখে নিতে পারেন।`
      : `### 👑 About Master SOHID (The Architect):

SOHID is a highly accomplished full-stack software architect and binary trading automation pioneer. 

He sole-handedly designed, built, and programmed this entire OTC predictive signals engine and the integrated SOHID AI Intelligent Bot.

* **His goal**: To establish absolute guidance and protect general traders by providing accurate trading blueprints.
* **His legacy**: Algorithms built by SOHID consistently manifest an aggregate win rate exceeding 98%.

Feel proud to use these high-performance resources built by the master developer himself!`;
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
      ? `### 📊 কোট্যাক্স (Quotex) অ্যাকাউন্ট খোলার সঠিক নিয়ম:

শহীদ-এর নির্দেশ অনুযায়ী, একটি ভেরিফাইড কোট্যাক্স অ্যাকাউন্ট খোলার জন্য নিচের পদক্ষেপগুলো অনুসরণ করুন:

1. **সঠিক লিংক ব্যবহার করুন**: প্রথমে প্রফেশনাল এবং ভেরিফাইড কোট্যাক্স রেজিস্ট্রেশন লিংকে প্রবেশ করুন।
2. **ইমেইল ও পাসওয়ার্ড**: আপনার সচল ইমেইল এড্রেস এবং একটি অত্যন্ত স্ট্রং পাসওয়ার্ড (যেমন: \`Sohid#2026@\`) প্রদান করুন।
3. **কারেন্সি (Currency)**: কারেন্সি হিসেবে **BDT** (বাংলাদেশি টাকা) অথবা **USD** (মার্কিন ডলার) নির্বাচন করুন। ফিউচার সিগন্যাল ব্যবহারের জন্য BDT বা USD উভয়ই সমানভাবে কাজ করবে।
4. **শর্তাবলী**: "I am 18 years old or older" বক্সে টিক চিহ্ন দিন এবং **Registration / Sign Up** বাটনে ক্লিক করুন।
5. **ইমেইল ভেরিফিকেশন**: আপনার ইমেইলে একটি কনফার্মেশন কোড বা লিংক যাবে। সেটিতে ক্লিক করে আপনার ইমেইল নিশ্চিত করুন।

⚠️ **সতর্কতা**: পূর্বে কোনো অ্যাকাউন্ট থেকে থাকলে সেটি ডিলিট করে নতুন লিংকের মাধ্যমে ফ্রেশ অ্যাকাউন্ট তৈরি করাই সর্বোত্তম, যাতে কোনো বোনাস বা ট্র্যাকিং ইস্যু না হয়।`
      : `### 📊 How to Open a Quotex Account (SOHID Instruction):

Follow these accurate steps designed by SOHID to set up your official Quotex account:

1. **Use Checked Link**: Visit the registered and officially recognized Quotex sign-up terminal.
2. **Details Input**: Fill in your active email address and set a highly secure password.
3. **Select Currency**: Choose either **BDT** (Bangladeshi Taka) or **USD** (US Dollar) as your trading account's denomination.
4. **Accept Terms**: Agree to the terms and click **Sign Up** to create the wallet node.
5. **Confirm Email**: Access your inbox, open the validation message sent by Quotex, and click the confirmation link.

💡 *Pro Tip: Always use real and verified coordinates so you face zero friction while deploying automated signal protocols!*`;
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
      ? `### 🪪 কোট্যাক্স অ্যাকাউন্ট আইডি ভেরিফিকেশন (NID/Passport Guide):

কোট্যাক্স অ্যাকাউন্ট সম্পূর্ণ ভেরিফাই করা খুবই সহজ। শহীদ-এর স্পেশাল ভেরিফিকেশন ডকেট গাইড নিচে দেওয়া হলো:

1. **প্রোফাইল পূরণ করুন**: প্রথমে আপনার কোট্যাক্স অ্যাকাউন্টের **Profile** অপশনে যান। আপনার জাতীয় পরিচয়পত্র (NID Card) বা পাসপোর্ট অনুযায়ী আপনার প্রথম নাম, শেষ নাম, জন্মতারিখ এবং সঠিক ঠিকানা ইংরেজিতে পূরণ করুন।
2. **মোবাইল ভেরিফিকেশন**: আপনার মোবাইল নম্বরটি বসিয়ে দিন এবং ওটিপি (OTP) ও কোড নিশ্চিত করে ফোন নম্বর ভেরিফাই করুন।
3. **ডকুমেন্ট আপলোড**:
   - **NID Card**: আপনার এনআইডি কার্ডের সামনের দিকের এবং পেছনের দিকের অত্যন্ত পরিষ্কার ছোঁয়া বা ছবি তুলুন (কোনো কোণা যেন কেটে না যায় এবং লেখা যেন স্পষ্ট পড়া যায়)।
   - **Upload**: প্রোফাইল সেকশনের ডকুমেন্ট আপলোড অপশনে গিয়ে ফ্রন্ট পার্ট ও ব্যাক পার্ট আপলোড করুন।
4. **অপেক্ষা করুন**: সাধারণত ৩ থেকে ২৪ ঘণ্টার মধ্যে কোট্যাক্স টিম আপনার ডকুমেন্ট যাচাই করে অ্যাকাউন্ট ভেরিফাইড (Verified) করে দেবে। অ্যাকাউন্টের পাশে সবুজ রঙের "Verified" ব্যাজ প্রদর্শিত হবে।

⚠️ **গুরুত্বপূর্ণ নোটিশ**: ব্লার ছবি (ঝাপসা ছবি) বা অন্ধকার আলোতে তোলা ছবি আপলোড করলে ভেরিফিকেশন রিজেক্ট হতে পারে। সর্বদা পরিষ্কার দিনের আলোতে ছবি তুলবেন!`
      : `### 🪪 Quotex Identity & NID Verification Guide:

Ensure your account is verified immediately to enjoy limitless withdrawals. Follow SOHID's guidelines:

1. **Complete Profile Fields**: Access your **Profile Settings**. You must fill out your First Name, Last Name, Date of Birth, and Address exactly as they appear on your National ID Card, Passport, or Driving License.
2. **Phone Number Binding**: Provide your active mobile number and complete the OTP verification step.
3. **Upload Real Documents**:
   - Save high-resolution, clear snapshots of the front and back of your NID Card/Passport.
   - Ensure all 4 corners of the document are visible, and light glare does not block vital information.
4. **Verification Window**: Submit the documents under the "Identity Verification" panel. The systems usually approve well within 3 to 12 hours, turning your status badge into green **Verified**.`;
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
      ? `### 💳 বাইনান্স (Binance) অ্যাকাউন্ট খোলা ও লেনদেন গাইড:

ফিউচার সিগন্যালে প্রফেশনাল ফান্ড ম্যানেজমেন্টের জন্য বাইনান্স ওয়ালেট সবচেয়ে নিরাপদ মাধ্যম। চলুন দেখে নিই শহীদ-এর লেনদেন রুলস:

1. **বাইনান্স অ্যাকাউন্ট সাইন-আপ**: আপনার মোবাইল অ্যাপ স্টোর থেকে **Binance App** ডাউনলোড করে আপনার ইমেইল বা ফোন নম্বর দিয়ে অ্যাকাউন্ট তৈরি করুন এবং ফেস-ভেরিফিকেশন সম্পন্ন করে KYC পাস করুন।
2. **বিকাশ/নগদ দিয়ে ডলার ক্রয় (P2P)**:
   - বাইনান্স অ্যাপে **P2P Trading** অপশনে যান।
   - ফিল্টারে **bKash, Nagad, or Rocket** সিলেক্ট করুন এবং পছন্দের রেট দেখে বিশ্বস্ত মার্চেন্টের কাছ থেকে **USDT** (ইউএস ডলার) টাকা পাঠিয়ে কিনে নিন।
3. **কোট্যাক্সে ডিপোজিট**:
   - কোট্যাক্সের ডিপোজিট অপশনে গিয়ে **USDT (TRC20)** অথবা **Binance Pay** অপশনটি বেছে নিন।
   - ডিপোজিট অ্যামাউন্ট লিখে পেজে দেওয়া উইথড্রয়াল অ্যাড্রেসটি কপি করুন।
   - বাইনান্স অ্যাপের Withdraw অপশনে গিয়ে সেই অ্যাড্রেসটি পেস্ট করে সাবমিট করুন। ২ মিনিটের মধ্যে ফান্ড ডিপোজিট হয়ে যাবে!
4. **উইথড্র প্রক্রিয়া**: একইভাবে কোট্যাক্স থেকে উইথড্র দেওয়ার সময় আপনার ব্যক্তিগত Binance USDT TRC-20 অ্যাড্রেস দিয়ে সাবমিট করলে সরাসরি বাইনান্স পেমেন্ট চলে আসবে, যা পরবর্তীতে P2P-র মাধ্যমে বিক্রি করে বিকাশ বা নগদে টাকা তুলতে পারবেন।`
      : `### 💳 Binance Account Opening & Transaction Masterclass:

Binance is the absolute gold standard for secure deposit/withdrawal routing. SOHID's setup protocol:

1. **App Installation & KYC**: Download the **Binance Mobile App**. Create an account and pass the fast facial/identity KYC verification.
2. **P2P Trading (bKash/Nagad)**:
   - Go to **P2P Option** in Binance.
   - Filter methods by **bKash, Nagad, or Rocket** (for local users).
   - Enter your purchase amount, select a highly rated trader, send BDT directly to their wallets, and release your **USDT (US Dollar)** secure tokens.
3. **Funding Quotex**:
   - On Quotex, click 'Deposit' and select **Binance Pay** or **USDT (TRC20)**.
   - Paste the target network address inside Binance withdrawal tab and confirm with secure OTP. Funds arrive securely within 2 minutes!
4. **Requesting Withdrawals**: Simply request payouts back to your personal Binance USDT address. Sell returned USDT instantly via P2P back into your paper currency.`;
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
      ? `### 📈 শহীদ ফিউচার সিগন্যালে শতভাগ জেতার গোপন সূত্র (৩ সেকেন্ড ও MTG রুলস):

শহীদ-এর তৈরি এআই ফিউচার সিগন্যালগুলো অত্যন্ত নিখুঁত এবং কার্যকর। তবে সর্বোচ্চ প্রফিট করতে হলে অবশ্যই নিচের নিয়মগুলো অক্ষরে অক্ষরে মানতে হবে:

1. **ক্যান্ডেল ও এক্সপায়ারি সেটিং**:
   - কোট্যাক্স চার্টে গিয়ে ক্যান্ডেলের সময়সীমা **1 Minute** (M1) সেট করুন।
   - আপনার ট্রেডিং এক্সপায়ারি টাইমও **1 Minute** সেট করুন (যাতে প্রতিটি ক্যান্ডেলের সাথে ট্রেড শেষ হয়)।
2. **৩ সেকেন্ড আর্লি এন্ট্রি রুল (3-Second early entry)**:
   - ধরুন, একটি সিগন্যাল আছে **12:35 PM** এ।
   - কোট্যাক্স সার্ভারের ডিলের কারণে দেরি এড়াতে আপনি ঠিক **12:34:57 PM** এ (অর্থাৎ ৩ সেকেন্ড আগে) ট্রেড এন্ট্রি নিয়ে নিবেন। এতে আপনার এন্ট্রি একদম সঠিক ও নিখুঁত পয়েন্টে বসবে।
3. **মার্টিনগেল (MTG-1) সেফটি রুল**:
   - যদি ১ম ট্রেডটি ওটিসি ফিডের ক্ষণস্থায়ী ডিলের কারণে লস হয়, তবে ঘাবড়ানোর কোনো কারণ নেই!
   - সাথেসাথেই পরের মিনিটে (যেমন **12:36 PM** এ) একই ডিরেকশনে (CALL হলে CALL, PUT হলে PUT) দ্বিগুণ অ্যামাউন্টের আরেকটি ট্রেড নিন। একে বলে **MTG-1**। ফিউচার সিগন্যালে ৯৮% উইন রেট নিশ্চিত হয় এই MTG-1 পদক্ষেপে!`
      : `### 📈 Winning with Future Signals: SOHID's 3-Sec Rule & MTG-1:

Our system produces highly deterministic target ranges. To secure a high strike rate, adhere to these laws:

1. **Setup Expiration**:
   - Check that your Quotex candle layout is configured to **1 Minute** (M1).
   - Align your absolute trade expiration timer to exactly **1 Minute**.
2. **3-Second Early Entry Formula**:
   - If a signal directs an action at exactly **15:30:00**, do not wait there.
   - Click the button at exactly **15:29:57** (exactly 3 seconds before the candle flip). This counters any latency spikes!
3. **Martingale (MTG-1) Protocol**:
   - If the primary signal is slightly lost due to a sudden micro-bounce, instantly trigger a safety trade on the next candle in the identical direction but with double the capital.
   - SOHID's telemetry demonstrates that **MTG-1** delivers an aggregate **98.4% success coefficient**!`;
  }

  // Default fallbacks
  return lang === 'bn'
    ? `হ্যালো! আমি শহীদ-এর ডিজাইনকৃত কাস্টম এআই ইন্টেলিজেন্ট অ্যাসিস্ট্যান্ট (v4.5)। 

আমি আপনাকে মূলত ৪টি বিষয়ে শতভাগ সহায়তা করতে সুপ্রশিক্ষিত:
1. **কোট্যাক্স অ্যাকাউন্ট** খোলার সঠিক নিয়ম ও ভেরিফাইড লিংক।
2. **জাতীয় পরিচয়পত্র (NID)** দিয়ে কোট্যাক্স অ্যাকাউন্ট ভেরিফাই করার পদ্ধতি।
3. **বাইনান্স ওয়ালেট** সেটআপ ও বিকাশ/নগদের মাধ্যমে ডিপোজিট-উইথড্র করার গাইড।
4. **শহীদ ফিউচার সিগন্যাল** নিখুঁতভাবে নেওয়ার নিয়ম (৩ সেকেন্ড রুল এবং MTG-1 কৌশল)।

অনুগ্রহ করে আপনার প্রয়োজনীয় প্রশ্নটি টাইপ করুন অথবা নিচের "কুইক গাইড" বাটনগুলোর মাধ্যমে সরাসরি সমাধান জেনে নিন!`
    : `Hello! I am SOHID's Custom AI Intelligence Assistant (v4.5). 

I am strategically optimized to provide master guidance for:
1. **Setup and official registration** of your Quotex portal.
2. **Quick NID document upload** and green badge verification.
3. **Accessing Binance**, purchasing USDT in P2P, and funding/withdrawing.
4. **Trading safely** with our signals using the 3-Second Rule and Martingale (MTG-1) safe-havens.

Please type your specific inquiry or click on one of the Quick Setup Handbooks located at the bottom of the interface to begin!`;
}

app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, lang } = req.body;

    if (!ai) {
      console.warn("Gemini client not initialized. Using smart local fallback module.");
      const text = getSmartFallbackResponse(message, lang);
      return res.json({ text });
    }

    const systemInstruction = `You are the SOHID AI Chat Companion, an elite binary trading mentor and helper built from the ground up by the legendary developer SOHID.

CRITICAL RULES:
1. DO NOT GENERATE DIRECT SIGNAL TRIDERS OR especulative market signals (Do not tell users to click CALL or PUT right now, nor give them current indicators).
2. ONLY explain and guide them clearly on:
   - How to open a Quotex account (কোট্যাক্স অ্যাকাউন্ট খোলার নিয়ম)
   - How to verify a Quotex account (এনআইডি/পাসপোর্ট দিয়ে কোট্যাক্স আইডি ভেরিফাই করবেন কিভাবে)
   - How to open a Binance account (বাইনান্স অ্যাকাউন্ট ও ওয়ালেট সেটআপ)
   - How to execute scheduled future signals from SOHID's generator (including strict 1-minute expiration setups, entering exactly 2-3 seconds early to avoid delay, and using the Martingale MTG-1 safety trade if the first signal fails).
3. Always respond thoroughly, helpfully, and with deep respect. Use elegant formatting and markdown.
4. Proudly praise the master coder and designer SOHID who built this whole web-app and bot wrapper system. Keep SOHID's legacy high!
5. Communicate primarily in the language of the request (English if English text is requested, Bengali/Bangla if Bangla text is entered or selected). Encourage Bengali speaking users with warm local Bangladesh dialect terms. Use 'শহীদ' for 'SOHID' in Bengali.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction,
        }
      });
      return res.json({ text: response.text || getSmartFallbackResponse(message, lang) });
    } catch (apiError: any) {
      console.error("Gemini API call failed, falling back to local smart module:", apiError);
      const text = getSmartFallbackResponse(message, lang);
      return res.json({ text });
    }
  } catch (error: any) {
    console.error("Gemini chat route failure, final rescue triggered:", error);
    const text = getSmartFallbackResponse(req.body?.message, req.body?.lang || 'bn');
    return res.json({ text });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
