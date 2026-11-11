import asyncio
import os
from playwright.async_api import async_playwright

SCREENSHOTS_DIR = "public/test-screenshots"
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "iPhone 14 / 15", "width": 390, "height": 844, "is_mobile": True, "has_touch": True},
    {"name": "Pixel 7 / Android", "width": 412, "height": 915, "is_mobile": True, "has_touch": True},
    {"name": "Compact Mobile", "width": 360, "height": 780, "is_mobile": True, "has_touch": True},
]

async def check_horizontal_overflow(page):
    return await page.evaluate("""() => {
        const bodyWidth = document.body.scrollWidth;
        const htmlWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const maxScrollWidth = Math.max(bodyWidth, htmlWidth);
        const hasOverflow = maxScrollWidth > innerWidth + 2; // allowance of 2px
        
        // Find offending elements if any
        let offending = [];
        if (hasOverflow) {
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.right > innerWidth + 2 || rect.left < -2) {
                    offending.push({
                        tag: el.tagName,
                        id: el.id,
                        className: typeof el.className === 'string' ? el.className.slice(0, 50) : '',
                        right: rect.right,
                        width: rect.width
                    });
                }
            });
        }
        return { hasOverflow, maxScrollWidth, innerWidth, offendingCount: offending.length, topOffending: offending.slice(0, 5) };
    }""")

