# FLEXATHON Multi-City Platform Revamp — Repository & Live Site Audit

**Date:** 29 October 2026  
**Production Domain:** `https://flexathonrun.org/`  
**Existing Edition Target:** `/hydoct18` (Hyderabad 2026 — Completed)  
**Next Announced Edition:** `/kochi2027` (Kochi Edition — Coming Soon)  
**Organised By:** Flexon Sports Foundation (`https://flexonsports.org/`)  
**Stack:** Next.js 16.2.12 (App Router, Webpack), React 19.2.4, TypeScript 5, Inline CSS + `<style jsx global>`, File-backed JSON/SQLite persistence (`registrations.json`, `registrations.db`, `enquiries.json`, `contacts.json`, `coupons.json`, `campaigns.json`, `analytics.json`, `admin_config.json`).

---

## 1. Route Inventory & Migration Map

| Existing Route / Anchor | Current Implementation Status | Target / Post-Revamp Role | Migration / Redirect / Compatibility Strategy |
|---|---|---|---|
| `/` | Single-city Hyderabad 2026 landing page (`src/app/page.tsx`) | **FLEXATHON Master Homepage** ("17 Goals. One Movement. Every City.") | Replaced with multi-city master homepage; original Hyderabad experience preserved in full at `/hydoct18` |
| `/hydoct18` | *(New)* | **Hyderabad 2026 Completed Edition Hub** | Full original Hyderabad homepage experience adapted to Completed state (`18 Oct 2026`, `ESCI Gachibowli`, `3K/5K/10K`, `₹60,000`, `SDG 4`) |
| `/hydoct18/the-run` | *(New)* | Hyderabad 2026 Race Categories & Schedule | Preserves original `/the-run` content in Completed state |
| `/hydoct18/prize-details` | *(New)* | Hyderabad 2026 Prize Pool (`₹60,000`) & Rules | Preserves original `/prize-details` content in Completed state |
| `/hydoct18/global-goal` | *(New)* | Hyderabad 2026 SDG 4 Quality Education Focus | Preserves original `/2026-quality-education` content in Completed state |
| `/hydoct18/social-card` | *(New)* | Hyderabad 2026 Commemorative Runner Card Studio | Preserves original 1254×1254 canvas generator & phone lookup (`/api/runner-card`) |
| `/hydoct18/runner-stories` | *(New)* | Hyderabad 2026 Runner & Community Stories | Preserves Hyderabad community stories in unified light athletic design |
| `/hydoct18/faqs` | *(New)* | Hyderabad 2026 Edition FAQs | Preserves full 14-item Hyderabad FAQ accordion |
| `/hydoct18/gallery` | *(New)* | Hyderabad 2026 Edition Gallery | Authentic Hyderabad visual highlights & post-race archive notice |
| `/hydoct18/results` | *(New)* | Hyderabad 2026 Results & Certificates Status | Honest status notice for official timing/certificate verification without fabricated results |
| `/kochi2027` | *(New)* | **Kochi Edition — Coming Soon** | Honest Coming Soon page for Kochi, Kerala with edition-isolated interest form; no unconfirmed date/venue/price/SDG |
| `/editions` | *(New)* | **All Editions Directory** | Lists Upcoming/Announced (`Kochi`), Completed (`Hyderabad 2026`), and host-city enquiry path |
| `/editions/[slug]` | *(New)* | **Dynamic Edition Renderer** | Renders published editions from shared model; returns 404 (`notFound()`) for unknown or unpublished/draft slugs |
| `/about` | Light-theme single-city focus (`src/app/about/page.tsx`) | **Master About Page** | Updated to multi-city movement story, purpose, vision, mission, 3 pillars, and Flexon Sports Foundation identity |
| `/global-goals` | Light-theme 17 SDGs (`src/app/global-goals/page.tsx`) | **Master 17 Global Goals Page** | Updated with **exact** official UN SDG names (1–17), sport/community connection, edition links (`SDG 4 → Hyderabad 2026`), and UN non-endorsement compliance |
| `/impact` | Legacy Webflow dark HTML (`src/app/impact/page.tsx`) | **Master Impact Page** | Rebuilt in light brand design system with verified facts (`1 Completed Edition`, `SDG 4 in Hyderabad`, `Next City: Kochi`) and 5-step impact governance |
| `/gallery` | *(New)* | **Master Filterable Gallery** | Filterable across `All Editions`, `Hyderabad 2026`, and `Kochi — Coming Soon` using authentic repository assets |
| `/partners` | Legacy Webflow dark HTML (`src/app/partners/page.tsx`) | **Master Partners Page** | Rebuilt in light brand design system; distinguishes partnership categories, labels Hyderabad partners strictly as Hyderabad 2026 Edition Partners, and embeds working partner enquiry form |
| `/get-involved` | Light-theme single-city focus (`src/app/get-involved/page.tsx`) | **Master Get Involved Page** | Multi-city tracks for Runners, Volunteers, Institutions/Schools, Corporates/CSR, and City Hosts with working enquiry integration |
| `/contact` | Light-theme contact page (`src/app/contact/page.tsx`) | **Master Contact & Enquiry Hub** | Supports edition selection (`General / National`, `Kochi — Coming Soon`, `Hyderabad 2026`), category, city, consent checkbox, privacy policy link, and backend persistence |
| `/2026-quality-education` | Existing Hyderabad SDG 4 page | Legacy Hyderabad route | Preserved and linked/redirected cleanly to `/hydoct18/global-goal` |
| `/the-run` | Existing Hyderabad race details page | Legacy Hyderabad route | Preserved and linked/redirected cleanly to `/hydoct18/the-run` |
| `/prize-details` | Existing Hyderabad prize page | Legacy Hyderabad route | Preserved and linked/redirected cleanly to `/hydoct18/prize-details` |
| `/social-card` | Existing Hyderabad runner card page | Legacy Hyderabad route | Preserved and linked/redirected cleanly to `/hydoct18/social-card` |
| `/share-card` | Redirects to `/social-card` (`src/app/share-card/page.tsx`) | Legacy redirect | Updated to redirect to `/hydoct18/social-card` |
| `/stories` | Legacy Webflow dark HTML (`src/app/stories/page.tsx`) | Legacy Hyderabad stories route | Redirects/maps to `/hydoct18/runner-stories` |
| `/faqs` | Legacy Webflow dark HTML (`src/app/faqs/page.tsx`) | Legacy Hyderabad FAQs route | Redirects/maps to `/hydoct18/faqs` |
| `/registeration` | Registration Closed notice (`src/app/registeration/page.tsx`) | Legacy registration URL | Preserved in Completed/Closed state with links to `/hydoct18` and `/editions` |
| `/privacy-policy`, `/terms-of-use`, `/refund-policy`, `/participant-waiver`, `/safeguarding-policy`, `/accessibility-statement`, `/disclaimer`, `/brand-sdg-disclaimer` | Legal policy pages | Official Legal & Policy Pages | All legal wording preserved intact; navigation works cleanly with master and `/hydoct18` routes |

