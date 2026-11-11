'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImpactPage() {
    const governanceSteps = [
        {
            step: '01',
            title: 'Edition-Specific SDG Selection',
            desc: 'Each city edition selects one or more UN Sustainable Development Goals aligned with local community needs — starting with SDG 4 (Quality Education) in Hyderabad 2026.',
        },
        {
            step: '02',
            title: 'Multi-Sector City Mobilization',
            desc: 'Bringing schools, universities, running clubs, corporate wellness teams, and local NGOs together on a shared starting line.',
        },
        {
            step: '03',
            title: 'Responsible Race Operations',
            desc: 'Designing hydration, waste recovery, digital runner cards, and e-certificates to minimize environmental footprint.',
        },
        {
            step: '04',
            title: 'Verified Reporting Only',
            desc: 'Publishing only confirmed edition milestones, documented partnerships, and audited post-edition outcomes without inflated estimates.',
        },
        {
            step: '05',
            title: 'Continuity Across Host Cities',
            desc: 'Carrying lessons, community networks, and accountability standards from Hyderabad 2026 forward to Kochi and future host cities.',
        },
    ];

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
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
                            Impact, Transparency &amp; Governance
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
                            BEYOND THE FINISH LINE.
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '760px', lineHeight: 1.65, margin: 0 }}>
                            Organised by Flexon Sports Foundation, FLEXATHON measures success by authentic community participation, preventive health awareness, and transparent alignment with the 17 Global Goals.
                        </p>
                    </div>
                </section>

                {/* Verified Platform Milestones */}
                <section style={{ padding: '72px 24px', maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '36px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                            Confirmed Platform Record
                        </span>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '6px 0 0' }}>
                            Verified Milestones Across Editions
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '64px' }}>
                        {[
                            {
                                metric: '01 Completed Edition',
                                title: 'Hyderabad 2026 (18 Oct 2026)',
                                detail: 'Successfully concluded at ESCI Campus, Gachibowli across 3K, 5K, and 10K categories.',
                                link: '/hydoct18',
                                linkText: 'View Hyderabad Archive →',
                            },
                            {
                                metric: 'SDG 4 Spotlight',
                                title: 'Quality Education Focus',
                                detail: 'Inaugural edition dedicated to inclusive, equitable learning opportunities and campus engagement.',
                                link: '/hydoct18/global-goal',
                                linkText: 'Explore SDG 4 Campaign →',
                            },
                            {
                                metric: 'Next Host City: Kochi',
                                title: 'Kerala Edition Announced',
                                detail: 'Expanding the movement to Kochi, Kerala with community interest registration now open.',
                                link: '/kochi2027',
                                linkText: 'Explore Kochi Edition →',
                            },
                            {
                                metric: '17 Global Goals',
                                title: 'Shared Movement Framework',
                                detail: 'Every edition connects preventive fitness (SDG 3) and community partnerships (SDG 17) with local causes.',
                                link: '/global-goals',
                                linkText: 'View All 17 Goals →',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, color: '#C5192D', textTransform: 'uppercase' }}>
                                        {item.metric}
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0c1e33', margin: '8px 0' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 18px' }}>
                                        {item.detail}
                                    </p>
                                </div>
                                <Link href={item.link} style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', textDecoration: 'none' }}>
                                    {item.linkText}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* 5-Step Governance Framework */}
                    <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '44px 36px' }}>
                        <div style={{ maxWidth: '720px', marginBottom: '36px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                                Impact Methodology
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.4rem', fontWeight: 900, textTransform: 'uppercase', margin: '6px 0 10px' }}>
                                Our 5-Step Impact &amp; Accountability Framework
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                                Flexon Sports Foundation follows a disciplined framework for every city edition so community claims remain grounded in real actions.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                            {governanceSteps.map((s) => (
                                <div key={s.step} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px' }}>
                                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: '#C5192D' }}>
                                        {s.step}
                                    </div>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.35rem', fontWeight: 800, textTransform: 'uppercase', margin: '6px 0 8px' }}>
                                        {s.title}
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
