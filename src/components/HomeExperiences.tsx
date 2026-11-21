import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Plus, Wind } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ABOUT_MALA_HANDS_IMAGE,
  COACHING_DISCIPLINES,
  FAQ_ITEMS,
  GROUNDING_HANDS_IMAGE,
  LAVENDER_PAVILION_IMAGE,
  LIBRARY_NADI_IMAGE,
  ONLINE_PROGRAMMES,
} from '../data/vanvitaData';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface YogaServicesOverviewProps {
  onExploreOnlineWellness: () => void;
  onExploreSchedule: () => void;
  onExploreHerWay: () => void;
  onExploreBusiness: () => void;
  onBookFreeIntro: (context?: string) => void;
  onSelectDiscipline: (disciplineId: string, masterId: string) => void;
}

const EXPAND_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 22,
};

export function YogaServicesOverview({
  onExploreOnlineWellness,
  onExploreSchedule,
  onExploreHerWay,
  onExploreBusiness,
  onBookFreeIntro,
  onSelectDiscipline,
}: YogaServicesOverviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [breathRunning, setBreathRunning] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!breathRunning) return;
    const id = window.setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => window.clearInterval(id);
  }, [breathRunning]);

  const breathPhase = (() => {
    if (!breathRunning) return { label: 'Try 4-4-6 Morning Breath', scale: 1 };
    const pos = tick % 14;
    if (pos < 4) return { label: `Inhale slowly · ${4 - pos}s`, scale: 1.12 };
    if (pos < 8) return { label: `Hold softly · ${8 - pos}s`, scale: 1.12 };
    return { label: `Exhale fully · ${14 - pos}s`, scale: 0.94 };
  })();

  const scrollStrip = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? 360 : -360,
      behavior: 'smooth',
    });
  };

  return (
    <SectionEntrance id="services" className="relative py-16 lg:py-24 overflow-hidden">
      {/* Faded dark burnt-orange & eucalyptus ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-16 w-[420px] h-[420px] rounded-full bg-[#B84D1D]/10 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 w-[440px] h-[440px] rounded-full bg-[#DCEFD9]/70 blur-[100px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* 1. Online Wellness Offerings Horizontal Gallery with Subtle Expand Hover */}
        <RevealOnScroll>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-[13.5px] font-medium text-[#963B14] mb-3">
                Online Wellness · Europe &amp; USA
              </p>
              <h2 className="text-[36px] md:text-[48px] font-normal leading-[1.08] tracking-[-0.025em] text-[#18241C]">
                Four ways to practise live or at your own{' '}
                <span className="font-cursive text-[48px] md:text-[64px] text-[#B84D1D] font-normal leading-none">
                  pace.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollStrip('left')}
                aria-label="Scroll services left"
                className="w-10 h-10 rounded-full bg-white border border-[#DDE7DC] text-[#18241C] hover:border-[#B84D1D]/45 hover:bg-[#F8EDE6] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollStrip('right')}
                aria-label="Scroll services right"
                className="w-10 h-10 rounded-full bg-white border border-[#DDE7DC] text-[#18241C] hover:border-[#B84D1D]/45 hover:bg-[#F8EDE6] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-4 -mx-6 px-6 snap-x snap-mandatory"
        >
          {COACHING_DISCIPLINES.map((discipline) => {
            const tintBg =
              discipline.tint === 'sage'
                ? 'bg-[#EBF3EA]'
                : discipline.tint === 'lavender'
                  ? 'bg-[#F8EDE6]'
                  : 'bg-[#F1F6E7]';

            return (
              <motion.article
                key={discipline.id}
                whileHover={{ scale: 1.032, y: -6 }}
                whileTap={{ scale: 0.99 }}
                transition={EXPAND_SPRING}
                onClick={() =>
                  onSelectDiscipline(discipline.id, discipline.recommendedMasterId)
                }
                className="group shrink-0 snap-start w-[310px] sm:w-[340px] bg-white rounded-[2.25rem] border border-[#DDE7DC] hover:border-[#B84D1D]/45 soft-card-shadow hover:ember-card-shadow overflow-hidden flex flex-col justify-between transition-[border-color,box-shadow] duration-300 cursor-pointer will-change-transform"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EBF3EA]">
                    <ResilientImage
                      src={discipline.imageUrl}
                      alt={discipline.imageAlt}
                      fallbackTitle={discipline.title}
                      className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[12px] text-[#526458] mb-2">
                      <span className="tabular-nums-mono text-[#B84D1D] font-medium">
                        {discipline.index}
                      </span>{' '}
                      · {discipline.cadence}
                    </p>
                    <h3 className="text-[21px] font-medium leading-snug text-[#18241C] group-hover:text-[#B84D1D] transition-colors mb-2.5">
                      {discipline.title}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-[#526458]">
                      {discipline.summary}
                    </p>
                  </div>
                </div>

                <div
                  className={`mx-4 mb-4 px-4 py-3 rounded-[1.25rem] flex items-center justify-between gap-2 ${tintBg}`}
                >
                  <span className="tabular-nums-mono text-[11.5px] text-[#18241C] font-medium">
                    {discipline.retainerRange}
                  </span>
                  <span className="text-[13px] font-medium text-[#B84D1D] whitespace-nowrap">
                    Explore →
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 2. Programmes & Challenges Grid (7/21/30-Day & 4–12 Weeks) with Expand Hover */}
        <RevealOnScroll delay={0.1} className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[14px] font-medium text-[#526458] mb-1.5">
                Programmes & Guided Challenges
              </p>
              <h3 className="text-[30px] md:text-[38px] font-normal leading-[1.1] tracking-[-0.025em] text-[#18241C]">
                7, 21 & 30-day resets—plus 4 to 12 week pathways.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onBookFreeIntro('Free Intro Session — Programme Guidance')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[#F7FAF6] bg-[#B84D1D] hover:bg-[#963B14] rounded-full transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <span>Start With Free Intro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ONLINE_PROGRAMMES.map((prog) => {
              const badgeStyle =
                prog.tint === 'ember'
                  ? 'bg-[#F8EDE6] text-[#B84D1D] border-[#B84D1D]/20'
                  : prog.tint === 'eucalyptus'
                    ? 'bg-[#EBF3EA] text-[#3E6F4E] border-[#3E6F4E]/20'
                    : 'bg-[#F1F6E7] text-[#3E6F4E] border-[#3E6F4E]/20';
              return (
                <motion.button
                  key={prog.id}
                  type="button"
                  whileHover={{ scale: 1.032, y: -5 }}
                  whileTap={{ scale: 0.99 }}
                  transition={EXPAND_SPRING}
                  onClick={() =>
                    onBookFreeIntro(`Programme Inquiry: ${prog.durationTag} — ${prog.title}`)
                  }
                  className="group text-left bg-white rounded-[2rem] border border-[#DDE7DC] hover:border-[#B84D1D]/45 soft-card-shadow hover:ember-card-shadow p-6 flex flex-col justify-between gap-4 transition-[border-color,box-shadow] duration-300 cursor-pointer will-change-transform"
                >
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full border tabular-nums-mono text-[10.5px] uppercase tracking-[0.12em] font-medium mb-4 ${badgeStyle}`}
                    >
                      {prog.durationTag}
                    </span>
                    <h4 className="text-[18px] font-medium text-[#18241C] group-hover:text-[#B84D1D] transition-colors leading-snug mb-2">
                      {prog.title}
                    </h4>
                    <p className="text-[13px] leading-[1.65] text-[#526458]">{prog.summary}</p>
                  </div>
                  <div className="pt-3 border-t border-[#EBF3EA] flex items-center justify-between gap-2 text-[12px]">
                    <span className="text-[#526458] truncate">{prog.format}</span>
                    <span className="font-medium text-[#B84D1D] shrink-0">Join →</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* 3. Architectural Method Showcase + Breath Preview */}
        <RevealOnScroll delay={0.12} className="mt-20">
          <div className="bg-white rounded-[2.75rem] border border-[#DDE7DC] soft-card-shadow overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 p-8 sm:p-11 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-[14px] font-medium text-[#B84D1D] mb-3">
                    Your Wellness, Guided
                  </p>
                  <h2 className="text-[34px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.025em] text-[#18241C] mb-5">
                    Practical daily support across Europe, the USA, and{' '}
                    <span className="font-cursive text-[48px] md:text-[62px] text-[#3E6F4E] font-normal leading-none">
                      India.
                    </span>
                  </h2>
                  <p className="text-[15px] leading-[1.7] text-[#526458] mb-7">
                    Whether you join a 30-minute live breathwork class before your workday, book a
                    1-on-1 coaching session, enrol in our HerWAY postpartum pilot, or host a
                    corporate retreat in India through our licensed partners, every step feels
                    personal and achievable.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.035, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={EXPAND_SPRING}
                      onClick={onExploreSchedule}
                      className="text-left p-4 rounded-2xl bg-[#EBF3EA] hover:bg-[#DCECD9] border border-transparent hover:border-[#3E6F4E]/30 transition-colors cursor-pointer"
                    >
                      <span className="block text-[14px] font-medium text-[#18241C] mb-1">
                        EU & US Schedule
                      </span>
                      <span className="text-[12px] text-[#526458] leading-relaxed block">
                        Live yoga, meditation & breathwork times
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.035, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={EXPAND_SPRING}
                      onClick={onExploreHerWay}
                      className="text-left p-4 rounded-2xl bg-[#F8EDE6] hover:bg-[#F2DFD3] border border-transparent hover:border-[#B84D1D]/30 transition-colors cursor-pointer"
                    >
                      <span className="block text-[14px] font-medium text-[#18241C] mb-1">
                        HerWAY Pilot
                      </span>
                      <span className="text-[12px] text-[#526458] leading-relaxed block">
                        Supervised postpartum wellbeing pathway
                      </span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.035, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      transition={EXPAND_SPRING}
                      onClick={onExploreBusiness}
                      className="text-left p-4 rounded-2xl bg-[#F1F6E7] hover:bg-[#E4EED5] border border-transparent hover:border-[#3E6F4E]/30 transition-colors cursor-pointer"
                    >
                      <span className="block text-[14px] font-medium text-[#18241C] mb-1">
                        Corporate & India
                      </span>
                      <span className="text-[12px] text-[#526458] leading-relaxed block">
                        Burnout pilots & licensed India retreats
                      </span>
                    </motion.button>
                  </div>
                </div>

                {/* Subtle Interactive Pranayama Breathwork Bar */}
                <div className="pt-6 border-t border-[#EBF3EA] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: breathPhase.scale }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                      className="w-11 h-11 rounded-full bg-[#F8EDE6] border border-[#B84D1D]/30 text-[#B84D1D] flex items-center justify-center shrink-0"
                    >
                      <Wind className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <p className="text-[13px] font-medium text-[#18241C]">
                        {breathPhase.label}
                      </p>
                      <p className="text-[12px] text-[#526458]">
                        Gentle guided breath cadence preview
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTick(0);
                        setBreathRunning((prev) => !prev);
                      }}
                      className="px-5 py-2.5 text-[13px] font-medium text-[#18241C] bg-[#EBF3EA] hover:bg-[#B7D7BD] rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {breathRunning ? 'Pause Breath' : 'Begin Breath'}
                    </button>
                    <button
                      type="button"
                      onClick={onExploreOnlineWellness}
                      className="px-4 py-2.5 text-[13px] font-medium text-[#B84D1D] hover:text-[#963B14] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Full Library →
                    </button>
                  </div>
                </div>
              </div>

              {/* Right 2x2 Visual Yoga Photography Collage */}
              <div className="lg:col-span-6 p-4 sm:p-5 bg-[#F7FAF6] grid grid-cols-2 gap-4">
                <div className="rounded-[1.75rem] overflow-hidden min-h-[200px] bg-[#EBF3EA]">
                  <ResilientImage
                    src={LIBRARY_NADI_IMAGE}
                    alt="Eyes-closed breathwork and meditation beside bronze singing bowls"
                    className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-[1.75rem] overflow-hidden min-h-[200px] bg-[#F1F6E7]">
                  <ResilientImage
                    src={GROUNDING_HANDS_IMAGE}
                    alt="Hands grounding calmly on a woven rug beside bronze singing bowls"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-[1.75rem] overflow-hidden min-h-[200px] bg-[#E1ECE0]">
                  <ResilientImage
                    src={ABOUT_MALA_HANDS_IMAGE}
                    alt="Mindful clasped hands with wooden mala beads and sage embroidered shawl"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-[1.75rem] overflow-hidden min-h-[200px] bg-[#F8EDE6]">
                  <ResilientImage
                    src={LAVENDER_PAVILION_IMAGE}
                    alt="Lavender wreath and woven natural sanctuary accents on timber pavilion wall"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}

export function InteractiveFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <SectionEntrance id="faq" className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <p className="text-[13.5px] font-medium text-[#963B14] mb-3">
              Questions &amp; Practical Details
            </p>
            <h2 className="text-[34px] md:text-[46px] font-normal leading-[1.1] tracking-[-0.025em] text-[#18241C]">
              Everything you need to begin{' '}
              <span className="font-cursive text-[46px] md:text-[62px] text-[#B84D1D] font-normal leading-none">
                calmly.
              </span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <RevealOnScroll key={item.id} delay={idx * 0.05}>
                <div
                  className={`bg-white rounded-2xl border soft-card-shadow overflow-hidden transition-colors ${
                    isOpen ? 'border-[#B84D1D]/35' : 'border-[#DDE7DC]'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full p-6 flex items-center justify-between gap-6 text-left cursor-pointer"
                  >
                    <span className="text-[16px] md:text-[17px] font-medium text-[#18241C] leading-snug">
                      {item.question}
                    </span>
                    <Plus
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-[#B84D1D]' : 'rotate-0 text-[#526458]'
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-[1.7] text-[#526458]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </SectionEntrance>
  );
}

