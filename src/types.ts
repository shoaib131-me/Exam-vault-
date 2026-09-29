export type ExamCategory = 
  | 'All'
  | 'SSC'
  | 'SSC JE'
  | 'UPSC'
  | 'State PSC'
  | 'AE & JE'
  | 'AE'
  | 'JE'
  | 'PSC'
  | 'Railway'
  | 'Banking'
  | 'Civil Engineering'
  | 'Other Exams';

export interface OrderItem {
  bookId: string;
  title: string;
  category: string;
  price: number;
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  customerPhone: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  isCombo: boolean;
  totalAmount: number;
  upiId: string;
  transactionId?: string;
  status: 'Pending Verification' | 'Verified' | 'Dispatched';
  telegramSent?: boolean;
  notes?: string;
}

export interface RegisteredAccount {
  id: string;
  identifier: string; // phone or email (normalized)
  identifierType: 'phone' | 'email';
  name: string;
  password: string;
  createdAt: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  loginMethod: 'phone' | 'email' | 'password';
  loginAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: ExamCategory;
  medium: 'English' | 'Hindi' | 'Bilingual';
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  edition: string;
  pages: number;
  shortDescription: string;
  detailedDescription: string;
  coverAccent: string; // Tailwind gradient/color theme
  coverImage?: string; // Optional direct custom cover image URL
  badge?: string;
  keyFeatures: string[];
  tableOfContents: string[];
  buyLink: string;
}

export interface PYQOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface PYQQuestion {
  id: string;
  exam: string;
  subject: string;
  subtopic: string;
  year: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  question: string;
  options: PYQOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  keyFormulaOrRule?: string;
  isTodaySpecial?: boolean;
}

export interface CurrentAffairItem {
  id: string;
  date: string;
  category: 'National' | 'Economy' | 'Science & Tech' | 'Sports' | 'Awards & Appointments' | 'Defence';
  headline: string;
  summary: string;
  bulletPoints: string[];
  examRelevance: string; // e.g. "SSC CGL / UPSC Prelims GS"
}

export interface CurrentAffairPDF {
  id: string;
  title: string;
  month: string;
  year: number;
  pages: number;
  fileSize: string;
  type: 'Monthly Digest' | 'One-Liner Capsule' | 'Topic Special';
  downloadCount: string;
}

export interface FreeResource {
  id: string;
  title: string;
  category: string;
  exam: string;
  format: 'PDF' | 'Formula Sheet' | 'PYQ Bank' | 'Notes';
  size: string;
  downloads: string;
  description: string;
  isPopular?: boolean;
}

export interface InstagramPost {
  id: string;
  type: 'post' | 'reel' | 'carousel';
  title: string;
  caption: string;
  tags: string[];
  likes: string;
  saves: string;
  comments: string;
  date: string;
  graphicType: 'formula' | 'tips' | 'pyq' | 'book_review' | 'current_affairs' | 'motivation';
  badge: string;
  bgGradient: string;
}
