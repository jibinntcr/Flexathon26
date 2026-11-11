"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// The vendor script's reveal animations (hero headline/nav, footer CTA,
// signature handwriting, drawn underlines, etc.) all start elements hidden
// with `autoAlpha: 0` + `filter: blur(20px)` and tween them to visible. If
// the tween that's supposed to reveal a given element never runs or never
// completes (a killed GSAP context, a ScrollTrigger that never fires because
// it mis-measured position right after an SPA navigation, an exception
// thrown elsewhere in the same init call, etc.), that element is left
// permanently blurred and invisible — which is what a "frozen"/blank page
// looks like to a visitor even though React and the route itself are fine.
// This sweeps for exactly that GSAP-authored signature (blurred AND hidden
// at the same time — not just "opacity: 0", which legitimate hover/closed
// UI also uses) and forces it visible as a last resort.
const forceRevealStuckElements = (root: ParentNode) => {
  try {
    root.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
      const isBlurred = /blur\(\s*[1-9]/.test(el.style.filter || '');
      const isHidden = el.style.opacity === '0' || el.style.visibility === 'hidden';
      if (isBlurred && isHidden) {
        el.style.filter = '';
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }
    });
  } catch (err) {
    console.warn('forceRevealStuckElements failed:', err);
  }
};

const closeMobileMenuImmediately = () => {
  try {
    document.body.classList.remove('burger-open');
    const w = window as any;
    if (w.lenis && typeof w.lenis.start === 'function') {
      w.lenis.start();
    }
    const toggle = document.querySelector('[data-burger-toggle]');
    if (toggle) {
      const lineTop = toggle.querySelector('[data-burger-line="top"]');
      const lineBottom = toggle.querySelector('[data-burger-line="bottom"]');
      if (w.gsap) {
        if (lineTop) w.gsap.set(lineTop, { y: 0, rotation: 0 });
        if (lineBottom) w.gsap.set(lineBottom, { y: 0, rotation: 0 });
      }
    }
    const burger = document.querySelector('[data-burger]');
    const bg = burger?.querySelector('[data-burger-bg]');
    if (w.gsap && bg) {
      w.gsap.set(bg, { opacity: 0 });
    }
  } catch (err) {
    console.warn("closeMobileMenuImmediately failed:", err);
  }
};

