import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Settings, 
  LogOut, 
  RotateCcw, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

interface AdminToolbarProps {
  onAddNewBook: () => void;
  onOpenSettings: () => void;
  onOpenOrders: () => void;
  onResetCatalog: () => void;
  onLogoutAdmin: () => void;
  booksCount: number;
  ordersCount: number;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  onAddNewBook,
  onOpenSettings,
  onOpenOrders,
  onResetCatalog,
  onLogoutAdmin,
  booksCount,
  ordersCount
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-3xl bg-neutral-900/95 dark:bg-neutral-900/95 backdrop-blur-md text-white border-2 border-amber-500 rounded-2xl shadow-2xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 animate-in slide-in-from-bottom duration-200">
      
      {/* Status */}
      <div className="flex items-center gap-2 px-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <div>
          <span className="text-xs font-extrabold tracking-wide text-amber-400 font-display flex items-center gap-1">
            <span>Owner Portal (Live Edit)</span>
          </span>
          <span className="text-[10px] text-neutral-400 block -mt-0.5">
            {booksCount} books · {ordersCount} customer orders
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Customer Orders Trigger */}
        <button
          onClick={onOpenOrders}
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 text-xs font-extrabold shadow-sm transition-all cursor-pointer"
          title="View all Customer Orders and Delivery Status"
        >
          <span>📦 Orders</span>
          <span className="px-1.5 py-0.2 rounded-full bg-neutral-950 text-amber-400 text-[10px] font-black tabular-nums">
            {ordersCount}
          </span>
        </button>

        <button
          onClick={onAddNewBook}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-colors cursor-pointer"
          title="Add a new book to catalog"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Add Book</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
          title="Page & Payment Settings"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Settings</span>
        </button>

        <button
          onClick={onResetCatalog}
          className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Reset books to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onLogoutAdmin}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
          title="Exit Admin Edit Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>

    </div>
  );
};
