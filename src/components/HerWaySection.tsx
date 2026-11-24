import { ArrowRight, HeartHandshake } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  HERWAY_PILLARS,
  HERWAY_SANCTUARY_IMAGE,
  HERWAY_STEAM_VIDEO,
  HERWAY_WATER_POSTER,
} from '../data/vanvitaData';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface HerWaySectionProps {
  previewMode?: boolean;
  onExploreHerWay?: () => void;
  onJoinPilot: () => void;
}

export function HerWaySection({
  previewMode = false,
  onExploreHerWay,
  onJoinPilot,
}: HerWaySectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <SectionEntrance
      id="herway"
      immediate={!previewMode}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-0 w-[440px] h-[440px] rounded-full bg-[#752D43]/9 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[#F5EAE8]/70 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="bg-white rounded-[2.75rem] border border-[#D8CEC4] soft-card-shadow overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Ambient Sanctuary Loop — Warm Terracotta Tea & Linen Bolsters */}
              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-[500px] bg-[#51372E]">
                <video
                  src={HERWAY_STEAM_VIDEO}
                  poster={HERWAY_WATER_POSTER}
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center"
                  aria-label="Warm terracotta teacup with gentle herbal steam resting beside a folded sage blanket and cream linen bolster"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3A251E]/92 via-[#3A251E]/30 to-transparent"
                />
                <div className="absolute bottom-7 left-7 right-7 text-[#F2EAE5]">
                  <p className="text-[13px] font-medium text-[#E8899D] mb-2">
                    Small Supervised Pilot · Open for Enrolment
                  </p>
                  <p className="text-[20px] font-medium leading-snug text-[#F2EAE5]">
                    Unhurried breath, rest, and gentle movement shaped around new motherhood.
                  </p>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 p-8 sm:p-11 flex flex-col justify-between gap-7">
                <div>
                  <p className="text-[13.5px] font-medium text-[#5A1E31] mb-3">
                    HerWAY by VANVITA · Postpartum Wellbeing Pathway
                  </p>

                  <h2 className="text-[34px] md:text-[46px] font-normal leading-[1.08] tracking-[-0.025em] text-[#51372E] mb-4">
                    Gentle wellbeing support for new{' '}
                    <span className="font-cursive text-[48px] md:text-[64px] text-[#752D43] font-normal leading-none">
                      mothers.
                    </span>
                  </h2>

                  <p className="text-[15.5px] leading-[1.7] text-[#634B41] mb-6">
                    HerWAY begins as a small, closely supervised pilot created for mothers
                    navigating the months after birth. Every live and recorded session prioritises
                    calm breathwork, everyday comfort, and supportive pacing—timed thoughtfully for
                    Europe and the USA.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {HERWAY_PILLARS.map((pillar) => (
                      <motion.div
                        key={pillar.index}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#F2EAE5] border border-[#D8CEC4] hover:border-[#752D43]/35 transition-colors"
                      >
                        <p className="tabular-nums-mono text-[12px] text-[#5A1E31] font-medium mb-1">
                          {pillar.index}.
                        </p>
                        <h3 className="text-[15.5px] font-medium text-[#51372E] mb-1.5">
                          {pillar.title}
                        </h3>
                        <p className="text-[13.5px] leading-[1.6] text-[#634B41]">
                          {pillar.detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EAE1DA] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-[13.5px] text-[#634B41] max-w-xs">
                    <HeartHandshake className="w-4 h-4 text-[#752D43] shrink-0" />
                    <span>
                      Everyday wellbeing guidance designed to complement your personal care team.
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {previewMode && onExploreHerWay && (
                      <button
                        type="button"
                        onClick={onExploreHerWay}
                        className="px-5 py-3 text-[13.5px] font-medium text-[#51372E] bg-[#FBF0F2] hover:bg-[#F5EAE8] rounded-full transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                      >
                        Learn About HerWAY
                      </button>
                    )}

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onJoinPilot}
                      className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[#F2EAE5] bg-[#752D43] hover:bg-[#5A1E31] rounded-full ember-card-shadow transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                    >
                      <span>Join Supervised Pilot</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
