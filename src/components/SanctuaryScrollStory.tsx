import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarCheck2, ChevronDown } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  BUSINESS_SANCTUARY_IMAGE,
  DAWN_SANCTUARY_IMAGE,
  HERO_FLYIN_VIDEO,
  HERWAY_SANCTUARY_IMAGE,
  LIBRARY_SOMATIC_IMAGE,
} from '../data/vanvitaData';
import { PageRoute } from '../types/vanvita';
import { ResilientImage } from './ResilientImage';
import { WELLNESS_EASE } from './RevealOnScroll';

interface SanctuaryScrollStoryProps {
  onBookFreeIntro: () => void;
  onNavigate: (page: PageRoute) => void;
  activeInquiryCount: number;
  onOpenInquiries: () => void;
}

const CALM_PILLARS: Array<{
  title: string;
  detail: string;
  target: PageRoute;
}> = [
  {
    title: 'Online Wellness',
    detail: 'Live yoga, breathwork & 1:1 coaching',
    target: 'online-wellness',
  },
  {
    title: 'Guided Programmes',
    detail: '7, 21 & 30-day structured pathways',
    target: 'online-wellness',
  },
  {
    title: 'Corporate & India Retreats',
    detail: 'Burnout pilots & licensed retreats',
    target: 'business',
  },
  {
    title: 'HerWAY Pathway',
    detail: 'Supervised postpartum wellbeing pilot',
    target: 'herway',
  },
];

const PATHWAY_ROWS: Array<{ index: string; label: string; target: PageRoute }> = [
  { index: '01', label: 'Live group yoga, meditation & breathwork', target: 'schedule' },
  { index: '02', label: 'Personal one-to-one wellbeing coaching', target: 'online-wellness' },
  { index: '03', label: '7, 21 & 30-day structured programmes', target: 'online-wellness' },
  { index: '04', label: 'Corporate burnout pilots & retreats in India', target: 'business' },
  { index: '05', label: 'HerWAY supervised postpartum pilot', target: 'herway' },
];

const SOLUTION_CARDS: Array<{
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  target: PageRoute;
}> = [
  {
    eyebrow: 'Online Wellness',
    title: 'Live group classes, 1:1 coaching & programmes',
    body: 'Join live yoga, meditation, and breathwork timed for Europe and the USA, or start with a complimentary intro session.',
    image: LIBRARY_SOMATIC_IMAGE,
    alt: 'Teacher seated in white linen guiding upward somatic breathwork inside an open pavilion',
    target: 'online-wellness',
  },
  {
    eyebrow: 'Corporate Burnout & Retreat',
    title: 'Burnout-prevention pilots & retreats in India',
    body: 'Begin with a focused paid burnout-prevention pilot before scaling into quarterly contracts, workshops, and licensed retreats in India.',
    image: BUSINESS_SANCTUARY_IMAGE,
    alt: 'Hands-on personal yoga alignment guidance in a sunlit open timber pavilion',
    target: 'business',
  },
  {
    eyebrow: 'HerWAY Pathway',
    title: 'Postpartum wellbeing for new mothers',
    body: 'Launching as an intimate, closely supervised pilot centred on gentle breathwork, mindful rest, and unhurried everyday movement.',
    image: HERWAY_SANCTUARY_IMAGE,
    alt: 'Calm seated Baddha Konasana posture in white linen surrounded by soft sheer pavilion curtains',
    target: 'herway',
  },
];

