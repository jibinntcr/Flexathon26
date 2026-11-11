import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getEditionBySlug, getEditionCtaConfig } from '@/lib/editions';
import { getSDGById } from '@/lib/sdgs';

export default async function DynamicEditionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const edition = getEditionBySlug(slug, false);

    if (!edition) {
        notFound();
    }

    // Canonical public paths for the two primary routes
    if (edition.slug === 'hydoct18') {
        redirect('/hydoct18');
    }
    if (edition.slug === 'kochi2027') {
        redirect('/kochi2027');
    }

    const cta = getEditionCtaConfig(edition);
    const sdgGoals = edition.sdgFocusIds
        .map((id) => getSDGById(id))
        .filter((g): g is NonNullable<typeof g> => Boolean(g));

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
                <section
                    style={{
                        background: 'linear-gradient(135deg, #091526 0%, #0f243c 100%)',
                        color: '#FFFFFF',
                        padding: '72px 24px',
                    }}
                >
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                background: '#C5192D',
                                color: '#FFFFFF',
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.2px',
                                padding: '5px 14px',
                                borderRadius: '999px',
                                marginBottom: '16px',
                            }}
                        >
                            {edition.statusBadgeText || edition.status}
                        </span>
                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '0 0 14px',
                            }}
                        >
                            {edition.editionName}
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.65, marginBottom: '24px' }}>
                            {edition.description}
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {cta.canRegister ? (
                                <a
                                    href={cta.primaryHref}
                                    style={{
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontWeight: 800,
                                        padding: '14px 28px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {cta.primaryLabel} →
                                </a>
                            ) : (
                                <Link
                                    href="/contact"
                                    style={{
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontWeight: 800,
                                        padding: '14px 28px',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Register Interest / Enquiry →
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '64px 24px', maxWidth: '1240px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>City &amp; State</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px' }}>{edition.city}, {edition.state}</div>
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Event Date</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px' }}>{edition.eventDateDisplay}</div>
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Venue</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px' }}>{edition.venue}</div>
                        </div>
                        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Featured Global Goal</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px', color: '#C5192D' }}>
                                {sdgGoals.length > 0 ? sdgGoals.map((g) => `SDG ${g.id}: ${g.title}`).join(', ') : 'To Be Announced'}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
