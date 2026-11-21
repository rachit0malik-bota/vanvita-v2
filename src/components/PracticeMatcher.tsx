import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  COACHING_DISCIPLINES,
  computePracticeBlueprint,
  MASTER_TEACHERS,
  RETREAT_RESIDENCIES,
} from '../data/vanvitaData';
import { PracticeAnswers, PracticeBlueprint } from '../types/vanvita';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';

interface PracticeMatcherProps {
  onApplyBlueprint: (blueprint: PracticeBlueprint) => void;
  onExploreRetreat: (retreatId: string) => void;
}

const INITIAL_ANSWERS: PracticeAnswers = {
  intention: null,
  rhythm: null,
  intensity: null,
  delivery: null,
};

interface StepConfig {
  key: keyof PracticeAnswers;
  stepNumber: string;
  question: string;
  helper: string;
  options: { value: string; label: string; detail: string }[];
}

const STEPS: StepConfig[] = [
  {
    key: 'intention',
    stepNumber: '01',
    question: 'What is your primary intention for the coming two quarters?',
    helper: 'Select the physiological or mental outcome that matters most right now.',
    options: [
      {
        value: 'restoration',
        label: 'Nervous system restoration & deeper sleep',
        detail: 'Quiet evening wind-downs, vagal recovery, and autonomic steadiness.',
      },
      {
        value: 'alignment',
        label: 'Structural mobility & joint longevity',
        detail: 'Spinal decompression, posture precision, and sustainable physical strength.',
      },
      {
        value: 'energy',
        label: 'Sustained clarity across travel and work',
        detail: 'Jet-lag neutrality, morning vitality, and concise high-yield sequences.',
      },
      {
        value: 'breathwork',
        label: 'Classical pranayama & seated stillness',
        detail: 'Measured respiratory progression and contemplative focus.',
      },
    ],
  },
  {
    key: 'rhythm',
    stepNumber: '02',
    question: 'How does your weekly schedule typically unfold?',
    helper: 'Your cadence shapes session duration and calendar flexibility.',
    options: [
      {
        value: 'frequent-travel',
        label: 'Frequent international flights',
        detail: 'Crossing time zones monthly between major cities and residences.',
      },
      {
        value: 'intense-desk',
        label: 'High-focus executive or studio weeks',
        detail: 'Predictable home base with sustained cognitive demand and long seated hours.',
      },
      {
        value: 'sabbatical',
        label: 'Dedicated restorative season or recovery',
        detail: 'Open space for deeper therapeutic work, injury recovery, or unhurried study.',
      },
      {
        value: 'steady-home',
        label: 'Consistent private home rhythm',
        detail: 'Committed to building a progressive multi-year personal practice.',
      },
    ],
  },
  {
    key: 'intensity',
    stepNumber: '03',
    question: 'Which physical tempo feels most restorative for your body?',
    helper: 'We calibrate load and pacing to support longevity rather than exhaustion.',
    options: [
      {
        value: 'gentle',
        label: 'Gentle somatic & prop-supported',
        detail: 'Zero-impact fascia release, restorative bolsters, and deep respiratory focus.',
      },
      {
        value: 'balanced',
        label: 'Balanced breath-led flow',
        detail: 'Measured mobility, joint articulation, and steady heat without rush.',
      },
      {
        value: 'disciplined',
        label: 'Disciplined strength & alignment',
        detail: 'Structured standing work, core stability, and progressive biomechanical depth.',
      },
    ],
  },
  {
    key: 'delivery',
    stepNumber: '04',
    question: 'How would you prefer to meet your Vanvita master?',
    helper: 'All formats include private scheduling across your local time zone.',
    options: [
      {
        value: 'virtual',
        label: 'Private live virtual sanctuary',
        detail: 'Broadcast-clarity 1-on-1 sessions from your home studio or hotel suite.',
      },
      {
        value: 'in-residence',
        label: 'In-residence private coaching',
        detail: 'Your master visits your residence in London, Zurich, New York, or Kyoto.',
      },
      {
        value: 'hybrid',
        label: 'Hybrid virtual + seasonal architectural retreat',
        detail: 'Weekly live coaching anchored by an in-person residency once or twice yearly.',
      },
    ],
  },
];

