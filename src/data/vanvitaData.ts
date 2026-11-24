import {
  BusinessProgram,
  ClientTestimonial,
  CoachingDiscipline,
  DailyScenario,
  FaqItem,
  LiveScheduleClass,
  MasterTeacher,
  OnlineProgramme,
  PracticeAnswers,
  PracticeBlueprint,
  PracticeGuide,
  RetreatResidency,
  TimezoneOption,
} from '../types/vanvita';

export const DAWN_SANCTUARY_IMAGE =
  '/assets/aistudio/hero_burgundy_rose_first_frame.jpg';

export const HERWAY_SANCTUARY_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-114.jpg_d8c0a38e.jpeg';

export const INDIA_RETREAT_IMAGE =
  '/src/assets/images/india_retreat_courtyard_1795193271907.jpg';

export const BUSINESS_SANCTUARY_IMAGE =
  '/assets/aistudio/DANA_JOGA_STRAUTMAL_I-109_websize.jpg_3f80f65c.jpeg';

export const ABOUT_LEAD_PORTRAIT_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-165.jpg_32e94bc1.jpeg';

export const ABOUT_MALA_HANDS_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-27.jpg_4b3dfa2e.jpeg';

export const SOUND_BOWL_WATER_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-281.jpg_6d6ba041.jpeg';

export const PAVILION_BOWLS_PROFILE_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-313.jpg_761bd277.jpeg';

export const GROUNDING_HANDS_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-177.jpg_8a990aea.jpeg';

export const MEADOW_SKY_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-45.jpg_2798447e.jpeg';

export const LAVENDER_PAVILION_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-14.jpg_88c865e2.jpeg';

export const GARDEN_BREEZE_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-94.jpg_6dbf3e23.jpeg';

export const HERO_FLYIN_VIDEO =
  '/assets/aistudio/hero_burgundy_rose_scroll.mp4';

export const HERO_LEGACY_FLYIN_VIDEO =
  '/assets/aistudio/hero_flyin_scrub.mp4';

export const ONLINE_PAVILION_VIDEO =
  '/assets/aistudio/Tibetan_singing_bowls_in_pavilion_8233a7bd_2fd2a891.mp4';

export const HERWAY_STEAM_VIDEO =
  '/assets/aistudio/Herbal_steam_resting_on_tray_06f2b534_a161ab7a.mp4';

export const INDIA_RETREAT_VIDEO =
  '/assets/aistudio/Yoga_retreat_courtyard_at_sunrise_69510259_bea4ad85.mp4';

export interface SanctuaryVideoItem {
  id: string;
  src: string;
  poster: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
}

export const SANCTUARY_WIDESCREEN_VIDEOS: SanctuaryVideoItem[] = [
  {
    id: 'forest-sanctuary-glide',
    src: '/assets/aistudio/hero_flyin_scrub.mp4',
    poster: '/assets/aistudio/hero_flyin_first_frame.jpg',
    tabLabel: 'Forest Sanctuary Glide',
    eyebrow: 'Architectural Flight · Pine Sanctuary',
    title: 'Aerial approach gliding through morning pine hills toward the timber yoga pavilion',
  },
  {
    id: 'singing-bowls-meadow',
    src: '/assets/aistudio/VID-20260816-WA0056_7960c5fc.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-264.jpg_b54840e7.jpeg',
    tabLabel: 'Live Singing Bowls',
    eyebrow: 'Live Sound & Breath · Open Meadow Pavilion',
    title: 'Bronze and crystal singing bowls guiding calm daily presence',
  },
  {
    id: 'pavilion-morning-stillness',
    src: ONLINE_PAVILION_VIDEO,
    poster: '/assets/aistudio/Joga_Strautmali_08082026-25.jpg_c0f51dd5.jpeg',
    tabLabel: 'Morning Pavilion',
    eyebrow: 'Online Wellness Atmosphere · Dawn Light',
    title: 'Soft morning breeze, sheer linen, and quiet space to breathe',
  },
  {
    id: 'pavilion-resonance',
    src: '/assets/aistudio/VID-20260816-WA0031_f67f54c9.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-313.jpg_761bd277.jpeg',
    tabLabel: 'Pavilion Sound',
    eyebrow: 'Restorative Resonance · Timber Shala',
    title: 'Unhurried acoustic stillness and gentle respiratory pacing',
  },
  {
    id: 'guided-welcome',
    src: '/assets/aistudio/VID-20260816-WA0045_7e61a05e.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-165.jpg_32e94bc1.jpeg',
    tabLabel: 'Guided Welcome',
    eyebrow: 'Personal Wellbeing · Live Europe & USA',
    title: 'Human-led guidance shaped around real schedules and seasons',
  },
];

export interface SanctuaryReelItem {
  id: string;
  src: string;
  poster: string;
  label: string;
  caption: string;
}

export const SANCTUARY_REEL_VIDEOS: SanctuaryReelItem[] = [
  {
    id: 'reel-breath-presence',
    src: '/assets/aistudio/VID-20260816-WA0037_7f3767a5.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-281.jpg_6d6ba041.jpeg',
    label: 'Breath & Presence',
    caption: 'Mindful breath cues beside hand-hammered bronze bowls',
  },
  {
    id: 'reel-open-meadow',
    src: '/assets/aistudio/VID-20260816-WA0033_8ea4e850.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-25.jpg_c0f51dd5.jpeg',
    label: 'Open-Air Sound Bath',
    caption: 'Morning harmonic resonance overlooking the sunlit meadow',
  },
  {
    id: 'reel-sanctuary-breeze',
    src: '/assets/aistudio/VID-20260816-WA0047_32eaafa2.mp4',
    poster: '/assets/aistudio/Joga_Strautmali_08082026-94.jpg_6dbf3e23.jpeg',
    label: 'Unhurried Stillness',
    caption: 'Quiet sanctuary details swaying gently in the summer breeze',
  },
];

export const ONLINE_PROGRAMMES: OnlineProgramme[] = [
  {
    id: 'prog-7day',
    durationTag: '7-Day Reset',
    title: 'Morning Breath & Mobility Foundation',
    summary:
      'Seven concise 20-minute live and recorded morning practices designed to build a realistic daily rhythm before work begins.',
    format: 'Live EU/US morning check-ins + recorded replays',
    idealFor: 'Busy professionals wanting an immediate, grounded start.',
    tint: 'ember',
  },
  {
    id: 'prog-21day',
    durationTag: '21-Day Challenge',
    title: 'Steady Energy & Nervous System Calm',
    summary:
      'Three weeks of progressive breathwork, guided meditation, and mindful movement to ease daily tension and support evening rest.',
    format: '3 live sessions weekly + daily 10-min audio guidance',
    idealFor: 'Individuals seeking consistent habits and calmer evenings.',
    tint: 'eucalyptus',
  },
  {
    id: 'prog-30day',
    durationTag: '30-Day Pathway',
    title: 'Posture, Breath & Sustainable Stamina',
    summary:
      'A structured month pairing live group yoga, weekly expert Q&As, and curated library practices for balanced strength and ease.',
    format: 'Live group classes + weekly check-in + full library',
    idealFor: 'Members ready to establish a full personal wellbeing routine.',
    tint: 'sunbeam',
  },
  {
    id: 'prog-12week',
    durationTag: '4 to 12 Weeks',
    title: 'Guided Personal Transformation Cohorts',
    summary:
      'Small-group or 1-on-1 progressive pathways spanning 4, 8, or 12 weeks—combining live coaching, mindful accountability, and recorded support.',
    format: 'Weekly live coaching + personalised home schedule',
    idealFor: 'Dedicated members seeking lasting seasonal structure.',
    tint: 'ember',
  },
];

