/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { BusinessSection } from './components/BusinessSection';
import { CoachingSection } from './components/CoachingSection';
import { ConsultationConcierge } from './components/ConsultationConcierge';
import { Footer } from './components/Footer';
import { HerWaySection } from './components/HerWaySection';
import {
  InteractiveFaqAccordion,
  YogaServicesOverview,
} from './components/HomeExperiences';
import { InquiriesDrawer } from './components/InquiriesDrawer';
import { KeyMetricsSection } from './components/KeyMetricsSection';
import { Navbar } from './components/Navbar';
import { PracticeLibrary } from './components/PracticeLibrary';
import { PracticeMatcher } from './components/PracticeMatcher';
import { SanctuaryScrollStory } from './components/SanctuaryScrollStory';
import { ScheduleSection } from './components/ScheduleSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  BUSINESS_PROGRAMS,
  COACHING_DISCIPLINES,
  MASTER_TEACHERS,
} from './data/vanvitaData';
import {
  ConciergeDraft,
  LiveScheduleClass,
  PageRoute,
  PracticeBlueprint,
  SavedInquiry,
} from './types/vanvita';

const STORAGE_KEY = 'vanvita_saved_inquiries_v1';
const VALID_PAGES: PageRoute[] = [
  'home',
  'online-wellness',
  'herway',
  'experts',
  'schedule',
  'business',
  'about',
  'concierge',
];

const LEGACY_HASH_MAP: Record<string, PageRoute> = {
  coaching: 'experts',
  library: 'online-wellness',
  retreats: 'business',
};