export default function TransitionManager() {
  const pathname = usePathname();
  const router = useRouter();
  const lastPath = useRef(pathname);
  const [scriptsReady, setScriptsReady] = useState(false);
  const isTransitionActive = useRef(false);

  // Check if third party scripts are loaded
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScripts = () => {
      if ((window as any).initOnceFunctions && (window as any).gsap) {
        setScriptsReady(true);
        return true;
      }
      return false;
    };

    if (checkScripts()) return;

    const handleScriptsLoaded = () => {
      checkScripts();
    };

    window.addEventListener("scripts-loaded", handleScriptsLoaded);
    // Fallback interval
    const interval = setInterval(() => {
      if (checkScripts()) {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      window.removeEventListener("scripts-loaded", handleScriptsLoaded);
      clearInterval(interval);
    };
  }, []);

  // Handle Initial Load Initialization
  useEffect(() => {
    if (!scriptsReady) return;

    // Skip Barba-like initializations for admin and registeration pages to keep them standard React
    const normalizedPathname = (pathname || '').replace(/\/+$/, '') || '/';
    if (normalizedPathname === '/registeration' || normalizedPathname === '/admin') {
      const loader = document.querySelector('[data-pageloader]');
      if (loader) {
        (loader as HTMLElement).style.display = 'none';
      }
      document.body.classList.remove('pageloader-active');
      return;
    }

    const initPage = async () => {
      const w = window as any;
      try {
        if (w.initOnceFunctions) w.initOnceFunctions();
      } catch (err) {
        console.warn("Init failed:", err);
      } finally {
        const loader = document.querySelector('[data-pageloader]');
        if (loader) (loader as HTMLElement).style.display = 'none';
        document.body.classList.remove('pageloader-active');
      }

      const container = document.querySelector('[data-barba="container"]');
      if (container) {
        try {
          if (w.resetPage) w.resetPage(container);
          if (w.initBeforeEnterFunctions) w.initBeforeEnterFunctions(container);
          if (w.initAfterEnterFunctions) w.initAfterEnterFunctions(container);
          if (w.initHeroReveal) w.initHeroReveal(container);
        } catch (err) {
          console.warn("Page init functions failed on first load:", err);
        }
        setTimeout(() => forceRevealStuckElements(container), 2500);
      }
    };

    initPage();
  }, [scriptsReady]);

  // Intercept all link clicks globally
  useEffect(() => {
    if (!scriptsReady) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      // Ignore standard modifier keys
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore mailto, tel, target="_blank", downloads, and hashes
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.getAttribute("target") === "_blank" || link.hasAttribute("download")) {
        return;
      }

      // Same-Origin Check
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const linkPath = url.pathname.replace(/\/+$/, '') || '/';
        const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

        // Same page click, ignore
        if (linkPath === currentPath) return;

        // Immediately close mobile hamburger menu on link click
        closeMobileMenuImmediately();

        // Skip transitions for admin and registeration
        if (linkPath === '/registeration' || linkPath === '/admin') {
          return; // Let native browser navigation take place
        }

        // Intercept navigation
        e.preventDefault();
        isTransitionActive.current = true;

        // Run Leave animation
        const w = window as any;
        const gsap = w.gsap;
        const transitionWrap = document.querySelector('[data-transition-wrap]');
        const transitionDark = transitionWrap?.querySelector('[data-transition-dark]');
        const currentContainer = document.querySelector('[data-barba="container"]');

        if (gsap && transitionWrap && transitionDark && currentContainer) {
          try {
            gsap.killTweensOf([transitionWrap, transitionDark, currentContainer]);
            gsap.set(transitionWrap, { zIndex: 99999 });

            // Guard against the animation ever getting stuck (e.g. a paused
            // GSAP ticker, a backgrounded tab, or the timeline throwing
            // mid-flight) leaving the site navigable-looking but frozen:
            // navigation itself is guaranteed to happen exactly once, either
            // from the animation completing or from this fallback timer.
            let navigated = false;
            const doNavigate = () => {
              if (navigated) return;
              navigated = true;
              router.push(href);
            };
            const fallbackTimer = setTimeout(doNavigate, 900);

            const tl = gsap.timeline({
              onComplete: () => {
                clearTimeout(fallbackTimer);
                doNavigate();
              }
            });

            tl.fromTo(transitionDark,
              { autoAlpha: 0 },
              { autoAlpha: 0.8, duration: 0.35, ease: 'power2.inOut' }
            );
          } catch (err) {
            console.warn("Leave animation failed, navigating directly:", err);
            router.push(href);
          }
        } else {
          router.push(href);
        }
      } catch (err) {
        // Fallback
        router.push(href);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [scriptsReady, router]);

  // Route updates (Enter transition and re-initializations)
  useEffect(() => {
    if (!scriptsReady) return;
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    const timer = setTimeout(() => {
      const w = window as any;
      const gsap = w.gsap;
      const nextContainer = document.querySelector('[data-barba="container"]');
      const transitionWrap = document.querySelector('[data-transition-wrap]');
      const transitionDark = transitionWrap?.querySelector('[data-transition-dark]');

      const normalizedPathname = (pathname || '').replace(/\/+$/, '') || '/';
      if (normalizedPathname === '/registeration' || normalizedPathname === '/admin') {
        // Hide transition overlays immediately using bulletproof raw style props
        if (transitionWrap) {
          gsap?.set(transitionWrap, { zIndex: -1 });
          (transitionWrap as HTMLElement).style.zIndex = "-1";
          (transitionWrap as HTMLElement).style.pointerEvents = "none";
        }
        if (transitionDark) {
          gsap?.set(transitionDark, { autoAlpha: 0 });
          (transitionDark as HTMLElement).style.opacity = "0";
          (transitionDark as HTMLElement).style.visibility = "hidden";
        }
        isTransitionActive.current = false;
        // Ensure Lenis is active and running smoothly for fluid mouse wheel and touch scrolling
        if (w.lenis && typeof w.lenis.start === "function") {
          try {
            w.lenis.start();
          } catch (e) {}
        }
        return;
      }

      // Tear down the previous page's GSAP timelines, ScrollTriggers, Draggables
      // and event listeners before initializing the new page. The vendor script's
      // cleanup registry was written to be driven by barba.js hooks (beforeLeave/
      // afterLeave), but barba.init() is never called here — TransitionManager
      // drives navigation itself — so without this call, cleanups registered by
      // every previously-visited page just pile up forever. On revisiting a page
      // with interactive widgets (sliders, parallax, draggables) this accumulation
      // creates duplicate/conflicting instances on the same DOM nodes, which is
      // what causes the page to lock up ("freeze") after a couple of navigations.
      if (w.runPageCleanups) {
        try {
          w.runPageCleanups();
        } catch (err) {
          console.warn("runPageCleanups failed:", err);
        }
      }

      // Safety net: if we're navigating into a normal page (e.g. closing the
      // /registeration or /admin drawer), the pageloader markup may have just been
      // (re)mounted fresh and was never dismissed by initPageloader(), since that
      // only runs on the very first app load. Left visible, it's a full-screen
      // fixed overlay that blocks all clicks/scroll, making the site look frozen.
      const loader = document.querySelector('[data-pageloader]');
      if (loader) {
        (loader as HTMLElement).style.display = 'none';
      }
      document.body.classList.remove('pageloader-active');

      // Reinitialize Lenis when navigating back to content pages if it was destroyed
      if (!w.lenis && typeof w.Lenis === "function") {
        try {
          w.lenis = new w.Lenis({
            lerp: 0.165,
            wheelMultiplier: 1.25,
          });
          if (w.ScrollTrigger) {
            w.lenis.on('scroll', w.ScrollTrigger.update);
          }
          if (w.gsap?.ticker) {
            w.gsap.ticker.add((time: number) => {
              w.lenis?.raf(time * 1000);
            });
          }
        } catch (err) {
          console.warn("re-init lenis failed:", err);
        }
      } else if (w.lenis && typeof w.lenis.start === "function") {
        try {
          w.lenis.start();
        } catch (err) {
          console.warn("lenis.start failed:", err);
        }
      }

      // Whatever happens below, the dark transition overlay must never be left
      // covering the screen — that's what "freeze / not loading" looks like to
      // a visitor. releaseOverlay() is the single guaranteed exit for it.
      const releaseOverlay = () => {
        if (transitionWrap) {
          gsap?.set?.(transitionWrap, { zIndex: -1 });
          (transitionWrap as HTMLElement).style.zIndex = "-1";
          (transitionWrap as HTMLElement).style.pointerEvents = "none";
        }
        if (transitionDark) {
          gsap?.set?.(transitionDark, { autoAlpha: 0 });
          (transitionDark as HTMLElement).style.opacity = "0";
          (transitionDark as HTMLElement).style.visibility = "hidden";
        }
        if (nextContainer) {
          (nextContainer as HTMLElement).style.transform = "";
          (nextContainer as HTMLElement).style.opacity = "1";
          (nextContainer as HTMLElement).style.visibility = "visible";
        }
      };

      if (nextContainer) {
        // Reset scroll position
        window.scrollTo(0, 0);

        // Re-run initializations. Any one of these can throw if the vendor
        // script hits an element it doesn't expect — that must not prevent the
        // overlay below from being released, so it's isolated in its own try.
        try {
          if (w.initOnceFunctions) w.initOnceFunctions();
          if (w.resetPage) w.resetPage(nextContainer);
          if (w.initBeforeEnterFunctions) w.initBeforeEnterFunctions(nextContainer);
          if (w.initAfterEnterFunctions) w.initAfterEnterFunctions(nextContainer);
          if (w.initHeroReveal) w.initHeroReveal(nextContainer);
        } catch (err) {
          console.warn("Page init functions failed:", err);
        }
        setTimeout(() => forceRevealStuckElements(nextContainer), 2500);

        try {
          // Run enter transition only if we navigated with a link transition!
          if (isTransitionActive.current && transitionWrap && transitionDark && gsap) {
            gsap.killTweensOf([transitionWrap, transitionDark, nextContainer]);
            gsap.set(nextContainer, { zIndex: 3 });

            // Guaranteed fallback: if this tween never fires onComplete (paused
            // ticker, backgrounded tab, thrown error inside GSAP), the overlay
            // still gets released on its own after a bounded wait.
            let released = false;
            const releaseOnce = () => {
              if (released) return;
              released = true;
              releaseOverlay();
            };
            const fallbackTimer = setTimeout(releaseOnce, 1500);

            gsap.set(nextContainer, { clearProps: 'transform,y', opacity: 1, visibility: 'visible' });

            gsap.fromTo(transitionDark,
              { autoAlpha: 0.8 },
              {
                autoAlpha: 0,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                  clearTimeout(fallbackTimer);
                  releaseOnce();
                }
              }
            );
          } else {
            // Instant reset if no transition was active
            releaseOverlay();
            if (gsap && nextContainer) {
              gsap.set(nextContainer, { clearProps: 'all' });
            }
          }
        } catch (err) {
          console.warn("Enter transition failed, forcing instant reset:", err);
          releaseOverlay();
        }

        isTransitionActive.current = false;
      } else {
        // No container found at all — nothing to animate in, but the overlay
        // from the leave animation must still be released so the page stays usable.
        releaseOverlay();
        isTransitionActive.current = false;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, scriptsReady]);

  return null;
}
