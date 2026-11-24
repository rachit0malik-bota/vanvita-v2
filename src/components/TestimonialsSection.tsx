import { motion } from 'motion/react';
import { CLIENT_TESTIMONIALS } from '../data/vanvitaData';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface TestimonialsSectionProps {
  onSelectMaster?: (masterId: string) => void;
}

export function TestimonialsSection({ onSelectMaster }: TestimonialsSectionProps) {
  return (
    <SectionEntrance id="testimonials" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Faded dark-orange & morning eucalyptus atmospheric blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-[#752D43]/10 blur-[100px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/5 w-96 h-96 rounded-full bg-[#D9EEDB]/75 blur-[96px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-16">
            <p className="text-[14px] font-medium text-[#5A1E31] mb-3">
              Member Reflections · VANVITA Wellbeing
            </p>
            <h2 className="text-[38px] md:text-[52px] font-normal leading-[1.08] tracking-[-0.025em] text-[#51372E] mb-4">
              Steadier days, calmer breath, and daily{' '}
              <span className="font-cursive text-[50px] md:text-[66px] text-[#752D43] font-normal leading-none">
                stillness.
              </span>
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#72584D]">
              Reflections from individuals, corporate teams, and new mothers practicing live online
              and on partner retreats across Europe and the USA.
            </p>
          </div>
        </RevealOnScroll>

        {/* Minimalist Architectural Two-Column Grid with Faded Burnt-Orange Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {CLIENT_TESTIMONIALS.map((item, idx) => {
            const tintAccent =
              item.tint === 'sage'
                ? 'bg-[#EAE1DA] border border-[#D8CEC4]'
                : item.tint === 'lavender'
                  ? 'bg-[#FBF0F2] border border-[#752D43]/18'
                  : 'bg-[#F9F3EE] border border-[#D8CEC4]';

            return (
              <RevealOnScroll key={item.id} delay={idx * 0.07}>
                <motion.article
                  whileHover={{ scale: 1.022, y: -5 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="h-full bg-white rounded-[2rem] border border-[#D8CEC4] hover:border-[#752D43]/40 soft-card-shadow hover:shadow-[0_18px_38px_-14px_rgba(117,45,67,0.16)] p-8 md:p-9 flex flex-col justify-between gap-7 transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#72584D] mb-5">
                      <span className="font-medium text-[#5A1E31]">{item.disciplineTag}</span>
                      <span>Guide: {item.masterName}</span>
                    </div>

                    <div className={`inline-block px-4 py-2 rounded-2xl mb-5 ${tintAccent}`}>
                      <p className="text-[14px] font-medium text-[#51372E]">
                        {item.metric}{' '}
                        <span className="text-[#72584D] font-normal">· {item.timeframe}</span>
                      </p>
                    </div>

                    <blockquote className="text-[16px] md:text-[17px] leading-[1.7] text-[#51372E] font-normal">
                      “{item.quote}”
                    </blockquote>
                  </div>

                  <footer className="pt-5 border-t border-[#EAE1DA] flex flex-wrap items-end justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        aria-hidden="true"
                        className="inline-block w-8 h-[1.5px] bg-[#752D43]/50 shrink-0"
                      />
                      <div>
                        <p className="font-cursive text-[26px] leading-none text-[#752D43]">
                          {item.signatureName}
                        </p>
                        <p className="text-[12px] text-[#72584D] mt-1">
                          {item.role}, {item.organization} · {item.location}
                        </p>
                      </div>
                    </div>

                    {onSelectMaster && (
                      <button
                        type="button"
                        onClick={() => {
                          const masterSlug = item.masterName.toLowerCase().replace(/\s+/g, '-');
                          onSelectMaster(masterSlug);
                        }}
                        className="text-[12px] font-medium text-[#5A1E31] hover:text-[#51372E] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Practice with {item.masterName.split(' ')[0]} →
                      </button>
                    )}
                  </footer>
                </motion.article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </SectionEntrance>
  );
}
