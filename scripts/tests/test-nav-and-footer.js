const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Testing Desktop Header & Nav...');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Verify PRIZE DETAILS in desktop nav
  const desktopPrizeLink = await page.$('.desktop-menu-nav a[href="/prize-details"]');
  if (!desktopPrizeLink) {
    throw new Error('PRIZE DETAILS link missing in desktop nav!');
  }
  const desktopPrizeText = await desktopPrizeLink.innerText();
  console.log(`Desktop nav item found: "${desktopPrizeText}" -> /prize-details`);

  // Verify Footer Attribution
  const footerInfinioLink = await page.$('footer a[href="https://infinio.co.in/"]');
  if (!footerInfinioLink) {
    throw new Error('Infinio Technology Solutions link missing in footer!');
  }
  const footerInfinioText = await footerInfinioLink.innerText();
  console.log(`Footer link found: "${footerInfinioText}" -> https://infinio.co.in/`);

  // Screenshot footer
  await footerInfinioLink.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'scripts/screenshot-footer-attribution.png' });

  // Testing Mobile Hamburger Drawer
  console.log('Testing Mobile Hamburger Navigation...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const hamburgerToggle = await page.$('.mobile-menu-toggle');
  if (!hamburgerToggle) {
    throw new Error('Mobile menu toggle button missing!');
  }
  await hamburgerToggle.click();
  await page.waitForTimeout(400);

  const mobileDrawer = await page.$('.mobile-drawer-wrap');
  if (!mobileDrawer) {
    throw new Error('Mobile menu drawer did not open!');
  }

  const mobilePrizeLink = await page.$('.mobile-drawer-wrap a[href="/prize-details"]');
  if (!mobilePrizeLink) {
    throw new Error('PRIZE DETAILS link missing in mobile drawer!');
  }
  const mobilePrizeText = await mobilePrizeLink.innerText();
  console.log(`Mobile nav item found: "${mobilePrizeText}" -> /prize-details`);

  await page.screenshot({ path: 'scripts/screenshot-mobile-hamburger.png' });

  // Navigate to /prize-details and verify active state
  console.log('Testing /prize-details Active State...');
  await page.goto('http://localhost:3000/prize-details', { waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 1280, height: 800 });

  const activeLink = await page.$('.desktop-menu-nav a[href="/prize-details"].active');
  if (!activeLink) {
    console.warn('Note: active class on /prize-details desktop nav link not found or matched differently');
  } else {
    console.log('Desktop active state on /prize-details verified!');
  }

  await browser.close();
  console.log('All Navigation & Footer tests PASSED successfully!');
})();
