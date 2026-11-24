import { useMemo, useState } from 'react';
import { ArrowRight, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { GLOBAL_TIMEZONES, LIVE_SCHEDULE_CLASSES } from '../data/vanvitaData';
import { LiveScheduleClass } from '../types/vanvita';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface ScheduleSectionProps {
  onBookClass: (classItem: LiveScheduleClass, timezoneLabel: string) => void;
}

const MODALITIES: Array<'All' | LiveScheduleClass['modality']> = [
  'All',
  'Yoga',
  'Meditation',
  'Breathwork',
  'HerWAY Pilot',
];

function formatClassTime(utcHour: number, utcMinute: number, iana: string): string {
  try {
    const sample = new Date(Date.UTC(2026, 9, 12, utcHour, utcMinute, 0));
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: iana,
      timeZoneName: 'short',
    }).format(sample);
  } catch {
    return `${String(utcHour).padStart(2, '0')}:${String(utcMinute).padStart(2, '0')} UTC`;
  }
}

export function ScheduleSection({ onBookClass }: ScheduleSectionProps) {
  const euUsZones = useMemo(() => GLOBAL_TIMEZONES.slice(0, 5), []);
  const [selectedTz, setSelectedTz] = useState(euUsZones[0]);
  const [modalityFilter, setModalityFilter] = useState<'All' | LiveScheduleClass['modality']>('All');

  const filteredClasses = useMemo(() => {
    if (modalityFilter === 'All') return LIVE_SCHEDULE_CLASSES;
    return LIVE_SCHEDULE_CLASSES.filter((c) => c.modality === modalityFilter);
  }, [modalityFilter]);

  return (
    <SectionEntrance
      id="schedule"
      immediate
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/4 w-[440px] h-[440px] rounded-full bg-[#752D43]/10 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full bg-[#F5EAE8]/75 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBF0F2] border border-[#752D43]/20 text-[#752D43] tabular-nums-mono text-[10.5px] uppercase tracking-[0.15em] mb-4">
                Live Online Schedule · Europe & USA
              </span>
              <h1 className="text-[38px] md:text-[54px] font-normal leading-[1.06] tracking-[-0.025em] text-[#51372E]">
                Sessions timed effortlessly for your{' '}
                <span className="font-cursive text-[52px] md:text-[70px] text-[#752D43] font-normal leading-none">
                  day.
                </span>
              </h1>
            </div>

            <p className="text-[15px] leading-[1.68] text-[#72584D] max-w-md">
              Switch between European and US time zones below to view live group yoga, meditation,
              breathwork, and supervised HerWAY pilot sessions in your local clock.
            </p>
          </div>
        </RevealOnScroll>

        {/* Timezone & Modality Controls */}
        <RevealOnScroll delay={0.08}>
          <div className="bg-white rounded-[2rem] border border-[#D8CEC4] soft-card-shadow p-5 sm:p-6 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div>
              <p className="text-[12px] font-medium text-[#72584D] flex items-center gap-1.5 mb-2.5">
                <Globe className="w-3.5 h-3.5 text-[#752D43]" />
                <span>View Times In:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {euUsZones.map((tz) => {
                  const isActive = tz.iana === selectedTz.iana;
                  return (
                    <button
                      key={tz.id}
                      type="button"
                      onClick={() => setSelectedTz(tz)}
                      className={`px-3.5 py-2 text-[12.5px] font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#51372E] border-[#51372E] text-[#F2EAE5]'
                          : 'bg-[#F2EAE5] border-[#D8CEC4] text-[#72584D] hover:text-[#51372E]'
                      }`}
                    >
                      {tz.city}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:border-l lg:border-[#EAE1DA] lg:pl-6">
              <p className="text-[12px] font-medium text-[#72584D] mb-2.5">Filter Modality:</p>
              <div className="inline-flex flex-wrap gap-1.5 p-1 bg-[#EAE1DA] rounded-full">
                {MODALITIES.map((mod) => {
                  const isActive = mod === modalityFilter;
                  return (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setModalityFilter(mod)}
                      className={`relative px-3.5 py-1.5 text-[12px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        isActive ? 'text-[#F2EAE5]' : 'text-[#72584D] hover:text-[#51372E]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="scheduleModalityPill"
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 bg-[#752D43] rounded-full"
                        />
                      )}
                      <span className="relative z-10">{mod}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Timetable Cards */}
        <div className="space-y-4">
          {filteredClasses.map((cls, idx) => {
            const localTime = formatClassTime(cls.utcHour, cls.utcMinute, selectedTz.iana);
            const isHerWay = cls.modality === 'HerWAY Pilot';
            return (
              <RevealOnScroll key={cls.id} delay={idx * 0.04}>
                <motion.article
                  whileHover={{ scale: 1.015, y: -3 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-[1.75rem] border border-[#D8CEC4] hover:border-[#752D43]/40 soft-card-shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div
                      className={`px-4 py-3 rounded-2xl min-w-[155px] shrink-0 ${
                        isHerWay ? 'bg-[#FBF0F2]' : 'bg-[#EAE1DA]'
                      }`}
                    >
                      <p className="tabular-nums-mono text-[11px] uppercase tracking-[0.12em] text-[#72584D]">
                        {cls.dayOfWeek} · {cls.durationMinutes} min
                      </p>
                      <p className="tabular-nums-mono text-[16px] font-medium text-[#51372E] mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#752D43] shrink-0" />
                        <span>{localTime}</span>
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[12px] mb-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-medium ${
                            isHerWay
                              ? 'bg-[#FBF0F2] text-[#752D43]'
                              : 'bg-[#EAE1DA] text-[#752D43]'
                          }`}
                        >
                          {cls.modality}
                        </span>
                        <span className="text-[#72584D]">{cls.windowLabel}</span>
                        <span aria-hidden="true" className="text-[#D8CEC4]">
                          ·
                        </span>
                        <span className="text-[#72584D]">{cls.level}</span>
                      </div>

                      <h2 className="text-[20px] font-medium text-[#51372E] leading-snug">
                        {cls.title}
                      </h2>
                      <p className="text-[13px] text-[#72584D] mt-0.5">
                        Guided live by <span className="text-[#51372E]">{cls.expertName}</span>
                      </p>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onBookClass(cls, `${localTime} (${selectedTz.city})`)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[13px] font-medium text-[#F2EAE5] bg-[#51372E] hover:bg-[#752D43] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <span>Reserve Free Intro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </SectionEntrance>
  );
}
