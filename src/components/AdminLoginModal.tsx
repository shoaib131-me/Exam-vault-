import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  ownerPhone?: string;
  onUpdateOwnerPhone?: (phone: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  ownerPhone = '9340227469'
}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const normalize = (p: string) => p.trim().replace(/\D/g, '');
  const targetOwner = normalize(ownerPhone) || '9340227469';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = normalize(phone);

    // Strictly verify owner's mobile number: 9340227469
    if (cleanPhone !== targetOwner && cleanPhone !== '9340227469') {
      setError('Access Denied: Invalid Mobile Number');
      return;
    }

    // Strictly verify owner's secret password: MRsa786
    if (password !== 'MRsa786') {
      setError('Access Denied: Incorrect Password');
      return;
    }

    // Both match! Grant admin edit & orders access
    onLoginSuccess();
    setError('');
    setPhone('');
    setPassword('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
              Admin Login
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="pt-5 space-y-4">
          {/* Mobile Number Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                🇮🇳 +91
              </span>
              <input
                type="tel"
                required
                autoFocus
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="Enter 10-digit mobile"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-500 font-medium leading-relaxed flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 pt-2.5"
          >
            <span>Log In as Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
