'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnerStrip from "@/components/layout/PartnerStrip";
import { OFFICIAL_SDGS } from "@/lib/sdgs";
import { ASSETS } from "@/lib/assets";
import { SITE_CONFIG } from "@/lib/siteConfig";

const HERO_SLIDES = [
    {
        id: "slide-hyderabad-course",
        src: ASSETS.editions.oct18CoursePack,
        objectPosition: "center 30%",
        badge: "EDITION 01 • HYDERABAD (COMPLETED)",
        title: "FLEXATHON 2026 HYDERABAD",
        dateLocation: "Sunday, 18 October 2026 • ESCI Campus, Gachibowli",
        tagline: "India’s purpose-driven city running movement uniting amateur runners, marathoners, and families through sport and the 17 UN Global Goals.",
        ctaText: "Explore Flagship Archive →",
        ctaHref: "/hydoct18",
        secondaryCtaText: "Official Results",
        secondaryCtaHref: "/hydoct18/results",
        badges: [
            { primary: "10 KM", secondary: "RFID Chip Timed Run" },
            { primary: "5 KM", secondary: "RFID Chip Timed Run" },
            { primary: "3 KM", secondary: "Community Fun Run" },
            { primary: "₹60,000", secondary: "Equal Podium Prize Pool" },
        ],
    },
    {
        id: "slide-kochi-expansion",
        src: ASSETS.editions.oct18FinisherMedals,
        objectPosition: "center 26%",
        badge: "NEXT HOST CITY • EDITION 02",
        title: "THE MOVEMENT HEADS TO KOCHI",
        dateLocation: "Kochi, Kerala • Coming Soon",
        tagline: "Building on our Hyderabad milestone, the movement heads next to Kochi. Receive verified updates as soon as the date and course are announced.",
        ctaText: "Get Kochi Updates →",
        ctaHref: "/kochi2027",
        secondaryCtaText: "Host City Inquiry",
        secondaryCtaHref: "/contact?category=Host+City+Proposal",
        badges: [
            { primary: "KOCHI", secondary: "Next Host City" },
            { primary: "KERALA", secondary: "God’s Own Country" },
            { primary: "EDITION 02", secondary: "Coming Soon" },
            { primary: "COMMUNITY", secondary: "Interest Open" },
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
        secondaryCtaText: "Podium Champions",
        secondaryCtaHref: "/hydoct18#winners-podium",
        badges: [
            { primary: "₹10,000", secondary: "10K 1st Place Men & Women" },
            { primary: "₹6,000", secondary: "10K 2nd Place Men & Women" },
            { primary: "₹4,000", secondary: "10K 3rd Place Men & Women" },
            { primary: "₹20,000", secondary: "5K Timed Prize Pool" },
        ],
    },
];

export default function MasterHomePage() {
    const [selectedGoalId, setSelectedGoalId] = useState<number>(4);
    const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
    const [isSliderPaused, setIsSliderPaused] = useState<boolean>(false);

    // Fast Kochi Update Signup Form state
    const [kochiEmail, setKochiEmail] = useState('');
    const [kochiPhone, setKochiPhone] = useState('');
    const [kochiSubmitting, setKochiSubmitting] = useState(false);
    const [kochiStatus, setKochiStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
        type: 'idle',
        message: '',
    });

    useEffect(() => {
        if (isSliderPaused) return;
        const timer = setInterval(() => {
            setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isSliderPaused]);

    const currentSlide = HERO_SLIDES[activeHeroSlide];
    const activeGoal = OFFICIAL_SDGS.find((g) => g.id === selectedGoalId) || OFFICIAL_SDGS[3];

    const handleKochiSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!kochiEmail && !kochiPhone) {
            setKochiStatus({ type: 'error', message: 'Please enter your email or WhatsApp number.' });
            return;
        }
        setKochiSubmitting(true);
        setKochiStatus({ type: 'idle', message: '' });
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Kochi Updates Subscriber',
                    email: kochiEmail || 'updates@flexathonrun.org',
                    phone: kochiPhone || '',
                    edition: 'kochi2027',
                    category: 'Kochi Edition Interest',
                    city: 'Kochi',
                    subject: 'Kochi Edition Update Signup',
                    message: `Interested in Kochi Edition updates. Contact: ${kochiEmail || ''} / ${kochiPhone || ''}`,
                    consent: true,
                }),
            });
            if (res.ok) {
                setKochiStatus({
                    type: 'success',
                    message: 'Thank you! You will be notified directly when the official Kochi date and venue are published.',
                });
                setKochiEmail('');
                setKochiPhone('');
            } else {
                setKochiStatus({ type: 'error', message: 'Could not record update request. Please try again.' });
            }
        } catch {
            setKochiStatus({ type: 'error', message: 'Network error. Please try again or message our WhatsApp helpdesk.' });
        } finally {
            setKochiSubmitting(false);
        }
    };

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
                    1 & 2. MOVEMENT-LED HERO BILLBOARD & PHOTO SHOWCASE
                   ================================================================= */}
                <section style={{ padding: "0 16px", marginTop: "12px" }}>
                    {/* Movement Proposition Bar Above Slider */}
                    <div style={{ maxWidth: "1400px", margin: "0 auto 12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    background: "#C5192D",
                                    color: "#FFFFFF",
                                    fontSize: "0.74rem",
                                    fontWeight: 900,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                }}
                            >
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />
                                The Global Goals Run
                            </span>
                            <span style={{ fontSize: "0.86rem", fontWeight: 700, color: "#475569" }}>
                                Organised by <a href={SITE_CONFIG.organizer.url} target="_blank" rel="noopener noreferrer" style={{ color: "#0c1e33", textDecoration: "underline" }}>Flexon Sports Foundation</a>
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <Link href="/editions" style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none" }}>
                                All City Editions →
                            </Link>
                        </div>
                    </div>

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

                        {/* Side Floating Navigation Arrows */}
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

                        {/* Bottom Anchored Caption Bar */}
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
                    3. FEATURED CITY EDITIONS (KOCHI COMING SOON FIRST, HYDERABAD SECOND)
                   ================================================================= */}
                <section style={{ padding: "48px 20px", background: "#F8FAFC" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
                            <div>
                                <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                    Pan-India Movement
                                </span>
                                <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 0 0" }}>
                                    City Editions Directory
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
                                All City Editions Directory →
                            </Link>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "28px" }}>
                            {/* Card 1: Kochi Edition (Coming Soon - LEADING) */}
                            <div className="edition-card" style={{ border: '2px solid #BAE6FD' }}>
                                <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#0c1e33" }}>
                                    <img
                                        src={ASSETS.hero.globeVisual}
                                        alt="FLEXATHON Kochi Kerala"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(6, 16, 30, 0.85) 0%, transparent 60%)",
                                        }}
                                    />
                                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                                        <span style={{ background: "#0284C7", color: "#FFFFFF", fontSize: "0.72rem", fontWeight: 900, padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.5px" }}>
                                            🌊 EDITION 02 • NEXT HOST CITY
                                        </span>
                                    </div>
                                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                                        <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: "1.35rem" }}>FLEXATHON Kochi Edition</div>
                                        <div style={{ color: "#BAE6FD", fontSize: "0.84rem", fontWeight: 600 }}>Kochi, Kerala • Dates, Venue &amp; Featured SDG TBA</div>
                                    </div>
                                </div>
                                <div style={{ padding: "24px" }}>
                                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 20px 0" }}>
                                        The running movement expands to Kerala. Official event dates, certified course routes, and the local host-selected Global Goal focus will be published once civic confirmations are finalised. Register your interest to be notified first.
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        <Link
                                            href="/kochi2027"
                                            style={{
                                                background: "#0284C7",
                                                color: "#FFFFFF",
                                                padding: "10px 20px",
                                                borderRadius: "999px",
                                                fontWeight: 800,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Get Kochi Updates →
                                        </Link>
                                        <Link
                                            href="/contact?category=Host+City+Proposal"
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
                                            Host City Collaboration
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Hyderabad 2026 (Completed Flagship) */}
                            <div className="edition-card">
                                <div style={{ position: "relative", height: "240px", overflow: "hidden", background: "#0c1e33" }}>
                                    <img
                                        src={ASSETS.editions.oct18CoursePack}
                                        alt="FLEXATHON 2026 Hyderabad Course"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(6, 16, 30, 0.85) 0%, transparent 60%)",
                                        }}
                                    />
                                    <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                                        <span style={{ background: "#10B981", color: "#052E16", fontSize: "0.72rem", fontWeight: 900, padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.5px" }}>
                                            ✓ EDITION 01 • CONCLUDED ARCHIVE
                                        </span>
                                    </div>
                                    <div style={{ position: "absolute", bottom: "14px", left: "16px", right: "16px" }}>
                                        <div style={{ color: "#FFFFFF", fontWeight: 900, fontSize: "1.35rem" }}>FLEXATHON 2026 Hyderabad</div>
                                        <div style={{ color: "#E2E8F0", fontSize: "0.84rem", fontWeight: 600 }}>18 October 2026 • ESCI Campus, Gachibowli • SDG 4</div>
                                    </div>
                                </div>
                                <div style={{ padding: "24px" }}>
                                    <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 20px 0" }}>
                                        Our inaugural flagship edition united student cohorts, running clubs, and corporate teams at ESCI Gachibowli in support of UN SDG 4: Quality Education, featuring a ₹60,000 equal cash prize purse across male and female champions.
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
                                            Official Results &amp; Certs
                                        </Link>
                                        <Link
                                            href="/hydoct18#winners-podium"
                                            style={{
                                                background: "#FEF3C7",
                                                color: "#92400E",
                                                padding: "10px 18px",
                                                borderRadius: "999px",
                                                fontWeight: 800,
                                                fontSize: "0.84rem",
                                                textDecoration: "none",
                                            }}
                                        >
                                            🏆 Winners &amp; Podium
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    4. WHAT IS FLEXATHON? (PURPOSE & FOUNDATION ATTRIBUTION)
                   ================================================================= */}
                <section style={{ padding: "64px 20px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 40px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C5192D" }}>
                                Movement Blueprint
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "6px 0 12px" }}>
                                What is FLEXATHON?
                            </h2>
                            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                                Organised by <strong>Flexon Sports Foundation</strong>, FLEXATHON — The Global Goals Run connects grassroots running with public awareness for the United Nations 17 Sustainable Development Goals. Each city edition spotlights an edition-defining cause chosen in consultation with local host communities.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                            <div style={{ background: "#F8FAFC", borderRadius: "18px", padding: "28px", border: "1px solid #E2E8F0" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>🏃</div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px" }}>
                                    Inclusive Community Fitness
                                </h3>
                                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                                    Structured running events with accurate timing, safe enclosed campuses, medical readiness, and accessible categories for everyone from brisk walkers to marathoners.
                                </p>
                            </div>

                            <div style={{ background: "#F8FAFC", borderRadius: "18px", padding: "28px", border: "1px solid #E2E8F0" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>🎯</div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px" }}>
                                    1 Host City • 1 Global Goal
                                </h3>
                                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                                    From SDG 4 (Quality Education) in Hyderabad to future goals in Kochi and beyond, turning sports participation into an educational and community mobilization catalyst.
                                </p>
                            </div>

                            <div style={{ background: "#F8FAFC", borderRadius: "18px", padding: "28px", border: "1px solid #E2E8F0" }}>
                                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>⚖️</div>
                                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 8px" }}>
                                    Equal Prize Parity (1:1)
                                </h3>
                                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                                    Equal recognition and exact 1:1 cash prize parity across male and female podium finishers, setting a new benchmark for competitive fairness in Indian sports.
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: "32px", textAlign: "center" }}>
                            <Link
                                href="/about"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#C5192D",
                                    fontWeight: 800,
                                    fontSize: "0.92rem",
                                    textDecoration: "none",
                                }}
                            >
                                <span>Read More About Flexon Sports Foundation &amp; Leadership</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    5. HYDERABAD RECAP & RUNNER RESOURCE SHORTCUTS (HISTORICAL RULES SCOPED)
                   ================================================================= */}
                <section style={{ padding: "56px 20px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ marginBottom: "28px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                Edition 01 Archive
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 6px" }}>
                                Hyderabad Flagship Recap &amp; Runner Resources
                            </h2>
                            <p style={{ fontSize: "0.92rem", color: "#64748B", margin: 0, maxWidth: "800px" }}>
                                The distances and prize pool below reflect the concluded Hyderabad 2026 flagship event at ESCI Gachibowli. Future host city editions will feature courses certified by local committees.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                            {/* 10K Timed Run */}
                            <Link href="/hydoct18/the-run" className="category-tile">
                                <div>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "14px" }}>
                                        🏃
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        RFID Chip-Timed
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 6px 0" }}>
                                        10K Timed Challenge
                                    </h3>
                                    <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 14px 0" }}>
                                        Championship distance at ESCI Gachibowli. ₹40,000 category cash prize pool with 1:1 gender parity.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* 5K Timed Run */}
                            <Link href="/hydoct18/the-run" className="category-tile">
                                <div>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "14px" }}>
                                        ⚡
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        RFID Chip-Timed
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 6px 0" }}>
                                        5K Timed Fitness Run
                                    </h3>
                                    <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 14px 0" }}>
                                        High-cadence fitness distance with official electronic chip timing and ₹20,000 podium prize pool.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* 3K Fun Run */}
                            <Link href="/hydoct18/the-run" className="category-tile">
                                <div>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "14px" }}>
                                        👟
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#F59E0B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        Non-Timed Community
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0F172A", margin: "0 0 6px 0" }}>
                                        3K Community Fun Run
                                    </h3>
                                    <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 14px 0" }}>
                                        Inclusive celebration for families, school runners, and beginners. Keepsake medals and digital certs.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Explore Race Details</span>
                                    <span>→</span>
                                </div>
                            </Link>

                            {/* Results & Finisher E-Certs */}
                            <Link href="/hydoct18/results" className="category-tile" style={{ border: '1.5px solid #A7F3D0', background: '#F0FDF4' }}>
                                <div>
                                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "14px" }}>
                                        🏅
                                    </div>
                                    <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                                        Verified Records
                                    </div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#064E3B", margin: "0 0 6px 0" }}>
                                        Results &amp; Certificates
                                    </h3>
                                    <p style={{ fontSize: "0.86rem", color: "#047857", lineHeight: 1.55, margin: "0 0 14px 0" }}>
                                        Look up your official chip-timed result by mobile number and download your print-ready Finisher E-Certificate.
                                    </p>
                                </div>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#059669", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span>Download E-Certificate</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    6. WHO CAN JOIN? (INCLUSIVE ENTRIES ACROSS RUNNER PROFILES)
                   ================================================================= */}
                <section style={{ padding: "64px 20px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 36px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                Inclusive Participation
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 8px" }}>
                                Who Can Join FLEXATHON?
                            </h2>
                            <p style={{ fontSize: "0.95rem", color: "#64748B", margin: 0 }}>
                                FLEXATHON is designed for athletes and newcomers alike. Distances, inclusions, and age eligibility vary by host city edition.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                            {[
                                { icon: "🌱", title: "First-Time Runners & Walkers", desc: "Gentle 3K community walk-and-run circuits with guided sunrise warmups, safe hydration, and celebration medals." },
                                { icon: "👨‍👩‍👧‍👦", title: "Families & Children", desc: "Wholesome outdoor event atmosphere with enclosed traffic-free campuses, music, and kid-friendly fitness drills." },
                                { icon: "⚡", title: "Competitive Club Runners", desc: "Electronic RFID split-mats, certified distances, pacers, and verified podium cash prize distribution." },
                                { icon: "🎓", title: "Schools & College Cohorts", desc: "Special community student pricing and campus ambassador programs championing SDG awareness." },
                                { icon: "🏢", title: "Corporate Wellness Teams", desc: "Turnkey employee fitness challenges uniting staff under a shared brand and social-responsibility banner." },
                                { icon: "🤝", title: "Volunteers & Race Marshals", desc: "Gain hands-on race management experience, volunteer certification, official kit, and civic pride." },
                            ].map((cohort, cIdx) => (
                                <div key={cIdx} style={{ background: "#F8FAFC", borderRadius: "16px", padding: "24px", border: "1px solid #E2E8F0" }}>
                                    <div style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{cohort.icon}</div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>{cohort.title}</h3>
                                    <p style={{ fontSize: "0.86rem", color: "#64748B", lineHeight: 1.55, margin: 0 }}>{cohort.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    7. 17 GLOBAL GOALS FRAMEWORK (INTERACTIVE SELECTOR + DISCLAIMER)
                   ================================================================= */}
                <section style={{ padding: "56px 20px 64px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 32px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                The Shared Framework
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 10px 0" }}>
                                17 Sustainable Development Goals
                            </h2>
                            <p style={{ fontSize: "0.94rem", color: "#64748B", lineHeight: 1.6, margin: 0 }}>
                                Each FLEXATHON edition spotlights a United Nations Global Goal, uniting athletic perseverance with community education. Click any goal below to inspect how sport advances that objective.
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
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                borderLeft: `6px solid ${activeGoal.color}`,
                                borderRadius: "20px",
                                padding: "26px",
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                                gap: "24px",
                                alignItems: "center",
                                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
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

                            <div style={{ background: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", border: "1px solid #E2E8F0" }}>
                                <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", marginBottom: "4px" }}>
                                    🏃 Connection to Sport &amp; Community Action:
                                </div>
                                <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 10px 0" }}>
                                    {activeGoal.sportConnection} {activeGoal.communityAction}
                                </p>
                                {activeGoal.id === 4 ? (
                                    <Link
                                        href="/hydoct18/global-goal"
                                        style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C5192D", textDecoration: "none" }}
                                    >
                                        ✓ Spotlighted in Hyderabad 2026 — View Flagship Impact →
                                    </Link>
                                ) : (
                                    <Link
                                        href="/global-goals"
                                        style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0F172A", textDecoration: "none" }}
                                    >
                                        Explore All 17 Goals in Depth →
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Independent Initiative Notice */}
                        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "0.8rem", color: "#94A3B8" }}>
                            {SITE_CONFIG.unNotice}
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    8. GET INVOLVED (CLEAR CARDS WITH PRESELECTED CATEGORIES)
                   ================================================================= */}
                <section style={{ padding: "64px 20px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 36px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                Community Collaboration
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 8px" }}>
                                Get Involved in the Movement
                            </h2>
                            <p style={{ fontSize: "0.95rem", color: "#64748B", margin: 0 }}>
                                Whether you want to volunteer, bring a university squad, sponsor a city edition, or propose a new host city — our teams are ready to collaborate.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                            {[
                                {
                                    title: "Volunteer at an Edition",
                                    desc: "Support hydration stations, bib distribution, route marshaling, or finish line medal ceremonies.",
                                    cta: "Apply to Volunteer",
                                    href: "/contact?category=Volunteer+Application",
                                    badge: "Community",
                                },
                                {
                                    title: "Running Clubs & Crews",
                                    desc: "Register club teams, reserve group slots, and collaborate on local training runs.",
                                    cta: "Club Coordination",
                                    href: "/contact?category=School+%2F+Corporate+Participation",
                                    badge: "Athletes",
                                },
                                {
                                    title: "Colleges & Schools",
                                    desc: "Mobilize student runners with dedicated campus ambassador allocations and fitness programs.",
                                    cta: "Campus Programs",
                                    href: "/contact?category=School+%2F+Corporate+Participation",
                                    badge: "Youth",
                                },
                                {
                                    title: "Corporate Wellness Teams",
                                    desc: "Strengthen team wellness and sustainability leadership with custom corporate cohorts.",
                                    cta: "Corporate Enquiries",
                                    href: "/contact?category=School+%2F+Corporate+Participation",
                                    badge: "Workplace",
                                },
                                {
                                    title: "Partners & Sponsors",
                                    desc: "Align your brand with health, sustainability, and community impact across major Indian cities.",
                                    cta: "Explore Partnerships",
                                    href: "/partners",
                                    badge: "Industry",
                                },
                                {
                                    title: "Propose a Host City",
                                    desc: "Collaborate with Flexon Sports Foundation to bring a future FLEXATHON edition to your city.",
                                    cta: "Submit Host Proposal",
                                    href: "/contact?category=Host+City+Proposal",
                                    badge: "Expansion",
                                },
                            ].map((card, idx) => (
                                <div key={idx} style={{ background: "#F8FAFC", borderRadius: "18px", padding: "26px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "#C5192D", textTransform: "uppercase", letterSpacing: "1px", display: "inline-block", marginBottom: "8px" }}>
                                            {card.badge}
                                        </span>
                                        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", margin: "0 0 8px" }}>
                                            {card.title}
                                        </h3>
                                        <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.55, margin: "0 0 20px" }}>
                                            {card.desc}
                                        </p>
                                    </div>
                                    <Link
                                        href={card.href}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            color: "#C5192D",
                                            fontWeight: 800,
                                            fontSize: "0.85rem",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <span>{card.cta}</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =================================================================
                    9. HYDERABAD 2026 PARTNERS & PLATFORM ECOSYSTEM
                   ================================================================= */}
                <section style={{ padding: "48px 20px 56px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "28px" }}>
                            <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                Institutional Collaboration
                            </span>
                            <h2 className="font-condensed" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 0" }}>
                                Hyderabad 2026 Partners &amp; Ecosystem
                            </h2>
                            <p style={{ fontSize: "0.88rem", color: "#64748B", margin: "6px 0 0" }}>
                                Acknowledging our edition partners, campus hosts, and ticketing platforms for the inaugural Hyderabad 2026 flagship.
                            </p>
                        </div>

                        <PartnerStrip editionLabel="Hyderabad 2026 Flagship Partners &amp; Listing Ecosystem" showDiscoveryPlatforms={true} />
                    </div>
                </section>

                {/* =================================================================
                    10. PRACTICAL FAQ & COMPACT KOCHI UPDATES FORM
                   ================================================================= */}
                <section id="kochi-updates" style={{ padding: "64px 20px 80px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))", gap: "48px", alignItems: "start" }}>
                            {/* Left: Frequently Asked Questions */}
                            <div>
                                <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C5192D" }}>
                                    Practical Information
                                </span>
                                <h2 className="font-condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, textTransform: "uppercase", color: "#0F172A", margin: "4px 0 20px" }}>
                                    Frequently Asked Questions
                                </h2>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {[
                                        {
                                            q: "Is registration or ticket payment currently open for Kochi?",
                                            a: "No. Official registrations and payments are not open yet for the Kochi Edition. Please do not make payments on any third-party links. You can register your interest on this page to be notified as soon as official registrations launch.",
                                        },
                                        {
                                            q: "How can I access my Hyderabad 2026 result and certificate?",
                                            a: "Visit the Results & Certificates page (/hydoct18/results) and enter your registered 10-digit mobile number. You can verify your chip timing and download your high-resolution official E-Certificate directly.",
                                        },
                                        {
                                            q: "Who organizes FLEXATHON?",
                                            a: "FLEXATHON is organised by Flexon Sports Foundation, a non-profit sports management entity committed to community health and United Nations Global Goals awareness across Indian cities.",
                                        },
                                        {
                                            q: "Are the UN Global Goals endorsed by the United Nations?",
                                            a: "FLEXATHON is an independent community initiative. References to the 17 SDGs are for public awareness, education, and social alignment only and do not imply formal endorsement by or affiliation with the UN.",
                                        },
                                        {
                                            q: "How can my institution or running club propose a host city?",
                                            a: "Fill out the Host City Proposal enquiry on our Contact page (/contact?category=Host+City+Proposal). Our leadership team reviews venue, safety, and civic feasibility with local committees.",
                                        },
                                    ].map((faq, fIdx) => (
                                        <div key={fIdx} style={{ background: "#F8FAFC", borderRadius: "14px", padding: "18px 20px", border: "1px solid #E2E8F0" }}>
                                            <div style={{ fontWeight: 800, color: "#0F172A", fontSize: "0.96rem", marginBottom: "6px" }}>
                                                {faq.q}
                                            </div>
                                            <div style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.6 }}>
                                                {faq.a}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Receive Kochi Updates Box */}
                            <div
                                style={{
                                    background: "#F0F9FF",
                                    border: "1.5px solid #BAE6FD",
                                    borderRadius: "22px",
                                    padding: "36px",
                                    boxShadow: "0 10px 30px rgba(2, 132, 199, 0.08)",
                                }}
                            >
                                <span style={{ fontSize: "0.74rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", color: "#0284C7" }}>
                                    Next Host City Updates
                                </span>
                                <h3 className="font-condensed" style={{ fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", color: "#0c1e33", margin: "6px 0 10px" }}>
                                    Get Notified for Kochi 2027
                                </h3>
                                <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.6, margin: "0 0 20px" }}>
                                    Be the first to receive verified race date announcements, certified venue maps, early-bird category openings, and volunteer invitations directly from Flexon Sports Foundation.
                                </p>

                                <form onSubmit={handleKochiSignup} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                    <div>
                                        <label htmlFor="kochi-signup-email" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                                            Email Address
                                        </label>
                                        <input
                                            id="kochi-signup-email"
                                            type="email"
                                            value={kochiEmail}
                                            onChange={(e) => setKochiEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            style={{
                                                width: "100%",
                                                padding: "12px 14px",
                                                borderRadius: "10px",
                                                border: "1px solid #CBD5E1",
                                                fontSize: "0.94rem",
                                                background: "#FFFFFF",
                                                boxSizing: "border-box",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="kochi-signup-phone" style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                                            Mobile / WhatsApp (Optional)
                                        </label>
                                        <input
                                            id="kochi-signup-phone"
                                            type="tel"
                                            value={kochiPhone}
                                            onChange={(e) => setKochiPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            style={{
                                                width: "100%",
                                                padding: "12px 14px",
                                                borderRadius: "10px",
                                                border: "1px solid #CBD5E1",
                                                fontSize: "0.94rem",
                                                background: "#FFFFFF",
                                                boxSizing: "border-box",
                                            }}
                                        />
                                    </div>

                                    {kochiStatus.type !== 'idle' && (
                                        <div
                                            role="status"
                                            style={{
                                                padding: "12px 14px",
                                                borderRadius: "8px",
                                                background: kochiStatus.type === 'success' ? '#DCFCE7' : '#FEE2E2',
                                                color: kochiStatus.type === 'success' ? '#166534' : '#991B1B',
                                                border: kochiStatus.type === 'success' ? '1px solid #86EFAC' : '1px solid #FCA5A5',
                                                fontSize: "0.88rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {kochiStatus.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={kochiSubmitting}
                                        style={{
                                            background: "#0284C7",
                                            color: "#FFFFFF",
                                            border: "none",
                                            borderRadius: "10px",
                                            padding: "14px 24px",
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 800,
                                            fontSize: "1.08rem",
                                            letterSpacing: "0.8px",
                                            textTransform: "uppercase",
                                            cursor: kochiSubmitting ? "not-allowed" : "pointer",
                                            marginTop: "4px",
                                            boxShadow: "0 6px 18px rgba(2, 132, 199, 0.35)",
                                        }}
                                    >
                                        {kochiSubmitting ? "Submitting..." : "Get Kochi Updates →"}
                                    </button>

                                    <div style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.5 }}>
                                        🔒 Zero spam. We only send verified race updates and announcements for FLEXATHON editions.
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer showPartnerStrip={false} />
        </div>
    );
}
