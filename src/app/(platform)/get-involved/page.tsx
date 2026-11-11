'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GetInvolvedPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        edition: 'kochi2027',
        category: 'Volunteer Application',
        organization: '',
        message: '',
        consent: false,
        website: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
        status: 'idle',
        message: '',
    });

    const tracks = [
        {
            badge: 'Track 01',
            title: 'Runners & Running Clubs',
            desc: 'Join city editions across 3K, 5K, and 10K formats, lead pace groups, or register your club’s interest for the upcoming Kochi Edition.',
            ctaLabel: 'Explore City Editions',
            ctaHref: '/editions',
        },
        {
            badge: 'Track 02',
            title: 'Volunteers & Race Crew',
            desc: 'Power the starting line, hydration zones, kit distribution, medal ceremonies, and SDG awareness stalls in your city.',
            ctaLabel: 'Apply to Volunteer',
            ctaHref: '#get-involved-form',
        },
        {
            badge: 'Track 03',
            title: 'Schools, Colleges & Universities',
            desc: 'Mobilize student runners, NSS/NCC cohorts, and campus clubs around health (SDG 3), education (SDG 4), and youth leadership.',
            ctaLabel: 'Register Institution Interest',
            ctaHref: '#get-involved-form',
        },
        {
            badge: 'Track 04',
            title: 'Corporates & CSR Teams',
            desc: 'Bring workplace wellness teams onto the course while partnering on measurable Global Goals awareness.',
            ctaLabel: 'Explore Corporate & CSR Tracks',
            ctaHref: '/partners#partner-enquiry',
        },
        {
            badge: 'Track 05',
            title: 'Potential Host Cities & Venues',
            desc: 'Collaborate with Flexon Sports Foundation to bring a future verified FLEXATHON edition to your city or institutional campus.',
            ctaLabel: 'Propose a Host City',
            ctaHref: '#get-involved-form',
        },
    ];

    const validate = () => {
        const next: Record<string, string> = {};
        if (!formData.name || formData.name.trim().length < 2) next.name = 'Please enter your full name.';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) next.email = 'Please enter a valid email address.';
        if (!formData.city || formData.city.trim().length < 2) next.city = 'Please enter your city.';
        if (!formData.consent) next.consent = 'Please confirm your consent to be contacted by Flexon Sports Foundation.';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState({ status: 'idle', message: '' });
        if (!validate()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    city: formData.city,
                    edition: formData.edition,
                    category: formData.category,
                    organization: formData.organization,
                    subject: `Get Involved — ${formData.category} (${formData.city})`,
                    message:
                        formData.message.trim() ||
                        `${formData.category} submission from ${formData.name} in ${formData.city} for ${formData.edition}.`,
                    consent: formData.consent,
                    requireConsent: true,
                    website: formData.website,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setSubmitState({ status: 'error', message: data.error || 'Submission failed. Please try again.' });
            } else {
                setSubmitState({
                    status: 'success',
                    message: 'Thank you for stepping up! Your details have been saved and our community team will reach out when opportunities in your city open.',
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    edition: 'kochi2027',
                    category: 'Volunteer Application',
                    organization: '',
                    message: '',
                    consent: false,
                    website: '',
                });
                setErrors({});
            }
        } catch {
            setSubmitState({ status: 'error', message: 'Network error. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

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
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
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
                            Join the Movement
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
                            YOUR CITY. YOUR RUN. YOUR IMPACT.
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '760px', lineHeight: 1.65, margin: 0 }}>
                            Whether you are lacing up for your first 3K, leading a university volunteer squad, mobilizing a corporate wellness team, or proposing a future host city — there is a place for you in FLEXATHON.
                        </p>
                    </div>
                </section>

                {/* Participation Tracks */}
                <section style={{ padding: '72px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
                        {tracks.map((t) => (
                            <div
                                key={t.title}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div>
                                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {t.badge}
                                    </span>
                                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', margin: '6px 0 10px' }}>
                                        {t.title}
                                    </h2>
                                    <p style={{ fontSize: '0.93rem', color: '#475569', lineHeight: 1.6, margin: '0 0 20px' }}>{t.desc}</p>
                                </div>
                                <a
                                    href={t.ctaHref}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: '#C5192D',
                                        fontWeight: 800,
                                        fontSize: '0.88rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {t.ctaLabel} →
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Get Involved Registration Form */}
                <section id="get-involved-form" style={{ padding: '40px 24px 88px' }}>
                    <div
                        style={{
                            maxWidth: '880px',
                            margin: '0 auto',
                            background: '#FFFFFF',
                            borderRadius: '24px',
                            border: '1px solid #E2E8F0',
                            padding: '44px 36px',
                            boxShadow: '0 14px 40px rgba(12, 30, 51, 0.06)',
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                                Community &amp; City Participation Form
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 10px' }}>
                                Step Up With FLEXATHON
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto' }}>
                                Register as a volunteer, school/college coordinator, corporate team lead, or city host collaborator.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <div style={{ display: 'none' }} aria-hidden="true">
                                <input
                                    type="text"
                                    tabIndex={-1}
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="gi-name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        id="gi-name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.name ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.name && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="gi-email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        id="gi-email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.email ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.email && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.email}</div>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="gi-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Phone / WhatsApp (Optional)
                                    </label>
                                    <input
                                        id="gi-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gi-city" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        City *
                                    </label>
                                    <input
                                        id="gi-city"
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="e.g., Kochi, Hyderabad, Bengaluru..."
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.city ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.city && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.city}</div>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="gi-category" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Participation Role
                                    </label>
                                    <select
                                        id="gi-category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                    >
                                        <option value="Volunteer Application">Volunteer &amp; Race Crew</option>
                                        <option value="Runner Interest & Club">Runner / Running Club</option>
                                        <option value="School / University Participation">School / College / University</option>
                                        <option value="Corporate / Workplace Cohort">Corporate / Workplace Cohort</option>
                                        <option value="Host City Proposal">Potential Host City Collaborator</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="gi-edition" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Edition Interest
                                    </label>
                                    <select
                                        id="gi-edition"
                                        value={formData.edition}
                                        onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                    >
                                        <option value="kochi2027">Kochi Edition (Coming Soon)</option>
                                        <option value="master">General / Multi-City Platform</option>
                                        <option value="future-city">New Host City</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="gi-message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                    How Would You Like to Contribute?
                                </label>
                                <textarea
                                    id="gi-message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Share your background, group size, or interest area..."
                                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.94rem', fontFamily: "'Inter', sans-serif" }}
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
                                        I consent to Flexon Sports Foundation storing my details and contacting me regarding FLEXATHON participation in accordance with the{' '}
                                        <Link href="/privacy-policy" style={{ color: '#C5192D', fontWeight: 700 }}>
                                            Privacy Policy
                                        </Link>
                                        . *
                                    </span>
                                </label>
                                {errors.consent && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.consent}</div>}
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
                                }}
                            >
                                {submitting ? 'Submitting...' : 'Submit Participation Interest →'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
