import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Search,
  Volume2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  LIBRARY_TRAVEL_IMAGE,
  MASTER_TEACHERS,
  ONLINE_PAVILION_POSTER,
  ONLINE_PAVILION_VIDEO,
  PRACTICE_GUIDES,
} from '../data/vanvitaData';
import { PracticeCategory, PracticeGuide } from '../types/vanvita';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface PracticeLibraryProps {
  previewMode?: boolean;
  initialGuideId?: string | null;
  onClearInitialGuide?: () => void;
  onViewAllLibrary?: () => void;
  onBookWithMaster: (masterId: string, guideTitle: string) => void;
}

const CATEGORIES: Array<'All' | PracticeCategory> = [
  'All',
  'Breathwork',
  'Somatic Vinyasa',
  'Restorative',
  'Travel Recovery',
];

const DURATIONS: Array<'All' | '5-12 min' | '15-20 min' | '25-30 min'> = [
  'All',
  '5-12 min',
  '15-20 min',
  '25-30 min',
];

function getTintClasses(tint: PracticeGuide['accentTint']) {
  if (tint === 'sage') return 'bg-[#EAE1DA]';
  if (tint === 'lavender') return 'bg-[#E2D7CF]';
  return 'bg-[#F9F3EE]';
}

export function PracticeLibrary({
  previewMode = false,
  initialGuideId = null,
  onClearInitialGuide,
  onViewAllLibrary,
  onBookWithMaster,
}: PracticeLibraryProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selectedCategory, setSelectedCategory] = useState<'All' | PracticeCategory>('All');
  const [selectedDuration, setSelectedDuration] = useState<
    'All' | '5-12 min' | '15-20 min' | '25-30 min'
  >('All');
  const [selectedMasterId, setSelectedMasterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuide, setActiveGuide] = useState<PracticeGuide | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (initialGuideId) {
      const found = PRACTICE_GUIDES.find((g) => g.id === initialGuideId);
      if (found) {
        setActiveGuide(found);
        setElapsedSeconds(0);
        setIsPlaying(true);
      }
      onClearInitialGuide?.();
    }
  }, [initialGuideId, onClearInitialGuide]);

  const totalDemoSeconds = activeGuide ? activeGuide.durationMinutes * 6 : 60;

  useEffect(() => {
    if (!activeGuide || !isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= totalDemoSeconds) {
          setIsPlaying(false);
          return totalDemoSeconds;
        }
        return prev + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeGuide, isPlaying, totalDemoSeconds]);

  const filteredGuides = useMemo(() => {
    const base = PRACTICE_GUIDES.filter((guide) => {
      if (selectedCategory !== 'All' && guide.category !== selectedCategory) return false;
      if (selectedDuration !== 'All' && guide.durationBucket !== selectedDuration) return false;
      if (selectedMasterId !== 'all' && guide.masterId !== selectedMasterId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay =
          `${guide.title} ${guide.subtitle} ${guide.masterName} ${guide.category} ${guide.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return previewMode ? base.slice(0, 3) : base;
  }, [selectedCategory, selectedDuration, selectedMasterId, searchQuery, previewMode]);

  const openGuideModal = (guide: PracticeGuide) => {
    setActiveGuide(guide);
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  const closeGuideModal = () => {
    setIsPlaying(false);
    setActiveGuide(null);
  };

  const activeBreathPhase = useMemo(() => {
    if (!activeGuide) return { label: 'Breathe', scale: 1 };
    const { inhale, hold, exhale } = activeGuide.breathRatio;
    const cycle = Math.max(1, inhale + hold + exhale);
    const pos = elapsedSeconds % cycle;
    if (pos < inhale) {
      return { label: `Inhale · ${inhale - pos}s`, scale: 1.18 };
    }
    if (pos < inhale + hold) {
      return { label: `Hold · ${inhale + hold - pos}s`, scale: 1.18 };
    }
    return { label: `Exhale · ${cycle - pos}s`, scale: 0.88 };
  }, [activeGuide, elapsedSeconds]);

  const activeCueIndex = useMemo(() => {
    if (!activeGuide) return 0;
    const ratio = elapsedSeconds / Math.max(1, totalDemoSeconds);
    return Math.min(
      activeGuide.cues.length - 1,
      Math.floor(ratio * activeGuide.cues.length)
    );
  }, [activeGuide, elapsedSeconds, totalDemoSeconds]);

  const formatClock = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  return (
    <SectionEntrance
      id="practice-library"
      immediate={!previewMode}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-1/4 w-[420px] h-[420px] rounded-full bg-[#EFE6DF]/65 blur-[100px] animate-blob-slow"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-[13.5px] font-medium text-[#5A1E31] mb-3">
                Practice Library · Guided Video &amp; Breathwork Studies
              </p>
              <h2 className="text-[38px] md:text-[52px] font-normal leading-[1.08] tracking-[-0.025em] text-[#51372E]">
                Unhurried sessions for the moments{' '}
                <span className="font-cursive text-[48px] md:text-[64px] text-[#752D43] font-normal leading-none">
                  between
                </span>{' '}
                live coaching.
              </h2>
            </div>

            {previewMode && onViewAllLibrary ? (
              <button
                type="button"
                onClick={onViewAllLibrary}
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[#51372E] bg-white border border-[#D8CEC4] hover:border-[#752D43] rounded-full soft-card-shadow transition-all whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer min-h-[44px]"
              >
                <span>Open Full Library ({PRACTICE_GUIDES.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <p className="text-[15.5px] leading-[1.68] text-[#634B41] max-w-md">
                Filter by discipline, session length, or senior teacher. Each study opens a calm,
                breath-paced visual guide.
              </p>
            )}
          </div>
        </RevealOnScroll>

        {/* Serene Online Wellness Singing Bowls & Morning Breeze Ambient Banner */}
        <RevealOnScroll delay={0.06} className="mb-10">
          <div className="relative rounded-[2.25rem] overflow-hidden border border-[#D8CEC4] soft-card-shadow bg-[#51372E] h-[250px] sm:h-[320px]">
            <video
              src={ONLINE_PAVILION_VIDEO}
              poster={ONLINE_PAVILION_POSTER}
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
              aria-label="Bronze Tibetan singing bowls resting on a woven rug in a sunlit wooden pavilion as white linen curtains drift gently"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3A251E]/90 via-[#3A251E]/28 to-transparent"
            />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-[#F2EAE5]">
              <div className="max-w-xl">
                <p className="text-[12.5px] font-medium text-[#E8899D] mb-1">
                  Recorded Library &amp; Daily Memberships
                </p>
                <p className="text-[19px] sm:text-[22px] font-medium leading-snug text-[#F2EAE5]">
                  Quiet 9-to-30 minute practices ready whenever your day calls for a pause.
                </p>
              </div>
              <span className="text-[13px] font-medium text-[#F2EAE5]/92 whitespace-nowrap shrink-0">
                Available 24/7 Worldwide
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Interactive Filters Bar */}
        <RevealOnScroll delay={0.08}>
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Filter practices by category"
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#D8CEC4] rounded-full soft-card-shadow"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'text-[#F2EAE5]'
                          : 'text-[#72584D] hover:text-[#51372E]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="libraryCategoryPill"
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-[#51372E] rounded-full"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>

              {!previewMode && (
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#72584D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search techniques..."
                    aria-label="Search practice guides"
                    className="w-full pl-10 pr-4 py-2.5 text-[14px] text-[#51372E] bg-white border border-[#D8CEC4] rounded-full focus:border-[#752D43] focus:outline-none soft-card-shadow"
                  />
                </div>
              )}
            </div>

            {!previewMode && (
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] text-[#72584D] mr-1">Length:</span>
                  {DURATIONS.map((bucket) => {
                    const isActive = selectedDuration === bucket;
                    return (
                      <button
                        key={bucket}
                        type="button"
                        onClick={() => setSelectedDuration(bucket)}
                        className={`px-3.5 py-1.5 text-[12px] font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-[#EAE1DA] border-[#752D43]/40 text-[#51372E]'
                            : 'bg-white border-[#D8CEC4] text-[#72584D] hover:text-[#51372E]'
                        }`}
                      >
                        {bucket}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="library-teacher-filter" className="text-[13px] text-[#72584D]">
                    Master:
                  </label>
                  <select
                    id="library-teacher-filter"
                    value={selectedMasterId}
                    onChange={(e) => setSelectedMasterId(e.target.value)}
                    className="px-4 py-1.5 text-[13px] text-[#51372E] bg-white border border-[#D8CEC4] rounded-full focus:border-[#752D43] focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Vanvita Masters</option>
                    {MASTER_TEACHERS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.baseCity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* Visual Practice Guide Cards Grid */}
        {filteredGuides.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-[#D8CEC4] soft-card-shadow p-14 text-center">
            <p className="text-[20px] font-medium text-[#51372E] mb-2">
              No guides match these filters
            </p>
            <p className="text-[14px] text-[#72584D] mb-6">
              Try clearing your search or selecting another practice category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDuration('All');
                setSelectedMasterId('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 text-[13px] font-medium text-[#F2EAE5] bg-[#51372E] rounded-full cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredGuides.map((guide, index) => (
              <RevealOnScroll key={guide.id} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="group h-full bg-white rounded-[2rem] border border-[#D8CEC4] soft-card-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => openGuideModal(guide)}
                      className="relative block w-full aspect-[4/3] overflow-hidden bg-[#EAE1DA] cursor-pointer text-left"
                    >
                      <ResilientImage
                        src={guide.imageUrl}
                        alt={guide.imageAlt}
                        fallbackTitle={guide.title}
                        className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3A251E]/88 via-[#3A251E]/22 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                        <span className="tabular-nums-mono text-[12px] text-[#F2EAE5]/95 font-medium">
                          {guide.durationMinutes} min · {guide.breathRatioLabel}
                        </span>
                        <span className="w-11 h-11 rounded-full bg-[#C4B6A6] text-[#51372E] flex items-center justify-center soft-card-shadow transition-transform duration-200 group-hover:scale-110 shrink-0">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </span>
                      </div>
                    </button>

                    <div className="p-6 pb-5">
                      <p className="text-[12px] text-[#72584D] mb-2">
                        <span>{guide.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{guide.masterName}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{guide.level}</span>
                      </p>

                      <h3 className="text-[21px] font-medium leading-snug text-[#51372E] mb-2.5 group-hover:text-[#752D43] transition-colors">
                        {guide.title}
                      </h3>

                      <p className="text-[14px] leading-[1.65] text-[#72584D]">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`mx-4 mb-4 px-4 py-3 rounded-[1.25rem] flex items-center justify-between gap-3 ${getTintClasses(
                      guide.accentTint
                    )}`}
                  >
                    <button
                      type="button"
                      onClick={() => openGuideModal(guide)}
                      className="text-[13px] font-medium text-[#51372E] hover:text-[#752D43] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Play guided study
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookWithMaster(guide.masterId, guide.title)}
                      className="text-[12px] text-[#72584D] hover:text-[#51372E] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Book 1-on-1 →
                    </button>
                  </div>
                </motion.article>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Guided Video & Breath Cadence Modal */}
      <AnimatePresence>
        {activeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Guided study: ${activeGuide.title}`}
            onClick={closeGuideModal}
            className="fixed inset-0 z-50 bg-[#51372E]/55 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#F2EAE5] rounded-[2.25rem] border border-[#D8CEC4] soft-card-shadow overflow-hidden my-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[500px] bg-[#51372E] overflow-hidden flex flex-col justify-between">
                  <motion.div
                    animate={
                      isPlaying
                        ? { scale: [1.02, 1.09, 1.02] }
                        : { scale: 1.02 }
                    }
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <ResilientImage
                      src={activeGuide.imageUrl}
                      alt={activeGuide.imageAlt}
                      fallbackTitle={activeGuide.title}
                      className="w-full h-full object-cover object-[50%_20%] opacity-90"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#51372E]/90 via-[#51372E]/30 to-[#51372E]/35" />

                  <div className="relative z-10 p-6 flex items-center justify-between gap-4 text-[#F2EAE5]">
                    <div className="flex items-center gap-2 text-[12px] text-[#F2EAE5]/90">
                      <Volume2 className="w-4 h-4 text-[#C4B6A6]" />
                      <span>Guided Visual Study</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums-mono">{activeGuide.durationMinutes} min</span>
                    </div>
                    <button
                      type="button"
                      onClick={closeGuideModal}
                      aria-label="Close guided study player"
                      className="lg:hidden w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center px-6 py-4 text-center">
                    <motion.div
                      animate={{
                        scale: isPlaying ? activeBreathPhase.scale : 1,
                      }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-32 h-32 rounded-full bg-[#C4B6A6]/25 border border-[#C4B6A6]/80 backdrop-blur-md flex items-center justify-center mb-4"
                    >
                      <div className="w-24 h-24 rounded-full bg-[#C4B6A6]/90 text-[#51372E] flex flex-col items-center justify-center px-2">
                        <span className="text-[13px] font-medium leading-tight">
                          {isPlaying ? activeBreathPhase.label : 'Paused'}
                        </span>
                      </div>
                    </motion.div>
                    <p className="text-[15px] text-[#F2EAE5] max-w-md leading-relaxed">
                      “{activeGuide.cues[activeCueIndex]?.instruction}”
                    </p>
                  </div>

                  <div className="relative z-10 p-6 space-y-3">
                    <input
                      type="range"
                      min={0}
                      max={totalDemoSeconds}
                      value={elapsedSeconds}
                      onChange={(e) => setElapsedSeconds(Number(e.target.value))}
                      aria-label="Playback position"
                      className="w-full accent-[#C4B6A6] cursor-pointer"
                    />
                    <div className="flex items-center justify-between gap-4 text-[#F2EAE5]">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsPlaying((prev) => !prev)}
                          className="w-10 h-10 rounded-full bg-[#C4B6A6] text-[#51372E] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                          aria-label={isPlaying ? 'Pause guide' : 'Play guide'}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setElapsedSeconds(0);
                            setIsPlaying(true);
                          }}
                          className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Restart guide"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="tabular-nums-mono text-[12px] text-[#F2EAE5]/85">
                        {formatClock(elapsedSeconds)} / {formatClock(totalDemoSeconds)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-7 flex flex-col justify-between gap-6 max-h-[80vh] overflow-y-auto">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <p className="text-[12px] text-[#72584D]">
                        {activeGuide.category} · Guided by {activeGuide.masterName}
                      </p>
                      <button
                        type="button"
                        onClick={closeGuideModal}
                        aria-label="Close modal"
                        className="hidden lg:inline-flex w-9 h-9 rounded-full hover:bg-[#EAE1DA] text-[#72584D] hover:text-[#51372E] items-center justify-center cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-[26px] font-medium leading-tight text-[#51372E] mb-3">
                      {activeGuide.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-[#72584D] mb-5">
                      {activeGuide.description}
                    </p>

                    <div className="p-4 rounded-2xl bg-[#EAE1DA] mb-6">
                      <span className="block text-[12px] font-medium text-[#51372E] mb-1">
                        Master’s anatomical note
                      </span>
                      <p className="text-[13px] leading-relaxed text-[#72584D]">
                        {activeGuide.anatomicalNote}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-[12px] font-medium text-[#72584D]">Sequence cues</p>
                      {activeGuide.cues.map((cue, idx) => {
                        const isCurrent = idx === activeCueIndex;
                        return (
                          <button
                            key={cue.timestamp}
                            type="button"
                            onClick={() => {
                              setElapsedSeconds(
                                Math.floor((idx / activeGuide.cues.length) * totalDemoSeconds)
                              );
                              setIsPlaying(true);
                            }}
                            className={`w-full text-left p-3 rounded-2xl border transition-colors cursor-pointer ${
                              isCurrent
                                ? 'bg-[#E2D7CF] border-[#752D43]/30'
                                : 'bg-white border-[#D8CEC4] hover:bg-[#EAE1DA]/60'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[12px] text-[#72584D] mb-1">
                              <span className="tabular-nums-mono">{cue.timestamp}</span>
                              <span className="font-medium text-[#51372E]">{cue.phase}</span>
                            </div>
                            <p className="text-[13px] text-[#51372E] leading-snug">
                              {cue.instruction}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const { masterId, title } = activeGuide;
                      closeGuideModal();
                      onBookWithMaster(masterId, title);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-[14px] font-medium text-[#F2EAE5] bg-[#51372E] hover:bg-[#24372B] hover:scale-[1.01] rounded-full transition-all cursor-pointer min-h-[44px]"
                  >
                    <span>Practice 1-on-1 with {activeGuide.masterName.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionEntrance>
  );
}
