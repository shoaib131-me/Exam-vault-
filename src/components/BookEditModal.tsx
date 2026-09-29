import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles, 
  BookOpen, 
  Upload, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Book, ExamCategory } from '../types';

interface BookEditModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveBook: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
}

const CATEGORIES: ExamCategory[] = [
  'SSC',
  'SSC JE',
  'UPSC',
  'State PSC',
  'AE & JE',
  'AE',
  'JE',
  'PSC',
  'Railway',
  'Banking',
  'Civil Engineering',
  'Other Exams'
];

const ACCENT_PRESETS = [
  { label: 'Amber Gold', value: 'from-amber-600 to-amber-900' },
  { label: 'Royal Indigo', value: 'from-indigo-600 to-indigo-950' },
  { label: 'Emerald Green', value: 'from-emerald-700 to-teal-950' },
  { label: 'Sky Blue', value: 'from-sky-700 to-slate-900' },
  { label: 'Dark Midnight', value: 'from-zinc-800 to-black' },
  { label: 'Saffron Rust', value: 'from-orange-700 to-amber-950' },
  { label: 'Rose Crimson', value: 'from-rose-700 to-rose-950' },
  { label: 'Cyan Ocean', value: 'from-teal-700 to-cyan-950' },
];

export const BookEditModal: React.FC<BookEditModalProps> = ({
  book,
  isOpen,
  onClose,
  onSaveBook,
  onDeleteBook
}) => {
  const isNew = !book?.id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [category, setCategory] = useState<ExamCategory>('SSC JE');
  const [medium, setMedium] = useState<'English' | 'Hindi' | 'Bilingual'>('Bilingual');
  const [originalPrice, setOriginalPrice] = useState(499);
  const [discountedPrice, setDiscountedPrice] = useState(50);
  const [coverAccent, setCoverAccent] = useState('from-amber-600 to-amber-900');
  const [coverImage, setCoverImage] = useState('');
  const [badge, setBadge] = useState('Bestseller');
  const [edition, setEdition] = useState('2026 Revised Edition');
  const [pages, setPages] = useState(600);
  const [rating, setRating] = useState(4.8);
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [keyFeaturesText, setKeyFeaturesText] = useState('');

  // Sync state when book prop changes
  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setPublisher(book.publisher || '');
      setCategory(book.category || 'SSC JE');
      setMedium(book.medium || 'Bilingual');
      setOriginalPrice(book.originalPrice || 499);
      setDiscountedPrice(book.discountedPrice || 50);
      setCoverAccent(book.coverAccent || 'from-amber-600 to-amber-900');
      setCoverImage(book.coverImage || '');
      setBadge(book.badge || 'Bestseller');
      setEdition(book.edition || '2026 Revised Edition');
      setPages(book.pages || 600);
      setRating(book.rating || 4.8);
      setShortDescription(book.shortDescription || '');
      setDetailedDescription(book.detailedDescription || '');
      setKeyFeaturesText((book.keyFeatures || []).join('\n'));
    } else {
      // Default blank values for new book
      setTitle('');
      setAuthor('');
      setPublisher('Exam Vault Publications');
      setCategory('SSC JE');
      setMedium('Bilingual');
      setOriginalPrice(450);
      setDiscountedPrice(50);
      setCoverAccent('from-amber-600 to-amber-900');
      setCoverImage('');
      setBadge('New Release 2026');
      setEdition('2026 Latest Edition');
      setPages(500);
      setRating(4.9);
      setShortDescription('');
      setDetailedDescription('');
      setKeyFeaturesText('100% Verified TCS Pattern Questions\nChapter-wise Detailed Solutions\nHandy IS-Code & Formula Appendix');
    }
  }, [book, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload converting to Data URL
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const keyFeatures = keyFeaturesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedBook: Book = {
      id: book?.id || `custom-book-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || 'Exam Vault Expert Board',
      publisher: publisher.trim() || 'Exam Vault Publishing',
      category,
      medium,
      originalPrice: Number(originalPrice) || 499,
      discountedPrice: Number(discountedPrice) || 50,
      rating: Number(rating) || 4.8,
      reviewsCount: book?.reviewsCount || 1500,
      edition: edition.trim() || '2026 Edition',
      pages: Number(pages) || 500,
      shortDescription: shortDescription.trim() || title.trim(),
      detailedDescription: detailedDescription.trim() || shortDescription.trim() || title.trim(),
      coverAccent,
      coverImage: coverImage.trim() || undefined,
      badge: badge.trim() || undefined,
      keyFeatures: keyFeatures.length > 0 ? keyFeatures : ['100% Verified Questions', 'Latest 2026 Exam Pattern'],
      tableOfContents: book?.tableOfContents || ['Module 1: Foundation Concepts', 'Module 2: Chapterwise Solved Questions', 'Module 3: Practice Mock Sets'],
      buyLink: book?.buyLink || 'https://t.me/ssc_rrb_book_hall'
    };

    onSaveBook(updatedBook);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                {isNew ? 'Add New Book to Exam Vault' : `Edit Book: ${title.slice(0, 30)}...`}
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Owner Direct Customizer · Changes save directly to your live page
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleFormSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Top Live Preview Banner */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center gap-4">
            {/* Live Cover Preview */}
            <div className="shrink-0">
              {coverImage ? (
                <img 
                  src={coverImage} 
                  alt="Preview" 
                  className="w-20 h-28 object-cover rounded-xl shadow-md border border-neutral-300 dark:border-neutral-700"
                />
              ) : (
                <div className={`w-20 h-28 rounded-xl bg-gradient-to-br ${coverAccent} text-white flex flex-col justify-between p-2 shadow-md text-[8px]`}>
                  <span className="font-bold text-amber-300 uppercase tracking-widest">{category}</span>
                  <BookOpen className="w-5 h-5 text-white/80" />
                  <span className="font-semibold line-clamp-2 leading-tight">{title || 'Book Title Preview'}</span>
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-neutral-950">
                  {badge || 'Tag'}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {category} · {medium}
                </span>
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-neutral-900 dark:text-white mt-1 line-clamp-1">
                {title || 'Enter book title below'}
              </h4>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                {author || 'Author'} · {publisher || 'Publisher'}
              </div>
              <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-neutral-400 line-through text-xs">₹{originalPrice}</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 text-base">₹{discountedPrice}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">(Live Price)</span>
              </div>
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              1. Book Details & Identity
            </h4>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SSC JE Civil Engineering Solved Papers 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Exam Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExamCategory)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Medium
                </label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as 'English' | 'Hindi' | 'Bilingual')}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Bilingual">Bilingual (Hindi + English)</option>
                  <option value="English">English Medium</option>
                  <option value="Hindi">Hindi Medium</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. YCT Editorial Board / M. Laxmikanth"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Publisher
                </label>
                <input
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  placeholder="e.g. Youth Competition Times / Made Easy"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Offer */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              2. Pricing & Badges
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(Number(e.target.value))}
                  placeholder="50"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-amber-400 dark:border-amber-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-neutral-500">Currently ₹50 across catalog</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  MRP / Original Price (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  placeholder="499"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-[10px] text-neutral-500">Shown crossed-out</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Card Badge Tag
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Bestseller, 2026 Edition"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Book Cover Image & Styling */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              3. Book Cover Image & Styling
            </h4>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Custom Cover Image URL (or upload below)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/my-book-cover.jpg"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => setCoverImage('')}
                    className="px-3 py-1.5 text-xs text-rose-500 hover:bg-rose-50 rounded-xl"
                  >
                    Clear Image
                  </button>
                )}
              </div>
            </div>

            {/* Direct File Upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Upload Cover Photo from Device
              </label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 transition-colors">
                <Upload className="w-4 h-4 text-amber-500" />
                <span>Click to select an image from your computer/phone</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Gradient Preset */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Book Cover Theme Palette (Used if no image provided)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ACCENT_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setCoverAccent(preset.value)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 text-xs transition-all cursor-pointer ${
                      coverAccent === preset.value
                        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/50 dark:bg-neutral-800'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md bg-gradient-to-br ${preset.value} shrink-0`} />
                    <span className="truncate text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              4. Descriptions & Highlights
            </h4>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Short Description (Appears on card)
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary of the book..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Key Features (One feature per line)
              </label>
              <textarea
                rows={3}
                value={keyFeaturesText}
                onChange={(e) => setKeyFeaturesText(e.target.value)}
                placeholder="8,500+ Solved Questions&#10;Detailed TCS Explanations&#10;Formula Appendix Included"
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
            {!isNew && onDeleteBook && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${title}"?`)) {
                    onDeleteBook(book.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Book</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isNew ? 'Add to Catalog' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
