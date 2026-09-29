import React, { useState } from 'react';
import { 
  Instagram, 
  Send, 
  ExternalLink, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles,
  BookOpen,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState(false);

  const handleCopyHandle = () => {
    navigator.clipboard.writeText('@exam._vault');
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <section id="instagram" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ========================================================
            1. INSTAGRAM COMMUNITY CARD (Clean & Official)
            ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-amber-500/5 border-2 border-pink-500/30 relative overflow-hidden shadow-lg">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Info Column */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 text-pink-700 dark:text-pink-300 text-xs font-bold mb-4">
                <Instagram className="w-3.5 h-3.5" />
                <span>OFFICIAL INSTAGRAM BRAND</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
                Follow Exam Vault on Instagram
              </h2>

              <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
                Connect with our fast-growing community of Indian competitive exam aspirants. Get daily PYQ questions, high-yield formula reels, and unbiased book reviews.
              </p>

              {/* Verified Handle Badge */}
              <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1 font-mono text-sm bg-white dark:bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>exam._vault</span>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Government & Engineering Exams
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Follow @exam._vault on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>

                <button
                  onClick={handleCopyHandle}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {copiedHandle ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Handle Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Handle</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Emblem Illustration */}
            <div className="shrink-0 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs border border-pink-200/80 dark:border-neutral-800 text-center shadow-md">
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-600 mb-3">
                <div className="w-20 h-20 rounded-full bg-neutral-900 flex flex-col items-center justify-center text-white p-2">
                  <span className="font-display font-black text-2xl tracking-tighter text-amber-400">EV</span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-300">EXAM VAULT</span>
                </div>
              </div>
              <h3 className="font-display font-bold text-sm text-neutral-900 dark:text-white">
                Exam Vault Official
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Indian Govt Exam Prep Hub
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-pink-600 dark:text-pink-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Daily Updates & Reels</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            2. TELEGRAM CHANNEL & PAYMENT SCREENSHOT SUPPORT
            ======================================================== */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#229ED9]/15 via-[#229ED9]/5 to-transparent border-2 border-[#229ED9]/40 relative overflow-hidden shadow-lg">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#229ED9]/15 text-[#1877A9] dark:text-[#54B9ED] text-xs font-bold mb-4">
                <Send className="w-3.5 h-3.5" />
                <span>OFFICIAL TELEGRAM CHANNEL & SUPPORT</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                Join Us on Telegram & Send Order Screenshots
              </h2>

              <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
                Get book PDFs delivered directly, exam notification alerts, free study notes, and direct order fulfillment support.
              </p>

              {/* Exact user requested instruction notice */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-semibold leading-relaxed shadow-sm">
                📢 <strong>Payment ke baad screenshot (SS) Telegram par send karein.</strong><br />
                <span className="font-normal text-amber-900 dark:text-amber-300">
                  Books aapke Email ya Telegram par send ho jayega!
                </span>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="https://t.me/ssc_rrb_book_hall"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#229ED9] hover:bg-[#1C88BD] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>Join Telegram Channel</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="https://t.me/ssc_rrb_book_hall"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 font-bold text-xs hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#229ED9]" />
                <span>Send Payment SS (@ssc_rrb_book_hall)</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Fast Dispatch on Telegram</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
