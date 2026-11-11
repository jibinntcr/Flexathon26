"use client";

import { useEffect, useState } from "react";

const SCRIPTS_IN_ORDER = [
  "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js",
  "https://cdn.prod.website-files.com/6a01f769fb0d9bd286987755/js/day1-run.schunk.7c514c4b18297836.js",
  "https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js",
  "https://cdn.jsdelivr.net/npm/@barba/core@2.10.3/dist/barba.umd.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/DrawSVGPlugin.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Draggable.min.js",
  "https://cdn.jsdelivr.net/npm/gsap@3.15/dist/InertiaPlugin.min.js",
  "https://cdn.prod.website-files.com/6a01f769fb0d9bd286987755/js/day1-run.556f1102.e5192474d0749b99.js",
  "/js/animations.js"
];

function getLocalFallback(src: string): string | null {
  if (src.startsWith("/")) return null;
  try {
    const url = new URL(src);
    return url.pathname;
  } catch {
    return null;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export default function ScriptLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadAll() {
      for (const src of SCRIPTS_IN_ORDER) {
        if (!active) return;
        try {
          await loadScript(src);
        } catch (err) {
          const fallback = getLocalFallback(src);
          if (fallback) {
            try {
              await loadScript(fallback);
              continue;
            } catch (fallbackErr) {
              console.warn(`Script failed to load (both primary and local fallback): ${src}`);
            }
          } else {
            console.warn(`Script failed to load: ${src}`);
          }
        }
      }
      if (active) {
        setLoaded(true);
        window.dispatchEvent(new Event("scripts-loaded"));
      }
    }
    loadAll();
    return () => {
      active = false;
    };
  }, []);

  return null;
}

