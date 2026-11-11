"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/siteConfig";

export default function FloatingSocialButtons() {
  const pathname = usePathname();

  // Hide floating social buttons on admin and registration pages so they never overlap forms or CTAs
  const cleanPath = pathname?.toLowerCase() || "";
  if (cleanPath.startsWith("/admin") || cleanPath.includes("/register")) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        /* Responsive handling for short landscape screens and high browser zoom */
        @media (max-height: 480px) {
          .floating-social-dock {
            display: none !important;
          }
        }
        @media (max-width: 360px) {
          .floating-social-dock {
            bottom: 12px !important;
            right: 12px !important;
            gap: 8px !important;
            z-index: 99 !important;
          }
          .floating-social-btn {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
      <div className="floating-social-dock" aria-label="Quick Contact & Social Links">
        {/* Instagram Floating Button */}
        <a
          href={SITE_CONFIG.socials.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-social-btn instagram"
          title={`Follow us on Instagram (${SITE_CONFIG.socials.instagramHandle})`}
          aria-label={`Follow us on Instagram (${SITE_CONFIG.socials.instagramHandle})`}
        >
          <span className="floating-social-tooltip">Follow {SITE_CONFIG.socials.instagramHandle}</span>
          <div className="floating-social-icon instagram">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={SITE_CONFIG.contacts.whatsappHelpdeskPrefill}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-social-btn whatsapp"
          title={`Chat with us on WhatsApp (${SITE_CONFIG.contacts.helpline})`}
          aria-label={`Chat with us on WhatsApp (${SITE_CONFIG.contacts.helpline})`}
        >
          <span className="floating-social-tooltip">WhatsApp Helpdesk</span>
          <div className="floating-social-icon whatsapp">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.827.836 5.46 2.276 7.662L2 30l6.527-2.222A13.923 13.923 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.556c-2.38 0-4.62-.68-6.527-1.859l-.468-.288-3.87 1.318 1.336-3.774-.316-.502A11.503 11.503 0 014.444 16c0-6.372 5.184-11.556 11.556-11.556 6.372 0 11.556 5.184 11.556 11.556 0 6.372-5.184 11.556-11.556 11.556zm6.33-8.665c-.347-.174-2.053-1.013-2.37-1.129-.318-.116-.549-.174-.78.174-.231.347-.896 1.129-1.098 1.36-.203.231-.405.26-.752.087-.347-.174-1.464-.54-2.788-1.72-1.031-.92-1.727-2.056-1.93-2.403-.202-.347-.021-.535.152-.708.156-.156.347-.405.52-.607.174-.203.232-.347.347-.578.116-.231.058-.434-.029-.607-.087-.174-.78-1.88-1.07-2.574-.282-.676-.568-.584-.78-.595l-.665-.011c-.231 0-.607.087-.925.434s-1.214 1.186-1.214 2.892c0 1.706 1.243 3.355 1.417 3.586.173.231 2.447 3.738 5.928 5.241.828.358 1.474.571 1.978.731.831.264 1.587.227 2.185.138.667-.099 2.053-.839 2.342-1.648.289-.81.289-1.504.203-1.648-.087-.144-.319-.231-.666-.405z" fill="#FFFFFF"/>
            </svg>
          </div>
        </a>
      </div>
    </>
  );
}
