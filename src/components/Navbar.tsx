import React, { useState } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Search, 
  ExternalLink, 
  Instagram, 
  Send,
  Lock,
  Edit3,
  User,
  Package,
  ShieldCheck
} from 'lucide-react';
import { CustomerUser } from '../types';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  savedCount: number;
  onOpenExamBag: () => void;
  onOpenSearch: () => void;
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onOpenOrders?: () => void;
  currentUser?: CustomerUser | null;
  onOpenCustomerAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  savedCount,
  onOpenExamBag,
  onOpenSearch,
  isAdmin = false,
  onOpenAdminLogin,
  onOpenOrders,
  currentUser = null,
  onOpenCustomerAuth
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand Wordmark (Single text element with clean icon) */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (window.location.hash) {
                  window.history.pushState(null, '', window.location.pathname);
                }
              }}
              className="flex items-center gap-2 group text-neutral-900 dark:text-neutral-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Exam Vault
              </span>
            </a>
          </div>

          {/* Zone 2: Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <a 
              href="#categories" 
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Categories
            </a>
            <a 
              href="#books" 
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Books (@₹50)
            </a>
            <a 
              href="#combo-pack" 
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
            >
              <span>Combo Pack</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950 font-black">₹69</span>
            </a>
            <a 
              href="#instagram" 
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              Instagram
            </a>
            <a 
              href="https://t.me/ssc_rrb_book_hall" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#229ED9] hover:text-[#1981B2] font-semibold flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>
            <a 
              href="#about" 
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Zone 3: Primary Actions & Toggles */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search resources"
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Saved Items / Exam Bag Drawer Trigger */}
            <button
              onClick={onOpenExamBag}
              aria-label="View saved items"
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Saved Study Vault"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Customer Account / Login Trigger */}
            {onOpenCustomerAuth && (
              <button
                onClick={onOpenCustomerAuth}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentUser
                    ? 'bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25'
                    : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                }`}
                title={currentUser ? `Account: ${currentUser.name}` : 'Login with Phone OTP or Gmail'}
              >
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Student Login'}
                </span>
                {currentUser && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>
            )}

            {/* Owner Orders Trigger (Visible when Owner mode is active) */}
            {isAdmin && onOpenOrders && (
              <button
                onClick={onOpenOrders}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 text-xs font-extrabold border border-amber-500 cursor-pointer shadow-xs"
                title="View Customer Orders"
              >
                <Package className="w-3.5 h-3.5 text-amber-400 dark:text-neutral-950" />
                <span>Orders</span>
              </button>
            )}

            {/* Owner Edit Mode Trigger (Locked with Owner Phone) */}
            {onOpenAdminLogin && (
              <button
                onClick={onOpenAdminLogin}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isAdmin
                    ? 'text-amber-500 bg-amber-500/20 border border-amber-500/40'
                    : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isAdmin ? 'Owner Mode Active (Phone Lock)' : 'Owner Lock (Only for me via registered phone number)'}
              >
                {isAdmin ? <Edit3 className="w-4 h-4 text-amber-500" /> : <Lock className="w-4 h-4 opacity-70" />}
              </button>
            )}

            {/* Primary Action: Follow Instagram */}
            <a
              href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@exam._vault</span>
            </a>

            {/* Primary Action: Join Telegram */}
            <a
              href="https://t.me/ssc_rrb_book_hall"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#229ED9] hover:bg-[#1B89BD] rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            {/* Mobile Account / Auth */}
            {onOpenCustomerAuth && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomerAuth();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  <span>{currentUser ? `Account: ${currentUser.name}` : 'Student Login (Phone / Gmail OTP)'}</span>
                </span>
                {currentUser && <span className="text-xs text-emerald-600 font-semibold">Active</span>}
              </button>
            )}

            {/* Mobile Owner Orders Access */}
            {isAdmin && onOpenOrders && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrders();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-bold text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-amber-500" />
                <span>Customer Orders Dashboard</span>
              </button>
            )}

            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Exam Categories
            </a>
            <a
              href="#books"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Competitive Exam Books (@₹50)
            </a>
            <a
              href="#combo-pack"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
            >
              ⚡ Buy Combo Pack (Any 2 Books @ ₹69)
            </a>
            <a
              href="#instagram"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Instagram Feed (@exam._vault)
            </a>
            <a
              href="https://t.me/ssc_rrb_book_hall"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-[#229ED9] hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              ✈️ Join Telegram Channel (@ssc_rrb_book_hall)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              About Exam Vault
            </a>
            <div className="pt-2 space-y-2">
              <a
                href="https://t.me/ssc_rrb_book_hall"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#229ED9] hover:bg-[#1B89BD] rounded-lg shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Payment SS on Telegram</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </a>

              <a
                href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 rounded-lg shadow-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @exam._vault on Instagram</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
