"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegistrationClosedButton from "@/components/editions/RegistrationClosedButton";

export default function QualityEducation2026Page() {
  const pillars = [
    {
      icon: "🎓",
      title: "ACCESS TO LEARNING",
      desc: "Providing textbooks, digital learning kits, and grassroots sports equipment to underfunded rural government schools in Telangana."
    },
    {
      icon: "⚖️",
      title: "INCLUSION & EQUITY",
      desc: "Ensuring equal educational and athletic opportunities for girls, differently-abled children, and disadvantaged communities."
    },
    {
      icon: "💡",
      title: "SKILLS FOR THE FUTURE",
      desc: "Introducing digital literacy classrooms, STEM kits, and lifelong learning foundations from an early age."
    },
    {
      icon: "🌐",
      title: "BUILDING STRONGER COMMUNITIES",
      desc: "Empowering teachers, building community sports clubs, and creating lasting civic support networks around every school."
    }
  ];

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
        .hero-education-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 990px) {
          .hero-education-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 768px) {
          .page-hero-wrap {
            padding: 32px 18px 40px !important;
          }
          .hero-education-grid {
            text-align: center;
          }
          .hero-education-grid div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-impact-badges, .hero-action-btns {
            justify-content: center !important;
          }
          .subpage-section-padding {
            padding: 44px 18px !important;
          }
          .education-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .education-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .impact-pledge-card {
            grid-template-columns: 1fr !important;
            padding: 24px 18px !important;
            gap: 24px !important;
            text-align: center;
          }
          .impact-pledge-card div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 480px) {
          .impact-pledge-stats {
            grid-template-columns: 1fr !important;
          }
        }
        .pillar-card-hover {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .pillar-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>

      {/* Identical Header */}
      <Header activePage="2026-edition" />

      {/* Hero Section */}
      <section className="hero-bg-grid page-hero-wrap" style={{ position: "relative", overflow: "hidden", padding: "50px 32px 64px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          
          <div className="hero-education-grid">
            
            {/* Left Content Column */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#C5192D", color: "#FFFFFF", fontSize: "11px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 16px", borderRadius: "20px", marginBottom: "16px" }}>
                <span>🎯</span>
                <span>2026 HYDERABAD EDITION • SDG 4 FOCUS</span>
              </div>

              <h1 className="font-condensed" style={{ fontSize: "clamp(40px, 4.8vw, 70px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 18px", textTransform: "uppercase", letterSpacing: "-1px" }}>
                <span style={{ color: "#0c1e33", display: "block" }}>SDG 4: QUALITY</span>
                <span style={{ color: "#C5192D", display: "block" }}>EDUCATION FOR ALL</span>
              </h1>

              <p style={{ fontSize: "17px", color: "#334155", fontWeight: 500, lineHeight: 1.6, margin: "0 0 24px", maxWidth: "600px" }}>
                On <strong>Sunday, 18 October 2026</strong>, Hyderabad runs for inclusive, equitable learning. Join 10,000+ runners at ESCI Gachibowli to power grassroots sports kits, smart classrooms, and learning resources for rural government schools across Telangana.
              </p>

              {/* Impact Badges */}
              <div className="hero-impact-badges" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", padding: "8px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 800, color: "#0c1e33", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                  <span style={{ color: "#C5192D" }}>♡</span>
                  <span>One Run. One Purpose.</span>
                </div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", padding: "8px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 800, color: "#0c1e33", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                  <span style={{ color: "#C5192D" }}>🏫</span>
                  <span>100% Surplus to Schools</span>
                </div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", padding: "8px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 800, color: "#0c1e33", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                  <span style={{ color: "#C5192D" }}>🎯</span>
                  <span>Target: 25+ Schools</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-action-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <RegistrationClosedButton
                  size="md"
                  showBadge={true}
                  badgeText="Registration Closed"
                  label="REGISTRATION CLOSED"
                />
                <Link
                  href="/hydoct18/the-run"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#0c1e33",
                    border: "2px solid #0c1e33",
                    padding: "12px 26px",
                    borderRadius: "10px",
                    fontWeight: 900,
                    fontSize: "13.5px",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    textDecoration: "none"
                  }}
                >
                  View Race Categories
                </Link>
              </div>
            </div>

            {/* Right Visual Composite: Quality Education Hero Image */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              
              {/* Background Glow */}
              <div
                style={{
                  position: "absolute",
                  width: "90%",
                  height: "90%",
                  borderRadius: "28px",
                  background: "radial-gradient(circle, rgba(197, 25, 45, 0.12) 0%, rgba(255, 255, 255, 0) 70%)",
                  filter: "blur(20px)",
                  zIndex: 0
                }}
              />

              {/* Master Card Container */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "24px",
                  border: "2px solid #FEE2E2",
                  padding: "16px",
                  boxShadow: "0 20px 48px rgba(197, 25, 45, 0.14)",
                  width: "100%",
                  maxWidth: "520px"
                }}
              >
                {/* Header Strip with 17 Goals Emblem & SDG 4 Spotlight Badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", padding: "0 4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src="/assets/sdgs/sdg-wheel.png"
                      alt="17 Global Goals Emblem"
                      style={{ width: "32px", height: "32px", objectFit: "contain" }}
                    />
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.5px", lineHeight: 1.1 }}>
                        17 GLOBAL GOALS
                      </div>
                      <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 700 }}>
                        UNITED BY SPORT
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#FEE2E2", color: "#C5192D", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.8px", padding: "5px 12px", borderRadius: "12px", border: "1px solid #FECACA" }}>
                    <span>★</span>
                    <span>GOAL 4 IN FOCUS</span>
                  </div>
                </div>

                {/* Main Quality Education Marathon Photography */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.06)",
                    backgroundColor: "#0F172A"
                  }}
                >
                  <img
                    src="/assets/gallery/oct18/NIX09092.JPG"
                    alt="FLEXATHON Hyderabad 2026 Runners for SDG 4 Quality Education — Sunrise Warmup Assembly"
                    style={{
                      width: "100%",
                      height: "280px",
                      display: "block",
                      objectFit: "cover",
                      objectPosition: "center 42%",
                    }}
                  />
                </div>

                {/* 17 Global Goals Visual Strip */}
                <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1.5px solid #F1F5F9" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ fontSize: "11.5px", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      ALL 17 SUSTAINABLE DEVELOPMENT GOALS
                    </div>
                    <span style={{ fontSize: "10.5px", fontWeight: 800, color: "#C5192D", textTransform: "uppercase" }}>
                      Featured Across Future Editions
                    </span>
                  </div>

                  {/* 17 Miniature Official Goal Tiles */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(17, 1fr)",
                      gap: "3px",
                      alignItems: "center"
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((n) => (
                      <div
                        key={n}
                        title={`Goal ${n}`}
                        style={{
                          aspectRatio: "1/1",
                          borderRadius: "4px",
                          overflow: "hidden",
                          border: n === 4 ? "2px solid #C5192D" : "1px solid #E2E8F0",
                          transform: n === 4 ? "scale(1.15)" : "scale(1)",
                          zIndex: n === 4 ? 2 : 1,
                          boxShadow: n === 4 ? "0 2px 8px rgba(197, 25, 45, 0.4)" : "none",
                          backgroundColor: "#FFFFFF",
                          transition: "transform 0.15s ease"
                        }}
                      >
                        <img
                          src={`/assets/sdgs/goal-${n}.png`}
                          alt={`SDG Goal ${n}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Sub-Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 6px 2px",
                    fontSize: "12px",
                    color: "#64748B",
                    fontWeight: 600
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#16A34A", display: "inline-block" }} />
                    <span>United by Sport. Driven by Global Goals.</span>
                  </div>
                  <span style={{ color: "#C5192D", fontWeight: 800 }}>#Flexathon2026</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4 Pillars of Action */}
      <section className="subpage-section-padding" style={{ padding: "80px 32px", backgroundColor: "#FFFFFF" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 54px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "1.5px", backgroundColor: "#C5192D" }} />
              <span style={{ color: "#C5192D", fontWeight: 900, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                PILLARS OF IMPACT
              </span>
              <div style={{ width: "40px", height: "1.5px", backgroundColor: "#C5192D" }} />
            </div>

            <h2 className="font-condensed" style={{ fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 900, color: "#0c1e33", margin: "8px 0 14px", textTransform: "uppercase", letterSpacing: "-0.5px" }}>
              How FLEXATHON Drives Quality Education
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>
              Through participant pledges, corporate matching, and non-profit partnerships, every kilometer run translates into measurable educational resources.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="education-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "64px" }}>
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="pillar-card-hover"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "#FEE2E2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#C5192D",
                    fontSize: "22px",
                    marginBottom: "18px"
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0c1e33", margin: "0 0 10px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "13.5px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Event Features Grid */}
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 44px" }}>
            <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
              EVENT HIGHLIGHTS
            </span>
            <h2 className="font-condensed" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", fontWeight: 900, color: "#0c1e33", margin: "8px 0 12px", textTransform: "uppercase" }}>
              The 2026 Hyderabad Experience
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", margin: 0 }}>
              Sunday, 18 October 2026 • Engineering Staff College of India (ESCI), Gachibowli
            </p>
          </div>

          <div className="education-highlights-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "22px", marginBottom: "60px" }}>
            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "18px", padding: "26px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>🏛️</div>
              <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#0c1e33", margin: "0 0 8px" }}>Historic Venue: ESCI</h4>
              <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                A lush, secure, green campus in Gachibowli with dedicated parking, wide shaded avenues, and zero-traffic routes.
              </p>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "18px", padding: "26px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>⏱️</div>
              <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#0c1e33", margin: "0 0 8px" }}>Official RFID Timing</h4>
              <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                High-precision timing mats for 5K and 10K categories, instant SMS results, and downloadable split certificates.
              </p>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "18px", padding: "26px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>🏅</div>
              <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#0c1e33", margin: "0 0 8px" }}>Exclusive Heavy Medal</h4>
              <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Every finisher receives the custom-cast 2026 commemorative medallion celebrating Hyderabad monuments and SDG 4.
              </p>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "18px", padding: "26px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>🍳</div>
              <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#0c1e33", margin: "0 0 8px" }}>Hot Breakfast &amp; Recovery</h4>
              <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                Nutritious hot South Indian breakfast buffet, hydration &amp; electrolyte stations, and on-site physiotherapists.
              </p>
            </div>
          </div>

          {/* Social Impact Commitment Card */}
          <div className="impact-pledge-card" style={{ backgroundColor: "#FFF5F5", border: "1.5px solid #FECACA", borderRadius: "24px", padding: "36px 32px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px", alignItems: "center" }}>
            <div>
              <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "11.5px", textTransform: "uppercase", letterSpacing: "1px" }}>
                OUR SOCIAL IMPACT PLEDGE
              </span>
              <h3 className="font-condensed" style={{ fontSize: "32px", fontWeight: 900, color: "#0c1e33", margin: "8px 0 12px", textTransform: "uppercase" }}>
                Where Your Registration Makes a Difference
              </h3>
              <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: 1.6, margin: "0 0 18px" }}>
                FLEXATHON 2026 is aligned with SDG 4 – Quality Education. Through the event, we aim to support education-focused initiatives and create meaningful community impact.
              </p>
              <span style={{ color: "#94a3b8", fontWeight: 800, fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span>Registrations Closed for SDG 4</span>
                <span style={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#f87171", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>CLOSED</span>
              </span>
            </div>

            <div className="impact-pledge-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ backgroundColor: "#FFFFFF", padding: "24px 18px", borderRadius: "16px", border: "1px solid #FECACA", textAlign: "center", boxShadow: "0 4px 12px rgba(197, 25, 45, 0.05)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div className="font-condensed" style={{ fontSize: "30px", fontWeight: 900, color: "#C5192D", letterSpacing: "0.5px", textTransform: "uppercase" }}>SDG 4</div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginTop: "4px" }}>Quality Education</div>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", padding: "24px 18px", borderRadius: "16px", border: "1px solid #FECACA", textAlign: "center", boxShadow: "0 4px 12px rgba(197, 25, 45, 0.05)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div className="font-condensed" style={{ fontSize: "24px", fontWeight: 900, color: "#C5192D", letterSpacing: "0.5px", textTransform: "uppercase" }}>3K • 5K • 10K</div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginTop: "4px" }}>United for One Goal</div>
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