export const LIVE_SCHEDULE_CLASSES: LiveScheduleClass[] = [
  {
    id: 'cls-mon-1',
    dayOfWeek: 'Mon',
    utcHour: 7,
    utcMinute: 0,
    durationMinutes: 45,
    title: 'Dawn Somatic Yoga & Spine Awakening',
    modality: 'Yoga',
    expertId: 'ananya-deshmukh',
    expertName: 'Ananya Deshmukh',
    level: 'All Levels',
    windowLabel: 'EU Morning',
  },
  {
    id: 'cls-mon-2',
    dayOfWeek: 'Mon',
    utcHour: 13,
    utcMinute: 0,
    durationMinutes: 30,
    title: 'Midday Breathwork Reset (Nadi Shodhana)',
    modality: 'Breathwork',
    expertId: 'kenji-takahashi',
    expertName: 'Kenji Takahashi',
    level: 'All Levels',
    windowLabel: 'EU Evening · US East Morning',
  },
  {
    id: 'cls-tue-1',
    dayOfWeek: 'Tue',
    utcHour: 16,
    utcMinute: 30,
    durationMinutes: 45,
    title: 'HerWAY Gentle Postpartum Breath & Reconnection',
    modality: 'HerWAY Pilot',
    expertId: 'clara-lindqvist',
    expertName: 'Clara Lindqvist',
    level: 'Supervised Pilot',
    windowLabel: 'US Midday · EU Evening',
  },
  {
    id: 'cls-wed-1',
    dayOfWeek: 'Wed',
    utcHour: 12,
    utcMinute: 30,
    durationMinutes: 45,
    title: 'Mindful Vinyasa for Desk-Bound Shoulders',
    modality: 'Yoga',
    expertId: 'mateo-valdes',
    expertName: 'Mateo Valdes',
    level: 'All Levels',
    windowLabel: 'EU Evening · US East Morning',
  },
  {
    id: 'cls-thu-1',
    dayOfWeek: 'Thu',
    utcHour: 17,
    utcMinute: 0,
    durationMinutes: 35,
    title: 'Guided Meditation & Evening Unwinding',
    modality: 'Meditation',
    expertId: 'kenji-takahashi',
    expertName: 'Kenji Takahashi',
    level: 'All Levels',
    windowLabel: 'US Midday · EU Evening',
  },
  {
    id: 'cls-fri-1',
    dayOfWeek: 'Fri',
    utcHour: 15,
    utcMinute: 0,
    durationMinutes: 45,
    title: 'HerWAY Mindful Rest & Gentle Mobility Circle',
    modality: 'HerWAY Pilot',
    expertId: 'clara-lindqvist',
    expertName: 'Clara Lindqvist',
    level: 'Supervised Pilot',
    windowLabel: 'US Midday · EU Evening',
  },
  {
    id: 'cls-sat-1',
    dayOfWeek: 'Sat',
    utcHour: 14,
    utcMinute: 0,
    durationMinutes: 60,
    title: 'Weekend Restorative Flow & Stillness',
    modality: 'Yoga',
    expertId: 'ananya-deshmukh',
    expertName: 'Ananya Deshmukh',
    level: 'All Levels',
    windowLabel: 'EU Evening · US East Morning',
  },
];

export const HERWAY_PILLARS = [
  {
    index: '01',
    title: 'Small Supervised Pilot',
    detail:
      'Launching as an intimate, capped cohort led closely by our specialist wellbeing instructors so every new mother is seen, heard, and supported at her own pace.',
  },
  {
    index: '02',
    title: 'Gentle Breath & Grounding',
    detail:
      'Accessible 10-to-30 minute breathwork and nervous-system settling rituals designed to fit naturally around feeding schedules and quiet nap windows.',
  },
  {
    index: '03',
    title: 'Unhurried Movement & Posture',
    detail:
      'Supportive, prop-assisted mobility and gentle body reconnection focused on comfort, ease of carrying, and mindful everyday posture—never rushed.',
  },
  {
    index: '04',
    title: 'Europe & USA Friendly Rhythm',
    detail:
      'Live sessions timed for European afternoons and US mornings, paired with bite-sized recorded audio and video companions whenever rest calls.',
  },
];

export const BUSINESS_PROGRAMS: BusinessProgram[] = [
  {
    id: 'burnout-prevention-pilot',
    index: '01',
    title: 'Burnout-prevention programme',
    subtitle: 'Structured paid pilot transitioning into quarterly or annual corporate contracts',
    summary:
      'A practical, expert-led wellbeing system built for high-demand teams across Europe and the USA. Begin with a measurable 6-to-8 week paid pilot before scaling into a quarterly or annual partnership.',
    deliverables: [
      'Paid pilot launch with baseline team wellbeing check-ins',
      'Live weekly breathwork, yoga & meditation across EU & US zones',
      'Seamless transition into quarterly or annual team contracts',
    ],
    outcomeMetric: 'Designed for sustained team clarity, focus & healthier work rhythms',
    cadence: 'Paid pilot → Quarterly or Annual',
    startingRate: 'Paid pilot from $4,800',
    tint: 'eucalyptus',
  },
  {
    id: 'workshops-seminars',
    index: '02',
    title: 'Workshops and seminars',
    subtitle: 'Interactive live sessions on stress resilience, breathwork & mindful desk habits',
    summary:
      'Engaging 60-to-90 minute live seminars and half-day workshops tailored for leadership offsites, wellness weeks, and remote global teams seeking practical daily tools.',
    deliverables: [
      'Live expert-led interactive workshops (online or on-site)',
      'Practical breathwork & desk-mobility playbooks for attendees',
      'Recorded library access for hybrid and travelling staff',
    ],
    outcomeMetric: 'Actionable 5-to-15 minute tools teams actually use between meetings',
    cadence: 'Single seminar or seasonal series',
    startingRate: 'From $2,200 / workshop',
    tint: 'sunbeam',
  },
  {
    id: 'india-corporate-retreats',
    index: '03',
    title: 'Retreats in India',
    subtitle: 'Curated executive & team wellbeing retreats hosted through licensed partners in India',
    summary:
      'Immersive multi-day retreats in serene Indian sanctuaries—delivered in collaboration with fully licensed local hospitality and wellness partners, pairing classical yoga and breathwork with unhurried strategic reflection.',
    deliverables: [
      'Hosted in India exclusively through vetted, licensed retreat partners',
      'Daily expert-led yoga, pranayama, meditation & nourishing cuisine',
      'End-to-end itinerary planning for executive and leadership cohorts',
    ],
    outcomeMetric: 'Authentic Indian sanctuary settings with licensed partner governance',
    cadence: '4 to 7 nights · Seasonal departures',
    startingRate: 'Custom corporate quotation',
    tint: 'fern',
  },
];

export const HERO_LIVING_SANCTUARY_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-165.jpg_32e94bc1.jpeg';