function loadSavedInquiries(): SavedInquiry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getInitialPageFromHash(): PageRoute {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (VALID_PAGES.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  if (LEGACY_HASH_MAP[hash]) {
    return LEGACY_HASH_MAP[hash];
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    getInitialPageFromHash()
  );
  const [savedInquiries, setSavedInquiries] = useState<SavedInquiry[]>(() =>
    loadSavedInquiries()
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pendingGuideId, setPendingGuideId] = useState<string | null>(null);
  const [conciergeDraft, setConciergeDraft] = useState<ConciergeDraft>({
    inquiryType: 'free-intro',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedInquiries));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [savedInquiries]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getInitialPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (page: PageRoute, scrollSelector?: string) => {
    setCurrentPage(page);
    const nextHash = page === 'home' ? '#home' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    if (scrollSelector) {
      window.setTimeout(() => {
        const el = document.querySelector(scrollSelector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookFreeIntro = (context?: string) => {
    setConciergeDraft({
      inquiryType: 'free-intro',
      contextLabel: context ? `Free Intro — ${context}` : 'Complimentary Free Intro Session',
      prefilledNotes: context
        ? `Interested in starting with a Free Intro session focused on ${context}.`
        : 'Would love to explore VANVITA Online Wellness with a Free Intro session.',
    });
    navigateTo('concierge', '#concierge');
  };

  const handleJoinHerWayPilot = () => {
    setConciergeDraft({
      inquiryType: 'herway-pilot',
      contextLabel: 'HerWAY — Supervised Postpartum Wellbeing Pilot',
      prefilledNotes:
        'Interested in joining the small supervised HerWAY postpartum wellbeing pilot cohort.',
    });
    navigateTo('concierge', '#concierge');
  };

  const handleBookScheduleClass = (classItem: LiveScheduleClass, timezoneLabel: string) => {
    setConciergeDraft({
      inquiryType: classItem.modality === 'HerWAY Pilot' ? 'herway-pilot' : 'free-intro',
      masterId: classItem.expertId,
      contextLabel: `Live Class — ${classItem.title} (${classItem.dayOfWeek})`,
      prefilledNotes: `Interested in joining "${classItem.title}" with ${classItem.expertName} (${classItem.dayOfWeek}, ${timezoneLabel}).`,
    });
    navigateTo('concierge', '#concierge');
  };

  const handleSelectDiscipline = (disciplineId: string, masterId: string) => {
    const discipline = COACHING_DISCIPLINES.find((d) => d.id === disciplineId);
    setConciergeDraft({
      inquiryType: 'consultation',
      disciplineId,
      masterId,
      contextLabel: discipline ? `One-to-One Coaching — ${discipline.title}` : undefined,
      prefilledNotes: discipline
        ? `Interested in ${discipline.title} (${discipline.cadence}).`
        : '',
    });
    navigateTo('concierge', '#concierge');
  };

  const handleSelectMaster = (masterId: string) => {
    const master = MASTER_TEACHERS.find((m) => m.id === masterId);
    const matchedDiscipline = COACHING_DISCIPLINES.find(
      (d) => d.recommendedMasterId === masterId
    );
    setConciergeDraft({
      inquiryType: 'consultation',
      disciplineId: matchedDiscipline?.id || COACHING_DISCIPLINES[0].id,
      masterId: master?.id || MASTER_TEACHERS[0].id,
      contextLabel: master
        ? `Meet Our Expert — ${master.name} (${master.baseCity})`
        : undefined,
      prefilledNotes: master
        ? `Requesting a one-to-one wellbeing intro with ${master.name}.`
        : '',
    });
    navigateTo('concierge', '#concierge');
  };

  const handleBookFromLibrary = (masterId: string, guideTitle: string) => {
    const master = MASTER_TEACHERS.find((m) => m.id === masterId);
    const matchedDiscipline = COACHING_DISCIPLINES.find(
      (d) => d.recommendedMasterId === masterId
    );
    setConciergeDraft({
      inquiryType: 'free-intro',
      disciplineId: matchedDiscipline?.id || COACHING_DISCIPLINES[0].id,
      masterId,
      contextLabel: `Recorded Library & Live Intro — ${guideTitle}`,
      prefilledNotes: `Inspired by "${guideTitle}" in the VANVITA Recorded Library. Would like to explore live guidance with ${master?.name || 'a VANVITA teacher'}.`,
    });
    navigateTo('concierge', '#concierge');
  };

  const handleApplyBlueprint = (blueprint: PracticeBlueprint) => {
    const master = MASTER_TEACHERS.find((m) => m.id === blueprint.recommendedMasterId);
    setConciergeDraft({
      inquiryType: 'consultation',
      disciplineId: blueprint.recommendedDisciplineId,
      masterId: blueprint.recommendedMasterId,
      contextLabel: `Personal Wellbeing Plan — ${blueprint.programTitle}`,
      prefilledNotes: `Matched Plan: ${blueprint.programTitle}. Cadence: ${blueprint.weeklyCadence}. Breathwork: ${blueprint.breathworkProtocol}. Teacher: ${master?.name || 'VANVITA Faculty'}.`,
    });
    navigateTo('concierge', '#concierge');
  };

  const handleRequestBusinessProposal = (programId: string, summaryNotes: string) => {
    const program = BUSINESS_PROGRAMS.find((p) => p.id === programId);
    setConciergeDraft({
      inquiryType: 'business-program',
      businessProgramId: program?.id || BUSINESS_PROGRAMS[0].id,
      contextLabel: program
        ? `For Business — ${program.title}`
        : 'Corporate Burnout & Retreat Briefing',
      prefilledNotes: summaryNotes,
    });
    navigateTo('concierge', '#concierge');
  };

  const handleSubmitInquiry = (inquiry: SavedInquiry, replacingId?: string) => {
    setSavedInquiries((prev) => {
      if (replacingId) {
        return prev.map((item) => (item.id === replacingId ? inquiry : item));
      }
      return [inquiry, ...prev];
    });
    setConciergeDraft({ inquiryType: inquiry.inquiryType });
  };

  const handleReschedule = (inquiry: SavedInquiry) => {
    setIsDrawerOpen(false);
    setConciergeDraft({
      inquiryType: inquiry.inquiryType,
      contextLabel: `Rescheduling ${inquiry.referenceCode} — ${inquiry.subjectTitle}`,
      prefilledNotes: inquiry.notes,
      reschedulingInquiryId: inquiry.id,
    });
    navigateTo('concierge', '#concierge');
  };

  const handleCancelInquiry = (id: string) => {
    setSavedInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item))
    );
  };

  const activeInquiryCount = savedInquiries.filter((i) => i.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-[#F7FAF6] text-[#18241C] flex flex-col relative">
      <ScrollProgressBar />

      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        onBusinessClick={() => navigateTo('business')}
        onBookClick={() => handleBookFreeIntro()}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="page-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <SanctuaryScrollStory
                onBookFreeIntro={() => handleBookFreeIntro()}
                onNavigate={(page) => navigateTo(page)}
                activeInquiryCount={activeInquiryCount}
                onOpenInquiries={() => setIsDrawerOpen(true)}
              />

              <KeyMetricsSection
                onExploreSchedule={() => navigateTo('schedule')}
                onBookFreeIntro={() => handleBookFreeIntro()}
              />

              <YogaServicesOverview
                onExploreOnlineWellness={() => navigateTo('online-wellness')}
                onExploreSchedule={() => navigateTo('schedule')}
                onExploreHerWay={() => navigateTo('herway')}
                onExploreBusiness={() => navigateTo('business')}
                onBookFreeIntro={handleBookFreeIntro}
                onSelectDiscipline={handleSelectDiscipline}
              />

              <PracticeLibrary
                previewMode
                onViewAllLibrary={() => navigateTo('online-wellness')}
                onBookWithMaster={handleBookFromLibrary}
              />

              <HerWaySection
                previewMode
                onExploreHerWay={() => navigateTo('herway')}
                onJoinPilot={handleJoinHerWayPilot}
              />

              <BusinessSection
                previewMode
                onExploreFullBusiness={() => navigateTo('business')}
                onRequestProposal={handleRequestBusinessProposal}
              />

              <TestimonialsSection onSelectMaster={handleSelectMaster} />

              <ConsultationConcierge
                draft={conciergeDraft}
                onClearDraftContext={() =>
                  setConciergeDraft((prev) => ({ inquiryType: prev.inquiryType }))
                }
                savedInquiries={savedInquiries}
                onSubmitInquiry={handleSubmitInquiry}
                onOpenInquiries={() => setIsDrawerOpen(true)}
              />

              <InteractiveFaqAccordion />
            </motion.div>
          )}

          {currentPage === 'online-wellness' && (
            <motion.div
              key="page-online-wellness"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <YogaServicesOverview
                onExploreOnlineWellness={() => navigateTo('online-wellness')}
                onExploreSchedule={() => navigateTo('schedule')}
                onExploreHerWay={() => navigateTo('herway')}
                onExploreBusiness={() => navigateTo('business')}
                onBookFreeIntro={handleBookFreeIntro}
                onSelectDiscipline={handleSelectDiscipline}
              />

              <PracticeLibrary
                initialGuideId={pendingGuideId}
                onClearInitialGuide={() => setPendingGuideId(null)}
                onBookWithMaster={handleBookFromLibrary}
              />

              <PracticeMatcher
                onApplyBlueprint={handleApplyBlueprint}
                onExploreRetreat={() => navigateTo('business')}
              />
            </motion.div>
          )}

          {currentPage === 'herway' && (
            <motion.div
              key="page-herway"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <HerWaySection onJoinPilot={handleJoinHerWayPilot} />

              <TestimonialsSection onSelectMaster={handleSelectMaster} />

              <InteractiveFaqAccordion />
            </motion.div>
          )}

          {currentPage === 'experts' && (
            <motion.div
              key="page-experts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <CoachingSection
                onSelectDiscipline={handleSelectDiscipline}
                onSelectMaster={handleSelectMaster}
              />

              <PracticeMatcher
                onApplyBlueprint={handleApplyBlueprint}
                onExploreRetreat={() => navigateTo('business')}
              />
            </motion.div>
          )}

          {currentPage === 'schedule' && (
            <motion.div
              key="page-schedule"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <ScheduleSection onBookClass={handleBookScheduleClass} />

              <ConsultationConcierge
                draft={conciergeDraft}
                onClearDraftContext={() =>
                  setConciergeDraft((prev) => ({ inquiryType: prev.inquiryType }))
                }
                savedInquiries={savedInquiries}
                onSubmitInquiry={handleSubmitInquiry}
                onOpenInquiries={() => setIsDrawerOpen(true)}
              />
            </motion.div>
          )}

          {currentPage === 'business' && (
            <motion.div
              key="page-business"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <BusinessSection onRequestProposal={handleRequestBusinessProposal} />

              <TestimonialsSection onSelectMaster={handleSelectMaster} />

              <InteractiveFaqAccordion />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="page-about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <AboutSection
                onBookFreeIntro={() => handleBookFreeIntro()}
                onExploreExperts={() => navigateTo('experts')}
              />

              <TestimonialsSection onSelectMaster={handleSelectMaster} />

              <InteractiveFaqAccordion />
            </motion.div>
          )}

          {currentPage === 'concierge' && (
            <motion.div
              key="page-concierge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-20 sm:pt-24"
            >
              <TestimonialsSection onSelectMaster={handleSelectMaster} />

              <ConsultationConcierge
                draft={conciergeDraft}
                onClearDraftContext={() =>
                  setConciergeDraft((prev) => ({ inquiryType: prev.inquiryType }))
                }
                savedInquiries={savedInquiries}
                onSubmitInquiry={handleSubmitInquiry}
                onOpenInquiries={() => setIsDrawerOpen(true)}
              />

              <InteractiveFaqAccordion />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={(page) => navigateTo(page)} />

      <InquiriesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        inquiries={savedInquiries}
        onReschedule={handleReschedule}
        onCancelInquiry={handleCancelInquiry}
      />
    </div>
  );
}
