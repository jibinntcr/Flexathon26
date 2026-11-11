'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HyderabadRunnerStoriesPage() {
    const stories = [
        {
            name: 'Ananya Reddy',
            category: '10K Timed Run Finisher',
            role: 'Educator & Marathoner, Gachibowli',
            quote: 'As a school teacher in Hyderabad, running a timed 10K dedicated to SDG 4 Quality Education felt deeply personal. Crossing the finish line at ESCI alongside my students and colleagues is a memory we will carry forward.',
            badge: 'SDG 4 Champion',
        },
        {
            name: 'Karthik & Family',
            category: '3K Fun Run Participants',
            role: 'First-Time Community Runners, Kondapur',
            quote: 'FLEXATHON 2026 was our 9-year-old daughter’s very first 3K bib run. Seeing families, seniors, and competitive runners share the same morning energy made healthy living feel joyful and accessible.',
            badge: 'Family & Community',
        },
        {
            name: 'Rohan Varma',
            category: '5K Timed Run Finisher',
            role: 'Corporate Wellness Lead, HITEC City',
            quote: 'Our workplace running club registered 25 colleagues for the 5K Timed Run. The organization at ESCI Gachibowli, the RFID timing accuracy, and the clear connection to Global Goals gave our team a shared sense of purpose.',
            badge: 'Corporate Cohort',
        },
        {
            name: 'Meera Nair',
            category: 'Race Crew & Volunteer Lead',
            role: 'University Student Volunteer, Hyderabad',
            quote: 'Volunteering at the 05:00 AM hydration and medal stations taught us how sport unites a city. Cheering every final-kilometre runner home reminded us why community-led movements matter.',
            badge: 'Volunteer Voice',
        },
    ];

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
                <section style={{ background: 'linear-gradient(135deg, #091526 0%, #1e293b 100%)', color: '#FFFFFF', padding: '64px 24px' }}>
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '14px', fontSize: '0.84rem' }}>
                            <Link href="/hydoct18" style={{ color: '#93C5FD', textDecoration: 'none', fontWeight: 700 }}>
                                ← Back to Hyderabad 2026 Overview
                            </Link>
                        </div>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(197, 25, 45, 0.25)',
                                border: '1px solid rgba(251, 113, 133, 0.5)',
                                color: '#FECDD3',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.2px',
                                padding: '5px 14px',
                                borderRadius: '999px',
                                marginBottom: '16px',
                            }}
                        >
                            Hyderabad 2026 — Community Voices
                        </span>
                        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 12px' }}>
                            Hyderabad 2026 Runner Stories
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.04rem', maxWidth: '700px', lineHeight: 1.6, margin: 0 }}>
                            Reflections from runners, educators, families, corporate teams, and volunteers who took part in FLEXATHON 2026 Hyderabad on 18 October 2026 at ESCI Gachibowli.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '72px 24px', maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '28px' }}>
                        {stories.map((story) => (
                            <article
                                key={story.name}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 10px 28px rgba(12, 30, 51, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            background: '#FEF2F2',
                                            color: '#C5192D',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            marginBottom: '14px',
                                        }}
                                    >
                                        {story.badge}
                                    </span>
                                    <p style={{ fontSize: '0.96rem', color: '#334155', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 20px' }}>
                                        “{story.quote}”
                                    </p>
                                </div>
                                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                                    <div style={{ fontWeight: 800, color: '#0c1e33', fontSize: '1rem' }}>{story.name}</div>
                                    <div style={{ fontSize: '0.82rem', color: '#C5192D', fontWeight: 700 }}>{story.category}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{story.role}</div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
