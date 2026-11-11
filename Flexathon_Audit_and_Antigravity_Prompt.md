# FLEXATHON website review and Antigravity implementation prompt

Reviewed: 12 November 2026, India time

Website: https://flexathon-master.vercel.app/

## Review scope and limits

Live browser inspection covered the homepage, About, Editions, Global Goals, Impact, Gallery, Partners, Get Involved, Contact, Kochi, Hyderabad overview, results/certificates, runner-card studio, runner stories, Hyderabad FAQs, Privacy Policy and Terms & Conditions. This was a public frontend review, not a source-code, security penetration or backend audit.

Interactions tested: edition filters, host-city enquiry routing, empty submission validation on Contact and Kochi forms, Kochi FAQ accordion, gallery city filter and lightbox open/close, homepage slide selection, homepage SDG selection, certificate field/category editing without verified lookup, and collapsed navigation opening and home navigation.

Responsive inspection used desktop browser zoom, with observed CSS widths around 1363, 779, 545 and 340 pixels. This tests reflow and zoom accessibility; it does not replace real iPhone/Android or touch-device testing. The corresponding viewport heights were short. At 340×234, floating social buttons overlapped the menu trigger and an attempted menu click opened WhatsApp. Treat this as a short-viewport/zoom defect, not proof of failure on every phone. The menu opened and its Home link worked at 545×374.

No valid lead forms were submitted, no payment or registration was completed, no real participant phone lookup was performed, and no certificate file was downloaded. Backend persistence, notifications, real result accuracy, download integrity, mobile Safari, page-speed scores and every internal/external link remain unverified. Empty form submissions displayed validation errors.

## Confirmed issues and changes

| Priority | Location | Observed finding | Required change |
|---|---|---|---|
| Critical | /hydoct18/results | An official certificate preview is present before successful participant lookup. Name, bib, affiliation and completed category are editable. A synthetic QA name appeared on an official certificate preview; the download control remained enabled. | Separate commemorative cards from verified certificates. Gate official certificate generation behind server-side verified results and an appropriate access check. Lock official result fields; route corrections to support. Watermark any preview/demo and disable official download before verification. |
| High | /impact versus /kochi2027, /editions and /global-goals | Impact names Marine Drive Waterfront Circuit, SDG 14 and 3K/5K/10K for Kochi, while the other pages say venue, categories and SDG are TBA. | Use one approved edition record across all pages. Publish TBA consistently until each fact is confirmed. Do not infer a coastal theme or venue from the city. |
| High | Floating contacts versus footer/contact page | Floating WhatsApp uses +91 9497063919; main helpdesk uses +91 9074934014. Floating Instagram uses flexathon_run; footer uses flexathon_official. Privacy lists both numbers, so the review cannot determine which channel is current. | Obtain the approved contact configuration from the organiser or project records. Use it consistently. If both numbers have distinct purposes, label the purposes clearly. |
| High | /hydoct18/social-card | Suggested caption says “I'm participating” and “Join me and register” for the completed 18 October race. | Make card artwork, captions, copy/share text and social intents depend on event status. Use completed-event language and remove old registration invitations. |
| High | /contact?category=Host+City+Proposal | Following “Submit a Host City Enquiry” lands on a form whose selected category is General Enquiry. The available host option is Potential Host City Proposal. | Map supported query values to stable category IDs and preselect the matching option. Test all enquiry links, including result-support and edition parameters. |
| Medium | Shared desktop header | At around 1360 CSS pixels the right-hand Kochi CTA extends beyond the viewport and appears clipped. | Simplify the header, reduce duplicate archive CTAs, and switch to the compact menu earlier. Do not conceal overflow to hide a layout error. |
| Medium | Homepage | Initial hero and first content row focus on completed Hyderabad race distances and prize eligibility. The page has no early dedicated explanation of Flexathon as the wider movement. | Lead with the brand purpose and next-edition action, then editions and archive resources. Keep historical race rules inside the Hyderabad edition or mark them explicitly as historical. |
| Medium | /impact | “1,000+ runners,” “0 kg plastic waste at mats,” universal verification language, student subsidies and educational activity claims appear without a visible supporting report in the reviewed content. | Ask the organiser to substantiate each claim. Show dated, scoped metrics and evidence where available; remove or soften unsupported claims. This review does not establish whether they are true or false. |
| Medium | /impact | Its Hyderabad roadmap calls “3K • 5K • 10K” a timed run; the homepage describes 3K as non-timed. | Store timing type per race category and reuse it consistently. |
| Medium | /gallery | A photo from /assets/gallery/oct18/NIX09962.JPG is presented within the Kochi filter as a next-city announcement. The overall introduction calls all 122 items real race moments. | Label it as Hyderabad archive imagery used for a Kochi announcement, or use a clearly identified announcement graphic. Separate promotional imagery from Kochi event documentation. |
| Medium | Privacy and Terms pages | Older navigation/footer wording persists: “2026 Edition,” upcoming-style Hyderabad messaging, old newsletter copy, alternate contacts and “Infinio Technologies.” | Reuse the current shared site shell; preserve policy text unless explicitly reviewed. Keep developer credit consistent with the approved Infinio name. Review legacy route destinations. |
| Medium | Mobile navigation copy | Kochi menu says interest registration secures “priority bib access,” while its interest page only promises updates. | Remove unapproved access guarantees. Use “Receive Kochi edition updates.” |
| Medium | Page titles | Contact is titled as Hyderabad 2026 support despite its multi-city role; Partners retains 2026; Editions and Gallery use the generic homepage title. | Give every page an accurate unique title and description. Confirm canonical and social metadata on each route. |
| Medium | Semantic structure | Some pages, including Contact and Global Goals, expose nested main landmarks. | Use one main landmark per page and correct header, navigation and footer landmarks. |
| Improvement | Copy and visual density | Labels such as “Master Platform Home,” “Historical Event Discovery & Listing Platforms,” “Register Pre-Interest” and “cohorts” make the public site feel administrative. Repeated partner blocks and a large archive-heavy footer add density. | Use plain visitor-facing labels and consolidate repeated content. Replace emoji-heavy navigation/cards with a coherent icon style. |

