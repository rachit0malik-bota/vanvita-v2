import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { MASTER_TEACHERS, RETREAT_RESIDENCIES } from '../data/vanvitaData';
import { RetreatFocus } from '../types/vanvita';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface RetreatExplorerProps {
  externalSelectedRetreatId: string | null;
  onRequestSuiteHold: (retreatId: string, suiteId: string) => void;
}

const FOCUS_FILTERS: Array<'All' | RetreatFocus> = [
  'All',
  'Restoration',
  'Breathwork',
  'Longevity',
];

export function RetreatExplorer({
  externalSelectedRetreatId,
  onRequestSuiteHold,
}: RetreatExplorerProps) {
  const [focusFilter, setFocusFilter] = useState<'All' | RetreatFocus>('All');
  const [activeRetreatId, setActiveRetreatId] = useState<string>(RETREAT_RESIDENCIES[0].id);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(
    RETREAT_RESIDENCIES[0].suites[0].id
  );

  useEffect(() => {
    if (externalSelectedRetreatId) {
      const found = RETREAT_RESIDENCIES.find((r) => r.id === externalSelectedRetreatId);
      if (found) {
        setFocusFilter('All');
        setActiveRetreatId(found.id);
        setActiveDayIndex(0);
        setSelectedSuiteId(found.suites[0].id);
      }
    }
  }, [externalSelectedRetreatId]);

  const filteredRetreats =
    focusFilter === 'All'
      ? RETREAT_RESIDENCIES
      : RETREAT_RESIDENCIES.filter((r) => r.focus === focusFilter);

  const activeRetreat =
    filteredRetreats.find((r) => r.id === activeRetreatId) ||
    filteredRetreats[0] ||
    RETREAT_RESIDENCIES[0];

  const handleSelectRetreat = (retreatId: string) => {
    const next = RETREAT_RESIDENCIES.find((r) => r.id === retreatId);
    if (!next) return;
    setActiveRetreatId(next.id);
    setActiveDayIndex(0);
    setSelectedSuiteId(next.suites[0].id);
  };

  const handleFilterChange = (nextFilter: 'All' | RetreatFocus) => {
    setFocusFilter(nextFilter);
    const matching =
      nextFilter === 'All'
        ? RETREAT_RESIDENCIES
        : RETREAT_RESIDENCIES.filter((r) => r.focus === nextFilter);
    if (matching.length > 0 && !matching.some((r) => r.id === activeRetreatId)) {
      setActiveRetreatId(matching[0].id);
      setActiveDayIndex(0);
      setSelectedSuiteId(matching[0].suites[0].id);
    }
  };

  const activeDay = activeRetreat.itinerary[activeDayIndex] || activeRetreat.itinerary[0];
  const leadMaster = MASTER_TEACHERS.find((m) => m.id === activeRetreat.leadMasterId);
  const activeSuite =
    activeRetreat.suites.find((s) => s.id === selectedSuiteId) || activeRetreat.suites[0];

  return (
    <SectionEntrance id="retreats" immediate className="relative py-16 lg:py-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[440px] h-[440px] rounded-full bg-[#DCEFD9]/75 blur-[100px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 w-[420px] h-[420px] rounded-full bg-[#EEF5D7]/70 blur-[100px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-[14px] font-medium text-[#526458] mb-3">
                Seasonal Architectural Residencies
              </p>
              <h1 className="text-[40px] md:text-[56px] font-normal leading-[1.06] tracking-[-0.025em] text-[#18241C]">
                Intimate retreats limited to ten{' '}
                <span className="font-cursive text-[54px] md:text-[72px] text-[#3E6F4E] font-normal leading-none">
                  unhurried
                </span>{' '}
                guests.
              </h1>
            </div>

            <div
              role="tablist"
              aria-label="Filter retreats by focus"
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#DDE7DC] rounded-full soft-card-shadow self-start lg:self-auto"
            >
              {FOCUS_FILTERS.map((filter) => {
                const isSelected = focusFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleFilterChange(filter)}
                    className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[38px] ${
                      isSelected
                        ? 'text-[#F7FAF6]'
                        : 'text-[#526458] hover:text-[#18241C]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="retreatFocusPill"
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-[#18241C] rounded-full"
                      />
                    )}
                    <span className="relative z-10">
                      {filter === 'All' ? 'All Residencies' : filter}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {filteredRetreats.map((retreat, idx) => {
            const isSelected = retreat.id === activeRetreat.id;
            const totalRemaining = retreat.suites.reduce((sum, s) => sum + s.remaining, 0);
            return (
              <RevealOnScroll key={retreat.id} delay={idx * 0.05}>
                <button
                  type="button"
                  onClick={() => handleSelectRetreat(retreat.id)}
                  className={`group w-full h-full text-left rounded-[2rem] border overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#3E6F4E] soft-card-shadow -translate-y-1'
                      : 'bg-white/85 border-[#DDE7DC] soft-card-shadow hover:-translate-y-0.5 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#EBF3EA]">
                      <ResilientImage
                        src={retreat.imageUrl}
                        alt={retreat.imageAlt}
                        fallbackTitle={retreat.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 pb-3">
                      <p className="text-[12px] text-[#526458] mb-1">
                        {retreat.country} · {retreat.season}
                      </p>
                      <h2 className="text-[18px] font-medium leading-snug text-[#18241C]">
                        {retreat.title}
                      </h2>
                    </div>
                  </div>
                  <div className="px-5 py-3.5 border-t border-[#EBF3EA] flex items-center justify-between text-[12px] text-[#526458]">
                    <span>{retreat.focus}</span>
                    <span className="tabular-nums-mono text-[#3E6F4E] font-medium">
                      {totalRemaining} suites left
                    </span>
                  </div>
                </button>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll delay={0.1}>
          <motion.div
            key={activeRetreat.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[2.5rem] border border-[#DDE7DC] soft-card-shadow overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 min-h-[300px] lg:min-h-[480px] bg-[#EBF3EA]">
                <ResilientImage
                  src={activeRetreat.imageUrl}
                  alt={activeRetreat.imageAlt}
                  fallbackTitle={activeRetreat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-7 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-[13px] text-[#526458] mb-3">
                    {activeRetreat.location} ·{' '}
                    <span className="tabular-nums-mono">{activeRetreat.dates}</span> ·{' '}
                    <span className="tabular-nums-mono">
                      {activeRetreat.durationNights} Nights / Max {activeRetreat.maxGuests} Guests
                    </span>
                  </p>

                  <h3 className="text-[30px] md:text-[36px] font-medium leading-[1.12] text-[#18241C] mb-4">
                    {activeRetreat.title}
                  </h3>

                  <p className="text-[15px] leading-[1.7] text-[#526458] mb-5">
                    {activeRetreat.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-[1.5rem] bg-[#F7FAF6] border border-[#DDE7DC] text-[13px]">
                    <div>
                      <span className="block text-[#526458] mb-1">Architecture & Setting</span>
                      <p className="text-[#18241C] leading-relaxed">
                        {activeRetreat.architecturalNote}
                      </p>
                    </div>
                    <div>
                      <span className="block text-[#526458] mb-1">Lead Faculty</span>
                      <p className="text-[#18241C] font-medium">{leadMaster?.name}</p>
                      <p className="text-[#526458] mt-0.5">{leadMaster?.lineage}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EBF3EA]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="text-[14px] font-medium text-[#18241C]">
                      Daily Residency Itinerary
                    </span>
                    <div
                      role="tablist"
                      aria-label="Select itinerary day"
                      className="flex flex-wrap items-center gap-1.5"
                    >
                      {activeRetreat.itinerary.map((day, index) => {
                        const isDayActive = index === activeDayIndex;
                        return (
                          <button
                            key={day.dayNumber}
                            type="button"
                            role="tab"
                            aria-selected={isDayActive}
                            onClick={() => setActiveDayIndex(index)}
                            className={`relative tabular-nums-mono px-3.5 py-1.5 text-[12px] rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              isDayActive
                                ? 'text-[#F7FAF6]'
                                : 'bg-[#EBF3EA] text-[#526458] hover:text-[#18241C]'
                            }`}
                          >
                            {isDayActive && (
                              <motion.span
                                layoutId="retreatDayPill"
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-[#18241C] rounded-full"
                              />
                            )}
                            <span className="relative z-10">{day.dayNumber}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <motion.div
                    key={`${activeRetreat.id}-${activeDay.dayNumber}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#EBF3EA]/70 rounded-[1.5rem] p-5"
                  >
                    <p className="text-[18px] font-medium text-[#18241C] mb-4">
                      {activeDay.dayNumber} — {activeDay.title}
                    </p>
                    <div className="space-y-3 text-[13px]">
                      <div className="grid grid-cols-12 gap-3 items-baseline">
                        <span className="col-span-3 sm:col-span-2 tabular-nums-mono text-[#526458]">
                          {activeDay.morning.time}
                        </span>
                        <span className="col-span-9 sm:col-span-10 text-[#18241C] leading-relaxed">
                          {activeDay.morning.activity}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-3 items-baseline pt-2.5 border-t border-[#18241C]/8">
                        <span className="col-span-3 sm:col-span-2 tabular-nums-mono text-[#526458]">
                          {activeDay.midday.time}
                        </span>
                        <span className="col-span-9 sm:col-span-10 text-[#18241C] leading-relaxed">
                          {activeDay.midday.activity}
                        </span>
                      </div>
                      <div className="grid grid-cols-12 gap-3 items-baseline pt-2.5 border-t border-[#18241C]/8">
                        <span className="col-span-3 sm:col-span-2 tabular-nums-mono text-[#526458]">
                          {activeDay.evening.time}
                        </span>
                        <span className="col-span-9 sm:col-span-10 text-[#18241C] leading-relaxed">
                          {activeDay.evening.activity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#EBF3EA] bg-[#F7FAF6] p-7 md:p-9">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeRetreat.suites.map((suite) => {
                    const isSelected = suite.id === activeSuite.id;
                    return (
                      <button
                        key={suite.id}
                        type="button"
                        onClick={() => setSelectedSuiteId(suite.id)}
                        className={`text-left p-5 rounded-[1.5rem] border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#3E6F4E] soft-card-shadow'
                            : 'bg-white/70 border-[#DDE7DC] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-[#18241C] bg-[#18241C] text-white'
                                  : 'border-[#8FA395]'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5" />}
                            </span>
                            <span className="font-medium text-[15px] text-[#18241C]">
                              {suite.name}
                            </span>
                          </div>
                          <span className="tabular-nums-mono text-[15px] font-medium text-[#18241C] whitespace-nowrap">
                            ${suite.priceUsd.toLocaleString()}
                          </span>
                        </div>

                        <p className="text-[12px] text-[#526458] mb-1.5 pl-6">
                          <span className="tabular-nums-mono">{suite.areaSqm} m²</span> ·{' '}
                          {suite.occupancy} ·{' '}
                          <span className="tabular-nums-mono text-[#3E6F4E] font-medium">
                            {suite.remaining} available
                          </span>
                        </p>
                        <p className="text-[12px] text-[#526458] pl-6 leading-relaxed">
                          {suite.highlights}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="lg:w-[280px] shrink-0 flex flex-col justify-between gap-3 lg:pl-4">
                  <div className="text-[12px] text-[#526458]">
                    <span className="block text-[#18241C] font-medium mb-0.5">
                      Selected: {activeSuite.name}
                    </span>
                    <span>Includes private transfers, daily meals, and 1:1 sessions.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRequestSuiteHold(activeRetreat.id, activeSuite.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14px] font-medium text-[#18241C] bg-[#B7D7BD] hover:bg-[#A3CBA9] hover:scale-[1.02] rounded-full soft-card-shadow transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <span>Request Suite Hold</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
