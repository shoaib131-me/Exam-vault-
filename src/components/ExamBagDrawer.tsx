import React from 'react';
import { 
  X, 
  Trash2, 
  BookMarked, 
  HelpCircle, 
  ExternalLink, 
  ArrowRight,
  BookmarkCheck
} from 'lucide-react';
import { Book, PYQQuestion } from '../types';

interface ExamBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedBooks: Book[];
  savedPYQs: PYQQuestion[];
  onRemoveBook: (id: string) => void;
  onRemovePYQ: (id: string) => void;
  onClearAll: () => void;
  onOpenBookDetail: (book: Book) => void;
}

export const ExamBagDrawer: React.FC<ExamBagDrawerProps> = ({
  isOpen,
  onClose,
  savedBooks,
  savedPYQs,
  onRemoveBook,
  onRemovePYQ,
  onClearAll,
  onOpenBookDetail
}) => {
  if (!isOpen) return null;

  const totalItems = savedBooks.length + savedPYQs.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                My Study Vault ({totalItems})
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Bookmarked books & saved PYQ questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {totalItems > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline px-2 py-1"
                title="Clear all saved items"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          
          {totalItems === 0 ? (
            <div className="py-20 text-center text-neutral-400">
              <BookMarked className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-display font-semibold text-sm text-neutral-700 dark:text-neutral-300">
                Your Vault is Empty
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">
                Bookmark books and PYQs with the bookmark icon to save them for quick last-minute revision!
              </p>
            </div>
          ) : (
            <>
              {/* Saved Books */}
              {savedBooks.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                    <BookMarked className="w-3.5 h-3.5 text-amber-500" />
                    <span>Saved Books ({savedBooks.length})</span>
                  </h4>
                  <div className="space-y-3">
                    {savedBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-start justify-between gap-3"
                      >
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => {
                            onOpenBookDetail(book);
                            onClose();
                          }}
                        >
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                            {book.category} · {book.publisher}
                          </div>
                          <h5 className="font-display font-semibold text-xs text-neutral-900 dark:text-white line-clamp-2 hover:text-amber-600 transition-colors">
                            {book.title}
                          </h5>
                          <div className="text-xs font-bold text-neutral-900 dark:text-white mt-1 tabular-nums">
                            ₹{book.discountedPrice}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveBook(book.id)}
                            className="text-neutral-400 hover:text-rose-500 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={book.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-xs text-amber-600 hover:underline flex items-center gap-0.5"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved PYQs */}
              {savedPYQs.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Saved PYQ Questions ({savedPYQs.length})</span>
                  </h4>
                  <div className="space-y-3">
                    {savedPYQs.map((q) => (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                            {q.exam} ({q.year}) · {q.subject}
                          </div>
                          <p className="text-xs text-neutral-800 dark:text-neutral-200 line-clamp-2 mt-0.5 font-medium">
                            {q.question}
                          </p>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                            Answer Key: Option {q.correctOption}
                          </div>
                        </div>

                        <button
                          onClick={() => onRemovePYQ(q.id)}
                          className="text-neutral-400 hover:text-rose-500 p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
};
