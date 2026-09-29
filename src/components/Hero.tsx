import React from 'react';
import { 
  Instagram, 
  ArrowRight, 
  BookMarked, 
  HelpCircle, 
  FileText, 
  DownloadCloud,
  CheckCircle2,
  Sparkles,
  Send
} from 'lucide-react';

interface HeroProps {
  onExploreMaterials: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMaterials }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-amber-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 transition-colors">
      
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-4 left-1/4 w-80 h-80 bg-amber-300 rounded-full blur-3xl mix-blend-multiply filter" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-orange-300 rounded-full blur-3xl mix-blend-multiply filter" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram & Telegram Educational Header Kicker (Follower counts removed) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 font-medium">
            <Instagram className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
            <span>Official Instagram & Telegram Educational Portal</span>
          </div>
          <span className="hidden sm:inline text-neutral-400">·</span>
          <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Answer Keys
          </span>
        </div>

        {/* Primary Headline & Subheadline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
            Your Competitive Exam Preparation,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500">
              Simplified.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto text-balance">
            Books, PYQs, Formula Handbooks & Study Resources — Everything you need for your exam preparation in one place.
          </p>

          {/* Dual Prominent CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExploreMaterials}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] whitespace-nowrap cursor-pointer"
            >
              <span>Explore Study Materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm hover:border-pink-300 dark:hover:border-pink-800 transition-all whitespace-nowrap group"
            >
              <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
              <span>Follow Us on Instagram</span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400">@exam._vault</span>
            </a>

            <a
              href="https://t.me/ssc_rrb_book_hall"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#229ED9] hover:bg-[#1B89BD] rounded-xl shadow-sm transition-all whitespace-nowrap group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span>Join Telegram</span>
            </a>
          </div>

          {/* Quick interactive test kicker */}
          <div className="mt-5 text-center">
            <button
              onClick={onExploreMaterials}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-amber-700 dark:text-neutral-400 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>SSC JE, UPSC, PSC & Railway 2026 Solved Books Available</span>
              <span className="underline underline-offset-2">Browse Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Trust / Benefit Section - The 4 pillars */}
        <div className="mt-14 pt-8 border-t border-neutral-200/80 dark:border-neutral-800">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
              The 4 Pillars of Exam Vault Preparation
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* 1. Competitive Exam Books */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookMarked className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white">
                Competitive Exam Books
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Handpicked, unbiased recommendations for SSC, JE, UPSC & State PSC with direct QR payment ordering.
              </p>
            </div>

            {/* 2. Direct QR Payment */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white">
                Instant QR Payment
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Scan QR with GPay, PhonePe, Paytm or BHIM UPI & share screenshot on Telegram for fast dispatch.
              </p>
            </div>

            {/* 3. Telegram Book Hall */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-[#229ED9] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white">
                Telegram Book Hall
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Join @ssc_rrb_book_hall for book PDFs delivered directly to your Telegram or Email inbox.
              </p>
            </div>

            {/* 4. Verified Exam Resources */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <DownloadCloud className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-base text-neutral-900 dark:text-white">
                100% Verified Content
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                TCS pattern solved papers, formula cheat-sheets, syllabus maps, and official notification guides.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
