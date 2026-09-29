import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Smartphone, 
  ExternalLink, 
  CheckCircle2,
  Download,
  Package,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { Book, CustomerOrder, CustomerUser } from '../types';

interface PaymentModalProps {
  book: Book | null;
  onClose: () => void;
  telegramUsername?: string;
  telegramLink?: string;
  upiId?: string;
  currentUser?: CustomerUser | null;
  onRecordOrder?: (order: CustomerOrder) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  book,
  onClose,
  telegramUsername = '@ssc_rrb_book_hall',
  telegramLink = 'https://t.me/ssc_rrb_book_hall',
  upiId = 'shoaibbsp6@oksbi',
  currentUser = null,
  onRecordOrder
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || '');
  const [studentContact, setStudentContact] = useState(currentUser?.phone || '');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  // Sync logged in user if available
  useEffect(() => {
    if (currentUser) {
      if (!studentName) setStudentName(currentUser.name);
      if (!studentEmail && currentUser.email) setStudentEmail(currentUser.email);
      if (!studentContact && currentUser.phone) setStudentContact(currentUser.phone);
    }
  }, [currentUser]);

  // Generate dynamic scannable UPI QR Code matching the user's uploaded image
  useEffect(() => {
    if (!book) return;
    
    // Standard UPI Payment URI
    const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('EXAM VAULT')}&am=${book.discountedPrice}&cu=INR&tn=${encodeURIComponent(`Exam Vault ${book.title.slice(0, 30)}`)}`;

    QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR', err));
  }, [book, upiId]);

  if (!book) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const isCombo = book.id.startsWith('combo-') || book.title.includes('Combo Pack');

  const createAndSaveOrder = () => {
    const orderId = createdOrderId || `ORD-${Date.now().toString().slice(-4)}${Math.floor(100 + Math.random() * 900)}`;
    setCreatedOrderId(orderId);

    const newOrder: CustomerOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: studentName.trim() || currentUser?.name || 'Aspirant Student',
      customerPhone: studentContact.trim() || currentUser?.phone || 'Not Provided',
      customerEmail: studentEmail.trim() || currentUser?.email || '',
      items: [
        {
          bookId: book.id,
          title: book.title,
          category: book.category,
          price: book.discountedPrice
        }
      ],
      isCombo: isCombo,
      totalAmount: book.discountedPrice,
      upiId: upiId,
      transactionId: transactionId.trim() || undefined,
      status: 'Pending Verification',
      telegramSent: true
    };

    if (onRecordOrder) {
      onRecordOrder(newOrder);
    }

    return orderId;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAndSaveOrder();
    setIsSubmitted(true);
  };

  const currentOrderId = createdOrderId || `ORD-${Date.now().toString().slice(-4)}`;

  const telegramOrderMessage = encodeURIComponent(
    `Hello Exam Vault! Maine order ke liye payment kiya hai.\n\n` +
    `• Order ID: ${currentOrderId}\n` +
    `• Book/Package: "${book.title}"\n` +
    `• Amount: ₹${book.discountedPrice}\n` +
    `• UPI ID: ${upiId}\n` +
    `• Name: ${studentName || currentUser?.name || 'Aspirant'}\n` +
    `• Email: ${studentEmail || currentUser?.email || 'N/A'}\n` +
    `• Phone/Telegram: ${studentContact || currentUser?.phone || 'N/A'}\n` +
    `• Transaction Ref / UTR: ${transactionId || 'Payment Screenshot Attached'}\n\n` +
    `Payment screenshot send kar raha hu, please book PDF send kar dijiye!`
  );

  const telegramShareUrl = `${telegramLink}?text=${telegramOrderMessage}`;

  const handleOpenTelegramDirectly = () => {
    createAndSaveOrder();
    window.open(telegramShareUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div>
            <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white leading-tight">
              Pay via QR Code & Order Book
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Exam Vault Official UPI Gateway
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto space-y-5">
          
          {/* Selected Book Summary Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">
                {isCombo ? 'Special 2-Book Combo Pack' : 'Selected Book'}
              </span>
              <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-white truncate">
                {book.title}
              </h4>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                {book.category} · {book.medium} Medium
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-neutral-500 line-through tabular-nums block">
                ₹{book.originalPrice}
              </span>
              <span className="font-display text-xl font-bold text-neutral-900 dark:text-white tabular-nums">
                ₹{book.discountedPrice}
              </span>
            </div>
          </div>

          {currentUser && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ordering as <strong>{currentUser.name}</strong> ({currentUser.phone || currentUser.email})</span>
            </div>
          )}

          {!isSubmitted ? (
            <>
              {/* Authentic QR Card Container */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800 text-center shadow-md">
                
                {/* Brand Header */}
                <h2 className="font-display font-black text-xl sm:text-2xl text-neutral-800 dark:text-neutral-100 tracking-wider mb-4">
                  EXAM VAULT
                </h2>

                {/* Scannable QR Code */}
                <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-neutral-300">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Exam Vault UPI QR Code" 
                      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain select-none"
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-xs text-neutral-400">
                      Generating QR...
                    </div>
                  )}
                </div>

                {/* UPI ID */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 text-sm sm:text-base font-mono">
                    {upiId}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 rounded-md text-neutral-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Subtitle */}
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  Scan and pay with any BHIM UPI app QR code scanner
                </p>

                {/* Supported UPI Logos */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#0066B2] font-black">
                    BHIM
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#00A859] font-black">
                    UPI
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#4285F4] font-bold">
                    GPay
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#5F259F] font-bold">
                    PhonePe
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#00BAF2] font-bold">
                    Paytm
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[#FF9900] font-bold">
                    amazon pay
                  </span>
                </div>

                {/* Exact requested instruction from user */}
                <div className="mt-5 p-3.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-semibold leading-relaxed">
                  📢 <strong>Payment ke baad screenshot Telegram par send karein.</strong><br />
                  <span className="font-normal text-amber-900 dark:text-amber-300">
                    Books aapke Email ya Telegram par send ho jayega!
                  </span>
                </div>

              </div>

              {/* Direct Telegram Screenshot Send CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={handleOpenTelegramDirectly}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1C88BD] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Screenshot on Telegram ({telegramUsername})</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>
              </div>

              {/* Order Form */}
              <form onSubmit={handleFormSubmit} className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                <p className="text-xs uppercase tracking-wider font-semibold text-neutral-700 dark:text-neutral-300">
                  Fill Details for Fast Delivery & Save Order
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-600 dark:text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-600 dark:text-neutral-400 mb-1">
                      Email Address for Book PDF
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-600 dark:text-neutral-400 mb-1">
                      Phone Number (for Order Verification)
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={studentContact}
                      onChange={(e) => setStudentContact(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-600 dark:text-neutral-400 mb-1">
                      UTR / Transaction ID
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="12-digit UPI reference number"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
                >
                  Confirm Order & Generate Telegram Message
                </button>
              </form>
            </>
          ) : (
            /* Order Submitted Screen */
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono font-bold">
                  Order ID: {createdOrderId || currentOrderId}
                </span>
                <h4 className="font-display font-bold text-lg text-emerald-900 dark:text-emerald-200 mt-1">
                  Order Details Successfully Saved!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your order has been recorded in Exam Vault Admin. Please send your payment screenshot on Telegram so the admin can verify and send your book PDF immediately!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900 text-left text-xs space-y-1.5">
                <div><strong>Order ID:</strong> <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{createdOrderId || currentOrderId}</span></div>
                <div><strong>Book:</strong> {book.title}</div>
                <div><strong>Amount:</strong> ₹{book.discountedPrice}</div>
                <div><strong>Name:</strong> {studentName || currentUser?.name || 'Aspirant'}</div>
                <div><strong>Mobile / Phone:</strong> {studentContact || currentUser?.phone}</div>
                {studentEmail && <div><strong>Email:</strong> {studentEmail}</div>}
                {transactionId && <div><strong>UTR:</strong> {transactionId}</div>}
              </div>

              <div className="pt-2">
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Screenshot on Telegram Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-neutral-500 hover:underline cursor-pointer"
              >
                Back to QR Code
              </button>
            </div>
          )}

          {/* Trust note */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official UPI ID: <strong>{upiId}</strong> · Instant PDF Delivery</span>
          </div>

        </div>

      </div>
    </div>
  );
};
