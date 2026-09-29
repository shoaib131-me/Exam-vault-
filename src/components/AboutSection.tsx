import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  Instagram, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
              <span>About Exam Vault</span>
              <span>·</span>
              <span>Our Educational Mission</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
              Built by Rankers, Curated for Every Bharat Aspirant.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <strong>Exam Vault</strong> is an educational brand founded with a single clear mission: to simplify competitive exam preparation for Indian students. We cut through the noise of bloated 500-hour video courses and misleading mock test series to bring you authentic, high-yield books, validated previous year questions with error-free solutions, and daily exam capsules.
            </p>

            <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Whether you are an engineering graduate targeting <strong>SSC JE (Civil/Mech/Elec)</strong> and <strong>State AE</strong>, a civil services aspirant aiming for <strong>UPSC & State PSCs</strong>, or preparing for <strong>SSC CGL, Railway RRB, and Banking</strong> — Exam Vault gives you the exact blueprint and verified resources needed to clear the cutoffs without wasting precious years.
            </p>

            {/* 3 Core Principles */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-display font-semibold text-xs text-neutral-900 dark:text-white">
                  100% Verified Keys
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Every MCQ cross-checked with official commission gazettes & standard textbooks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <Target className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-display font-semibold text-xs text-neutral-900 dark:text-white">
                  Zero-Fluff Curation
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Only high-frequency topics that actually get repeated in recent exams.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <BookOpen className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-display font-semibold text-xs text-neutral-900 dark:text-white">
                  Affordable & Free First
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Free formula handbooks, open PYQ vaults, and lowest book price discovery.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#books"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl transition-all"
              >
                <span>Browse Recommended Books</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/exam._vault?stkn=M3BrZDE3emtyOW13"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>Join our Instagram (@exam._vault)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Trust & Community Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                    Exam Vault Standards
                  </h3>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Dedicated to Competitive Aspirants Across 28 States
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>IS-Code Accurate Solutions:</strong> Civil engineering questions strictly follow IS 456:2000, IS 800:2007 and IRC guidelines.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>TCS Interface Calibration:</strong> Aptitude & reasoning papers matching actual TCS question banks for SSC & Railways.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Standard Academic Literature:</strong> Recommends trusted stalwarts like Laxmikanth, Made Easy, YCT, and NCERT rather than unverified coaching booklets.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Active Aspirant Support:</strong> Daily query resolution via Instagram direct messages and community forums.</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>Founded: 2024</span>
                <span>Headquarters: New Delhi, India</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">100% Free Resources</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
