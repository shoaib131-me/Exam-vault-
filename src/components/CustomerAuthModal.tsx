import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Package, 
  LogOut, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { CustomerUser, CustomerOrder, RegisteredAccount } from '../types';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser | null;
  onLoginSuccess: (user: CustomerUser) => void;
  onLogout: () => void;
  customerOrders: CustomerOrder[];
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  customerOrders
}) => {
  // Mode: 'login' or 'signup'
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  // Type: 'phone' or 'email'
  const [idType, setIdType] = useState<'phone' | 'email'>('phone');

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Normalize phone or email identifier
  const normalizeId = (id: string, type: 'phone' | 'email') => {
    if (type === 'phone') {
      return id.trim().replace(/\D/g, '');
    }
    return id.trim().toLowerCase();
  };

  // Get stored registered accounts from localStorage
  const getStoredAccounts = (): RegisteredAccount[] => {
    try {
      const stored = localStorage.getItem('exam_vault_registered_accounts');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const saveAccounts = (accounts: RegisteredAccount[]) => {
    localStorage.setItem('exam_vault_registered_accounts', JSON.stringify(accounts));
  };

  // Handle Login with existing ID & Password
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanId = normalizeId(identifier, idType);

    if (idType === 'phone' && cleanId.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (idType === 'email' && (!cleanId.includes('@') || !cleanId.includes('.'))) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    const accounts = getStoredAccounts();
    const existing = accounts.find((acc) => acc.identifier === cleanId && acc.identifierType === idType);

    if (!existing) {
      setError('No account found with this ID. Please switch to "Create Account / Sign Up" to set your password.');
      return;
    }

    if (existing.password !== password) {
      setError('Incorrect password! Please enter the same password you registered with.');
      return;
    }

    // Success login
    const loggedUser: CustomerUser = {
      id: existing.id,
      name: existing.name || (idType === 'phone' ? `Aspirant ${cleanId.slice(-4)}` : cleanId.split('@')[0]),
      phone: idType === 'phone' ? cleanId : undefined,
      email: idType === 'email' ? cleanId : undefined,
      loginMethod: idType,
      loginAt: new Date().toISOString()
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  // Handle Sign Up (Create new ID & Custom Password)
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanId = normalizeId(identifier, idType);

    if (idType === 'phone' && cleanId.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (idType === 'email' && (!cleanId.includes('@') || !cleanId.includes('.'))) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password.trim() || password.length < 3) {
      setError('Password must be at least 3 characters long');
      return;
    }

    const accounts = getStoredAccounts();
    const existing = accounts.find((acc) => acc.identifier === cleanId && acc.identifierType === idType);

    if (existing) {
      // If already registered
      if (existing.password === password) {
        // Log them right in
        const loggedUser: CustomerUser = {
          id: existing.id,
          name: existing.name || name.trim() || 'Aspirant Student',
          phone: idType === 'phone' ? cleanId : undefined,
          email: idType === 'email' ? cleanId : undefined,
          loginMethod: idType,
          loginAt: new Date().toISOString()
        };
        onLoginSuccess(loggedUser);
        onClose();
        return;
      } else {
        setError('This ID is already registered! Please switch to Login and enter your existing password, or use another ID.');
        return;
      }
    }

    // Create new account
    const newAccount: RegisteredAccount = {
      id: `acc-${Date.now()}`,
      identifier: cleanId,
      identifierType: idType,
      name: name.trim() || (idType === 'phone' ? `Aspirant ${cleanId.slice(-4)}` : cleanId.split('@')[0]),
      password: password,
      createdAt: new Date().toISOString()
    };

    accounts.push(newAccount);
    saveAccounts(accounts);

    const loggedUser: CustomerUser = {
      id: newAccount.id,
      name: newAccount.name,
      phone: idType === 'phone' ? cleanId : undefined,
      email: idType === 'email' ? cleanId : undefined,
      loginMethod: idType,
      loginAt: new Date().toISOString()
    };

    onLoginSuccess(loggedUser);
    onClose();
  };

  // Filter orders for this specific logged in customer
  const userOrders = customerOrders.filter((ord) => {
    if (!currentUser) return false;
    if (currentUser.phone && ord.customerPhone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')) {
      return true;
    }
    if (currentUser.email && ord.customerEmail.toLowerCase() === currentUser.email.toLowerCase()) {
      return true;
    }
    return false;
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white leading-tight">
                {currentUser ? 'Student Account & Orders' : (authMode === 'login' ? 'Student Login' : 'Create Student Account')}
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {currentUser ? `Welcome back, ${currentUser.name}` : 'Login with your ID & Password'}
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

        {/* Modal Body */}
        <div className="p-6">
          {currentUser ? (
            /* Logged In View with Profile & Orders */
            <div className="space-y-5">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center text-base">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                      {currentUser.name}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                      {currentUser.phone ? `+91 ${currentUser.phone}` : currentUser.email}
                    </p>
                    <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold">
                      ID Active
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-950/40 text-xs font-semibold text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              {/* My Orders Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span>My Book Orders ({userOrders.length})</span>
                  </h4>
                  <a
                    href="https://t.me/ssc_rrb_book_hall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#229ED9] hover:underline flex items-center gap-1"
                  >
                    <span>Telegram Support</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {userOrders.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-center">
                    <BookOpen className="w-8 h-8 text-neutral-400 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      No orders placed with this account yet
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                      Order any book at ₹50 or 2 books combo at ₹69 — it will show up here automatically!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {userOrders.map((ord) => (
                      <div 
                        key={ord.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-neutral-900 dark:text-white">
                            {ord.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Dispatched' 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : ord.status === 'Verified'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {ord.status}
                          </span>
                        </div>

                        <div className="text-xs space-y-0.5">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                              • {item.title}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100 dark:border-neutral-700">
                          <span>Paid: <strong className="text-neutral-900 dark:text-white font-mono">₹{ord.totalAmount}</strong></span>
                          <span>{new Date(ord.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Next time, simply log in with this same Phone/Gmail & Password to view your orders.</span>
              </div>
            </div>
          ) : (
            /* Auth Form (Login vs Sign Up) */
            <div className="space-y-4">
              {/* Login vs Sign Up Mode Tabs */}
              <div className="grid grid-cols-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Log In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setError('');
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Create Account (Sign Up)
                </button>
              </div>

              {/* ID Type Switcher: Phone vs Gmail */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-neutral-500">Login with:</span>
                <button
                  type="button"
                  onClick={() => {
                    setIdType('phone');
                    setIdentifier('');
                    setError('');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    idType === 'phone'
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/40'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIdType('email');
                    setIdentifier('');
                    setError('');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    idType === 'email'
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/40'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gmail / Email</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={authMode === 'login' ? handleLogin : handleSignUp} className="space-y-3.5">
                {/* Name field (only on Sign Up) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                {/* Identifier field */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    {idType === 'phone' ? 'Phone Number' : 'Gmail / Email ID'}
                  </label>
                  {idType === 'phone' ? (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        autoFocus
                        maxLength={10}
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          setError('');
                        }}
                        placeholder="Enter 10-digit mobile"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  ) : (
                    <input
                      type="email"
                      required
                      autoFocus
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g. student@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  )}
                </div>

                {/* Password field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      {authMode === 'signup' ? 'Create Password' : 'Password'}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder={authMode === 'signup' ? 'Set your password' : 'Enter your password'}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {authMode === 'signup' && (
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Choose any password you like. Next time you will log in with this same password.
                    </p>
                  )}
                </div>

                {error && (
                  <p className="text-xs text-rose-500 font-medium leading-relaxed">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>{authMode === 'login' ? 'Log In' : 'Create Account & Log In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center text-xs text-neutral-500">
                  {authMode === 'login' ? (
                    <span>
                      New user?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('signup');
                          setError('');
                        }}
                        className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                      >
                        Create Account
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setError('');
                        }}
                        className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                      >
                        Log In
                      </button>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
