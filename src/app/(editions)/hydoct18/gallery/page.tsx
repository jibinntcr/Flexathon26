'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getEditionBySlug } from '@/lib/editions';

export default function HyderabadGalleryPage() {
    const edition = getEditionBySlug('hydoct18');
    const items = edition?.imageGallery || [];
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];
    const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory);

    useEffect(() => {
        if (lightboxIdx === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIdx(null);
            if (e.key === 'ArrowRight') setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
            if (e.key === 'ArrowLeft') setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [lightboxIdx, filtered.length]);

    const currentLightboxItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="gallery" />
            <main>
                <section style={{ background: 'linear-gradient(135deg, #071324 0%, #1e293b 100%)', color: '#FFFFFF', padding: '56px 24px', borderBottom: '3px solid #C5192D' }}>
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '14px', fontSize: '0.84rem', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link href="/hydoct18" style={{ color: '#93C5FD', textDecoration: 'none', fontWeight: 700 }}>
                                ← Back to Hyderabad 2026 Flagship Hub
                            </Link>
                            <span style={{ color: '#475569' }}>|</span>
                            <Link href="/hydoct18/results" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                                📄 Download Finisher E-Certificate →
                            </Link>
                        </div>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(16, 185, 129, 0.2)',
                                border: '1px solid rgba(52, 211, 153, 0.45)',
                                color: '#6EE7B7',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.2px',
                                padding: '5px 14px',
                                borderRadius: '999px',
                                marginBottom: '14px',
                            }}
                        >
                            ✓ Hyderabad 2026 — Official Visual Archive ({items.length} Curated Highlights)
                        </span>
                        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 12px', lineHeight: 1.05 }}>
                            HYDERABAD 2026 RACE DAY &amp; COMMUNITY GALLERY
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.02rem', maxWidth: '740px', lineHeight: 1.6, margin: 0 }}>
                            Explore starting line assembly, course hydration, 10K/5K/3K runner moments, and UN SDG 4 Quality Education highlights from FLEXATHON 2026 Hyderabad (`18 October 2026 • ESCI Campus, Gachibowli`). Click any photo to inspect full-screen.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '48px 24px 72px', maxWidth: '1240px', margin: '0 auto' }}>
                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px', alignItems: 'center' }}>
                        {categories.map((cat) => {
                            const active = activeCategory === cat;
                            const count = cat === 'All' ? items.length : items.filter((i) => i.category === cat).length;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setLightboxIdx(null);
                                    }}
                                    style={{
                                        padding: '9px 18px',
                                        borderRadius: '999px',
                                        border: active ? '1px solid #C5192D' : '1px solid #CBD5E1',
                                        background: active ? '#C5192D' : '#FFFFFF',
                                        color: active ? '#FFFFFF' : '#334155',
                                        fontWeight: 800,
                                        fontSize: '0.86rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {cat} ({count})
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '24px' }}>
                        {filtered.map((item, idx) => (
                            <figure
                                key={item.id}
                                onClick={() => setLightboxIdx(idx)}
                                style={{
                                    margin: 0,
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 24px rgba(12, 30, 51, 0.05)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                            >
                                <div style={{ height: '245px', background: '#0f172a', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                    <span
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            right: '12px',
                                            background: 'rgba(7, 19, 36, 0.78)',
                                            color: '#FFFFFF',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            padding: '5px 10px',
                                            borderRadius: '8px',
                                            backdropFilter: 'blur(4px)',
                                        }}
                                    >
                                        🔍 View Fullscreen
                                    </span>
                                </div>
                                <figcaption style={{ padding: '18px 20px' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {item.category} • Hyderabad 2026
                                    </span>
                                    <p style={{ margin: '6px 0 0', fontSize: '0.94rem', fontWeight: 600, color: '#0c1e33', lineHeight: 1.5 }}>
                                        {item.caption}
                                    </p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    {/* Runner Card & Certificate CTA Banner */}
                    <div
                        style={{
                            marginTop: '48px',
                            background: 'linear-gradient(135deg, #071324 0%, #0f243c 100%)',
                            color: '#FFFFFF',
                            borderRadius: '20px',
                            padding: '36px 32px',
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 10px' }}>
                            Download Your Personalized Runner Card &amp; Finisher E-Certificate
                        </h2>
                        <p style={{ color: '#CBD5E1', fontSize: '0.96rem', maxWidth: '660px', margin: '0 auto 22px', lineHeight: 1.6 }}>
                            All Hyderabad 2026 participants can generate and download their personalized 1254×1254 social card and print-ready Finisher E-Certificate right now.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                            <Link
                                href="/hydoct18/social-card"
                                style={{
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.05rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    padding: '13px 26px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                }}
                            >
                                🪪 Open Runner Card Studio →
                            </Link>
                            <Link
                                href="/hydoct18/results"
                                style={{
                                    background: '#10B981',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.05rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    padding: '13px 26px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                }}
                            >
                                📄 Finisher E-Certificate Studio →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* FULLSCREEN LIGHTBOX MODAL */}
            {currentLightboxItem && lightboxIdx !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setLightboxIdx(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(7, 19, 36, 0.92)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '960px',
                            width: '100%',
                            background: '#0F172A',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.16)',
                            overflow: 'hidden',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {currentLightboxItem.category} • Photo {lightboxIdx + 1} of {filtered.length}
                            </span>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <a
                                    href={currentLightboxItem.src}
                                    download
                                    style={{
                                        background: 'rgba(255,255,255,0.12)',
                                        color: '#FFFFFF',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    ⬇️ Save Image
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setLightboxIdx(null)}
                                    style={{
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '6px 12px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                    }}
                                >
                                    ✕ Close
                                </button>
                            </div>
                        </div>

                        <div style={{ position: 'relative', background: '#050B14', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '70vh' }}>
                            <img
                                src={currentLightboxItem.src}
                                alt={currentLightboxItem.alt}
                                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                            />
                        </div>

                        <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: '#FFFFFF' }}>
                            <p style={{ margin: 0, fontSize: '0.96rem', fontWeight: 600, color: '#E2E8F0' }}>
                                {currentLightboxItem.caption}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        padding: '8px 14px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                    }}
                                >
                                    ← Prev
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLightboxIdx((lightboxIdx + 1) % filtered.length)}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        padding: '8px 14px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