---

## 2. File & Component Inventory

### Shared Components (`src/app/components/`)
- `Header.tsx`: Fixed top navigation bar with desktop links, mobile drawer, and CTA button. To be upgraded to support Master navigation (`Home | About | Editions | 17 Global Goals | Impact | Gallery | Partners | Get Involved`, CTA `Find Your Run` → `/editions`) plus an automatic **Hyderabad 2026 Edition Sub-Navigation Bar** when viewing `/hydoct18/*`.
- `Footer.tsx`: Light-theme footer with brand description, navigation columns, contact details, legal links, and UN disclaimer. To be updated so `PartnerStrip` (Hyderabad edition partners) only renders in Hyderabad edition context or with explicit `Hyderabad 2026 Edition Partners` attribution, never misleadingly as Kochi or national partners.
- `PartnerStrip.tsx`: Displays Hyderabad 2026 partners (`ESCI`, `Tata Copper+`, `SMAAASH`, `Akshayakalpa Organic`) and discovery platforms (`BookMyShow`, `iFinish`, `India Running`, `Townscript`, `CityWoofer`, `District`). Must be scoped to Hyderabad 2026 with clear historical edition attribution.
- `RegistrationClosedButton.tsx`: Displays non-transactional `Registration Closed` / `Event Completed` badge.
- `FloatingSocialButtons.tsx`: Floating WhatsApp (`+91 90749 34014`) and Instagram (`@flexathon_official`) quick links.
- `AnalyticsTracker.tsx`: Client-side route analytics tracker posting to `/api/analytics/track`.
- `ScriptLoader.tsx` & `TransitionManager.tsx`: Legacy Webflow transition support for pages with `data-barba="container"`. Safely releases overlay on React routes.

---

## 3. Form, API & Integration Inventory

| Endpoint / Service | File | Purpose & Storage | External Integration / Env Vars (Names Only) | Status |
|---|---|---|---|---|
| `POST /api/contact` | `src/app/api/contact/route.ts` | Saves contact, interest, partner, volunteer, and host-city enquiries to `enquiries.json` (and `contacts.json`) | Optional email notifications via `BREVO_API_KEY` (`https://api.brevo.com/v3/smtp/email`) | Active; being enhanced with validation, rate-limiting, edition isolation (`edition`, `category`, `city`, `consent`), and `GET` verification support for admin |
| `GET /api/runner-card` | `src/app/api/runner-card/route.ts` | Looks up registered Hyderabad participants by phone number in `registrations.json` | Local JSON read (`registrations.json`) | Active & preserved |
| `POST /api/register`, `POST /api/create-order`, `POST /api/verify-coupon`, `POST /api/check-phone`, `POST /api/razorpay/webhook` | `src/app/api/...` | Historical Hyderabad registration & Razorpay order/webhook endpoints (`registrations.json`, `registrations.db`, `coupons.json`) | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `BREVO_API_KEY`, `NEXT_PUBLIC_BASE_URL` | Preserved untouched; public registration UI is closed for completed Hyderabad and disabled for unconfirmed Kochi |
| `POST /api/analytics/track` | `src/app/api/analytics/track/route.ts` | Tracks page views into `analytics.json` | Local JSON write (`analytics.json`) | Active & preserved |
| `/api/admin/*` | `src/app/api/admin/*` | Admin authentication (`verifySession`, HMAC-SHA256 cookie `admin_session` using `ADMIN_SESSION_SECRET`), registrations, coupons, campaigns, contacts, logs | `ADMIN_SESSION_SECRET`, `ADMIN_PASSWORD`, `BREVO_API_KEY` | Active & preserved; extending with `/api/editions` and `/api/admin/editions` + `/api/admin/enquiries` |