const SOLUTION_STATS = [
  { target: 2, suffix: '', label: 'Live Regions · Europe & USA' },
  { target: 30, suffix: 'd', label: 'Guided Programmes & Challenges' },
  { target: 24, suffix: '+', label: 'Weekly Live Online Sessions' },
  { target: 100, suffix: '%', label: 'Expert-Led Wellbeing Support' },
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function CalmPillarCard({
  card,
  onClick,
}: {
  card: (typeof SOLUTION_CARDS)[number];
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[410px] sm:h-[440px] w-full rounded-[2rem] overflow-hidden bg-[#18241C] text-left text-[#F7FAF6] border border-[#DDE7DC] soft-card-shadow cursor-pointer flex flex-col justify-between p-6 sm:p-7"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ResilientImage
          src={card.image}
          alt={card.alt}
          fallbackTitle={card.title}
          className="w-full h-full object-cover object-[50%_22%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,31,24,0.44) 0%, rgba(20,31,24,0.16) 38%, rgba(20,31,24,0.74) 68%, rgba(16,25,19,0.94) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="text-[12.5px] font-medium text-[#F7FAF6] bg-[#18241C]/62 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          {card.eyebrow}
        </span>
        <span className="w-9 h-9 rounded-full bg-[#B84D1D] text-[#F7FAF6] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>

      <div className="relative z-10">
        <h3 className="text-[23px] sm:text-[25px] font-medium leading-[1.16] tracking-[-0.02em] text-[#F7FAF6] mb-2.5">
          {card.title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[#F7FAF6]/92">{card.body}</p>
      </div>
    </motion.button>
  );
}

function CountUpStat({
  target,
  suffix,
  label,
  trigger,
}: {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let raf = 0;
    const duration = 1350;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / duration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target]);

  return (
    <div className="pt-5">
      <p className="tabular-nums-mono text-[38px] sm:text-[44px] font-medium tracking-[-0.03em] text-[#18241C] leading-none mb-2">
        {val}
        <span className="text-[#B84D1D]">{suffix}</span>
      </p>
      <p className="text-[13.5px] font-medium text-[#3F5246]">{label}</p>
    </div>
  );
}

export function SanctuaryScrollStory({
  onBookFreeIntro,
  onNavigate,
  activeInquiryCount,
  onOpenInquiries,
}: SanctuaryScrollStoryProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const storyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });

  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  // Gentle damped spring for velvety scroll-coupled motion (zero React re-renders)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // Still-to-Video cross-fade: crisp hero still holds at scroll 0, smoothly dissolves into active video
  const videoLayerOpacity = useTransform(smoothProgress, [0, 0.015, 0.055], [0, 0.5, 1]);
  const stillLayerOpacity = useTransform(smoothProgress, [0, 0.025, 0.075], [1, 0.85, 0]);

  // Beat 1: Hero opening (0.00 -> 0.16)
  const heroOpacity = useTransform(smoothProgress, [0, 0.06, 0.16], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0.05, 0.16], [0, -40]);
  const heroPointerEvents = useTransform(smoothProgress, (v) => (v > 0.14 ? 'none' : 'auto'));

  // Soft calm dusk veil for Beats 2–4 readability (0.14 -> 0.24)
  const veilOpacity = useTransform(smoothProgress, [0.13, 0.23], [0, 1]);

  // Beat 2: Purpose & Vision (0.21 -> 0.44)
  const beat2Opacity = useTransform(smoothProgress, [0.2, 0.28, 0.38, 0.45], [0, 1, 1, 0]);
  const beat2Y = useTransform(smoothProgress, [0.2, 0.28, 0.38, 0.45], [24, 0, 0, -24]);

  // Beat 3: Mission & Four Calm Pathways (0.48 -> 0.72)
  const beat3Opacity = useTransform(smoothProgress, [0.48, 0.56, 0.65, 0.72], [0, 1, 1, 0]);
  const beat3Y = useTransform(smoothProgress, [0.48, 0.56, 0.65, 0.72], [24, 0, 0, -20]);
  const beat3PointerEvents = useTransform(smoothProgress, (v) =>
    v >= 0.5 && v <= 0.7 ? 'auto' : 'none'
  );

  // Beat 4: Inside the Timber Pavilion (0.75 -> 1.00)
  const beat4Opacity = useTransform(smoothProgress, [0.75, 0.84, 1], [0, 1, 1]);
  const beat4Y = useTransform(smoothProgress, [0.75, 0.84], [26, 0]);
  const beat4PointerEvents = useTransform(smoothProgress, (v) => (v >= 0.77 ? 'auto' : 'none'));

  // Subtle #F7FAF6 bottom horizon blend as the white Beat 5 panel rises up
  const bottomBlendOpacity = useTransform(smoothProgress, [0.85, 0.98], [0, 1]);

  // Dedicated 60fps rAF video scrubbing loop — zero React state updates during scroll
  useEffect(() => {
    if (prefersReducedMotion || videoError || !videoReady) return;

    let rafId = 0;
    let lastRequestedTime = -1;

    const tick = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
        const progress = clamp01(smoothProgress.get() / 0.94);
        const targetTime = Math.min(video.duration - 0.04, progress * video.duration);

        if (!video.seeking && Math.abs(targetTime - video.currentTime) > 0.018) {
          if (Math.abs(targetTime - lastRequestedTime) > 0.008) {
            lastRequestedTime = targetTime;
            try {
              video.currentTime = targetTime;
            } catch {
              // Ignore transient seek guards
            }
          }
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [prefersReducedMotion, videoError, videoReady, smoothProgress]);

  // Unified calm editorial color-grade matching the #F7FAF6 morning-dew sanctuary palette
  const unifiedColorGradeClass =
    'w-full h-full object-cover object-center brightness-[1.03] contrast-[0.96] saturate-[0.90]';

  return (
    <div className="relative bg-[#F7FAF6]">
      {/* PINNED 60FPS SCROLL-SCRUBBED DRONE FLY-IN STORY */}
      <div
        ref={storyRef}
        className={`relative w-full ${prefersReducedMotion ? 'h-screen' : 'h-[380vh]'}`}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7FAF6]">
          {/* 1. VISUAL STAGE: High-Quality Hero Still -> Cross-Fade -> Fast-Seek Scrubbed Video */}
          <div className="absolute inset-0 bg-[#E6ECE5]">
            {/* Layer A: Active All-Intra Scrubbed Sanctuary Fly-In Video */}
            {!videoError && (
              <motion.div
                style={{
                  opacity: prefersReducedMotion ? 0 : videoReady ? videoLayerOpacity : 0,
                }}
                className="absolute inset-0 will-change-[opacity]"
              >
                <video
                  ref={videoRef}
                  src={HERO_FLYIN_VIDEO}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={(e) => {
                    e.currentTarget.pause();
                    try {
                      e.currentTarget.currentTime = 0.01;
                    } catch {
                      // Ignore seek race
                    }
                    setVideoReady(true);
                  }}
                  onError={() => setVideoError(true)}
                  className={`${unifiedColorGradeClass} transform-gpu`}
                  aria-label="Aerial approach gliding smoothly over misty pines toward the sunlit wooden VANVITA yoga pavilion"
                />
              </motion.div>
            )}

            {/* Layer B: Exact High-Quality Hero Still Image (cross-fades cleanly out as scroll begins) */}
            <motion.div
              style={{
                opacity: prefersReducedMotion || videoError || !videoReady ? 1 : stillLayerOpacity,
              }}
              className="absolute inset-0 pointer-events-none will-change-[opacity]"
            >
              <img
                src={DAWN_SANCTUARY_IMAGE}
                alt="Aerial morning view of the VANVITA Wellbeing timber yoga sanctuary nestled in misty pine hills"
                fetchPriority="high"
                decoding="sync"
                className={unifiedColorGradeClass}
              />
            </motion.div>

            {/* Subtle #F7FAF6 atmospheric color-harmony wash (zero noise/grain) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[#F7FAF6]/10"
            />

            {/* Beat 1 Top-to-Bottom Calm #F7FAF6 Sky Blend for crisp dark-pine headline readability */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: prefersReducedMotion ? 1 : heroOpacity }}
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="w-full h-full"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(247,250,246,0.95) 0%, rgba(247,250,246,0.78) 32%, rgba(247,250,246,0.16) 58%, rgba(20,31,24,0.56) 100%)',
                }}
              />
            </motion.div>

            {/* Beats 2–4 Calm Deep-Pine Scrim — guarantees crisp white typography without harshness */}
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                style={{
                  opacity: veilOpacity,
                  background:
                    'linear-gradient(180deg, rgba(18,28,22,0.68) 0%, rgba(18,28,22,0.54) 50%, rgba(18,28,22,0.74) 100%)',
                }}
                className="pointer-events-none absolute inset-0 will-change-[opacity]"
              />
            )}

            {/* Seamless #F7FAF6 lower horizon transition as Beat 5 approaches */}
            {!prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                style={{
                  opacity: bottomBlendOpacity,
                  background:
                    'linear-gradient(180deg, rgba(247,250,246,0) 65%, rgba(247,250,246,0.55) 100%)',
                }}
                className="pointer-events-none absolute inset-0"
              />
            )}
          </div>

          {/* 2. BEAT 1 — SERENE HERO OPENING */}
          <motion.div
            style={{
              opacity: prefersReducedMotion ? 1 : heroOpacity,
              y: prefersReducedMotion ? 0 : heroY,
              pointerEvents: prefersReducedMotion ? 'auto' : heroPointerEvents,
            }}
            className="absolute inset-0 z-10 flex flex-col justify-between pt-24 sm:pt-28 pb-9 px-6 sm:px-10 max-w-6xl mx-auto will-change-[transform,opacity]"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: WELLNESS_EASE }}
                className="text-[13.5px] font-medium tracking-[0.04em] text-[#963B14] mb-4"
              >
                VANVITA Wellbeing · Live in Europe &amp; the USA
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.08, ease: WELLNESS_EASE }}
                className="text-[46px] sm:text-[64px] lg:text-[76px] font-medium text-[#18241C] leading-[1.02] tracking-[-0.03em] mb-5"
              >
                Wellbeing, made{' '}
                <span className="font-cursive text-[66px] sm:text-[88px] lg:text-[104px] text-[#B84D1D] font-normal leading-none inline-block -mb-2">
                  personal.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.18, ease: WELLNESS_EASE }}
                className="text-[16px] sm:text-[18px] leading-[1.65] text-[#223328] max-w-[560px] mx-auto mb-7 font-normal"
              >
                Expert-led yoga, meditation, breathwork, corporate burnout support, and HerWAY
                postpartum guidance—live online for Europe and the USA, and through retreats in
                India.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.26, ease: WELLNESS_EASE }}
                className="flex flex-wrap items-center justify-center gap-3.5"
              >
                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookFreeIntro}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14.5px] font-medium text-[#F7FAF6] bg-[#B84D1D] hover:bg-[#963B14] rounded-full ember-card-shadow transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[46px]"
                >
                  <span>Book Free Intro Session</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('schedule')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[14.5px] font-medium text-[#18241C] bg-white hover:bg-[#F7FAF6] border border-[#DDE7DC] rounded-full soft-card-shadow transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[46px]"
                >
                  <span>Europe &amp; USA Schedule</span>
                </motion.button>
              </motion.div>

              {activeInquiryCount > 0 && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onOpenInquiries}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/92 text-[13px] font-medium text-[#18241C] hover:bg-white transition-colors cursor-pointer soft-card-shadow"
                  >
                    <CalendarCheck2 className="w-4 h-4 text-[#B84D1D]" />
                    <span>
                      Saved inquiries (<span className="tabular-nums-mono">{activeInquiryCount}</span>)
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-end justify-between gap-6 w-full">
              <div className="hidden sm:block pl-4 border-l-2 border-[#D97A4A] max-w-xs">
                <p className="text-[13.5px] leading-[1.6] text-[#F7FAF6] font-normal">
                  Live well. Live fully. Practical, personal wellbeing built around real daily
                  schedules.
                </p>
              </div>

              <div className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18241C]/68 backdrop-blur-md border border-white/20 text-[#F7FAF6]">
                <span className="text-[12.5px] font-medium">Scroll to step inside</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ChevronDown className="w-4 h-4 text-[#E6A47E]" />
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* 3. BEAT 2 — PURPOSE & VISION */}
          {!prefersReducedMotion && (
            <motion.div
              style={{ opacity: beat2Opacity, y: beat2Y }}
              className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none will-change-[transform,opacity]"
            >
              <div className="max-w-3xl text-center text-[#F7FAF6]">
                <p className="text-[14px] font-medium text-[#F0AE89] mb-4">Our Purpose</p>
                <h2 className="text-[38px] sm:text-[54px] lg:text-[66px] font-medium leading-[1.06] tracking-[-0.025em] mb-5">
                  Your wellness, guided.
                  <br />
                  Live well. Live{' '}
                  <span className="font-cursive text-[56px] sm:text-[78px] lg:text-[92px] text-[#F1A77F] font-normal leading-none">
                    fully.
                  </span>
                </h2>
                <p className="text-[16px] sm:text-[18px] leading-[1.68] text-[#F7FAF6]/95 max-w-xl mx-auto">
                  Personal, practical wellbeing support made easy to reach—whether you join from
                  London, Zurich, New York, or San Francisco.
                </p>
              </div>
            </motion.div>
          )}

          {/* 4. BEAT 3 — MISSION & FOUR CALM PATHWAYS */}
          {!prefersReducedMotion && (
            <motion.div
              style={{
                opacity: beat3Opacity,
                y: beat3Y,
                pointerEvents: beat3PointerEvents,
              }}
              className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 max-w-6xl mx-auto will-change-[transform,opacity]"
            >
              <div className="max-w-2xl mb-10">
                <p className="text-[24px] sm:text-[32px] lg:text-[36px] font-normal leading-[1.28] tracking-[-0.02em] text-[#F7FAF6]">
                  Expert-led wellbeing for individuals, companies, and new mothers — delivered live
                  online at times that suit Europe and the USA, and through licensed retreats in
                  India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CALM_PILLARS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => onNavigate(item.target)}
                    className="text-left p-5 rounded-2xl bg-[#F7FAF6]/95 hover:bg-white border border-[#DDE7DC] soft-card-shadow transition-colors cursor-pointer"
                  >
                    <p className="text-[15px] font-medium text-[#18241C] mb-1">{item.title}</p>
                    <p className="text-[13.5px] leading-snug text-[#3F5246] mb-2">{item.detail}</p>
                    <span className="text-[13px] font-medium text-[#B84D1D]">Explore →</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 5. BEAT 4 — INSIDE THE TIMBER PAVILION */}
          {!prefersReducedMotion && (
            <motion.div
              style={{
                opacity: beat4Opacity,
                y: beat4Y,
                pointerEvents: beat4PointerEvents,
              }}
              className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 max-w-6xl mx-auto will-change-[transform,opacity]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 p-7 sm:p-9 rounded-[2rem] bg-[#18241C]/86 border border-white/20 backdrop-blur-xl text-[#F7FAF6] soft-card-shadow">
                  <p className="text-[13.5px] font-medium text-[#F0AE89] mb-3">
                    Live Online · Europe &amp; USA Time Zones
                  </p>
                  <h2 className="text-[30px] sm:text-[38px] font-normal leading-[1.12] tracking-[-0.025em] text-[#F7FAF6] mb-4">
                    Practical wellbeing built for everyday life.
                  </h2>
                  <p className="text-[15px] leading-[1.7] text-[#F7FAF6]/92 mb-6">
                    Begin with a complimentary 20-minute intro session. Meet your teacher, explore
                    daily live classes across European and US hours, or plan a restorative retreat
                    in India.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={onBookFreeIntro}
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-[#B84D1D] hover:bg-[#963B14] text-[#F7FAF6] text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Book Free Intro</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('schedule')}
                      className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-white/14 hover:bg-white/24 border border-white/25 text-[#F7FAF6] text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>View Weekly Schedule</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-[2rem] bg-[#F7FAF6]/96 backdrop-blur-xl border border-[#DDE7DC] px-6 sm:px-7 py-3 soft-card-shadow">
                  {PATHWAY_ROWS.map((row) => (
                    <button
                      key={row.index}
                      type="button"
                      onClick={() => onNavigate(row.target)}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left border-b last:border-b-0 border-[#DDE7DC] text-[#18241C] hover:text-[#B84D1D] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="tabular-nums-mono text-[12px] text-[#963B14] font-medium shrink-0">
                          {row.index}
                        </span>
                        <span className="text-[15px] font-medium leading-snug">{row.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B84D1D] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Subtle Bottom Scroll Progress Line (GPU-driven scaleX) */}
          {!prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 w-28 h-[3px] rounded-full bg-white/30 overflow-hidden"
            >
              <motion.div
                style={{ scaleX: smoothProgress }}
                className="h-full w-full origin-left bg-[#D97A4A]"
              />
            </div>
          )}
        </div>
      </div>

      {/* BEAT 5 — RISING #F7FAF6 SOLUTIONS PANEL */}
      <section className="relative z-20 -mt-[10vh] bg-[#F7FAF6] rounded-t-[2.75rem] border-t border-[#DDE7DC] shadow-[0_-20px_50px_rgba(24,36,28,0.10)] pt-16 sm:pt-20 pb-16 lg:pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-10 w-[440px] h-[440px] rounded-full bg-[#B84D1D]/7 blur-[110px] animate-blob-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#D7ECD9]/65 blur-[105px] animate-blob-slow-reverse"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-[13.5px] font-medium text-[#963B14] mb-3">Three Core Pathways</p>
              <h2 className="text-[36px] sm:text-[48px] lg:text-[54px] font-normal leading-[1.06] tracking-[-0.025em] text-[#18241C]">
                Supporting every chapter with calm, practical{' '}
                <span className="font-cursive text-[50px] sm:text-[66px] lg:text-[74px] text-[#B84D1D] font-normal leading-none">
                  care.
                </span>
              </h2>
            </div>

            <p className="text-[15.5px] leading-[1.68] text-[#3F5246] max-w-sm">
              From live online sessions and 1-on-1 coaching to corporate burnout pilots, licensed
              India retreats, and our supervised HerWAY postpartum pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SOLUTION_CARDS.map((card) => (
              <CalmPillarCard
                key={card.eyebrow}
                card={card}
                onClick={() => onNavigate(card.target)}
              />
            ))}
          </div>

          <div
            ref={statsRef}
            className="mt-14 pt-6 border-t border-[#DDE7DC] grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {SOLUTION_STATS.map((stat) => (
              <CountUpStat
                key={stat.label}
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                trigger={statsInView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
