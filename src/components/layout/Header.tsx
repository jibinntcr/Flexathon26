"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegistrationClosedButton from "@/components/editions/RegistrationClosedButton";
import { ASSETS } from "@/lib/assets";

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage }: HeaderProps) {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHydEdition = pathname === "/hydoct18" || pathname.startsWith("/hydoct18/");
  const isKochiEdition = pathname === "/kochi2027" || pathname.startsWith("/kochi2027/");

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const masterNavItems = [
    { label: "HOME", href: "/", key: "home" },
    { label: "ABOUT", href: "/about", key: "about" },
    { label: "EDITIONS", href: "/editions", key: "editions" },
    { label: "17 GLOBAL GOALS", href: "/global-goals", key: "global-goals" },
    { label: "IMPACT", href: "/impact", key: "impact" },
    { label: "GALLERY", href: "/gallery", key: "gallery" },
    { label: "PARTNERS", href: "/partners", key: "partners" },
    { label: "GET INVOLVED", href: "/get-involved", key: "get-involved" },
    { label: "CONTACT", href: "/contact", key: "contact" },
  ];

  const hydSubNavLinks = [
    { name: "Overview", href: "/hydoct18" },
    { name: "The Run (3K/5K/10K)", href: "/hydoct18/the-run" },
    { name: "Prize Pool (₹60K)", href: "/hydoct18/prize-details" },
    { name: "SDG 4 Focus", href: "/hydoct18/global-goal" },
    { name: "Runner Card Studio", href: "/hydoct18/social-card" },
    { name: "Results & Certificates", href: "/hydoct18/results" },
    { name: "Photo Gallery", href: "/hydoct18/gallery" },
    { name: "Runner Stories", href: "/hydoct18/runner-stories" },
    { name: "FAQs", href: "/hydoct18/faqs" },
  ];

  const isMasterLinkActive = (item: { href: string; key: string }) => {
    if (activePage && activePage === item.key) return true;
    if (item.href === "/") return pathname === "/";
    if (item.href === "/editions") {
      return (
        pathname === "/editions" ||
        pathname.startsWith("/editions/") ||
        isHydEdition ||
        isKochiEdition
      );
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 8px 30px rgba(13, 27, 42, 0.06)",
      }}
    >
      <style jsx global>{`
        .top-edition-ribbon {
          background: linear-gradient(90deg, #07111e 0%, #0d1b2a 55%, #162f4d 100%);
          color: #f8fafc;
          font-size: 11.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 24px;
        }
        .top-edition-ribbon-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .top-nav-link {
          text-decoration: none;
          color: #0f172a;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.65px;
          position: relative;
          padding: 8px 13px;
          border-radius: 999px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }
        .top-nav-link:hover {
          color: #c5192d !important;
          background-color: #fff1f2;
        }
        .top-nav-link.active {
          color: #ffffff !important;
          background-color: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.14);
        }

        .header-register-btn {
          background: linear-gradient(135deg, #c5192d 0%, #991b1b 100%) !important;
          color: #ffffff !important;
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(197, 25, 45, 0.28);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .header-register-btn span {
          color: #ffffff !important;
        }
        .header-register-btn:hover {
          background: linear-gradient(135deg, #a81324 0%, #7f1d1d 100%) !important;
          color: #ffffff !important;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(197, 25, 45, 0.38) !important;
        }

        .brand-logo-wrap {
          transition: transform 0.2s ease;
        }
        .brand-logo-wrap:hover {
          transform: scale(1.015);
        }

        .header-inner-row {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 24px;
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .header-brand-logo-img {
          height: 50px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
          display: block;
        }

        .desktop-menu-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 5px;
          border-radius: 999px;
        }

        @media (max-width: 1360px) {
          .desktop-menu-nav {
            gap: 2px !important;
          }
          .top-nav-link {
            font-size: 10.5px !important;
            padding: 7px 10px !important;
            letter-spacing: 0.35px !important;
          }
        }

        @media (max-width: 1150px) {
          .desktop-menu-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          .top-edition-ribbon {
            padding: 6px 14px !important;
            font-size: 10.5px !important;
          }
          .top-edition-ribbon-links {
            display: none !important;
          }
          .header-cta-desktop-wrap {
            display: none !important;
          }
          .header-inner-row {
            height: 66px !important;
            padding: 0 16px !important;
          }
          .header-brand-logo-img {
            height: 40px !important;
            max-width: 175px !important;
          }
          .header-foundation-pill {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Edition Trust & Status Ribbon */}
      <div className="top-edition-ribbon" role="region" aria-label="Official City Editions Status">
        <div className="top-edition-ribbon-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/hydoct18"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  background: "#10B981",
                  color: "#052E16",
                  fontSize: "9.5px",
                  fontWeight: 900,
                  padding: "2px 7px",
                  borderRadius: "999px",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                }}
              >
                ✓ EDITION 1 COMPLETED
              </span>
              <span>Hyderabad 2026 (18 Oct • ESCI Gachibowli • SDG 4)</span>
            </Link>

            <span style={{ color: "rgba(255,255,255,0.22)" }}>|</span>

            <Link
              href="/kochi2027"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                color: "#FDE047",
                fontWeight: 800,
              }}
            >
              <span
                style={{
                  background: "rgba(56, 189, 248, 0.2)",
                  border: "1px solid rgba(56, 189, 248, 0.5)",
                  color: "#7DD3FC",
                  fontSize: "9.5px",
                  fontWeight: 900,
                  padding: "1.5px 7px",
                  borderRadius: "999px",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                }}
              >
                NEXT HOST CITY
              </span>
              <span>Kochi, Kerala — Register Interest →</span>
            </Link>
          </div>

          <div
            className="top-edition-ribbon-links"
            style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "11px" }}
          >
            <Link href="/hydoct18/results" style={{ color: "#CBD5E1", textDecoration: "none", fontWeight: 700 }}>
              🏆 Hyd Results &amp; Certificates
            </Link>
            <Link href="/hydoct18/social-card" style={{ color: "#CBD5E1", textDecoration: "none", fontWeight: 700 }}>
              🪪 Runner Card Studio
            </Link>
            <Link href="/hydoct18/gallery" style={{ color: "#CBD5E1", textDecoration: "none", fontWeight: 700 }}>
              📸 Race Gallery
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Row */}
      <div className="header-inner-row">
        {/* Official FLEXATHON Horizontal Logo Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <Link
            href="/"
            aria-label="FLEXATHON — The Global Goals Run Home"
            className="brand-logo-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={ASSETS.brand.flexathonLogoTransparent}
              alt="FLEXATHON — The Global Goals Run"
              className="header-brand-logo-img"
            />
          </Link>

          <a
            href="https://flexonsports.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-foundation-pill"
            title="Organised by Flexon Sports Foundation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "8px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              textDecoration: "none",
            }}
          >
            <img
              src={ASSETS.brand.flexonSportsTransparent}
              alt="Flexon Sports Foundation"
              style={{ height: "22px", width: "auto", objectFit: "contain", display: "block" }}
            />
          </a>
        </div>

        {/* Desktop Master Navigation */}
        <nav aria-label="Primary Navigation" className="desktop-menu-nav">
          {masterNavItems.map((item) => {
            const isActive = isMasterLinkActive(item);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`top-nav-link ${isActive ? "active" : ""}`}
                style={{
                  fontWeight: isActive ? 900 : 800,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Header Action Button + Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div className="header-cta-desktop-wrap" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isHydEdition ? (
              <>
                <Link
                  href="/hydoct18/social-card"
                  style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  🪪 Runner Card
                </Link>
                <RegistrationClosedButton
                  size="sm"
                  showBadge={true}
                  badgeText="18 Oct 2026 • Concluded"
                  label="EVENT COMPLETED"
                />
              </>
            ) : (
              <>
                <Link
                  href="/hydoct18"
                  style={{
                    background: "#F8FAFC",
                    color: "#0F172A",
                    border: "1px solid #CBD5E1",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontSize: "11.5px",
                    fontWeight: 800,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  🏛️ Hyd ’26 Archive
                </Link>
                <Link href="/kochi2027" className="header-register-btn">
                  <span>KOCHI EDITION</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              minWidth: "44px",
              minHeight: "44px",
              fontSize: "22px",
              cursor: "pointer",
              color: "#0d1b2a",
              padding: "6px",
            }}
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Hyderabad 2026 Edition Sub-Navigation Bar (rendered on /hydoct18/* routes) */}
      {isHydEdition && (
        <div
          aria-label="Hyderabad 2026 Edition Navigation"
          style={{
            background: "#091526",
            color: "#FFFFFF",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "8px 20px",
          }}
        >
          <div
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(52, 211, 153, 0.45)",
                  color: "#A7F3D0",
                  fontSize: "11px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  padding: "3px 10px",
                  borderRadius: "999px",
                }}
              >
                ✓ Edition 1 Archive • Hyderabad (18 Oct 2026)
              </span>
            </div>

            <nav aria-label="Hyderabad Edition Subpages" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  listStyle: "none",
                  margin: 0,
                  padding: "2px 0",
                  whiteSpace: "nowrap",
                }}
              >
                {hydSubNavLinks.map((sub) => {
                  const active = pathname === sub.href;
                  return (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        aria-current={active ? "page" : undefined}
                        style={{
                          fontSize: "12px",
                          fontWeight: active ? 800 : 600,
                          color: active ? "#FFFFFF" : "#CBD5E1",
                          background: active ? "#C5192D" : "rgba(255,255,255,0.04)",
                          padding: "5px 11px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                          display: "inline-block",
                        }}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/kochi2027"
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#38bdf8",
                      textDecoration: "none",
                      paddingLeft: "10px",
                      borderLeft: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    Next: Kochi →
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-wrap"
          role="dialog"
          aria-label="Mobile Navigation Menu"
          style={{
            position: "fixed",
            top: "96px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E2E8F0",
            padding: "20px 20px 36px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflowY: "auto",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {masterNavItems.map((item) => {
              const isActive = isMasterLinkActive(item);
              return (
                <Link
                  key={item.key}
                  onClick={() => setMobileMenuOpen(false)}
                  href={item.href}
                  className="mobile-nav-link"
                  style={{
                    textDecoration: "none",
                    minHeight: "46px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: isActive ? 800 : 700,
                    color: isActive ? "#C5192D" : "#1e293b",
                    backgroundColor: isActive ? "#FFF1F2" : "transparent",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        backgroundColor: "#C5192D",
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 900,
                        padding: "2px 8px",
                        borderRadius: "10px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ACTIVE
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Edition Switcher inside Mobile Drawer */}
          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "8px",
                padding: "0 4px",
              }}
            >
              Official City Editions
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <Link
                href="/hydoct18"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: isHydEdition ? "#FFF1F2" : "#F8FAFC",
                  border: isHydEdition ? "1px solid #FECDD3" : "1px solid #E2E8F0",
                  color: "#0d1b2a",
                  fontSize: "12.5px",
                  fontWeight: 800,
                }}
              >
                <div>Hyderabad 2026</div>
                <div style={{ fontSize: "10px", color: "#059669", fontWeight: 800 }}>
                  ✓ Completed Archive →
                </div>
              </Link>
              <Link
                href="/kochi2027"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: isKochiEdition ? "#FFF1F2" : "#F8FAFC",
                  border: isKochiEdition ? "1px solid #FECDD3" : "1px solid #E2E8F0",
                  color: "#0d1b2a",
                  fontSize: "12.5px",
                  fontWeight: 800,
                }}
              >
                <div>Kochi Edition</div>
                <div style={{ fontSize: "10px", color: "#0284C7", fontWeight: 800 }}>
                  Next Host City →
                </div>
              </Link>
            </div>
          </div>

          <div
            style={{
              paddingTop: "18px",
              borderTop: "1px solid #E2E8F0",
              marginTop: "16px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <Link
              href="/hydoct18"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                padding: "12px 14px",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "12.5px",
                textDecoration: "none",
              }}
            >
              Hyd ’26 Archive
            </Link>
            <Link
              href="/kochi2027"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#C5192D",
                color: "#FFFFFF",
                padding: "12px 14px",
                borderRadius: "8px",
                fontWeight: 900,
                fontSize: "12.5px",
                textDecoration: "none",
              }}
            >
              Kochi Edition →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
