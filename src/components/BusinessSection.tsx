import { useMemo, useState } from 'react';
import { ArrowRight, Building2, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BUSINESS_PROGRAMS,
  INDIA_RETREAT_IMAGE,
  INDIA_RETREAT_VIDEO,
} from '../data/vanvitaData';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface BusinessSectionProps {
  previewMode?: boolean;
  onExploreFullBusiness?: () => void;
  onRequestProposal: (programId: string, summaryNotes: string) => void;
}

const TEAM_SIZES = [
  { id: 'exec', label: '10–30 Team Members', multiplier: 1 },
  { id: 'mid', label: '31–100 Team Members', multiplier: 1.45 },
  { id: 'org', label: '100+ Global Organisation', multiplier: 2.1 },
];

const CONTRACT_MODELS = [
  { id: 'pilot', label: 'Paid Burnout Pilot (6–8 Wks)', baseCost: 4800, unit: '/ pilot' },
  { id: 'quarterly', label: 'Quarterly Contract', baseCost: 3900, unit: '/ month' },
  { id: 'annual', label: 'Annual Partnership + Workshops', baseCost: 3400, unit: '/ month' },
];

const RETREAT_ADDONS = [
  { id: 'online-only', label: 'Live Online (EU & USA)', factor: 1 },
  { id: 'workshops', label: '+ Interactive Seminars', factor: 1.2 },
  { id: 'india-retreat', label: '+ India Retreat (Licensed Partner)', factor: 1.55 },
];

