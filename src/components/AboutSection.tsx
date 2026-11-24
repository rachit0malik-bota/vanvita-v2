import { ArrowRight, Compass, Globe2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ABOUT_LEAD_PORTRAIT_IMAGE,
  ABOUT_MALA_HANDS_IMAGE,
  GARDEN_BREEZE_IMAGE,
  LAVENDER_PAVILION_IMAGE,
  MEADOW_SKY_IMAGE,
  SOUND_BOWL_WATER_IMAGE,
} from '../data/vanvitaData';
import { ResilientImage } from './ResilientImage';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface AboutSectionProps {
  onBookFreeIntro: () => void;
  onExploreExperts: () => void;
}

const PRINCIPLES = [
  {
    icon: Compass,
    title: 'Wellbeing, Made Personal',
    body: 'Every body and weekly calendar is different. We meet you with practical yoga, meditation, and breathwork that fits naturally into everyday life rather than demanding perfection.',
  },
  {
    icon: Globe2,
    title: 'Timed for Europe & the USA',
    body: 'Live group classes, one-to-one coaching, and corporate workshops run at thoughtfully chosen hours across European and American time zones—backed by an anytime recorded library.',
  },
  {
    icon: ShieldCheck,
    title: 'Grounded, Responsible Language',
    body: 'We speak clearly in authentic wellbeing language—focused on daily balance, movement ease, breath awareness, and sustainable habits, alongside licensed partners for our retreats in India.',
  },
];

export function AboutSection({
  onBookFreeIntro,
  onExploreExperts,
}: AboutSectionProps) {
  return (
    <SectionEntrance
      id="about"
      immediate
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 right-0 w-[440px] h-[440px] rounded-full bg-[#752D43]/12 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[440px] h-[440px] rounded-full bg-[#F5EAE8]/75 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FBF0F2] border border-[#752D43]/20 text-[#752D43] tabular-nums-mono text-[10.5px] uppercase tracking-[0.15em] mb-4">
              About VANVITA Wellbeing
            </span>
            <h1 className="text-[40px] md:text-[56px] font-normal leading-[1.06] tracking-[-0.025em] text-[#51372E] mb-5">
              Live well. Live{' '}
              <span className="font-cursive text-[56px] md:text-[74px] text-[#752D43] font-normal leading-none">
                fully.
              </span>
            </h1>
            <p className="text-[17px] leading-[1.7] text-[#72584D]">
              VANVITA Wellbeing delivers expert-led wellness for individuals, companies, and new
              mothers—live online at times that suit Europe and the USA, and in person through
              carefully selected licensed retreat partners in India.
            </p>
          </div>
        </RevealOnScroll>

        {/* Dual Authentic Pavilion & Meadow Photography Banner */}
        <RevealOnScroll delay={0.08} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 rounded-[2.5rem] overflow-hidden border border-[#D8CEC4] soft-card-shadow h-[340px] sm:h-[420px] bg-[#EAE1DA]">
              <ResilientImage
                src={ABOUT_LEAD_PORTRAIT_IMAGE}
                alt="VANVITA teacher smiling warmly in white linen inside an open-air timber pavilion"
                fallbackTitle="VANVITA Wellbeing Sanctuary"
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
            <div className="md:col-span-5 rounded-[2.5rem] overflow-hidden border border-[#D8CEC4] soft-card-shadow h-[340px] sm:h-[420px] bg-[#FBF0F2]">
              <ResilientImage
                src={MEADOW_SKY_IMAGE}
                alt="Expansive green summer meadow and open sky surrounding our retreat pavilion"
                fallbackTitle="Open Meadow Sanctuary"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </RevealOnScroll>

        {/* Four Sanctuary Detail Photographs */}
        <RevealOnScroll delay={0.12} className="mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                src: ABOUT_MALA_HANDS_IMAGE,
                alt: 'Clasped hands resting with wooden mala beads and sage embroidered shawl',
                pos: 'object-center',
              },
              {
                src: SOUND_BOWL_WATER_IMAGE,
                alt: 'Mindful sound meditation with water-filled bronze Tibetan singing bowl',
                pos: 'object-[50%_20%]',
              },
              {
                src: LAVENDER_PAVILION_IMAGE,
                alt: 'Dried lavender wreath and woven dreamcatchers along the timber pavilion wall',
                pos: 'object-center',
              },
              {
                src: GARDEN_BREEZE_IMAGE,
                alt: 'Sunlit feathers and natural sanctuary details moving in the summer garden breeze',
                pos: 'object-center',
              },
            ].map((photo) => (
              <div
                key={photo.src}
                className="aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-[#D8CEC4] soft-card-shadow bg-[#EAE1DA]"
              >
                <ResilientImage
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full h-full object-cover ${photo.pos} hover:scale-105 transition-transform duration-700`}
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Three Ethos Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PRINCIPLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={item.title} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.028, y: -5 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-white rounded-[2.25rem] border border-[#D8CEC4] hover:border-[#752D43]/35 soft-card-shadow p-7 flex flex-col justify-between gap-4 transition-colors"
                >
                  <div>
                    <span className="w-11 h-11 rounded-2xl bg-[#FBF0F2] text-[#752D43] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h2 className="text-[21px] font-medium text-[#51372E] mb-2.5">
                      {item.title}
                    </h2>
                    <p className="text-[14.5px] leading-[1.7] text-[#72584D]">{item.body}</p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom Invitation Band */}
        <RevealOnScroll delay={0.12}>
          <div className="bg-[#51372E] text-[#F2EAE5] rounded-[2.5rem] p-8 sm:p-11 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 w-72 h-72 rounded-full bg-[#C45B28]/25 blur-[80px]"
            />
            <div className="relative z-10 max-w-xl">
              <p className="font-cursive text-[32px] text-[#E89B72] leading-none mb-2">
                Your wellness, guided.
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-normal leading-tight">
                Begin with a complimentary intro session and meet your guide.
              </h2>
            </div>

            <div className="relative z-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onExploreExperts}
                className="px-6 py-3.5 text-[14px] font-medium text-[#F2EAE5] bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                Meet Our Experts
              </button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBookFreeIntro}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-medium text-[#F2EAE5] bg-[#C45B28] hover:bg-[#752D43] rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Book Free Intro</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
