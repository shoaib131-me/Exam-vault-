import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Flame, 
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PYQQuestion } from '../types';
import { DAILY_PYQS } from '../data/mockData';

interface DailyPYQSectionProps {
  savedPYQIds: string[];
  onToggleSavePYQ: (pyq: PYQQuestion) => void;
}

export const DailyPYQSection: React.FC<DailyPYQSectionProps> = ({
  savedPYQIds,
  onToggleSavePYQ
}) => {
  // Today's special question state
  const todayPYQ = DAILY_PYQS.find((q) => q.isTodaySpecial) || DAILY_PYQS[0];
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [streakCount, setStreakCount] = useState(14); // 14-day study streak
  const [hasClaimedStreak, setHasClaimedStreak] = useState(false);

  // Previous PYQ filters & expand states
  const [selectedExamFilter, setSelectedExamFilter] = useState('All');
  const [expandedPYQId, setExpandedPYQId] = useState<string | null>(null);
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const previousPYQs = DAILY_PYQS.filter((q) => !q.isTodaySpecial);

  const filteredPreviousPYQs = previousPYQs.filter((q) => {
    if (selectedExamFilter === 'All') return true;
    return q.exam.toLowerCase().includes(selectedExamFilter.toLowerCase());
  });

  const handleSelectTodayOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
    setIsAnswerSubmitted(true);
    if (opt === todayPYQ.correctOption && !hasClaimedStreak) {
      setStreakCount((prev) => prev + 1);
      setHasClaimedStreak(true);
    }
  };

  const handleResetTodayPYQ = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const isTodayCorrect = selectedOption === todayPYQ.correctOption;

  return (
    <section id="pyqs" className="py-16 sm:py-24 bg-neutral-100/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <span>Exam Drill Vault</span>
              <span>·</span>
              <span>Authentic Exam Papers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Daily PYQ Practice
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Master the actual question patterns of SSC JE, CGL, UPSC & State PSC. Solve daily questions with official keys and detailed step-by-step logic.
            </p>
          </div>

          {/* Aspirant Study Streak Counter */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-medium self-start md:self-auto">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>
              Your Revision Streak:{' '}
              <strong className="font-bold text-neutral-900 dark:text-white tabular-nums">{streakCount} Days</strong>
            </span>
          </div>
        </div>

        {/* ========================================================
            FEATURED: TODAY'S PYQ INTERACTIVE CARD
            ======================================================== */}
        <div className="mb-14">
          <div className="rounded-3xl bg-white dark:bg-neutral-900 border-2 border-amber-400/80 dark:border-amber-500/80 shadow-lg p-6 sm:p-8 relative overflow-hidden">
            
            {/* Top Accent bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Today&apos;s Featured Question
                </span>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                  {todayPYQ.exam} ({todayPYQ.year})
                </span>
              </div>

              {/* Subject & Difficulty text metadata (No pill box) */}
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>{todayPYQ.subject}</span>
                <span>·</span>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Difficulty: {todayPYQ.difficulty}
                </span>
                <span>·</span>
                <button
                  onClick={() => onToggleSavePYQ(todayPYQ)}
                  className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {savedPYQIds.includes(todayPYQ.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5" /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" /> Save PYQ
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-relaxed">
                {todayPYQ.question}
              </h3>
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                Topic: {todayPYQ.subtopic}
              </p>
            </div>

            {/* 4 Interactive Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {todayPYQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isThisOptionCorrect = opt.id === todayPYQ.correctOption;

                let optionStyles = 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800';

                if (isAnswerSubmitted) {
                  if (isThisOptionCorrect) {
                    optionStyles = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isThisOptionCorrect) {
                    optionStyles = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 font-medium';
                  } else {
                    optionStyles = 'opacity-60 bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectTodayOption(opt.id)}
                    disabled={isAnswerSubmitted}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left text-sm transition-all duration-150 cursor-pointer ${optionStyles}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-xs shrink-0">
                      {opt.id}
                    </span>
                    <span className="leading-snug pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation & Result Tray */}
            {isAnswerSubmitted ? (
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isTodayCorrect ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-bold text-sm text-emerald-700 dark:text-emerald-400">
                          Brilliant! Option {todayPYQ.correctOption} is correct.
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        <span className="font-bold text-sm text-rose-700 dark:text-rose-400">
                          Incorrect! Correct Option is {todayPYQ.correctOption}.
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleResetTodayPYQ}
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                </div>

                {/* Explanation text */}
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                  {todayPYQ.explanation}
                </p>

                {/* Highlighted Rule / Formula */}
                {todayPYQ.keyFormulaOrRule && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 text-xs font-mono text-amber-900 dark:text-amber-200">
                    <strong>Rule:</strong> {todayPYQ.keyFormulaOrRule}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2">
                <span>Select an option above to verify your answer instantly</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  +1 Day added to revision streak upon correct answer!
                </span>
              </div>
            )}

          </div>
        </div>

        {/* ========================================================
            PREVIOUS PYQs ARCHIVE & FILTERABLE DRILL
            ======================================================== */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
            <div>
              <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Previous Years Question Archive
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Filter by target exam to practice topic-wise MCQs asked in past shifts
              </p>
            </div>

            {/* Exam Filter tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'SSC', 'UPSC', 'State AE', 'Railway'].map((examName) => (
                <button
                  key={examName}
                  onClick={() => setSelectedExamFilter(examName)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedExamFilter === examName
                      ? 'bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 font-semibold'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {examName}
                </button>
              ))}
            </div>
          </div>

          {/* List of Previous PYQ Cards */}
          <div className="space-y-4">
            {filteredPreviousPYQs.map((q) => {
              const isExpanded = expandedPYQId === q.id;
              const isSaved = savedPYQIds.includes(q.id);
              const selectedOpt = interactiveAnswers[q.id];
              const isSolutionRevealed = revealedSolutions[q.id];

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
                >
                  {/* Top Metadata Line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {q.exam}
                      </span>
                      <span>·</span>
                      <span>Year {q.year}</span>
                      <span>·</span>
                      <span>{q.subject}</span>
                      <span>·</span>
                      <span className={`font-medium ${
                        q.difficulty === 'Easy' ? 'text-emerald-600' :
                        q.difficulty === 'Moderate' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleSavePYQ(q)}
                      className="text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 text-xs flex items-center gap-1 cursor-pointer"
                      title="Save for Revision"
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-amber-600 dark:text-amber-400 font-medium">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Question */}
                  <h4 className="font-display font-medium text-sm sm:text-base text-neutral-900 dark:text-white leading-relaxed mb-4 whitespace-pre-line">
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {q.options.map((opt) => {
                      const isSelected = selectedOpt === opt.id;
                      const isCorrect = opt.id === q.correctOption;

                      let style = 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300';
                      if (selectedOpt) {
                        if (isCorrect) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold';
                        } else if (isSelected) {
                          style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setInteractiveAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                            setRevealedSolutions((prev) => ({ ...prev, [q.id]: true }));
                          }}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${style}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                            {opt.id}
                          </span>
                          <span className="pt-0.5 leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Solution reveal toggle */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                    <button
                      onClick={() => setRevealedSolutions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isSolutionRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      <span>{isSolutionRevealed ? 'Hide Solution' : 'View Official Key & Logic'}</span>
                    </button>

                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Topic: {q.subtopic}
                    </span>
                  </div>

                  {/* Expanded Solution Drawer */}
                  {isSolutionRevealed && (
                    <div className="mt-3 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Official Answer Key: Option ({q.correctOption})</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-line">
                        {q.explanation}
                      </p>
                      {q.keyFormulaOrRule && (
                        <div className="p-2 rounded bg-white dark:bg-neutral-800 font-mono text-[11px] text-amber-900 dark:text-amber-200 border border-neutral-200 dark:border-neutral-700">
                          {q.keyFormulaOrRule}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Prominent CTA requested: “Practice More PYQs” */}
          <div className="mt-10 text-center">
            <a
              href="#free-resources"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Practice More PYQs</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              Access 8,500+ solved previous questions sorted chapter-wise in the Free Resources section
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