export function PracticeMatcher({
  onApplyBlueprint,
  onExploreRetreat,
}: PracticeMatcherProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<PracticeAnswers>(INITIAL_ANSWERS);
  const [blueprint, setBlueprint] = useState<PracticeBlueprint | null>(null);

  const currentStep = STEPS[stepIndex];
  const currentAnswer = answers[currentStep.key];

  const handleSelectOption = (value: string) => {
    const updated = {
      ...answers,
      [currentStep.key]: value,
    } as PracticeAnswers;
    setAnswers(updated);

    if (stepIndex < STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setBlueprint(computePracticeBlueprint(updated));
    }
  };

  const handleReset = () => {
    setAnswers(INITIAL_ANSWERS);
    setBlueprint(null);
    setStepIndex(0);
  };

  const matchedDiscipline = blueprint
    ? COACHING_DISCIPLINES.find((d) => d.id === blueprint.recommendedDisciplineId)
    : null;
  const matchedMaster = blueprint
    ? MASTER_TEACHERS.find((m) => m.id === blueprint.recommendedMasterId)
    : null;
  const matchedRetreat = blueprint
    ? RETREAT_RESIDENCIES.find((r) => r.id === blueprint.suggestedRetreatId)
    : null;

  return (
    <SectionEntrance id="practice-matcher" className="relative py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="bg-[#EBF3EA] rounded-[2.75rem] border border-[#DDE7DC] soft-card-shadow p-7 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <p className="text-[14px] font-medium text-[#526458] mb-3">
                  Personalized Practice Advisor
                </p>
                <h2 className="text-[34px] md:text-[44px] font-normal leading-[1.1] tracking-[-0.025em] text-[#18241C] mb-4">
                  Compose your private{' '}
                  <span className="font-cursive text-[46px] md:text-[58px] text-[#3E6F4E] font-normal leading-none">
                    blueprint.
                  </span>
                </h2>
                <p className="text-[15px] leading-[1.7] text-[#526458] mb-8">
                  Four gentle questions about your intention, travel rhythm, and preferred pace—we
                  match you to a senior master, curriculum, and seasonal retreat.
                </p>

                <div className="space-y-2.5 pt-5 border-t border-[#18241C]/10">
                  {STEPS.map((step, idx) => {
                    const isCompleted = Boolean(answers[step.key]);
                    const isCurrent = !blueprint && idx === stepIndex;
                    return (
                      <button
                        key={step.key}
                        type="button"
                        onClick={() => {
                          if (blueprint) setBlueprint(null);
                          if (idx <= stepIndex || isCompleted) setStepIndex(idx);
                        }}
                        disabled={!isCompleted && idx > stepIndex}
                        className={`w-full flex items-center justify-between text-left py-1.5 text-[13px] transition-colors ${
                          isCurrent
                            ? 'text-[#18241C] font-medium'
                            : isCompleted
                              ? 'text-[#3E6F4E] cursor-pointer hover:text-[#18241C]'
                              : 'text-[#526458]/65 cursor-not-allowed'
                        }`}
                      >
                        <span>
                          <span className="tabular-nums-mono mr-2">{step.stepNumber}.</span>
                          {step.key === 'intention' && 'Primary Intention'}
                          {step.key === 'rhythm' && 'Schedule & Travel'}
                          {step.key === 'intensity' && 'Physical Tempo'}
                          {step.key === 'delivery' && 'Delivery Format'}
                        </span>
                        <span className="tabular-nums-mono text-[12px]">
                          {isCompleted ? 'Selected' : isCurrent ? 'Current' : '—'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-8 bg-white rounded-[2.25rem] border border-[#DDE7DC] soft-card-shadow p-7 md:p-9 overflow-hidden">
                <AnimatePresence mode="wait">
                  {!blueprint ? (
                    <motion.div
                      key={`step-${stepIndex}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EBF3EA]">
                        <span className="tabular-nums-mono text-[12px] text-[#526458]">
                          Step {currentStep.stepNumber} / 04
                        </span>
                        <div className="w-32 h-1.5 rounded-full bg-[#EBF3EA] overflow-hidden">
                          <div
                            className="h-full bg-[#4A7C59] rounded-full transition-all duration-300"
                            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <h3 className="text-[26px] md:text-[30px] font-medium leading-snug text-[#18241C] mb-2">
                        {currentStep.question}
                      </h3>
                      <p className="text-[14px] text-[#526458] mb-7">{currentStep.helper}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentStep.options.map((option) => {
                          const isSelected = currentAnswer === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleSelectOption(option.value)}
                              className={`text-left p-5 rounded-[1.5rem] border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 min-h-[112px] ${
                                isSelected
                                  ? 'border-[#18241C] bg-[#18241C] text-[#F7FAF6]'
                                  : 'border-[#DDE7DC] bg-[#F7FAF6] hover:bg-[#EBF3EA] hover:border-[#3E6F4E]/40 text-[#18241C]'
                              }`}
                            >
                              <span className="text-[15px] font-medium leading-snug">
                                {option.label}
                              </span>
                              <span
                                className={`text-[13px] leading-relaxed ${
                                  isSelected ? 'text-[#F7FAF6]/80' : 'text-[#526458]'
                                }`}
                              >
                                {option.detail}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-7 pt-5 border-t border-[#EBF3EA] flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                          disabled={stepIndex === 0}
                          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#526458] hover:text-[#18241C] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer py-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Previous Step</span>
                        </button>

                        {currentAnswer && (
                          <button
                            type="button"
                            onClick={() => {
                              if (stepIndex < STEPS.length - 1) {
                                setStepIndex((prev) => prev + 1);
                              } else {
                                setBlueprint(computePracticeBlueprint(answers));
                              }
                            }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-medium text-[#F7FAF6] bg-[#18241C] hover:bg-[#24372B] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>
                              {stepIndex === STEPS.length - 1 ? 'View Blueprint' : 'Continue'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="blueprint-result"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#EBF3EA]">
                        <span className="text-[13px] text-[#3E6F4E] font-medium">
                          Your Vanvita Practice Blueprint
                        </span>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex items-center gap-1.5 text-[13px] text-[#526458] hover:text-[#18241C] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Start Over</span>
                        </button>
                      </div>

                      <h3 className="text-[28px] md:text-[34px] font-medium leading-tight text-[#18241C] mb-3">
                        {blueprint.programTitle}
                      </h3>
                      <p className="text-[15px] leading-[1.7] text-[#526458] mb-7">
                        {blueprint.rationale}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-[#F7FAF6] border border-[#DDE7DC]">
                          <span className="block text-[12px] text-[#526458] mb-1">
                            Recommended Curriculum
                          </span>
                          <p className="text-[15px] font-medium text-[#18241C]">
                            {matchedDiscipline?.title}
                          </p>
                          <p className="tabular-nums-mono text-[12px] text-[#526458] mt-1">
                            {matchedDiscipline?.retainerRange} · {blueprint.sessionDuration}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#EBF3EA] border border-[#DDE7DC]">
                          <span className="block text-[12px] text-[#526458] mb-1">
                            Paired Senior Master
                          </span>
                          <p className="text-[15px] font-medium text-[#18241C]">
                            {matchedMaster?.name}
                          </p>
                          <p className="text-[13px] text-[#526458] mt-1">
                            {matchedMaster?.baseCity} · {matchedMaster?.lineage}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#E1ECE0] border border-[#DDE7DC]">
                          <span className="block text-[12px] text-[#526458] mb-1">
                            Weekly Practice Cadence
                          </span>
                          <p className="text-[14px] text-[#18241C] leading-relaxed">
                            {blueprint.weeklyCadence}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#F1F6E7] border border-[#DDE7DC]">
                          <span className="block text-[12px] text-[#526458] mb-1">
                            Breathwork Protocol
                          </span>
                          <p className="text-[14px] text-[#18241C] leading-relaxed">
                            {blueprint.breathworkProtocol}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {matchedRetreat && (
                          <button
                            type="button"
                            onClick={() => onExploreRetreat(matchedRetreat.id)}
                            className="text-left text-[13px] text-[#526458] hover:text-[#18241C] transition-colors cursor-pointer"
                          >
                            <span className="block text-[12px]">Complementary Residency</span>
                            <span className="underline underline-offset-4 text-[#18241C] font-medium">
                              {matchedRetreat.title} ({matchedRetreat.dates})
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onApplyBlueprint(blueprint)}
                          className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-medium text-[#18241C] bg-[#B7D7BD] hover:bg-[#A3CBA9] hover:scale-[1.02] rounded-full soft-card-shadow transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                        >
                          <span>Schedule This Blueprint</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
