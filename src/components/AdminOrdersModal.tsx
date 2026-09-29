import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  Trash2, 
  User, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { CustomerOrder } from '../types';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: CustomerOrder[];
  onUpdateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onClearAllOrders: () => void;
  ownerPhone: string;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onClearAllOrders,
  ownerPhone
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending Verification' | 'Verified' | 'Dispatched'>('All');

  if (!isOpen) return null;

  // Filter orders by search & status
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch = 
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ord.transactionId && ord.transactionId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ord.items.some((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending Verification').length;
  const verifiedCount = orders.filter((o) => o.status === 'Verified').length;
  const dispatchedCount = orders.filter((o) => o.status === 'Dispatched').length;

  // Export orders to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Items', 'Is Combo', 'Amount (INR)', 'Status', 'UTR / Ref ID'];
    const rows = orders.map((o) => [
      `"${o.id}"`,
      `"${new Date(o.createdAt).toLocaleString()}"`,
      `"${o.customerName.replace(/"/g, '""')}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail}"`,
      `"${o.items.map((i) => i.title).join(' + ').replace(/"/g, '""')}"`,
      `"${o.isCombo ? 'Yes (Combo ₹69)' : 'No'}"`,
      o.totalAmount,
      `"${o.status}"`,
      `"${o.transactionId || 'N/A'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Exam_Vault_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-lg text-neutral-900 dark:text-white">
                  Owner Orders Dashboard
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold font-mono">
                  Owner: {ownerPhone}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Track customer orders, phone numbers, UPI payments & book delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={orders.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
              title="Download Orders CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-neutral-100/60 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              Total Orders
            </span>
            <div className="text-xl sm:text-2xl font-black font-display text-neutral-900 dark:text-white mt-0.5">
              {orders.length}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs">
            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              Total Revenue
            </span>
            <div className="text-xl sm:text-2xl font-black font-display text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
              ₹{totalRevenue}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs">
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Pending Verification
            </span>
            <div className="text-xl sm:text-2xl font-black font-display text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingCount}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs">
            <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              Fulfilled / Dispatched
            </span>
            <div className="text-xl sm:text-2xl font-black font-display text-blue-600 dark:text-blue-400 mt-0.5">
              {dispatchedCount}
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer phone, name, email, book, or UTR..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Pending Verification', 'Verified', 'Dispatched'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="w-12 h-12 text-neutral-400 mx-auto mb-3 opacity-40" />
              <h4 className="font-display font-bold text-base text-neutral-800 dark:text-neutral-200">
                No orders match your filter
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1">
                When students place orders for books (@₹50) or Combo Packs (@₹69), their phone number, email, and ordered books will appear here in real-time.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div 
                key={ord.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                      {ord.id}
                    </span>
                    {ord.isCombo && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-500/30">
                        ⚡ 2-Book Combo Pack
                      </span>
                    )}
                    <span className="text-xs text-neutral-400">
                      • {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      ord.status === 'Dispatched'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                        : ord.status === 'Verified'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                    }`}>
                      {ord.status}
                    </span>

                    <button
                      onClick={() => onDeleteOrder(ord.id)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Details & Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Customer Profile Information */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
                    <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Customer Contact
                    </div>

                    <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-sm">
                      <User className="w-4 h-4 text-amber-500" />
                      <span>{ord.customerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-mono font-bold">{ord.customerPhone}</span>
                      <a
                        href={`https://wa.me/91${ord.customerPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-emerald-600 hover:underline font-semibold"
                      >
                        (WhatsApp)
                      </a>
                    </div>

                    {ord.customerEmail && (
                      <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{ord.customerEmail}</span>
                      </div>
                    )}

                    {ord.transactionId && (
                      <div className="pt-1.5 border-t border-neutral-200 dark:border-neutral-800 text-[11px]">
                        <span className="text-neutral-500">UTR / Ref: </span>
                        <strong className="font-mono text-neutral-900 dark:text-white bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                          {ord.transactionId}
                        </strong>
                      </div>
                    )}
                  </div>

                  {/* Right: Ordered Books & Payment */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      <span>Ordered Material</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono font-black">
                        ₹{ord.totalAmount} Paid
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {ord.items.map((item, i) => (
                        <div key={i} className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <div className="font-bold text-neutral-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-neutral-500 flex items-center justify-between mt-0.5">
                            <span>Category: {item.category}</span>
                            <span>₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-neutral-500 pt-1">
                      UPI Payee: <strong className="font-mono">{ord.upiId}</strong>
                    </div>
                  </div>
                </div>

                {/* Action Bar for Status Updates */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-700 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-neutral-500">Update Status:</span>
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'Pending Verification')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        ord.status === 'Pending Verification'
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'Verified')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        ord.status === 'Verified'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      Verified
                    </button>
                    <button
                      onClick={() => onUpdateOrderStatus(ord.id, 'Dispatched')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        ord.status === 'Dispatched'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      Dispatched ✓
                    </button>
                  </div>

                  <a
                    href={`https://t.me/ssc_rrb_book_hall`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send PDF via Telegram</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 sm:px-6 bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Only verified with Owner Phone number. All customer orders persist safely in browser storage.</span>
          </div>

          {orders.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all order history?')) {
                  onClearAllOrders();
                }
              }}
              className="text-rose-500 hover:underline cursor-pointer"
            >
              Clear Order History
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
