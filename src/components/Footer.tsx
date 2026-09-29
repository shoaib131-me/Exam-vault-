import React from 'react';
import { BookOpen, Instagram, Heart, ExternalLink, Send, Lock, Edit3 } from 'lucide-react';

interface FooterProps {
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isAdmin = false, onOpenAdminLogin }) => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Exam Vault
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Your Competitive Exam Preparation, Simplified. Handpicked books, daily PYQ drills, and verified formula handbooks for SSC, JE/AE, UPSC, State PSCs & Railways.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@exam._vault</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href="https://t.me/ssc_rrb_book_hall"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#4EB7ED] text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Support</span>
              </a>
            </div>
          </div>

          {/* Quick Exam Categories */}
          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Exam Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">SSC CGL, CHSL & CPO</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">SSC JE Civil, Electrical & Mech</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">UPSC Civil Services & CSAT</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">State PSC (UPPSC, BPSC, MPPSC)</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">State AE & Junior Engineer</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">Railway RRB NTPC & Group D</a>
              </li>
            </ul>
          </div>

          {/* Resources & Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">Exam Categories</a>
              </li>
              <li>
                <a href="#books" className="hover:text-amber-400 transition-colors">Competitive Books & QR Ordering</a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-amber-400 transition-colors">Instagram Creator Channel</a>
              </li>
              <li>
                <a href="https://t.me/ssc_rrb_book_hall" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Telegram Book Hall Channel</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Exam Vault Mission</a>
              </li>
            </ul>
          </div>

          {/* Community & Order Support */}
          <div className="md:col-span-2">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Order & Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Exam Vault</a>
              </li>
              <li>
                <a href="https://t.me/ssc_rrb_book_hall" target="_blank" rel="noopener noreferrer" className="text-[#4EB7ED] hover:underline font-semibold">
                  Send Screenshot on Telegram
                </a>
              </li>
              <li>
                <a href="https://t.me/ssc_rrb_book_hall" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Join Telegram Channel
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  Follow on Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Order Instructions Notice */}
        <div className="mb-8 p-4 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-xs text-neutral-300">
          <p className="font-semibold text-amber-400 mb-1">
            📦 Book Delivery Notice:
          </p>
          <p>
            Payment ke baad screenshot Telegram (<a href="https://t.me/ssc_rrb_book_hall" target="_blank" rel="noopener noreferrer" className="text-[#4EB7ED] underline">@ssc_rrb_book_hall</a>) par send karein. Books aapke Email ya Telegram par instant deliver ho jayega.
          </p>
        </div>

        {/* Bottom Bar: Disclaimer & Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Exam Vault. An educational initiative built with pride for Indian competitive aspirants.
          </p>

          <div className="flex items-center gap-4 text-neutral-500">
            {onOpenAdminLogin && (
              <button
                onClick={onOpenAdminLogin}
                className="text-[11px] text-neutral-500 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isAdmin ? <Edit3 className="w-3.5 h-3.5 text-amber-500" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isAdmin ? '👑 Owner Mode Active' : 'Owner Edit Mode'}</span>
              </button>
            )}

            <div className="flex items-center gap-1">
              <span>Crafted for Bharat Aspirants</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 text-[10px] text-neutral-600 leading-relaxed text-center sm:text-left">
          Disclaimer: Exam Vault is an independent educational brand and curation platform. All exam names, logos, and commission trademarks (SSC, UPSC, RRB, IBPS, State PSCs) belong to their respective government bodies.
        </div>

      </div>
    </footer>
  );
};
