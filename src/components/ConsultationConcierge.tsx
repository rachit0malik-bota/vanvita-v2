import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarCheck2,
  CheckCircle2,
  Globe,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  BUSINESS_PROGRAMS,
  COACHING_DISCIPLINES,
  CONSULTATION_UTC_HOURS,
  GLOBAL_TIMEZONES,
  MASTER_TEACHERS,
  RETREAT_RESIDENCIES,
} from '../data/vanvitaData';
import {
  ConciergeDraft,
  InquiryType,
  SavedInquiry,
  TimezoneOption,
} from '../types/vanvita';
import { RevealOnScroll, SectionEntrance } from './RevealOnScroll';
import { VanvitaLogo } from './VanvitaLogo';

interface ConsultationConciergeProps {
  draft: ConciergeDraft;
  onClearDraftContext: () => void;
  savedInquiries: SavedInquiry[];
  onSubmitInquiry: (inquiry: SavedInquiry, replacingId?: string) => void;
  onOpenInquiries: () => void;
}

function getBrowserTimezone(): TimezoneOption {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = GLOBAL_TIMEZONES.find((tz) => tz.iana === detected);
    if (match) return match;
    const cityLabel = detected.split('/').pop()?.replace(/_/g, ' ') || 'Local Time';
    return {
      id: 'local',
      city: `${cityLabel} (Local)`,
      regionLabel: 'Detected',
      iana: detected,
    };
  } catch {
    return GLOBAL_TIMEZONES[1];
  }
}

