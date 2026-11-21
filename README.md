# VANVITA Wellbeing

**Wellbeing, made personal.**

VANVITA Wellbeing is a calm, multi-page React + TypeScript web application built for an expert-led wellbeing practice serving individuals, corporate teams, and new mothers across **Europe and the USA** live online, and in person through **licensed retreat partners in India**.

---

## Brand & Content Architecture

All site copy strictly follows **wellbeing-only language** focused on practical everyday rhythm, mindful movement, breathwork, and restorative habits (without medical claims).

### Routes & Pages

Navigation is hash-driven (`#home`, `#online-wellness`, `#herway`, `#experts`, `#schedule`, `#business`, `#about`, `#concierge`) with smooth page transitions and automatic scroll restoration:

1. **Home (`#home`)**
   - **Cinematic Sanctuary Scroll Story (`SanctuaryScrollStory`)**: A 5-beat pinned aerial fly-in sequence gliding smoothly from a misty pine valley onto a sunlit wooden yoga pavilion, transitioning into the rising `#F7FAF6` Three Core Pathways panel.
   - **Live Practice Impact & Pavilion Films (`KeyMetricsSection`)**: Scroll-animated architectural metrics (`Live Memberships`, `Coaching Sessions`, `Corporate Pilot Contracts`, `Retreat Participants`), a multi-chapter widescreen Sanctuary Film player with audio/playback controls, and a 3-column vertical Pavilion Moments reel strip.
   - **Online Wellness Overview (`YogaServicesOverview`)**: Horizontal discipline showcase, 7/21/30-day & 4–12 week programme cards, interactive 4-4-6 morning breath preview, and authentic sanctuary photography collage.
   - **Practice Library Preview (`PracticeLibrary`)**: Curated study cards with an ambient morning singing-bowl video banner and interactive breath-paced guided study modal.
   - **HerWAY Preview (`HerWaySection`)**: Postpartum wellbeing supervised pilot featuring a serene ambient herbal-tea sanctuary video loop.
   - **Corporate Burnout & Retreats Preview (`BusinessSection`)**: Living sunrise courtyard video banner paired with corporate burnout-prevention pilots, workshops, and licensed India retreats.
   - **Client Reflections (`TestimonialsSection`)**, **Booking Concierge (`ConsultationConcierge`)**, and **FAQ (`InteractiveFaqAccordion`)**.
2. **Online Wellness (`#online-wellness`)**: Full service overview, searchable/filterable Practice Library (by category, duration, and teacher), and interactive Practice Matcher blueprint builder.
3. **HerWAY (`#herway`)**: Dedicated supervised postpartum wellbeing pathway page.
4. **Our Experts (`#experts`)**: Senior teaching faculty across Europe, the USA, and India plus 1-on-1 coaching track explorer.
5. **Schedule (`#schedule`)**: Live weekly class timetable with interactive **Europe & USA time-zone conversion** (London, Zurich, New York, San Francisco) and direct class booking.
6. **For Business (`#business`)**: Corporate Burnout & Retreats page with an interactive Corporate Programme Estimator (team size, pilot/quarterly/annual model, workshops, and India retreat options).
7. **About (`#about`)**: Mission, authentic pavilion photography gallery, and ethos principles.
8. **Book Free Intro / Contact (`#concierge`)**: Timezone-aware booking & inquiry concierge with local persistence (`localStorage`) and a slide-out Saved Inquiries drawer (`InquiriesDrawer`) supporting rescheduling and cancellation.

---

## Visual System & Motion Engineering

### Color Palette (`src/index.css`)
- **Canvas & Surfaces**: Morning Dew `#F7FAF6`, Eucalyptus `#EBF3EA`, Fern Mist `#E1ECE0`, Sunbeam `#F1F6E7`, Hairline `#DDE7DC`
- **Typography**: Deep Pine `#18241C` (primary ink), Deep Moss `#3F5246` (high-contrast secondary copy)
- **Botanical & Ember Contrast Accents**: Botanical Green `#3E6F4E`, Burnt Ember `#B84D1D`, Deep Ember `#963B14`, Warm Ember `#D97A4A`, Ember Wash `#F8EDE6`

### Typography
- **Primary Sans**: `Outfit` (sentence-case architectural headings, clean readable body copy)
- **Expressive Accent**: `Reenie Beanie` (used selectively for single warmth-accented words)
- **Tabular Numerals**: `JetBrains Mono` with `font-variant-numeric: tabular-nums` for aligned counters and schedules

