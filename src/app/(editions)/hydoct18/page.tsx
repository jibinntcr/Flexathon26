"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnerStrip from "@/components/layout/PartnerStrip";
import RegistrationClosedButton from "@/components/editions/RegistrationClosedButton";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "When and where is FLEXATHON 2026 taking place?",
      a: "FLEXATHON 2026 – The Global Goals Run will be held on Sunday, 18 October 2026 at the scenic Engineering Staff College of India (ESCI) Campus in Gachibowli, Hyderabad. Assembly begins at 5:00 AM."
    },
    {
      q: "What race categories are available and who can participate?",
      a: "We have 3 categories: 3K Community Fun Run (All age groups & families), 5K Fitness Run (Timed with RFID chip, age 10+), and 10K Global Goals Challenge (Timed with RFID chip, age 14+). Beginners, amateurs, and professional marathoners are all welcome."
    },
    {
      q: "What is included in the registration fee?",
      a: "Every registered runner receives: (1) Official Premium Dri-FIT Event T-Shirt, (2) Heavy-cast Commemorative Finisher Medal, (3) RFID Timed BIB (5K & 10K), (4) Personalized Digital Timing E-Certificate, (5) Route Hydration & Energy Stations, (6) Hot Nutritious Breakfast & Refreshments, (7) Medical & Emergency Support with Ambulances."
    },
    {
      q: "How and when will I collect my Race Kit / T-Shirt and BIB?",
      a: "BIB and Kit collection Expo will take place on 16th & 17th October 2026 at ESCI Gachibowli. Registered participants will receive SMS & WhatsApp notifications with exact Expo timings and venue gate instructions."
    },
    {
      q: "Can I use promotional coupon codes during registration?",
      a: "Yes! If you have received an official coupon code (e.g. from institutional partners or early bird campaigns), you can enter and apply it directly on the checkout registration page for an instant discount."
    },
    {
      q: "Is parking available at the venue?",
      a: "Yes, dedicated four-wheeler and two-wheeler parking is available inside the ESCI campus. Volunteers will guide your vehicle to designated parking zones."
    }
  ];

  return (
    <div style={{ backgroundColor: "#fafbfc", color: "#1e293b", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* Global CSS Fonts and Utilities */}
      <style jsx global>{`
        .font-condensed {
          font-family: 'Barlow Condensed', 'Montserrat', sans-serif !important;
        }
        .hero-bg-grid {
          background-color: #fafbfc;
          background-image: radial-gradient(#cbd5e1 1.15px, transparent 1.15px);
          background-size: 26px 26px;
        }
        .monument-mask {
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.9) 35%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.9) 35%);
        }
        .wave-glow {
          filter: drop-shadow(0 -8px 24px rgba(197, 25, 45, 0.20));
        }

        .top-nav-link {
          text-decoration: none;
          color: #1e293b;
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          position: relative;
          padding: 8px 0;
          transition: color 0.2s ease, transform 0.15s ease;
          display: inline-block;
        }
        .top-nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 0;
          height: 2.5px;
          background-color: #C5192D;
          border-radius: 2px;
          transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .top-nav-link:hover {
          color: #C5192D !important;
          transform: translateY(-1px);
        }
        .top-nav-link:hover::after {
          width: 100%;
        }

        .header-register-btn {
          background-color: #C5192D;
          color: #FFFFFF;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(197, 25, 45, 0.25);
          transition: all 0.2s ease;
          display: inline-block;
        }
        .header-register-btn:hover {
          background-color: #A81324 !important;
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(197, 25, 45, 0.38) !important;
        }

        .brand-logo-wrap {
          transition: transform 0.2s ease;
        }
        .brand-logo-wrap:hover {
          transform: scale(1.05);
        }

        @media (max-width: 1080px) {
          .hero-grid-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-middle-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1.5px solid #E2E8F0;
            padding-top: 24px;
          }
          .hero-visual-col {
            min-height: 480px !important;
          }
          .desktop-menu-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .partners-grid-inner {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 20px !important;
          }
          .partners-grid-inner > div {
            border-right: none !important;
            border-left: none !important;
            padding: 10px 0 !important;
            border-bottom: 1px solid #E2E8F0;
          }
          .partners-grid-inner > div:last-child {
            border-bottom: none !important;
          }
          .sdg4-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .spotlight-cta-panel {
            grid-template-columns: 1fr !important;
          }
          .spotlight-left-block {
            border-right: none !important;
            border-bottom: 1px solid #F1F5F9;
            padding-right: 0 !important;
            padding-bottom: 16px !important;
          }
          .spotlight-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 768px) {
          .hero-wrap-padding {
            padding: 20px 16px 36px !important;
          }
          .hero-grid-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hero-cat-badges {
            display: flex !important;
            justify-content: space-between !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .hero-cat-badges > a {
            flex: 1 !important;
            text-align: center !important;
            padding: 8px 10px !important;
            font-size: 18px !important;
          }
          .hero-action-btns {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .hero-action-btns > * {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .hero-middle-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1.5px solid #E2E8F0 !important;
            padding-top: 22px !important;
            width: 100% !important;
          }
          .hero-visual-col {
            min-height: auto !important;
            height: auto !important;
            position: relative !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 14px !important;
            overflow: visible !important;
            border-radius: 0 !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            margin-top: 8px !important;
          }
          .hero-benefit-badges {
            order: 1 !important;
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 380px !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 4px !important;
            padding: 10px 8px !important;
            background: #C5192D !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 14px rgba(197, 25, 45, 0.22) !important;
            box-sizing: border-box !important;
            z-index: 10 !important;
          }
          .hero-benefit-badges > div {
            min-width: 50px !important;
            flex: 1 !important;
            padding: 0 2px !important;
          }
          .hero-benefit-badges > div > div {
            width: 32px !important;
            height: 32px !important;
            font-size: 14px !important;
            margin-bottom: 2px !important;
          }
          .hero-benefit-badges span {
            font-size: 8px !important;
            letter-spacing: 0.2px !important;
            line-height: 1.1 !important;
          }
          .hero-runner-card-inner {
            order: 2 !important;
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            max-width: 380px !important;
            height: 410px !important;
            margin: 0 auto !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            background: linear-gradient(180deg, #F8FAFC 0%, #EEF2F6 100%) !important;
            border: 1.5px solid #E2E8F0 !important;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
            box-sizing: border-box !important;
            z-index: 5 !important;
          }
          .hero-runner-card-inner .monument-mask {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 72% !important;
            opacity: 0.85 !important;
            overflow: hidden !important;
            z-index: 5 !important;
          }
          .hero-runner-card-inner .monument-mask img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center top !important;
          }
          .hero-runner-card-inner .wave-glow {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: -2px !important;
            width: 100% !important;
            height: auto !important;
            z-index: 12 !important;
            pointer-events: none !important;
          }
          .hero-runner-card-inner .wave-glow img {
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
            object-position: bottom center !important;
            display: block !important;
          }
          .hero-runner-card-inner .hero-runner-wrap {
            position: absolute !important;
            left: 50% !important;
            right: auto !important;
            bottom: 8px !important;
            transform: translateX(-50%) !important;
            width: 240px !important;
            height: 92% !important;
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            z-index: 20 !important;
            pointer-events: none !important;
          }
          .hero-runner-card-inner .hero-runner-wrap img {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            object-fit: contain !important;
            object-position: bottom center !important;
            filter: drop-shadow(0 12px 22px rgba(0, 0, 0, 0.22)) !important;
          }
          .race-section-wrap {
            padding: 44px 16px !important;
          }
          .race-categories-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .prize-pool-box {
            padding: 30px 16px 24px !important;
            margin-top: 36px !important;
            border-radius: 18px !important;
          }
          .prize-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .sdg4-section-wrap {
            padding: 44px 16px !important;
          }
          .sdg4-card-inner {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
          .sdg4-pillars-strip {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          .routes-section-wrap {
            padding: 44px 16px !important;
          }
          .schedule-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .spotlight-section-wrap {
            padding: 44px 16px !important;
          }
          .spotlight-nav-arrow {
            display: none !important;
          }
          .spotlight-cta-panel {
            padding: 20px 16px !important;
          }
          .faqs-section-wrap {
            padding: 44px 16px !important;
          }
          .partners-panel-wrap {
            padding: 18px 16px !important;
            margin-top: 20px !important;
          }
          .ticketing-logos-row {
            gap: 16px 24px !important;
            justify-content: center !important;
          }
          .footer-wrap {
            padding: 44px 16px 24px !important;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (UNIFIED HEADER)                                            */}
      {/* ========================================================================= */}
      <Header activePage="editions" />

      {/* ========================================================================= */}
      {/* 2. HERO SECTION — PROPORTIONS: 40% LEFT / 20% SDG / 40% RUNNER & PANORAMA  */}
      {/* ========================================================================= */}
      <main style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)", padding: "18px 20px 36px" }}>
        <div
          className="hero-bg-grid"
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: "600px",
            maxWidth: "1400px",
            margin: "0 auto",
            borderRadius: "32px",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 24px 60px rgba(12, 30, 51, 0.08)",
          }}
        >
        
        {/* Main Content Area */}
        <div className="hero-wrap-padding" style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 36px 50px", position: "relative" }}>
          
          <div
            className="hero-grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.72fr 1.35fr",
              gap: "28px",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 10
            }}
          >
            
            {/* ---------------------------------------------------- */}
            {/* 1. LEFT SECTION (~40%)                               */}
            {/* ---------------------------------------------------- */}
            <section style={{ display: "flex", flexDirection: "column", gap: "14px", zIndex: 20 }}>
              
              {/* Small Red Pill Tag */}
              <div>
                <span
                  style={{
                    backgroundColor: "#C5192D",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    display: "inline-block",
                    boxShadow: "0 2px 6px rgba(197, 25, 45, 0.2)"
                  }}
                >
                  FLEXATHON 2026 • HYDERABAD
                </span>
              </div>

              {/* Massive Bold Athletic Headline */}
              <div>
                <h1
                  className="font-condensed"
                  style={{
                    fontSize: "clamp(46px, 5.2vw, 84px)",
                    fontWeight: 900,
                    lineHeight: 1.04,
                    margin: 0,
                    letterSpacing: "-1px",
                    textTransform: "uppercase"
                  }}
                >
                  <span style={{ color: "#0c1e33", display: "block" }}>THE GLOBAL</span>
                  <span style={{ color: "#d31b26", display: "block" }}>GOALS RUN</span>
                </h1>
                <p style={{ fontSize: "clamp(16px, 1.4vw, 21px)", fontWeight: 600, color: "#0d1b2a", margin: "12px 0 0 0", letterSpacing: "-0.2px" }}>
                  United by Sport. Driven by Global Goals.
                </p>
              </div>

              {/* Event Logistics */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "4px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#0d1b2a", fontWeight: 700 }}>
                  <span style={{ color: "#C5192D", fontSize: "18px" }}>📅</span>
                  <span>Sunday, 18 October 2026 • 5:00 AM onwards</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14.5px", color: "#334155" }}>
                  <span style={{ color: "#C5192D", fontSize: "18px", marginTop: "1px" }}>📍</span>
                  <div>
                    Engineering Staff College of India (ESCI),<br />
                    <strong style={{ color: "#0d1b2a" }}>Gachibowli, Hyderabad</strong>
                    <div style={{ marginTop: "4px" }}>
                      <a
                        href="https://share.google/gi3rfRTRt5ZcnPIOR"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#C5192D",
                          textDecoration: "none",
                          letterSpacing: "0.5px"
                        }}
                      >
                        VIEW LOCATION ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Badges: 3K, 5K, 10K */}
              <div className="hero-cat-badges" style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
                <a
                  href="#race-info"
                  style={{
                    border: "2px solid #16a34a",
                    borderRadius: "999px",
                    padding: "8px 24px",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: "#16a34a",
                    backgroundColor: "#FFFFFF",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                  }}
                  title="View 3K Details"
                >
                  3K
                </a>
                <span style={{ color: "#94a3b8", fontWeight: 700 }}>•</span>
                <a
                  href="#race-info"
                  style={{
                    border: "2px solid #2563eb",
                    borderRadius: "999px",
                    padding: "8px 24px",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: "#2563eb",
                    backgroundColor: "#FFFFFF",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                  }}
                  title="View 5K Details"
                >
                  5K
                </a>
                <span style={{ color: "#94a3b8", fontWeight: 700 }}>•</span>
                <a
                  href="#race-info"
                  style={{
                    border: "2px solid #dc2626",
                    borderRadius: "999px",
                    padding: "8px 24px",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: "#dc2626",
                    backgroundColor: "#FFFFFF",
                    textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
                  }}
                  title="View 10K Details"
                >
                  10K
                </a>
              </div>

              {/* Hero Action Buttons */}
              <div className="hero-action-btns" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginTop: "6px" }}>
                <RegistrationClosedButton
                  size="lg"
                  showBadge={true}
                  badgeText="Registration Closed"
                  label="REGISTRATION CLOSED"
                />

                <a
                  href="#race-info"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#0d1b2a",
                    border: "2px solid #0d1b2a",
                    padding: "12px 26px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span>▶</span>
                  <span>VIEW RACE DETAILS</span>
                </a>
              </div>

            </section>

            {/* ---------------------------------------------------- */}
            {/* 2. MIDDLE SECTION: SDG 4 COMMITMENT (~20%)           */}
            {/* ---------------------------------------------------- */}
            <section
              className="hero-middle-col"
              style={{
                borderLeft: "1.5px solid #cbd5e1",
                paddingLeft: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                zIndex: 20
              }}
            >
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#64748b", fontWeight: 800, marginBottom: "4px" }}>
                2026 EDITION
              </div>

              <h2
                className="font-condensed"
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#d31b26",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                  margin: "0 0 12px 0"
                }}
              >
                QUALITY<br />EDUCATION
              </h2>

              {/* Exact Red SDG 4 Quality Education Card (No Buddha/Monuments) */}
              <Link
                href="/hydoct18/global-goal"
                style={{
                  width: "165px",
                  height: "165px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 10px 24px rgba(197, 25, 45, 0.28)",
                  backgroundColor: "#C5192D",
                  display: "block",
                  marginBottom: "14px",
                  textDecoration: "none",
                  border: "1px solid rgba(197, 25, 45, 0.2)"
                }}
              >
                <img
                  src="/assets/editions/sdg4.png"
                  alt="UN SDG 4 Quality Education Icon"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Link>

              <p style={{ fontSize: "14.5px", color: "#334155", fontWeight: 500, lineHeight: 1.5, margin: 0, maxWidth: "220px" }}>
                Promoting inclusive, equitable and quality education for all. Every step makes a difference.
              </p>
            </section>

            {/* ---------------------------------------------------- */}
            {/* 3. RIGHT SECTION: RUNNER + PANORAMA + RED WAVE (~40%) */}
            {/* ---------------------------------------------------- */}
            <div
              className="hero-visual-col"
              style={{
                position: "relative",
                minHeight: "530px",
                zIndex: 10
              }}
            >
              {/* Benefit Badges (Cleanly above the visual card on mobile) */}
              <div
                className="hero-benefit-badges"
                style={{
                  position: "absolute",
                  left: "16px",
                  right: "16px",
                  bottom: "16px",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  gap: "8px",
                  color: "#FFFFFF",
                  pointerEvents: "none"
                }}
              >
                {/* 1. Finisher Medal */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "56px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", marginBottom: "3px", backdropFilter: "blur(4px)" }}>
                    🏅
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.4px", textTransform: "uppercase", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    FINISHER<br />MEDAL
                  </span>
                </div>

                {/* 2. E-Certificate */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "56px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", marginBottom: "3px", backdropFilter: "blur(4px)" }}>
                    📄
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.4px", textTransform: "uppercase", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    E-CERTIFICATE
                  </span>
                </div>

                {/* 3. Timed 5K & 10K */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "56px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", marginBottom: "3px", backdropFilter: "blur(4px)" }}>
                    ⏱️
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.4px", textTransform: "uppercase", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    TIMED<br />5K &amp; 10K
                  </span>
                </div>

                {/* 4. Hydration Support */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "56px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", marginBottom: "3px", backdropFilter: "blur(4px)" }}>
                    💧
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.4px", textTransform: "uppercase", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    HYDRATION<br />SUPPORT
                  </span>
                </div>

                {/* 5. Medical Support */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "56px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", marginBottom: "3px", backdropFilter: "blur(4px)" }}>
                    ➕
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: "0.4px", textTransform: "uppercase", lineHeight: 1.1, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>
                    MEDICAL<br />SUPPORT
                  </span>
                </div>
              </div>

              {/* Authentic Race Day Action Photo Card */}
              <div
                className="hero-runner-card-inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: "520px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(15, 23, 42, 0.16)",
                  border: "1px solid rgba(15, 23, 42, 0.1)",
                }}
              >
                <img
                  src="/assets/gallery/oct18/NIX09262.JPG"
                  alt="FLEXATHON Hyderabad 2026 Runners on Course at ESCI Gachibowli"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 28%",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(6, 16, 30, 0.92) 0%, rgba(6, 16, 30, 0.35) 28%, transparent 55%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "999px",
                    padding: "5px 14px",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                  <span>Flagship Edition • ESCI Campus</span>
                </div>
              </div>

            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* 4. FLOATING PARTNERS PANEL (Single Source of Truth)  */}
          {/* ---------------------------------------------------- */}
          <PartnerStrip />

          {/* ---------------------------------------------------- */}
          {/* 5. OFFICIAL PARTICIPANT & ARCHIVE HUB QUICK PORTAL    */}
          {/* ---------------------------------------------------- */}
          <div
            style={{
              marginTop: "24px",
              background: "linear-gradient(135deg, #071324 0%, #0d213a 100%)",
              borderRadius: "20px",
              padding: "24px 28px",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 16px 36px rgba(7, 19, 36, 0.16)",
              color: "#FFFFFF"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "18px" }}>
              <div>
                <span style={{ display: "inline-block", background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(52, 211, 153, 0.45)", color: "#6EE7B7", fontSize: "11px", fontWeight: 800, padding: "4px 12px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                  ✓ Flagship Edition 1 • Official Archive &amp; Runner Portal
                </span>
                <h2 className="font-condensed" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.4px", lineHeight: 1.1 }}>
                  Hyderabad 2026 Participant Resources &amp; Post-Race Archive
                </h2>
              </div>
              <Link
                href="/kochi2027"
                style={{
                  background: "#C5192D",
                  color: "#FFFFFF",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  whiteSpace: "nowrap"
                }}
              >
                Next Edition: Kochi, Kerala →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { icon: "⏱️", title: "Results & Certificates", sub: "Official timing & finisher status", href: "/hydoct18/results" },
                { icon: "🪪", title: "Runner Social Card", sub: "Download 1254×1254 runner card", href: "/hydoct18/social-card" },
                { icon: "📸", title: "Race Day Gallery", sub: "Flag-off, route & podium photos", href: "/hydoct18/gallery" },
                { icon: "🏆", title: "₹60,000 Prize Pool", sub: "Equal Men's & Women's awards", href: "/hydoct18/prize-details" },
                { icon: "🎒", title: "Bib & Kit Expo Guidelines", sub: "16–17 Oct ESCI Expo & bib FAQs", href: "/hydoct18/faqs#kit" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    textDecoration: "none",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "13.5px", color: "#FFFFFF" }}>{item.title}</div>
                    <div style={{ fontSize: "11.5px", color: "#94A3B8" }}>{item.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. RACE CATEGORIES & REGISTRATION TIERS (`#about` & `#race-info`)         */}
      {/* ========================================================================= */}
      <section id="about" className="race-section-wrap" style={{ padding: "70px 32px", backgroundColor: "#FFFFFF", borderTop: "1px solid #e2e8f0" }}>
        <div id="race-info" style={{ maxWidth: "1440px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 48px" }}>
            <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
              CHOOSE YOUR CHALLENGE
            </span>
            <h2 className="font-condensed" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 900, color: "#0d1b2a", margin: "8px 0 12px", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
              Official Race Categories
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              Whether you are taking your first running steps or aiming for a personal 10K record, there is a dedicated track for you.
            </p>
          </div>

          <div className="race-categories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "28px" }}>
            
            {/* Card 1: 3K Community Run */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #E2E8F0",
                borderRadius: "20px",
                padding: "34px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#DCFCE7", padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.5px" }}>
                    COMMUNITY &amp; FAMILIES
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>06:45 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px 0" }}>3K Community Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px 0" }}>
                  Non-timed fun run and walk designed for families, students, and first-time fitness runners.
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "24px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 900, color: "#0d1b2a" }}>₹749</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>Standard Entry</span>
                </div>

                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Race BIB</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Event T-Shirt</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Finisher Medal</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Participation E-Certificate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Breakfast &amp; Hydration</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Medical &amp; Ambulance Support</div>
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <RegistrationClosedButton
                  size="md"
                  fullWidth={true}
                  label="3K Registration Closed"
                />
              </div>
            </div>

            {/* Card 2: 5K Open Run (Most Popular) */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "2.5px solid #2563EB",
                borderRadius: "20px",
                padding: "34px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 28px rgba(37, 99, 235, 0.12)",
                position: "relative"
              }}
            >
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "11px", fontWeight: 900, letterSpacing: "1px", padding: "4px 16px", borderRadius: "12px", textTransform: "uppercase" }}>
                ★ MOST POPULAR ★
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#2563EB", backgroundColor: "#DBEAFE", padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.5px" }}>
                    TIMED WITH CHIP
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>06:15 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px 0" }}>5K Fitness Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px 0" }}>
                  Official electronic chip timed race for enthusiastic runners, corporate teams, and fitness enthusiasts.
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "24px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 900, color: "#0d1b2a" }}>₹999</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>Standard Entry</span>
                </div>

                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "#1D4ED8" }}><span>✓</span> RFID Timing Chip &amp; Race BIB</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Event T-Shirt</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Finisher Medal</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Timing E-Certificate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Prize Money for Winners</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Breakfast &amp; Hydration</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Medical &amp; Ambulance Support</div>
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <RegistrationClosedButton
                  size="md"
                  fullWidth={true}
                  label="5K Registration Closed"
                />
              </div>
            </div>

            {/* Card 3: 10K Challenge (Flagship) */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #E2E8F0",
                borderRadius: "20px",
                padding: "34px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#C5081E", backgroundColor: "#FEE2E2", padding: "4px 12px", borderRadius: "20px", letterSpacing: "0.5px" }}>
                    FLAGSHIP ENDURANCE
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>05:45 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px 0" }}>10K Global Goals Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px 0" }}>
                  Premier competitive race with official chip timing, verified pace tracking, and finisher awards.
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "24px" }}>
                  <span style={{ fontSize: "36px", fontWeight: 900, color: "#0d1b2a" }}>₹1099</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#64748B" }}>Standard Entry</span>
                </div>

                <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "#C5081E" }}><span>✓</span> RFID Timing Chip &amp; Race BIB</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Event T-Shirt</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Finisher Medal</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Official Timing E-Certificate</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Prize Money for Winners</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span>✓</span> Breakfast &amp; Hydration</div>
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <RegistrationClosedButton
                  size="md"
                  fullWidth={true}
                  label="10K Registration Closed"
                />
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CASH PRIZE POOL SECTION (As per Reference Design)                        */}
          {/* ========================================================================= */}
          <div
            id="prize-pool"
            className="prize-pool-box"
            style={{
              marginTop: "56px",
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
              padding: "48px 36px 36px",
              position: "relative",
              backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          >
            {/* Top Eyebrow Header with Red Lines */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
                marginBottom: "16px"
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "1.5px",
                  backgroundColor: "#C5192D"
                }}
              />
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#C5192D",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase"
                }}
              >
                <span>🏆</span> PRIZE POOL
              </div>
              <div
                style={{
                  width: "70px",
                  height: "1.5px",
                  backgroundColor: "#C5192D"
                }}
              />
            </div>

            {/* Giant Cash Prize Amount & Heading */}
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <div
                className="font-condensed"
                style={{
                  fontSize: "clamp(52px, 7vw, 84px)",
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: "-1px",
                  color: "#C5192D",
                  background: "linear-gradient(180deg, #D91D32 0%, #8B0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  margin: "0 0 6px 0"
                }}
              >
                ₹60,000
              </div>
              <h3
                className="font-condensed"
                style={{
                  fontSize: "clamp(22px, 3.2vw, 34px)",
                  fontWeight: 900,
                  color: "#0c1e33",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: "0 0 10px 0"
                }}
              >
                TOTAL CASH PRIZE POOL
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#475569",
                  maxWidth: "580px",
                  margin: "0 auto",
                  lineHeight: 1.6
                }}
              >
                Competitive prizes for eligible participants in the <strong style={{ color: "#C5192D" }}>5K</strong> and <strong style={{ color: "#C5192D" }}>10K</strong> timed categories, across Men’s and Women’s classifications.
              </p>
            </div>

            {/* Two Side-by-Side Category Prize Cards */}
            <div
              className="prize-cards-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                maxWidth: "880px",
                margin: "0 auto 36px"
              }}
            >
              {/* Card 1: 5K TIMED RUN */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #DBEAFE",
                  borderBottom: "4px solid #002B49",
                  borderRadius: "18px",
                  padding: "26px 24px 22px",
                  boxShadow: "0 4px 16px rgba(0, 43, 73, 0.05)",
                  textAlign: "center"
                }}
              >
                {/* Header with Icon, Title, and Line with Dot */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "#002B49",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "18px",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(0, 43, 73, 0.25)"
                    }}
                  >
                    🏃
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className="font-condensed"
                      style={{
                        fontSize: "16px",
                        fontWeight: 900,
                        color: "#002B49",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      5K TIMED RUN
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "1.5px",
                        backgroundColor: "#3B82F6",
                        position: "relative"
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: "-3px",
                          top: "-3px",
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: "#3B82F6"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div
                  className="font-condensed"
                  style={{
                    fontSize: "44px",
                    fontWeight: 900,
                    color: "#002B49",
                    lineHeight: 1.0,
                    marginBottom: "10px"
                  }}
                >
                  ₹20,000
                </div>

                {/* Pill */}
                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#1E40AF",
                      backgroundColor: "#EFF6FF",
                      border: "1px solid #DBEAFE",
                      padding: "4px 14px",
                      borderRadius: "999px",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase"
                    }}
                  >
                    TOTAL PRIZE POOL
                  </span>
                </div>

                {/* Trophy & Note */}
                <div style={{ fontSize: "16px", marginBottom: "4px" }}>🏆</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>
                  Competitive prizes for eligible <strong style={{ color: "#002B49" }}>5K</strong> finishers.
                </div>
              </div>

              {/* Card 2: 10K TIMED CHALLENGE */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #FEE2E2",
                  borderBottom: "4px solid #C5192D",
                  borderRadius: "18px",
                  padding: "26px 24px 22px",
                  boxShadow: "0 4px 16px rgba(197, 25, 45, 0.05)",
                  textAlign: "center"
                }}
              >
                {/* Header with Icon, Title, and Line with Dot */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "#C5192D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "18px",
                      flexShrink: 0,
                      boxShadow: "0 2px 8px rgba(197, 25, 45, 0.25)"
                    }}
                  >
                    🏃
                  </div>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      className="font-condensed"
                      style={{
                        fontSize: "16px",
                        fontWeight: 900,
                        color: "#C5192D",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      10K TIMED CHALLENGE
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "1.5px",
                        backgroundColor: "#C5192D",
                        position: "relative"
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: "-3px",
                          top: "-3px",
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: "#C5192D"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div
                  className="font-condensed"
                  style={{
                    fontSize: "44px",
                    fontWeight: 900,
                    color: "#C5192D",
                    lineHeight: 1.0,
                    marginBottom: "10px"
                  }}
                >
                  ₹40,000
                </div>

                {/* Pill */}
                <div style={{ marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#991B1B",
                      backgroundColor: "#FEF2F2",
                      border: "1px solid #FEE2E2",
                      padding: "4px 14px",
                      borderRadius: "999px",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase"
                    }}
                  >
                    TOTAL PRIZE POOL
                  </span>
                </div>

                {/* Trophy & Note */}
                <div style={{ fontSize: "16px", marginBottom: "4px" }}>🏆</div>
                <div style={{ fontSize: "13px", color: "#475569" }}>
                  Competitive prizes for eligible <strong style={{ color: "#C5192D" }}>10K</strong> finishers.
                </div>
              </div>

            </div>

            {/* Bottom Button with Lines & Footer Note */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  marginBottom: "18px"
                }}
              >
                <div style={{ width: "60px", height: "1px", backgroundColor: "#FECACA" }} />
                <Link
                  href="/hydoct18/prize-details"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#8B0000",
                    background: "linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)",
                    color: "#FFFFFF",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    boxShadow: "0 4px 14px rgba(139, 0, 0, 0.3)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                >
                  <span style={{ fontSize: "16px" }}>🏆</span> VIEW PRIZE DETAILS <span>&gt;</span>
                </Link>
                <div style={{ width: "60px", height: "1px", backgroundColor: "#FECACA" }} />
              </div>

              {/* Decorative Accent Icon */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "18px",
                    borderRadius: "999px",
                    backgroundColor: "#F1F5F9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0c1e33",
                    fontSize: "11px"
                  }}
                >
                  ✦
                </div>
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: "12px", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                ⓘ Prize eligibility, verification, rankings and final classifications are subject to the official <strong>FLEXATHON</strong> race rules.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SDG 4: QUALITY EDUCATION SECTION (`#goals`)                           */}
      {/* ========================================================================= */}
      <section id="goals" className="sdg4-section-wrap" style={{ padding: "70px 32px", backgroundColor: "#FAFBFC", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          
          {/* Master White Card Container */}
          <div
            className="sdg4-card-inner"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "28px",
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)",
              padding: "44px 40px 32px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Background Logo Watermark from logo folder */}
            <div
              style={{
                position: "absolute",
                right: "-60px",
                bottom: "-60px",
                width: "360px",
                height: "360px",
                opacity: 0.04,
                pointerEvents: "none",
                zIndex: 0
              }}
            >
              <img
                src="/assets/brand/logo.png"
                alt="Flexathon SDG Background"
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}
              />
            </div>

            {/* Top Eyebrow Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "24px",
                position: "relative",
                zIndex: 1
              }}
            >
              <div style={{ width: "45px", height: "1.5px", backgroundColor: "#C5192D" }} />
              <span style={{ color: "#C5192D", fontWeight: 900, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                RUN FOR A BIGGER PURPOSE
              </span>
              <div style={{ width: "45px", height: "1.5px", backgroundColor: "#C5192D" }} />
            </div>

            {/* Main Content Grid: Left Text + Right Illustration */}
            <div
              className="sdg4-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: "36px",
                alignItems: "center",
                marginBottom: "36px",
                position: "relative",
                zIndex: 1
              }}
            >
              {/* Left Column: Heading, Paragraph, SDG4 card, 3 badges, CTA */}
              <div>
                {/* Title */}
                <h2
                  className="font-condensed"
                  style={{
                    fontSize: "clamp(34px, 4.2vw, 56px)",
                    fontWeight: 900,
                    lineHeight: 1.05,
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                    letterSpacing: "-0.5px"
                  }}
                >
                  <span style={{ color: "#0c1e33", display: "block" }}>2026 FOCUS:</span>
                  <span style={{ color: "#C5192D", display: "block" }}>QUALITY EDUCATION</span>
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: "15px",
                    color: "#475569",
                    lineHeight: 1.6,
                    margin: "0 0 24px 0",
                    maxWidth: "540px"
                  }}
                >
                  FLEXATHON connects sport with the Global Goals, using each edition to bring attention to a different goal that matters to communities.
                </p>

                {/* SDG 4 Feature Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #FEE2E2",
                    borderRadius: "16px",
                    padding: "16px 20px",
                    marginBottom: "24px",
                    boxShadow: "0 4px 16px rgba(197, 25, 45, 0.04)",
                    maxWidth: "540px"
                  }}
                >
                  <img
                    src="/assets/editions/sdg4.png"
                    alt="SDG 4 Quality Education"
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "12px",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(197, 25, 45, 0.25)"
                    }}
                  />
                  <div>
                    <div
                      className="font-condensed"
                      style={{
                        fontSize: "17px",
                        fontWeight: 900,
                        color: "#C5192D",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "4px"
                      }}
                    >
                      SDG 4 — QUALITY EDUCATION
                    </div>
                    <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.45, margin: 0 }}>
                      This edition highlights the importance of access to learning, inclusion, skills and educational opportunity.
                    </p>
                  </div>
                </div>

                {/* 3 Values / Badges */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#0c1e33",
                    marginBottom: "24px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#C5192D" }}>♡</span> One run.
                  </div>
                  <span style={{ color: "#CBD5E1" }}>|</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#C5192D" }}>👥</span> One shared purpose.
                  </div>
                  <span style={{ color: "#CBD5E1" }}>|</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#C5192D" }}>🎯</span> One goal in focus.
                  </div>
                </div>

                {/* CTA Button */}
                <div style={{ marginBottom: "16px" }}>
                  <Link
                    href="/hydoct18/global-goal"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      backgroundColor: "#C5192D",
                      color: "#FFFFFF",
                      padding: "13px 28px",
                      borderRadius: "8px",
                      fontSize: "13.5px",
                      fontWeight: 900,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(197, 25, 45, 0.3)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span>EXPLORE THE 2026 THEME</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* United by Sport tagline */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#64748B", fontWeight: 700 }}>
                  <span style={{ letterSpacing: "2px", color: "#C5192D" }}>///</span>
                  <span>United by Sport. Driven by <strong style={{ color: "#0c1e33" }}>Global Goals.</strong></span>
                </div>
              </div>

              {/* Right Column: Authentic Marathon Photography */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}
              >
                <img
                  src="/assets/gallery/hero-slide3-desktop.webp"
                  alt="FLEXATHON Hyderabad 2026 Runners on Gachibowli Course"
                  style={{
                    width: "100%",
                    maxWidth: "460px",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #E2E8F0"
                  }}
                />
              </div>
            </div>

            {/* Bottom 4-Pillar Feature Strip (Inside Card) */}
            <div
              className="sdg4-pillars-strip"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #F1F5F9",
                borderRadius: "18px",
                padding: "18px 24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "20px"
              }}
            >
              {/* Pillar 1: Access to Learning */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "18px",
                    flexShrink: 0
                  }}
                >
                  🎓
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>
                    ACCESS TO LEARNING
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.4, margin: 0 }}>
                    Supporting access to quality education for every learner.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Inclusion & Equity */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "18px",
                    flexShrink: 0
                  }}
                >
                  👥
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>
                    INCLUSION &amp; EQUITY
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.4, margin: 0 }}>
                    Encouraging equal opportunity and leaving no one behind.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Skills for the Future */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "18px",
                    flexShrink: 0
                  }}
                >
                  💡
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>
                    SKILLS FOR THE FUTURE
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.4, margin: 0 }}>
                    Promoting skills, innovation and lifelong learning.
                  </p>
                </div>
              </div>

              {/* Pillar 4: Building Stronger Communities */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "18px",
                    flexShrink: 0
                  }}
                >
                  🌐
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>
                    BUILDING STRONGER COMMUNITIES
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", lineHeight: 1.4, margin: 0 }}>
                    Stronger education. Stronger communities. Better world.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Subtle Bar: 17 Global Goals Note */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
                fontSize: "12px",
                color: "#64748B",
                textAlign: "center"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>🎯</span>
                <span>FLEXATHON will feature all <strong>17 Global Goals</strong> across future editions.</span>
              </div>
              <span style={{ color: "#CBD5E1" }}>|</span>
              <div>
                This year, we run for <strong style={{ color: "#C5192D" }}>Quality Education.</strong>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RACE DAY SCHEDULE (`#routes`)                                          */}
      {/* ========================================================================= */}
      <section id="routes" className="routes-section-wrap" style={{ padding: "70px 32px", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
            <span style={{ color: "#C5081E", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
              EVENT SCHEDULE
            </span>
            <h2 className="font-condensed" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 900, color: "#0d1b2a", margin: "8px 0 12px", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
              Race Day Schedule &amp; Routes
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>
              Sunday, 18 October 2026 • ESCI Campus, Gachibowli, Hyderabad
            </p>
          </div>

          <div className="schedule-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
            
            <div style={{ backgroundColor: "#F8FAFC", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#0d1b2a", marginBottom: "4px" }}>05:00 AM</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#C5081E", textTransform: "uppercase" }}>Gate Assembly</div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "8px 0 0 0" }}>Runner check-in, baggage drop &amp; energetic Zumba warm-up</p>
            </div>

            <div style={{ backgroundColor: "#FFF5F5", padding: "24px", borderRadius: "16px", border: "1.5px solid #FECACA", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#C5081E", marginBottom: "4px" }}>05:45 AM</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#C5081E", textTransform: "uppercase" }}>10K Flag-Off</div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "8px 0 0 0" }}>Official chip-timed start for 10K endurance runners</p>
            </div>

            <div style={{ backgroundColor: "#EFF6FF", padding: "24px", borderRadius: "16px", border: "1.5px solid #BFDBFE", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#2563EB", marginBottom: "4px" }}>06:15 AM</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#2563EB", textTransform: "uppercase" }}>5K Flag-Off</div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "8px 0 0 0" }}>Official chip-timed start for 5K fitness participants</p>
            </div>

            <div style={{ backgroundColor: "#F0FDF4", padding: "24px", borderRadius: "16px", border: "1.5px solid #BBF7D0", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#16A34A", marginBottom: "4px" }}>06:45 AM</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#16A34A", textTransform: "uppercase" }}>3K Fun Run</div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "8px 0 0 0" }}>Community 3K walk and family fun run flag-off</p>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 900, color: "#0d1b2a", marginBottom: "4px" }}>08:00 AM</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#166534", textTransform: "uppercase" }}>Celebration</div>
              <p style={{ fontSize: "12px", color: "#64748B", margin: "8px 0 0 0" }}>Medal presentation, breakfast buffet &amp; celebration stage</p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RUNNER SPOTLIGHT (COMMUNITY RUNNER CARDS)                             */}
      {/* ========================================================================= */}
      <section className="spotlight-section-wrap" style={{ padding: "80px 32px 70px", backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Section Heading Area */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "14px"
              }}
            >
              <div style={{ width: "45px", height: "1.5px", backgroundColor: "#C5192D" }} />
              <span style={{ color: "#C5192D", fontWeight: 900, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                RUNNER SPOTLIGHT
              </span>
              <div style={{ width: "45px", height: "1.5px", backgroundColor: "#C5192D" }} />
            </div>

            <h2
              className="font-condensed"
              style={{
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 900,
                color: "#0c1e33",
                margin: "0 0 10px 0",
                letterSpacing: "-0.5px",
                textTransform: "uppercase"
              }}
            >
              BE PART OF THE <span style={{ color: "#C5192D" }}>FLEXATHON</span> FAMILY
            </h2>

            <p style={{ fontSize: "15px", color: "#475569", margin: 0, fontWeight: 500 }}>
              Runners from across Hyderabad are already in. Will you be next?
            </p>
          </div>

          {/* Runner Cards Showcase with Floating Navigation Arrows */}
          <div style={{ position: "relative", marginBottom: "44px" }}>
            
            {/* Left Nav Arrow Button */}
            <div
              className="spotlight-nav-arrow"
              style={{
                position: "absolute",
                left: "-18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C5192D",
                fontSize: "18px",
                fontWeight: 900,
                zIndex: 20,
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              ‹
            </div>

            {/* Authentic Runner Spotlight Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                padding: "10px 0",
              }}
            >
              {[
                {
                  src: "/assets/gallery/oct18/NIX09941.JPG",
                  alt: "10K Men's Open Champion ₹10,000 Prize Cheque",
                  objectPosition: "center 24%",
                  badge: "10K MEN'S CHAMPION",
                  badgeColor: "#C5192D",
                  title: "10K Timed Champion",
                  detail: "Awarded ₹10,000 1st place cheque & official trophy on the main stage.",
                  link: "/hydoct18/results",
                  linkText: "View 10K Timings →",
                },
                {
                  src: "/assets/gallery/oct18/NIX09990.JPG",
                  alt: "10K Women's Open Podium Ceremony",
                  objectPosition: "center 22%",
                  badge: "10K WOMEN'S PODIUM",
                  badgeColor: "#2563EB",
                  title: "Women's Open Podium",
                  detail: "Equal prize purse awarded across 1st, 2nd, and 3rd place finishers.",
                  link: "/hydoct18/prize-details",
                  linkText: "Prize Details →",
                },
                {
                  src: "/assets/gallery/oct18/NIX09962.JPG",
                  alt: "5K Finishers with Medals",
                  objectPosition: "center 26%",
                  badge: "5K TIMED FINISHERS",
                  badgeColor: "#10B981",
                  title: "Finisher Medalists",
                  detail: "Official heavy cast brass medals celebrating endurance and SDG 4.",
                  link: "/hydoct18/social-card",
                  linkText: "Runner Studio →",
                },
                {
                  src: "/assets/gallery/oct18/NIX09918.JPG",
                  alt: "3K Community & Family Finishers",
                  objectPosition: "center 30%",
                  badge: "3K COMMUNITY RUN",
                  badgeColor: "#F59E0B",
                  title: "Youth & Families",
                  detail: "Non-timed 3K fun run uniting runners of all ages at ESCI Campus.",
                  link: "/hydoct18/the-run",
                  linkText: "Event Highlights →",
                },
              ].map((card, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <img
                      src={card.src}
                      alt={card.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: card.objectPosition,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: card.badgeColor,
                        color: "#FFFFFF",
                        fontSize: "0.68rem",
                        fontWeight: 900,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {card.badge}
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <h3
                        className="font-condensed"
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          color: "#0F172A",
                          margin: "0 0 6px 0",
                        }}
                      >
                        {card.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.5, margin: "0 0 14px 0" }}>
                        {card.detail}
                      </p>
                    </div>

                    <Link
                      href={card.link}
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: card.badgeColor,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {card.linkText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Nav Arrow Button */}
            <div
              className="spotlight-nav-arrow"
              style={{
                position: "absolute",
                right: "-18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C5192D",
                fontSize: "18px",
                fontWeight: 900,
                zIndex: 20,
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              ›
            </div>
          </div>

          {/* Lower CTA Feature Panel */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #F1F5F9",
              borderRadius: "20px",
              padding: "24px 32px",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
              display: "grid",
              gridTemplateColumns: "1.1fr 1.9fr",
              gap: "28px",
              alignItems: "center",
              marginBottom: "32px"
            }}
            className="spotlight-cta-panel"
          >
            {/* Left Area: Icon + Headline */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", borderRight: "1px solid #F1F5F9", paddingRight: "20px" }} className="spotlight-left-block">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#C5192D",
                  fontSize: "22px",
                  flexShrink: 0
                }}
              >
                👥
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 900, color: "#C5192D", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>
                  YOUR TURN!
                </div>
                <div style={{ fontSize: "14px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", lineHeight: 1.3 }}>
                  CREATE YOUR RUNNER CARD AND SHARE YOUR PLEDGE.
                </div>
              </div>
            </div>

            {/* Right Area: 3 Mini Steps */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
                alignItems: "center"
              }}
              className="spotlight-steps-grid"
            >
              {/* Step 1 */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "16px",
                    flexShrink: 0
                  }}
                >
                  🖼️
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#334155", lineHeight: 1.3 }}>
                  Create your personalised Runner Card
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "16px",
                    flexShrink: 0
                  }}
                >
                  🔗
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#334155", lineHeight: 1.3 }}>
                  Share it on your social media
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#FEF2F2",
                    border: "1px solid #FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "16px",
                    flexShrink: 0
                  }}
                >
                  ♡
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#334155", lineHeight: 1.3 }}>
                  Inspire your friends to join the run
                </div>
              </div>
            </div>

          </div>

          {/* Centered CTA Button */}
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <Link
              href="/hydoct18/social-card"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#C5192D",
                color: "#FFFFFF",
                padding: "14px 34px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(197, 25, 45, 0.35)",
                transition: "all 0.2s ease"
              }}
            >
              <span>CREATE MY RUNNER CARD</span>
              <span>→</span>
            </Link>
          </div>

          {/* Bottom Supporting Line */}
          <div style={{ textAlign: "center", fontSize: "13px", color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
            <span>🌐</span>
            <span>Let&apos;s run together for <strong style={{ color: "#C5192D" }}>Quality Education (SDG 4)</strong>.</span>
          </div>

          {/* Decorative Centered Accent */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "48px",
                height: "22px",
                borderRadius: "999px",
                backgroundColor: "#F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0c1e33",
                fontSize: "12px"
              }}
            >
              ✦
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS (`#faqs`)                                  */}
      {/* ========================================================================= */}
      <section id="faqs" className="faqs-section-wrap" style={{ padding: "70px 32px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="font-condensed" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 900, color: "#0d1b2a", margin: "8px 0 12px", letterSpacing: "-0.5px", textTransform: "uppercase" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
              Everything you need to know about race day, kit collection, and guidelines.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "18px 22px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: isOpen ? "#C5192D" : "#0d1b2a"
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: "18px", color: isOpen ? "#C5192D" : "#94A3B8" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 22px 20px", fontSize: "14px", color: "#475569", lineHeight: 1.6, borderTop: "1px solid #F1F5F9" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER (UNIFIED PLATFORM FOOTER)                                       */}
      {/* ========================================================================= */}
      <Footer />

    </div>
  );
}
