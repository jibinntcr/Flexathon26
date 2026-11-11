'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getPublishedEditions } from '@/lib/editions';

export default function MasterGalleryPage() {
    const editions = getPublishedEditions();
    const [editionFilter, setEditionFilter] = useState<'all' | 'hydoct18' | 'kochi2027'>('all');
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    const allGalleryItems = editions.flatMap((ed) =>
        ed.imageGallery.map((item) => ({
            ...item,
            editionSlug: ed.slug,
            editionName: ed.editionName,
            editionStatus: ed.status,
        }))
    );

    const filteredItems =
        editionFilter === 'all'
            ? allGalleryItems
            : allGalleryItems.filter((item) => item.editionSlug === editionFilter);

    useEffect(() => {
        if (lightboxIdx === null) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxIdx(null);
            if (e.key === 'ArrowRight') setLightboxIdx((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
            if (e.key === 'ArrowLeft') setLightboxIdx((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [lightboxIdx, filteredItems.length]);

    const currentItem = lightboxIdx !== null ? filteredItems[lightboxIdx] : null;

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="gallery" />
            <main>
                <section
                    style={{
                        background: 'linear-gradient(135deg, #071324 0%, #0f243c 60%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: '64px 24px',
                        borderBottom: '3px solid #C5192D',
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
                            Multi-City Visual Archive ({allGalleryItems.length} Curated Moments)
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
                            FLEXATHON RACE &amp; COMMUNITY GALLERY
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.65, margin: 0 }}>
                            Authentic race-day, course, hydration, and community moments filtered by city edition. Click any photograph to inspect full-screen.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '56px 24px 72px', maxWidth: '1280px', margin: '0 auto' }}>
                    {/* Edition Filter Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
                        {[
                            { id: 'all', label: `All Editions (${allGalleryItems.length})` },
                            { id: 'hydoct18', label: 'Hyderabad 2026 Flagship Archive (12)' },
                            { id: 'kochi2027', label: 'Kochi Edition — Next Host City (1)' },
                        ].map((tab) => {
                            const active = editionFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => {
                                        setEditionFilter(tab.id as 'all' | 'hydoct18' | 'kochi2027');
                                        setLightboxIdx(null);
                                    }}
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
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Gallery Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))', gap: '28px' }}>
                        {filteredItems.map((item, idx) => (
                            <figure
                                key={item.id}
                                onClick={() => setLightboxIdx(idx)}
                                style={{
                                    margin: 0,
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 28px rgba(12, 30, 51, 0.05)',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ height: '245px', background: '#0c1e33', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            background: item.editionSlug === 'hydoct18' ? '#10B981' : '#C5192D',
                                            color: '#FFFFFF',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.8px',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                        }}
                                    >
                                        {item.editionName}
                                    </span>
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
                                        }}
                                    >
                                        🔍 Fullscreen
                                    </span>
                                </div>
                                <figcaption style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {item.category} • {item.editionStatus}
                                    </div>
                                    <p style={{ margin: '6px 0 0', fontSize: '0.95rem', fontWeight: 600, color: '#0c1e33', lineHeight: 1.5 }}>
                                        {item.caption}
                                    </p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    {editionFilter === 'kochi2027' && (
                        <div
                            style={{
                                marginTop: '36px',
                                background: '#FFFFFF',
                                border: '1px solid #E2E8F0',
                                borderRadius: '18px',
                                padding: '32px',
                                textAlign: 'center',
                            }}
                        >
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 8px' }}>
                                Kochi Edition Visuals — Coming Soon
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.94rem', maxWidth: '600px', margin: '0 auto 18px', lineHeight: 1.6 }}>
                                Official venue, course, and community media for the Kochi Edition will be added here as soon as race dates and locations are confirmed.
                            </p>
                            <Link
                                href="/kochi2027"
                                style={{
                                    display: 'inline-block',
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                }}
                            >
                                Register Interest for Kochi →
                            </Link>
                        </div>
                    )}
                </section>
            </main>

            {currentItem && lightboxIdx !== null && (
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
                                {currentItem.editionName} • {currentItem.category} ({lightboxIdx + 1} / {filteredItems.length})
                            </span>
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
                        <div style={{ background: '#050B14', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '70vh' }}>
                            <img
                                src={currentItem.src}
                                alt={currentItem.alt}
                                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                            />
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: '#FFFFFF' }}>
                            <p style={{ margin: 0, fontSize: '0.96rem', fontWeight: 600, color: '#E2E8F0' }}>
                                {currentItem.caption}
                            </p>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length)}
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
                                    onClick={() => setLightboxIdx((lightboxIdx + 1) % filteredItems.length)}
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
