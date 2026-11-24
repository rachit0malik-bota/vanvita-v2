import { ArrowRight, CalendarCheck2, Play } from 'lucide-react';
import { motion } from 'motion/react';
import {
  COACHING_BREATHWORK_IMAGE,
  GLOBAL_METRICS,
  HERO_CEDAR_SANCTUARY_IMAGE,
  HERO_LIVING_SANCTUARY_IMAGE,
} from '../data/vanvitaData';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance, WELLNESS_EASE } from './RevealOnScroll';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreLibrary: () => void;
  onExploreCoaching: () => void;
  onExploreRetreats: () => void;
  activeInquiryCount: number;
  onOpenInquiries: () => void;
}

export function HeroSection({
  onBookClick,
  onExploreLibrary,
  onExploreCoaching,
  onExploreRetreats,
  activeInquiryCount,
  onOpenInquiries,
}: HeroSectionProps) {
  return (
    <SectionEntrance
      id="hero"
      immediate
      className="relative pt-14 pb-20 lg:pt-20 lg:pb-24 overflow-hidden"
    >
      {/* Ambient floating morning foliage & sunlit dew blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#F5EAE8]/70 blur-[105px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 -right-24 w-[480px] h-[480px] rounded-full bg-[#F8ECEF]/80 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: WELLNESS_EASE }}
            className="text-[14px] text-[#72584D] mb-6"
          >
            Private Global Yoga & Wellbeing · London · Zurich · New York · Kyoto
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.16, ease: WELLNESS_EASE }}
            className="text-[46px] sm:text-[62px] lg:text-[74px] font-normal text-[#51372E] leading-[1.04] tracking-[-0.025em] mb-6"
          >
            Private yoga and breathwork, composed for a life in{' '}
            <span className="font-cursive text-[62px] sm:text-[82px] lg:text-[96px] text-[#DC7188] font-normal leading-none inline-block -mb-2">
              balance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.28, ease: WELLNESS_EASE }}
            className="text-[16px] sm:text-[18px] leading-[1.65] text-[#72584D] max-w-[540px] mx-auto mb-10"
          >
            Vanvita pairs discerning clients worldwide one-on-one with senior yoga and pranayama
            masters—through private virtual studios, in-residence coaching, and seasonal retreats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.38, ease: WELLNESS_EASE }}
            className="flex flex-wrap items-center justify-center gap-4 mb-6"
          >
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-medium text-white bg-[#752D43] hover:bg-[#5A1E31] rounded-full soft-card-shadow hover:shadow-[0_12px_28px_-6px_rgba(117,45,67,0.38)] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer min-h-[48px]"
            >
              <span>Schedule Private Intake</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreLibrary}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-medium text-[#51372E] bg-white hover:bg-[#EAE1DA]/60 border border-[#D8CEC4] rounded-full soft-card-shadow transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer min-h-[48px]"
            >
              <Play className="w-4 h-4 text-[#752D43]" />
              <span>Explore Practice Library</span>
            </motion.button>
          </motion.div>

          {activeInquiryCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <button
                type="button"
                onClick={onOpenInquiries}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#72584D] hover:text-[#51372E] transition-colors cursor-pointer"
              >
                <CalendarCheck2 className="w-4 h-4 text-[#752D43]" />
                <span>
                  View your saved inquiries (
                  <span className="tabular-nums-mono text-[#51372E]">{activeInquiryCount}</span>)
                </span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Visual Yoga Sanctuary Triptych */}
        <RevealOnScroll delay={0.18} className="mt-14 lg:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <motion.button
              type="button"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={onExploreCoaching}
              className="group md:col-span-7 relative rounded-[2.5rem] overflow-hidden bg-white border border-[#D8CEC4] soft-card-shadow min-h-[320px] sm:min-h-[400px] text-left cursor-pointer"
            >
              <ResilientImage
                src={HERO_CEDAR_SANCTUARY_IMAGE}
                alt="Sunlit limestone and cedar private yoga sanctuary with natural linen mat and bolster"
                fallbackTitle="Vanvita Private Yoga Sanctuary"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#51372E]/80 via-[#51372E]/15 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 text-[#F2EAE5]">
                <p className="text-[12px] text-[#F2EAE5]/85 mb-1.5">
                  Private 1-on-1 Coaching · Live Worldwide & In-Residence
                </p>
                <p className="text-[22px] sm:text-[26px] font-medium leading-snug">
                  Anatomically tailored yoga and pranayama calibrated to your week.
                </p>
              </div>
            </motion.button>

            <div className="md:col-span-5 grid grid-cols-1 gap-6">
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={onExploreLibrary}
                className="group relative rounded-[2.25rem] overflow-hidden bg-[#EAE1DA] border border-[#D8CEC4] soft-card-shadow min-h-[190px] text-left cursor-pointer"
              >
                <ResilientImage
                  src={COACHING_BREATHWORK_IMAGE}
                  alt="One-on-one guided pranayama and posture alignment session"
                  fallbackTitle="Master Guided Breathwork"
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#51372E]/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-[#F2EAE5]">
                  <p className="text-[12px] text-[#F2EAE5]/85">Practice Library</p>
                  <p className="text-[18px] font-medium">Guided breath & yoga video studies →</p>
                </div>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={onExploreRetreats}
                className="group relative rounded-[2.25rem] overflow-hidden bg-[#F9F3EE] border border-[#D8CEC4] soft-card-shadow min-h-[190px] text-left cursor-pointer"
              >
                <ResilientImage
                  src={HERO_LIVING_SANCTUARY_IMAGE}
                  alt="Warm sunlit architectural plaster sanctuary with linen cushions and olive branch"
                  fallbackTitle="Seasonal Architectural Retreats"
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#51372E]/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-[#F2EAE5]">
                  <p className="text-[12px] text-[#F2EAE5]/85">Seasonal Retreats</p>
                  <p className="text-[18px] font-medium">Kyoto, Engadin, Paros & Ubud →</p>
                </div>
              </motion.button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Global Trust & Reach Strip */}
        <RevealOnScroll delay={0.22}>
          <div className="mt-10 bg-white/90 rounded-[2rem] border border-[#D8CEC4] soft-card-shadow px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {GLOBAL_METRICS.map((metric) => (
              <div key={metric.label} className="text-center sm:text-left">
                <p className="tabular-nums-mono text-[26px] font-medium text-[#51372E] leading-none mb-1.5">
                  {metric.value}
                </p>
                <p className="text-[13px] text-[#72584D]">{metric.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