export const HERO_CEDAR_SANCTUARY_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-45.jpg_2798447e.jpeg';

export const COACHING_BREATHWORK_IMAGE =
  '/assets/aistudio/DANA_JOGA_STRAUTMAL_I-109_websize.jpg_3f80f65c.jpeg';

export const LIBRARY_NADI_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-264.jpg_b54840e7.jpeg';

export const LIBRARY_SOMATIC_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-293.jpg_2ce97b4d.jpeg';

export const LIBRARY_RESTORATIVE_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-132.jpg_6ec73d03.jpeg';

export const LIBRARY_TRAVEL_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-25.jpg_c0f51dd5.jpeg';

export const LIBRARY_NIDRA_IMAGE =
  '/assets/aistudio/Joga_Strautmali_08082026-343.jpg_dbf18600.jpeg';

export const GLOBAL_METRICS = [
  { value: 'EU & US', label: 'Live Timezone Schedule' },
  { value: '7–30d', label: 'Guided Programmes' },
  { value: '1:1 & Live', label: 'Personal & Group Format' },
  { value: 'India', label: 'Licensed Retreat Partners' },
];

export const DAILY_SCENARIOS: DailyScenario[] = [
  {
    id: 'sc-1',
    timestamp: '06:30 · Kyoto',
    city: 'Kyoto',
    prompt: 'Before your inbox opens, soften the breath and lengthen the spine.',
    hoverAccent: 'coral',
    linkedGuideId: 'guide-nadi-shodhana',
  },
  {
    id: 'sc-2',
    timestamp: '10:15 · London',
    city: 'London',
    prompt: 'Between board sessions, release cervical tension in twelve quiet minutes.',
    hoverAccent: 'sage',
    linkedGuideId: 'guide-somatic-spine',
  },
  {
    id: 'sc-3',
    timestamp: '15:40 · In-Transit',
    city: 'Geneva → NYC',
    prompt: 'Stepping off a red-eye flight, recalibrate your circadian rhythm softly.',
    hoverAccent: 'lavender',
    linkedGuideId: 'guide-jetlag-reset',
  },
  {
    id: 'sc-4',
    timestamp: '19:20 · Zurich',
    city: 'Zurich',
    prompt: 'Unfold over warm bolsters and let your nervous system exhale the day.',
    hoverAccent: 'coral',
    linkedGuideId: 'guide-bolster-unwinding',
  },
  {
    id: 'sc-5',
    timestamp: '22:10 · New York',
    city: 'New York',
    prompt: 'Drift past racing thoughts into slow-wave rest with guided twilight nidra.',
    hoverAccent: 'lavender',
    linkedGuideId: 'guide-twilight-nidra',
  },
];

