'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getPublishedEditions } from '@/lib/editions';

export default function MasterGalleryPage() {
    const editions = getPublishedEditions();
    const [editionFilter, setEditionFilter] = useState<'all' | 'hydoct18' | 'kochi2027'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [visibleCount, setVisibleCount] = useState<number>(24);
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    // Touch swipe handling for mobile lightbox
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const allGalleryItems = useMemo(() => {
        return editions.flatMap((ed) =>
            ed.imageGallery.map((item) => ({
                ...item,
                editionSlug: ed.slug,
                editionName: ed.editionName,
                editionStatus: ed.status,
            }))
        );
    }, [editions]);

    // Unique categories from items
    const availableCategories = useMemo(() => {
        const cats = new Set<string>();
        allGalleryItems.forEach((it) => {
            if (it.category) cats.add(it.category);
        });
        return ['all', ...Array.from(cats)];
    }, [allGalleryItems]);

    // Filtered items based on edition, category, and search query
    const filteredItems = useMemo(() => {
        return allGalleryItems.filter((item) => {
            const matchesEdition = editionFilter === 'all' || item.editionSlug === editionFilter;
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !query ||
                item.caption.toLowerCase().includes(query) ||
                item.src.toLowerCase().includes(query) ||
                (item.category && item.category.toLowerCase().includes(query));
            return matchesEdition && matchesCategory && matchesSearch;
        });
    }, [allGalleryItems, editionFilter, categoryFilter, searchQuery]);

    const visibleItems = useMemo(() => {
        return filteredItems.slice(0, visibleCount);
    }, [filteredItems, visibleCount]);

    // Reset visible count when filter changes
    useEffect(() => {
        setVisibleCount(24);
        setLightboxIdx(null);
    }, [editionFilter, categoryFilter, searchQuery]);

    // Keyboard navigation for lightbox
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

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 45 && lightboxIdx !== null) {
            if (diff > 0) {
                // Swipe left -> Next
                setLightboxIdx((lightboxIdx + 1) % filteredItems.length);
            } else {
                // Swipe right -> Prev
                setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length);
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="gallery" />
            <main>
                {/* Hero Header */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #071324 0%, #0f243c 60%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: 'clamp(44px, 7vw, 72px) clamp(16px, 4vw, 24px)',
                        borderBottom: '3px solid #C5192D',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(197, 25, 45, 0.25)',
                                border: '1px solid rgba(251, 113, 133, 0.45)',
                                color: '#FECDD3',
                                fontSize: 'clamp(0.72rem, 1.5vw, 0.78rem)',
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.4px',
                                padding: '6px 14px',
                                borderRadius: '999px',
                                marginBottom: '16px',
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                            Authentic Visual Archive • {allGalleryItems.length} Photographs &amp; Official Archive
                        </span>
                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '0 0 14px',
                                lineHeight: 1.05,
                                letterSpacing: '-0.5px',
                            }}
                        >
                            FLEXATHON RACE &amp; COMMUNITY GALLERY
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '720px', lineHeight: 1.65, margin: 0 }}>
                            100% authentic race-day, campus circuit, hydration stations, podium triumphs, and community moments. Filter by city edition or category, and click any photograph to inspect in full resolution.
                        </p>
                    </div>
                </section>

                <section style={{ padding: 'clamp(28px, 5vw, 56px) clamp(16px, 4vw, 24px) 80px', maxWidth: '1280px', margin: '0 auto' }}>
                    {/* Filter & Search Controls */}
                    <div style={{ marginBottom: '32px' }}>
                        {/* Edition Filter Tabs */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                marginBottom: '20px',
                                alignItems: 'center',
                            }}
                        >
                            {[
                                { id: 'all', label: `All Editions (${allGalleryItems.length})` },
                                { id: 'hydoct18', label: `Hyderabad 2026 Archive (${allGalleryItems.filter(i => i.editionSlug === 'hydoct18').length})` },
                                { id: 'kochi2027', label: 'Kochi 2027 Announcement (1)' },
                            ].map((tab) => {
                                const active = editionFilter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setEditionFilter(tab.id as 'all' | 'hydoct18' | 'kochi2027')}
                                        style={{
                                            padding: '9px 20px',
                                            borderRadius: '999px',
                                            border: active ? '1px solid #C5192D' : '1px solid #CBD5E1',
                                            background: active ? '#C5192D' : '#FFFFFF',
                                            color: active ? '#FFFFFF' : '#334155',
                                            fontFamily: "'Barlow Condensed', sans-serif",
                                            fontWeight: 800,
                                            fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: active ? '0 4px 12px rgba(197, 25, 45, 0.25)' : 'none',
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Category Filter Pills & Search */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '12px',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: '#FFFFFF',
                                border: '1px solid #E2E8F0',
                                borderRadius: '16px',
                                padding: '14px 18px',
                                boxShadow: '0 4px 16px rgba(12, 30, 51, 0.03)',
                            }}
                        >
                            {/* Horizontal scrollable category pill group */}
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    maxWidth: '100%',
                                }}
                            >
                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginRight: '4px' }}>
                                    Category:
                                </span>
                                {availableCategories.map((cat) => {
                                    const active = categoryFilter === cat;
                                    const count = cat === 'all'
                                        ? allGalleryItems.filter(i => editionFilter === 'all' || i.editionSlug === editionFilter).length
                                        : allGalleryItems.filter(i => (editionFilter === 'all' || i.editionSlug === editionFilter) && i.category === cat).length;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCategoryFilter(cat)}
                                            style={{
                                                padding: '5px 13px',
                                                borderRadius: '20px',
                                                border: active ? '1px solid #0c1e33' : '1px solid #E2E8F0',
                                                background: active ? '#0c1e33' : '#F8FAFC',
                                                color: active ? '#FFFFFF' : '#475569',
                                                fontSize: '0.82rem',
                                                fontWeight: active ? 700 : 600,
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {cat === 'all' ? 'All Categories' : cat} ({count})
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Search box */}
                            <div style={{ position: 'relative', minWidth: 'min(100%, 220px)' }}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search moments..."
                                    style={{
                                        width: '100%',
                                        padding: '7px 12px 7px 32px',
                                        fontSize: '0.86rem',
                                        borderRadius: '8px',
                                        border: '1px solid #CBD5E1',
                                        outline: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        background: '#FFFFFF',
                                    }}
                                />
                                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '0.82rem' }}>
                                    🔍
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Counter */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            flexWrap: 'wrap',
                            gap: '8px',
                        }}
                    >
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#64748B' }}>
                            Showing <strong style={{ color: '#0c1e33' }}>{Math.min(visibleCount, filteredItems.length)}</strong> of{' '}
                            <strong style={{ color: '#0c1e33' }}>{filteredItems.length}</strong> photographs
                        </div>
                        {visibleCount < filteredItems.length && (
                            <button
                                type="button"
                                onClick={() => setVisibleCount(filteredItems.length)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#C5192D',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: '0.96rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.8px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                }}
                            >
                                Show All ({filteredItems.length}) →
                            </button>
                        )}
                    </div>

                    {/* Gallery Grid */}
                    {filteredItems.length === 0 ? (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '64px 20px',
                                background: '#FFFFFF',
                                borderRadius: '18px',
                                border: '1px solid #E2E8F0',
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📷</div>
                            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.6rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 6px' }}>
                                No Photographs Match Filter
                            </h3>
                            <p style={{ color: '#64748B', fontSize: '0.92rem', margin: '0 0 16px' }}>
                                Try selecting "All Categories" or clearing the search term.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setCategoryFilter('all');
                                    setSearchQuery('');
                                    setEditionFilter('all');
                                }}
                                style={{
                                    background: '#0c1e33',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '9px 18px',
                                    fontSize: '0.86rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                                gap: 'clamp(16px, 2.5vw, 24px)',
                            }}
                        >
                            {visibleItems.map((item, idx) => (
                                <figure
                                    key={item.id}
                                    onClick={() => setLightboxIdx(idx)}
                                    style={{
                                        margin: 0,
                                        background: '#FFFFFF',
                                        borderRadius: '16px',
                                        border: '1px solid #E2E8F0',
                                        overflow: 'hidden',
                                        boxShadow: '0 6px 20px rgba(12, 30, 51, 0.04)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 14px 30px rgba(12, 30, 51, 0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(12, 30, 51, 0.04)';
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '220px',
                                            background: '#0c1e33',
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            loading="lazy"
                                            decoding="async"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block',
                                                transition: 'transform 0.3s ease',
                                            }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                background: item.editionSlug === 'hydoct18' ? 'rgba(16, 185, 129, 0.95)' : '#0284C7',
                                                color: '#FFFFFF',
                                                fontSize: '0.68rem',
                                                fontWeight: 800,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.8px',
                                                padding: '3px 9px',
                                                borderRadius: '999px',
                                                backdropFilter: 'blur(4px)',
                                            }}
                                        >
                                            {item.editionSlug === 'kochi2027' ? 'Kochi Announcement (Archive Photo)' : item.editionName}
                                        </span>
                                        <span
                                            style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                right: '10px',
                                                background: 'rgba(7, 19, 36, 0.85)',
                                                color: '#FFFFFF',
                                                fontSize: '0.68rem',
                                                fontWeight: 800,
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                backdropFilter: 'blur(4px)',
                                            }}
                                        >
                                            🔍 View
                                        </span>
                                    </div>
                                    <figcaption style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                {item.category}
                                            </div>
                                            <p
                                                style={{
                                                    margin: '6px 0 0',
                                                    fontSize: '0.88rem',
                                                    fontWeight: 600,
                                                    color: '#0c1e33',
                                                    lineHeight: 1.5,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {item.caption}
                                            </p>
                                        </div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {visibleCount < filteredItems.length && (
                        <div style={{ textAlign: 'center', marginTop: '44px' }}>
                            <button
                                type="button"
                                onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredItems.length))}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: '1.15rem',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.2px',
                                    padding: '14px 34px',
                                    borderRadius: '999px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 24px rgba(197, 25, 45, 0.35)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                Load More Photos (+24) • {filteredItems.length - visibleCount} Remaining
                            </button>
                        </div>
                    )}

                    {editionFilter === 'kochi2027' && (
                        <div
                            style={{
                                marginTop: '40px',
                                background: '#FFFFFF',
                                border: '1px solid #E2E8F0',
                                borderRadius: '18px',
                                padding: 'clamp(24px, 4vw, 36px)',
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

            {/* Mobile & Desktop Fullscreen Lightbox */}
            {currentItem && lightboxIdx !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setLightboxIdx(null)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(7, 19, 36, 0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'clamp(12px, 3vw, 24px)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '1040px',
                            width: '100%',
                            background: '#0F172A',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.18)',
                            overflow: 'hidden',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '94vh',
                        }}
                    >
                        {/* Header bar */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 18px',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                color: '#FFFFFF',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(0.85rem, 2vw, 1.05rem)',
                                    fontWeight: 800,
                                    color: '#FDE047',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                {currentItem.editionName} • {currentItem.category} ({lightboxIdx + 1} of {filteredItems.length})
                            </span>
                            <button
                                type="button"
                                onClick={() => setLightboxIdx(null)}
                                style={{
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '6px 14px',
                                    fontWeight: 800,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                }}
                            >
                                ✕ Close
                            </button>
                        </div>

                        {/* Image display */}
                        <div
                            style={{
                                background: '#050B14',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                minHeight: '260px',
                                maxHeight: 'calc(94vh - 140px)',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <img
                                src={currentItem.src}
                                alt={currentItem.alt}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: 'calc(94vh - 140px)',
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                            />

                            {/* Floating navigation buttons for easy mobile tapping */}
                            <button
                                type="button"
                                onClick={() => setLightboxIdx((lightboxIdx - 1 + filteredItems.length) % filteredItems.length)}
                                aria-label="Previous image"
                                style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(7, 19, 36, 0.75)',
                                    color: '#FFFFFF',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '50%',
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                onClick={() => setLightboxIdx((lightboxIdx + 1) % filteredItems.length)}
                                aria-label="Next image"
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(7, 19, 36, 0.75)',
                                    color: '#FFFFFF',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '50%',
                                    width: '44px',
                                    height: '44px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                ›
                            </button>
                        </div>

                        {/* Caption bar */}
                        <div
                            style={{
                                padding: '14px 20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                                flexWrap: 'wrap',
                                color: '#FFFFFF',
                                background: '#0F172A',
                                borderTop: '1px solid rgba(255,255,255,0.1)',
                            }}
                        >
                            <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 600, color: '#E2E8F0', flex: 1, minWidth: '220px' }}>
                                {currentItem.caption}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <a
                                    href={currentItem.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    style={{
                                        background: 'rgba(255,255,255,0.12)',
                                        color: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        borderRadius: '8px',
                                        padding: '7px 14px',
                                        fontSize: '0.84rem',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                    }}
                                >
                                    ⬇ Download
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