## What worked in the checks performed

- Coming Soon and Completed edition filters displayed their respective city cards.
- Kochi and Contact empty submissions displayed required-field/consent errors.
- Kochi FAQ expanded the selected answer.
- Gallery Kochi filter updated counts and results; clicking its image opened a lightbox and Close dismissed it.
- Homepage slide 4 displayed the Kochi CTA, and selecting Goal 3 updated the SDG description.
- The collapsed menu opened and its Home link navigated successfully at about 545 CSS pixels.
- The homepage showed no failed image elements in the final desktop check. Unloaded lazy images elsewhere were not classified as broken images.

## Recommended homepage, in order

| Order | Section | Content and purpose |
|---|---|---|
| 1 | Compact status strip and header | One short Kochi announcement; logo, manageable navigation and one primary CTA. Avoid loading the first screen with archive links. |
| 2 | Movement-led hero | FLEXATHON — The Global Goals Run. Suggested line: “United by Sport. Driven by Global Goals.” Explain the multi-city running initiative by Flexon Sports Foundation in one sentence. Use authentic event photography. Primary CTA: Explore Editions. Secondary: Get Kochi Updates. |
| 3 | Upcoming and completed editions | Lead with Kochi, explicitly Coming Soon, with approved details or TBA. Follow with Hyderabad, explicitly Completed, with results and gallery links. Keep these visible without waiting for a carousel. |
| 4 | What is Flexathon? | A short introduction connecting community fitness, inclusive participation and SDG awareness, with a link to About and organiser information. |
| 5 | Hyderabad highlights and runner resources | A compact recap, genuine photographs, and Results & Certificates / Race Gallery / Commemorative Runner Card links. Show only confirmed figures with dates and context. |
| 6 | Why join? | Friendly entries for first-time runners, families, experienced runners, running clubs, colleges and workplace teams. Distances, inclusions and eligibility vary by edition. |
| 7 | Run for the Global Goals | Keep the working 17-goal explorer. Explain the difference between SDG awareness and measured outcomes. Show Hyderabad's confirmed SDG 4; Kochi remains TBA until approved. Retain the independent-initiative notice. |
| 8 | Community voices | Two or three authentic, consented testimonials or short videos. Verify existing named runner stories before reusing them; do not invent quotes or participants. Hide the section until genuine material is available. |
| 9 | Get involved | Clear cards for Volunteer, Running Clubs, Schools & Colleges, Corporate Teams, Partners and Host a City. Each should preselect the appropriate enquiry category. |
| 10 | Partners | A modest, correctly scoped “Hyderabad 2026 partners” row. Separate race partners from historical listing platforms; do not imply that they sponsor Kochi or the national programme. |
| 11 | FAQ and updates | Five practical answers about finding editions, registration status, results, participation and partnerships. Add a short Kochi updates form only if connected to real storage and consent handling. |
| 12 | Footer | Approved contacts and social links, editions, foundation, policies, safeguarding/accessibility links and developer credit. Keep it concise. |

