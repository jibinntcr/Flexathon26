# FLEXATHON — The Global Goals Run

Official multi-edition platform for **FLEXATHON — The Global Goals Run**, organised by **Flexon Sports Foundation**.

---

## Project Architecture & Folder Structure

```text
flexathon-master/
├── data/                        # Runtime JSON & SQLite data stores
│   ├── admin-config.json        # Admin credentials & session configuration
│   ├── analytics.json           # Pageview, funnel & drop-off analytics
│   ├── campaigns.json           # Email & SMS broadcast history
│   ├── contacts.json            # CRM & newsletter contact records
│   ├── coupons.json             # Promotional coupon codes & usage limits
│   ├── editions.json            # Multi-edition configurations (Hyderabad 2026, Kochi 2027)
│   ├── enquiries.json           # Contact, partnership & volunteer submissions
│   ├── registrations.db         # SQLite registration archive
│   └── registrations.json       # Primary runner registration records
│
├── docs/                        # Project & product documentation
│
├── public/                      # Static assets served at `/`
│   ├── assets/                  # Unified, indexed media & brand directory
│   │   ├── brand/               # Official FLEXATHON & Flexon Sports Foundation logos + OG banners
│   │   ├── editions/            # City edition panoramas, runner cutouts & race visuals
│   │   ├── gallery/             # Event & community photography
│   │   ├── hero/                # Hero videos, posters & globe visuals
│   │   ├── partners/            # Institutional, hydration, venue & ticketing partner logos
│   │   ├── sdgs/                # UN Sustainable Development Goals (SDG 1–17) icons & banners
│   │   ├── social-cards/        # Runner card master templates, category pills & presets
│   │   └── ui/                  # Decorative vector ornaments & UI assets
│   ├── fonts/                   # Self-hosted WOFF2 font families (Inter, Caveat)
│   ├── js/                      # Client-side scripts (animations.js, razorpay-checkout.js)
│   └── uploads/                 # User-uploaded runner photos
│
├── scripts/                     # Automation, operational & test scripts (kebab-case)
│   ├── ops/                     # Deployment, watchdog, logger & asset utilities
│   └── tests/                   # Playwright E2E, mobile responsiveness & QA suites
│
└── src/                         # Application source code
    ├── app/                     # Next.js App Router (organized by Route Groups)
    │   ├── (platform)/          # Core platform routes (/about, /editions, /global-goals, /impact, /gallery, /partners, /get-involved, /contact)
    │   ├── (editions)/          # City edition microsites (/hydoct18/*, /kochi2027)
    │   ├── (legal)/             # Legal & policy routes (/privacy-policy, /terms-of-use, /refund-policy, /participant-waiver, /disclaimer, etc.)
    │   ├── (redirects)/         # Legacy URL redirects preserving old bookmarks
    │   ├── admin/               # Admin dashboard (/admin)
    │   ├── api/                 # Backend API route handlers (/api/*)
    │   ├── layout.tsx           # Root HTML layout & metadata
    │   ├── page.tsx             # Master platform homepage (/)
    │   ├── robots.ts            # Robots.txt generator
    │   └── sitemap.ts           # XML sitemap generator
    │
    ├── components/              # Shared React components (PascalCase)
    │   ├── core/                # App-level providers (AnalyticsTracker, ScriptLoader, TransitionManager)
    │   ├── editions/            # Edition-specific UI (RegistrationClosedButton)
    │   ├── layout/              # Global chrome (Header, Footer, PartnerStrip, FloatingSocialButtons)
    │   ├── social/              # Runner card tools (SocialCardGenerator, SocialShareModal)
    │   └── index.ts             # Barrel exports
    │
    ├── lib/                     # Server/shared domain services & utilities (kebab-case)
    │   ├── analytics.ts         # Funnel & pageview analytics service
    │   ├── assets.ts            # Central typed index (`ASSETS`) for `/assets/*` paths
    │   ├── coupons.ts           # Coupon validation & usage tracking
    │   ├── data-paths.ts        # Canonical `/data` file path resolver
    │   ├── editions.ts          # Multi-edition data model & CTA helpers
    │   ├── notifications.ts     # Brevo email & SMS confirmation templates
    │   ├── partner-logos.ts     # Base64 partner logo fallbacks
    │   ├── registration-service.ts # Registration persistence & Razorpay verification
    │   └── sdgs.ts              # UN SDG 1–17 definitions
    │
    └── styles/                  # Global stylesheets (kebab-case)
        ├── animations.css       # Scroll & transition animations
        ├── fonts.css            # @font-face declarations
        ├── globals.css          # Master platform & responsive design tokens
        ├── lenis.css            # Smooth scrolling rules
        └── webflow-base.css     # Base utility & layout styles
```

---

## Naming Conventions

1. **Folders & Routes (`kebab-case`)**:
   - All route directories, style files, library modules, and scripts use `kebab-case` (e.g., `global-goals/`, `registration-service.ts`, `webflow-base.css`).
   - Next.js Route Groups (`(platform)`, `(editions)`, `(legal)`, `(redirects)`) organize routes by domain without altering public URLs.
2. **React Components (`PascalCase`)**:
   - All reusable React components inside `src/components/` use `PascalCase` (`Header.tsx`, `Footer.tsx`, `PartnerStrip.tsx`) and are grouped by domain (`layout/`, `core/`, `editions/`, `social/`).
3. **Data & Scripts Separation**:
   - All runtime JSON/SQLite stores reside in `data/` and are resolved through `src/lib/data-paths.ts`.
   - Operational scripts live in `scripts/ops/` and automated test suites live in `scripts/tests/`.

---

## Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.
