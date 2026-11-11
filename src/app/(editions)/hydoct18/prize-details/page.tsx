"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RegistrationClosedButton from "@/components/editions/RegistrationClosedButton";

export default function PrizeDetailsPage() {
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

        .prize-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .prize-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08) !important;
        }

        .table-responsive-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
          .page-hero-wrap {
            padding: 32px 18px 40px !important;
          }
          .subpage-section-padding {
            padding: 40px 18px !important;
          }
          .prize-grid-2col {
            grid-template-columns: 1fr !important;
          }
          .prize-summary-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <Header activePage="prize-details" />

      {/* ── 1. HERO SECTION ── */}
      <section className="hero-bg-grid page-hero-wrap" style={{ position: "relative", overflow: "hidden", padding: "48px 32px 54px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(197, 25, 45, 0.08)", padding: "6px 16px", borderRadius: "100px", marginBottom: "14px" }}>
            <span style={{ fontSize: "16px" }}>🏆</span>
            <span style={{ fontSize: "11.5px", fontWeight: 800, color: "#C5192D", letterSpacing: "1px", textTransform: "uppercase" }}>
              Official Race Awards &amp; Cash Prizes
            </span>
          </div>

          <h1 className="font-condensed" style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 900, lineHeight: 1.06, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "-1px" }}>
            <span style={{ color: "#0c1e33" }}>FLEXATHON 2026 </span>
            <span style={{ color: "#d31b26" }}>PRIZE DETAILS</span>
          </h1>

          <p style={{ fontSize: "16.5px", color: "#475569", fontWeight: 500, lineHeight: 1.6, margin: "0 auto 20px", maxWidth: "680px" }}>
            Celebrating athletic excellence and competitive spirit across the timed 5K and 10K categories at ESCI Hyderabad.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "#FFFFFF", border: "1.5px solid #E2E8F0", padding: "8px 18px", borderRadius: "100px", fontSize: "13px", color: "#334155", flexWrap: "wrap", justifyContent: "center" }}>
            <span>📅 <strong>Sun, 18 Oct 2026</strong></span>
            <span style={{ color: "#CBD5E1" }}>•</span>
            <span>🏛️ <strong>Engineering Staff College of India (ESCI), Gachibowli</strong></span>
            <span style={{ color: "#CBD5E1" }}>•</span>
            <a 
              href="https://share.google/gi3rfRTRt5ZcnPIOR" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#C5192D", fontWeight: 800, textDecoration: "none" }}
            >
              VIEW LOCATION ↗
            </a>
          </div>

        </div>
      </section>

      {/* ── 2. HIGHLIGHT BANNER / SUMMARY CARD ── */}
      <section style={{ padding: "40px 24px 20px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#0c1e33", borderRadius: "24px", padding: "36px 32px", color: "#FFFFFF", boxShadow: "0 16px 36px rgba(12, 30, 51, 0.15)", position: "relative", overflow: "hidden" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px", alignItems: "center" }}>
            
            <div style={{ borderRight: "1px solid rgba(255, 255, 255, 0.15)", paddingRight: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#FECACA", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>
                TOTAL PRIZE POOL
              </div>
              <div className="font-condensed" style={{ fontSize: "clamp(48px, 5vw, 68px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.0 }}>
                ₹60,000
              </div>
              <div style={{ fontSize: "13px", color: "#94A3B8", marginTop: "6px" }}>
                Guaranteed cash awards for timed podium finishers
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ height: "32px", width: "32px", borderRadius: "8px", backgroundColor: "rgba(197, 25, 45, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FECACA", fontSize: "16px" }}>⏱️</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF" }}>Competitive Timed Race Categories</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>Cash awards exclusive to official 10K &amp; 5K timed runners</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ height: "32px", width: "32px", borderRadius: "8px", backgroundColor: "rgba(37, 99, 235, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#BFDBFE", fontSize: "16px" }}>📡</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF" }}>Electronic Chip Timing (RFID)</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>High-precision bib timing mats for official gun-time rank</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ height: "32px", width: "32px", borderRadius: "8px", backgroundColor: "rgba(22, 163, 74, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#BBF7D0", fontSize: "16px" }}>👥</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF" }}>Equal Male &amp; Female Classifications</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>Identical prize amounts across both Men’s &amp; Women’s divisions</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3 & 4. 10K AND 5K CATEGORY BREAKDOWNS ── */}
      <section className="subpage-section-padding" style={{ padding: "50px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "11.5px", letterSpacing: "1px", textTransform: "uppercase" }}>
            CATEGORY PODIUM HONOURS
          </span>
          <h2 className="font-condensed" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#0c1e33", margin: "6px 0 0", textTransform: "uppercase" }}>
            Prize Money Distribution
          </h2>
        </div>

        <div className="prize-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "stretch" }}>
          
          {/* 10K CARD */}
          <div className="prize-card" style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", border: "1.5px solid #FECACA", borderTop: "6px solid #C5192D", padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(197, 25, 45, 0.06)" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#C5192D", backgroundColor: "#FEF2F2", padding: "4px 10px", borderRadius: "6px", textTransform: "uppercase" }}>
                    PREMIER DISTANCE
                  </span>
                  <h3 className="font-condensed" style={{ fontSize: "32px", fontWeight: 900, color: "#0c1e33", margin: "8px 0 0", textTransform: "uppercase" }}>
                    10K Global Goals Run
                  </h3>
                  <div style={{ fontSize: "13.5px", color: "#64748B", marginTop: "2px" }}>
                    Flag-off: 05:45 AM • RFID Chip Timed
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Total Pool</div>
                  <div className="font-condensed" style={{ fontSize: "36px", fontWeight: 900, color: "#C5192D" }}>₹40,000</div>
                </div>
              </div>

              {/* Men's 10K */}
              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", marginBottom: "16px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <span>🏃‍♂️</span> <span>Men&apos;s 10K Open Division</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥇 <strong>1st Place</strong></span>
                    <span style={{ fontWeight: 900, color: "#C5192D", fontSize: "16px" }}>₹10,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥈 <strong>2nd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹6,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥉 <strong>3rd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹4,000</span>
                  </div>
                </div>
              </div>

              {/* Women's 10K */}
              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", marginBottom: "24px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <span>🏃‍♀️</span> <span>Women&apos;s 10K Open Division</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥇 <strong>1st Place</strong></span>
                    <span style={{ fontWeight: 900, color: "#C5192D", fontSize: "16px" }}>₹10,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥈 <strong>2nd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹6,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥉 <strong>3rd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹4,000</span>
                  </div>
                </div>
              </div>
            </div>

            <RegistrationClosedButton
              size="md"
              fullWidth={true}
              label="10K Registration Closed"
            />
          </div>

          {/* 5K CARD */}
          <div className="prize-card" style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", border: "1.5px solid #BFDBFE", borderTop: "6px solid #2563EB", padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(37, 99, 235, 0.06)" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#2563EB", backgroundColor: "#EFF6FF", padding: "4px 10px", borderRadius: "6px", textTransform: "uppercase" }}>
                    FITNESS DISTANCE
                  </span>
                  <h3 className="font-condensed" style={{ fontSize: "32px", fontWeight: 900, color: "#0c1e33", margin: "8px 0 0", textTransform: "uppercase" }}>
                    5K Fitness Run
                  </h3>
                  <div style={{ fontSize: "13.5px", color: "#64748B", marginTop: "2px" }}>
                    Flag-off: 06:15 AM • RFID Chip Timed
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>Total Pool</div>
                  <div className="font-condensed" style={{ fontSize: "36px", fontWeight: 900, color: "#2563EB" }}>₹20,000</div>
                </div>
              </div>

              {/* Men's 5K */}
              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", marginBottom: "16px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <span>🏃‍♂️</span> <span>Men&apos;s 5K Open Division</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥇 <strong>1st Place</strong></span>
                    <span style={{ fontWeight: 900, color: "#2563EB", fontSize: "16px" }}>₹5,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥈 <strong>2nd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹3,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥉 <strong>3rd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹2,000</span>
                  </div>
                </div>
              </div>

              {/* Women's 5K */}
              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", marginBottom: "24px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "#0c1e33", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <span>🏃‍♀️</span> <span>Women&apos;s 5K Open Division</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥇 <strong>1st Place</strong></span>
                    <span style={{ fontWeight: 900, color: "#2563EB", fontSize: "16px" }}>₹5,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥈 <strong>2nd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹3,000</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", padding: "6px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>🥉 <strong>3rd Place</strong></span>
                    <span style={{ fontWeight: 800, color: "#0c1e33", fontSize: "15px" }}>₹2,000</span>
                  </div>
                </div>
              </div>
            </div>

            <RegistrationClosedButton
              size="md"
              fullWidth={true}
              label="5K Registration Closed"
            />
          </div>

        </div>

      </section>

      {/* ── 5. PRIZE POOL AT A GLANCE (SUMMARY TABLE) ── */}
      <section style={{ padding: "30px 24px 60px", maxWidth: "1280px", margin: "0 auto" }}>
        
        <div style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)" }}>
          
          <div style={{ marginBottom: "24px" }}>
            <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
              CONSOLIDATED OVERVIEW
            </span>
            <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0c1e33", margin: "4px 0 6px", textTransform: "uppercase" }}>
              Prize Pool at a Glance
            </h3>
            <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
              Full breakdown of awards by category, position, and gender.
            </p>
          </div>

          <div className="table-responsive-wrapper">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#0c1e33", color: "#FFFFFF" }}>
                  <th style={{ padding: "14px 18px", borderTopLeftRadius: "10px" }}>Distance Category</th>
                  <th style={{ padding: "14px 18px" }}>Podium Position</th>
                  <th style={{ padding: "14px 18px" }}>Men&apos;s Cash Prize</th>
                  <th style={{ padding: "14px 18px" }}>Women&apos;s Cash Prize</th>
                  <th style={{ padding: "14px 18px", borderTopRightRadius: "10px" }}>Total Position Payout</th>
                </tr>
              </thead>
              <tbody>
                {/* 10K Rows */}
                <tr style={{ borderBottom: "1px solid #E2E8F0", backgroundColor: "rgba(197, 25, 45, 0.02)" }}>
                  <td rowSpan={3} style={{ padding: "16px 18px", fontWeight: 900, color: "#C5192D", verticalAlign: "middle", borderRight: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "18px" }} className="font-condensed">10K GLOBAL GOALS RUN</div>
                    <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 500 }}>Category Pool: ₹40,000</div>
                  </td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>🥇 1st Place (Winner)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#C5192D" }}>₹10,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#C5192D" }}>₹10,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 900, color: "#0c1e33" }}>₹20,000</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #E2E8F0", backgroundColor: "rgba(197, 25, 45, 0.02)" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0c1e33" }}>🥈 2nd Place (Runner-Up)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹6,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹6,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>₹12,000</td>
                </tr>
                <tr style={{ borderBottom: "2px solid #CBD5E1", backgroundColor: "rgba(197, 25, 45, 0.02)" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0c1e33" }}>🥉 3rd Place (2nd Runner-Up)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹4,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹4,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>₹8,000</td>
                </tr>

                {/* 5K Rows */}
                <tr style={{ borderBottom: "1px solid #E2E8F0", backgroundColor: "rgba(37, 99, 235, 0.02)" }}>
                  <td rowSpan={3} style={{ padding: "16px 18px", fontWeight: 900, color: "#2563EB", verticalAlign: "middle", borderRight: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: "18px" }} className="font-condensed">5K FITNESS RUN</div>
                    <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 500 }}>Category Pool: ₹20,000</div>
                  </td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>🥇 1st Place (Winner)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#2563EB" }}>₹5,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#2563EB" }}>₹5,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 900, color: "#0c1e33" }}>₹10,000</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #E2E8F0", backgroundColor: "rgba(37, 99, 235, 0.02)" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0c1e33" }}>🥈 2nd Place (Runner-Up)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹3,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹3,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>₹6,000</td>
                </tr>
                <tr style={{ borderBottom: "2px solid #CBD5E1", backgroundColor: "rgba(37, 99, 235, 0.02)" }}>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0c1e33" }}>🥉 3rd Place (2nd Runner-Up)</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹2,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: "#334155" }}>₹2,000</td>
                  <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0c1e33" }}>₹4,000</td>
                </tr>

                {/* Total Grand Row */}
                <tr style={{ backgroundColor: "#F1F5F9", fontWeight: 900 }}>
                  <td colSpan={2} style={{ padding: "16px 18px", color: "#0c1e33", fontSize: "15px" }}>
                    TOTAL ANNOUNCED CASH PRIZE POOL
                  </td>
                  <td style={{ padding: "16px 18px", color: "#0c1e33" }}>₹30,000</td>
                  <td style={{ padding: "16px 18px", color: "#0c1e33" }}>₹30,000</td>
                  <td style={{ padding: "16px 18px", color: "#C5192D", fontSize: "16px" }}>₹60,000</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </section>

      {/* ── 6. IMPORTANT PRIZE INFORMATION / RULES SECTION ── */}
      <section style={{ padding: "20px 24px 60px", maxWidth: "1280px", margin: "0 auto" }}>
        
        <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "20px", padding: "36px 32px" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ fontSize: "24px" }}>📋</span>
            <h3 className="font-condensed" style={{ fontSize: "28px", fontWeight: 900, color: "#0c1e33", margin: 0, textTransform: "uppercase" }}>
              Important Prize Information &amp; Rules
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "#334155", lineHeight: 1.6 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Official electronic timing (RFID chip) is mandatory for prize eligibility.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Prizes are awarded based on Gun Time / Official Race Timing as determined by race officials.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Runners must complete the full certified race course. Any course cutting results in immediate disqualification.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Prizes are non-transferable and subject to identity verification (valid government ID required).</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Applicable taxes/TDS may be deducted as per government regulations.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>Winners must be present at the post-race awards ceremony to receive their podium honours.</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <span style={{ color: "#C5192D", fontWeight: 900, marginTop: "2px" }}>•</span>
              <span>3K Community Run is a non-competitive fun run / walk and does not have cash prizes.</span>
            </div>
          </div>

        </div>

      </section>

      {/* ── 7. BOTTOM CTA SECTION ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        
        <div style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #FECACA", borderRadius: "24px", padding: "48px 32px", textAlign: "center", boxShadow: "0 10px 30px rgba(197, 25, 45, 0.05)" }}>
          
          <span style={{ color: "#C5192D", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
            TAKE THE CHALLENGE
          </span>

          <h2 className="font-condensed" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, color: "#0c1e33", margin: "8px 0 14px", textTransform: "uppercase" }}>
            Ready to Compete for the Podium?
          </h2>

          <p style={{ fontSize: "15.5px", color: "#475569", maxWidth: "600px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            Select your distance, train with purpose, and run for health, community, and United Nations Sustainable Development Goal 4.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <RegistrationClosedButton
              size="lg"
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
                padding: "12px 32px",
                borderRadius: "10px",
                fontWeight: 900,
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                textDecoration: "none"
              }}
            >
              EXPLORE RACE CATEGORIES
            </Link>
          </div>

        </div>

      </section>

      {/* Footer & Partner Strip */}
      <Footer showPartnerStrip={true} />

    </div>
  );
}
