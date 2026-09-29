import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExamCategories } from './components/ExamCategories';
import { BooksSection } from './components/BooksSection';
import { ComboPackSection } from './components/ComboPackSection';
import { InstagramSection } from './components/InstagramSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ExamBagDrawer } from './components/ExamBagDrawer';
import { SearchModal } from './components/SearchModal';
import { BookDetailModal } from './components/BookDetailModal';
import { PaymentModal } from './components/PaymentModal';
import { AdminToolbar } from './components/AdminToolbar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { BookEditModal } from './components/BookEditModal';
import { PageSettingsModal } from './components/PageSettingsModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { Book, ExamCategory, PYQQuestion, CustomerOrder, CustomerUser } from './types';
import { BOOKS_DATA, DAILY_PYQS } from './data/mockData';

const DEFAULT_CUSTOMER_ORDERS: CustomerOrder[] = [
  {
    id: 'ORD-2026-8941',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Rahul Sharma',
    customerPhone: '9823014589',
    customerEmail: 'rahul.je.aspirant@gmail.com',
    items: [
      {
        bookId: 'book-1',
        title: 'SSC JE Civil Engineering Chapterwise Solved Papers (2007–2024)',
        category: 'SSC JE',
        price: 50
      }
    ],
    isCombo: false,
    totalAmount: 50,
    upiId: 'shoaibbsp6@oksbi',
    transactionId: '427189012345',
    status: 'Verified',
    telegramSent: true
  },
  {
    id: 'ORD-2026-6412',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    customerName: 'Pooja Verma',
    customerPhone: '9711245678',
    customerEmail: 'pooja.railway26@gmail.com',
    items: [
      {
        bookId: 'book-2',
        title: 'RRB JE Civil Engineering CBT 1 & 2 Question Bank',
        category: 'Railway',
        price: 34.5
      },
      {
        bookId: 'book-3',
        title: 'Civil Engineering Formula & Quick Revision Booster Handbook',
        category: 'AE & JE',
        price: 34.5
      }
    ],
    isCombo: true,
    totalAmount: 69,
    upiId: 'shoaibbsp6@oksbi',
    transactionId: '427156981120',
    status: 'Pending Verification',
    telegramSent: true
  }
];

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('exam_vault_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('exam_vault_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('exam_vault_theme', 'light');
    }
  }, [darkMode]);

  // Selected category state for filtering
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('All');

  // Dynamic books catalog stored in localStorage (Editable by Owner)
  const [books, setBooks] = useState<Book[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('exam_vault_custom_books');
        return stored ? JSON.parse(stored) : BOOKS_DATA;
      } catch (e) {
        return BOOKS_DATA;
      }
    }
    return BOOKS_DATA;
  });

  // Saved books state in localStorage
  const [savedBooks, setSavedBooks] = useState<Book[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('exam_vault_saved_books');
        return stored ? JSON.parse(stored) : [BOOKS_DATA[0]];
      } catch (e) {
        return [BOOKS_DATA[0]];
      }
    }
    return [BOOKS_DATA[0]];
  });

  const [savedPYQs, setSavedPYQs] = useState<PYQQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('exam_vault_saved_pyqs');
        return stored ? JSON.parse(stored) : [DAILY_PYQS[0]];
      } catch (e) {
        return [DAILY_PYQS[0]];
      }
    }
    return [DAILY_PYQS[0]];
  });

  // Admin / Owner Mode states
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('exam_vault_is_admin') === 'true';
    }
    return false;
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isBookEditOpen, setIsBookEditOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamic Page & Payment Settings
  const [comboPrice, setComboPrice] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exam_vault_combo_price');
      return stored ? Number(stored) : 69;
    }
    return 69;
  });

  const [upiId, setUpiId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('exam_vault_upi_id') || 'shoaibbsp6@oksbi';
    }
    return 'shoaibbsp6@oksbi';
  });

  const [telegramLink, setTelegramLink] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('exam_vault_telegram_link') || 'https://t.me/ssc_rrb_book_hall';
    }
    return 'https://t.me/ssc_rrb_book_hall';
  });

  const [telegramUsername, setTelegramUsername] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('exam_vault_telegram_user') || '@ssc_rrb_book_hall';
    }
    return '@ssc_rrb_book_hall';
  });

  const [instagramLink, setInstagramLink] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('exam_vault_instagram_link') || 'https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13';
    }
    return 'https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13';
  });

  // Owner Phone Number (Exclusive lock for Owner Portal)
  const [ownerPhone, setOwnerPhone] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('exam_vault_owner_phone');
      if (stored && stored !== '9876543210') return stored;
      localStorage.setItem('exam_vault_owner_phone', '9340227469');
      return '9340227469';
    }
    return '9340227469';
  });

  // Customer User Authentication state (OTP Login via Phone or Gmail)
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('exam_vault_customer_user');
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Customer Orders state (Tracked for Admin view and Customer view)
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('exam_vault_customer_orders');
        return stored ? JSON.parse(stored) : DEFAULT_CUSTOMER_ORDERS;
      } catch (e) {
        return DEFAULT_CUSTOMER_ORDERS;
      }
    }
    return DEFAULT_CUSTOMER_ORDERS;
  });

  // Modals & Drawers state
  const [isExamBagOpen, setIsExamBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [detailModalBook, setDetailModalBook] = useState<Book | null>(null);
  const [paymentModalBook, setPaymentModalBook] = useState<Book | null>(null);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [isAdminOrdersOpen, setIsAdminOrdersOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Customer Auth handlers
  const handleCustomerLoginSuccess = (user: CustomerUser) => {
    setCustomerUser(user);
    localStorage.setItem('exam_vault_customer_user', JSON.stringify(user));
    showToast(`Welcome ${user.name}! Logged in successfully.`);
  };

  const handleCustomerLogout = () => {
    setCustomerUser(null);
    localStorage.removeItem('exam_vault_customer_user');
    showToast('Logged out of student account');
  };

  // Customer Order handlers
  const handleRecordOrder = (newOrder: CustomerOrder) => {
    setCustomerOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('exam_vault_customer_orders', JSON.stringify(updated));
      return updated;
    });
    showToast(`Order #${newOrder.id} saved! Details available in Owner Portal.`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setCustomerOrders((prev) => {
      const updated = prev.map((ord) => ord.id === orderId ? { ...ord, status } : ord);
      localStorage.setItem('exam_vault_customer_orders', JSON.stringify(updated));
      return updated;
    });
    showToast(`Order status updated to "${status}"`);
  };

  const handleDeleteOrder = (orderId: string) => {
    setCustomerOrders((prev) => {
      const updated = prev.filter((ord) => ord.id !== orderId);
      localStorage.setItem('exam_vault_customer_orders', JSON.stringify(updated));
      return updated;
    });
    showToast('Order removed from records');
  };

  const handleClearAllOrders = () => {
    setCustomerOrders([]);
    localStorage.removeItem('exam_vault_customer_orders');
    showToast('All customer orders cleared');
  };

  const handleUpdateOwnerPhone = (newPhone: string) => {
    setOwnerPhone(newPhone);
    localStorage.setItem('exam_vault_owner_phone', newPhone);
    showToast(`Owner Mobile Number updated to +91 ${newPhone}`);
  };

  // Admin login & logout
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('exam_vault_is_admin', 'true');
    showToast('👑 Owner Edit Mode Activated! You can now edit any book & settings.');
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('exam_vault_is_admin');
    showToast('Exited Owner Edit Mode');
  };

  // Book save / edit / delete handlers
  const handleSaveBook = (updatedBook: Book) => {
    setBooks((prev) => {
      const exists = prev.some((b) => b.id === updatedBook.id);
      let next: Book[];
      if (exists) {
        next = prev.map((b) => b.id === updatedBook.id ? updatedBook : b);
      } else {
        next = [updatedBook, ...prev];
      }
      localStorage.setItem('exam_vault_custom_books', JSON.stringify(next));
      return next;
    });
    showToast(`Book "${updatedBook.title.slice(0, 25)}..." saved!`);
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks((prev) => {
      const next = prev.filter((b) => b.id !== bookId);
      localStorage.setItem('exam_vault_custom_books', JSON.stringify(next));
      return next;
    });
    showToast('Book removed from catalog');
  };

  const handleResetCatalog = () => {
    if (confirm('Reset all books to original Exam Vault defaults?')) {
      setBooks(BOOKS_DATA);
      localStorage.removeItem('exam_vault_custom_books');
      showToast('Catalog reset to original defaults');
    }
  };

  // Save Settings handler
  const handleSaveSettings = (settings: {
    comboPrice: number;
    upiId: string;
    telegramLink: string;
    telegramUsername: string;
    instagramLink: string;
    ownerPhone: string;
  }) => {
    setComboPrice(settings.comboPrice);
    setUpiId(settings.upiId);
    setTelegramLink(settings.telegramLink);
    setTelegramUsername(settings.telegramUsername);
    setInstagramLink(settings.instagramLink);
    setOwnerPhone(settings.ownerPhone);

    localStorage.setItem('exam_vault_combo_price', String(settings.comboPrice));
    localStorage.setItem('exam_vault_upi_id', settings.upiId);
    localStorage.setItem('exam_vault_telegram_link', settings.telegramLink);
    localStorage.setItem('exam_vault_telegram_user', settings.telegramUsername);
    localStorage.setItem('exam_vault_instagram_link', settings.instagramLink);
    localStorage.setItem('exam_vault_owner_phone', settings.ownerPhone);

    showToast('Payment & Page settings updated successfully!');
  };

  // Open edit modal for book
  const handleOpenEditBook = (book: Book) => {
    setEditingBook(book);
    setIsBookEditOpen(true);
  };

  const handleAddNewBook = () => {
    setEditingBook(null);
    setIsBookEditOpen(true);
  };

  // Save/Unsave book in Exam Bag
  const handleToggleSaveBook = (book: Book) => {
    setSavedBooks((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      let updated: Book[];
      if (exists) {
        updated = prev.filter((b) => b.id !== book.id);
        showToast(`Removed "${book.title.slice(0, 30)}..." from Exam Bag`);
      } else {
        updated = [...prev, book];
        showToast(`Saved "${book.title.slice(0, 30)}..." to Exam Bag`);
      }
      localStorage.setItem('exam_vault_saved_books', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveBookById = (id: string) => {
    setSavedBooks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem('exam_vault_saved_books', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemovePYQById = (id: string) => {
    setSavedPYQs((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      localStorage.setItem('exam_vault_saved_pyqs', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllSaved = () => {
    setSavedBooks([]);
    setSavedPYQs([]);
    localStorage.removeItem('exam_vault_saved_books');
    localStorage.removeItem('exam_vault_saved_pyqs');
    showToast('Cleared all saved items');
  };

  // Category select handler with smooth scroll to books
  const handleSelectCategory = (cat: ExamCategory) => {
    setSelectedCategory(cat);
    const booksElem = document.getElementById('books');
    if (booksElem) {
      booksElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut Cmd/Ctrl + K for search & Alt + E for Admin Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        if (isAdmin) {
          setIsSettingsOpen(true);
        } else {
          setIsAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  // Combo order handler (Buy Combo Pack at ₹69 or custom comboPrice)
  const handleOrderCombo = (selectedComboBooks: Book[]) => {
    if (selectedComboBooks.length < 2) return;
    const comboBook: Book = {
      id: `combo-${selectedComboBooks[0].id}-${selectedComboBooks[1].id}`,
      title: `Combo Pack (2 Books): ${selectedComboBooks[0].title} + ${selectedComboBooks[1].title}`,
      author: `${selectedComboBooks[0].author} & ${selectedComboBooks[1].author}`,
      publisher: 'Exam Vault 2-Book Special Combo',
      category: 'Other Exams',
      medium: 'Bilingual',
      originalPrice: 100,
      discountedPrice: comboPrice,
      rating: 5.0,
      reviewsCount: 4200,
      edition: '2026 Special Combo Pack',
      pages: selectedComboBooks[0].pages + selectedComboBooks[1].pages,
      shortDescription: `Super Saver Combo containing 2 complete books: (1) ${selectedComboBooks[0].title} and (2) ${selectedComboBooks[1].title}.`,
      detailedDescription: `Exam Vault Student Combo Pack for ₹${comboPrice}. Included books: 1. ${selectedComboBooks[0].title} and 2. ${selectedComboBooks[1].title}. Complete solved papers & formula handbooks delivered directly to your Telegram or Email.`,
      coverAccent: 'from-amber-600 to-orange-800',
      badge: `Combo Deal ₹${comboPrice}`,
      keyFeatures: [
        `Book 1: ${selectedComboBooks[0].title}`,
        `Book 2: ${selectedComboBooks[1].title}`,
        `Save ₹${100 - comboPrice} (2 Books Combo @ ₹${comboPrice})`,
        `Delivery directly to your Telegram (${telegramUsername}) or Email`
      ],
      tableOfContents: [
        `Book 1: ${selectedComboBooks[0].title}`,
        `Book 2: ${selectedComboBooks[1].title}`
      ],
      buyLink: telegramLink
    };
    setPaymentModalBook(comboBook);
  };

  const savedBookIds = savedBooks.map((b) => b.id);
  const totalSavedCount = savedBooks.length;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold shadow-2xl border border-neutral-700 dark:border-neutral-200 animate-in slide-in-from-bottom duration-200">
          {toastMessage}
        </div>
      )}

      {/* Floating Admin Toolbar when in Owner Mode */}
      {isAdmin && (
        <AdminToolbar
          onAddNewBook={handleAddNewBook}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenOrders={() => setIsAdminOrdersOpen(true)}
          onResetCatalog={handleResetCatalog}
          onLogoutAdmin={handleLogoutAdmin}
          booksCount={books.length}
          ordersCount={customerOrders.length}
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        savedCount={totalSavedCount}
        onOpenExamBag={() => setIsExamBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => {
          if (isAdmin) {
            setIsSettingsOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onOpenOrders={() => setIsAdminOrdersOpen(true)}
        currentUser={customerUser}
        onOpenCustomerAuth={() => setIsCustomerAuthOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onExploreMaterials={() => handleScrollToSection('books')}
        />

        {/* 2. Exam Categories Section */}
        <ExamCategories
          onSelectCategory={handleSelectCategory}
        />

        {/* 3. Competitive Exam Books Section (All @ ₹50 or custom prices) */}
        <BooksSection
          books={books}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          savedBookIds={savedBookIds}
          onToggleSaveBook={handleToggleSaveBook}
          onOrderBook={(book) => setPaymentModalBook(book)}
          isAdmin={isAdmin}
          onEditBook={handleOpenEditBook}
          onAddNewBook={handleAddNewBook}
        />

        {/* 4. Buy Combo Pack at ₹69 (Select any 2 books & order) */}
        <ComboPackSection
          books={books}
          comboPrice={comboPrice}
          onOrderCombo={handleOrderCombo}
        />

        {/* 5. Instagram & Telegram Official Community & Support Section */}
        <InstagramSection />

        {/* 6. About Exam Vault Section */}
        <AboutSection />

      </main>

      {/* Footer */}
      <Footer 
        isAdmin={isAdmin}
        onOpenAdminLogin={() => {
          if (isAdmin) {
            setIsSettingsOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Slide-over Drawer for Saved Items / Exam Bag */}
      <ExamBagDrawer
        isOpen={isExamBagOpen}
        onClose={() => setIsExamBagOpen(false)}
        savedBooks={savedBooks}
        savedPYQs={savedPYQs}
        onRemoveBook={handleRemoveBookById}
        onRemovePYQ={handleRemovePYQById}
        onClearAll={handleClearAllSaved}
        onOpenBookDetail={(b) => setDetailModalBook(b)}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBook={(b) => setDetailModalBook(b)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Standalone Book Detail Modal if triggered from drawer or search */}
      {detailModalBook && (
        <BookDetailModal
          book={detailModalBook}
          onClose={() => setDetailModalBook(null)}
          isSaved={savedBookIds.includes(detailModalBook.id)}
          onToggleSave={handleToggleSaveBook}
          onOrderBook={(b) => {
            setDetailModalBook(null);
            setPaymentModalBook(b);
          }}
          isAdmin={isAdmin}
          onEditBook={handleOpenEditBook}
        />
      )}

      {/* UPI QR Payment Modal (Opens on book order) */}
      {paymentModalBook && (
        <PaymentModal
          book={paymentModalBook}
          onClose={() => setPaymentModalBook(null)}
          telegramUsername={telegramUsername}
          telegramLink={telegramLink}
          upiId={upiId}
          currentUser={customerUser}
          onRecordOrder={handleRecordOrder}
        />
      )}

      {/* Owner Login Modal (Protected by Owner Registered Phone Number) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        ownerPhone={ownerPhone}
        onUpdateOwnerPhone={handleUpdateOwnerPhone}
      />

      {/* Book Customizer / Edit Modal (Only for Owner) */}
      <BookEditModal
        book={editingBook}
        isOpen={isBookEditOpen}
        onClose={() => {
          setIsBookEditOpen(false);
          setEditingBook(null);
        }}
        onSaveBook={handleSaveBook}
        onDeleteBook={handleDeleteBook}
      />

      {/* Page & Payment Settings Modal */}
      <PageSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        comboPrice={comboPrice}
        upiId={upiId}
        telegramLink={telegramLink}
        telegramUsername={telegramUsername}
        instagramLink={instagramLink}
        ownerPhone={ownerPhone}
        onSaveSettings={handleSaveSettings}
      />

      {/* Customer / Student OTP Authentication Modal (Phone Number or Gmail) */}
      <CustomerAuthModal
        isOpen={isCustomerAuthOpen}
        onClose={() => setIsCustomerAuthOpen(false)}
        currentUser={customerUser}
        onLoginSuccess={handleCustomerLoginSuccess}
        onLogout={handleCustomerLogout}
        customerOrders={customerOrders}
      />

      {/* Owner Orders Management Modal (All Customer Orders & Status) */}
      <AdminOrdersModal
        isOpen={isAdminOrdersOpen}
        onClose={() => setIsAdminOrdersOpen(false)}
        orders={customerOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onClearAllOrders={handleClearAllOrders}
        ownerPhone={ownerPhone}
      />

    </div>
  );
}
