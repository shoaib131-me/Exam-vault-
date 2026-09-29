import React, { useState } from 'react';
import { Settings, X, Save, ShieldCheck, Zap } from 'lucide-react';

interface PageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboPrice: number;
  upiId: string;
  telegramLink: string;
  telegramUsername: string;
  instagramLink: string;
  ownerPhone: string;
  onSaveSettings: (settings: {
    comboPrice: number;
    upiId: string;
    telegramLink: string;
    telegramUsername: string;
    instagramLink: string;
    ownerPhone: string;
  }) => void;
}

export const PageSettingsModal: React.FC<PageSettingsModalProps> = ({
  isOpen,
  onClose,
  comboPrice,
  upiId,
  telegramLink,
  telegramUsername,
  instagramLink,
  ownerPhone,
  onSaveSettings
}) => {
  const [formComboPrice, setFormComboPrice] = useState(comboPrice);
  const [formUpiId, setFormUpiId] = useState(upiId);
  const [formTelegramLink, setFormTelegramLink] = useState(telegramLink);
  const [formTelegramUsername, setFormTelegramUsername] = useState(telegramUsername);
  const [formInstagramLink, setFormInstagramLink] = useState(instagramLink);
  const [formOwnerPhone, setFormOwnerPhone] = useState(ownerPhone);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      comboPrice: Number(formComboPrice) || 69,
      upiId: formUpiId.trim() || 'shoaibbsp6@oksbi',
      telegramLink: formTelegramLink.trim() || 'https://t.me/ssc_rrb_book_hall',
      telegramUsername: formTelegramUsername.trim() || '@ssc_rrb_book_hall',
      instagramLink: formInstagramLink.trim() || 'https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13',
      ownerPhone: formOwnerPhone.trim() || '9340227469'
    });
    onClose();
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                Exam Vault Settings & Payment Setup
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Update UPI ID, Combo Price & Social Links
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Combo Pack Price (₹)
            </label>
            <div className="relative">
              <input
                type="number"
                required
                min={1}
                value={formComboPrice}
                onChange={(e) => setFormComboPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
              />
            </div>
            <span className="text-[10px] text-neutral-500">Currently ₹69 for 2 books combo</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Owner Mobile Number (For Admin Lock & Access)
            </label>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={formOwnerPhone}
                onChange={(e) => setFormOwnerPhone(e.target.value)}
                placeholder="e.g. 9340227469"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono"
              />
            </div>
            <span className="text-[10px] text-neutral-500">Only this phone number can unlock the Owner Portal to view orders & edit catalog data</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Your UPI ID for QR Code
            </label>
            <input
              type="text"
              required
              value={formUpiId}
              onChange={(e) => setFormUpiId(e.target.value)}
              placeholder="e.g. shoaibbsp6@oksbi"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono"
            />
            <span className="text-[10px] text-neutral-500">The QR Code will automatically generate for this UPI ID</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Telegram Channel Link
            </label>
            <input
              type="url"
              required
              value={formTelegramLink}
              onChange={(e) => setFormTelegramLink(e.target.value)}
              placeholder="https://t.me/ssc_rrb_book_hall"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Telegram Username / Handle
            </label>
            <input
              type="text"
              required
              value={formTelegramUsername}
              onChange={(e) => setFormTelegramUsername(e.target.value)}
              placeholder="@ssc_rrb_book_hall"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              Instagram Page Link
            </label>
            <input
              type="url"
              required
              value={formInstagramLink}
              onChange={(e) => setFormInstagramLink(e.target.value)}
              placeholder="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