export function BusinessSection({
  previewMode = false,
  onExploreFullBusiness,
  onRequestProposal,
}: BusinessSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [teamSizeId, setTeamSizeId] = useState(TEAM_SIZES[0].id);
  const [contractId, setContractId] = useState(CONTRACT_MODELS[0].id);
  const [addonId, setAddonId] = useState(RETREAT_ADDONS[1].id);

  const estimate = useMemo(() => {
    const team = TEAM_SIZES.find((t) => t.id === teamSizeId) || TEAM_SIZES[0];
    const contract = CONTRACT_MODELS.find((c) => c.id === contractId) || CONTRACT_MODELS[0];
    const addon = RETREAT_ADDONS.find((a) => a.id === addonId) || RETREAT_ADDONS[0];
    const amount = Math.round((contract.baseCost * team.multiplier * addon.factor) / 100) * 100;
    return {
      amount,
      unit: contract.unit,
      teamLabel: team.label,
      contractLabel: contract.label,
      addonLabel: addon.label,
    };
  }, [teamSizeId, contractId, addonId]);

  const getTintBg = (tint: 'eucalyptus' | 'fern' | 'sunbeam') => {
    if (tint === 'eucalyptus') return 'bg-[#EBF3EA]';
    if (tint === 'fern') return 'bg-[#F8EDE6]';
    return 'bg-[#F1F6E7]';
  };

  return (
    <SectionEntrance
      id="business"
      immediate={!previewMode}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Faded dark burnt-orange & morning botanical ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-0 w-[460px] h-[460px] rounded-full bg-[#B84D1D]/12 blur-[110px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 w-[440px] h-[440px] rounded-full bg-[#D7ECD9]/75 blur-[105px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-[13.5px] font-medium text-[#963B14] mb-3">
                Corporate Burnout &amp; Retreat · For Business
              </p>
              <h2 className="text-[38px] md:text-[54px] font-normal leading-[1.06] tracking-[-0.025em] text-[#18241C]">
                Sustained focus and calmer teams across every{' '}
                <span className="font-cursive text-[52px] md:text-[70px] text-[#B84D1D] font-normal leading-none">
                  quarter.
                </span>
              </h2>
            </div>

            {previewMode && onExploreFullBusiness ? (
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreFullBusiness}
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-[#18241C] bg-[#F8EDE6] hover:bg-[#F2DFD3] border border-[#B84D1D]/25 rounded-full soft-card-shadow transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer min-h-[44px]"
              >
                <span>Explore Corporate &amp; India Retreats</span>
                <ArrowRight className="w-4 h-4 text-[#B84D1D]" />
              </motion.button>
            ) : (
              <p className="text-[15.5px] leading-[1.68] text-[#3F5246] max-w-md">
                Start with a focused paid burnout-prevention pilot, expand into quarterly or annual
                contracts and interactive workshops, or host leadership retreats in India through
                our licensed partners.
              </p>
            )}
          </div>
        </RevealOnScroll>

        {/* Full-Width Living India Retreat Sunrise Courtyard Cinema Banner */}
        <RevealOnScroll delay={0.08} className="mb-12">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-[#DDE7DC] soft-card-shadow bg-[#18241C] h-[340px] sm:h-[440px]">
            <video
              src={INDIA_RETREAT_VIDEO}
              poster={INDIA_RETREAT_IMAGE}
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
              aria-label="Tranquil carved teakwood yoga retreat courtyard in India at sunrise beside a misty reflecting pool"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(20,31,24,0.22) 0%, rgba(20,31,24,0.34) 48%, rgba(16,25,19,0.92) 100%)',
              }}
            />
            <div className="absolute bottom-7 left-7 right-7 flex flex-col md:flex-row md:items-end justify-between gap-4 text-[#F7FAF6]">
              <div className="max-w-xl">
                <p className="text-[13px] font-medium text-[#F0AE89] mb-2">
                  Paid Pilot · Quarterly &amp; Annual Contracts · Licensed Partners in India
                </p>
                <p className="text-[22px] sm:text-[28px] font-medium leading-snug text-[#F7FAF6]">
                  Live Europe &amp; USA burnout-prevention programmes paired with authentic
                  leadership retreats in India.
                </p>
              </div>
              <div className="text-[13px] font-medium text-[#F7FAF6] whitespace-nowrap shrink-0 bg-[#18241C]/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Europe · USA · India Retreats
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Three Signature Corporate Offerings with Subtle Expand Hover */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-14">
          {BUSINESS_PROGRAMS.map((program, idx) => (
            <RevealOnScroll key={program.id} delay={idx * 0.08}>
              <motion.article
                whileHover={{ scale: 1.028, y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="h-full bg-white rounded-[2.25rem] border border-[#DDE7DC] hover:border-[#B84D1D]/40 soft-card-shadow hover:ember-card-shadow p-7 flex flex-col justify-between gap-6 transition-[border-color,box-shadow] duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[12px] text-[#526458] mb-3">
                    <span className="tabular-nums-mono text-[#B84D1D] font-medium">
                      {program.index}.
                    </span>
                    <span>{program.cadence}</span>
                  </div>

                  <h3 className="text-[23px] font-medium leading-snug text-[#18241C] mb-2">
                    {program.title}
                  </h3>
                  <p className="text-[13px] text-[#3E6F4E] mb-4">{program.subtitle}</p>
                  <p className="text-[14px] leading-[1.65] text-[#526458] mb-5">
                    {program.summary}
                  </p>

                  <ul className="space-y-2.5 text-[13px] text-[#18241C] pt-4 border-t border-[#EBF3EA]">
                    {program.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#B84D1D] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-4 rounded-[1.5rem] space-y-3 ${getTintBg(program.tint)}`}>
                  <p className="text-[12px] text-[#526458] leading-snug">
                    {program.outcomeMetric}
                  </p>
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#18241C]/8">
                    <span className="tabular-nums-mono text-[12.5px] font-medium text-[#18241C]">
                      {program.startingRate}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onRequestProposal(
                          program.id,
                          `Corporate Inquiry: ${program.title} (${program.startingRate}). ${program.subtitle}.`
                        )
                      }
                      className="text-[13px] font-medium text-[#B84D1D] hover:text-[#963B14] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Request Brief →
                    </button>
                  </div>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>

        {/* Interactive Corporate Programme Estimator (Full Business Page) */}
        {!previewMode && (
          <RevealOnScroll delay={0.1}>
            <div className="bg-[#EBF3EA] rounded-[2.75rem] border border-[#DDE7DC] soft-card-shadow p-7 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-[13px] font-medium text-[#B84D1D] mb-2">
                      Corporate Programme Estimator
                    </p>
                    <h3 className="text-[30px] md:text-[38px] font-normal leading-tight text-[#18241C] mb-2">
                      Scope a paid burnout pilot or India retreat.
                    </h3>
                    <p className="text-[14px] text-[#526458]">
                      Choose your team size, contract structure, and optional workshops or licensed
                      India retreat to preview an indicative corporate brief.
                    </p>
                  </div>

                  {/* Team Size */}
                  <div>
                    <span className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      01. Team Size
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TEAM_SIZES.map((size) => {
                        const isSelected = size.id === teamSizeId;
                        return (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setTeamSizeId(size.id)}
                            className={`px-4 py-2.5 text-[13px] font-medium rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-[#18241C] border-[#18241C] text-[#F7FAF6]'
                                : 'bg-white border-[#DDE7DC] text-[#526458] hover:text-[#18241C]'
                            }`}
                          >
                            {size.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Engagement Model */}
                  <div>
                    <span className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      02. Engagement Structure
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CONTRACT_MODELS.map((model) => {
                        const isSelected = model.id === contractId;
                        return (
                          <button
                            key={model.id}
                            type="button"
                            onClick={() => setContractId(model.id)}
                            className={`px-4 py-2.5 text-[13px] font-medium rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-[#B84D1D] border-[#B84D1D] text-[#F7FAF6]'
                                : 'bg-white border-[#DDE7DC] text-[#526458] hover:text-[#18241C]'
                            }`}
                          >
                            {model.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery & Retreats */}
                  <div>
                    <span className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      03. Delivery & Retreats
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {RETREAT_ADDONS.map((addon) => {
                        const isSelected = addon.id === addonId;
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => setAddonId(addon.id)}
                            className={`px-4 py-2.5 text-[13px] font-medium rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'bg-[#18241C] border-[#18241C] text-[#F7FAF6]'
                                : 'bg-white border-[#DDE7DC] text-[#526458] hover:text-[#18241C]'
                            }`}
                          >
                            {addon.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Live Indicative Summary Card */}
                <div className="lg:col-span-5 bg-white rounded-[2.25rem] border border-[#DDE7DC] soft-card-shadow p-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-[#F8EDE6] text-[#B84D1D] flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[12px] text-[#526458]">Indicative Scope</p>
                      <p className="text-[16px] font-medium text-[#18241C]">
                        VANVITA Corporate Wellbeing
                      </p>
                    </div>
                  </div>

                  <div className="py-5 border-y border-[#EBF3EA]">
                    <p className="text-[12px] text-[#526458] mb-1">Indicative Investment</p>
                    <motion.p
                      key={`${estimate.amount}-${estimate.unit}`}
                      initial={{ opacity: 0.4, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="tabular-nums-mono text-[34px] font-medium text-[#18241C] leading-none"
                    >
                      ${estimate.amount.toLocaleString()}
                      <span className="text-[14px] font-normal text-[#526458] ml-1.5">
                        {estimate.unit}
                      </span>
                    </motion.p>
                  </div>

                  <div className="space-y-2 text-[13px] text-[#526458]">
                    <p>
                      Cohort: <span className="text-[#18241C] font-medium">{estimate.teamLabel}</span>
                    </p>
                    <p>
                      Structure:{' '}
                      <span className="text-[#18241C] font-medium">{estimate.contractLabel}</span>
                    </p>
                    <p>
                      Scope:{' '}
                      <span className="text-[#18241C] font-medium">{estimate.addonLabel}</span>
                    </p>
                    <p>
                      Includes live Europe & USA timezone scheduling, recorded library access, and
                      licensed partner coordination for retreats in India.
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      onRequestProposal(
                        'burnout-prevention-pilot',
                        `Corporate Brief — Team: ${estimate.teamLabel} · Structure: ${estimate.contractLabel} · Scope: ${estimate.addonLabel} · Indicative: $${estimate.amount.toLocaleString()} ${estimate.unit}.`
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-[14px] font-medium text-[#F7FAF6] bg-[#B84D1D] hover:bg-[#963B14] rounded-full ember-card-shadow transition-colors cursor-pointer min-h-[46px]"
                  >
                    <span>Request Corporate Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </SectionEntrance>
  );
}

