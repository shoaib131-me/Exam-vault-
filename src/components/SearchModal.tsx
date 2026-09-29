import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { BOOKS_DATA, DAILY_PYQS, FREE_RESOURCES } from '../data/mockData';
import { Book, ExamCategory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
  onSelectCategory: (cat: ExamCategory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectBook,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { books: [], pyqs: [], resources: [] };

    const books = BOOKS_DATA.filter((b) => 
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.publisher.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    ).slice(0, 4);

    const pyqs = DAILY_PYQS.filter((p) => 
      p.question.toLowerCase().includes(q) ||
      p.exam.toLowerCase().includes(q) ||
      p.subject.toLowerCase().includes(q)
    ).slice(0, 3);

    const resources = FREE_RESOURCES.filter((r) => 
      r.title.toLowerCase().includes(q) ||
      r.exam.toLowerCase().includes(q)
    ).slice(0, 3);

    return { books, pyqs, resources };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, IS codes, formulas, SSC, Civil JE, UPSC, Polity..."
            className="w-full text-sm bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md text-xs"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {!query ? (
            <div className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
              <p>Type keywords like <strong>&quot;Civil&quot;</strong>, <strong>&quot;Laxmikanth&quot;</strong>, <strong>&quot;YCT&quot;</strong>, <strong>&quot;Formula&quot;</strong> or <strong>&quot;SSC JE&quot;</strong></p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['SSC JE Civil', 'Laxmikanth Polity', 'Made Easy Handbook', 'Daily PYQ', 'BlackBook English'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {searchResults.books.length === 0 && searchResults.pyqs.length === 0 && searchResults.resources.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-500">
                  No direct matches found for &quot;{query}&quot;. Try broader terms.
                </div>
              ) : (
                <>
                  {/* Books matches */}
                  {searchResults.books.length > 0 && (
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Recommended Books ({searchResults.books.length})</span>
                      </div>
                      <div className="space-y-1.5">
                        {searchResults.books.map((b) => (
                          <div
                            key={b.id}
                            onClick={() => {
                              onSelectBook(b);
                              onClose();
                            }}
                            className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <div className="text-xs font-semibold text-neutral-900 dark:text-white line-clamp-1">
                                {b.title}
                              </div>
                              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                {b.author} · {b.publisher} · <strong className="text-neutral-800 dark:text-neutral-200">₹{b.discountedPrice}</strong>
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Telegram Assistance Callout */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <a
                      href="https://t.me/ssc_rrb_book_hall"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#229ED9] text-white flex items-center justify-center">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                            Looking for more books or free PDFs?
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            Search our Telegram Book Hall (@ssc_rrb_book_hall)
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#229ED9]" />
                    </a>
                  </div>
                </>
              )}
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex justify-between items-center px-4">
          <span>Search Exam Vault Repository</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
