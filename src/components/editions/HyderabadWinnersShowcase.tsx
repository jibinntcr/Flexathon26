'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Winner {
    rank: number;
    medal: 'Gold' | 'Silver' | 'Bronze';
    name: string;
    bib: string;
    chipTime: string;
    prize: string;
}

interface DistanceCategory {
    distance: string;
    distanceBadge: string;
    chipTimed: boolean;
    prizePool: string;
    posterSrc: string;
    men: Winner[];
    women: Winner[];
}

export default function HyderabadWinnersShowcase() {
    const [activeTab, setActiveTab] = useState<'10k' | '5k' | 'posters' | 'ceremony'>('10k');
    const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

    const categories: Record<'10k' | '5k', DistanceCategory> = {
        '10k': {
            distance: '10K Global Goals Challenge',
            distanceBadge: '10 KM TIMED RUN',
            chipTimed: true,
            prizePool: '₹40,000 Total Pool',
            posterSrc: '/assets/editions/oct18-10k-winners.jpg',
            men: [
                { rank: 1, medal: 'Gold', name: 'Vikas Bisne', bib: '1011', chipTime: '00:33:15', prize: '₹10,000 Cash' },
                { rank: 2, medal: 'Silver', name: 'Sandeepkumar rameshwar', bib: '1253', chipTime: '00:33:38', prize: '₹6,000 Cash' },
                { rank: 3, medal: 'Bronze', name: 'Rushi Wavre', bib: '1007', chipTime: '00:34:08', prize: '₹4,000 Cash' },
            ],
            women: [
                { rank: 1, medal: 'Gold', name: 'Neeta Salame', bib: '1179', chipTime: '00:45:22', prize: '₹10,000 Cash' },
                { rank: 2, medal: 'Silver', name: 'Kavya Athlete', bib: '1180', chipTime: '00:46:13', prize: '₹6,000 Cash' },
                { rank: 3, medal: 'Bronze', name: 'Meera Sahu', bib: '1183', chipTime: '00:47:39', prize: '₹4,000 Cash' },
            ],
        },
        '5k': {
            distance: '5K Fitness Run',
            distanceBadge: '5 KM TIMED RUN',
            chipTimed: true,
            prizePool: '₹20,000 Total Pool',
            posterSrc: '/assets/editions/oct18-5k-winners.jpg',
            men: [
                { rank: 1, medal: 'Gold', name: 'Rahul Gandhar', bib: '5209', chipTime: '00:15:50', prize: '₹5,000 Cash' },
                { rank: 2, medal: 'Silver', name: 'Manohar', bib: '5242', chipTime: '00:16:04', prize: '₹3,000 Cash' },
                { rank: 3, medal: 'Bronze', name: 'Jagannath Pawar', bib: '5001', chipTime: '00:16:19', prize: '₹2,000 Cash' },
            ],
            women: [
                { rank: 1, medal: 'Gold', name: 'Richa Rai', bib: '5020', chipTime: '00:21:29', prize: '₹5,000 Cash' },
                { rank: 2, medal: 'Silver', name: 'Tejasri Batte', bib: '5153', chipTime: '00:22:23', prize: '₹3,000 Cash' },
                { rank: 3, medal: 'Bronze', name: 'Amna Anjum', bib: '5135', chipTime: '00:24:05', prize: '₹2,000 Cash' },
            ],
        },
    };

    const ceremonyPhotos = [
        {
            src: '/assets/gallery/oct18/NIX09990.JPG',
            title: "Women's Open Podium Champions",
            caption: 'Main stage award ceremony with official prize cheques and medals presented to top women finishers at ESCI Gachibowli.',
        },
        {
            src: '/assets/gallery/oct18/NIX09987.JPG',
            title: '10K Men & Women Stage Honors',
            caption: 'Celebrating speed, discipline, and sportsmanship on the official FLEXATHON podium.',
        },
        {
            src: '/assets/gallery/oct18/NIX09942.JPG',
            title: 'Prize Cheque & Medal Handover',
            caption: 'Cash prizes awarded with 100% equal purse across men and women categories.',
        },
        {
            src: '/assets/gallery/oct18/NIX09988.JPG',
            title: 'Stage Celebrations & Community Cheers',
            caption: 'Faculty, organizers, and fellow runners congratulating the Hyderabad 2026 winners.',
        },
    ];

    const getMedalColor = (medal: 'Gold' | 'Silver' | 'Bronze') => {
        switch (medal) {
            case 'Gold':
                return {
                    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                    border: '#F59E0B',
                    text: '#B45309',
                    badge: '#D97706',
                    glow: 'rgba(245, 158, 11, 0.25)',
                    icon: '🥇',
                    title: '1st Place • Champion',
                };
            case 'Silver':
                return {
                    bg: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                    border: '#94A3B8',
                    text: '#334155',
                    badge: '#64748B',
                    glow: 'rgba(148, 163, 184, 0.22)',
                    icon: '🥈',
                    title: '2nd Place • 1st Runner-Up',
                };
            case 'Bronze':
                return {
                    bg: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)',
                    border: '#FB923C',
                    text: '#9A3412',
                    badge: '#EA580C',
                    glow: 'rgba(251, 146, 60, 0.25)',
                    icon: '🥉',
                    title: '3rd Place • 2nd Runner-Up',
                };
        }
    };

    const currentCat = activeTab === '5k' ? categories['5k'] : categories['10k'];

    return (
        <section
            id="winners-podium"
            style={{
                padding: 'clamp(44px, 6vw, 76px) clamp(16px, 4vw, 28px)',
                background: 'linear-gradient(180deg, #071324 0%, #0d1e33 60%, #08111e 100%)',
                color: '#FFFFFF',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '3px solid #C5192D',
                borderBottom: '3px solid #C5192D',
            }}
        >
            {/* Background Texture & Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '-150px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '900px',
                    height: '500px',
                    background: 'radial-gradient(ellipse at center, rgba(197, 25, 45, 0.22) 0%, rgba(245, 158, 11, 0.12) 35%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Header Badge & Title */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(245, 158, 11, 0.16)',
                            border: '1px solid rgba(245, 158, 11, 0.45)',
                            padding: '6px 18px',
                            borderRadius: '999px',
                            marginBottom: '14px',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>🏆</span>
                        <span
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: '0.86rem',
                                fontWeight: 900,
                                color: '#FCD34D',
                                textTransform: 'uppercase',
                                letterSpacing: '1.4px',
                            }}
                        >
                            Official Verified Results • Hyderabad 2026
                        </span>
                    </div>

                    <h2
                        style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            lineHeight: 1.05,
                            margin: '0 0 14px',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        CONGRATULATIONS TO OUR <span style={{ color: '#F59E0B' }}>PODIUM CHAMPIONS!</span>
                    </h2>

                    <p
                        style={{
                            color: '#CBD5E1',
                            fontSize: 'clamp(0.96rem, 2vw, 1.12rem)',
                            maxWidth: '780px',
                            margin: '0 auto 20px',
                            lineHeight: 1.6,
                        }}
                    >
                        Celebrating the extraordinary speed, determination, and sportsmanship of our top 10K and 5K finishers at the inaugural ESCI Hyderabad edition. Proudly awarded with <strong>100% equal cash prize parity</strong> across Men and Women divisions.
                    </p>

                    {/* Equal Prize Parity Pill */}
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid rgba(16, 185, 129, 0.4)',
                            padding: '8px 20px',
                            borderRadius: '999px',
                            fontSize: '0.86rem',
                            fontWeight: 800,
                            color: '#A7F3D0',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        <span>⚖️ <strong>₹60,000 Equal Prize Pool</strong></span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>⏱️ <strong>Electronic RFID Chip-Timed</strong></span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>🎓 <strong>UN SDG 4 Quality Education</strong></span>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px',
                        marginBottom: '38px',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { id: '10k', label: '10K WINNERS (₹40K POOL)', badge: '6 PODIUMS' },
                        { id: '5k', label: '5K WINNERS (₹20K POOL)', badge: '6 PODIUMS' },
                        { id: 'posters', label: 'OFFICIAL CREATIVES', badge: 'POSTERS' },
                        { id: 'ceremony', label: 'STAGE CEREMONY', badge: '4 PHOTOS' },
                    ].map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 22px',
                                    borderRadius: '999px',
                                    border: active ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.2)',
                                    background: active ? '#F59E0B' : 'rgba(15, 30, 51, 0.8)',
                                    color: active ? '#0c1e33' : '#E2E8F0',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: active ? '0 8px 24px rgba(245, 158, 11, 0.35)' : 'none',
                                }}
                            >
                                <span>{tab.label}</span>
                                <span
                                    style={{
                                        fontSize: '0.72rem',
                                        padding: '2px 7px',
                                        borderRadius: '999px',
                                        background: active ? '#0c1e33' : 'rgba(255,255,255,0.12)',
                                        color: active ? '#FCD34D' : '#CBD5E1',
                                        fontWeight: 800,
                                    }}
                                >
                                    {tab.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* 10K / 5K Winners Grid */}
                {(activeTab === '10k' || activeTab === '5k') && (
                    <div>
                        {/* Division Header Banner */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '16px',
                                padding: '16px 24px',
                                marginBottom: '28px',
                                flexWrap: 'wrap',
                                gap: '14px',
                            }}
                        >
                            <div>
                                <span
                                    style={{
                                        fontSize: '0.76rem',
                                        fontWeight: 800,
                                        color: '#F59E0B',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.2px',
                                    }}
                                >
                                    {currentCat.distanceBadge}
                                </span>
                                <h3
                                    style={{
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: '1.8rem',
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        margin: '2px 0 0',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {currentCat.distance}
                                </h3>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <span
                                    style={{
                                        background: 'rgba(37, 99, 235, 0.25)',
                                        border: '1px solid rgba(37, 99, 235, 0.6)',
                                        color: '#93C5FD',
                                        fontSize: '0.85rem',
                                        fontWeight: 800,
                                        padding: '5px 14px',
                                        borderRadius: '999px',
                                    }}
                                >
                                    {currentCat.prizePool}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPoster(currentCat.posterSrc)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        color: '#FFFFFF',
                                        fontSize: '0.82rem',
                                        fontWeight: 800,
                                        padding: '5px 14px',
                                        borderRadius: '999px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    🖼️ View Official Poster ↗
                                </button>
                            </div>
                        </div>

                        {/* Men & Women 2-Column Grid */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
                                gap: '28px',
                            }}
                        >
                            {/* Men's Division */}
                            <div
                                style={{
                                    background: 'rgba(15, 23, 42, 0.75)',
                                    border: '1.5px solid rgba(59, 130, 246, 0.35)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                                        paddingBottom: '14px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '1.6rem' }}>🏃‍♂️</span>
                                        <div>
                                            <span style={{ fontSize: '0.72rem', color: '#93C5FD', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Open Category
                                            </span>
                                            <h4
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '1.6rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    margin: 0,
                                                    color: '#FFFFFF',
                                                }}
                                            >
                                                {activeTab.toUpperCase()} MEN • TOP 3
                                            </h4>
                                        </div>
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '0.85rem',
                                            fontWeight: 800,
                                            color: '#60A5FA',
                                            letterSpacing: '0.8px',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        OFFICIAL CHIP TIME
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {currentCat.men.map((runner) => {
                                        const theme = getMedalColor(runner.medal);
                                        return (
                                            <div
                                                key={runner.bib}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    border: `1.5px solid ${theme.border}`,
                                                    borderRadius: '14px',
                                                    padding: '16px 18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '16px',
                                                    boxShadow: `0 6px 20px ${theme.glow}`,
                                                    transition: 'transform 0.2s ease',
                                                }}
                                            >
                                                {/* Left: Medal & Runner Info */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                    <div
                                                        style={{
                                                            width: '46px',
                                                            height: '46px',
                                                            borderRadius: '50%',
                                                            background: theme.bg,
                                                            border: `2px solid ${theme.border}`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '1.4rem',
                                                            fontWeight: 900,
                                                            color: theme.text,
                                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {runner.rank}
                                                    </div>

                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                            <span
                                                                style={{
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: 900,
                                                                    color: theme.badge,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.6px',
                                                                }}
                                                            >
                                                                {theme.title}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                                    padding: '2px 8px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '0.74rem',
                                                                    fontWeight: 800,
                                                                    color: '#CBD5E1',
                                                                    letterSpacing: '0.5px',
                                                                }}
                                                            >
                                                                BIB {runner.bib}
                                                            </span>
                                                        </div>

                                                        <div
                                                            style={{
                                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                                fontSize: '1.45rem',
                                                                fontWeight: 900,
                                                                color: '#FFFFFF',
                                                                textTransform: 'uppercase',
                                                                marginTop: '2px',
                                                            }}
                                                        >
                                                            {runner.name}
                                                        </div>

                                                        <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>
                                                            💰 Awarded: {runner.prize}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Chip Time */}
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Net Chip Time
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontFamily: "'Barlow Condensed', sans-serif",
                                                            fontSize: '1.65rem',
                                                            fontWeight: 900,
                                                            color: '#FCD34D',
                                                            letterSpacing: '1px',
                                                        }}
                                                    >
                                                        {runner.chipTime}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Women's Division */}
                            <div
                                style={{
                                    background: 'rgba(15, 23, 42, 0.75)',
                                    border: '1.5px solid rgba(239, 68, 68, 0.4)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '2px solid rgba(239, 68, 68, 0.35)',
                                        paddingBottom: '14px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '1.6rem' }}>🏃‍♀️</span>
                                        <div>
                                            <span style={{ fontSize: '0.72rem', color: '#FCA5A5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                Open Category
                                            </span>
                                            <h4
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '1.6rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    margin: 0,
                                                    color: '#FFFFFF',
                                                }}
                                            >
                                                {activeTab.toUpperCase()} WOMEN • TOP 3
                                            </h4>
                                        </div>
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '0.85rem',
                                            fontWeight: 800,
                                            color: '#F87171',
                                            letterSpacing: '0.8px',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        OFFICIAL CHIP TIME
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {currentCat.women.map((runner) => {
                                        const theme = getMedalColor(runner.medal);
                                        return (
                                            <div
                                                key={runner.bib}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.03)',
                                                    border: `1.5px solid ${theme.border}`,
                                                    borderRadius: '14px',
                                                    padding: '16px 18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '16px',
                                                    boxShadow: `0 6px 20px ${theme.glow}`,
                                                    transition: 'transform 0.2s ease',
                                                }}
                                            >
                                                {/* Left: Medal & Runner Info */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                    <div
                                                        style={{
                                                            width: '46px',
                                                            height: '46px',
                                                            borderRadius: '50%',
                                                            background: theme.bg,
                                                            border: `2px solid ${theme.border}`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '1.4rem',
                                                            fontWeight: 900,
                                                            color: theme.text,
                                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {runner.rank}
                                                    </div>

                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                            <span
                                                                style={{
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: 900,
                                                                    color: theme.badge,
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.6px',
                                                                }}
                                                            >
                                                                {theme.title}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    background: 'rgba(255, 255, 255, 0.08)',
                                                                    padding: '2px 8px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '0.74rem',
                                                                    fontWeight: 800,
                                                                    color: '#CBD5E1',
                                                                    letterSpacing: '0.5px',
                                                                }}
                                                            >
                                                                BIB {runner.bib}
                                                            </span>
                                                        </div>

                                                        <div
                                                            style={{
                                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                                fontSize: '1.45rem',
                                                                fontWeight: 900,
                                                                color: '#FFFFFF',
                                                                textTransform: 'uppercase',
                                                                marginTop: '2px',
                                                            }}
                                                        >
                                                            {runner.name}
                                                        </div>

                                                        <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>
                                                            💰 Awarded: {runner.prize}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Chip Time */}
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Net Chip Time
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontFamily: "'Barlow Condensed', sans-serif",
                                                            fontSize: '1.65rem',
                                                            fontWeight: 900,
                                                            color: '#FCD34D',
                                                            letterSpacing: '1px',
                                                        }}
                                                    >
                                                        {runner.chipTime}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Posters Tab */}
                {activeTab === 'posters' && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                            gap: '32px',
                            alignItems: 'start',
                        }}
                    >
                        {/* 10K Poster Card */}
                        <div
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                                border: '2px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <div style={{ padding: '20px', background: '#071324', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '0.74rem', color: '#F59E0B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Official Winner Poster
                                    </span>
                                    <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>
                                        10K GLOBAL GOALS WINNERS
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPoster('/assets/editions/oct18-10k-winners.jpg')}
                                    style={{
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Enlarge 🔍
                                </button>
                            </div>
                            <img
                                src="/assets/editions/oct18-10k-winners.jpg"
                                alt="Congratulations 10K Winners Poster - FLEXATHON 2026 Hyderabad"
                                onClick={() => setSelectedPoster('/assets/editions/oct18-10k-winners.jpg')}
                                style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
                            />
                        </div>

                        {/* 5K Poster Card */}
                        <div
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                                border: '2px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <div style={{ padding: '20px', background: '#071324', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '0.74rem', color: '#38BDF8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Official Winner Poster
                                    </span>
                                    <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>
                                        5K FITNESS RUN WINNERS
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPoster('/assets/editions/oct18-5k-winners.jpg')}
                                    style={{
                                        background: '#2563EB',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Enlarge 🔍
                                </button>
                            </div>
                            <img
                                src="/assets/editions/oct18-5k-winners.jpg"
                                alt="Congratulations 5K Winners Poster - FLEXATHON 2026 Hyderabad"
                                onClick={() => setSelectedPoster('/assets/editions/oct18-5k-winners.jpg')}
                                style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

                {/* Ceremony Photos Tab */}
                {activeTab === 'ceremony' && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                            gap: '24px',
                        }}
                    >
                        {ceremonyPhotos.map((photo, i) => (
                            <div
                                key={i}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease',
                                }}
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    style={{ width: '100%', height: '240px', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
                                />
                                <div style={{ padding: '16px 18px' }}>
                                    <div
                                        style={{
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontSize: '1.25rem',
                                            fontWeight: 800,
                                            color: '#FCD34D',
                                            textTransform: 'uppercase',
                                            marginBottom: '6px',
                                        }}
                                    >
                                        {photo.title}
                                    </div>
                                    <p style={{ fontSize: '0.86rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                                        {photo.caption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Actions Row */}
                <div
                    style={{
                        marginTop: '36px',
                        paddingTop: '28px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    <div style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
                        Need to generate your finisher e-certificate or timing bib badge?
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                            href="/hydoct18/results"
                            style={{
                                background: '#C5192D',
                                color: '#FFFFFF',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                letterSpacing: '0.8px',
                            }}
                        >
                            Lookup All Finisher Times & Certs →
                        </Link>
                        <Link
                            href="/hydoct18/prize-details"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                color: '#FFFFFF',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                letterSpacing: '0.8px',
                            }}
                        >
                            Full ₹60K Prize Structure
                        </Link>
                    </div>
                </div>
            </div>

            {/* Poster Lightbox Modal */}
            {selectedPoster && (
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelectedPoster(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(3, 7, 18, 0.92)',
                        zIndex: 999999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '720px',
                            maxHeight: '92vh',
                            position: 'relative',
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedPoster(null)}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#0F172A',
                                color: '#FFFFFF',
                                border: '2px solid #FFFFFF',
                                fontSize: '1.2rem',
                                fontWeight: 900,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                            }}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedPoster}
                            alt="Official Winners Poster"
                            style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
