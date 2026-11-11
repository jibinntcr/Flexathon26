'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface LegalPageShellProps {
    title: string;
    subtitle?: string;
    effectiveDate?: string;
    children: React.ReactNode;
}

export default function LegalPageShell({
    title,
    subtitle,
    effectiveDate,
    children,
}: LegalPageShellProps) {
    return (
        <div
            style={{
                backgroundColor: '#FAFBFC',
                color: '#0F172A',
                minHeight: '100vh',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />

            <main id="main-content" style={{ flex: '1 0 auto' }}>
                {/* Hero Header */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #091526 0%, #0F1E33 55%, #182840 100%)',
                        color: '#FFFFFF',
                        padding: 'clamp(44px, 5.5vw, 68px) 24px',
                        textAlign: 'center',
                        position: 'relative',
                        borderBottom: '3px solid #C5192D',
                    }}
                >
                    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                        <span
                            style={{
                                display: 'inline-block',
                                background: 'rgba(197, 25, 45, 0.25)',
                                border: '1px solid rgba(251, 113, 133, 0.45)',
                                color: '#FECDD3',
                                fontSize: '0.74rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '1.4px',
                                padding: '5px 14px',
                                borderRadius: '999px',
                                marginBottom: '14px',
                            }}
                        >
                            FLEXATHON Governance &amp; Compliance
                        </span>

                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                lineHeight: 1.08,
                                letterSpacing: '0.5px',
                                margin: '0 0 12px 0',
                                color: '#FFFFFF',
                            }}
                        >
                            {title}
                        </h1>

                        {(subtitle || effectiveDate) && (
                            <p
                                style={{
                                    fontSize: '0.92rem',
                                    color: '#CBD5E1',
                                    letterSpacing: '0.4px',
                                    margin: 0,
                                }}
                            >
                                {effectiveDate && (
                                    <span style={{ fontWeight: 600, color: '#F8FAFC' }}>
                                        {effectiveDate}
                                    </span>
                                )}
                                {effectiveDate && subtitle && ' • '}
                                {subtitle && <span>{subtitle}</span>}
                            </p>
                        )}
                    </div>
                </section>

                {/* Legal Body Container */}
                <section
                    style={{
                        backgroundColor: '#F8FAFC',
                        padding: 'clamp(36px, 5vw, 64px) clamp(16px, 3.5vw, 24px)',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '920px',
                            margin: '0 auto',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            padding: 'clamp(24px, 5vw, 48px)',
                            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
                            border: '1px solid #E2E8F0',
                            color: '#1E293B',
                            fontSize: '15px',
                            lineHeight: 1.75,
                        }}
                    >
                        {children}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