export const PRACTICE_GUIDES: PracticeGuide[] = [
  {
    id: 'guide-nadi-shodhana',
    title: 'Nadi Shodhana for autonomic clarity',
    subtitle: 'Alternate-nostril respiratory balance to quiet cognitive static',
    category: 'Breathwork',
    durationMinutes: 9,
    durationBucket: '5-12 min',
    level: 'All Levels',
    masterId: 'kenji-takahashi',
    masterName: 'Kenji Takahashi',
    accentTint: 'sage',
    breathRatio: { inhale: 4, hold: 4, exhale: 6 },
    breathRatioLabel: '4s inhale · 4s hold · 6s exhale',
    description:
      'A classical, unhurried pranayama progression taught by Kenji Takahashi to shift the nervous system from sympathetic alertness into composed focus before demanding meetings.',
    anatomicalNote:
      'Keep the right elbow soft against the ribs and allow the diaphragm to expand laterally without lifting the collarbones.',
    imageUrl: LIBRARY_NADI_IMAGE,
    imageAlt: 'Seated alternate nostril pranayama in a sunlit alabaster room with soft botanical shadows',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Rest your sit bones on a folded linen cushion and soften the jaw and temples.',
      },
      {
        timestamp: '01:30',
        phase: 'Inhale',
        instruction: 'Close the right nostril gently; inhale smoothly through the left for four counts.',
      },
      {
        timestamp: '04:00',
        phase: 'Hold',
        instruction: 'Pause effortlessly at the crown of the breath for four counts—zero throat tension.',
      },
      {
        timestamp: '06:30',
        phase: 'Exhale',
        instruction: 'Release through the right nostril for six slow counts, emptying the lower ribs.',
      },
    ],
  },
  {
    id: 'guide-somatic-spine',
    title: 'Somatic spinal wave & rib opening',
    subtitle: 'Fluid morning articulation to counter long seated hours',
    category: 'Somatic Vinyasa',
    durationMinutes: 18,
    durationBucket: '15-20 min',
    level: 'All Levels',
    masterId: 'ananya-deshmukh',
    masterName: 'Ananya Deshmukh',
    accentTint: 'blush',
    breathRatio: { inhale: 5, hold: 2, exhale: 5 },
    breathRatioLabel: '5s inhale · 2s pause · 5s exhale',
    description:
      'Ananya’s signature breath-led vinyasa study moves segment by segment through the thoracic spine and hip flexors, building supple poise without joint compression.',
    anatomicalNote:
      'Initiate every extension from the sternum rather than hinging in the lower lumbar vertebrae.',
    imageUrl: LIBRARY_SOMATIC_IMAGE,
    imageAlt: 'Sunlit morning somatic spinal flow on a woven linen mat beside sheer curtains',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Ground through the palms and knees, letting the shoulder blades glide wide.',
      },
      {
        timestamp: '04:30',
        phase: 'Inhale',
        instruction: 'Draw the breastbone forward along the mat as you inhale for five steady counts.',
      },
      {
        timestamp: '10:00',
        phase: 'Exhale',
        instruction: 'Ripple back through the lower ribs, lengthening the back of the neck on the exhale.',
      },
      {
        timestamp: '15:00',
        phase: 'Settle',
        instruction: 'Conclude in seated stillness, observing warmth along the entire spinal column.',
      },
    ],
  },
  {
    id: 'guide-bolster-unwinding',
    title: 'Prop-supported thoracic restoration',
    subtitle: 'Zero-effort bolster sequence for deep fascial release',
    category: 'Restorative',
    durationMinutes: 26,
    durationBucket: '25-30 min',
    level: 'Restorative',
    masterId: 'clara-lindqvist',
    masterName: 'Clara Lindqvist',
    accentTint: 'lavender',
    breathRatio: { inhale: 4, hold: 2, exhale: 7 },
    breathRatioLabel: '4s inhale · 2s pause · 7s exhale',
    description:
      'Designed with clinical biomechanics insight by Clara Lindqvist, this sequence uses stacked linen bolsters and folded wool blankets to dissolve shoulder-girdle holding patterns.',
    anatomicalNote:
      'Elevate the head slightly higher than the heart with a folded blanket so the cervical curve remains neutral.',
    imageUrl: LIBRARY_RESTORATIVE_IMAGE,
    imageAlt: 'Stacked cream linen yoga bolsters and pale sage wool blanket beside dusk windows',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Arrange two bolsters lengthwise and drape a folded wool blanket over the upper edge.',
      },
      {
        timestamp: '06:00',
        phase: 'Inhale',
        instruction: 'Recline gently so the arms open wide in cactus position; invite breath into the upper chest.',
      },
      {
        timestamp: '14:00',
        phase: 'Exhale',
        instruction: 'Let the elbows grow heavy toward the floor with every seven-count exhalation.',
      },
      {
        timestamp: '22:00',
        phase: 'Settle',
        instruction: 'Roll softly to the right side for sixty seconds before rising unhurriedly.',
      },
    ],
  },
  {
    id: 'guide-jetlag-reset',
    title: 'Suite arrival circadian decompression',
    subtitle: 'Concise hotel-room movement and breath for long-haul arrivals',
    category: 'Travel Recovery',
    durationMinutes: 12,
    durationBucket: '5-12 min',
    level: 'All Levels',
    masterId: 'mateo-valdes',
    masterName: 'Mateo Valdes',
    accentTint: 'sage',
    breathRatio: { inhale: 4, hold: 2, exhale: 6 },
    breathRatioLabel: '4s inhale · 2s pause · 6s exhale',
    description:
      'Mateo’s travel protocol restores hip circulation, hydrates stiff intervertebral discs, and anchors your internal clock to local daylight within twelve minutes of checking in.',
    anatomicalNote:
      'Practice facing natural window light during morning arrivals to reinforce healthy cortisol timing.',
    imageUrl: LIBRARY_TRAVEL_IMAGE,
    imageAlt: 'Calm traveler practicing morning seated breathwork inside a sunlit European boutique hotel suite',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Step onto your mat near the window, letting natural daylight meet closed eyelids.',
      },
      {
        timestamp: '03:00',
        phase: 'Inhale',
        instruction: 'Sweep the arms overhead in a slow arc, decompressing the psoas and ribcage.',
      },
      {
        timestamp: '07:00',
        phase: 'Exhale',
        instruction: 'Fold into a gentle seated twist to stimulate lymphatic circulation after cabin pressure.',
      },
      {
        timestamp: '10:30',
        phase: 'Settle',
        instruction: 'Close with six balanced breaths, grounding both feet on the floor.',
      },
    ],
  },
  {
    id: 'guide-twilight-nidra',
    title: 'Twilight yoga nidra for slow-wave sleep',
    subtitle: 'Systematic body scan and parasympathetic downshift',
    category: 'Restorative',
    durationMinutes: 28,
    durationBucket: '25-30 min',
    level: 'Restorative',
    masterId: 'kenji-takahashi',
    masterName: 'Kenji Takahashi',
    accentTint: 'lavender',
    breathRatio: { inhale: 4, hold: 0, exhale: 8 },
    breathRatioLabel: '4s inhale · 8s long exhale',
    description:
      'An evening audio-visual sanctuary guiding attention smoothly across the body so mental chatter dissolves naturally into deep, uninterrupted sleep.',
    anatomicalNote:
      'Place a bolster beneath the knees to allow the lower back to settle completely into the floor or bed.',
    imageUrl: LIBRARY_NIDRA_IMAGE,
    imageAlt: 'Peaceful twilight yoga nidra sanctuary corner with soft draped cream linen and muted lavender shadows',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Draw a soft blanket over your shoulders and let the heels turn gently outward.',
      },
      {
        timestamp: '07:00',
        phase: 'Inhale',
        instruction: 'Notice the quiet rise of the abdomen without trying to alter its natural pace.',
      },
      {
        timestamp: '16:00',
        phase: 'Exhale',
        instruction: 'Trace awareness from the right thumb across the collarbone down to the soles of the feet.',
      },
      {
        timestamp: '24:00',
        phase: 'Settle',
        instruction: 'Rest in the quiet space between thoughts, welcoming effortless sleep.',
      },
    ],
  },
  {
    id: 'guide-diaphragmatic-poise',
    title: '1-on-1 alignment & breath poise study',
    subtitle: 'Foundational posture mechanics for sustainable daily practice',
    category: 'Somatic Vinyasa',
    durationMinutes: 16,
    durationBucket: '15-20 min',
    level: 'Intermediate',
    masterId: 'ananya-deshmukh',
    masterName: 'Ananya Deshmukh',
    accentTint: 'blush',
    breathRatio: { inhale: 5, hold: 3, exhale: 6 },
    breathRatioLabel: '5s inhale · 3s hold · 6s exhale',
    description:
      'A close architectural look at how subtle shoulder-blade placement and pelvic neutrality transform simple seated and standing postures into lifelong vitality.',
    anatomicalNote:
      'Maintain a soft micro-bend in weight-bearing knees and align the ear canal directly over the shoulder joint.',
    imageUrl: COACHING_BREATHWORK_IMAGE,
    imageAlt: 'Private one-on-one posture and pranayama alignment guidance in a sunlit stone sanctuary',
    cues: [
      {
        timestamp: '00:00',
        phase: 'Settle',
        instruction: 'Establish tripod balance across the sit bones and crown of the head.',
      },
      {
        timestamp: '04:00',
        phase: 'Inhale',
        instruction: 'Expand 360 degrees through the lower ribcage while keeping the neck long.',
      },
      {
        timestamp: '09:30',
        phase: 'Hold',
        instruction: 'Suspend gently at peak expansion, sensing quiet structural buoyancy.',
      },
      {
        timestamp: '13:00',
        phase: 'Exhale',
        instruction: 'Draw the navel softly inward on a six-count exhale to stabilize the core.',
      },
    ],
  },
];

