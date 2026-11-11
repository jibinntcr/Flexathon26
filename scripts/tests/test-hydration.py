import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        console_messages = []
        page_errors = []

        page.on("console", lambda msg: console_messages.append(f"[{msg.type.upper()}] {msg.text}"))
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        print("Navigating to http://localhost:3000 in clean Playwright Chromium...")
        try:
            await page.goto("http://localhost:3000", wait_until="networkidle", timeout=15000)
        except Exception as e:
            print(f"Navigation note (networkidle timeout or load): {e}")

        # Wait an extra 5 seconds for client scripts, GSAP, Barba, Webflow, and React hydration
        await page.wait_for_timeout(5000)

        # Capture screenshot
        await page.screenshot(path="playwright_localhost.png", full_page=False)
        print("Screenshot captured: playwright_localhost.png")

        print("\n=== CONSOLE MESSAGES (" + str(len(console_messages)) + ") ===")
        for msg in console_messages:
            print(msg)

        print("\n=== PAGE ERRORS (" + str(len(page_errors)) + ") ===")
        for err in page_errors:
            print(err)

        hydration_errors = [m for m in console_messages if "hydration" in m.lower() or "mismatch" in m.lower()]
        hydration_page_errors = [e for e in page_errors if "hydration" in e.lower() or "mismatch" in e.lower()]

        print("\n=== HYDRATION AUDIT RESULT ===")
        if not hydration_errors and not hydration_page_errors:
            print("[SUCCESS] ZERO hydration errors found in clean browser session!")
        else:
            print(f"[FAIL] Found {len(hydration_errors)} hydration console messages and {len(hydration_page_errors)} page errors:")
            for h in hydration_errors:
                print("  Console:", h)
            for h in hydration_page_errors:
                print("  PageError:", h)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