### Zero-Lag Scroll-Scrubbed Hero Video Pipeline
To eliminate frame stutter and React reconciliation lag during the Hero fly-in:
1. **All-Intra Keyframe Encoding**: The source drone footage (`Drone_moving_toward_yoga_sanctuary_b6a1de2d_ca18710b.mp4`) is re-encoded via FFmpeg with `-g 1 -keyint_min 1 -movflags +faststart` into `/public/assets/aistudio/hero_flyin_scrub.mp4` so every single one of its 192 frames is an instant-decode I-frame.
2. **Seamless Still-to-Video Cross-Fade**: Frame `00:00` is extracted to `/public/assets/aistudio/hero_flyin_first_frame.jpg` (`fetchPriority="high"`). At scroll `0`, the high-resolution still displays immediately and smoothly cross-fades (`opacity: 0 -> 1`) into the active video layer as scrolling begins, with a unified color-grade filter (`brightness-[1.03] contrast-[0.96] saturate-[0.90]`) and `#F7FAF6` atmospheric washes.
3. **Zero React Re-Renders on Scroll**: All beat transitions, veils, and progress indicators are bound directly to Framer Motion `MotionValue` transforms (`useSpring` + `useTransform`) on GPU-composited layers, while a dedicated `requestAnimationFrame` loop updates `video.currentTime` only when `!video.seeking`.
4. **Reduced Motion Accessibility**: Respects `prefers-reduced-motion` across all videos, scroll springs, and section reveals.

---

## Tech Stack

- **Framework**: React 19 + TypeScript 5
- **Build Tool**: Vite 8 (`@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Motion (`motion/react`)
- **Icons**: `lucide-react`

---

## Project Structure

```text
├── index.html                        # HTML entry point & Google Fonts (Outfit, Reenie Beanie, JetBrains Mono)
├── package.json                      # Scripts & dependencies
├── public/
│   └── assets/aistudio/              # Curated photography, live pavilion footage & optimized MP4 loops
└── src/
    ├── App.tsx                       # Multi-page hash router, inquiry state & concierge wiring
    ├── index.css                     # Tailwind v4 theme tokens, typography & reduced-motion rules
    ├── types/vanvita.ts              # Shared TypeScript interfaces
    ├── data/vanvitaData.ts           # Programmes, live EU/US schedule, experts, guides & media registry
    └── components/
        ├── Navbar.tsx                # Floating glass navigation bar with custom two-leaf 'V' logo
        ├── SanctuaryScrollStory.tsx  # 60fps scroll-scrubbed hero fly-in & 3 core pathway cards
        ├── KeyMetricsSection.tsx     # Scroll-animated impact metrics, widescreen film switcher & vertical reels
        ├── HomeExperiences.tsx       # Online wellness overview, 7/21/30d programmes, breath preview & FAQ
        ├── PracticeLibrary.tsx       # Filterable guided studies + interactive breath-paced player modal
        ├── PracticeMatcher.tsx       # Personalized wellbeing plan matcher
        ├── HerWaySection.tsx         # Postpartum supervised pilot showcase with ambient tea-steam video
        ├── BusinessSection.tsx       # Corporate burnout programmes, India sunrise video & scope estimator
        ├── ScheduleSection.tsx       # Interactive Europe & USA timezone live class timetable
        ├── CoachingSection.tsx       # Senior teachers & 1-on-1 coaching disciplines
        ├── AboutSection.tsx          # Story, sanctuary photography gallery & ethos pillars
        ├── TestimonialsSection.tsx   # Client reflections grid
        ├── ConsultationConcierge.tsx # Timezone-aware free intro, HerWAY & corporate inquiry form
        ├── InquiriesDrawer.tsx       # Persistent saved inquiries manager (reschedule / cancel)
        ├── RevealOnScroll.tsx        # Gentle entrance & scroll-reveal wrappers
        ├── ScrollProgressBar.tsx     # Subtle top reading-progress bar
        ├── ResilientImage.tsx        # Fallback-safe editorial image component
        └── Footer.tsx                # Multi-column navigation & wellbeing disclaimer
```

---

## Local Development & Build

### Prerequisites
- **Node.js** `>= 18`
- **npm** `>= 9`

### Install Dependencies
```bash
npm install
```

### Run Development Server
Starts Vite on port `3000`:
```bash
npm run dev
```

### Type-Check (Lint)
Runs strict TypeScript checking with no emitted files:
```bash
npm run lint
```

### Production Build
Compiles and bundles optimized assets into `dist/`:
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Clean Build Artifacts
```bash
npm run clean
```

---

## Re-Encoding Scroll-Scrubbed Video Assets (Optional)

If you replace the hero fly-in video in the future, re-encode it with all-intra keyframes and extract frame `0` so scroll-scrubbing remains lag-free:

```bash
# 1. Extract exact opening hero frame
ffmpeg -y -i public/assets/aistudio/<your-hero-video>.mp4 -vframes 1 -q:v 2 public/assets/aistudio/hero_flyin_first_frame.jpg

# 2. Encode fast-seek all-intra MP4 for 60fps scroll scrubbing
ffmpeg -y -i public/assets/aistudio/<your-hero-video>.mp4 \
  -an -c:v libx264 -preset fast -crf 24 -g 1 -keyint_min 1 \
  -movflags +faststart -pix_fmt yuv420p -vf "scale=1280:-2" \
  public/assets/aistudio/hero_flyin_scrub.mp4
```
