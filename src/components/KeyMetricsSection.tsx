import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  SANCTUARY_REEL_VIDEOS,
  SANCTUARY_WIDESCREEN_VIDEOS,
  SanctuaryReelItem,
} from '../data/vanvitaData';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface KeyMetricsSectionProps {
  onExploreSchedule: () => void;
  onBookFreeIntro: () => void;
}

interface MetricDataPoint {
  id: string;
  label: string;
  target: number;
  suffix: string;
  context: string;
  note: string;
}

const KEY_METRICS: MetricDataPoint[] = [
  {
    id: 'live-memberships',
    label: 'Live Memberships',
    target: 1480,
    suffix: '+',
    context: 'Active online yoga, meditation, breathwork, and recorded library members.',
    note: 'Europe & USA daily cohorts',
  },
  {
    id: 'coaching-sessions',
    label: 'Coaching Sessions',
    target: 6240,
    suffix: '+',
    context: 'Private one-to-one guided wellbeing sessions delivered live online.',
    note: 'Tailored to personal schedules',
  },
  {
    id: 'corporate-pilots',
    label: 'Corporate Pilot Contracts',
    target: 38,
    suffix: '',
    context: 'Paid burnout-prevention pilots growing into quarterly and annual partnerships.',
    note: 'Workshops & leadership teams',
  },
  {
    id: 'retreat-participants',
    label: 'Retreat Participants',
    target: 420,
    suffix: '+',
    context: 'Guests welcomed at retreats in India hosted through licensed local partners.',
    note: 'Small-group seasonal residencies',
  },
];

function CalmMetricCard({
  metric,
  index,
  inView,
  prefersReducedMotion,
}: {
  metric: MetricDataPoint;
  index: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion) {
      setDisplayValue(metric.target);
      return;
    }

    const duration = 1250 + index * 120;
    const startTime = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(metric.target * eased));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, [inView, metric.target, index, prefersReducedMotion]);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-full rounded-[2rem] bg-white border border-[#D8CEC4] hover:border-[#752D43]/40 p-7 flex flex-col justify-between gap-5 transition-colors soft-card-shadow"
    >
      <div>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="tabular-nums-mono text-[42px] sm:text-[46px] font-medium leading-none tracking-[-0.03em] text-[#752D43]">
            {displayValue.toLocaleString()}
          </span>
          {metric.suffix && (
            <span className="tabular-nums-mono text-[26px] font-medium leading-none text-[#DC7188]">
              {metric.suffix}
            </span>
          )}
        </div>

        <h3 className="text-[18px] font-medium text-[#51372E] leading-snug mb-2">
          {metric.label}
        </h3>

        <p className="text-[14px] leading-[1.65] text-[#634B41]">
          {metric.context}
        </p>
      </div>

      <div className="pt-4 border-t border-[#EAE1DA]">
        <p className="text-[12.5px] font-medium text-[#752D43]">
          {metric.note}
        </p>
      </div>
    </motion.article>
  );
}