export const COACHING_DISCIPLINES: CoachingDiscipline[] = [
  {
    id: 'live-group-sessions',
    index: '01',
    title: 'Live group yoga, meditation & breathwork',
    shortTitle: 'Live Group Sessions',
    summary:
      'Small-group expert-led sessions scheduled thoughtfully for Europe and USA time zones—combining mindful movement, practical breathwork, and guided stillness.',
    methodology:
      'Interactive live classes where instructors observe posture, offer thoughtful variations, and help you build an unhurried weekly wellbeing habit.',
    sessionFormat: '30 to 60 min live online group sessions',
    cadence: 'Daily Europe & USA time slots',
    idealFor: 'Individuals wanting warm community structure and consistent live guidance.',
    retainerRange: 'Included in Membership · Free Intro',
    recommendedMasterId: 'ananya-deshmukh',
    imageUrl: LIBRARY_SOMATIC_IMAGE,
    imageAlt: 'Graceful somatic yoga practice on natural linen mat in sunlit studio',
    tint: 'blush',
  },
  {
    id: 'one-to-one-coaching',
    index: '02',
    title: 'One-to-one personal wellbeing coaching',
    shortTitle: '1-on-1 Coaching',
    summary:
      'Dedicated private yoga, breathwork, and meditation coaching calibrated to your daily energy, desk posture, and personal schedule across Europe and North America.',
    methodology:
      'Begins with a welcoming intake conversation, followed by tailored live private sessions and concise home practice notes adapted week by week.',
    sessionFormat: '45 or 60 min live 1-on-1 online',
    cadence: '1 to 3 private sessions weekly',
    idealFor: 'Founders, professionals, and individuals seeking completely personal guidance.',
    retainerRange: 'Flexible monthly coaching plans',
    recommendedMasterId: 'kenji-takahashi',
    imageUrl: LIBRARY_NADI_IMAGE,
    imageAlt: 'Seated alternate nostril breathwork in sunlit calm room',
    tint: 'sage',
  },
  {
    id: 'programmes-challenges',
    index: '03',
    title: 'Structured programmes & challenges',
    shortTitle: '7/21/30-Day & 4–12 Wk',
    summary:
      'Focused 7-day, 21-day, and 30-day wellbeing challenges alongside deeper 4-to-12 week guided pathways designed to turn intentions into steady daily rituals.',
    methodology:
      'Combines live milestone check-ins, clear weekly themes, and on-demand practice sequences so progress feels practical and sustainable.',
    sessionFormat: 'Live kickoffs + guided daily practices',
    cadence: '7 / 21 / 30 days or 4–12 weeks',
    idealFor: 'Anyone looking for clear structure, momentum, and measurable consistency.',
    retainerRange: 'Standalone or Membership access',
    recommendedMasterId: 'mateo-valdes',
    imageUrl: LIBRARY_TRAVEL_IMAGE,
    imageAlt: 'Calm morning breathwork and mobility practice in a sunlit room',
    tint: 'lavender',
  },
  {
    id: 'recorded-library-memberships',
    index: '04',
    title: 'Recorded library, free intro & memberships',
    shortTitle: 'Library & Memberships',
    summary:
      'Start with a complimentary free intro session, then enjoy unlimited access to our curated recorded library of yoga, breathwork, and evening rest sessions anytime.',
    methodology:
      'Bite-sized 8-to-30 minute studio-filmed practices organised by mood, time of day, and available minutes—ready whenever your schedule shifts.',
    sessionFormat: 'On-demand video & audio + live membership',
    cadence: 'Available 24/7 worldwide',
    idealFor: 'Busy schedules needing flexible wellbeing support between live sessions.',
    retainerRange: 'Start with a Free Intro Session',
    recommendedMasterId: 'clara-lindqvist',
    imageUrl: LIBRARY_RESTORATIVE_IMAGE,
    imageAlt: 'Restorative yoga linen bolsters and sage blanket in serene dusk light',
    tint: 'sage',
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'test-1',
    metric: 'Steadier Evenings & Rest',
    timeframe: '30-Day Breath & Calm Pathway',
    entryDate: 'October 14 · Zurich',
    quote:
      'Before VANVITA, busy weeks across London and Zurich left my mind racing well past midnight. Joining live evening breathwork and 1-on-1 coaching with Kenji gave me a practical, unhurried ritual I actually keep—even while travelling.',
    signatureName: 'Henrik Solberg',
    clientName: 'Henrik Solberg',
    role: 'Managing Partner',
    organization: 'Nordhavn Capital',
    location: 'Zurich & London',
    masterName: 'Kenji Takahashi',
    disciplineTag: '1-on-1 Coaching',
    rotation: 'left',
    tint: 'sage',
  },
  {
    id: 'test-2',
    metric: 'Gentle Daily Support',
    timeframe: 'HerWAY Postpartum Pilot',
    entryDate: 'November 02 · Boston',
    quote:
      'As a new mother, stepping onto a mat felt daunting until HerWAY. Clara kept every session warm, slow, and deeply respectful of our energy that day. Those thirty quiet minutes became the softest anchor of my week.',
    signatureName: 'Camille Laurent',
    clientName: 'Camille Laurent',
    role: 'Product Lead & New Mother',
    organization: 'HerWAY Pilot Member',
    location: 'Boston, USA',
    masterName: 'Clara Lindqvist',
    disciplineTag: 'HerWAY Pathway',
    rotation: 'right',
    tint: 'lavender',
  },
  {
    id: 'test-3',
    metric: '86% Weekly Team Participation',
    timeframe: '8-Week Corporate Burnout Pilot',
    entryDate: 'September 28 · New York',
    quote:
      'We started with VANVITA’s paid burnout-prevention pilot for our London and New York offices. Because the live sessions fit both time zones seamlessly, our teams stayed engaged every week and we moved straight to an annual partnership.',
    signatureName: 'Priya Menon',
    clientName: 'Priya Menon',
    role: 'People & Culture Director',
    organization: 'Studio Menon & Associates',
    location: 'New York & London',
    masterName: 'Mateo Valdes',
    disciplineTag: 'Corporate Wellbeing',
    rotation: 'left',
    tint: 'blush',
  },
  {
    id: 'test-4',
    metric: '21-Day Consistency Milestone',
    timeframe: 'Online Membership & Free Intro',
    entryDate: 'August 19 · London',
    quote:
      'The free intro session removed every hesitation. Ananya listened carefully to my routine and guided me into a 21-day morning mobility pathway that made daily movement feel genuinely welcoming rather than another chore.',
    signatureName: 'Julian Mercer',
    clientName: 'Julian Mercer',
    role: 'Creative Director',
    organization: 'Atelier Mercer',
    location: 'London, UK',
    masterName: 'Ananya Deshmukh',
    disciplineTag: 'Online Wellness',
    rotation: 'right',
    tint: 'sage',
  },
];

export const MASTER_TEACHERS: MasterTeacher[] = [
  {
    id: 'ananya-deshmukh',
    name: 'Ananya Deshmukh',
    role: 'Lead Instructor · Mindful Yoga & Alignment',
    baseCity: 'London',
    timezone: 'Europe/London',
    lineage: 'Classical Hatha, Vinyasa & Mindful Movement',
    languages: ['English', 'Hindi', 'French'],
    specialties: ['Live Group Yoga', '1-on-1 Coaching', 'India Retreat Host'],
    yearsExperience: 19,
    availabilityNote: 'Leading Europe & US East live sessions',
    bio: 'Trained for eight years in Pune and Mysore before teaching in London, Ananya guides individuals and teams through clear, sustainable movement and grounded daily awareness.',
    imageUrl: ABOUT_LEAD_PORTRAIT_IMAGE,
    imageAlt: 'VANVITA lead teacher smiling warmly in white linen inside the open timber pavilion',
  },
  {
    id: 'kenji-takahashi',
    name: 'Kenji Takahashi',
    role: 'Senior Guide · Breathwork & Meditation',
    baseCity: 'Zurich',
    timezone: 'Europe/Zurich',
    lineage: 'Classical Pranayama & Contemplative Stillness',
    languages: ['English', 'Japanese'],
    specialties: ['Breathwork', 'Guided Meditation', 'Evening Unwinding'],
    yearsExperience: 22,
    availabilityNote: 'Available for 1-on-1 & Corporate Workshops',
    bio: 'Kenji brings two decades of breathwork and meditation study into practical, accessible sessions that help busy minds find calm focus and steady evening rest.',
    imageUrl: PAVILION_BOWLS_PROFILE_IMAGE,
    imageAlt: 'Mindful sound meditation with bronze singing bowls inside the timber pavilion',
  },
  {
    id: 'clara-lindqvist',
    name: 'Clara Lindqvist',
    role: 'Lead Specialist · HerWAY & Restorative Wellbeing',
    baseCity: 'Stockholm & Zurich',
    timezone: 'Europe/Zurich',
    lineage: 'Restorative Yoga, Gentle Mobility & Postpartum Wellbeing',
    languages: ['English', 'German', 'Swedish'],
    specialties: ['HerWAY Postpartum Pilot', 'Prop-Supported Rest', 'Gentle Mobility'],
    yearsExperience: 16,
    availabilityNote: 'Leading the supervised HerWAY Pilot cohort',
    bio: 'Clara leads VANVITA’s HerWAY postpartum wellbeing pathway and restorative library, creating warm, unhurried spaces for new mothers and restorative practitioners.',
    imageUrl: HERWAY_SANCTUARY_IMAGE,
    imageAlt: 'Calm seated Baddha Konasana posture in white linen with soft sheer pavilion curtains',
  },
  {
    id: 'mateo-valdes',
    name: 'Mateo Valdes',
    role: 'Programme Lead · Corporate Wellbeing & Challenges',
    baseCity: 'New York',
    timezone: 'America/New_York',
    lineage: 'Viniyoga, Stress-Resilience Coaching & Workplace Wellbeing',
    languages: ['English', 'Spanish', 'Italian'],
    specialties: ['Burnout-Prevention Pilots', '7/21/30-Day Programmes', 'US Timezone Live'],
    yearsExperience: 14,
    availabilityNote: 'Leading US Morning & Corporate Pilot cohorts',
    bio: 'Specialising in practical workplace wellbeing and structured 7-to-30 day challenges, Mateo helps distributed European and American teams build sustainable energy habits.',
    imageUrl: SOUND_BOWL_WATER_IMAGE,
    imageAlt: 'Close-up of mindful water-filled bronze singing bowl practice in natural morning light',
  },
];

