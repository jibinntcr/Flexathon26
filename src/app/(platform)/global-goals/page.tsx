'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { OFFICIAL_SDGS, SDGGoal } from '@/lib/sdgs';

export default function GlobalGoalsPage() {
    const [selectedGoal, setSelectedGoal] = useState<SDGGoal | null>(null);

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
                {/* Hero */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #091526 0%, #0f243c 60%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: '72px 24px',
                    }}
                >
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(197, 25, 45, 0.25)',
                                border: '1px solid rgba(251, 113, 133, 0.45)',
                                color: '#FECDD3',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.4px',
                                padding: '5px 14px',
                                borderRadius: '999px',
                                marginBottom: '16px',
                            }}
                        >
                            The 17 Sustainable Development Goals Framework
                        </span>
                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '0 0 14px',
                                lineHeight: 1.06,
                            }}
                        >
                            17 GLOBAL GOALS. ONE SHARED FUTURE.
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '780px', lineHeight: 1.65, margin: '0 0 20px' }}>
                            The 17 United Nations Sustainable Development Goals form the guiding framework of FLEXATHON — The Global Goals Run. While <strong>Goal 3: Good Health and Well-being</strong> is an inherent foundation of running, each city edition may spotlight one or more specific goals. <strong>Hyderabad 2026</strong> championed <strong>Goal 4: Quality Education</strong>; the featured Global Goal for the upcoming <strong>Kochi Edition</strong> will be published once confirmed.
                        </p>
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.16)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                fontSize: '0.82rem',
                                color: '#E2E8F0',
                                maxWidth: '780px',
                            }}
                        >
                            <strong>Independent Initiative Notice:</strong> FLEXATHON is organised by Flexon Sports Foundation and references the 17 UN SDGs for community education and awareness. It is not affiliated with or endorsed by the United Nations.
                        </div>
                    </div>
                </section>

                {/* All 17 Goals Directory */}
                <section style={{ padding: '72px 24px', maxWidth: '1320px', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                            gap: '24px',
                        }}
                    >
                        {OFFICIAL_SDGS.map((goal) => (
                            <article
                                key={goal.id}
                                id={`goal-${goal.id}`}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    border: `1.5px solid ${goal.id === 4 ? goal.color : '#E2E8F0'}`,
                                    borderTop: `6px solid ${goal.color}`,
                                    padding: '28px',
                                    boxShadow: '0 10px 28px rgba(12, 30, 51, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                        <img
                                            src={goal.logo}
                                            alt={`Goal ${goal.id}: ${goal.title}`}
                                            style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'contain', flexShrink: 0 }}
                                        />
                                        <div>
                                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: goal.color, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                                Global Goal {goal.id}
                                            </div>
                                            <h2
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '1.75rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    margin: '2px 0 0',
                                                    color: '#0c1e33',
                                                    lineHeight: 1.08,
                                                }}
                                            >
                                                {goal.title}
                                            </h2>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
                                        {goal.description}
                                    </p>

                                    <div
                                        style={{
                                            background: '#F8FAFC',
                                            padding: '14px',
                                            borderRadius: '12px',
                                            border: '1px solid #E2E8F0',
                                            fontSize: '0.86rem',
                                            color: '#334155',
                                            lineHeight: 1.55,
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <strong style={{ color: '#0c1e33', display: 'block', marginBottom: '4px' }}>
                                            Sport &amp; Community Relevance:
                                        </strong>
                                        {goal.sportConnection}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                                    {goal.linkedEditions.length > 0 ? (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {goal.linkedEditions.map((ed) => (
                                                <Link
                                                    key={ed.slug}
                                                    href={ed.slug}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        background: '#FEF2F2',
                                                        border: '1px solid #FECACA',
                                                        color: '#C5192D',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 800,
                                                        padding: '5px 12px',
                                                        borderRadius: '999px',
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    Featured: {ed.name} ({ed.status}) →
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                                            Framework Goal • Open for Future Editions
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setSelectedGoal(goal)}
                                        style={{
                                            background: 'transparent',
                                            border: `1px solid ${goal.color}`,
                                            color: goal.color,
                                            borderRadius: '8px',
                                            padding: '6px 12px',
                                            fontSize: '0.78rem',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Action Focus
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Accessible Modal for Goal Action Focus */}
                {selectedGoal && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="sdg-modal-title"
                        onClick={() => setSelectedGoal(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(12, 30, 51, 0.72)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '24px',
                        }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '20px',
                                maxWidth: '580px',
                                width: '100%',
                                padding: '32px',
                                borderTop: `8px solid ${selectedGoal.color}`,
                                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <img src={selectedGoal.logo} alt={selectedGoal.title} style={{ width: '56px', height: '56px', borderRadius: '8px' }} />
                                    <div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: selectedGoal.color, textTransform: 'uppercase' }}>
                                            Goal {selectedGoal.id} of 17
                                        </span>
                                        <h3 id="sdg-modal-title" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                                            {selectedGoal.title}
                                        </h3>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedGoal(null)}
                                    aria-label="Close modal"
                                    style={{ background: '#F1F5F9', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 800, cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.65, marginBottom: '14px' }}>
                                <strong>Official Goal Target:</strong> {selectedGoal.tagline}
                            </p>
                            <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, marginBottom: '14px' }}>
                                <strong>Sport Connection:</strong> {selectedGoal.sportConnection}
                            </p>
                            <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, marginBottom: '20px' }}>
                                <strong>Community Action:</strong> {selectedGoal.communityAction}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                <Link
                                    href="/partners#partner-enquiry"
                                    style={{
                                        background: selectedGoal.color,
                                        color: '#FFFFFF',
                                        padding: '10px 18px',
                                        borderRadius: '8px',
                                        fontWeight: 700,
                                        fontSize: '0.86rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Collaborate on Goal {selectedGoal.id} →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
