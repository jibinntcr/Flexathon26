'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImpactPage() {
    const [activePillarTab, setActivePillarTab] = useState<'education' | 'health' | 'equality' | 'sustainability'>('education');

    const impactMetrics = [
        {
            value: '1,000+',
            label: 'Runners Mobilized',
            sub: 'Registered participants, student cohorts & club runners at Hyderabad 2026',
            color: '#C5192D',
        },
        {
            value: '100%',
            label: 'Equal Prize Purse',
            sub: 'Exact cash prize parity across Men and Women (₹60,000 total awarded)',
            color: '#10B981',
        },
        {
            value: '17',
            label: 'UN Global Goals',
            sub: 'Independent awareness initiative with 1 goal spotlighted per host city',
            color: '#2563EB',
        },
        {
            value: 'Zero Waste',
            label: 'Course Hydration Focus',
            sub: 'Bulk dispenser hydration & paperless digital timing certificates at ESCI',
            color: '#F59E0B',
        },
    ];

    const pillars = [
        {
            id: 'education',
            badge: 'SDG 4 Focus • Hyderabad 2026',
            goalNum: '04',
            goalName: 'Quality Education',
            title: 'Campus Mobilization & Equal Access to Opportunity',
            tagline: 'Transforming race day into a catalyst for inclusive learning, student wellness, and youth potential.',
            image: '/assets/gallery/oct18/NIX09092.JPG',
            imageAlt: 'Hundreds of runners in official SDG 4 jerseys during warm-up assembly at ESCI Hyderabad',
            caption: 'Pre-race guided mobility drills with runners sporting the official SDG 4 Quality Education chest crest at ESCI Gachibowli.',
            highlights: [
                {
                    title: 'ESCI Academic Partnership',
                    desc: 'Hosted inside the prestigious Engineering Staff College of India (ESCI) campus to directly engage student engineers, faculty, and academic staff.',
                },
                {
                    title: 'Subsidized Student Registrations',
                    desc: 'Lowered financial barriers for college and high-school runners with special community & educational ticket allocations.',
                },
                {
                    title: 'Active Learning Campaign',
                    desc: 'Pre-race educational webinars, campus ambassador networks, and SDG 4 signage along the 10K/5K course.',
                },
                {
                    title: 'Digital Lifelong Certificates',
                    desc: 'Every student finisher received an auditable digital e-certificate linked directly to their official chip timing.',
                },
            ],
        },
        {
            id: 'health',
            badge: 'SDG 3 Core • All Host Cities',
            goalNum: '03',
            goalName: 'Good Health & Well-Being',
            title: 'Preventive Health, Active Habit-Building & Safe Circuits',
            tagline: 'Making structured endurance running welcoming, safe, and motivating for beginners and veterans alike.',
            image: '/assets/gallery/oct18/NIX09262.JPG',
            imageAlt: '10K and 5K runners pacing under lush green tree canopy on the ESCI campus course',
            caption: 'The lead pack charging through the oxygen-rich, tree-lined ESCI campus circuit in Gachibowli on race morning.',
            highlights: [
                {
                    title: 'Tiered 3K, 5K & 10K Distances',
                    desc: 'Welcoming walk-and-run 3K for families, intermediate 5K for casual joggers, and competitive timed 10K for endurance athletes.',
                },
                {
                    title: 'RFID Split-Timing Accuracy',
                    desc: 'Electronic timing mats capturing precise gun and net chip times to eliminate manual discrepancies and dispute.',
                },
                {
                    title: 'Dedicated Medical Response',
                    desc: 'Emergency ambulances, on-site paramedic triage, and automated external defibrillator (AED) readiness throughout the event.',
                },
                {
                    title: 'Electrolyte & Hydration Stations',
                    desc: 'Continuous water stations with Tata Copper hydration and natural electrolyte replenishment every 1.5 km.',
                },
            ],
        },
        {
            id: 'equality',
            badge: 'SDG 5 Commitment • Equal Opportunity',
            goalNum: '05',
            goalName: 'Gender Equality',
            title: '1:1 Prize Parity & Women in Sport Empowerment',
            tagline: 'Equal finish line glory backed by 100% equal cash prizes, female leadership, and safe race infrastructure.',
            image: '/assets/gallery/oct18/NIX09990.JPG',
            imageAlt: 'Women podium winners receiving identical official prize cheques on the FLEXATHON stage',
            caption: 'Women\'s Open podium winners receiving identical ₹10,000 top prizes on stage from Flexon Sports Foundation officials.',
            highlights: [
                {
                    title: 'Guaranteed 1:1 Prize Parity',
                    desc: 'Male and female podium finishers across 10K and 5K received identical cash prizes (₹10,000 for 1st place, ₹5,000 for 2nd, ₹3,000 for 3rd).',
                },
                {
                    title: 'Female Pacer & Official Leadership',
                    desc: 'Active representation of female athletes among race marshals, pacing leaders, and volunteer coordinators from regional running clubs.',
                },
                {
                    title: 'Dignified Private Facilities',
                    desc: 'Dedicated women\'s change rooms, baggage counters, and personal hygiene stations maintained at the race village.',
                },
                {
                    title: 'Equal Podium Spotlight',
                    desc: 'Equal ceremony coverage ensuring female champions receive full recognition alongside male counterparts.',
                },
            ],
        },
        {
            id: 'sustainability',
            badge: 'SDG 11 & 12 • Responsible Operations',
            goalNum: '12',
            goalName: 'Responsible Consumption',
            title: 'Low-Waste Initiatives & Green Campus Circuits',
            tagline: 'Protecting the green spaces we run through with conscious waste management and paperless digital systems.',
            image: '/assets/gallery/oct18/NIX09962.JPG',
            imageAlt: 'Finishers proudly holding heavy-cast zinc commemorative medals in official SDG 4 jerseys',
            caption: 'Finisher celebrations with high-relief commemorative medals crafted from durable recyclable zinc alloy.',
            highlights: [
                {
                    title: 'Reduced Single-Use Plastic at Water Stations',
                    desc: 'Deployed high-volume food-grade hydration refill dispensers and recyclable cups to curb single-use bottled water along the corridor.',
                },
                {
                    title: '100% Paperless Digital Systems',
                    desc: 'Zero printed entry forms or paper brochures. All registrations, runner bib lookups, and timing certificates operate purely digitally.',
                },
                {
                    title: 'Campus Post-Race Green Sweep',
                    desc: 'Volunteers and waste management partners conducted a clean sweep across the entire ESCI campus route within 2 hours of flag-off.',
                },
                {
                    title: 'Durable Keepsake Medals',
                    desc: 'Custom-molded zinc alloy medals designed to be cherished for years rather than disposable plastic participation trinkets.',
                },
            ],
        },
    ];

    const activePillar = pillars.find((p) => p.id === activePillarTab) || pillars[0];

    const governanceSteps = [
        {
            step: '01',
            title: 'Edition-Specific SDG Selection',
            subtitle: 'Rooted in Local Community Need',
            desc: 'Every city host committee consults with local universities, youth clubs, and civic groups to select an edition-defining UN Global Goal — from SDG 4 (Quality Education) in Hyderabad to future edition-defining goals selected by local host committees.',
            icon: '🎯',
        },
        {
            step: '02',
            title: 'Multi-Sector Mobilization',
            subtitle: 'Uniting Citizens, Campus & Industry',
            desc: 'Bringing schools, running communities, corporate wellness leaders, and community partners onto one inclusive starting line.',
            icon: '🤝',
        },
        {
            step: '03',
            title: 'Zero-Waste Race Operations',
            subtitle: 'Clean Footprint Protocol',
            desc: 'Designing hydration zones, course markings, bib distribution, and timing mats with strict waste-reduction mandates. No single-use plastic bottles, and 100% digital timing certificates.',
            icon: '🌱',
        },
        {
            step: '04',
            title: 'Verified RFID Timing & Audited Records',
            subtitle: 'Zero Inflation, Zero Disputes',
            desc: 'Publishing only confirmed RFID-timed results, documented podium cheque handouts, and authenticated photo proof. We never publish vague, inflated attendance numbers.',
            icon: '⏱️',
        },
        {
            step: '05',
            title: 'Multi-City Knowledge Transfer',
            subtitle: 'A Permanent Pan-India Movement',
            desc: 'Carrying participant data, safety blueprints, and community ties forward from Hyderabad 2026 to Kochi 2027 and future host cities across India.',
            icon: '🚀',
        },
    ];

    const hostCityRoadmap = [
        {
            city: 'Hyderabad 2026',
            badge: 'Edition 1 • Successfully Concluded',
            badgeColor: '#10B981',
            date: '18 October 2026',
            venue: 'ESCI Campus, Gachibowli',
            sdg: 'SDG 4: Quality Education',
            stats: '3K Fun Run (Non-Timed) • 5K & 10K (RFID Chip-Timed)',
            status: 'Completed',
            link: '/hydoct18',
            linkText: 'Explore Verified Archive →',
        },
        {
            city: 'Kochi 2027',
            badge: 'Edition 2 • Next Host City',
            badgeColor: '#0284C7',
            date: '2027 (Dates TBA)',
            venue: 'Kochi, Kerala (Venue TBA)',
            sdg: 'Global Goal: To Be Announced (TBA)',
            stats: 'Course & Distances Subject to Certification (TBA)',
            status: 'Coming Soon',
            link: '/kochi2027',
            linkText: 'Receive Kochi Updates →',
        },
        {
            city: 'Pan-India 2027–2030',
            badge: 'Future Host Expansion',
            badgeColor: '#6366F1',
            date: '2027–2030 Roadmap',
            venue: 'Bengaluru • Pune • Chennai • Delhi NCR',
            sdg: '17 Global Goals Framework',
            stats: 'Multi-City Academic & Corporate Circuits',
            status: 'Planning',
            link: '/contact',
            linkText: 'Propose Your City →',
        },
    ];

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="impact" />

            <main>
                {/* Hero Billboard */}
                <section
                    style={{
                        position: 'relative',
                        background: 'linear-gradient(135deg, #071324 0%, #0d2138 50%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: 'clamp(54px, 8vw, 84px) clamp(16px, 4vw, 24px) clamp(60px, 9vw, 96px)',
                        borderBottom: '4px solid #C5192D',
                        overflow: 'hidden',
                    }}
                >
                    {/* Background Texture Graphic */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '50%',
                            backgroundImage: 'url(/assets/gallery/oct18/NIX09262.JPG)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.18,
                            filter: 'grayscale(40%) contrast(120%)',
                            maskImage: 'linear-gradient(to right, transparent, black)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black)',
                            pointerEvents: 'none',
                        }}
                    />

                    <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <div style={{ maxWidth: '840px' }}>
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'rgba(197, 25, 45, 0.25)',
                                    border: '1px solid rgba(251, 113, 133, 0.4)',
                                    color: '#FECDD3',
                                    fontSize: 'clamp(0.72rem, 1.5vw, 0.78rem)',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.4px',
                                    padding: '6px 14px',
                                    borderRadius: '999px',
                                    marginBottom: '18px',
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                                Verified Social Impact &amp; Accountability
                            </span>

                            <h1
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(2.6rem, 6.5vw, 4.8rem)',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    margin: '0 0 16px',
                                    lineHeight: 1.04,
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                MEASURED BY IMPACT. <br />
                                <span style={{ color: '#F87171' }}>UNITED BY SPORT.</span>
                            </h1>

                            <p
                                style={{
                                    color: '#CBD5E1',
                                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                                    lineHeight: 1.65,
                                    margin: '0 0 32px',
                                    maxWidth: '740px',
                                }}
                            >
                                Organised by <strong>Flexon Sports Foundation</strong>, FLEXATHON bridges grassroots fitness, citizen mobilization, and the United Nations 17 Sustainable Development Goals. We operate on a strict <em>Zero-Inflation Pledge</em>: every milestone reported is verified by timing chips, official partner records, and public photo archives.
                            </p>

                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                <Link
                                    href="/hydoct18"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        padding: '12px 26px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        boxShadow: '0 6px 20px rgba(197, 25, 45, 0.4)',
                                    }}
                                >
                                    View Hyderabad Edition Archive →
                                </Link>
                                <Link
                                    href="/gallery"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        backdropFilter: 'blur(8px)',
                                    }}
                                >
                                    Browse Official Photo Proof 📸
                                </Link>
                            </div>
                        </div>

                        {/* Top Key Metrics Strip */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                                gap: '16px',
                                marginTop: '48px',
                            }}
                        >
                            {impactMetrics.map((m) => (
                                <div
                                    key={m.label}
                                    style={{
                                        background: 'rgba(15, 23, 42, 0.75)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        borderRadius: '16px',
                                        padding: '22px 20px',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: 'clamp(2.4rem, 5vw, 3.2rem)',
                                            fontWeight: 900,
                                            lineHeight: 1,
                                            color: m.color,
                                            marginBottom: '6px',
                                        }}
                                    >
                                        {m.value}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '1.15rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.8px',
                                            color: '#FFFFFF',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {m.label}
                                    </div>
                                    <div style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.45 }}>
                                        {m.sub}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Impact Pillars (Interactive Tabs & Real Photography) */}
                <section style={{ padding: 'clamp(44px, 7vw, 76px) clamp(16px, 4vw, 24px)', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <span style={{ fontSize: '0.78rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                            Core Action Areas
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '6px 0 10px',
                                lineHeight: 1.1,
                            }}
                        >
                            The 4 Pillars of FLEXATHON Impact
                        </h2>
                        <p style={{ color: '#475569', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
                            How every kilometer run translates into verified community action, environmental responsibility, and inclusive athletics.
                        </p>
                    </div>

                    {/* Interactive Pillar Selector Tabs */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginBottom: '32px',
                        }}
                    >
                        {pillars.map((p) => {
                            const active = activePillarTab === p.id;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setActivePillarTab(p.id as any)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 22px',
                                        borderRadius: '12px',
                                        border: active ? '2px solid #C5192D' : '1px solid #E2E8F0',
                                        background: active ? '#0c1e33' : '#FFFFFF',
                                        color: active ? '#FFFFFF' : '#334155',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: active ? '0 8px 20px rgba(12, 30, 51, 0.12)' : 'none',
                                    }}
                                >
                                    <span
                                        style={{
                                            background: active ? '#C5192D' : '#F1F5F9',
                                            color: active ? '#FFFFFF' : '#64748B',
                                            borderRadius: '6px',
                                            padding: '2px 7px',
                                            fontSize: '0.8rem',
                                            fontWeight: 900,
                                        }}
                                    >
                                        SDG {p.goalNum}
                                    </span>
                                    <span>{p.goalName}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Pillar Card with Real Event Photography */}
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '24px',
                            border: '1px solid #E2E8F0',
                            overflow: 'hidden',
                            boxShadow: '0 12px 36px rgba(12, 30, 51, 0.06)',
                        }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                            }}
                        >
                            {/* Visual Photo Card */}
                            <div style={{ position: 'relative', background: '#0c1e33', minHeight: '360px', overflow: 'hidden' }}>
                                <img
                                    src={activePillar.image}
                                    alt={activePillar.imageAlt}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(7, 19, 36, 0.95) 0%, rgba(7, 19, 36, 0.6) 60%, transparent 100%)',
                                        padding: '28px 24px 20px',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            background: '#C5192D',
                                            color: '#FFFFFF',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {activePillar.badge}
                                    </span>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.5, fontWeight: 500 }}>
                                        {activePillar.caption}
                                    </p>
                                </div>
                            </div>

                            {/* Details & Highlights */}
                            <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                                <div
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        color: '#0c1e33',
                                        margin: '0 0 10px',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {activePillar.title}
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.65, margin: '0 0 28px' }}>
                                    {activePillar.tagline}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                    {activePillar.highlights.map((h) => (
                                        <div
                                            key={h.title}
                                            style={{
                                                background: '#F8FAFC',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '14px',
                                                padding: '16px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '1.15rem',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    color: '#0c1e33',
                                                    marginBottom: '6px',
                                                }}
                                            >
                                                {h.title}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.86rem', color: '#64748B', lineHeight: 1.55 }}>
                                                {h.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5-Step Transparency & Governance Protocol */}
                <section
                    style={{
                        background: '#071324',
                        color: '#FFFFFF',
                        padding: 'clamp(54px, 8vw, 84px) clamp(16px, 4vw, 24px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{ maxWidth: '780px', marginBottom: '44px' }}>
                            <span
                                style={{
                                    fontSize: '0.78rem',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    color: '#F87171',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.4px',
                                }}
                            >
                                Governance Framework
                            </span>
                            <h2
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    margin: '6px 0 14px',
                                    lineHeight: 1.08,
                                }}
                            >
                                The 5-Step Impact &amp; Accountability Protocol
                            </h2>
                            <p style={{ color: '#94A3B8', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.65, margin: 0 }}>
                                To prevent greenwashing or inflated claims, Flexon Sports Foundation mandates a five-gate protocol for every city edition before, during, and after race day.
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                                gap: '20px',
                            }}
                        >
                            {governanceSteps.map((s) => (
                                <div
                                    key={s.step}
                                    style={{
                                        background: 'rgba(15, 23, 42, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                        borderRadius: '18px',
                                        padding: '24px 20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '2rem',
                                                    fontWeight: 900,
                                                    color: '#C5192D',
                                                }}
                                            >
                                                {s.step}
                                            </span>
                                            <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                                        </div>
                                        <h3
                                            style={{
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                fontSize: '1.35rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                color: '#FFFFFF',
                                                margin: '0 0 6px',
                                                lineHeight: 1.15,
                                            }}
                                        >
                                            {s.title}
                                        </h3>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                                            {s.subtitle}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.86rem', color: '#94A3B8', lineHeight: 1.6 }}>
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Multi-City Expansion Roadmap */}
                <section style={{ padding: 'clamp(44px, 7vw, 76px) clamp(16px, 4vw, 24px)', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '36px' }}>
                        <span style={{ fontSize: '0.78rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                            National Expansion
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '6px 0 10px',
                                lineHeight: 1.1,
                            }}
                        >
                            Multi-City Host Expansion Roadmap
                        </h2>
                        <p style={{ color: '#475569', fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
                            From the inaugural edition in Hyderabad forward to coastal Kochi and India&apos;s leading technology hubs, each host city champions a dedicated Global Goal.
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                            gap: '24px',
                            marginBottom: '48px',
                        }}
                    >
                        {hostCityRoadmap.map((c) => (
                            <div
                                key={c.city}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    border: '1px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 8px 28px rgba(12, 30, 51, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            background: `${c.badgeColor}1A`,
                                            border: `1px solid ${c.badgeColor}4D`,
                                            color: c.badgeColor,
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '0.76rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            marginBottom: '14px',
                                        }}
                                    >
                                        {c.badge}
                                    </span>

                                    <h3
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '2rem',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            color: '#0c1e33',
                                            margin: '0 0 10px',
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {c.city}
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                                        <div style={{ fontSize: '0.86rem', color: '#475569' }}>
                                            📅 <strong>{c.date}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.86rem', color: '#475569' }}>
                                            📍 <strong>{c.venue}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.86rem', color: '#0c1e33', fontWeight: 700 }}>
                                            🎯 <strong>{c.sdg}</strong>
                                        </div>
                                        <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                                            ⚡ {c.stats}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={c.link}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: '#C5192D',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.8px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {c.linkText}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Impact Call to Action Banner */}
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #C5192D 0%, #991B1B 100%)',
                            borderRadius: '24px',
                            color: '#FFFFFF',
                            padding: 'clamp(36px, 6vw, 56px) clamp(20px, 5vw, 48px)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '24px',
                            boxShadow: '0 16px 40px rgba(197, 25, 45, 0.3)',
                        }}
                    >
                        <div style={{ maxWidth: '640px' }}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: '0.78rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.2px',
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    marginBottom: '12px',
                                }}
                            >
                                Community &amp; Corporate Collaboration
                            </span>
                            <h3
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    margin: '0 0 10px',
                                    lineHeight: 1.05,
                                }}
                            >
                                Bring FLEXATHON to Your Campus or City
                            </h3>
                            <p style={{ margin: 0, fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)', color: '#FEE2E2', lineHeight: 1.6 }}>
                                Are you a university, municipal council, running federation, or corporate wellness director looking to mobilize citizens for a verified UN Sustainable Development Goal? Let&apos;s build the next starting line together.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-block',
                                    background: '#FFFFFF',
                                    color: '#C5192D',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 900,
                                    fontSize: '1.05rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    padding: '13px 26px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                                }}
                            >
                                Partner With Us →
                            </Link>
                            <Link
                                href="/kochi2027"
                                style={{
                                    display: 'inline-block',
                                    background: 'rgba(7, 19, 36, 0.85)',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 900,
                                    fontSize: '1.05rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    padding: '13px 24px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                Kochi 2027 Interest →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
