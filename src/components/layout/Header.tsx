"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHydEdition = pathname === "/hydoct18" || pathname.startsWith("/hydoct18/");
  const isKochiEdition = pathname === "/kochi2027" || pathname.startsWith("/kochi2027/");

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
            onClick={() => setMobileMenuOpen(true)}
            className="mobile-menu-toggle"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              background: "#0F172A",
              border: "1px solid #1E293B",
              borderRadius: "8px",
              minWidth: "44px",
              minHeight: "44px",
              fontSize: "22px",
              cursor: "pointer",
              color: "#FFFFFF",
              padding: "6px",
              boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
            }}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            ☰
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

      {/* Bulletproof Mobile Navigation Drawer via React Portal directly into document.body */}
      {mounted && mobileMenuOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(7, 19, 36, 0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 999999,
            display: "flex",
            justifyContent: "flex-end",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "100%",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.3)",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Top Bar inside Drawer */}
            <div
              style={{
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #E2E8F0",
                background: "#071324",
                color: "#FFFFFF",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={ASSETS.brand.flexathonLogoTransparent}
                  alt="FLEXATHON"
                  style={{ height: "34px", width: "auto", filter: "brightness(0) invert(1)" }}
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.16)",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div style={{ padding: "20px 18px 48px", flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* 1. Main Navigation Links */}
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 900,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "1.2px",
                    marginBottom: "8px",
                    padding: "0 6px",
                  }}
                >
                  Explore FLEXATHON
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  {masterNavItems.map((item) => {
                    const isActive = isMasterLinkActive(item);
                    return (
                      <Link
                        key={item.key}
                        onClick={() => setMobileMenuOpen(false)}
                        href={item.href}
                        style={{
                          textDecoration: "none",
                          minHeight: "46px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 14px",
                          borderRadius: "10px",
                          fontSize: "15px",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: isActive ? 900 : 800,
                          letterSpacing: "0.6px",
                          textTransform: "uppercase",
                          color: isActive ? "#C5192D" : "#0F172A",
                          backgroundColor: isActive ? "#FFF1F2" : "#F8FAFC",
                          border: isActive ? "1px solid #FECDD3" : "1px solid #F1F5F9",
                        }}
                      >
                        <span>{item.label}</span>
                        {isActive ? (
                          <span
                            style={{
                              backgroundColor: "#C5192D",
                              color: "#FFFFFF",
                              fontSize: "10px",
                              fontWeight: 900,
                              padding: "2px 8px",
                              borderRadius: "10px",
                            }}
                          >
                            CURRENT
                          </span>
                        ) : (
                          <span style={{ color: "#94A3B8", fontSize: "14px" }}>›</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 2. Hyderabad 2026 Archive & Official Winners Section */}
              <div
                style={{
                  background: "linear-gradient(135deg, #071324 0%, #0F243C 100%)",
                  borderRadius: "14px",
                  padding: "16px",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span
                    style={{
                      background: "#10B981",
                      color: "#052E16",
                      fontSize: "9.5px",
                      fontWeight: 900,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    ✓ Edition 01 Completed
                  </span>
                  <span style={{ fontSize: "11px", color: "#CBD5E1" }}>18 Oct 2026</span>
                </div>

                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    color: "#FFFFFF",
                  }}
                >
                  Hyderabad 2026 Archive
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Link
                    href="/hydoct18#winners-podium"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(245, 158, 11, 0.2)",
                      border: "1px solid rgba(245, 158, 11, 0.5)",
                      color: "#FCD34D",
                      fontSize: "13px",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>🏆 Official Winners &amp; Podium</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/hydoct18/results"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>🏅 Results &amp; Finisher E-Certs</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/hydoct18/gallery"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>📸 All 121 Race Photos</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/hydoct18/prize-details"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>💰 ₹60,000 Prize Pool Structure</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/hydoct18/social-card"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>🪪 Runner Card Studio</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 3. Next City - Kochi 2027 */}
              <div
                style={{
                  background: "#F0F9FF",
                  border: "1.5px solid #BAE6FD",
                  borderRadius: "14px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span
                    style={{
                      background: "#0284C7",
                      color: "#FFFFFF",
                      fontSize: "9px",
                      fontWeight: 900,
                      padding: "2px 7px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                    }}
                  >
                    NEXT HOST CITY
                  </span>
                </div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.3rem", fontWeight: 900, color: "#0c1e33", textTransform: "uppercase" }}>
                  FLEXATHON Kochi Edition
                </div>
                <p style={{ fontSize: "12.5px", color: "#475569", margin: "4px 0 12px", lineHeight: 1.5 }}>
                  The national movement arrives next in Kerala. Pre-register early to secure priority bib access.
                </p>
                <Link
                  href="/kochi2027"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#0284C7",
                    color: "#FFFFFF",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    letterSpacing: "0.6px",
                  }}
                >
                  Register Interest for Kochi →
                </Link>
              </div>

              {/* 4. Bottom Action Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "auto" }}>
                <Link
                  href="/hydoct18/results"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "#0F172A",
                    color: "#FFFFFF",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  🏆 Hyd Results
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "#C5192D",
                    color: "#FFFFFF",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    letterSpacing: "0.5px",
                  }}
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