function VerticalReelCard({
  reel,
  prefersReducedMotion,
}: {
  reel: SanctuaryReelItem;
  prefersReducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const vid = videoRef.current;
    if (!vid) return;
    vid
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [prefersReducedMotion]);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[9/14] sm:aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#51372E] border border-[#D8CEC4] soft-card-shadow group"
    >
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover object-[50%_20%]"
        aria-label={reel.caption}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3A251E]/92 via-[#3A251E]/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12.5px] font-medium text-[#E8899D] mb-1">
            {reel.label}
          </p>
          <p className="text-[14.5px] font-normal text-[#F2EAE5] leading-snug">
            {reel.caption}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? `Unmute ${reel.label}` : `Mute ${reel.label}`}
            className="w-9 h-9 rounded-full bg-[#51372E]/80 hover:bg-[#752D43] border border-white/25 text-[#F2EAE5] backdrop-blur-md inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${reel.label}` : `Play ${reel.label}`}
            className="w-9 h-9 rounded-full bg-[#51372E]/80 hover:bg-[#752D43] border border-white/25 text-[#F2EAE5] backdrop-blur-md inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function KeyMetricsSection({
  onExploreSchedule,
  onBookFreeIntro,
}: KeyMetricsSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const metricsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.25 });

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!prefersReducedMotion);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const activeVideo = SANCTUARY_WIDESCREEN_VIDEOS[activeVideoIndex];

  useEffect(() => {
    setVideoFailed(false);
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [activeVideoIndex, prefersReducedMotion, isMuted]);

  const handleTogglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <SectionEntrance
      id="impact-metrics"
      className="relative py-20 lg:py-28 bg-[#F2EAE5] overflow-hidden"
    >
      {/* Gentle atmospheric morning washes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/4 w-[440px] h-[440px] rounded-full bg-[#752D43]/8 blur-[115px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/5 w-[420px] h-[420px] rounded-full bg-[#F5EAE8]/70 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Top Row: Editorial Context + Sanctuary Films */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12 lg:mb-14">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-[13.5px] font-medium text-[#5A1E31] mb-3">
                  Live Practice Impact · Europe, USA &amp; India
                </p>
                <h2 className="text-[34px] sm:text-[44px] font-normal leading-[1.08] tracking-[-0.025em] text-[#51372E] mb-4">
                  Consistent daily practice, felt in every{' '}
                  <span className="font-cursive text-[48px] sm:text-[60px] text-[#752D43] font-normal leading-none">
                    season.
                  </span>
                </h2>
                <p className="text-[15.5px] leading-[1.7] text-[#634B41]">
                  Step inside our open-air timber pavilion. From bronze singing bowls and
                  one-to-one breathwork to corporate burnout pilots and licensed retreats in India,
                  VANVITA brings grounded, human-led wellbeing into daily life.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-[13px] font-medium text-[#634B41] mb-2">
                    Sanctuary Films
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SANCTUARY_WIDESCREEN_VIDEOS.map((item, idx) => {
                      const isActive = idx === activeVideoIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveVideoIndex(idx)}
                          className={`px-3.5 py-2 text-[13px] font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            isActive
                              ? 'bg-[#51372E] border-[#51372E] text-[#F2EAE5]'
                              : 'bg-white border-[#D8CEC4] text-[#634B41] hover:border-[#752D43]/45 hover:text-[#51372E]'
                          }`}
                        >
                          {item.tabLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onBookFreeIntro}
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-[#752D43] hover:bg-[#5A1E31] text-[#F2EAE5] text-[14px] font-medium ember-card-shadow transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Free Intro</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onExploreSchedule}
                    className="inline-flex items-center gap-1.5 px-5 py-3 min-h-[44px] rounded-full border border-[#D8CEC4] bg-white hover:border-[#752D43]/45 text-[#51372E] text-[14px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>View Live Schedule</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Widescreen Real Video Player */}
            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[280px] sm:min-h-[370px] rounded-[2.25rem] overflow-hidden bg-[#51372E] border border-[#D8CEC4] ember-card-shadow">
                {!videoFailed ? (
                  <video
                    key={activeVideo.id}
                    ref={videoRef}
                    src={activeVideo.src}
                    poster={activeVideo.poster}
                    autoPlay={!prefersReducedMotion}
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoFailed(true)}
                    className="w-full h-full object-cover object-center"
                    aria-label={activeVideo.title}
                  />
                ) : (
                  <img
                    src={activeVideo.poster}
                    alt={activeVideo.title}
                    className="w-full h-full object-cover object-[50%_20%]"
                  />
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3A251E]/92 via-[#3A251E]/32 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-[#E8899D] mb-1">
                      {activeVideo.eyebrow}
                    </p>
                    <p className="text-[17px] sm:text-[19px] font-medium text-[#F2EAE5] leading-snug">
                      {activeVideo.title}
                    </p>
                  </div>

                  {!videoFailed && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        aria-label={isMuted ? 'Unmute sanctuary sound' : 'Mute sanctuary sound'}
                        className="w-11 h-11 rounded-full bg-[#51372E]/82 hover:bg-[#752D43] border border-white/25 text-[#F2EAE5] backdrop-blur-md inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleTogglePlayback}
                        aria-label={isPlaying ? 'Pause sanctuary film' : 'Play sanctuary film'}
                        className="w-11 h-11 rounded-full bg-[#51372E]/82 hover:bg-[#752D43] border border-white/25 text-[#F2EAE5] backdrop-blur-md inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Middle Row: Four Calm Editorial Metric Cards */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
        >
          {KEY_METRICS.map((metric, idx) => (
            <CalmMetricCard
              key={metric.id}
              metric={metric}
              index={idx}
              inView={metricsInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Bottom Row: Three Authentic Vertical Pavilion Moments */}
        <RevealOnScroll delay={0.1}>
          <div className="pt-10 border-t border-[#D8CEC4]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
              <div>
                <p className="text-[13.5px] font-medium text-[#5A1E31] mb-1.5">
                  Inside the Pavilion · Real Practice Moments
                </p>
                <h3 className="text-[26px] sm:text-[32px] font-normal leading-tight tracking-[-0.02em] text-[#51372E]">
                  Sound bowls, breath cues, and summer meadow stillness.
                </h3>
              </div>
              <p className="text-[14px] text-[#634B41] max-w-xs">
                Tap the sound icon on any moment to listen to the natural bronze bowl harmonics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SANCTUARY_REEL_VIDEOS.map((reel) => (
                <VerticalReelCard
                  key={reel.id}
                  reel={reel}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