Do not add a countdown without a confirmed future date, fake participant counters, invented testimonials, unapproved city schedules, or claims that every registration funds a cause without documented arrangements.

---

# COPY-READY ANTIGRAVITY PROMPT

Act as the frontend engineer, UX designer and QA engineer for the existing FLEXATHON project at https://flexathon-master.vercel.app/. Inspect the repository and improve the existing implementation. Complete the changes and test the important user journeys. Preserve working city routes and approved brand assets.

## Goal

Make the homepage clearly represent FLEXATHON — The Global Goals Run as a multi-city movement organised by Flexon Sports Foundation. It should explain the initiative, highlight the next edition, make completed-edition resources easy to find, and convert runner/community/partner interest through working forms. Use a polished, light, modern sporting style with the existing logo and brand colours, readable typography, real photographs and restrained animation.

Treat the following as browser-review findings to reproduce against the current code. If the implementation has changed, report the updated result instead of reintroducing an old fix.

## 1. Fix correctness and participant trust first

- On /hydoct18/results, an official finisher certificate can currently be previewed with an arbitrary name and completed category without successful participant verification, with Download still enabled. Official certificates must be generated only from an authoritative, server-verified participant/result record and a suitable access check. Lock official name, bib, category, finish status and timing fields. Provide a correction-request route. Add a unique certificate verification reference if the supporting backend exists. A commemorative social card may remain customisable, clearly separate from an official result certificate. Until the real certificate workflow exists, disable official generation/download and show an honest support route; watermark demos prominently.
- Reconcile Kochi information across /impact, /kochi2027, /editions, /global-goals, homepage, menus and metadata. Impact currently claims Marine Drive, SDG 14 and 3K/5K/10K while other pages say TBA. Publish only organiser-approved facts. No guessed venue, theme, distance, fee or date. Remove the menu promise of priority bib access unless explicitly approved.
- Review displayed results, winner times, prizes, impact statistics, operational claims and named testimonials against organiser-provided evidence. Do not invent replacements. Mark unresolved claims in a private content checklist and omit them from public output until confirmed.
- Correct the Impact page's suggestion that 3K is timed; historical 3K is described elsewhere as non-timed.
- Make completed Hyderabad captions and shared cards use retrospective language, e.g. “Celebrating FLEXATHON Hyderabad 2026.” Remove “I'm participating” and “Join me and register” from this completed edition's generated caption and social-share URLs.
- Centralise approved phone/WhatsApp, email, Instagram, organiser name and developer credit. Floating WhatsApp currently differs from the footer (+91 9497063919 versus +91 9074934014), and Instagram differs (flexathon_run versus flexathon_official). Resolve using approved project records; if unresolved, identify the specific decision needed. Do not silently guess.

## 2. Rebuild homepage hierarchy

Use this order, combining adjacent sections where needed to keep the page focused:

1. Compact announcement and header with one clear next-edition action.
2. Movement-led hero: FLEXATHON — The Global Goals Run; “United by Sport. Driven by Global Goals.” One sentence explaining the initiative. Primary CTA Explore Editions; secondary Get Kochi Updates. Use genuine event photos with readable overlays. Essential actions must remain visible without carousel interaction.
3. City editions: Kochi Coming Soon first, Hyderabad Completed second. Kochi shows only approved information or TBA. Hyderabad links to archive, results and photos.
4. Brief “What is Flexathon?” introduction and Flexon Sports Foundation attribution.
5. Hyderabad recap and runner-resource shortcuts. Keep old race distances and prize rules explicitly scoped to Hyderabad rather than generic current race offers.
6. “Who can join?” entries for beginners, families, runners, clubs, students and corporate teams; edition-specific eligibility.
7. Existing interactive 17 Global Goals explorer, with clear awareness/action explanation and no implied UN endorsement.
8. Genuine community voices only if consented and verified material exists.
9. Get Involved cards: volunteer, running club, college, corporate team, sponsor and host city.
10. Correctly edition-scoped partners, separated from historical ticket-listing platforms.
11. Practical FAQ and a compact Kochi update signup connected to a real backend, if available.
12. Concise current footer with approved contact, foundation, policy, safeguarding and accessibility links.

