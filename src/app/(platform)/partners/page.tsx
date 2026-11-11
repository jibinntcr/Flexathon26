'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PartnerStrip from '@/components/layout/PartnerStrip';

export default function PartnersPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        city: '',
        edition: 'master',
        category: 'Title / Brand Sponsorship',
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

    const partnerCategories = [
        {
            title: 'Title & Brand Sponsorship',
            desc: 'Co-brand a city edition or national movement track with high-visibility race village, bib, jersey, and digital runner card presence.',
        },
        {
            title: 'Corporate Wellness & CSR',
            desc: 'Sponsor employee running cohorts while aligning your CSR mandate with specific UN Sustainable Development Goals.',
        },
        {
            title: 'Schools & Universities',
            desc: 'Host campus flag-offs, engage student athletes, and integrate the 17 Global Goals into youth leadership programs.',
        },
        {
            title: 'Fitness Groups & Running Clubs',
            desc: 'Lead official city pace groups, pre-race shakeout runs, and community training blocks in Kochi and future cities.',
        },
        {
            title: 'NGOs & Cause Collaborators',
            desc: 'Partner on edition-specific SDG awareness stalls, educational drives, and verified grassroots storytelling.',
        },
        {
            title: 'Venues, Hydration, Medical & City Hosts',
            desc: 'Provide campus venues, hydration stations, recovery nutrition, physiotherapy, and race-day volunteer infrastructure.',
        },
    ];

    const validate = () => {
        const next: Record<string, string> = {};
        if (!formData.name || formData.name.trim().length < 2) next.name = 'Please enter your full name.';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) next.email = 'Please enter a valid work or personal email.';
        if (!formData.organization || formData.organization.trim().length < 2) next.organization = 'Please enter your organisation, club, or institution name.';
        if (!formData.consent) next.consent = 'Please confirm your consent to be contacted regarding partnership opportunities.';
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
                    city: formData.city || 'Not specified',
                    edition: formData.edition,
                    category: `Partner Enquiry: ${formData.category}`,
                    organization: formData.organization,
                    subject: `Partnership Enquiry — ${formData.organization} (${formData.category})`,
                    message:
                        formData.message.trim() ||
                        `Partnership enquiry from ${formData.organization} for ${formData.edition} (${formData.category}).`,
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
                    message: 'Thank you! Your partnership enquiry has been recorded. Our partnerships team at Flexon Sports Foundation will respond shortly.',
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    organization: '',
                    city: '',
                    edition: 'master',
                    category: 'Title / Brand Sponsorship',
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
                            Goal 17: Partnerships for the Goals
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
                            STRONGER TOGETHER.
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '760px', lineHeight: 1.65, marginBottom: '24px' }}>
                            Partner with Flexon Sports Foundation to power city editions of FLEXATHON — The Global Goals Run across sponsorships, CSR, universities, running clubs, NGOs, and civic institutions.
                        </p>
                        <a
                            href="#partner-enquiry"
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
                                padding: '14px 28px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                            }}
                        >
                            Become a Partner →
                        </a>
                    </div>
                </section>

                {/* Partnership Tracks */}
                <section style={{ padding: '72px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.4px' }}>
                            Ways to Collaborate
                        </span>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 0' }}>
                            Partnership Categories
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
                        {partnerCategories.map((cat) => (
                            <div
                                key={cat.title}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    border: '1px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)',
                                }}
                            >
                                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.65rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 10px', color: '#0c1e33' }}>
                                    {cat.title}
                                </h3>
                                <p style={{ fontSize: '0.93rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Historical Hyderabad 2026 Edition Partners — Clearly Scoped */}
                <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 0', textAlign: 'center' }}>
                        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px' }}>
                            Past Edition Collaborators — Hyderabad 2026
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '680px', margin: '0 auto' }}>
                            The organisations below partnered specifically for the completed FLEXATHON 2026 Hyderabad edition (18 October 2026). Partnerships for the upcoming Kochi Edition will be announced separately once confirmed.
                        </p>
                    </div>
                    <PartnerStrip editionLabel="Hyderabad 2026 Edition Partners (Completed Edition)" showDiscoveryPlatforms={false} />
                </section>

                {/* Become a Partner Form */}
                <section id="partner-enquiry" style={{ padding: '72px 24px 88px', background: '#F8FAFC' }}>
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
                                Connect With Flexon Sports Foundation
                            </span>
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', margin: '8px 0 10px' }}>
                                Become a FLEXATHON Partner
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                                Share your organisation details below to discuss city sponsorships, CSR cohorts, academic partnerships, or Kochi Edition collaborations.
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
                                    <label htmlFor="partner-name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Contact Person Name *
                                    </label>
                                    <input
                                        id="partner-name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your full name"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.name ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.name && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="partner-org" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Organisation / Brand / Institution *
                                    </label>
                                    <input
                                        id="partner-org"
                                        type="text"
                                        required
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        placeholder="Company, college, NGO or club name"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.organization ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.organization && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.organization}</div>}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="partner-email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Official Email Address *
                                    </label>
                                    <input
                                        id="partner-email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@company.com"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.email ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                    {errors.email && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.email}</div>}
                                </div>

                                <div>
                                    <label htmlFor="partner-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Phone / WhatsApp
                                    </label>
                                    <input
                                        id="partner-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                                <div>
                                    <label htmlFor="partner-edition" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Edition Scope
                                    </label>
                                    <select
                                        id="partner-edition"
                                        value={formData.edition}
                                        onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                    >
                                        <option value="master">Multi-City / National Platform</option>
                                        <option value="kochi2027">Kochi Edition (Coming Soon)</option>
                                        <option value="future-city">New Host City Proposal</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="partner-category" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Partnership Category
                                    </label>
                                    <select
                                        id="partner-category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                    >
                                        <option value="Title / Brand Sponsorship">Title / Brand Sponsorship</option>
                                        <option value="Corporate Wellness & CSR">Corporate Wellness &amp; CSR</option>
                                        <option value="School / University">School / University</option>
                                        <option value="Running Club / Fitness Group">Running Club / Fitness Group</option>
                                        <option value="NGO / Impact Collaboration">NGO / Impact Collaboration</option>
                                        <option value="Venue / Hydration / Medical">Venue / Hydration / Medical</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="partner-message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                    Collaboration Details
                                </label>
                                <textarea
                                    id="partner-message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us about your partnership goals, city focus, or SDG alignment..."
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
                                        I consent to Flexon Sports Foundation contacting me regarding this partnership enquiry in accordance with the{' '}
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
                                {submitting ? 'Submitting Partnership Enquiry...' : 'Submit Partnership Enquiry →'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
