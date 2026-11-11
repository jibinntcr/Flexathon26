"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PartnerStrip from "./PartnerStrip";
import { ASSETS } from "@/lib/assets";

interface FooterProps {
  showPartnerStrip?: boolean;
}

export default function Footer({ showPartnerStrip = true }: FooterProps) {
  const pathname = usePathname() || "/";
  const isHydEdition = pathname === "/hydoct18" || pathname.startsWith("/hydoct18/");

  return (
    <>
      {showPartnerStrip && (
        <section
          className="footer-partner-strip-wrap"
          style={{
            padding: "0 32px 30px",
            maxWidth: "1440px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <PartnerStrip
            editionLabel={
              isHydEdition
                ? "Hyderabad 2026 Edition Partners & Institutional Ecosystem"
                : "Official Foundation, Hyderabad 2026 Flagship Partners & Ticketing Ecosystem"
            }
            showDiscoveryPlatforms={true}
          />
        </section>
      )}

      <footer
        id="contact"
        style={{
          backgroundColor: "#070C14",
          color: "#94A3B8",
          padding: "68px 32px 36px",
          borderTop: "1px solid #1E293B",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
              gap: "42px",
              marginBottom: "48px",
            }}
          >
            {/* Col 1: Brand & Organiser Info */}
            <div>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#FFFFFF",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  marginBottom: "18px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                <img
                  src={ASSETS.brand.flexathonLogoTransparent}
                  alt="FLEXATHON — The Global Goals Run"
                  style={{
                    height: "44px",
                    width: "auto",
                    maxWidth: "200px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Link>

              <div
                className="font-condensed"
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#FDE047",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                17 Goals. One Movement. Every City.
              </div>

              <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.65, margin: "0 0 16px 0" }}>
                FLEXATHON – The Global Goals Run is a multi-city running movement organised by{" "}
                <a
                  href="https://flexonsports.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "underline" }}
                >
                  Flexon Sports Foundation
                </a>
                , uniting runners, institutions, and communities across Indian cities for preventive fitness and the 17 United Nations Sustainable Development Goals.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "rgba(255,255,255,0.96)",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  marginBottom: "14px",
                }}
              >
                <img
                  src={ASSETS.brand.flexonSportsTransparent}
                  alt="Flexon Sports Foundation"
                  style={{ height: "30px", width: "auto", objectFit: "contain", display: "block" }}
                />
                <a
                  href="https://flexonsports.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    color: "#C5192D",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  flexonsports.org ↗
                </a>
              </div>

              <div style={{ marginTop: "6px" }}>
                <img
                  src={ASSETS.sdgs.horizontalBanner}
                  alt="United Nations Sustainable Development Goals"
                  style={{
                    height: "26px",
                    width: "auto",
                    maxWidth: "220px",
                    objectFit: "contain",
                    background: "#FFFFFF",
                    padding: "4px 8px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>

            {/* Col 2: Master Platform & City Editions */}
            <div>
              <h4
                className="footer-heading"
                style={{
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "16px",
                }}
              >
                Platform &amp; Editions
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
                <Link href="/" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  Master Platform Home
                </Link>
                <Link href="/about" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  About FLEXATHON &amp; Foundation
                </Link>
                <Link href="/editions" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  All City Editions Directory
                </Link>
                <Link
                  href="/hydoct18"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>Hyderabad 2026 Flagship</span>
                  <span
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.22)",
                      color: "#6EE7B7",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    ARCHIVE
                  </span>
                </Link>
                <Link href="/kochi2027" style={{ color: "#38BDF8", fontWeight: 700, textDecoration: "none" }}>
                  Kochi, Kerala Edition (Next Host City)
                </Link>
                <Link href="/global-goals" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  17 UN Global Goals Explorer
                </Link>
                <Link href="/impact" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  Impact &amp; Governance Framework
                </Link>
                <Link href="/gallery" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  Official Media &amp; Photo Gallery
                </Link>
                <Link href="/partners" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  Partners &amp; Institutional Sponsors
                </Link>
                <Link href="/get-involved" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                  Volunteer &amp; Running Club Cohorts
                </Link>
              </div>
            </div>

            {/* Col 3: Hyderabad 2026 Flagship Archive & Legal */}
            <div>
              <h4
                className="footer-heading"
                style={{
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "16px",
                }}
              >
                Hyderabad ’26 Archive &amp; Legal
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px" }}>
                <Link href="/hydoct18/the-run" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  Race Categories (3K / 5K / 10K)
                </Link>
                <Link href="/hydoct18/prize-details" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  ₹60,000 Equal Podium Prize Pool
                </Link>
                <Link href="/hydoct18/global-goal" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  SDG 4 Quality Education Spotlight
                </Link>
                <Link href="/hydoct18/results" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  Results &amp; Finisher E-Certificates
                </Link>
                <Link href="/hydoct18/social-card" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  Runner Social Card Studio
                </Link>
                <Link href="/hydoct18/gallery" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                  Hyderabad Race Day Gallery
                </Link>
                <Link href="/privacy-policy" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Privacy Policy
                </Link>
                <Link href="/terms-of-use" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Terms &amp; Conditions
                </Link>
                <Link href="/refund-policy" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Refund &amp; Cancellation Policy
                </Link>
                <Link href="/participant-waiver" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Participant Waiver &amp; Release
                </Link>
                <Link href="/disclaimer" style={{ color: "#94A3B8", textDecoration: "none" }}>
                  Disclaimer &amp; Brand Notice
                </Link>
              </div>
            </div>

            {/* Col 4: Contact & Official Help Desk */}
            <div>
              <h4
                className="footer-heading"
                style={{
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "16px",
                }}
              >
                Contact &amp; Runner Help Desk
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "#CBD5E1" }}>
                <div>
                  🏛️ <strong>Organiser:</strong> Flexon Sports Foundation
                </div>
                <div>
                  📍 <strong>Edition 1 Flagship:</strong> ESCI Campus, Gachibowli, Hyderabad (18 Oct 2026)
                </div>
                <div>
                  🌊 <strong>Edition 2 Host City:</strong> Kochi, Kerala (Coming Soon)
                </div>
                <div>
                  📞 <strong>Helpline:</strong>{" "}
                  <a
                    href="tel:+919074934014"
                    style={{ color: "#FDE047", textDecoration: "none", fontWeight: 700 }}
                  >
                    +91-9074934014
                  </a>
                </div>
                <div>
                  ✉️ <strong>Official Email:</strong>{" "}
                  <a
                    href="mailto:info@flexathonrun.org"
                    style={{ color: "#FDE047", textDecoration: "none", fontWeight: 700 }}
                  >
                    info@flexathonrun.org
                  </a>
                </div>
                <div>
                  📸 <strong>Instagram:</strong>{" "}
                  <a
                    href="https://www.instagram.com/flexathon_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#FDE047", textDecoration: "none", fontWeight: 700 }}
                  >
                    @flexathon_official ↗
                  </a>
                </div>
                <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <a
                    href="https://wa.me/919074934014?text=Hi%20FLEXATHON%20Team%2C%20I%20have%20an%20enquiry%20regarding%20FLEXATHON."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#25D366",
                      color: "#FFFFFF",
                      padding: "9px 16px",
                      borderRadius: "8px",
                      fontWeight: 800,
                      fontSize: "12px",
                      textDecoration: "none",
                    }}
                  >
                    <span>💬 WhatsApp Help Desk</span>
                  </a>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#1E293B",
                      color: "#FFFFFF",
                      padding: "9px 14px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "12px",
                      textDecoration: "none",
                      border: "1px solid #334155",
                    }}
                  >
                    <span>Enquiry Form →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #1E293B",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              textAlign: "center",
              fontSize: "12.5px",
              color: "#94A3B8",
            }}
          >
            <div style={{ maxWidth: "900px", lineHeight: 1.6 }}>
              FLEXATHON — The Global Goals Run is an independent sporting and social-impact initiative by{" "}
              <a
                href="https://flexonsports.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#E2E8F0", fontWeight: 600 }}
              >
                Flexon Sports Foundation
              </a>{" "}
              advancing awareness and community action for the 17 United Nations Sustainable Development Goals (SDGs). Not affiliated with or endorsed by the United Nations.
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#64748B",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span>© {new Date().getFullYear()} Flexon Sports Foundation. All rights reserved.</span>
              <span>•</span>
              <span>Developed &amp; Maintained by</span>
              <a
                href="https://infinio.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#94A3B8",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                }}
              >
                Infinio Technology Solutions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
