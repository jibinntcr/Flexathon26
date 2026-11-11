"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Track Page Views
  useEffect(() => {
    // Exclude admin panel internal pages from inflating public visitor metrics if desired, or track all
    if (pathname && !pathname.startsWith("/admin")) {
      try {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "pageview", path: pathname }),
          keepalive: true
        }).catch(() => {});
      } catch {}
    }
  }, [pathname]);

  // Track CTA & Button Clicks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Check if target or parent is a button or link
        const interactiveEl = target.closest("button, a, input[type='submit'], [role='button']");
        if (interactiveEl) {
          const text = (interactiveEl.textContent || (interactiveEl as HTMLInputElement).value || interactiveEl.getAttribute("aria-label") || interactiveEl.id || "").trim();
          const href = interactiveEl.getAttribute("href") || "";
          
          // Only track meaningful interactions
          if (text || href) {
            const isRegisterCta = 
              href.includes("registeration") || 
              /register|join the run|get tickets|sign up/i.test(text);

            fetch("/api/analytics/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: isRegisterCta ? "register_cta_click" : "click",
                path: window.location.pathname,
                label: (text || href).slice(0, 60),
                meta: {
                  isRegisterCta
                }
              }),
              keepalive: true
            }).catch(() => {});
          }
        }
      } catch {}
    };

    document.addEventListener("click", handleDocumentClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return null;
}
