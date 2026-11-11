const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function verifyHeroVisual() {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "mobile-390px", width: 390, height: 844 },
    { name: "mobile-360px", width: 360, height: 800 },
    { name: "mobile-430px", width: 430, height: 932 },
    { name: "desktop-1280px", width: 1280, height: 900 }
  ];

  const outDir = path.join(process.cwd(), "test-screenshots");
  fs.mkdirSync(outDir, { recursive: true });

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const heroCol = page.locator(".hero-visual-col");
    await heroCol.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const screenshotPath = path.join(outDir, `hero_${vp.name}.png`);
    await heroCol.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot to ${screenshotPath}`);

    // Inspect hero runner card geometry
    const heroVisualMetrics = await page.evaluate(() => {
      const col = document.querySelector(".hero-visual-col");
      const badges = document.querySelector(".hero-benefit-badges");
      const card = document.querySelector(".hero-runner-card-inner");
      const runnerWrap = document.querySelector(".hero-runner-wrap");
      const wave = document.querySelector(".hero-runner-card-inner .wave-glow");
      const monument = document.querySelector(".hero-runner-card-inner .monument-mask");

      if (!col || !card || !runnerWrap) return null;

      const colBox = col.getBoundingClientRect();
      const badgesBox = badges ? badges.getBoundingClientRect() : null;
      const cardBox = card.getBoundingClientRect();
      const runnerBox = runnerWrap.getBoundingClientRect();
      const waveBox = wave ? wave.getBoundingClientRect() : null;

      return {
        colBox: { top: colBox.top, height: colBox.height, width: colBox.width },
        badgesBox: badgesBox ? { top: badgesBox.top, bottom: badgesBox.bottom, height: badgesBox.height } : null,
        cardBox: { top: cardBox.top, left: cardBox.left, width: cardBox.width, height: cardBox.height },
        runnerBox: { top: runnerBox.top, left: runnerBox.left, right: runnerBox.right, width: runnerBox.width, height: runnerBox.height },
        waveBox: waveBox ? { top: waveBox.top, bottom: waveBox.bottom } : null
      };
    });

    console.log(`Metrics for ${vp.name}:`, JSON.stringify(heroVisualMetrics, null, 2));

    await context.close();
  }

  await browser.close();
}

verifyHeroVisual().catch((err) => {
  console.error("Visual test error:", err);
  process.exit(1);
});
