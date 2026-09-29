import React from 'react';
import { 
  Building2, 
  HardHat, 
  Award, 
  GraduationCap, 
  Compass, 
  Train, 
  Landmark, 
  ShieldAlert, 
  ArrowRight 
} from 'lucide-react';
import { EXAM_CATEGORIES_INFO } from '../data/mockData';
import { ExamCategory } from '../types';

interface ExamCategoriesProps {
  onSelectCategory: (category: ExamCategory) => void;
}

export const ExamCategories: React.FC<ExamCategoriesProps> = ({ onSelectCategory }) => {
  
  // Icon mapper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Train': return <Train className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      default: return <ShieldAlert className="w-5 h-5" />;
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-neutral-100/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <span>Target Exam Segments</span>
              <span>·</span>
              <span>Curated for Indian Aspirants</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Explore Exam Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Targeted materials, previous year solved papers, and syllabus-aligned books structured by your specific examination.
            </p>
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any category to filter books & PYQ vaults
          </div>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EXAM_CATEGORIES_INFO.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 hover:border-amber-400 dark:hover:border-amber-600 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Header row: Icon + Exam count badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.colorTheme} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                    {getIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
                    {cat.resourceCount}
                  </span>
                </div>

                {/* Title & Full Name */}
                <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <div className="text-xs font-medium text-amber-700 dark:text-amber-400 mt-0.5">
                  {cat.fullName}
                </div>

                {/* Sub-exams list */}
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {cat.examsIncluded}
                </p>

                {/* Short Description */}
                <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              {/* View Resources CTA Button */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <button
                  onClick={() => onSelectCategory(cat.name as ExamCategory)}
                  className="w-full inline-flex items-center justify-between px-3 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/70 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-neutral-950 rounded-lg transition-colors cursor-pointer"
                >
                  <span>View Resources</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
