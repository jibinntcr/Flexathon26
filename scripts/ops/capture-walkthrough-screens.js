const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const artifactDir = 'C:/Users/dhani/.gemini/antigravity-ide/brain/fd16c393-f94c-4e09-af65-fa495afc84f2';

  // 1. Landing Page Partner Strip & Prize Pool CTA
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-landing-hero.png'), fullPage: false });

  // 2. Prize Details Page
  await page.goto('http://localhost:3000/prize-details', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-prize-details.png'), fullPage: false });

  // 3. Registration Page & Benefits
  await page.goto('http://localhost:3000/registeration?category=10Km', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-registration.png'), fullPage: false });

  // 4. Quality Education Page
  await page.goto('http://localhost:3000/2026-quality-education', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  // Scroll to impact section
  await page.evaluate(() => {
    const el = document.querySelector('.impact-pledge-card');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-quality-education.png'), fullPage: false });

  console.log('Screenshots captured successfully in artifact directory!');
  await browser.close();
}

captureScreenshots();
