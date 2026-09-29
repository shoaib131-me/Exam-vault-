import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Check, 
  QrCode, 
  X, 
  BookOpen, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { Book } from '../types';
import { BOOKS_DATA } from '../data/mockData';

interface ComboPackSectionProps {
  books?: Book[];
  comboPrice?: number;
  onOrderCombo: (selectedBooks: Book[]) => void;
}

export const ComboPackSection: React.FC<ComboPackSectionProps> = ({ 
  books = BOOKS_DATA,
  comboPrice = 69,
  onOrderCombo 
}) => {
  // Pre-select first 2 books as default combo so the user immediately sees the ready deal
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([
    books[0]?.id || '',
    books[1]?.id || ''
  ]);

  const selectedBooks = books.filter((b) => selectedBookIds.includes(b.id));

  const handleToggleBook = (bookId: string) => {
    if (selectedBookIds.includes(bookId)) {
      setSelectedBookIds((prev) => prev.filter((id) => id !== bookId));
    } else {
      if (selectedBookIds.length >= 2) {
        // If already 2 selected, replace the 2nd one
        setSelectedBookIds([selectedBookIds[0], bookId]);
      } else {
        setSelectedBookIds((prev) => [...prev, bookId]);
      }
    }
  };

  const handleSelectPreset = (id1: string, id2: string) => {
    setSelectedBookIds([id1, id2]);
  };

  const isComboComplete = selectedBooks.length === 2;

  const handleOrderClick = () => {
    if (isComboComplete) {
      onOrderCombo(selectedBooks);
    }
  };

  return (
    <section id="combo-pack" className="py-16 sm:py-24 bg-gradient-to-b from-amber-500/10 via-amber-50/40 to-neutral-50 dark:from-amber-950/20 dark:via-neutral-900/40 dark:to-neutral-950 border-t border-b border-amber-200/60 dark:border-amber-900/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>EXCLUSIVE MEGA SAVER OFFER</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Buy Combo Pack at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500">
              ₹{comboPrice}
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Choose any <strong>2 Books</strong> of your choice for just <strong>₹{comboPrice}</strong> (Individual price ₹50 + ₹50 = ₹100). Save an extra ₹{100 - comboPrice} with this student combo!
          </p>
        </div>

        {/* 1-Click Popular Preset Combos */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <span className="font-semibold text-neutral-600 dark:text-neutral-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Combos:
          </span>

          <button
            onClick={() => handleSelectPreset('book-1', 'book-4')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
              selectedBookIds.includes('book-1') && selectedBookIds.includes('book-4')
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-400'
            }`}
          >
            🏗️ Civil Engineering Duo (JE + Formula)
          </button>

          <button
            onClick={() => handleSelectPreset('book-2', 'book-5')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
              selectedBookIds.includes('book-2') && selectedBookIds.includes('book-5')
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-400'
            }`}
          >
            📘 SSC CGL Topper Pack (GS + English)
          </button>

          <button
            onClick={() => handleSelectPreset('book-3', 'book-6')}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
              selectedBookIds.includes('book-3') && selectedBookIds.includes('book-6')
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-400'
            }`}
          >
            🏛️ UPSC & State PSC Master Pack
          </button>
        </div>

        {/* Selected Combo Tray & Order Card */}
        <div className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-amber-300/80 dark:border-amber-700/60 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Slot 1: Book 1 */}
            <div className="md:col-span-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-between">
                <span>Book 1 (Included)</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">₹50 Value</span>
              </div>

              {selectedBooks[0] ? (
                <div className="relative p-3.5 rounded-2xl bg-amber-50/60 dark:bg-neutral-800/80 border border-amber-200 dark:border-neutral-700 flex items-start gap-3 group">
                  <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${selectedBooks[0].coverAccent} text-white flex flex-col justify-between p-1.5 text-[8px] font-bold shrink-0 shadow-sm`}>
                    <span className="text-[7px] text-amber-200 uppercase">{selectedBooks[0].category}</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-semibold uppercase text-amber-700 dark:text-amber-400">
                      {selectedBooks[0].category}
                    </span>
                    <h4 className="font-display font-bold text-xs text-neutral-900 dark:text-white line-clamp-2 leading-tight">
                      {selectedBooks[0].title}
                    </h4>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {selectedBooks[0].publisher}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleBook(selectedBooks[0].id)}
                    className="p-1 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    title="Remove from combo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-center text-neutral-400">
                  <Plus className="w-6 h-6 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs font-medium">Select Book 1 from list below</span>
                </div>
              )}
            </div>

            {/* Plus Indicator */}
            <div className="md:col-span-1 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-black flex items-center justify-center text-lg">
                +
              </div>
            </div>

            {/* Slot 2: Book 2 */}
            <div className="md:col-span-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-between">
                <span>Book 2 (Included)</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">₹50 Value</span>
              </div>

              {selectedBooks[1] ? (
                <div className="relative p-3.5 rounded-2xl bg-amber-50/60 dark:bg-neutral-800/80 border border-amber-200 dark:border-neutral-700 flex items-start gap-3 group">
                  <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${selectedBooks[1].coverAccent} text-white flex flex-col justify-between p-1.5 text-[8px] font-bold shrink-0 shadow-sm`}>
                    <span className="text-[7px] text-amber-200 uppercase">{selectedBooks[1].category}</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-semibold uppercase text-amber-700 dark:text-amber-400">
                      {selectedBooks[1].category}
                    </span>
                    <h4 className="font-display font-bold text-xs text-neutral-900 dark:text-white line-clamp-2 leading-tight">
                      {selectedBooks[1].title}
                    </h4>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {selectedBooks[1].publisher}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleBook(selectedBooks[1].id)}
                    className="p-1 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                    title="Remove from combo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-center text-neutral-400">
                  <Plus className="w-6 h-6 mx-auto mb-1 text-amber-500" />
                  <span className="text-xs font-medium">Select Book 2 from list below</span>
                </div>
              )}
            </div>

            {/* Total & Order Button */}
            <div className="md:col-span-3 p-4 rounded-2xl bg-neutral-900 dark:bg-neutral-950 text-white text-center flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Combo Deal Price
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-neutral-400 line-through text-xs tabular-nums">
                    ₹100
                  </span>
                  <span className="font-display text-3xl font-extrabold text-amber-400 tabular-nums">
                    ₹{comboPrice}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                  You Save ₹{100 - comboPrice} ({Math.round(((100 - comboPrice) / 100) * 100)}% OFF)
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={handleOrderClick}
                  disabled={!isComboComplete}
                  className={`w-full py-3 px-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isComboComplete
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 active:scale-[0.98]'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>{isComboComplete ? `Order Combo @ ₹${comboPrice}` : 'Select 2 Books'}</span>
                </button>
              </div>

              <p className="text-[10px] text-neutral-400 mt-2">
                Scan QR & Send screenshot on Telegram
              </p>
            </div>

          </div>

          {/* Delivery banner */}
          <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Includes complete PDF & solved chapters for both books</span>
            </div>
            <div className="text-neutral-500 text-[11px]">
              Payment via UPI QR · Direct dispatch to your Telegram or Email
            </div>
          </div>

        </div>

        {/* Book Catalog Selector Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Tap Any Book to Add/Replace in Your ₹{comboPrice} Combo:</span>
            </h3>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Selected: {selectedBooks.length}/2
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book) => {
              const isSelected = selectedBookIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  onClick={() => handleToggleBook(book.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div>
                    {/* Top Tag and selection status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {book.category}
                      </span>
                      {isSelected ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Added
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400 font-semibold">
                          ₹{book.discountedPrice}
                        </span>
                      )}
                    </div>

                    {/* Book Cover Badge */}
                    {book.coverImage ? (
                      <div className="h-24 rounded-xl overflow-hidden mb-3 shadow-inner">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={`h-24 rounded-xl bg-gradient-to-br ${book.coverAccent} p-2.5 text-white flex flex-col justify-between mb-3 shadow-inner`}>
                        <span className="text-[8px] font-black uppercase tracking-wider opacity-80">
                          EXAM VAULT
                        </span>
                        <h5 className="font-display font-bold text-xs line-clamp-2 leading-tight">
                          {book.title}
                        </h5>
                      </div>
                    )}

                    <h4 className="font-display font-semibold text-xs text-neutral-900 dark:text-white line-clamp-2 leading-tight">
                      {book.title}
                    </h4>

                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                      {book.publisher} · {book.medium}
                    </p>
                  </div>

                  {/* Add / Selected button */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
                    <button
                      type="button"
                      className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-amber-100 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Combo (Click to Remove)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to ₹69 Combo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
