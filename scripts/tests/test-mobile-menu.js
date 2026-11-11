const { chromium } = require('playwright');
const path = require('path');

async function testMobileMenu() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  console.log('Testing Mobile Menu Drawer at 390px...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check toggle button
  const toggleBtn = page.locator('button[aria-label="Toggle Navigation Menu"]');
  const isVisible = await toggleBtn.isVisible();
  console.log('Hamburger Toggle visible:', isVisible);

  // Click toggle to open
  await toggleBtn.click();
  await page.waitForTimeout(600);

  // Check mobile drawer
  const drawer = page.locator('.mobile-drawer-wrap');
  const drawerVisible = await drawer.isVisible();
  console.log('Mobile Drawer visible:', drawerVisible);

  // Capture screenshot of open menu
  const ssPath = path.join(__dirname, '../public/audit-results/mobile-menu-drawer-390px.png');
  await page.screenshot({ path: ssPath });
  console.log('Screenshot saved to:', ssPath);

  // Check all navigation links
  const links = ['About', 'Global Goals', '2026 Edition', 'The Run', 'Get Involved', 'Social Card', 'Contact'];
  for (const label of links) {
    const linkLocator = page.locator(`.mobile-nav-link:has-text("${label}")`);
    const count = await linkLocator.count();
    console.log(`Nav link "${label}" present:`, count > 0);
  }

  // Click close button
  await toggleBtn.click();
  await page.waitForTimeout(400);
  const drawerVisibleAfterClose = await drawer.isVisible();
  console.log('Drawer hidden after toggle close:', !drawerVisibleAfterClose);

  await browser.close();
  console.log('✅ Mobile Menu Interaction Test Complete!');
}

testMobileMenu().catch(console.error);
