'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getPublishedEditions, getEditionCtaConfig } from '@/lib/editions';

export default function EditionsPage() {
    const allEditions = getPublishedEditions();
    const [statusFilter, setStatusFilter] = useState<'All' | 'Coming Soon' | 'Completed'>('All');

    const filteredEditions =
        statusFilter === 'All'
            ? allEditions
            : allEditions.filter((ed) => ed.status === statusFilter);

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
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
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
                            FLEXATHON City Editions Directory
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
                            EVERY CITY. A NEW STARTING LINE.
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.65, margin: 0 }}>
                            Explore completed, announced, and upcoming city editions of FLEXATHON — The Global Goals Run, organised by Flexon Sports Foundation. Each edition carries its own route, community partners, and Global Goal focus.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '64px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
                        {(['All', 'Coming Soon', 'Completed'] as const).map((tab) => {
                            const active = statusFilter === tab;
                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setStatusFilter(tab)}
                                    style={{
                                        padding: '10px 22px',
                                        borderRadius: '999px',
                                        border: active ? '1px solid #C5192D' : '1px solid #CBD5E1',
                                        background: active ? '#C5192D' : '#FFFFFF',
                                        color: active ? '#FFFFFF' : '#334155',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {tab === 'All' ? 'All Editions (2)' : tab}
                                </button>
                            );
                        })}
                    </div>

                    {/* Edition Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '32px' }}>
                        {filteredEditions.map((ed) => {
                            const cta = getEditionCtaConfig(ed);
                            const isCompleted = ed.status === 'Completed';
                            return (
                                <article
                                    key={ed.id}
                                    style={{
                                        background: '#FFFFFF',
                                        borderRadius: '22px',
                                        border: '1px solid #E2E8F0',
                                        overflow: 'hidden',
                                        boxShadow: '0 14px 36px rgba(12, 30, 51, 0.06)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div>
                                        <div style={{ position: 'relative', height: '250px', background: '#0c1e33', overflow: 'hidden' }}>
                                            <img
                                                src={ed.heroAsset}
                                                alt={ed.editionName}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '16px',
                                                    left: '16px',
                                                    background: isCompleted ? '#10B981' : '#C5192D',
                                                    color: '#FFFFFF',
                                                    padding: '6px 14px',
                                                    borderRadius: '999px',
                                                    fontSize: '0.76rem',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                }}
                                            >
                                                {isCompleted ? '✓ Completed • Official Archive' : '⚡ Coming Soon • Next Host City'}
                                            </div>
                                        </div>

                                        <div style={{ padding: '28px' }}>
                                            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '6px' }}>
                                                {ed.city}, {ed.state}
                                            </div>
                                            <h2
                                                style={{
                                                    fontFamily: "'Barlow Condensed', sans-serif",
                                                    fontSize: '2.3rem',
                                                    fontWeight: 900,
                                                    textTransform: 'uppercase',
                                                    margin: '0 0 12px',
                                                    color: '#0c1e33',
                                                }}
                                            >
                                                {ed.editionName}
                                            </h2>
                                            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '22px' }}>
                                                {ed.description}
                                            </p>

                                            <div
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr',
                                                    gap: '12px',
                                                    background: '#F8FAFC',
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    border: '1px solid #E2E8F0',
                                                    fontSize: '0.84rem',
                                                }}
                                            >
                                                <div>
                                                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Event Date
                                                    </span>
                                                    <strong style={{ color: '#0c1e33' }}>{ed.eventDateDisplay}</strong>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Venue
                                                    </span>
                                                    <strong style={{ color: '#0c1e33' }}>
                                                        {ed.city === 'Hyderabad' ? 'ESCI, Gachibowli' : 'To Be Announced'}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Race Categories
                                                    </span>
                                                    <strong style={{ color: '#0c1e33' }}>
                                                        {ed.raceCategories.length > 0
                                                            ? ed.raceCategories.map((c) => c.distance).join(' / ')
                                                            : 'To Be Announced'}
                                                    </strong>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                        Global Goal Focus
                                                    </span>
                                                    <strong style={{ color: '#C5192D' }}>
                                                        {ed.sdgFocusIds.includes(4) ? 'SDG 4: Quality Education' : 'To Be Announced'}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {isCompleted && (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <Link
                                                    href="/hydoct18/results"
                                                    style={{
                                                        background: '#F8FAFC',
                                                        border: '1px solid #CBD5E1',
                                                        color: '#0c1e33',
                                                        fontWeight: 700,
                                                        fontSize: '0.8rem',
                                                        padding: '9px 12px',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    ⏱️ Results &amp; Certs
                                                </Link>
                                                <Link
                                                    href="/hydoct18/social-card"
                                                    style={{
                                                        background: '#F8FAFC',
                                                        border: '1px solid #CBD5E1',
                                                        color: '#0c1e33',
                                                        fontWeight: 700,
                                                        fontSize: '0.8rem',
                                                        padding: '9px 12px',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    🪪 Runner Card Studio
                                                </Link>
                                            </div>
                                        )}
                                        <Link
                                            href={cta.primaryHref}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                width: '100%',
                                                background: isCompleted ? '#0c1e33' : '#C5192D',
                                                color: '#FFFFFF',
                                                fontFamily: "'Barlow Condensed', sans-serif",
                                                fontWeight: 800,
                                                fontSize: '1.08rem',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                padding: '14px 20px',
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {cta.primaryLabel} →
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Host City Proposal Callout */}
                    <div
                        style={{
                            marginTop: '56px',
                            background: 'linear-gradient(135deg, #0c1e33 0%, #1e293b 100%)',
                            color: '#FFFFFF',
                            borderRadius: '22px',
                            padding: '40px 36px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '24px',
                        }}
                    >
                        <div style={{ maxWidth: '680px' }}>
                            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                                City Host &amp; Institutional Collaborations
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: '6px 0 10px' }}>
                                Want to Bring FLEXATHON to Your City or Campus?
                            </h2>
                            <p style={{ color: '#CBD5E1', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
                                We partner with universities, running clubs, civic bodies, and CSR leaders to launch new city editions only when full operational, safety, and venue standards are verified.
                            </p>
                        </div>
                        <Link
                            href="/contact?category=Host+City+Proposal"
                            style={{
                                background: '#C5192D',
                                color: '#FFFFFF',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.05rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                padding: '14px 28px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                            }}
                        >
                            Submit a Host City Enquiry →
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