Keep existing real photographs and logos where suitable. Use purposeful spacing, consistent cards and buttons, a coherent icon family and short natural English. Reduce repeated partner strips, archive links and administrative labels. Replace “Register Pre-Interest” with “Get Kochi Updates” or “Register Interest.” Do not invent statistics, dates, endorsements, quotes or sponsor relationships.

## 3. Fix navigation, forms and media

- Desktop header clips the Kochi CTA around 1360 CSS pixels. Fix spacing and breakpoints; simplify navigation or use the compact menu earlier. Ensure all CTAs remain visible at 1024–1440 pixels.
- Fix enquiry preselection. /contact?category=Host+City+Proposal currently leaves General Enquiry selected. Use stable category IDs and explicit mappings, including legacy values. Apply edition/category query parameters to the correct select controls. Verify every CTA that opens a form carries the intended context.
- Inspect Contact, Kochi, Partners and Get Involved forms. Verify server-side validation, persistent storage, consent capture, source page/edition/category tracking, spam protection, duplicate handling, submission loading state, clear failure/retry and a success state only after confirmed storage. Do not claim data is securely logged if it is merely stored in browser state. Keep secrets server-side. Test valid submissions only in a configured test environment with clearly labelled synthetic data; do not send unsolicited test emails or WhatsApp messages.
- Label Hyderabad imagery used in Kochi promotion as archive/announcement imagery, rather than Kochi race documentation. Review the gallery introduction's claim that every item is a race moment. Check filters, search, load more, image loading, lightbox navigation, Escape, keyboard focus and image download behaviour.
- Unify older Privacy/Terms shells with the current header/footer. Preserve policy wording unless authorised changes are required. Correct outdated 2026-only newsletter/footer copy and verify legacy route redirects. Keep legal/safeguarding/accessibility documents reachable.
- Keep reusable city data, status labels, category timing types, contacts and partner scopes in central configuration so pages cannot drift independently.

## 4. Responsive layout and accessibility

Test 360, 390, 430, 768, 1024, 1366 and 1440 pixel widths, plus short landscape viewports and 200%/400% browser zoom. Test Android Chrome and iPhone Safari where available, reporting any environments not exercised.

Ensure no clipped header actions or horizontal page overflow; sensible hero height and crop; legible text; stacked cards/forms; accessible select controls; usable touch targets; visible focus; and floating WhatsApp/social controls that cannot obstruct navigation, consent fields or submit buttons. At 340×234 during zoom testing, floating social buttons overlapped the hamburger. Correct this short-viewport case as well.

For the mobile menu, test open, close, Escape, focus trapping/restoration, scrolling and closing after navigation. Use one main landmark per page; current Contact/Global Goals have nested main elements. Check one descriptive H1, labels and inline errors tied to inputs, screen-reader status announcements and reduced-motion preferences. Add carousel pause behaviour if it auto-advances.

## 5. Search and performance checks

Give all routes accurate unique titles/descriptions. Remove Hyderabad-only wording from general Contact metadata and stale 2026 branding from general Partners metadata. Check Editions and Gallery titles. Confirm route-specific canonical/social URLs and images against the intended production domain; do not change the canonical strategy just because the current review URL is a Vercel preview. Ensure the preview's indexing policy matches the deployment plan. Validate applicable structured data using only confirmed event facts and statuses.

Optimise gallery thumbnails and responsive image sizes; reserve dimensions; prioritise the first hero image and lazy-load lower media. Avoid loading all original race photographs on first render. Measure production-build Lighthouse and Core Web Vitals diagnostics; report actual measurements and test conditions, not invented scores.

## 6. Validation and handover

Run the build and appropriate lint/type checks. Add focused regression coverage for certificate access control, query-to-form mapping, shared event status/data and form API behaviour. Run browser checks for navigation, desktop/mobile menu, edition filters, carousel, SDG selector, FAQs, gallery and all forms. Check direct page loads, refreshes, internal routes and legacy redirects. Test verified certificate downloads and social-card export with approved test fixtures; cover missing records and network failures. Do not use public users' phone numbers.

Deliver the completed changes, screenshots at desktop and phone widths, a concise change list, test results with pass/fail, and any unresolved content/backend dependencies. Distinguish implemented functionality from unavailable integrations. Do not mark the task complete while a public CTA leads to a placeholder success or an unverified official certificate.
