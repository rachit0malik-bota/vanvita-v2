export type PageRoute =
  | 'home'
  | 'online-wellness'
  | 'herway'
  | 'experts'
  | 'schedule'
  | 'business'
  | 'about'
  | 'concierge';

export type InquiryType =
  | 'free-intro'
  | 'consultation'
  | 'herway-pilot'
  | 'business-program'
  | 'retreat-hold';

export type PracticeCategory =
  | 'Breathwork'
  | 'Somatic Vinyasa'
  | 'Restorative'
  | 'Travel Recovery';

export interface LiveScheduleClass {
  id: string;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  utcHour: number;
  utcMinute: number;
  durationMinutes: number;
  title: string;
  modality: 'Yoga' | 'Meditation' | 'Breathwork' | 'HerWAY Pilot';
  expertId: string;
  expertName: string;
  level: string;
  windowLabel: 'EU Morning' | 'EU Evening · US East Morning' | 'US Midday · EU Evening';
}

export interface OnlineProgramme {
  id: string;
  durationTag: string;
  title: string;
  summary: string;
  format: string;
  idealFor: string;
  tint: 'eucalyptus' | 'ember' | 'sunbeam';
}

export interface BusinessProgram {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  deliverables: string[];
  outcomeMetric: string;
  cadence: string;
  startingRate: string;
  tint: 'eucalyptus' | 'fern' | 'sunbeam';
}

export interface PracticeCueStep {
  timestamp: string;
  phase: 'Inhale' | 'Hold' | 'Exhale' | 'Settle';
  instruction: string;
}

export interface PracticeGuide {
  id: string;
  title: string;
  subtitle: string;
  category: PracticeCategory;
  durationMinutes: number;
  durationBucket: '5-12 min' | '15-20 min' | '25-30 min';
  level: 'All Levels' | 'Restorative' | 'Intermediate';
  masterId: string;
  masterName: string;
  accentTint: 'sage' | 'lavender' | 'blush';
  breathRatio: { inhale: number; hold: number; exhale: number };
  breathRatioLabel: string;
  description: string;
  anatomicalNote: string;
  imageUrl: string;
  imageAlt: string;
  cues: PracticeCueStep[];
}

export interface DailyScenario {
  id: string;
  timestamp: string;
  city: string;
  prompt: string;
  hoverAccent: 'coral' | 'sage' | 'lavender';
  linkedGuideId: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CoachingDiscipline {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  methodology: string;
  sessionFormat: string;
  cadence: string;
  idealFor: string;
  retainerRange: string;
  recommendedMasterId: string;
  imageUrl: string;
  imageAlt: string;
  tint: 'sage' | 'lavender' | 'blush';
}

export interface MasterTeacher {
  id: string;
  name: string;
  role: string;
  baseCity: string;
  timezone: string;
  lineage: string;
  languages: string[];
  specialties: string[];
  yearsExperience: number;
  availabilityNote: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
}

export interface ClientTestimonial {
  id: string;
  metric: string;
  timeframe: string;
  entryDate: string;
  quote: string;
  signatureName: string;
  clientName: string;
  role: string;
  organization: string;
  location: string;
  masterName: string;
  disciplineTag: string;
  rotation: 'left' | 'right';
  tint: 'sage' | 'lavender' | 'blush';
}

export interface PracticeAnswers {
  intention: 'restoration' | 'alignment' | 'energy' | 'breathwork' | null;
  rhythm: 'frequent-travel' | 'intense-desk' | 'sabbatical' | 'steady-home' | null;
  intensity: 'gentle' | 'balanced' | 'disciplined' | null;
  delivery: 'virtual' | 'in-residence' | 'hybrid' | null;
}

export interface PracticeBlueprint {
  programTitle: string;
  rationale: string;
  recommendedDisciplineId: string;
  recommendedMasterId: string;
  weeklyCadence: string;
  breathworkProtocol: string;
  suggestedRetreatId: string;
  sessionDuration: string;
}

export interface RetreatDay {
  dayNumber: string;
  title: string;
  morning: { time: string; activity: string };
  midday: { time: string; activity: string };
  evening: { time: string; activity: string };
}

export interface SuiteTier {
  id: string;
  name: string;
  areaSqm: number;
  occupancy: string;
  remaining: number;
  priceUsd: number;
  highlights: string;
}

export type RetreatFocus = 'Restoration' | 'Breathwork' | 'Longevity';

export interface RetreatResidency {
  id: string;
  title: string;
  location: string;
  country: string;
  season: string;
  dates: string;
  durationNights: number;
  maxGuests: number;
  focus: RetreatFocus;
  summary: string;
  architecturalNote: string;
  leadMasterId: string;
  imageUrl: string;
  imageAlt: string;
  itinerary: RetreatDay[];
  suites: SuiteTier[];
}

export interface TimezoneOption {
  id: string;
  city: string;
  regionLabel: string;
  iana: string;
}

export interface ConciergeDraft {
  inquiryType: InquiryType;
  disciplineId?: string;
  masterId?: string;
  retreatId?: string;
  suiteId?: string;
  businessProgramId?: string;
  contextLabel?: string;
  prefilledNotes?: string;
  reschedulingInquiryId?: string;
}

export interface SavedInquiry {
  id: string;
  referenceCode: string;
  inquiryType: InquiryType;
  clientName: string;
  clientEmail: string;
  timezoneIana: string;
  timezoneCity: string;
  dateIso: string;
  slotUtcIso: string;
  formattedLocalDate: string;
  formattedLocalTime: string;
  subjectTitle: string;
  preferredMasterName: string;
  suiteName?: string;
  notes: string;
  status: 'confirmed' | 'cancelled';
  createdAtIso: string;
}
