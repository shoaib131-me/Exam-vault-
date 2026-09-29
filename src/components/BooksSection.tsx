import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Eye, 
  Bookmark, 
  BookmarkCheck, 
  ArrowUpDown, 
  CheckCircle2, 
  QrCode,
  ArrowRight,
  Edit3,
  Plus
} from 'lucide-react';
import { Book, ExamCategory } from '../types';
import { BOOKS_DATA } from '../data/mockData';
import { BookDetailModal } from './BookDetailModal';

interface BooksSectionProps {
  books?: Book[];
  selectedCategory: ExamCategory;
  onSelectCategory: (cat: ExamCategory) => void;
  savedBookIds: string[];
  onToggleSaveBook: (book: Book) => void;
  onOrderBook: (book: Book) => void;
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onAddNewBook?: () => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  books = BOOKS_DATA,
  selectedCategory,
  onSelectCategory,
  savedBookIds,
  onToggleSaveBook,
  onOrderBook,
  isAdmin = false,
  onEditBook,
  onAddNewBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedium, setSelectedMedium] = useState<'All' | 'English' | 'Hindi' | 'Bilingual'>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');
  const [activeModalBook, setActiveModalBook] = useState<Book | null>(null);

  // Filter chips requested by user:
  // All, SSC, SSC JE, UPSC, Civil Engineering, AE, JE, PSC, Other Exams
  const filterOptions = [
    'All',
    'SSC',
    'SSC JE',
    'UPSC',
    'Civil Engineering',
    'AE',
    'JE',
    'PSC',
    'Other Exams'
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category filter matching
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Civil Engineering') {
          matchesCategory = book.title.toLowerCase().includes('civil') || book.category === 'SSC JE' || book.category === 'AE & JE';
        } else if (selectedCategory === 'AE') {
          matchesCategory = book.category === 'AE & JE' || book.title.toLowerCase().includes('ae');
        } else if (selectedCategory === 'JE') {
          matchesCategory = book.category === 'SSC JE' || book.category === 'AE & JE' || book.title.toLowerCase().includes('je');
        } else if (selectedCategory === 'PSC') {
          matchesCategory = book.category === 'State PSC';
        } else if (selectedCategory === 'Other Exams') {
          matchesCategory = book.category === 'Railway' || book.category === 'Banking' || book.category === 'Other Exams';
        } else {
          matchesCategory = book.category === selectedCategory;
        }
      }

      // Medium filter
      const matchesMedium = selectedMedium === 'All' || book.medium === selectedMedium;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.publisher.toLowerCase().includes(q) ||
        book.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesMedium && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'priceHigh') return b.discountedPrice - a.discountedPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [selectedCategory, selectedMedium, searchQuery, sortBy]);

  return (
    <section id="books" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <span>Verified Book Directory</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">ALL BOOKS FLAT ₹50</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Competitive Exam Books
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
              Handpicked and syllabus-verified reference books. Every book available at <strong>Flat ₹50</strong>, or get <strong>any 2 in Combo Pack for ₹69</strong>!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            {isAdmin && onAddNewBook && (
              <button
                onClick={onAddNewBook}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                title="Add a new book (Owner Mode)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Book</span>
              </button>
            )}

            <a
              href="#combo-pack"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>⚡ Buy 2 Books Combo @ ₹69</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-8 space-y-4">
          
          {/* Top row: Search input + Medium filter + Sort */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book title, author (Laxmikanth, YCT, Made Easy, Baljit Dhaka)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Medium Selector (Segmented control) */}
            <div className="flex items-center gap-1 p-1 bg-neutral-200/70 dark:bg-neutral-800 rounded-xl text-xs shrink-0 self-start md:self-auto">
              {(['All', 'English', 'Hindi', 'Bilingual'] as const).map((med) => (
                <button
                  key={med}
                  onClick={() => setSelectedMedium(med)}
                  className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedMedium === med
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {med}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
              <ArrowUpDown className="w-4 h-4 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-2 px-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Bottom row: Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>
            {filterOptions.map((filter) => {
              const isActive = 
                (filter === 'All' && selectedCategory === 'All') ||
                selectedCategory === filter;

              return (
                <button
                  key={filter}
                  onClick={() => onSelectCategory(filter as ExamCategory)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 font-semibold shadow-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results summary count */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            Showing <strong className="text-neutral-900 dark:text-white tabular-nums">{filteredBooks.length}</strong> exam books
            {selectedCategory !== 'All' && <> for <strong>{selectedCategory}</strong></>}
          </span>
          {savedBookIds.length > 0 && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>{savedBookIds.length} saved in Exam Bag</span>
            </span>
          )}
        </div>

        {/* Books Cards Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              const isSaved = savedBookIds.includes(book.id);

              return (
                <div
                  key={book.id}
                  className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-200 overflow-hidden"
                >
                  <div>
                    {/* Visual Book Cover Presentation */}
                    <div className="relative p-6 bg-gradient-to-b from-neutral-50 to-neutral-100/50 dark:from-neutral-900 dark:to-neutral-900/40 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-800">
                      
                      {/* Realistic Vector Book Cover or Uploaded Cover Image */}
                      {book.coverImage ? (
                        <div className="relative w-36 h-48 rounded-r-lg rounded-l-xs overflow-hidden shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none">
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute top-0 bottom-0 left-1.5 w-0.5 bg-black/30 pointer-events-none" />
                          {book.badge && (
                            <span className="absolute top-2 right-2 text-[7px] uppercase px-1.5 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold shadow-xs">
                              {book.badge}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className={`relative w-36 h-48 rounded-r-lg rounded-l-xs bg-gradient-to-br ${book.coverAccent} text-white p-3 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none`}>
                          
                          {/* Book Spine crease effect */}
                          <div className="absolute top-0 bottom-0 left-1.5 w-0.5 bg-white/20" />
                          
                          {/* Top badge */}
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] font-bold tracking-wider uppercase text-amber-300">
                              EXAM VAULT
                            </span>
                            {book.badge && (
                              <span className="text-[7px] uppercase px-1 py-0.2 rounded bg-amber-400 text-neutral-950 font-bold">
                                {book.badge}
                              </span>
                            )}
                          </div>

                          {/* Title on cover */}
                          <div className="pl-1">
                            <p className="text-[8px] text-amber-200 uppercase font-semibold">
                              {book.category}
                            </p>
                            <h4 className="font-display font-bold text-[11px] leading-tight text-white line-clamp-3 mt-0.5">
                              {book.title}
                            </h4>
                          </div>

                          {/* Bottom publisher info */}
                          <div className="pl-1 pt-1.5 border-t border-white/20 flex justify-between items-end">
                            <span className="text-[8px] text-white/80 truncate max-w-[70px]">
                              {book.publisher}
                            </span>
                            <span className="text-[8px] font-mono text-amber-300 font-bold">
                              {book.edition.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Floating Action Buttons (Bookmark & Admin Edit) */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {isAdmin && onEditBook && (
                          <button
                            onClick={() => onEditBook(book)}
                            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-sm transition-all cursor-pointer"
                            title="Edit this book (Owner Mode)"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => onToggleSaveBook(book)}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-amber-500 text-white shadow-sm'
                              : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save to Exam Bag'}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Book Metadata & Text */}
                    <div className="p-4 sm:p-5">
                      
                      {/* Quiet Unboxed Metadata: Category · Medium · Edition */}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
                        <span>{book.category}</span>
                        <span>·</span>
                        <span>{book.medium}</span>
                        <span>·</span>
                        <span className="truncate">{book.publisher}</span>
                      </div>

                      {/* Book Title */}
                      <h3 
                        onClick={() => setActiveModalBook(book)}
                        className="font-display font-bold text-base text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {book.title}
                      </h3>

                      {/* Author */}
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                        By {book.author}
                      </p>

                      {/* Short Description */}
                      <p className="mt-2.5 text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {book.shortDescription}
                      </p>

                      {/* Star rating & Reviews */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
                            {book.rating}
                          </span>
                        </div>
                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">
                          ({book.reviewsCount.toLocaleString()})
                        </span>
                      </div>

                      {/* Pricing Tag */}
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">
                          ₹{book.discountedPrice}
                        </span>
                        <span className="text-xs text-neutral-400 line-through tabular-nums">
                          ₹{book.originalPrice}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {Math.round(((book.originalPrice - book.discountedPrice) / book.originalPrice) * 100)}% off
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual CTA Bottom Actions: "View Details" & "Order Book" */}
                  <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 border-t border-neutral-100 dark:border-neutral-800/80">
                    <button
                      onClick={() => setActiveModalBook(book)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => onOrderBook(book)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-lg transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Order Book</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Search className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <h4 className="font-display font-semibold text-base text-neutral-900 dark:text-white">
              No books found matching &quot;{searchQuery}&quot;
            </h4>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Try adjusting your category filter, changing medium, or clearing search keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
                setSelectedMedium('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={activeModalBook}
        onClose={() => setActiveModalBook(null)}
        isSaved={activeModalBook ? savedBookIds.includes(activeModalBook.id) : false}
        onToggleSave={onToggleSaveBook}
        onOrderBook={(b) => {
          setActiveModalBook(null);
          onOrderBook(b);
        }}
      />
    </section>
  );
};