---

## 4. Data, Storage & Integration Risk Review

1. **Zero Data Loss Rule:** `registrations.json` (65 KB), `registrations.db` (12 KB), `coupons.json`, `campaigns.json`, `contacts.json`, `enquiries.json`, `analytics.json`, and `admin_config.json` contain live/historical project records. None of these files may be deleted, truncated, or schema-broken.
2. **Edition Isolation:** Kochi interest submissions (`edition: "kochi2027"`) and general/partner enquiries (`edition: "master"` / `"hydoct18"`) must carry explicit `edition` and `category` fields so Kochi leads are never mixed with Hyderabad participant registrations.
3. **Registration Safety Guard:** In the shared event model (`src/app/lib/editions.ts`), a registration CTA may only render as active if `edition.status === 'Registration Open'` AND `Boolean(edition.registrationUrl)` is true. Since Hyderabad 2026 is `Completed` and Kochi is `Coming Soon`, neither edition can accidentally expose an active payment/booking button.

---

## 5. Browser-Level Manual & Automated Verification Checklist

1. Verify `/` renders the new multi-city FLEXATHON master homepage (Sections A–J) with no Hyderabad-only global title.
2. Verify `/hydoct18` and all child routes (`/hydoct18/the-run`, `/hydoct18/prize-details`, `/hydoct18/global-goal`, `/hydoct18/social-card`, `/hydoct18/runner-stories`, `/hydoct18/faqs`, `/hydoct18/gallery`, `/hydoct18/results`) render Hyderabad 2026 in Completed state.
3. Verify `/kochi2027` displays Coming Soon without unconfirmed date, venue, route, distance, price, partner, or SDG, and that submitting the Kochi interest form validates and persists to `enquiries.json` with `edition: "kochi2027"`.
4. Verify `/editions` lists Hyderabad 2026 (`Completed`) and Kochi (`Coming Soon`), and `/editions/invalid-slug` returns HTTP 404.
5. Verify `/global-goals` displays all 17 UN SDGs with exact official names and links Goal 4 to Hyderabad 2026.
6. Verify `/impact`, `/gallery`, `/partners`, `/get-involved`, and `/contact` render in the light brand design system with working filters and forms.
7. Verify legacy routes (`/2026-quality-education`, `/the-run`, `/prize-details`, `/social-card`, `/stories`, `/faqs`, `/registeration`, `/share-card`) resolve cleanly without 404s.
8. Verify responsive layout at 390px mobile and 1280px desktop widths with zero horizontal overflow.

---

## 6. Implementation Order & Key Assumptions

1. **Step 1:** Audit repository and write `docs/REVAMP_AUDIT.md` *(Completed)*.
2. **Step 2:** Create shared data models (`src/app/lib/sdgs.ts`, `src/app/lib/editions.ts`, `editions.json`) and API routes (`/api/editions`, `/api/admin/editions`, enhanced `/api/contact`).
3. **Step 3:** Upgrade `Header.tsx`, `Footer.tsx`, and `PartnerStrip.tsx` to support both Master and Edition (`/hydoct18`) contexts with strict partner/edition isolation.
4. **Step 4:** Build `/hydoct18` and all Hyderabad child routes (`/hydoct18/the-run`, `/hydoct18/prize-details`, `/hydoct18/global-goal`, `/hydoct18/social-card`, `/hydoct18/runner-stories`, `/hydoct18/faqs`, `/hydoct18/gallery`, `/hydoct18/results`) + legacy route redirects/links.
5. **Step 5:** Build the new multi-city Master Homepage (`src/app/page.tsx`) implementing Sections A–J.
6. **Step 6:** Build `/editions`, `/kochi2027`, `/editions/[slug]`, and update `/about`, `/global-goals`, `/impact`, `/gallery`, `/partners`, `/get-involved`, `/contact`.
7. **Step 7:** Update admin dashboard (`src/app/admin/page.tsx`) to view/manage editions and enquiries safely, update SEO/metadata/sitemap, and run `lint`, `build`, and Playwright verification.
