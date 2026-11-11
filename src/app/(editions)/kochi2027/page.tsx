'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function KochiEditionPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: 'Kochi',
        category: 'Runner Interest & Updates',
        organization: '',
        message: '',
        consent: false,
        website: '', // honeypot
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
        status: 'idle',
        message: '',
    });
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const validateForm = () => {
        const nextErrors: Record<string, string> = {};
        if (!formData.name || formData.name.trim().length < 2) {
            nextErrors.name = 'Please enter your full name.';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
            nextErrors.email = 'Please enter a valid email address.';
        }
        if (formData.phone && !/^[+\d\s\-()]{7,20}$/.test(formData.phone.trim())) {
            nextErrors.phone = 'Please enter a valid phone number.';
        }
        if (!formData.consent) {
            nextErrors.consent = 'Please confirm your consent to receive verified updates for the Kochi Edition.';
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState({ status: 'idle', message: '' });
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city || 'Kochi',
                    edition: 'kochi2027',
                    category: formData.category,
                    organization: formData.organization,
                    subject: `Kochi Edition Interest — ${formData.category}`,
                    message:
                        formData.message.trim() ||
                        `Registered interest for FLEXATHON Kochi Edition (${formData.category}) from ${formData.city || 'Kochi'}.`,
                    consent: formData.consent,
                    requireConsent: true,
                    website: formData.website,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setSubmitState({
                    status: 'error',
                    message: data.error || 'Could not submit your interest right now. Please try again.',
                });
            } else {
                setSubmitState({
                    status: 'success',
                    message:
                        'Thank you! Your interest for the FLEXATHON Kochi Edition has been recorded. We will contact you only when official event details are confirmed.',
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: 'Kochi',
                    category: 'Runner Interest & Updates',
                    organization: '',
                    message: '',
                    consent: false,
                    website: '',
                });
                setErrors({});
            }
        } catch {
            setSubmitState({
                status: 'error',
                message: 'Network error while submitting form. Please check your connection and try again.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const kochiFaqs = [
        {
            q: 'Are the event date, venue, or race categories for Kochi confirmed?',
            a: 'Not yet. Kochi, Kerala is the next announced FLEXATHON host city, and the official event date, venue, course route, race categories, entry fees, partners, and featured Global Goal will be published only once formally confirmed by Flexon Sports Foundation.',
        },
        {
            q: 'Is registration or payment open for the Kochi Edition?',
            a: 'No. Registration and ticket payments are NOT open for the Kochi Edition. Please only register your interest using the official form on this page to receive verified updates.',
        },
        {
            q: 'How can running clubs, colleges, corporates, or sponsors in Kerala get involved?',
            a: 'Select "Running Club / Fitness Group", "School / University", "Corporate / CSR", or "Sponsorship / Partner" in the Kochi Interest Form below, and our organizing team will connect with you directly.',
        },
    ];

    return (
        <div style={{ background: '#fafbfc', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="editions" />

            <main>
                {/* Breadcrumb Bar */}
                <div style={{ background: '#0c1e33', color: '#FFFFFF', padding: '12px 24px', borderBottom: '2px solid #C5192D' }}>
                    <div
                        style={{
                            maxWidth: '1280px',
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '10px',
                            fontSize: '0.84rem',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>
                                FLEXATHON Home
                            </Link>
                            <span style={{ color: '#64748B' }}>/</span>
                            <Link href="/editions" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>
                                Editions
                            </Link>
                            <span style={{ color: '#64748B' }}>/</span>
                            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Kochi Edition (Coming Soon)</span>
                        </div>
                        <Link href="/hydoct18" style={{ color: '#93C5FD', textDecoration: 'none', fontWeight: 600 }}>
                            View Completed Hyderabad 2026 Edition →
                        </Link>
                    </div>
                </div>

                {/* KOCHI HERO SECTION (Dubai Run Rounded Stadium Showcase) */}
                <section
                    style={{
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
                        padding: '24px 20px 56px',
                        borderBottom: '1px solid #E2E8F0',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1380px',
                            margin: '0 auto',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 55%, #FEF2F2 100%)',
                            borderRadius: '32px',
                            border: '1.5px solid #E2E8F0',
                            boxShadow: '0 24px 60px rgba(12, 30, 51, 0.08)',
                            padding: 'clamp(32px, 5vw, 60px)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                            gap: '48px',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    padding: '7px 18px',
                                    borderRadius: '999px',
                                    fontSize: '0.78rem',
                                    fontWeight: 800,
                                    letterSpacing: '1.4px',
                                    textTransform: 'uppercase',
                                    marginBottom: '20px',
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FDE047' }} />
                                Coming Soon • Next Announced Host City
                            </div>

                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: '8px' }}>
                                Kochi, Kerala • FLEXATHON — The Global Goals Run
                            </div>

                            <h1
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                                    fontWeight: 900,
                                    lineHeight: 1.04,
                                    textTransform: 'uppercase',
                                    margin: '0 0 20px',
                                    color: '#0c1e33',
                                }}
                            >
                                FLEXATHON{' '}
                                <span style={{ color: '#C5192D', display: 'block' }}>KOCHI EDITION</span>
                            </h1>

                            <p style={{ fontSize: '1.08rem', color: '#334155', lineHeight: 1.68, marginBottom: '24px', maxWidth: '620px' }}>
                                Following the successful completion of our inaugural Hyderabad edition, the FLEXATHON movement is expanding next to <strong>Kochi, Kerala</strong>. We are working with local civic, academic, and running communities to prepare an unforgettable edition.
                            </p>

                            {/* Honest Status Grid — Zero Fabricated Details */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '12px',
                                    marginBottom: '28px',
                                }}
                            >
                                {[
                                    { label: 'Edition Status', value: 'Coming Soon' },
                                    { label: 'Host City', value: 'Kochi, Kerala' },
                                    { label: 'Date & Venue', value: 'To Be Announced' },
                                    { label: 'Categories & SDG Focus', value: 'To Be Announced' },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            background: '#FFFFFF',
                                            border: '1px solid #CBD5E1',
                                            borderRadius: '18px',
                                            padding: '14px 18px',
                                            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                                        }}
                                    >
                                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {item.label}
                                        </div>
                                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#0c1e33', marginTop: '4px' }}>
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                                <a
                                    href="#kochi-interest-form"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        padding: '14px 30px',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        boxShadow: '0 10px 24px rgba(197, 25, 45, 0.3)',
                                    }}
                                >
                                    Register Interest for Kochi →
                                </a>
                                <span
                                    style={{
                                        fontSize: '0.84rem',
                                        fontWeight: 700,
                                        color: '#475569',
                                        background: '#FFFFFF',
                                        padding: '11px 18px',
                                        borderRadius: '999px',
                                        border: '1px solid #E2E8F0',
                                    }}
                                >
                                    Registrations &amp; Payments Not Open Yet
                                </span>
                            </div>
                        </div>

                        <div>
                            <div
                                style={{
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    border: '1.5px solid #E2E8F0',
                                    boxShadow: '0 20px 50px rgba(12, 30, 51, 0.12)',
                                    background: '#FFFFFF',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        height: '320px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src="/assets/gallery/oct18/NIX09962.JPG"
                                        alt="FLEXATHON Finishers Celebrating — Movement Expanding to Kochi"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center 26%',
                                            display: 'block',
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '16px',
                                            left: '16px',
                                            background: 'rgba(15, 23, 42, 0.8)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: '999px',
                                            padding: '4px 12px',
                                            color: '#FFFFFF',
                                            fontSize: '0.72rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.06em',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        Edition 02 • Next Host City
                                    </div>
                                </div>
                                <div style={{ padding: '20px 24px', background: '#0c1e33', color: '#FFFFFF' }}>
                                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                        Verified Announcement Policy
                                    </div>
                                    <p style={{ margin: '6px 0 0', fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.55 }}>
                                        Flexon Sports Foundation publishes race dates, venue maps, distances, pricing, and SDG themes only after formal confirmation. Register below to be notified first.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* KOCHI INTEREST & COLLABORATION FORM */}
                <section id="kochi-interest-form" style={{ padding: '80px 24px', background: '#FFFFFF' }}>
                    <div
                        style={{
                            maxWidth: '880px',
                            margin: '0 auto',
                            background: '#F8FAFC',
                            borderRadius: '24px',
                            border: '1px solid #E2E8F0',
                            padding: '44px 36px',
                            boxShadow: '0 12px 36px rgba(12, 30, 51, 0.05)',
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                                Official Kochi Edition Priority List
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 10px', color: '#0c1e33' }}>
                                Register Your Interest for FLEXATHON Kochi
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
                                Whether you are a runner in Kerala, a running club, college, volunteer, or potential partner, share your details below. We will only contact you when official Kochi edition updates are ready.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Honeypot */}
                            <div style={{ display: 'none' }} aria-hidden="true">
                                <label htmlFor="kochi-website">Website</label>
                                <input
                                    id="kochi-website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="kochi-name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        id="kochi-name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: errors.name ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    />
                                    {errors.name && (
                                        <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="kochi-email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        id="kochi-email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: errors.email ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    />
                                    {errors.email && (
                                        <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="kochi-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        Phone / WhatsApp (Optional)
                                    </label>
                                    <input
                                        id="kochi-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: errors.phone ? '1.5px solid #DC2626' : '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    />
                                    {errors.phone && (
                                        <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="kochi-city" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        Your City / Town
                                    </label>
                                    <input
                                        id="kochi-city"
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Kochi"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="kochi-category" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        How Would You Like to Participate? *
                                    </label>
                                    <select
                                        id="kochi-category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    >
                                        <option value="Runner Interest & Updates">Runner Interest &amp; Edition Updates</option>
                                        <option value="Running Club / Fitness Group">Running Club / Fitness Group</option>
                                        <option value="Volunteer in Kochi">Volunteer in Kochi</option>
                                        <option value="Sponsorship / Partner">Sponsorship / Brand Partner</option>
                                        <option value="Corporate / CSR Team">Corporate / CSR Participation</option>
                                        <option value="School / University">School / College / University</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="kochi-org" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                        Club / Institution / Company (Optional)
                                    </label>
                                    <input
                                        id="kochi-org"
                                        type="text"
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        placeholder="Name of running club, college, or company"
                                        style={{
                                            width: '100%',
                                            padding: '12px 14px',
                                            borderRadius: '10px',
                                            border: '1px solid #CBD5E1',
                                            background: '#FFFFFF',
                                            fontSize: '0.94rem',
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="kochi-message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#0c1e33', marginBottom: '6px' }}>
                                    Notes or Collaboration Message (Optional)
                                </label>
                                <textarea
                                    id="kochi-message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Share any questions or how your group would like to be part of FLEXATHON Kochi..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        borderRadius: '10px',
                                        border: '1px solid #CBD5E1',
                                        background: '#FFFFFF',
                                        fontSize: '0.94rem',
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.consent}
                                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                        style={{ marginTop: '3px', width: '16px', height: '16px' }}
                                    />
                                    <span>
                                        I consent to Flexon Sports Foundation contacting me with verified updates regarding the FLEXATHON Kochi Edition in accordance with the{' '}
                                        <Link href="/privacy-policy" style={{ color: '#C5192D', fontWeight: 700 }}>
                                            Privacy Policy
                                        </Link>
                                        . *
                                    </span>
                                </label>
                                {errors.consent && (
                                    <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>
                                        {errors.consent}
                                    </div>
                                )}
                            </div>

                            {submitState.status !== 'idle' && (
                                <div
                                    role="status"
                                    style={{
                                        padding: '14px 18px',
                                        borderRadius: '10px',
                                        background: submitState.status === 'success' ? '#DCFCE7' : '#FEE2E2',
                                        color: submitState.status === 'success' ? '#166534' : '#991B1B',
                                        border: submitState.status === 'success' ? '1px solid #86EFAC' : '1px solid #FCA5A5',
                                        fontSize: '0.92rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {submitState.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '15px 28px',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    opacity: submitting ? 0.75 : 1,
                                }}
                            >
                                {submitting ? 'Saving Your Interest...' : 'Notify Me When Kochi Details Are Confirmed →'}
                            </button>
                        </form>
                    </div>
                </section>

                {/* KOCHI EDITION FAQS */}
                <section style={{ padding: '64px 24px 80px', maxWidth: '880px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: '28px' }}>
                        Kochi Edition — Frequently Asked Questions
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {kochiFaqs.map((item, idx) => {
                            const isOpen = openFaq === idx;
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
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        aria-expanded={isOpen}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '18px 22px',
                                            background: 'transparent',
                                            border: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                            fontSize: '0.96rem',
                                            color: '#0c1e33',
                                        }}
                                    >
                                        <span>{item.q}</span>
                                        <span style={{ color: '#C5192D', fontSize: '1.3rem', fontWeight: 900 }}>{isOpen ? '−' : '+'}</span>
                                    </button>
                                    {isOpen && (
                                        <div style={{ padding: '0 22px 18px', color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
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