export const RETREAT_RESIDENCIES: RetreatResidency[] = [
  {
    id: 'kyoto-autumn',
    title: 'Kyoto Hinoki & Stillness Residency',
    location: 'Arashiyama Hills, Kyoto',
    country: 'Japan',
    season: 'Autumn 2026',
    dates: 'Nov 12 – Nov 17, 2026',
    durationNights: 5,
    maxGuests: 8,
    focus: 'Breathwork',
    summary:
      'Five unhurried nights inside a restored hinoki cedar compound overlooking moss gardens, centered on dawn pranayama, quiet walking meditation, and private 1:1 posture diagnostics.',
    architecturalNote:
      'Private shoji-screened cedar suites, mineral soaking tubs, and an open-verandah tatami shala reserved exclusively for eight guests.',
    leadMasterId: 'kenji-takahashi',
    imageUrl: '/src/assets/images/retreat_kyoto_pavilion_1795174084255.jpg',
    imageAlt: 'Secluded Kyoto hinoki cedar pavilion overlooking a misty moss garden',
    itinerary: [
      {
        dayNumber: 'Day 01',
        title: 'Arrival & Grounding',
        morning: { time: '14:00', activity: 'Private transfer from Kyoto Station & matcha welcome in the cedar courtyard' },
        midday: { time: '16:30', activity: 'Individual 45-minute respiratory baseline assessment with Kenji Takahashi' },
        evening: { time: '19:30', activity: 'Seasonal shojin kaiseki dinner followed by candlelit sound stillness' },
      },
      {
        dayNumber: 'Day 02',
        title: 'Breath & Autonomic Downshift',
        morning: { time: '06:45', activity: 'Dawn Nadi Shodhana and gentle spinal awakening on the moss verandah' },
        midday: { time: '13:00', activity: 'Private bamboo grove silent walk and mineral spring bath ritual' },
        evening: { time: '17:30', activity: 'Restorative bolster sequence for cervical and thoracic decompression' },
      },
      {
        dayNumber: 'Day 03',
        title: 'Precision & Quietude',
        morning: { time: '06:45', activity: 'Extended breath-led somatic vinyasa with individualized alignment cues' },
        midday: { time: '14:00', activity: 'Private 1:1 coaching consultation & architectural tea study' },
        evening: { time: '18:00', activity: 'Seated dhyana meditation and seasonal broth supper' },
      },
      {
        dayNumber: 'Day 04',
        title: 'Deep Integration',
        morning: { time: '07:00', activity: 'Full classical pranayama cadence and steady meditative movement' },
        midday: { time: '13:30', activity: 'Unscheduled afternoon for forest trails, journaling, or private bodywork' },
        evening: { time: '19:00', activity: 'Closing fireside dialogue on sustaining stillness in urban life' },
      },
      {
        dayNumber: 'Day 05',
        title: 'Departure Protocol',
        morning: { time: '07:15', activity: 'Closing practice & take-home 30-day respiratory cadence blueprint' },
        midday: { time: '10:30', activity: 'Unhurried breakfast and private chauffeur departures' },
        evening: { time: '13:00', activity: 'Optional private Kyoto temple garden architectural extension' },
      },
    ],
    suites: [
      {
        id: 'kyoto-moss-pavilion',
        name: 'Moss Garden Pavilion',
        areaSqm: 78,
        occupancy: 'Single or Double',
        remaining: 2,
        priceUsd: 9800,
        highlights: 'Private cedar soaking tub · Garden terrace · 2 private 1:1 sessions included',
      },
      {
        id: 'kyoto-verandah-suite',
        name: 'Hinoki Verandah Suite',
        areaSqm: 58,
        occupancy: 'Single Occupancy',
        remaining: 1,
        priceUsd: 7900,
        highlights: 'Maple canopy views · Tatami study alcove · 1 private 1:1 session included',
      },
    ],
  },
  {
    id: 'engadin-alpine',
    title: 'Engadin Alpine Longevity Sanctuary',
    location: 'Zuoz, Upper Engadin',
    country: 'Switzerland',
    season: 'Winter 2027',
    dates: 'Jan 21 – Jan 26, 2027',
    durationNights: 5,
    maxGuests: 10,
    focus: 'Longevity',
    summary:
      'High-altitude structural movement, thermal contrast recovery, and therapeutic restorative yoga inside a contemporary limestone and larch chalet.',
    architecturalNote:
      'Monolithic Swiss stone hearth room, panoramic alpine glass shala at 1,750m elevation, and private cedar sauna overlooking snow-dusted peaks.',
    leadMasterId: 'clara-lindqvist',
    imageUrl: '/src/assets/images/retreat_engadin_alpine_1795174090226.jpg',
    imageAlt: 'Swiss stone and larch wood alpine sanctuary looking onto snow-dusted mountain ridges',
    itinerary: [
      {
        dayNumber: 'Day 01',
        title: 'Altitude Acclimatization',
        morning: { time: '15:00', activity: 'Private arrival via St. Moritz / Samedan & herbal alpine infusion by the hearth' },
        midday: { time: '17:00', activity: 'Postural mobility screening and gentle altitude-adapted breathwork' },
        evening: { time: '19:30', activity: 'Anti-inflammatory mountain tasting menu' },
      },
      {
        dayNumber: 'Day 02',
        title: 'Spinal Decompression & Thermal Rest',
        morning: { time: '07:30', activity: 'Iyengar-informed structural alignment and hip-capsule mobility' },
        midday: { time: '13:30', activity: 'Guided snowshoe forest walk & Finnish sauna contrast protocol' },
        evening: { time: '17:30', activity: 'Prop-supported restorative yoga by candlelight' },
      },
      {
        dayNumber: 'Day 03',
        title: 'Isometric Strength & Fascia Release',
        morning: { time: '07:30', activity: 'Slow-tempo stability flow focused on posterior chain endurance' },
        midday: { time: '14:30', activity: '1:1 therapeutic sessions with Clara Lindqvist' },
        evening: { time: '18:15', activity: 'Guided yoga nidra for deep slow-wave sleep recovery' },
      },
      {
        dayNumber: 'Day 04',
        title: 'Endurance & Clarity',
        morning: { time: '07:30', activity: 'Integrated breath, joint articulation, and steady standing postures' },
        midday: { time: '13:00', activity: 'Quiet alpine terrace lunch & private myofascial bodywork' },
        evening: { time: '19:00', activity: 'Long-table winter hearth dinner and longevity protocol review' },
      },
      {
        dayNumber: 'Day 05',
        title: 'Homeward Continuity',
        morning: { time: '07:45', activity: 'Closing mobility ritual & personalized quarterly strength guide' },
        midday: { time: '11:00', activity: 'Brunch and coordinated private alpine transfers' },
        evening: { time: '14:00', activity: 'Direct transfer to Zurich Airport or Samedan private terminal' },
      },
    ],
    suites: [
      {
        id: 'engadin-ridge-loft',
        name: 'Alpine Ridge Stone Loft',
        areaSqm: 92,
        occupancy: 'Single or Double',
        remaining: 2,
        priceUsd: 11400,
        highlights: 'Wood-burning stone fireplace · Private terrace · 2 private 1:1 sessions',
      },
      {
        id: 'engadin-larch-chamber',
        name: 'Larch Valley Chamber',
        areaSqm: 62,
        occupancy: 'Single Occupancy',
        remaining: 3,
        priceUsd: 8600,
        highlights: 'Floor-to-ceiling valley glass · Heated travertine bath · 1 private 1:1 session',
      },
    ],
  },
  {
    id: 'paros-aegean',
    title: 'Paros Aegean Light & Restoration',
    location: 'Naoussa Hills, Paros',
    country: 'Greece',
    season: 'Spring 2027',
    dates: 'May 14 – May 19, 2027',
    durationNights: 5,
    maxGuests: 10,
    focus: 'Restoration',
    summary:
      'Sun-washed limestone colonnades above a quiet Aegean cove devoted to somatic vinyasa, circadian recalibration, and unhurried Mediterranean nourishment.',
    architecturalNote:
      'Hand-carved Cycladic stone arches, shaded coastal practice loggia, saltwater horizon pool, and organic olive grove walking paths.',
    leadMasterId: 'ananya-deshmukh',
    imageUrl: '/src/assets/images/retreat_paros_aegean_1795174087444.jpg',
    imageAlt: 'Minimalist Cycladic travertine limestone arches overlooking a calm dawn Aegean sea',
    itinerary: [
      {
        dayNumber: 'Day 01',
        title: 'Aegean Horizon Arrival',
        morning: { time: '14:30', activity: 'Private boat transfer to the estate & chilled wild thyme infusion' },
        midday: { time: '17:00', activity: 'Sunset decompression sequence under the travertine arches' },
        evening: { time: '20:00', activity: 'Estate-harvested olive oil and coastal vegetable dinner' },
      },
      {
        dayNumber: 'Day 02',
        title: 'Solar Rhythm & Somatic Flow',
        morning: { time: '07:00', activity: 'Dawn sea-breeze vinyasa focused on thoracic expansion and fluid pacing' },
        midday: { time: '13:00', activity: 'Saltwater cove swim and unhurried coastal lunch' },
        evening: { time: '18:00', activity: 'Slow exhalation pranayama as light settles over the Cyclades' },
      },
      {
        dayNumber: 'Day 03',
        title: 'Personal Alignment Immersion',
        morning: { time: '07:00', activity: 'Progressive standing balance and core integration practice' },
        midday: { time: '14:00', activity: 'Individual 60-minute biomechanics session with Ananya Deshmukh' },
        evening: { time: '18:30', activity: 'Restorative supine release and acoustic resonance' },
      },
      {
        dayNumber: 'Day 04',
        title: 'Coastal Stillness',
        morning: { time: '07:15', activity: 'Breath-led meditative flow overlooking the glassy morning sea' },
        midday: { time: '13:30', activity: 'Private wooden boat excursion to uninhabited rocky coves' },
        evening: { time: '19:30', activity: 'Candlelit courtyard harvest supper' },
      },
      {
        dayNumber: 'Day 05',
        title: 'Sustained Cadence',
        morning: { time: '07:30', activity: 'Final morning practice & customized 12-week home continuity plan' },
        midday: { time: '11:00', activity: 'Coastal breakfast and helicopter or ferry departure coordination' },
        evening: { time: '13:30', activity: 'Private escort to Paros National Airport' },
      },
    ],
    suites: [
      {
        id: 'paros-sea-pavilion',
        name: 'Horizon Limestone Pavilion',
        areaSqm: 84,
        occupancy: 'Single or Double',
        remaining: 1,
        priceUsd: 10200,
        highlights: 'Private plunge basin · Panoramic Aegean terrace · 2 private 1:1 sessions',
      },
      {
        id: 'paros-olive-suite',
        name: 'Olive Grove Stone Suite',
        areaSqm: 60,
        occupancy: 'Single Occupancy',
        remaining: 4,
        priceUsd: 7800,
        highlights: 'Shaded limestone courtyard · Outdoor rain shower · 1 private 1:1 session',
      },
    ],
  },
  {
    id: 'ubud-highland',
    title: 'Ubud Highland Circadian Reset',
    location: 'Payangan Ridge, Bali',
    country: 'Indonesia',
    season: 'Autumn 2027',
    dates: 'Sep 09 – Sep 14, 2027',
    durationNights: 5,
    maxGuests: 8,
    focus: 'Restoration',
    summary:
      'A deeply private five-night sanctuary above the misty Payangan valley uniting circadian recovery, volcanic mineral hydrotherapy, and breath-led movement.',
    architecturalNote:
      'Honed volcanic basalt reflecting pool, open-air teak practice pavilion suspended above highland forest canopy, and secluded garden villas.',
    leadMasterId: 'mateo-valdes',
    imageUrl: '/src/assets/images/retreat_ubud_highland_1795174088167.jpg',
    imageAlt: 'Highland Bali volcanic stone and teak pavilion with reflecting pool overlooking misty forest',
    itinerary: [
      {
        dayNumber: 'Day 01',
        title: 'Arrival & Jet-Lag Reset',
        morning: { time: '14:00', activity: 'VIP tarmac meet in Denpasar & private highland drive to Payangan' },
        midday: { time: '17:00', activity: 'Circadian decompression & gentle floor mobility by the reflecting pool' },
        evening: { time: '19:30', activity: 'Warming spiced broth and plant-forward highland dinner' },
      },
      {
        dayNumber: 'Day 02',
        title: 'Dawn Light & Nervous System Calm',
        morning: { time: '06:30', activity: 'First-light breathwork and fluid spinal mobility overlooking the mist' },
        midday: { time: '13:30', activity: 'Traditional Balinese herbal compress & unhurried reading time' },
        evening: { time: '17:30', activity: 'Supported yin and slow respiratory pacing' },
      },
      {
        dayNumber: 'Day 03',
        title: 'Energy Calibration',
        morning: { time: '06:30', activity: 'Structured Viniyoga flow tailored to sustained daytime energy' },
        midday: { time: '14:00', activity: '1:1 chronobiology & travel-practice workshop with Mateo Valdes' },
        evening: { time: '18:00', activity: 'Twilight stillness beside the basalt water basin' },
      },
      {
        dayNumber: 'Day 04',
        title: 'Canopy Integration',
        morning: { time: '06:45', activity: 'Full-spectrum somatic movement and pranayama sequence' },
        midday: { time: '13:00', activity: 'Guided highland ridge walk & organic cacao tea ceremony' },
        evening: { time: '19:00', activity: 'Closing lantern-lit dinner overlooking the valley' },
      },
      {
        dayNumber: 'Day 05',
        title: 'Return with Rhythm',
        morning: { time: '07:00', activity: 'Closing practice & individualized global travel routine handbook' },
        midday: { time: '11:00', activity: 'Unhurried breakfast and private transfers' },
        evening: { time: '14:00', activity: 'Chauffeur service to Denpasar international departures' },
      },
    ],
    suites: [
      {
        id: 'ubud-canopy-villa',
        name: 'Highland Canopy Pool Villa',
        areaSqm: 110,
        occupancy: 'Single or Double',
        remaining: 2,
        priceUsd: 9400,
        highlights: 'Private basalt lap pool · Valley verandah · 2 private 1:1 sessions',
      },
      {
        id: 'ubud-teak-pavilion',
        name: 'Teak Garden Pavilion',
        areaSqm: 72,
        occupancy: 'Single Occupancy',
        remaining: 2,
        priceUsd: 7400,
        highlights: 'Volcanic stone soaking bath · Forest study deck · 1 private 1:1 session',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What time zones do VANVITA Wellbeing live sessions cover?',
    answer:
      'Our live group classes, 1-on-1 coaching, and corporate sessions are thoughtfully scheduled to suit both Europe (GMT/BST & CET) and the USA (EST, CST & PST), with instant local timezone conversion on our Schedule and Contact pages.',
  },
  {
    id: 'faq-2',
    question: 'How does the Free Intro Session work?',
    answer:
      'Every new member is welcome to book a complimentary 25-minute live intro session. You can meet an expert, share your weekly rhythm and wellbeing goals, and explore whether live group sessions, a 7/21/30-day programme, or 1-on-1 coaching suits you best.',
  },
  {
    id: 'faq-3',
    question: 'What is HerWAY and who is the supervised pilot for?',
    answer:
      'HerWAY is VANVITA’s dedicated postpartum wellbeing pathway for new mothers. It begins as a small, closely supervised pilot focused on gentle breathwork, mindful rest, and unhurried movement—always framed as supportive everyday wellbeing alongside your personal care providers.',
  },
  {
    id: 'faq-4',
    question: 'How do Corporate Burnout programmes and Retreats in India work?',
    answer:
      'Organisations typically start with a focused paid burnout-prevention pilot before moving into quarterly or annual wellbeing contracts. For leadership teams seeking deeper renewal, our retreats in India are delivered exclusively through vetted, licensed local retreat partners.',
  },
];

export const GLOBAL_TIMEZONES: TimezoneOption[] = [
  { id: 'ldn', city: 'London (UK)', regionLabel: 'Europe', iana: 'Europe/London' },
  { id: 'zrh', city: 'Zurich / Berlin (CET)', regionLabel: 'Europe', iana: 'Europe/Zurich' },
  { id: 'ny', city: 'New York (EST)', regionLabel: 'USA', iana: 'America/New_York' },
  { id: 'chi', city: 'Chicago (CST)', regionLabel: 'USA', iana: 'America/Chicago' },
  { id: 'la', city: 'Los Angeles (PST)', regionLabel: 'USA', iana: 'America/Los_Angeles' },
  { id: 'ind', city: 'Bengaluru (IST)', regionLabel: 'India Retreats', iana: 'Asia/Kolkata' },
];

export const CONSULTATION_UTC_HOURS = [7, 9, 11, 13, 15, 17, 19, 21];

export function computePracticeBlueprint(answers: PracticeAnswers): PracticeBlueprint {
  const { intention, rhythm, intensity, delivery } = answers;

  if (intention === 'breathwork' || (intention === 'restoration' && intensity === 'gentle')) {
    return {
      programTitle: '21-Day Breathwork & Evening Calm Pathway',
      rationale:
        'Centres on gentle breath pacing, guided meditation, and evening unwinding—designed to support steadier daily focus and calm rest around demanding weeks.',
      recommendedDisciplineId: 'one-to-one-coaching',
      recommendedMasterId: 'kenji-takahashi',
      weeklyCadence:
        rhythm === 'frequent-travel'
          ? '2 live 45-min sessions + 10-min on-demand breath audio'
          : '2 live sessions weekly + daily 12-min morning breath cue',
      breathworkProtocol: '4:6 gentle extended exhale & Nadi Shodhana balance',
      suggestedRetreatId: 'kyoto-autumn',
      sessionDuration: delivery === 'in-residence' ? '60 min live 1-on-1' : '45 min live online',
    };
  }

  if (rhythm === 'frequent-travel' || intention === 'energy') {
    return {
      programTitle: '30-Day Steady Energy & Desk Mobility Programme',
      rationale:
        'Pairs concise live sessions timed for Europe and USA calendars with on-demand library sequences so wellbeing stays consistent across busy work and travel weeks.',
      recommendedDisciplineId: 'programmes-challenges',
      recommendedMasterId: 'mateo-valdes',
      weeklyCadence:
        intensity === 'disciplined'
          ? '3 live 45-min sessions + recorded mobility library'
          : '2 live sessions + flexible 15-min recorded companions',
      breathworkProtocol: 'Morning clarifying breath + midday posture reset',
      suggestedRetreatId: 'ubud-highland',
      sessionDuration: '30–45 min live online + library',
    };
  }

  if (intensity === 'gentle' || rhythm === 'sabbatical') {
    return {
      programTitle: 'Gentle Restorative & Mindful Pacing Pathway',
      rationale:
        'Cultivates unhurried mobility, prop-supported rest, and quiet body awareness through welcoming live sessions paced entirely around your comfort.',
      recommendedDisciplineId: 'recorded-library-memberships',
      recommendedMasterId: 'clara-lindqvist',
      weeklyCadence: '2 live gentle sessions + unlimited recorded library access',
      breathworkProtocol: 'Soft diaphragmatic breathing & guided twilight rest',
      suggestedRetreatId: 'engadin-alpine',
      sessionDuration: '45–60 min live & recorded',
    };
  }

  return {
    programTitle: 'Live Group Yoga & 12-Week Personal Pathway',
    rationale:
      'Unites live Europe & USA group yoga classes with structured personal guidance to build durable strength, clear posture, and grounded everyday energy.',
    recommendedDisciplineId: 'live-group-sessions',
    recommendedMasterId: 'ananya-deshmukh',
    weeklyCadence:
      intensity === 'disciplined'
        ? '3 live group classes + monthly 1-on-1 check-in'
        : '2 live group classes + 7/21/30-day seasonal challenges',
    breathworkProtocol: 'Steady breath-led movement with 8-min closing stillness',
    suggestedRetreatId: 'paros-aegean',
    sessionDuration: '45–60 min live online',
  };
}

