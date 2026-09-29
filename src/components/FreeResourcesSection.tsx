import React, { useState } from 'react';
import { 
  DownloadCloud, 
  FileCheck, 
  Bell, 
  BookMarked, 
  HelpCircle, 
  ArrowRight, 
  Download, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FREE_RESOURCES } from '../data/mockData';
import { FreeResource } from '../types';

interface FreeResourcesSectionProps {
  onOpenResourcePreview?: (res: FreeResource) => void;
}

export const FreeResourcesSection: React.FC<FreeResourcesSectionProps> = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedSet, setDownloadedSet] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [previewResource, setPreviewResource] = useState<FreeResource | null>(null);

  const categories = [
    'All',
    'Free PYQs',
    'Formula Sheets',
    'Important Questions',
    'Exam Updates',
    'Study Materials'
  ];

  const handleDownload = (res: FreeResource) => {
    setDownloadingId(res.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedSet((prev) => [...prev, res.id]);
      alert(`Resource "${res.title}" (${res.size}) downloaded successfully!`);
    }, 900);
  };

  const filteredResources = FREE_RESOURCES.filter((res) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Free PYQs') return res.format === 'PYQ Bank' || res.category.includes('PYQ');
    if (activeCategory === 'Formula Sheets') return res.format === 'Formula Sheet' || res.category.includes('Formula');
    if (activeCategory === 'Important Questions') return res.format === 'PDF' || res.title.includes('Solved');
    if (activeCategory === 'Exam Updates') return res.category.includes('Strategy') || res.title.includes('Syllabus');
    if (activeCategory === 'Study Materials') return res.format === 'Notes' || res.category.includes('Notes');
    return true;
  });

  return (
    <section id="free-resources" className="py-16 sm:py-24 bg-neutral-100/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              <span>Open Access Library</span>
              <span>·</span>
              <span>No Login Required</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Free Exam Resources
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Download verified previous question banks, formula pocketbooks, speed mnemonics, and official syllabus breakdowns 100% free of charge.
            </p>
          </div>

          {/* Prominent CTA requested: “Get Free Resources” */}
          <button
            onClick={() => handleDownload(FREE_RESOURCES[0])}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Get Free Resources</span>
          </button>
        </div>

        {/* 5 Highlights Grid: Free PYQs, Formula Sheets, Important Questions, Exam Updates, Study Materials */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {[
            { name: 'Free PYQs', icon: HelpCircle, count: '10+ Years', desc: 'SSC, JE, UPSC & State PSC' },
            { name: 'Formula Sheets', icon: FileCheck, count: 'Civil & Math', desc: 'Pocket revision charts' },
            { name: 'Important Questions', icon: Sparkles, count: '5,000+ MCQs', desc: 'High repetition trends' },
            { name: 'Exam Updates', icon: Bell, count: 'Real-time Alerts', desc: 'Cutoffs & notifications' },
            { name: 'Study Materials', icon: BookMarked, count: 'Mindmaps', desc: 'Polity & GS notes' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(item.name)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                activeCategory === item.name
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/20'
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="font-display font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white leading-tight">
                {item.name}
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                {item.count}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                {item.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isDownloaded = downloadedSet.includes(res.id);
            const isProcessing = downloadingId === res.id;

            return (
              <div
                key={res.id}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all"
              >
                <div>
                  {/* Category & Format line */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">{res.exam}</span>
                    <span>{res.format} · {res.size}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white leading-snug">
                    {res.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                    {res.downloads} downloads
                  </span>

                  <button
                    onClick={() => handleDownload(res)}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isProcessing ? (
                      <span>Downloading...</span>
                    ) : isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Free</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Exam Updates & Notification Ticker */}
        <div className="mt-12 p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                Upcoming Competitive Exam Calendar & Vacancy Watch
              </h4>
            </div>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Updated Daily</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="font-semibold text-neutral-900 dark:text-white">SSC CGL Tier 1 Examination</div>
              <div className="text-amber-600 dark:text-amber-400 mt-0.5">Exam Window: Expected Oct-Nov 2026</div>
              <div className="text-neutral-500 text-[11px] mt-1">17,700+ Expected Vacancies</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="font-semibold text-neutral-900 dark:text-white">SSC JE CBT-1 (Civil/Elec/Mech)</div>
              <div className="text-amber-600 dark:text-amber-400 mt-0.5">Notification: Active Online</div>
              <div className="text-neutral-500 text-[11px] mt-1">968+ Junior Engineer Posts</div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="font-semibold text-neutral-900 dark:text-white">Railway RRB NTPC & Group D</div>
              <div className="text-amber-600 dark:text-amber-400 mt-0.5">Application Window: Underway</div>
              <div className="text-neutral-500 text-[11px] mt-1">11,558+ Grad & Undergrad Vacancies</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
