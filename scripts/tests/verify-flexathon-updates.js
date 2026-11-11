const { chromium } = require('playwright');

async function runVerification() {
  console.log('🚀 Starting Comprehensive FLEXATHON Website Verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  let passed = true;

  try {
    // 1. Check Landing Page
    console.log('\n--- 1. Testing Landing Page (/) ---');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Partner strip District by Zomato
    const districtLogo = await page.$('img[alt*="District"]');
    if (districtLogo) {
      console.log('✅ District by Zomato logo is rendered in Partner Strip.');
    } else {
      console.error('❌ District by Zomato logo NOT found in Partner Strip!');
      passed = false;
    }

    // Location link on landing page
    const locationLink = await page.$('a[href="https://share.google/gi3rfRTRt5ZcnPIOR"]');
    if (locationLink) {
      const text = await locationLink.innerText();
      console.log(`✅ Location link found: "${text.trim()}" -> https://share.google/gi3rfRTRt5ZcnPIOR`);
    } else {
      console.error('❌ Location link to https://share.google/gi3rfRTRt5ZcnPIOR NOT found on landing page!');
      passed = false;
    }

    // View Prize Details button
    const prizeBtn = await page.$('a[href="/prize-details"]');
    if (prizeBtn) {
      const text = await prizeBtn.innerText();
      console.log(`✅ View Prize Details button found: "${text.trim().replace(/\s+/g, ' ')}" -> /prize-details`);
    } else {
      console.error('❌ Button pointing to /prize-details NOT found on landing page!');
      passed = false;
    }

    // 2. Check Prize Details Page (/prize-details)
    console.log('\n--- 2. Testing Prize Details Page (/prize-details) ---');
    await page.goto('http://localhost:3000/prize-details', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const title = await page.title();
    console.log(`  Page Title: "${title}"`);

    const prizeText = (await page.evaluate(() => document.body.innerText)).toLowerCase();
    if (prizeText.includes('60,000') && prizeText.includes('10k global goals run') && prizeText.includes('5k fitness run')) {
      console.log('✅ ₹60,000 prize pool and both 10K & 5K breakdowns are verified.');
    } else {
      console.error('❌ Prize content missing expected pool or categories!');
      passed = false;
    }

    if (prizeText.includes('important prize information') && prizeText.includes('rules')) {
      console.log('✅ Important Prize Information & Rules section is verified.');
    } else {
      console.error('❌ Rules section missing!');
      passed = false;
    }

    // Check CTAs on Prize Details
    const reg10k = await page.$('a[href="/registeration?category=10Km"]');
    const reg5k = await page.$('a[href="/registeration?category=5Km"]');
    if (reg10k && reg5k) {
      console.log('✅ Category CTAs link correctly to /registeration?category=10Km and /registeration?category=5Km.');
    } else {
      console.error('❌ Category CTAs missing or incorrect on /prize-details!');
      passed = false;
    }

    // 3. Check Registration Page & Scrolling
    console.log('\n--- 3. Testing Registration Page Scrolling & Benefits ---');
    await page.goto('http://localhost:3000/registeration', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Test wheel scrolling
    const initialScrollY = await page.evaluate(() => window.scrollY);
    console.log(`  Initial scrollY: ${initialScrollY}`);
    
    // Simulate mouse wheel scroll
    await page.mouse.move(600, 400);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1000);

    const scrolledY = await page.evaluate(() => window.scrollY);
    console.log(`  After wheel scroll (500px), window.scrollY: ${scrolledY}`);
    if (scrolledY > 0) {
      console.log(`✅ Native/Lenis wheel scrolling is working smoothly on /registeration! (${scrolledY}px scrolled)`);
    } else {
      console.error('❌ Wheel scrolling is NOT working (scrollY remains 0)!');
      passed = false;
    }

    // Check "WHAT YOUR REGISTRATION INCLUDES"
    const regText = await page.evaluate(() => document.body.innerText);
    if (regText.toUpperCase().includes('WHAT YOUR REGISTRATION INCLUDES')) {
      console.log('✅ "WHAT YOUR REGISTRATION INCLUDES" title found.');
    } else {
      console.error('❌ "WHAT YOUR REGISTRATION INCLUDES" card title NOT found!');
      passed = false;
    }

    const items = [
      'Finisher Medal',
      'Official Event T-Shirt',
      'RFID Timing Chip & Race BIB',
      'Race BIB',
      'Official Participation / Timing E-Certificate',
      'Hot Breakfast & Refreshments',
      'Hydration Stations Every 1.5 KM',
      'On-Route Medical & Ambulance Support'
    ];

    let allItemsFound = true;
    for (const item of items) {
      if (regText.includes(item)) {
        console.log(`  ✓ Found: "${item}"`);
      } else {
        console.error(`❌ Item missing: "${item}"`);
        allItemsFound = false;
        passed = false;
      }
    }
    if (allItemsFound) {
      console.log('✅ All 8 exact items in "WHAT YOUR REGISTRATION INCLUDES" are verified!');
    }

    // Check Registration category pre-selection
    console.log('\n--- 4. Testing Category Pre-selection ---');
    await page.goto('http://localhost:3000/registeration?category=10Km', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    let price10k = await page.evaluate(() => {
      return document.body.innerText.includes('1099');
    });
    console.log(`  Navigating with ?category=10Km price ₹1099: ${price10k}`);
    if (price10k) {
      console.log('✅ 10K category successfully pre-selected.');
    } else {
      console.error('❌ 10K category not pre-selected!');
      passed = false;
    }

    // Test 5K preselection
    await page.goto('http://localhost:3000/registeration?category=5Km', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);
    let price5k = await page.evaluate(() => {
      return document.body.innerText.includes('999');
    });
    console.log(`  Navigating with ?category=5Km price ₹999: ${price5k}`);
    if (price5k) {
      console.log('✅ 5K category successfully pre-selected.');
    } else {
      console.error('❌ 5K category not pre-selected!');
      passed = false;
    }

    // 5. Check Quality Education Page (/2026-quality-education)
    console.log('\n--- 5. Testing Quality Education Page ---');
    await page.goto('http://localhost:3000/2026-quality-education', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const qeText = await page.evaluate(() => document.body.innerText);
    if (qeText.includes('FLEXATHON 2026 is aligned with SDG 4 – Quality Education')) {
      console.log('✅ Updated supporting text found on Quality Education page.');
    } else {
      console.error('❌ Updated text NOT found on Quality Education page!');
      passed = false;
    }

    if (qeText.includes('Quality Education') && qeText.includes('United for One Goal')) {
      console.log('✅ Card 1 (SDG 4 / Quality Education) and Card 2 (3K • 5K • 10K / United for One Goal) found.');
    } else {
      console.error('❌ Quality Education impact cards NOT found!');
      passed = false;
    }

    // 6. Check The Run Page (/the-run)
    console.log('\n--- 6. Testing The Run Page (/the-run) ---');
    await page.goto('http://localhost:3000/the-run', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const theRunLink = await page.$('a[href="https://share.google/gi3rfRTRt5ZcnPIOR"]');
    if (theRunLink) {
      console.log('✅ Location link found on /the-run.');
    } else {
      console.error('❌ Location link NOT found on /the-run!');
      passed = false;
    }

  } catch (err) {
    console.error('Unexpected error during verification:', err);
    passed = false;
  } finally {
    await browser.close();
  }

  if (passed) {
    console.log('\n=============================================================');
    console.log('🎉 ALL 7-POINT FLEXATHON WEBSITE UPDATES VERIFIED SUCCESSFULLY! 🎉');
    console.log('=============================================================\n');
    process.exit(0);
  } else {
    console.error('\n⚠️ Some verification checks failed! Please review logs above.\n');
    process.exit(1);
  }
}

runVerification();
