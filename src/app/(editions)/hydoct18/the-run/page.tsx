"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegistrationClosedButton from "@/components/editions/RegistrationClosedButton";

export default function TheRunPage() {
  return (
    <div style={{ backgroundColor: "#fafbfc", color: "#1e293b", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* Global Fonts and Layout Utilities */}
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
          mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 35%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 35%);
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
        .top-nav-link:hover, .top-nav-link.active {
          color: #C5192D !important;
          transform: translateY(-1px);
        }
        .top-nav-link:hover::after, .top-nav-link.active::after {
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

        @media (max-width: 768px) {
          .page-hero-wrap {
            padding: 32px 18px 40px !important;
          }
          .subpage-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            text-align: center;
          }
          .subpage-hero-grid div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .subpage-hero-btns {
            justify-content: center !important;
          }
          .subpage-runner-wrap {
            min-height: 240px !important;
          }
          .subpage-runner-wrap img:last-child {
            max-height: 260px !important;
          }
          .subpage-section-padding {
            padding: 44px 18px !important;
          }
          .run-categories-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .run-schedule-timeline {
            padding: 24px 16px !important;
          }
          .run-schedule-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .run-schedule-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Identical Header */}
      <Header activePage="the-run" />

      {/* Hero Section */}
      <section className="hero-bg-grid page-hero-wrap" style={{ position: "relative", overflow: "hidden", padding: "40px 32px 50px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="subpage-hero-grid" style={{ maxWidth: "1440px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "center", position: "relative", zIndex: 10 }}>
          
          <div>
            <span style={{ backgroundColor: "#C5192D", color: "#FFFFFF", fontSize: "11px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "20px", display: "inline-block", marginBottom: "14px" }}>
              RACE DETAILS &amp; CATEGORIES
            </span>
            <h1 className="font-condensed" style={{ fontSize: "clamp(38px, 4.5vw, 68px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "-1px" }}>
              <span style={{ color: "#0c1e33", display: "block" }}>THE 2026</span>
              <span style={{ color: "#d31b26", display: "block" }}>RACE CATEGORIES</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#334155", fontWeight: 500, lineHeight: 1.6, margin: "0 0 16px", maxWidth: "600px" }}>
              Experience Hyderabad&apos;s most inspiring road race on <strong>Sunday, 18 October 2026</strong>. Electronic chip timing, world-class amenities, hydration stations, and post-run celebration.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#334155", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={{ color: "#C5192D", fontSize: "16px" }}>📍</span>
              <span>Engineering Staff College of India (ESCI), Gachibowli, Hyderabad</span>
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
                  marginLeft: "4px"
                }}
              >
                VIEW LOCATION ↗
              </a>
            </div>
            <div className="subpage-hero-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <RegistrationClosedButton
                size="md"
                showBadge={true}
                badgeText="Registration Closed"
                label="REGISTRATION CLOSED"
              />
              <a href="#schedule" style={{ backgroundColor: "#FFFFFF", color: "#0d1b2a", border: "2px solid #0d1b2a", padding: "10px 24px", borderRadius: "10px", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.8px", textDecoration: "none" }}>
                Race Day Timeline
              </a>
            </div>
          </div>

          <div className="subpage-runner-wrap" style={{ position: "relative", minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "520px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)", border: "1px solid #E2E8F0" }}>
              <img
                src="/assets/gallery/oct18/NIX09262.JPG"
                alt="FLEXATHON Hyderabad 2026 Course Action"
                style={{ width: "100%", height: "340px", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
              />
              <div style={{ position: "absolute", bottom: "14px", left: "14px", background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(8px)", color: "#FFFFFF", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>
                📍 ESCI Campus Gachibowli • Official Race Course
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Categories Section */}
      <section className="subpage-section-padding" style={{ padding: "70px 32px", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
            <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
              CHOOSE YOUR DISTANCE
            </span>
            <h2 className="font-condensed" style={{ fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 900, color: "#0d1b2a", margin: "8px 0 12px", textTransform: "uppercase" }}>
              Official Categories &amp; Perks
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              All registrations include official event T-Shirt, finisher medal, timing BIB, breakfast buffet, and medical support.
            </p>
          </div>

          <div className="run-categories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "28px", marginBottom: "70px" }}>
            
            {/* Card 1: 3K */}
            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid #E2E8F0", borderRadius: "20px", padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#16a34a", backgroundColor: "#DCFCE7", padding: "4px 12px", borderRadius: "20px" }}>
                    COMMUNITY &amp; FAMILIES
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>06:45 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px" }}>3K Community Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px" }}>
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

            {/* Card 2: 5K */}
            <div style={{ backgroundColor: "#FFFFFF", border: "2.5px solid #2563EB", borderRadius: "20px", padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 10px 28px rgba(37, 99, 235, 0.12)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "11px", fontWeight: 900, letterSpacing: "1px", padding: "4px 16px", borderRadius: "12px", textTransform: "uppercase" }}>
                ★ MOST POPULAR ★
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#2563EB", backgroundColor: "#DBEAFE", padding: "4px 12px", borderRadius: "20px" }}>
                    TIMED WITH CHIP
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>06:15 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px" }}>5K Fitness Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px" }}>
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

            {/* Card 3: 10K */}
            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid #E2E8F0", borderRadius: "20px", padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#C5081E", backgroundColor: "#FEE2E2", padding: "4px 12px", borderRadius: "20px" }}>
                    FLAGSHIP ENDURANCE
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: 600 }}>05:45 AM</span>
                </div>
                <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0d1b2a", margin: "0 0 8px" }}>10K Global Goals Run</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.5, margin: "0 0 20px" }}>
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

          {/* Schedule Timeline */}
          <div id="schedule" className="run-schedule-timeline" style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "36px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "1px" }}>RACE DAY TIMELINE</span>
              <h3 className="font-condensed" style={{ fontSize: "30px", fontWeight: 900, color: "#0d1b2a", margin: "6px 0 0", textTransform: "uppercase" }}>Sunday, 18 October 2026</h3>
            </div>

            <div className="run-schedule-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#0d1b2a" }}>05:00 AM</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#C5192D", textTransform: "uppercase", marginTop: "4px" }}>Gates Open</div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>Check-in &amp; Warm-up</p>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "12px", border: "1px solid #FECACA", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#C5081E" }}>05:45 AM</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#C5081E", textTransform: "uppercase", marginTop: "4px" }}>10K Flag-Off</div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>Timed Start</p>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "12px", border: "1px solid #BFDBFE", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#2563EB" }}>06:15 AM</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", marginTop: "4px" }}>5K Flag-Off</div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>Timed Start</p>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "12px", border: "1px solid #BBF7D0", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#16A34A" }}>06:45 AM</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#16A34A", textTransform: "uppercase", marginTop: "4px" }}>3K Fun Run</div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>Community Walk</p>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#0d1b2a" }}>08:00 AM</div>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#166534", textTransform: "uppercase", marginTop: "4px" }}>Breakfast &amp; Awards</div>
                <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>Celebration Stage</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer & Partner Strip */}
      <Footer showPartnerStrip={true} />

    </div>
  );
}
