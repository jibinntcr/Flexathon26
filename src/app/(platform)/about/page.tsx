'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
                {/* Hero */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #091526 0%, #0f243c 60%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: '76px 24px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1240px',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                            gap: '48px',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    display: 'inline-block',
                                    background: 'rgba(197, 25, 45, 0.28)',
                                    border: '1px solid rgba(251, 113, 133, 0.5)',
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
                                About FLEXATHON — The Global Goals Run
                            </span>
                            <h1
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    lineHeight: 1.06,
                                    margin: '0 0 18px',
                                }}
                            >
                                MORE THAN A RUN.{' '}
                                <span style={{ color: '#EF4444', display: 'block' }}>A CITY-TO-CITY MOVEMENT.</span>
                            </h1>
                            <p style={{ color: '#E2E8F0', fontSize: '1.06rem', lineHeight: 1.7, marginBottom: '24px' }}>
                                FLEXATHON is a multi-city running movement organised by{' '}
                                <a href="https://flexonsports.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                                    Flexon Sports Foundation
                                </a>
                                . Guided by the framework of the 17 United Nations Sustainable Development Goals, FLEXATHON unites runners, students, families, workplaces, and civic communities under one banner: <strong>United by Sport. Driven by Global Goals.</strong>
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                                <Link
                                    href="/editions"
                                    style={{
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        padding: '14px 26px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Explore City Editions →
                                </Link>
                                <Link
                                    href="/global-goals"
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        padding: '14px 26px',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    The 17 Global Goals
                                </Link>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <img
                                src="/assets/gallery/oct18/NIX09092.JPG"
                                alt="FLEXATHON Global Goals Marathon Movement — Sunrise Assembly at ESCI Gachibowli"
                                style={{ width: '100%', maxWidth: '520px', height: '320px', objectFit: 'cover', objectPosition: 'center 42%', borderRadius: '20px', boxShadow: '0 20px 44px rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.18)' }}
                            />
                        </div>
                    </div>
                </section>

                {/* Vision, Mission & Foundation Identity */}
                <section style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '28px', marginBottom: '64px' }}>
                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)' }}>
                            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                Our Vision
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 12px' }}>
                                17 Goals. One Movement. Every City.
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                                To create India’s most trusted, inclusive city-to-city running platform where every starting line inspires preventive health, civic togetherness, and practical awareness of the 17 Global Goals.
                            </p>
                        </div>

                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)' }}>
                            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                Our Mission
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 12px' }}>
                                Accessible Sport With Accountable Purpose
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                                To organize professionally managed community and chip-timed runs across Indian cities, partnering with academic campuses, running clubs, and CSR teams to highlight local SDG priorities.
                            </p>
                        </div>

                        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)' }}>
                            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                Organising Foundation
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 12px' }}>
                                Flexon Sports Foundation
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '14px' }}>
                                FLEXATHON is conceptualized and organised by <strong>Flexon Sports Foundation</strong>, dedicated to building healthier communities through grassroots sport, athletics, and social responsibility.
                            </p>
                            <a
                                href="https://flexonsports.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#C5192D', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                            >
                                Visit flexonsports.org ↗
                            </a>
                        </div>
                    </div>

                    {/* Three Core Pillars */}
                    <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '1px solid #E2E8F0', padding: '48px 36px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                                How FLEXATHON Works
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 0' }}>
                                Three Pillars of Every Edition
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                            {[
                                {
                                    title: '1. Run for Health',
                                    desc: 'Grounded in SDG 3 (Good Health and Well-being), every edition encourages daily movement, cardiovascular fitness, and mental wellness across all ages.',
                                },
                                {
                                    title: '2. Run for Community',
                                    desc: 'Bringing students, families, senior citizens, corporate cohorts, and seasoned marathoners onto a shared, welcoming course in their own city.',
                                },
                                {
                                    title: '3. Run for Global Goals',
                                    desc: 'Each city edition may spotlight one or more of the 17 UN Sustainable Development Goals — beginning with SDG 4 (Quality Education) at Hyderabad 2026.',
                                },
                            ].map((p) => (
                                <div key={p.title} style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px', color: '#0c1e33' }}>
                                        {p.title}
                                    </h3>
                                    <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
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
