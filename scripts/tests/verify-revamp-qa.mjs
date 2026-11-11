import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const ENQUIRIES_FILE = path.join(process.cwd(), 'enquiries.json');

const EXACT_SDG_NAMES = [
    'No Poverty',
    'Zero Hunger',
    'Good Health and Well-being',
    'Quality Education',
    'Gender Equality',
    'Clean Water and Sanitation',
    'Affordable and Clean Energy',
    'Decent Work and Economic Growth',
    'Industry, Innovation and Infrastructure',
    'Reduced Inequalities',
    'Sustainable Cities and Communities',
    'Responsible Consumption and Production',
    'Climate Action',
    'Life Below Water',
    'Life on Land',
    'Peace, Justice and Strong Institutions',
    'Partnerships for the Goals',
];

async function runQa() {
    const enquiriesBackup = fs.existsSync(ENQUIRIES_FILE)
        ? fs.readFileSync(ENQUIRIES_FILE, 'utf8')
        : '[]';

    const browser = await chromium.launch({ headless: true, channel: 'chrome' });
    const results = [];

    try {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

        // 1. Master Homepage (/)
        const resHome = await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const homeText = await page.textContent('body');
        const hasMasterHero =
            homeText.includes('17 GOALS.') &&
            homeText.includes('ONE MOVEMENT.') &&
            homeText.includes('EVERY CITY.') &&
            homeText.includes('MORE THAN A RUN. A MOVEMENT.') &&
            homeText.includes('EVERY CITY. A NEW STARTING LINE.') &&
            homeText.includes('17 GLOBAL GOALS. ONE SHARED FUTURE.') &&
            homeText.includes('ONE FINISH LINE. THE START OF SOMETHING BIGGER.') &&
            homeText.includes('EVERY STEP IS PART OF THE EXPERIENCE.') &&
            homeText.includes('BEYOND THE FINISH LINE.') &&
            homeText.includes('STRONGER TOGETHER.') &&
            homeText.includes('YOUR CITY. YOUR RUN. YOUR IMPACT.');
        const homeOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        results.push({
            check: 'Master Homepage (/) sections A-J & no horizontal overflow',
            status: resHome.status(),
            passed: resHome.status() === 200 && hasMasterHero && !homeOverflow,
        });

        // 2. Hyderabad Completed Edition (/hydoct18)
        const resHyd = await page.goto(`${BASE_URL}/hydoct18`, { waitUntil: 'domcontentloaded' });
        const hydText = await page.textContent('body');
        const hasHydFacts =
            hydText.includes('Hyderabad 2026 — Successfully Concluded') &&
            hydText.includes('18 October 2026') &&
            hydText.includes('ESCI') &&
            hydText.includes('₹749') &&
            hydText.includes('₹999') &&
            hydText.includes('₹1,099') &&
            hydText.includes('₹60,000') &&
            hydText.includes('Quality Education');
        results.push({
            check: 'Hyderabad Completed Edition (/hydoct18) historic facts & completed state',
            status: resHyd.status(),
            passed: resHyd.status() === 200 && hasHydFacts,
        });

        // 3. Hyderabad Child Routes
        const hydChildRoutes = [
            '/hydoct18/the-run',
            '/hydoct18/prize-details',
            '/hydoct18/global-goal',
            '/hydoct18/social-card',
            '/hydoct18/runner-stories',
            '/hydoct18/faqs',
            '/hydoct18/gallery',
            '/hydoct18/results',
        ];
        for (const r of hydChildRoutes) {
            const resp = await page.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded' });
            results.push({
                check: `Hyderabad child route ${r}`,
                status: resp.status(),
                passed: resp.status() === 200,
            });
        }

        // 4. Kochi Coming Soon (/kochi2027) — No fabricated date/price & working interest form
        const resKochi = await page.goto(`${BASE_URL}/kochi2027`, { waitUntil: 'domcontentloaded' });
        const kochiText = await page.textContent('body');
        const kochiHonest =
            kochiText.includes('Coming Soon') &&
            kochiText.includes('Kochi, Kerala') &&
            kochiText.includes('To Be Announced') &&
            !kochiText.includes('₹749') &&
            !kochiText.includes('Tata Copper+');
        results.push({
            check: 'Kochi Edition (/kochi2027) Coming Soon honesty & partner/price isolation',
            status: resKochi.status(),
            passed: resKochi.status() === 200 && kochiHonest,
        });

        // Submit Kochi interest form via browser
        await page.fill('#kochi-name', 'Playwright Kochi Tester');
        await page.fill('#kochi-email', 'playwright-test-kochi@example.com');
        await page.check('input[type="checkbox"]');
        await page.click('button[type="submit"]');
        await page.waitForSelector('div[role="status"]', { timeout: 5000 });
        const statusMsg = await page.textContent('div[role="status"]');
        const savedEnquiries = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, 'utf8'));
        const foundKochiLead = savedEnquiries.find(
            (e) => e.email === 'playwright-test-kochi@example.com' && e.edition === 'kochi2027'
        );
        results.push({
            check: 'Kochi Interest Form submission & backend persistence with edition isolation',
            status: 200,
            passed: Boolean(statusMsg?.includes('Thank you')) && Boolean(foundKochiLead),
        });

        // 5. All 17 Global Goals (/global-goals) exact official names
        const resGoals = await page.goto(`${BASE_URL}/global-goals`, { waitUntil: 'domcontentloaded' });
        const goalsText = await page.textContent('body');
        const all17Exact = EXACT_SDG_NAMES.every((name) => goalsText.includes(name));
        results.push({
            check: 'Global Goals (/global-goals) all 17 exact official UN SDG names',
            status: resGoals.status(),
            passed: resGoals.status() === 200 && all17Exact,
        });

        // 6. All Master Routes & Legacy Routes
        const otherRoutes = [
            '/about',
            '/editions',
            '/impact',
            '/gallery',
            '/partners',
            '/get-involved',
            '/contact',
            '/2026-quality-education',
            '/the-run',
            '/prize-details',
            '/social-card',
            '/stories',
            '/faqs',
            '/registeration',
            '/privacy-policy',
            '/terms-of-use',
            '/refund-policy',
            '/participant-waiver',
            '/safeguarding-policy',
        ];
        for (const r of otherRoutes) {
            const resp = await page.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded' });
            results.push({
                check: `Route ${r}`,
                status: resp.status(),
                passed: resp.status() === 200,
            });
        }

        // 7. Unknown edition slug returns 404
        const res404 = await page.goto(`${BASE_URL}/editions/unknown-unverified-city`, {
            waitUntil: 'domcontentloaded',
        });
        results.push({
            check: 'Unknown edition slug (/editions/unknown-unverified-city) returns HTTP 404',
            status: res404.status(),
            passed: res404.status() === 404,
        });

        // 8. Admin API auth protection check
        const adminCheck = await page.evaluate(async () => {
            const r = await fetch('/api/admin/editions');
            return r.status;
        });
        results.push({
            check: 'Admin API (/api/admin/editions) blocks unauthenticated access (401)',
            status: adminCheck,
            passed: adminCheck === 401,
        });

        // 9. Mobile viewport (390px) overflow & menu check
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
        const mobileOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        await page.click('button.mobile-toggle');
        const mobileDrawerVisible = await page.isVisible('#mobile-primary-drawer');
        results.push({
            check: 'Mobile viewport (390px) zero overflow & accessible mobile drawer',
            status: 200,
            passed: !mobileOverflow && mobileDrawerVisible,
        });
    } finally {
        await browser.close();
        // Restore enquiries.json so synthetic test records do not pollute production data
        fs.writeFileSync(ENQUIRIES_FILE, enquiriesBackup);
    }

    console.log('\n=== PLAYWRIGHT QA SUMMARY ===');
    let failed = 0;
    for (const r of results) {
        console.log(`${r.passed ? 'PASS' : 'FAIL'} [${r.status}] - ${r.check}`);
        if (!r.passed) failed++;
    }
    if (failed > 0) {
        process.exit(1);
    }
}

runQa().catch((err) => {
    console.error(err);
    process.exit(1);
});