async def test_landing_page(p):
    print("\n==========================================")
    print("  TESTING LANDING PAGE (/) MOBILE RESPONSIVENESS")
    print("==========================================")
    
    browser = await p.chromium.launch(headless=True)
    
    for vp in VIEWPORTS:
        print(f"\n--- Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
        context = await browser.new_context(
            viewport={"width": vp["width"], "height": vp["height"]},
            is_mobile=vp["is_mobile"],
            has_touch=vp["has_touch"],
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1"
        )
        page = await context.new_page()
        
        await page.goto("http://localhost:3000/", wait_until="networkidle", timeout=15000)
        await page.wait_for_timeout(1000)
        
        # Check overflow
        overflow_result = await check_horizontal_overflow(page)
        if not overflow_result["hasOverflow"]:
            print(f"  [PASS] Horizontal Scroll Overflow: NONE (Window: {overflow_result['innerWidth']}px, ScrollWidth: {overflow_result['maxScrollWidth']}px)")
        else:
            print(f"  [FAIL] Horizontal Scroll Overflow Detected: Window {overflow_result['innerWidth']}px, ScrollWidth {overflow_result['maxScrollWidth']}px")
            print(f"         Offending elements count: {overflow_result['offendingCount']}")
            for off in overflow_result["topOffending"]:
                print(f"           - {off['tag']} (class: {off['className']}) width: {off['width']}px, right: {off['right']}px")
        
        # Check floating social dock
        social_dock = await page.evaluate("""() => {
            const dock = document.querySelector('.floating-social-dock');
            if (!dock) return null;
            const rect = dock.getBoundingClientRect();
            const styles = window.getComputedStyle(dock);
            return {
                visible: rect.width > 0 && rect.height > 0,
                display: styles.display,
                flexDirection: styles.flexDirection,
                bottom: rect.bottom,
                right: rect.right,
                left: rect.left,
                width: rect.width,
                height: rect.height
            };
        }""")
        print(f"  [CHECK] Floating Social Dock (WhatsApp & Instagram): {social_dock}")
        
        # Check Navigation burger toggle
        burger_visible = await page.evaluate("""() => {
            const burger = document.querySelector('.nav_burger, [data-burger-toggle]');
            if (!burger) return false;
            const rect = burger.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
        }""")
        print(f"  [CHECK] Mobile Navigation Burger Button Visible: {burger_visible}")

        # Save screenshot
        clean_name = vp['name'].replace(' ', '_').replace('/', '_').lower()
        screenshot_path = f"{SCREENSHOTS_DIR}/landing_{clean_name}.png"
        await page.screenshot(path=screenshot_path)
        print(f"  [SCREENSHOT] Saved viewport screenshot: {screenshot_path}")

        await context.close()
        
    await browser.close()

async def test_admin_page(p):
    print("\n==========================================")
    print("  TESTING ADMIN DASHBOARD (/admin) MOBILE RESPONSIVENESS")
    print("==========================================")
    
    browser = await p.chromium.launch(headless=True)
    vp = VIEWPORTS[0] # iPhone 14 (390 x 844)
    
    context = await browser.new_context(
        viewport={"width": vp["width"], "height": vp["height"]},
        is_mobile=vp["is_mobile"],
        has_touch=vp["has_touch"]
    )
    
    # 1. Login Screen on Mobile
    page = await context.new_page()
    await page.goto("http://localhost:3000/admin", wait_until="networkidle", timeout=15000)
    await page.wait_for_timeout(1000)
    
    login_overflow = await check_horizontal_overflow(page)
    print(f"\n1. Admin Login Screen (390px):")
    print(f"   - Horizontal Overflow: {'NONE [PASS]' if not login_overflow['hasOverflow'] else 'DETECTED [FAIL]'}")
    await page.screenshot(path=f"{SCREENSHOTS_DIR}/admin_login_mobile.png")
    print(f"   - Screenshot saved: {SCREENSHOTS_DIR}/admin_login_mobile.png")
    
    # Perform Login via TEST bypass or cookie
    await page.fill("input[placeholder*='username' i], input[type='text']", "jibintcr")
    await page.fill("input[type='password']", "master123$#")
    captcha_input = await page.query_selector("input[placeholder*='captcha' i], input[placeholder*='code' i]")
    if captcha_input:
        await captcha_input.fill("TEST")
    
    submit_btn = await page.query_selector("button[type='submit']")
    if submit_btn:
        await submit_btn.click()
        await page.wait_for_timeout(2500)
    
    # 2. Main Dashboard on Mobile
    dash_overflow = await check_horizontal_overflow(page)
    print(f"\n2. Admin Main Dashboard (390px):")
    print(f"   - Horizontal Overflow: {'NONE [PASS]' if not dash_overflow['hasOverflow'] else 'DETECTED [FAIL]'}")
    
    # Check Header & Mobile Sidebar Toggle
    header_state = await page.evaluate("""() => {
        const toggle = document.querySelector('.admin-mobile-toggle');
        const header = document.querySelector('header');
        return {
            headerFound: !!header,
            toggleFound: !!toggle,
            toggleVisible: toggle ? (window.getComputedStyle(toggle).display !== 'none') : false
        };
    }""")
    print(f"   - Header & Mobile Sidebar Hamburger Toggle: {header_state}")
    
    # Check Table Responsiveness (Overflow containment)
    tables_state = await page.evaluate("""() => {
        const tables = document.querySelectorAll('table');
        const wrappers = document.querySelectorAll('div[style*="overflowX"], div[style*="overflow-x"]');
        return {
            tableCount: tables.length,
            scrollContainersCount: wrappers.length
        };
    }""")
    print(f"   - Tables & Horizontal Scroll Wrappers: {tables_state}")
    
    await page.screenshot(path=f"{SCREENSHOTS_DIR}/admin_dashboard_mobile.png")
    print(f"   - Screenshot saved: {SCREENSHOTS_DIR}/admin_dashboard_mobile.png")
    
    # 3. Coupons Tab on Mobile
    coupon_nav_btn = await page.evaluate("""() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const target = buttons.find(b => b.textContent && b.textContent.includes('Coupons'));
        if (target) {
            target.click();
            return true;
        }
        return false;
    }""")
    if coupon_nav_btn:
        await page.wait_for_timeout(1000)
        coupons_overflow = await check_horizontal_overflow(page)
        print(f"\n3. Admin Coupons Tab (390px):")
        print(f"   - Horizontal Overflow: {'NONE [PASS]' if not coupons_overflow['hasOverflow'] else 'DETECTED [FAIL]'}")
        await page.screenshot(path=f"{SCREENSHOTS_DIR}/admin_coupons_mobile.png")
        print(f"   - Screenshot saved: {SCREENSHOTS_DIR}/admin_coupons_mobile.png")

    await context.close()
    await browser.close()

async def main():
    async with async_playwright() as p:
        await test_landing_page(p)
        await test_admin_page(p)
    print("\n==========================================")
    print("  ALL MOBILE TESTS COMPLETED!")
    print("==========================================")

if __name__ == "__main__":
    asyncio.run(main())
