const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const viewports = [
  { width: 320, height: 640, name: '320px-mobile' },
  { width: 360, height: 640, name: '360px-mobile' },
  { width: 375, height: 667, name: '375px-mobile' },
  { width: 390, height: 844, name: '390px-mobile' },
  { width: 412, height: 915, name: '412px-mobile' },
  { width: 430, height: 932, name: '430px-mobile' },
  { width: 768, height: 1024, name: '768px-tablet' },
  { width: 1024, height: 768, name: '1024px-tablet-laptop' }
];

const pages = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/global-goals', name: 'global-goals' },
  { path: '/2026-quality-education', name: '2026-quality-education' },
  { path: '/the-run', name: 'the-run' },
  { path: '/get-involved', name: 'get-involved' },
  { path: '/social-card', name: 'social-card' },
  { path: '/contact', name: 'contact' },
  { path: '/registeration', name: 'registeration' }
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const resultsDir = path.join(__dirname, '../public/audit-results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const issues = [];
  console.log('=== STARTING PLAYWRIGHT MOBILE AUDIT ===\n');

  for (const vp of viewports) {
    console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    });
    const page = await context.newPage();

    for (const p of pages) {
      const url = `http://localhost:3000${p.path}`;
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await page.waitForTimeout(800);

        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const isOverflowing = scrollWidth > clientWidth + 1;

          const overflowingElements = [];
          if (isOverflowing) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > clientWidth + 1 || rect.left < -1) {
                const tag = el.tagName.toLowerCase();
                const cls = el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '';
                const id = el.id ? '#' + el.id : '';
                overflowingElements.push({
                  selector: `${tag}${id}${cls}`,
                  left: Math.round(rect.left),
                  right: Math.round(rect.right),
                  width: Math.round(rect.width)
                });
                if (overflowingElements.length >= 5) break;
              }
            }
          }

          return {
            scrollWidth,
            clientWidth,
            isOverflowing,
            overflowingElements
          };
        });

        if (overflow.isOverflowing) {
          const issue = {
            viewport: vp.name,
            width: vp.width,
            page: p.path,
            scrollWidth: overflow.scrollWidth,
            clientWidth: overflow.clientWidth,
            excess: overflow.scrollWidth - overflow.clientWidth,
            elements: overflow.overflowingElements
          };
          issues.push(issue);
          console.log(`❌ OVERFLOW on ${p.path} [${vp.name}]: width ${overflow.scrollWidth}px vs viewport ${overflow.clientWidth}px (+${issue.excess}px)`);
          if (overflow.overflowingElements.length > 0) {
            console.log(`   Overflowing elements:`, overflow.overflowingElements.map(e => `${e.selector} (w:${e.width}, r:${e.right})`).join(', '));
          }
        } else {
          console.log(`✅ OK ${p.path} [${vp.name}]`);
          if (vp.width === 390 || vp.width === 768) {
            const ssName = `${p.name}-${vp.width}px.png`;
            await page.screenshot({ path: path.join(resultsDir, ssName), fullPage: false });
          }
        }

      } catch (err) {
        console.error(`⚠️ Error loading ${p.path} [${vp.name}]:`, err.message);
      }
    }
    await context.close();
  }

  await browser.close();

  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`Total overflow issues detected: ${issues.length}`);
  fs.writeFileSync(path.join(resultsDir, 'audit-issues.json'), JSON.stringify(issues, null, 2));
}

runAudit().catch(console.error);
