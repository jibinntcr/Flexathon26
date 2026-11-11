'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OFFICIAL_SDGS } from "@/lib/sdgs";
import { getPublishedEditions } from "@/lib/editions";
import { ASSETS } from "@/lib/assets";

const HERO_SLIDES = [
    {
        id: "slide-hyderabad-course",
        src: ASSETS.editions.oct18CoursePack,
        objectPosition: "center 30%",
        badge: "EDITION 01 • HYDERABAD (COMPLETED)",
        title: "FLEXATHON 2026 HYDERABAD",
        dateLocation: "Sunday, 18 October 2026 • ESCI Campus, Gachibowli",
        tagline: "India’s purpose-driven city running movement uniting amateur runners, marathoners, and families through sport and the 17 UN Global Goals.",
        ctaText: "Explore Hyderabad Archive →",
        ctaHref: "/hydoct18",
        secondaryCtaText: "Runner Card Studio",
        secondaryCtaHref: "/hydoct18/social-card",
        badges: [
            { primary: "10 KM", secondary: "RFID Chip Timed Run" },
            { primary: "5 KM", secondary: "RFID Chip Timed Run" },
            { primary: "3 KM", secondary: "Community Fun Run" },
            { primary: "₹60,000", secondary: "Equal Podium Prize Pool" },
        ],
    },
    {
        id: "slide-warmup-crowd",
        src: ASSETS.editions.oct18WarmupCrowd,
        objectPosition: "center 38%",
        badge: "PRE-RACE ASSEMBLY • GACHIBOWLI SKYLINE",
        title: "UNITED FOR QUALITY EDUCATION",
        dateLocation: "Spotlighting UN Sustainable Development Goal 4",
        tagline: "Hundreds of athletes, students, and corporate teams assembled at sunrise in official maroon jerseys, championing inclusive education.",
        ctaText: "Explore SDG 4 Impact →",
        ctaHref: "/hydoct18/global-goal",
        secondaryCtaText: "All 17 Global Goals",
        secondaryCtaHref: "/global-goals",
        badges: [
            { primary: "SDG 4", secondary: "Quality Education Focus" },
            { primary: "17 GOALS", secondary: "UN 2030 Shared Agenda" },
            { primary: "5:00 AM", secondary: "Sunrise Guided Mobility" },
            { primary: "ESCI", secondary: "Campus Gachibowli Venue" },
        ],
    },
    {
        id: "slide-podium-winners",
        src: ASSETS.editions.oct18WomensPodium,
        objectPosition: "center 22%",
        badge: "₹60,000 PRIZE POOL • MAIN STAGE",
        title: "EQUAL PRIZES. EQUAL EFFORT.",
        dateLocation: "Equal Cash Prizes Across Men & Women Open Categories",
        tagline: "Flexon Sports Foundation proudly awarded equal prize money across Men and Women Open categories in both 10K and 5K timed runs.",
        ctaText: "View Official Results & Prizes →",
        ctaHref: "/hydoct18/results",
        secondaryCtaText: "Prize Pool Breakdown",
        secondaryCtaHref: "/hydoct18/prize-details",
        badges: [
            { primary: "₹10,000", secondary: "10K 1st Place Men & Women" },
            { primary: "₹6,000", secondary: "10K 2nd Place Men & Women" },
            { primary: "₹4,000", secondary: "10K 3rd Place Men & Women" },
            { primary: "₹20,000", secondary: "5K Timed Prize Pool" },
        ],
    },
    {
        id: "slide-kochi-expansion",
        src: ASSETS.editions.oct18FinisherMedals,
        objectPosition: "center 26%",
        badge: "NEXT HOST CITY • EDITION 02",
        title: "THE MOVEMENT HEADS TO KOCHI",
        dateLocation: "Kochi, Kerala • Coming Soon",
        tagline: "Building on our Hyderabad milestone, the movement heads next to Kochi. Pre-register your running club, college, or corporate team today.",
        ctaText: "Register Interest for Kochi →",
        ctaHref: "/kochi2027",
        secondaryCtaText: "Partner With Us",
        secondaryCtaHref: "/partners",
        badges: [
            { primary: "KOCHI", secondary: "Next Announced Host City" },
            { primary: "KERALA", secondary: "God’s Own Country" },
            { primary: "EDITION 02", secondary: "Early Interest Open" },
            { primary: "FREE", secondary: "Pre-Registration Open" },
        ],
    },
];