function buildUpcomingDates(daysCount = 7): Date[] {
  const dates: Date[] = [];
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  for (let i = 1; i <= daysCount; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatInTimezone(
  date: Date,
  iana: string,
  options: Intl.DateTimeFormatOptions
): string {
  try {
    return new Intl.DateTimeFormat('en-US', { ...options, timeZone: iana }).format(date);
  } catch {
    return date.toUTCString();
  }
}

export function ConsultationConcierge({
  draft,
  onClearDraftContext,
  savedInquiries,
  onSubmitInquiry,
  onOpenInquiries,
}: ConsultationConciergeProps) {
  const detectedLocalTz = useMemo(() => getBrowserTimezone(), []);
  const timezoneOptions = useMemo(() => {
    const hasLocal = GLOBAL_TIMEZONES.some((tz) => tz.iana === detectedLocalTz.iana);
    return hasLocal ? GLOBAL_TIMEZONES : [detectedLocalTz, ...GLOBAL_TIMEZONES];
  }, [detectedLocalTz]);

  const upcomingDates = useMemo(() => buildUpcomingDates(7), []);

  const [selectedTz, setSelectedTz] = useState<TimezoneOption>(detectedLocalTz);
  const [nowClock, setNowClock] = useState<Date>(() => new Date());
  const [inquiryType, setInquiryType] = useState<InquiryType>(draft.inquiryType);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>(
    draft.disciplineId || COACHING_DISCIPLINES[0].id
  );
  const [selectedMasterId, setSelectedMasterId] = useState<string>(
    draft.masterId || MASTER_TEACHERS[0].id
  );
  const [selectedRetreatId, setSelectedRetreatId] = useState<string>(
    draft.retreatId || RETREAT_RESIDENCIES[0].id
  );
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(
    draft.suiteId || RETREAT_RESIDENCIES[0].suites[0].id
  );
  const [selectedBusinessProgramId, setSelectedBusinessProgramId] = useState<string>(
    draft.businessProgramId || BUSINESS_PROGRAMS[0].id
  );
  const [selectedDateIso, setSelectedDateIso] = useState<string>(
    upcomingDates[0].toISOString().slice(0, 10)
  );
  const [selectedSlotUtcIso, setSelectedSlotUtcIso] = useState<string>('');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recentConfirmation, setRecentConfirmation] = useState<SavedInquiry | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setNowClock(new Date()), 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setInquiryType(draft.inquiryType);
    if (draft.disciplineId) setSelectedDisciplineId(draft.disciplineId);
    if (draft.masterId) setSelectedMasterId(draft.masterId);
    if (draft.retreatId) {
      setSelectedRetreatId(draft.retreatId);
      const ret = RETREAT_RESIDENCIES.find((r) => r.id === draft.retreatId);
      if (draft.suiteId) {
        setSelectedSuiteId(draft.suiteId);
      } else if (ret) {
        setSelectedSuiteId(ret.suites[0].id);
      }
    }
    if (draft.businessProgramId) {
      setSelectedBusinessProgramId(draft.businessProgramId);
    }
    if (draft.prefilledNotes !== undefined) {
      setNotes(draft.prefilledNotes);
    }
    setRecentConfirmation(null);
  }, [draft]);

  const [selectedProgramFocus, setSelectedProgramFocus] = useState<string>(
    'Live Group Sessions (Yoga, Meditation & Breathwork)'
  );
  const [herWayStage, setHerWayStage] = useState<string>('0–3 Months Postpartum (Gentle Breath & Rest)');

  const activeRetreat =
    RETREAT_RESIDENCIES.find((r) => r.id === selectedRetreatId) || RETREAT_RESIDENCIES[0];

  const bookedSlotsSet = useMemo(() => {
    return new Set(
      savedInquiries
        .filter(
          (inq) =>
            inq.status === 'confirmed' && inq.id !== draft.reschedulingInquiryId
        )
        .map((inq) => inq.slotUtcIso)
    );
  }, [savedInquiries, draft.reschedulingInquiryId]);

  const timeSlotsForDay = useMemo(() => {
    const [year, month, day] = selectedDateIso.split('-').map(Number);
    return CONSULTATION_UTC_HOURS.map((utcHour) => {
      const slotDate = new Date(Date.UTC(year, month - 1, day, utcHour, 0, 0));
      const utcIso = slotDate.toISOString();
      const localLabel = formatInTimezone(slotDate, selectedTz.iana, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const localDayShift = formatInTimezone(slotDate, selectedTz.iana, {
        weekday: 'short',
        day: 'numeric',
      });
      return {
        utcIso,
        localLabel,
        localDayShift,
        isBooked: bookedSlotsSet.has(utcIso),
      };
    });
  }, [selectedDateIso, selectedTz.iana, bookedSlotsSet]);

  useEffect(() => {
    const stillValid = timeSlotsForDay.some(
      (s) => s.utcIso === selectedSlotUtcIso && !s.isBooked
    );
    if (!stillValid) {
      const firstOpen = timeSlotsForDay.find((s) => !s.isBooked);
      setSelectedSlotUtcIso(firstOpen ? firstOpen.utcIso : '');
    }
  }, [timeSlotsForDay, selectedSlotUtcIso]);

  const liveLocalClock = formatInTimezone(nowClock, selectedTz.iana, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });

  const activeInquiryCount = savedInquiries.filter((i) => i.status === 'confirmed').length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!clientName.trim() || clientName.trim().length < 2) {
      nextErrors.clientName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail.trim())) {
      nextErrors.clientEmail = 'Please enter a valid email address.';
    }
    if (!selectedSlotUtcIso) {
      nextErrors.slot = 'Please select an available time slot.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const slotDate = new Date(selectedSlotUtcIso);
    const formattedLocalDate = formatInTimezone(slotDate, selectedTz.iana, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formattedLocalTime = formatInTimezone(slotDate, selectedTz.iana, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    });

    const discipline = COACHING_DISCIPLINES.find((d) => d.id === selectedDisciplineId);
    const master = MASTER_TEACHERS.find((m) => m.id === selectedMasterId);
    const suite = activeRetreat.suites.find((s) => s.id === selectedSuiteId);
    const businessProgram = BUSINESS_PROGRAMS.find((b) => b.id === selectedBusinessProgramId);

    const subjectTitle =
      inquiryType === 'free-intro'
        ? `Free Intro Session — ${selectedProgramFocus}`
        : inquiryType === 'herway-pilot'
          ? `HerWAY Supervised Pilot (${herWayStage})`
          : inquiryType === 'retreat-hold'
            ? activeRetreat.title
            : inquiryType === 'business-program'
              ? businessProgram?.title || 'Corporate Burnout & Retreat Briefing'
              : discipline?.title || 'One-to-One Wellbeing Coaching';

    const referenceCode = `VV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: SavedInquiry = {
      id: draft.reschedulingInquiryId || `inq-${Date.now()}`,
      referenceCode,
      inquiryType,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      timezoneIana: selectedTz.iana,
      timezoneCity: selectedTz.city,
      dateIso: selectedDateIso,
      slotUtcIso: selectedSlotUtcIso,
      formattedLocalDate,
      formattedLocalTime,
      subjectTitle,
      preferredMasterName: master?.name || 'Any Available VANVITA Teacher',
      suiteName: inquiryType === 'retreat-hold' ? suite?.name : undefined,
      notes: notes.trim(),
      status: 'confirmed',
      createdAtIso: new Date().toISOString(),
    };

    onSubmitInquiry(newInquiry, draft.reschedulingInquiryId);
    setRecentConfirmation(newInquiry);
    setClientName('');
    setClientEmail('');
    setNotes('');
  };

  const getConfirmationHeading = (type: InquiryType) => {
    switch (type) {
      case 'free-intro':
        return 'Free Intro Session Confirmed';
      case 'herway-pilot':
        return 'HerWAY Pilot Intro Confirmed';
      case 'business-program':
        return 'Corporate Wellbeing Briefing Confirmed';
      case 'retreat-hold':
        return 'India Retreat Inquiry Confirmed';
      default:
        return 'One-to-One Session Confirmed';
    }
  };

  const getSubmitLabel = () => {
    if (draft.reschedulingInquiryId) return 'Confirm Updated Time';
    switch (inquiryType) {
      case 'free-intro':
        return 'Book Free Intro Session';
      case 'herway-pilot':
        return 'Request HerWAY Pilot Call';
      case 'business-program':
        return 'Confirm Corporate Briefing';
      case 'retreat-hold':
        return 'Confirm Retreat Inquiry';
      default:
        return 'Confirm 1-on-1 Intake';
    }
  };

  return (
    <SectionEntrance id="concierge" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Faded dark-orange & morning foliage atmospheric halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/4 w-[460px] h-[460px] rounded-full bg-[#B84D1D]/11 blur-[115px] animate-blob-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[460px] h-[460px] rounded-full bg-[#D7ECD9]/75 blur-[110px] animate-blob-slow-reverse"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center mb-12">
            {/* Deep pine rounded-square emblem with two-leaf V Vanvita logo */}
            <div
              aria-hidden="true"
              className="w-14 h-14 rounded-2xl bg-[#18241C] border border-[#B84D1D]/30 flex items-center justify-center mx-auto mb-6 ember-card-shadow"
            >
              <VanvitaLogo size={30} inverted />
            </div>

            <p className="text-[14px] font-medium text-[#963B14] mb-3">
              Contact &amp; Booking Desk · Europe &amp; USA Time Zones
            </p>
            <h2 className="text-[38px] md:text-[54px] font-normal leading-[1.08] tracking-[-0.025em] text-[#18241C] mb-4">
              Your wellness, guided on{' '}
              <span className="font-cursive text-[52px] md:text-[68px] text-[#B84D1D] font-normal leading-none">
                your
              </span>{' '}
              time.
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#526458] max-w-xl mx-auto">
              Book a complimentary intro session, one-to-one coaching call, HerWAY pilot welcome,
              or corporate burnout-prevention briefing—automatically shown in your local clock.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#526458]">
              <span className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full border border-[#DDE7DC]">
                <Globe className="w-4 h-4 text-[#B84D1D]" />
                <span>{selectedTz.city}:</span>
                <span className="tabular-nums-mono text-[#18241C] font-medium">
                  {liveLocalClock}
                </span>
              </span>

              {activeInquiryCount > 0 && (
                <button
                  type="button"
                  onClick={onOpenInquiries}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#18241C] bg-white border border-[#B84D1D]/30 hover:border-[#B84D1D] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <CalendarCheck2 className="w-4 h-4 text-[#B84D1D]" />
                  <span>
                    My Bookings (<span className="tabular-nums-mono">{activeInquiryCount}</span>)
                  </span>
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="bg-white/95 backdrop-blur-md border border-[#DDE7DC] rounded-[2.5rem] ember-card-shadow p-7 md:p-10">
            {draft.contextLabel && (
              <div className="mb-8 px-5 py-3.5 bg-[#F8EDE6] border border-[#B84D1D]/20 rounded-full flex items-center justify-between gap-4 text-[13px]">
                <div className="truncate">
                  <span className="text-[#963B14] mr-2 font-medium">Selected pathway:</span>
                  <span className="font-medium text-[#18241C]">{draft.contextLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={onClearDraftContext}
                  aria-label="Clear pre-filled selection"
                  className="inline-flex items-center gap-1 text-[#963B14] hover:text-[#18241C] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <X className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            )}

            {recentConfirmation && (
              <div
                role="status"
                className="mb-8 p-6 bg-[#18241C] text-[#F7FAF6] rounded-[2rem] border border-[#B84D1D]/35 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[13px] text-[#E6A47E]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{getConfirmationHeading(recentConfirmation.inquiryType)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums-mono">{recentConfirmation.referenceCode}</span>
                  </div>
                  <p className="text-[22px] font-medium leading-snug">
                    {recentConfirmation.subjectTitle}
                    {recentConfirmation.suiteName ? ` — ${recentConfirmation.suiteName}` : ''}
                  </p>
                  <p className="text-[13px] text-[#F7FAF6]/80">
                    {recentConfirmation.formattedLocalDate} at{' '}
                    <span className="tabular-nums-mono">
                      {recentConfirmation.formattedLocalTime}
                    </span>{' '}
                    ({recentConfirmation.timezoneCity}) · Sent to {recentConfirmation.clientEmail}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenInquiries}
                  className="px-6 py-3 text-[13px] font-medium bg-[#B84D1D] text-[#F7FAF6] hover:bg-[#963B14] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-center"
                >
                  Manage Bookings
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <label className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      01. How Can We Support You?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1.5 bg-[#EBF3EA] rounded-[1.5rem] sm:rounded-full">
                      {(
                        [
                          { id: 'free-intro', label: 'Free Intro' },
                          { id: 'consultation', label: '1-on-1' },
                          { id: 'herway-pilot', label: 'HerWAY' },
                          { id: 'business-program', label: 'For Business' },
                        ] as Array<{ id: InquiryType; label: string }>
                      ).map((tabOption) => {
                        const isSelected =
                          inquiryType === tabOption.id ||
                          (inquiryType === 'retreat-hold' && tabOption.id === 'business-program');
                        return (
                          <button
                            key={tabOption.id}
                            type="button"
                            onClick={() => setInquiryType(tabOption.id)}
                            className={`relative py-2.5 px-2 text-[12px] sm:text-[13px] font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                              isSelected
                                ? 'text-[#F7FAF6]'
                                : 'text-[#526458] hover:text-[#18241C]'
                            }`}
                          >
                            {isSelected && (
                              <motion.span
                                layoutId="conciergePurposePill"
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-[#18241C] rounded-full"
                              />
                            )}
                            <span className="relative z-10">{tabOption.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <label
                        htmlFor="timezone-select"
                        className="text-[13px] font-medium text-[#18241C]"
                      >
                        02. Your Time Zone (Europe &amp; USA)
                      </label>
                      <span className="text-[12px] text-[#963B14]">
                        Live clock sync
                      </span>
                    </div>

                    <select
                      id="timezone-select"
                      value={selectedTz.iana}
                      onChange={(e) => {
                        const next = timezoneOptions.find((tz) => tz.iana === e.target.value);
                        if (next) setSelectedTz(next);
                      }}
                      className="w-full px-5 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none mb-3"
                    >
                      {timezoneOptions.map((tz) => (
                        <option key={tz.iana} value={tz.iana}>
                          {tz.city} — {tz.iana}
                        </option>
                      ))}
                    </select>

                    <div className="flex flex-wrap gap-1.5">
                      {GLOBAL_TIMEZONES.slice(0, 6).map((tz) => {
                        const isActive = selectedTz.iana === tz.iana;
                        return (
                          <button
                            key={tz.id}
                            type="button"
                            onClick={() => setSelectedTz(tz)}
                            className={`px-3.5 py-1.5 text-[12px] rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                              isActive
                                ? 'border-[#18241C] bg-[#18241C] text-[#F7FAF6]'
                                : 'border-[#DDE7DC] bg-white text-[#526458] hover:text-[#18241C] hover:border-[#B84D1D]/40'
                            }`}
                          >
                            {tz.city}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      03. Preferred Date
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {upcomingDates.map((dateObj) => {
                        const iso = dateObj.toISOString().slice(0, 10);
                        const isSelected = iso === selectedDateIso;
                        const weekday = formatInTimezone(dateObj, 'UTC', { weekday: 'short' });
                        const dayNum = formatInTimezone(dateObj, 'UTC', { day: '2-digit' });
                        const monthShort = formatInTimezone(dateObj, 'UTC', { month: 'short' });

                        return (
                          <button
                            key={iso}
                            type="button"
                            onClick={() => setSelectedDateIso(iso)}
                            className={`py-2.5 px-1.5 rounded-2xl border text-center transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-[#18241C] bg-[#18241C] text-[#F7FAF6]'
                                : 'border-[#DDE7DC] bg-[#F7FAF6] text-[#18241C] hover:bg-[#F8EDE6]'
                            }`}
                          >
                            <span
                              className={`block text-[11px] ${
                                isSelected ? 'text-[#F7FAF6]/75' : 'text-[#526458]'
                              }`}
                            >
                              {weekday}
                            </span>
                            <span className="tabular-nums-mono block text-[15px] font-medium my-0.5">
                              {dayNum}
                            </span>
                            <span
                              className={`block text-[11px] ${
                                isSelected ? 'text-[#E6A47E]' : 'text-[#6F8275]'
                              }`}
                            >
                              {monthShort}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[13px] font-medium text-[#18241C] mb-2.5">
                      04. Live Session Window ({selectedTz.city})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlotsForDay.map((slot) => {
                        const isSelected = slot.utcIso === selectedSlotUtcIso;
                        return (
                          <button
                            key={slot.utcIso}
                            type="button"
                            disabled={slot.isBooked}
                            onClick={() => setSelectedSlotUtcIso(slot.utcIso)}
                            className={`py-2.5 px-3 rounded-2xl border text-left transition-colors ${
                              slot.isBooked
                                ? 'border-[#DDE7DC] bg-[#EBF3EA]/50 text-[#8FA395] line-through cursor-not-allowed'
                                : isSelected
                                  ? 'border-[#B84D1D] bg-[#F8EDE6] text-[#18241C] cursor-pointer'
                                  : 'border-[#DDE7DC] bg-[#F7FAF6] text-[#18241C] hover:border-[#B84D1D]/50 cursor-pointer'
                            }`}
                          >
                            <span className="tabular-nums-mono block text-[13px] font-medium whitespace-nowrap">
                              {slot.localLabel}
                            </span>
                            <span className="block text-[11px] mt-0.5 text-[#526458]">
                              {slot.isBooked ? 'Reserved' : slot.localDayShift}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.slot && (
                      <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#9E3B33]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.slot}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-6 space-y-5 lg:border-l lg:border-[#EBF3EA] lg:pl-10">
                  {inquiryType === 'free-intro' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="intro-focus-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Intro Focus
                        </label>
                        <select
                          id="intro-focus-select"
                          value={selectedProgramFocus}
                          onChange={(e) => setSelectedProgramFocus(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          <option value="Live Group Sessions (Yoga, Meditation & Breathwork)">
                            Live Group Sessions
                          </option>
                          <option value="7 / 21 / 30-Day Guided Challenges">
                            7 / 21 / 30-Day Challenges
                          </option>
                          <option value="4 to 12-Week Structured Programmes">
                            4 to 12-Week Programmes
                          </option>
                          <option value="Recorded Library & Membership">
                            Recorded Library &amp; Membership
                          </option>
                          <option value="One-to-One Personal Coaching">
                            One-to-One Coaching
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="intro-master-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Preferred Teacher
                        </label>
                        <select
                          id="intro-master-select"
                          value={selectedMasterId}
                          onChange={(e) => setSelectedMasterId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {MASTER_TEACHERS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.baseCity})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : inquiryType === 'herway-pilot' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="herway-stage-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Postpartum Stage
                        </label>
                        <select
                          id="herway-stage-select"
                          value={herWayStage}
                          onChange={(e) => setHerWayStage(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          <option value="0–3 Months Postpartum (Gentle Breath & Rest)">
                            0–3 Months Postpartum
                          </option>
                          <option value="3–9 Months Postpartum (Mindful Mobility)">
                            3–9 Months Postpartum
                          </option>
                          <option value="9+ Months (Daily Energy & Rhythm)">
                            9+ Months Postpartum
                          </option>
                          <option value="Expecting Mother (Joining Next Cohort)">
                            Expecting · Next Cohort
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="herway-teacher-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          HerWAY Pathway Guide
                        </label>
                        <select
                          id="herway-teacher-select"
                          value={selectedMasterId}
                          onChange={(e) => setSelectedMasterId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {MASTER_TEACHERS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.baseCity})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : inquiryType === 'consultation' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="discipline-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Primary Focus
                        </label>
                        <select
                          id="discipline-select"
                          value={selectedDisciplineId}
                          onChange={(e) => setSelectedDisciplineId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {COACHING_DISCIPLINES.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.index}. {d.shortTitle}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="master-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Preferred Expert
                        </label>
                        <select
                          id="master-select"
                          value={selectedMasterId}
                          onChange={(e) => setSelectedMasterId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {MASTER_TEACHERS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.baseCity})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : inquiryType === 'business-program' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="business-program-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Corporate Programme
                        </label>
                        <select
                          id="business-program-select"
                          value={selectedBusinessProgramId}
                          onChange={(e) => setSelectedBusinessProgramId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {BUSINESS_PROGRAMS.map((bp) => (
                            <option key={bp.id} value={bp.id}>
                              {bp.index}. {bp.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="business-master-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Advisory Lead
                        </label>
                        <select
                          id="business-master-select"
                          value={selectedMasterId}
                          onChange={(e) => setSelectedMasterId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {MASTER_TEACHERS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.baseCity})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="retreat-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Partner Retreat
                        </label>
                        <select
                          id="retreat-select"
                          value={selectedRetreatId}
                          onChange={(e) => {
                            const nextId = e.target.value;
                            setSelectedRetreatId(nextId);
                            const ret = RETREAT_RESIDENCIES.find((r) => r.id === nextId);
                            if (ret) setSelectedSuiteId(ret.suites[0].id);
                          }}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {RETREAT_RESIDENCIES.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.title} ({r.season})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="suite-select"
                          className="block text-[13px] font-medium text-[#18241C] mb-2"
                        >
                          Accommodation Preference
                        </label>
                        <select
                          id="suite-select"
                          value={selectedSuiteId}
                          onChange={(e) => setSelectedSuiteId(e.target.value)}
                          className="w-full px-4 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-full focus:border-[#B84D1D] focus:outline-none"
                        >
                          {activeRetreat.suites.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} — ${s.priceUsd.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="client-name"
                        className="block text-[13px] font-medium text-[#18241C] mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value);
                          if (errors.clientName) {
                            setErrors((prev) => ({ ...prev, clientName: '' }));
                          }
                        }}
                        placeholder="Claire Lindholm"
                        aria-invalid={Boolean(errors.clientName)}
                        className={`w-full px-5 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border rounded-full focus:outline-none ${
                          errors.clientName
                            ? 'border-[#9E3B33]'
                            : 'border-[#DDE7DC] focus:border-[#B84D1D]'
                        }`}
                      />
                      {errors.clientName && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#9E3B33]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.clientName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="client-email"
                        className="block text-[13px] font-medium text-[#18241C] mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => {
                          setClientEmail(e.target.value);
                          if (errors.clientEmail) {
                            setErrors((prev) => ({ ...prev, clientEmail: '' }));
                          }
                        }}
                        placeholder="claire@studio-europe.eu"
                        aria-invalid={Boolean(errors.clientEmail)}
                        className={`w-full px-5 py-3 text-[14px] text-[#18241C] bg-[#F7FAF6] border rounded-full focus:outline-none ${
                          errors.clientEmail
                            ? 'border-[#9E3B33]'
                            : 'border-[#DDE7DC] focus:border-[#B84D1D]'
                        }`}
                      />
                      {errors.clientEmail && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#9E3B33]">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.clientEmail}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="client-notes"
                      className="block text-[13px] font-medium text-[#18241C] mb-2"
                    >
                      Wellbeing Goals &amp; Schedule Notes (Optional)
                    </label>
                    <textarea
                      id="client-notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share your daily rhythm, preferred Europe or USA hours, team size, or any movement preferences."
                      className="w-full px-5 py-3.5 text-[14px] text-[#18241C] bg-[#F7FAF6] border border-[#DDE7DC] rounded-[1.5rem] focus:border-[#B84D1D] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-[12px] text-[#526458] leading-relaxed max-w-xs">
                      Personal, practical wellbeing guidance. No obligation on free intro calls.
                    </p>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center px-8 py-3.5 text-[14px] font-medium text-[#F7FAF6] bg-[#B84D1D] hover:bg-[#963B14] rounded-full ember-card-shadow transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer min-h-[48px]"
                    >
                      {getSubmitLabel()}
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </RevealOnScroll>
      </div>
    </SectionEntrance>
  );
}
