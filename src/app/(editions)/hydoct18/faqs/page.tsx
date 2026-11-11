'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HyderabadFaqsPage() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const faqs = [
        {
            q: '1. When and where did FLEXATHON 2026 Hyderabad take place?',
            a: 'FLEXATHON 2026 Hyderabad was held on Sunday, 18 October 2026 at the Engineering Staff College of India (ESCI) Campus, Gachibowli, Hyderabad.',
        },
        {
            q: '2. What is the current status of the Hyderabad 2026 edition?',
            a: 'The Hyderabad 2026 edition has successfully concluded and registration is closed. This edition hub preserves all race information, prize details, SDG 4 focus, and commemorative runner tools.',
        },
        {
            q: '3. What were the race categories and historical standard entry fees?',
            a: 'Hyderabad 2026 offered three categories: 3K Fun Run (₹749 historical standard entry fee, non-timed), 5K Timed Run (₹999 historical standard entry fee, RFID chip-timed), and 10K Timed Run (₹1,099 historical standard entry fee, RFID chip-timed).',
        },
        {
            q: '4. What were the official flag-off times on 18 October 2026?',
            a: 'Venue gates opened at 05:00 AM. The 10K Timed Run flagged off at 05:45 AM, the 5K Timed Run at 06:15 AM, and the 3K Fun Run at 06:45 AM.',
        },
        {
            q: '5. Which UN Sustainable Development Goal was featured in Hyderabad 2026?',
            a: 'Hyderabad 2026 spotlighted Goal 4: Quality Education — promoting inclusive and equitable quality education and lifelong learning opportunities for all.',
        },
        {
            q: '6. What was included in the Hyderabad 2026 runner kit?',
            a: 'Every registered participant received an official Dry-Fit Runner T-Shirt, race bib (with RFID timing chip for 5K and 10K), Finisher Medal, Digital E-Certificate, course hydration, medical support, and post-run refreshments.',
        },
        {
            q: '7. What was the total prize pool for Hyderabad 2026?',
            a: 'Hyderabad 2026 featured a ₹60,000 total cash prize pool across the timed runs: ₹40,000 for the 10K Timed Run (Men & Women top 3: ₹10K / ₹6K / ₹4K each) and ₹20,000 for the 5K Timed Run (Men & Women top 3: ₹5K / ₹3K / ₹2K each).',
        },
        {
            q: '8. Was the 3K Fun Run eligible for cash prizes?',
            a: 'No. The 3K Fun Run was a non-timed community participation category where all finishers received a Finisher Medal and Digital E-Certificate.',
        },
        {
            q: '9. Can Hyderabad 2026 participants still download their Runner Card?',
            a: 'Yes! Visit /hydoct18/social-card to search by your registered mobile number or create a commemorative 1254×1254 Hyderabad 2026 runner card.',
        },
        {
            q: '10. Who were the Hyderabad 2026 edition partners?',
            a: 'Hyderabad 2026 edition partners included ESCI (Venue Partner), Tata Copper+ (Hydration Partner), SMAAASH (Entertainment Partner), and Akshayakalpa Organic (Organic Nutrition Partner).',
        },
        {
            q: '11. Where can I check official race results and finisher certificates?',
            a: 'Visit the Hyderabad Results & Certificates page (/hydoct18/results) for official verification updates or contact the helpdesk at info@flexathonrun.org.',
        },
        {
            q: '12. Who organised FLEXATHON 2026 Hyderabad?',
            a: 'FLEXATHON 2026 Hyderabad was organised by Flexon Sports Foundation (https://flexonsports.org/).',
        },
        {
            q: '13. Which city is hosting the next FLEXATHON edition?',
            a: 'The next announced host city is Kochi, Kerala (/kochi2027). Register your interest on the Kochi Edition page to receive verified updates once dates and venue are confirmed.',
        },
        {
            q: '14. How can I contact the support team for Hyderabad 2026 queries?',
            a: 'You can reach the Flexon Sports Foundation helpdesk via email at info@flexathonrun.org or by phone/WhatsApp at +91 90749 34014.',
        },
    ];

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            <main>
                <section style={{ background: 'linear-gradient(135deg, #091526 0%, #1e293b 100%)', color: '#FFFFFF', padding: '64px 24px' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
                            Hyderabad 2026 — Edition Support Archive
                        </span>
                        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.6rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 12px' }}>
                            Hyderabad 2026 Frequently Asked Questions
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.02rem', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
                            Complete answers regarding the concluded FLEXATHON 2026 Hyderabad edition (18 October 2026, ESCI Campus, Gachibowli).
                        </p>
                    </div>
                </section>

                <section style={{ padding: '64px 24px', maxWidth: '960px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((item, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        background: '#FFFFFF',
                                        borderRadius: '14px',
                                        border: '1px solid #E2E8F0',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '18px 22px',
                                            background: isOpen ? '#F8FAFC' : '#FFFFFF',
                                            border: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '16px',
                                            cursor: 'pointer',
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '0.98rem',
                                            fontWeight: 700,
                                            color: '#0c1e33',
                                        }}
                                    >
                                        <span>{item.q}</span>
                                        <span style={{ color: '#C5192D', fontSize: '1.3rem', fontWeight: 900 }}>
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>
                                    {isOpen && (
                                        <div style={{ padding: '0 22px 20px', color: '#475569', fontSize: '0.94rem', lineHeight: 1.65 }}>
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
