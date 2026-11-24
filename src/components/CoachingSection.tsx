import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { COACHING_DISCIPLINES, MASTER_TEACHERS } from '../data/vanvitaData';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface CoachingSectionProps {
  onSelectDiscipline: (disciplineId: string, masterId: string) => void;
  onSelectMaster: (masterId: string) => void;
}

export function CoachingSection({
  onSelectDiscipline,
  onSelectMaster,
}: CoachingSectionProps) {
  const [selectedId, setSelectedId] = useState<string>(COACHING_DISCIPLINES[0].id);

  const activeDiscipline =
    COACHING_DISCIPLINES.find((item) => item.id === selectedId) || COACHING_DISCIPLINES[0];

  const getTintBg = (tint: 'sage' | 'lavender' | 'blush') => {
    if (tint === 'sage') return 'bg-[#EAE1DA]';
    if (tint === 'lavender') return 'bg-[#FBF0F2]';
    return 'bg-[#F9F3EE]';
  };

  return (
    <SectionEntrance id="experts" immediate className="relative py-16 lg:py-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-0 w-[440px] h-[440px] rounded-full bg-[#752D43]/11 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-0 w-[420px] h-[420px] rounded-full bg-[#EFE6DF]/75 blur-[100px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="max-w-3xl mb-14">
            <p className="text-[14px] font-medium text-[#5A1E31] mb-3">
              Our Experts &amp; One-to-One Coaching
            </p>
            <h1 className="text-[42px] md:text-[58px] font-normal leading-[1.06] tracking-[-0.025em] text-[#51372E] mb-5">
              Personal guidance shaped around your{' '}
              <span className="font-cursive text-[56px] md:text-[74px] text-[#752D43] font-normal leading-none">
                rhythm.
              </span>
            </h1>
            <p className="text-[16px] leading-[1.7] text-[#72584D] max-w-2xl">
              Meet the senior teachers leading VANVITA live sessions, one-to-one coaching,
              corporate workshops, and our supervised HerWAY pathway across Europe and USA hours.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 space-y-3.5">
            {COACHING_DISCIPLINES.map((discipline, idx) => {
              const isActive = discipline.id === activeDiscipline.id;
              return (
                <RevealOnScroll key={discipline.id} delay={idx * 0.05}>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    onClick={() => setSelectedId(discipline.id)}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#752D43]/45 ember-card-shadow'
                        : 'bg-white/75 border-[#D8CEC4] hover:bg-white hover:border-[#752D43]/25'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h2 className="text-[21px] font-medium leading-snug text-[#51372E]">
                        <span className="tabular-nums-mono text-[13px] text-[#752D43] mr-2.5">
                          {discipline.index}.
                        </span>
                        {discipline.title}
                      </h2>
                      <span className="tabular-nums-mono text-[12px] text-[#72584D] whitespace-nowrap shrink-0">
                        {discipline.retainerRange}
                      </span>
                    </div>
                    <p className="text-[14px] leading-[1.65] text-[#72584D]">
                      {discipline.summary}
                    </p>
                  </motion.button>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll delay={0.12} className="lg:col-span-6">
            <div className="h-full bg-white rounded-[2.5rem] border border-[#D8CEC4] ember-card-shadow overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#EAE1DA]">
                <ResilientImage
                  src={activeDiscipline.imageUrl}
                  alt={activeDiscipline.imageAlt}
                  fallbackTitle={activeDiscipline.title}
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>

              <div className="p-7 md:p-9 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-[13px] text-[#5A1E31] font-medium mb-3">
                    <span className="tabular-nums-mono">{activeDiscipline.index}</span> ·{' '}
                    {activeDiscipline.cadence} · {activeDiscipline.sessionFormat}
                  </p>

                  <h3 className="text-[28px] font-medium leading-tight text-[#51372E] mb-3">
                    {activeDiscipline.title}
                  </h3>

                  <p className="text-[15px] leading-[1.7] text-[#72584D] mb-6">
                    {activeDiscipline.methodology}
                  </p>

                  <div
                    className={`p-5 rounded-[1.5rem] grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] ${getTintBg(
                      activeDiscipline.tint
                    )}`}
                  >
                    <div>
                      <span className="block text-[#72584D] mb-1">Ideal for</span>
                      <span className="text-[#51372E] leading-relaxed block">
                        {activeDiscipline.idealFor}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[#72584D] mb-1">Guideline Fee</span>
                      <span className="tabular-nums-mono text-[#51372E] font-medium block">
                        {activeDiscipline.retainerRange}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAE1DA]">
                  <span className="text-[13px] text-[#72584D]">
                    Begins with a complimentary 20-min intro call
                  </span>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      onSelectDiscipline(
                        activeDiscipline.id,
                        activeDiscipline.recommendedMasterId
                      )
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[#F2EAE5] bg-[#752D43] hover:bg-[#5A1E31] rounded-full ember-card-shadow transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <span>Book Intro for This Track</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* VANVITA Senior Teaching Faculty */}
        <div id="masters" className="mt-24 pt-16 border-t border-[#D8CEC4]">
          <RevealOnScroll>
            <div className="max-w-2xl mb-12">
              <p className="text-[14px] font-medium text-[#5A1E31] mb-2">VANVITA Experts</p>
              <h2 className="text-[34px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.025em] text-[#51372E] mb-4">
                Experienced teachers across Europe, USA &amp; India.
              </h2>
              <p className="text-[15px] leading-[1.7] text-[#72584D]">
                Each teacher blends over a decade of yoga, meditation, and breathwork practice with
                practical everyday coaching—timed thoughtfully for European and American schedules.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {MASTER_TEACHERS.map((master, idx) => (
              <RevealOnScroll key={master.id} delay={idx * 0.07}>
                <motion.article
                  whileHover={{ scale: 1.024, y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full bg-white rounded-[2.25rem] border border-[#D8CEC4] hover:border-[#752D43]/40 soft-card-shadow hover:shadow-[0_20px_40px_-14px_rgba(117,45,67,0.16)] overflow-hidden flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-[#EAE1DA]">
                      <ResilientImage
                        src={master.imageUrl}
                        alt={master.imageAlt}
                        fallbackTitle={master.name}
                        className="w-full h-full object-cover object-[50%_20%]"
                      />
                    </div>
                    <div className="p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                        <h3 className="text-[24px] font-medium text-[#51372E]">{master.name}</h3>
                        <span className="text-[13px] text-[#72584D]">
                          {master.baseCity} ·{' '}
                          <span className="tabular-nums-mono">{master.yearsExperience} yrs</span>
                        </span>
                      </div>

                      <p className="text-[13px] font-medium text-[#5A1E31] mb-4">{master.role}</p>
                      <p className="text-[14px] leading-[1.7] text-[#72584D] mb-5">{master.bio}</p>

                      <div className="space-y-1.5 text-[13px] text-[#72584D] pt-4 border-t border-[#EAE1DA]">
                        <p>
                          <span className="text-[#8A7367]">Background: </span>
                          <span className="text-[#51372E]">{master.lineage}</span>
                        </p>
                        <p>
                          <span className="text-[#8A7367]">Focus: </span>
                          <span className="text-[#51372E]">{master.specialties.join(' · ')}</span>
                        </p>
                        <p>
                          <span className="text-[#8A7367]">Languages: </span>
                          <span className="text-[#51372E]">{master.languages.join(' · ')}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-7 py-5 bg-[#F2EAE5] border-t border-[#EAE1DA] flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[12px] text-[#72584D]">{master.availabilityNote}</span>
                    <button
                      type="button"
                      onClick={() => onSelectMaster(master.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-[#F2EAE5] bg-[#51372E] hover:bg-[#752D43] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Meet {master.name.split(' ')[0]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </SectionEntrance>
  );
}