export default function MasterHomePage() {
    const editions = getPublishedEditions();
    const hydEdition = editions.find((e) => e.slug === "hydoct18") || editions[0];
    const [selectedGoalId, setSelectedGoalId] = useState<number>(4);
    const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
    const [isSliderPaused, setIsSliderPaused] = useState<boolean>(false);

    useEffect(() => {
        if (isSliderPaused) return;
        const timer = setInterval(() => {
            setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isSliderPaused]);

    const currentSlide = HERO_SLIDES[activeHeroSlide];
    const activeGoal = OFFICIAL_SDGS.find((g) => g.id === selectedGoalId) || OFFICIAL_SDGS[3];

    return (
        <div style={{ background: "#F8FAFC", color: "#0F172A", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="home" />

            <style jsx>{`
                .slider-container {
                    position: relative;
                    max-width: 1400px;
                    margin: 16px auto 28px;
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.14);
                    background: #06101E;
                    height: clamp(440px, 48vw, 560px);
                }
                .slider-side-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 25;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(6, 16, 30, 0.65);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.28);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 1.5rem;
                    line-height: 1;
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
                }
                .slider-side-arrow:hover {
                    background: #C5192D;
                    border-color: #FECDD3;
                    transform: translateY(-50%) scale(1.08);
                }
                .slider-side-arrow.prev {
                    left: 20px;
                }
                .slider-side-arrow.next {
                    right: 20px;
                }
                .slider-bottom-bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 20;
                    padding: clamp(20px, 3.5vw, 32px) clamp(24px, 4vw, 44px);
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 24px;
                }
                .category-tile {
                    background: #FFFFFF;
                    border: 1px solid #E2E8F0;
                    border-radius: 18px;
                    padding: 24px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                    text-decoration: none;
                    color: inherit;
                    display: block;
                }
                .category-tile:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
                    border-color: #CBD5E1;
                }
                .edition-card {
                    background: #FFFFFF;
                    border: 1px solid #E2E8F0;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .edition-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
                }
                @media (max-width: 900px) {
                    .slider-container {
                        margin: 12px;
                        height: 500px;
                        border-radius: 16px;
                    }
                    .slider-side-arrow {
                        display: none !important;
                    }
                    .slider-bottom-bar {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 16px !important;
                    }
                }
                @media (max-width: 600px) {
                    .slider-container {
                        margin: 10px 8px;
                        height: 500px;
                        border-radius: 16px;
                    }
                    .slider-bottom-bar {
                        padding: 14px 14px 16px !important;
                        gap: 10px !important;
                    }
                    .slider-distance-chips {
                        display: none !important;
                    }
                    .slider-title {
                        font-size: 1.55rem !important;
                        margin-bottom: 6px !important;
                    }
                    .slider-cta-wrap {
                        flex-direction: row !important;
                        flex-wrap: nowrap !important;
                        align-items: center !important;
                        width: 100% !important;
                        gap: 8px !important;
                    }
                    .slider-cta-wrap a {
                        flex: 1 1 50% !important;
                        text-align: center !important;
                        justify-content: center !important;
                        padding: 10px 10px !important;
                        font-size: 0.76rem !important;
                        white-space: nowrap !important;
                    }
                }
            `}</style>

            <main>
                {/* =================================================================
                    HERO BANNER SLIDER (ALIGNED TO IFINISH.IN CLEAN BILLBOARD STYLE)
                   ================================================================= */}
                <section style={{ padding: "0 16px" }}>
                    <div
                        className="slider-container"
                        onMouseEnter={() => setIsSliderPaused(true)}
                        onMouseLeave={() => setIsSliderPaused(false)}
                    >
                        {/* Background Crossfading Images */}
                        {HERO_SLIDES.map((slide, idx) => {
                            const isActive = idx === activeHeroSlide;
                            return (
                                <div
                                    key={slide.id}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        opacity: isActive ? 1 : 0,
                                        transition: "opacity 0.8s ease-in-out",
                                        pointerEvents: "none",
                                    }}
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: slide.objectPosition || "center 38%",
                                            filter: "brightness(1.02) contrast(1.02)",
                                        }}
                                    />
                                    {/* Bottom Scrim Only - Ensures 100% natural, bright daylight visibility across 70% of the photo */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(to top, rgba(6, 16, 30, 0.94) 0%, rgba(6, 16, 30, 0.68) 18%, rgba(6, 16, 30, 0.15) 34%, transparent 50%)",
                                        }}
                                    />
                                </div>
                            );
                        })}

                        {/* Side Floating Navigation Arrows (iFinish style) */}
                        <button
                            type="button"
                            onClick={() =>
                                setActiveHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
                            }
                            aria-label="Previous slide"
                            className="slider-side-arrow prev"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                            aria-label="Next slide"
                            className="slider-side-arrow next"
                        >
                            ›
                        </button>

                        {/* Bottom Anchored Caption Bar - Keeps photos unobstructed */}
                        <div className="slider-bottom-bar">
                            {/* Left Column: Event Title, Details & Badges */}
                            <div style={{ maxWidth: "800px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "8px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            background: "#C5192D",
                                            color: "#FFFFFF",
                                            fontSize: "0.72rem",
                                            fontWeight: 800,
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase",
                                            padding: "4px 12px",
                                            borderRadius: "999px",
                                            boxShadow: "0 2px 8px rgba(197, 25, 45, 0.4)",
                                        }}
                                    >
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />
                                        <span>{currentSlide.badge}</span>
                                    </div>

                                    <div
                                        style={{
                                            color: "#FDE047",
                                            fontSize: "0.82rem",
                                            fontWeight: 700,
                                            textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
                                        }}
                                    >
                                        {currentSlide.dateLocation}
                                    </div>
                                </div>

                                <h1
                                    className="font-condensed slider-title"
                                    style={{
                                        fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                                        fontWeight: 900,
                                        lineHeight: 1.05,
                                        letterSpacing: "-0.01em",
                                        textTransform: "uppercase",
                                        color: "#FFFFFF",
                                        margin: "0 0 10px 0",
                                        textShadow: "0 2px 14px rgba(0, 0, 0, 0.7)",
                                    }}
                                >
                                    {currentSlide.title}
                                </h1>

                                {/* Distance & Highlight Chips */}
                                <div className="slider-distance-chips" style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                                    {currentSlide.badges.map((b, bIdx) => (
                                        <span
                                            key={bIdx}
                                            style={{
                                                background: "rgba(15, 23, 42, 0.75)",
                                                backdropFilter: "blur(8px)",
                                                WebkitBackdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255, 255, 255, 0.22)",
                                                color: "#FFFFFF",
                                                fontSize: "0.76rem",
                                                fontWeight: 700,
                                                padding: "4px 12px",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <strong style={{ color: "#FBBF24", marginRight: "5px" }}>{b.primary}</strong>
                                            <span style={{ color: "#E2E8F0" }}>{b.secondary}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: CTA Buttons & Indicator Dots */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: "14px",
                                    flexShrink: 0,
                                }}
                            >
                                <div className="slider-cta-wrap" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                                    <Link
                                        href={currentSlide.ctaHref}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            background: "linear-gradient(135deg, #C5192D 0%, #991B1B 100%)",
                                            color: "#FFFFFF",
                                            padding: "12px 24px",
                                            borderRadius: "999px",
                                            fontWeight: 800,
                                            fontSize: "0.85rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.04em",
                                            textDecoration: "none",
                                            boxShadow: "0 6px 18px rgba(197, 25, 45, 0.45)",
                                        }}
                                    >
                                        <span>{currentSlide.ctaText}</span>
                                    </Link>

                                    <Link
                                        href={currentSlide.secondaryCtaHref}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            background: "rgba(15, 23, 42, 0.75)",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255, 255, 255, 0.28)",
                                            color: "#FFFFFF",
                                            padding: "12px 20px",
                                            borderRadius: "999px",
                                            fontWeight: 700,
                                            fontSize: "0.85rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <span>{currentSlide.secondaryCtaText}</span>
                                    </Link>
                                </div>

                                {/* Slide dots and counter */}
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#CBD5E1" }}>
                                        {activeHeroSlide + 1} / {HERO_SLIDES.length}
                                    </span>
                                    <div style={{ display: "flex", gap: "6px" }}>
                                        {HERO_SLIDES.map((_, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActiveHeroSlide(idx)}
                                                aria-label={`Go to slide ${idx + 1}`}
                                                style={{
                                                    width: idx === activeHeroSlide ? "22px" : "7px",
                                                    height: "7px",
                                                    borderRadius: "999px",
                                                    background: idx === activeHeroSlide ? "#C5192D" : "rgba(255, 255, 255, 0.45)",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    padding: 0,
                                                    transition: "all 0.25s ease",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    SECTION 2: CLEAN EVENT CATEGORIES & MOVEMENT HUBS (IFINISH STYLE)
                   ================================================================= */}
                <section style={{ padding: "48px 20px 56px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ marginBottom: "32px", textAlign: "left" }}>
                            <span
                                style={{
                                    fontSize: "0.74rem",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "#C5192D",
                                }}
                            >
                                Purpose-Driven Distances &amp; City Hubs
                            </span>
                            <h2
                                className="font-condensed"
                                style={{
                                    fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    color: "#0F172A",
                                    margin: "4px 0 0 0",
                                }}
                            >
                                Event Categories &amp; Highlights
                            </h2>
                        </div>

                        {/* 4 Clean Category Tiles */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                            {/* 10K Timed Run */}
                            <Link
                                href="/hydoct18/the-run"
                                className="category-tile"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "20px",
                                    padding: "28px 24px",
                                    textDecoration: "none",
                                    color: "#0F172A",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "14px",
                                            background: "#EFF6FF",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.6rem",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        🏃
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        RFID Chip Timed
                                    </div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0", textDecoration: "none" }}>
                                        10K Timed Run
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 16px 0", textDecoration: "none" }}>
                                        Flagship endurance challenge for seasoned marathoners. Eligible for the ₹40,000 category prize pool.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* 5K Timed Run */}
                            <Link
                                href="/hydoct18/the-run"
                                className="category-tile"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "20px",
                                    padding: "28px 24px",
                                    textDecoration: "none",
                                    color: "#0F172A",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "14px",
                                            background: "#ECFDF5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.6rem",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        ⚡
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        RFID Chip Timed
                                    </div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0", textDecoration: "none" }}>
                                        5K Timed Run
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 16px 0", textDecoration: "none" }}>
                                        The ideal gateway distance with official RFID chip timing and eligibility for the ₹20,000 prize pool.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* 3K Fun Run */}
                            <Link
                                href="/hydoct18/the-run"
                                className="category-tile"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "20px",
                                    padding: "28px 24px",
                                    textDecoration: "none",
                                    color: "#0F172A",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "14px",
                                            background: "#FFFBEB",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.6rem",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        👟
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        Community Celebration
                                    </div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0", textDecoration: "none" }}>
                                        3K Fun Run
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 16px 0", textDecoration: "none" }}>
                                        Non-timed celebration open to families, students, and beginners. Includes finisher medal and digital certificate.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* Hyderabad 2026 Archive */}
                            <Link
                                href="/hydoct18"
                                className="category-tile"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1.5px solid #FECDD3",
                                    borderRadius: "20px",
                                    padding: "28px 24px",
                                    textDecoration: "none",
                                    color: "#0F172A",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "14px",
                                            background: "#FFF1F2",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.6rem",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        🏛️
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#C5192D", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        Concluded Flagship
                                    </div>
                                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px 0", textDecoration: "none" }}>
                                        Hyderabad ’26 Hub
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 16px 0", textDecoration: "none" }}>
                                        18 Oct 2026 at ESCI Gachibowli. View race highlights, podium results, photo gallery, and runner cards.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Open Edition Hub</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    SECTION 3: FEATURED CITY EDITIONS (HYDERABAD ’26 & KOCHI)
                   ================================================================= */}
                <section style={{ padding: "54px 20px", background: "#F8FAFC" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
                            <div>
                                <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                    Multi-City Footprint
                                </span>
                                <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 0 0" }}>
                                    Featured City Editions
                                </h2>
                            </div>
                            <Link
                                href="/editions"
                                style={{
                                    fontSize: "0.84rem",
                                    fontWeight: 800,
                                    color: "#0F172A",
                                    textDecoration: "none",
                                    padding: "8px 18px",
                                    borderRadius: "999px",
                                    border: "1px solid #CBD5E1",
                                    background: "#FFFFFF",
                                }}
                            >
                                All City Editions →
                            </Link>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "28px" }}>
                            {/* Card 1: Hyderabad 2026 (Completed) */}
                            <div className="edition-card">
                                <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                                    <img
                                        src={ASSETS.editions.oct18CoursePack}
                                        alt="FLEXATHON 2026 Hyderabad Course"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(6, 16, 30, 0.8) 0%, transparent 60%)",
                                        }}
                                    />
                                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                                        <span style={{ background: "#10B981", color: "#052E16", fontSize: "0.7rem", fontWeight: 900, padding: "4px 10px", borderRadius: "999px" }}>
                                            ✓ EDITION 01 COMPLETED
                                        </span>
                                    </div>
                                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                                        <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: "1.3rem" }}>FLEXATHON 2026 Hyderabad</div>
                                        <div style={{ color: "#E2E8F0", fontSize: "0.8rem" }}>18 October 2026 • ESCI Campus, Gachibowli</div>
                                    </div>
                                </div>
                                <div style={{ padding: "24px" }}>
                                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 20px 0" }}>
                                        Our inaugural flagship edition united amateur runners, families, and corporate athletes at ESCI Gachibowli in support of UN SDG 4: Quality Education with a ₹60,000 equal podium prize pool.
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <Link
                                            href="/hydoct18"
                                            style={{
                                                background: "#0F172A",
                                                color: "#FFFFFF",
                                                padding: "10px 20px",
                                                borderRadius: "999px",
                                                fontWeight: 800,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            View Archive Hub →
                                        </Link>
                                        <Link
                                            href="/hydoct18/results"
                                            style={{
                                                background: "#F1F5F9",
                                                color: "#0F172A",
                                                padding: "10px 18px",
                                                borderRadius: "999px",
                                                fontWeight: 700,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Race Results
                                        </Link>
                                        <Link
                                            href="/hydoct18/social-card"
                                            style={{
                                                background: "#FFF1F2",
                                                color: "#C5192D",
                                                padding: "10px 18px",
                                                borderRadius: "999px",
                                                fontWeight: 700,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Runner Card
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Kochi Edition (Coming Soon) */}
                            <div className="edition-card">
                                <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                                    <img
                                        src={ASSETS.hero.globeVisual}
                                        alt="FLEXATHON Kochi Kerala"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(6, 16, 30, 0.8) 0%, transparent 60%)",
                                        }}
                                    />
                                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                                        <span style={{ background: "#38BDF8", color: "#082F49", fontSize: "0.7rem", fontWeight: 900, padding: "4px 10px", borderRadius: "999px" }}>
                                            🌊 EDITION 02 • COMING SOON
                                        </span>
                                    </div>
                                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                                        <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: "1.3rem" }}>FLEXATHON Kochi Edition</div>
                                        <div style={{ color: "#E2E8F0", fontSize: "0.8rem" }}>Kochi, Kerala • Date &amp; Venue TBA</div>
                                    </div>
                                </div>
                                <div style={{ padding: "24px" }}>
                                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 20px 0" }}>
                                        The running movement expands to Kerala. Official date, venue, route maps, and featured Global Goal will be published upon formal civic confirmation. Pre-register to be notified first.
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <Link
                                            href="/kochi2027"
                                            style={{
                                                background: "#2563EB",
                                                color: "#FFFFFF",
                                                padding: "10px 20px",
                                                borderRadius: "999px",
                                                fontWeight: 800,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Register Pre-Interest →
                                        </Link>
                                        <Link
                                            href="/partners"
                                            style={{
                                                background: "#F1F5F9",
                                                color: "#0F172A",
                                                padding: "10px 18px",
                                                borderRadius: "999px",
                                                fontWeight: 700,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Partner Inquiries
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    SECTION 4: 17 UN GLOBAL GOALS FRAMEWORK (CLEAN & BREATHABLE)
                   ================================================================= */}
                <section style={{ padding: "48px 20px 64px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 32px" }}>
                            <span
                                style={{
                                    fontSize: "0.74rem",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.08em",
                                    color: "#C5192D",
                                }}
                            >
                                The Shared Framework
                            </span>
                            <h2
                                className="font-condensed"
                                style={{
                                    fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    color: "#0F172A",
                                    margin: "4px 0 10px 0",
                                }}
                            >
                                17 Sustainable Development Goals
                            </h2>
                            <p style={{ fontSize: "0.94rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                                Each FLEXATHON edition spotlights a United Nations Global Goal, uniting athletic perseverance with community action.
                            </p>
                        </div>

                        {/* Interactive Grid of Goals */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(68px, 1fr))",
                                gap: "10px",
                                marginBottom: "24px",
                            }}
                        >
                            {OFFICIAL_SDGS.map((goal) => {
                                const isSelected = goal.id === selectedGoalId;
                                return (
                                    <button
                                        key={goal.id}
                                        type="button"
                                        onClick={() => setSelectedGoalId(goal.id)}
                                        aria-label={`Goal ${goal.id}: ${goal.title}`}
                                        style={{
                                            padding: "6px",
                                            borderRadius: "14px",
                                            border: isSelected ? `3px solid ${goal.color}` : "1px solid #E2E8F0",
                                            background: "#FFFFFF",
                                            cursor: "pointer",
                                            transform: isSelected ? "translateY(-3px)" : "none",
                                            boxShadow: isSelected
                                                ? "0 8px 18px rgba(15, 23, 42, 0.12)"
                                                : "0 2px 4px rgba(15, 23, 42, 0.04)",
                                            transition: "all 0.18s ease",
                                        }}
                                    >
                                        <img
                                            src={goal.logo}
                                            alt={`SDG ${goal.id}`}
                                            style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain", borderRadius: "8px", display: "block" }}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selected Goal Spotlight Box */}
                        <div
                            style={{
                                background: "#F8FAFC",
                                border: "1px solid #E2E8F0",
                                borderLeft: `6px solid ${activeGoal.color}`,
                                borderRadius: "20px",
                                padding: "26px",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                                gap: "24px",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                                <img
                                    src={activeGoal.logo}
                                    alt={`Goal ${activeGoal.id}`}
                                    style={{ width: "80px", height: "80px", borderRadius: "14px", objectFit: "contain", flexShrink: 0 }}
                                />
                                <div>
                                    <span style={{ fontSize: "0.72rem", fontWeight: 900, color: activeGoal.color, textTransform: "uppercase" }}>
                                        UN Sustainable Development Goal {activeGoal.id}
                                    </span>
                                    <h3 style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0F172A", margin: "2px 0 6px 0" }}>
                                        {activeGoal.title}
                                    </h3>
                                    <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.55, margin: 0 }}>
                                        {activeGoal.description}
                                    </p>
                                </div>
                            </div>

                            <div style={{ background: "#FFFFFF", borderRadius: "14px", padding: "18px 20px", border: "1px solid #E2E8F0" }}>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>
                                    🏃 Connection to Sport &amp; Community:
                                </div>
                                <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 10px 0" }}>
                                    {activeGoal.sportConnection} {activeGoal.communityAction}
                                </p>
                                {activeGoal.id === 4 ? (
                                    <Link
                                        href="/hydoct18/global-goal"
                                        style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none" }}
                                    >
                                        ✓ Spotlighted in Hyderabad 2026 — View Impact →
                                    </Link>
                                ) : (
                                    <Link
                                        href="/global-goals"
                                        style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", textDecoration: "none" }}
                                    >
                                        Explore All 17 Goals →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer showPartnerStrip={true} />
        </div>
    );
}
