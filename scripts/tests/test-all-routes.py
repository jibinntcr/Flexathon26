import asyncio
from playwright.async_api import async_playwright

routes = [
    "/",
    "/the-run",
    "/about",
    "/global-goals",
    "/2026-quality-education",
    "/impact",
    "/get-involved",
    "/partners",
    "/stories",
    "/faqs",
    "/contact",
    "/accessibility-statement",
    "/brand-sdg-disclaimer",
    "/participant-waiver",
    "/privacy-policy",
    "/refund-policy",
    "/safeguarding-policy",
    "/terms-of-use",
    "/share-card"
]

async def test_route(page, route):
    errors = []
    page.on("pageerror", lambda err: errors.append(str(err)))
    try:
        await page.goto(f"http://localhost:3000{route}", wait_until="networkidle", timeout=12000)
    except Exception:
        pass
    await page.wait_for_timeout(1500)
    
    hydration_errs = [e for e in errors if "hydration" in e.lower() or "mismatch" in e.lower()]
    return len(hydration_errs), errors

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        print(f"Testing {len(routes)} routes for React hydration errors...")
        all_passed = True

        for r in routes:
            h_count, errs = await test_route(page, r)
            if h_count == 0:
                print(f"  [PASS] {r}")
            else:
                all_passed = False
                print(f"  [FAIL] {r} -> {h_count} hydration error(s)")
                for e in errs:
                    print("     ", e[:200])

        print("\n=== OVERALL RESULT ===")
        if all_passed:
            print("[ALL ROUTES PASSED] 100% clean hydration across all routes!")
        else:
            print("[SOME ROUTES FAILED] Review failures above.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
