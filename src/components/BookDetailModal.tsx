import React from 'react';
import { 
  X, 
  Star, 
  Check, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Share2, 
  ArrowRight,
  Edit3
} from 'lucide-react';
import { Book } from '../types';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (book: Book) => void;
  onOrderBook: (book: Book) => void;
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  isSaved,
  onToggleSave,
  onOrderBook,
  isAdmin = false,
  onEditBook
}) => {
  if (!book) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out ${book.title} on Exam Vault!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${book.title} - Recommended by Exam Vault`);
      alert('Book link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>{book.category}</span>
            <span>·</span>
            <span>{book.medium} Medium</span>
            <span>·</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">{book.edition}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Share Book"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Realistic Vector Book Cover or Uploaded Image */}
            <div className="md:col-span-4 flex flex-col items-center">
              {book.coverImage ? (
                <div className="relative w-48 h-64 rounded-r-xl rounded-l-xs overflow-hidden shadow-xl border-l-4 border-l-neutral-900/40 select-none">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  <div className="absolute top-0 bottom-0 left-2 w-px bg-black/30 pointer-events-none" />
                  {book.badge && (
                    <span className="absolute top-2 right-2 text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold shadow-xs">
                      {book.badge}
                    </span>
                  )}
                </div>
              ) : (
                <div className={`relative w-48 h-64 rounded-r-xl rounded-l-xs bg-gradient-to-br ${book.coverAccent} text-white p-4 shadow-xl border-l-4 border-l-neutral-900/40 flex flex-col justify-between select-none`}>
                  
                  {/* Book spine line styling */}
                  <div className="absolute top-0 bottom-0 left-2 w-px bg-white/20" />
                  
                  {/* Book Badge */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-amber-300">
                      EXAM VAULT
                    </span>
                    {book.badge && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold">
                        {book.badge}
                      </span>
                    )}
                  </div>

                  {/* Cover Title */}
                  <div className="pl-2">
                    <p className="text-[10px] text-amber-200 uppercase font-semibold">
                      {book.category} PREPARATION
                    </p>
                    <h4 className="font-display font-bold text-sm leading-snug mt-1 text-white line-clamp-3">
                      {book.title}
                    </h4>
                  </div>

                  {/* Author & Publisher seal */}
                  <div className="pl-2 pt-2 border-t border-white/20 flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-white/70">Author</p>
                      <p className="text-[10px] font-semibold text-white truncate max-w-[100px]">
                        {book.author}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-amber-300 font-bold">{book.publisher}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Quick Edit Button */}
              {isAdmin && onEditBook && (
                <button
                  onClick={() => {
                    onEditBook(book);
                    onClose();
                  }}
                  className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Book (Owner Mode)</span>
                </button>
              )}

              {/* Book quick specs */}
              <div className="mt-4 w-full text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="font-medium text-neutral-900 dark:text-white tabular-nums">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="font-medium text-neutral-900 dark:text-white">{book.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span className="font-medium text-neutral-900 dark:text-white truncate max-w-[120px]">{book.publisher}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Book Details & Table of Contents */}
            <div className="md:col-span-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
                  {book.title}
                </h3>
                
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                  <span>By <strong className="text-neutral-800 dark:text-neutral-200">{book.author}</strong></span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{book.rating}</span>
                    <span className="text-neutral-400 font-normal">({book.reviewsCount.toLocaleString()} ratings)</span>
                  </span>
                </div>

                {/* Price Bar */}
                <div className="mt-4 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-neutral-900 dark:text-white tabular-nums">
                        ₹{book.discountedPrice}
                      </span>
                      <span className="text-sm text-neutral-400 line-through tabular-nums">
                        ₹{book.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {Math.round(((book.originalPrice - book.discountedPrice) / book.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5">
                      <Truck className="w-3 h-3 text-neutral-400" />
                      <span>Available on Amazon, Flipkart & Leading Bookstores</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="mt-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                    Why Exam Vault Recommends This Book
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {book.detailedDescription}
                  </p>
                </div>

                {/* Key Features Checklist */}
                <div className="mt-4">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    {book.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Table of Contents Preview */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Table of Contents Preview</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {book.tableOfContents.map((ch, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">0{idx + 1}.</span>
                        <span className="truncate">{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onOrderBook(book);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  <span>Order Now & Pay via QR Code (₹{book.discountedPrice})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onToggleSave(book)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                    isSaved
                      ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-600" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save Book</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
