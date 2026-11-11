const { chromium } = require('playwright');
const path = require('path');

async function testPartnerStrip() {
  const browser = await chromium.launch({ headless: true });

  const artifactDir = 'C:/Users/dhani/.gemini/antigravity-ide/brain/fd16c393-f94c-4e09-af65-fa495afc84f2';

  // 1. Desktop Test (1280x800)
  console.log('--- Testing Desktop View (1280x800) ---');
  const pageDesktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);

  const desktopDims = await pageDesktop.evaluate(() => {
    const strip = document.querySelector('#partners');
    const images = Array.from(strip.querySelectorAll('.promo-logos-desktop img, .flexon-box img')).map(img => ({
      alt: img.alt,
      width: img.offsetWidth,
      height: img.offsetHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
    return {
      stripWidth: strip.offsetWidth,
      stripHeight: strip.offsetHeight,
      images
    };
  });
  console.log('Desktop Dimensions & Visibility:', JSON.stringify(desktopDims, null, 2));

  // Scroll to partner strip and screenshot
  await pageDesktop.evaluate(() => {
    document.querySelector('#partners').scrollIntoView({ block: 'center' });
  });
  await pageDesktop.waitForTimeout(500);
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-partner-desktop.png') });

  // 2. Mobile Test (390x844 - iPhone 12/13/14)
  console.log('\n--- Testing Mobile View (390x844) ---');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);

  const mobileDims = await pageMobile.evaluate(() => {
    const strip = document.querySelector('#partners');
    const images = Array.from(strip.querySelectorAll('.promo-logos-mobile img, .flexon-box img')).map(img => ({
      alt: img.alt,
      width: img.offsetWidth,
      height: img.offsetHeight,
      visible: img.offsetWidth > 0 && img.offsetHeight > 0
    }));
    return {
      stripWidth: strip.offsetWidth,
      stripHeight: strip.offsetHeight,
      images
    };
  });
  console.log('Mobile Dimensions & Visibility:', JSON.stringify(mobileDims, null, 2));

  await pageMobile.evaluate(() => {
    document.querySelector('#partners').scrollIntoView({ block: 'center' });
  });
  await pageMobile.waitForTimeout(500);
  await pageMobile.screenshot({ path: path.join(artifactDir, 'screenshot-partner-mobile.png') });

  await browser.close();
  console.log('\n✅ Partner strip test complete and screenshots saved.');
}

testPartnerStrip();
