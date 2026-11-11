'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/siteConfig';

function ContactFormContent() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        edition: 'master',
        category: 'General Enquiry',
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

    // Map URL query parameters to stable category and edition dropdown values
    useEffect(() => {
        const catParam = searchParams?.get('category') || '';
        const edParam = searchParams?.get('edition') || '';

        if (edParam) {
            const lowerEd = edParam.toLowerCase();
            if (lowerEd.includes('kochi')) {
                setFormData((prev) => ({ ...prev, edition: 'kochi2027' }));
            } else if (lowerEd.includes('hyd')) {
                setFormData((prev) => ({ ...prev, edition: 'hydoct18' }));
            } else if (lowerEd === 'master') {
                setFormData((prev) => ({ ...prev, edition: 'master' }));
            }
        }

        if (catParam) {
            const lowerCat = catParam.toLowerCase();
            if (lowerCat.includes('host') || lowerCat.includes('city') || lowerCat.includes('proposal')) {
                setFormData((prev) => ({ ...prev, category: 'Host City Proposal' }));
            } else if (lowerCat.includes('kochi') || lowerCat.includes('interest') || lowerCat.includes('update')) {
                setFormData((prev) => ({ ...prev, category: 'Kochi Edition Interest', edition: 'kochi2027' }));
            } else if (lowerCat.includes('partner') || lowerCat.includes('sponsor')) {
                setFormData((prev) => ({ ...prev, category: 'Partnership / Sponsorship' }));
            } else if (lowerCat.includes('volunt')) {
                setFormData((prev) => ({ ...prev, category: 'Volunteer Application' }));
            } else if (lowerCat.includes('school') || lowerCat.includes('corp') || lowerCat.includes('college') || lowerCat.includes('club')) {
                setFormData((prev) => ({ ...prev, category: 'School / Corporate Participation' }));
            } else if (lowerCat.includes('result') || lowerCat.includes('cert') || lowerCat.includes('support') || lowerCat.includes('timing')) {
                setFormData((prev) => ({ ...prev, category: 'Results & Certificate Support', edition: 'hydoct18' }));
            }
        }
    }, [searchParams]);

    const validate = () => {
        const next: Record<string, string> = {};
        if (!formData.name || formData.name.trim().length < 2) next.name = 'Please enter your full name.';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) next.email = 'Please enter a valid email address.';
        if (formData.phone && !/^[+\d\s\-()]{7,20}$/.test(formData.phone.trim())) next.phone = 'Please enter a valid phone number.';
        if (!formData.message || formData.message.trim().length < 5) next.message = 'Please enter your message (at least 5 characters).';
        if (!formData.consent) next.consent = 'Please confirm your consent to be contacted regarding your enquiry.';
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
                    category: formData.category,
                    organization: formData.organization,
                    subject: `${formData.category} (${formData.edition.toUpperCase()})`,
                    message: formData.message,
                    consent: formData.consent,
                    requireConsent: true,
                    website: formData.website,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setSubmitState({ status: 'error', message: data.error || 'Could not send message. Please try again.' });
            } else {
                setSubmitState({
                    status: 'success',
                    message: 'Thank you! Your enquiry has been recorded by Flexon Sports Foundation. Our team will respond via email or phone shortly.',
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    edition: 'master',
                    category: 'General Enquiry',
                    organization: '',
                    message: '',
                    consent: false,
                    website: '',
                });
                setErrors({});
            }
        } catch {
            setSubmitState({ status: 'error', message: 'Network error while sending enquiry. Please try again.' });
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
                            Official Support &amp; Enquiries
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
                            CONTACT FLEXATHON
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.05rem', maxWidth: '720px', lineHeight: 1.65, margin: 0 }}>
                            Connect with Flexon Sports Foundation for edition updates, Kochi interest, Hyderabad 2026 archive support, partnerships, volunteering, or host-city collaborations.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '72px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                            gap: '40px',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Left Column: Verified Channels */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                    Organising Foundation
                                </span>
                                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', margin: '6px 0 10px' }}>
                                    Flexon Sports Foundation
                                </h2>
                                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '14px' }}>
                                    Parent organisation of FLEXATHON — The Global Goals Run.
                                </p>
                                <a
                                    href="https://flexonsports.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#C5192D', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                                >
                                    https://flexonsports.org/ ↗
                                </a>
                            </div>

                            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
                                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 14px' }}>
                                    Direct Helpdesk Channels
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: '#334155' }}>
                                    <div>
                                        <strong style={{ display: 'block', color: '#0c1e33' }}>Official Email:</strong>
                                        <a href={SITE_CONFIG.contacts.emailMailto} style={{ color: '#C5192D', fontWeight: 700, textDecoration: 'none' }}>
                                            {SITE_CONFIG.contacts.email}
                                        </a>
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', color: '#0c1e33' }}>Phone &amp; WhatsApp Helpdesk:</strong>
                                        <a href={`tel:${SITE_CONFIG.contacts.helplineRaw}`} style={{ color: '#0c1e33', fontWeight: 700, textDecoration: 'none' }}>
                                            {SITE_CONFIG.contacts.helpline}
                                        </a>
                                    </div>
                                    <div style={{ paddingTop: '6px' }}>
                                        <a
                                            href={SITE_CONFIG.contacts.whatsappHelpdeskPrefill}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-block',
                                                background: '#16A34A',
                                                color: '#FFFFFF',
                                                padding: '10px 18px',
                                                borderRadius: '8px',
                                                fontWeight: 700,
                                                fontSize: '0.86rem',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Chat on WhatsApp ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Stored Enquiry Form */}
                        <div
                            style={{
                                background: '#FFFFFF',
                                borderRadius: '22px',
                                border: '1px solid #E2E8F0',
                                padding: '36px',
                                boxShadow: '0 12px 36px rgba(12, 30, 51, 0.05)',
                            }}
                        >
                            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.2rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px' }}>
                                Send Us an Enquiry
                            </h2>
                            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '24px' }}>
                                All fields marked with * are required. Your enquiry is securely logged for our support and partnerships team.
                            </p>

                            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                <div style={{ display: 'none' }} aria-hidden="true">
                                    <input
                                        type="text"
                                        tabIndex={-1}
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Full Name *
                                        </label>
                                        <input
                                            id="contact-name"
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
                                        <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Email Address *
                                        </label>
                                        <input
                                            id="contact-email"
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

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Phone / WhatsApp (Optional)
                                        </label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.phone ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                        />
                                        {errors.phone && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.phone}</div>}
                                    </div>

                                    <div>
                                        <label htmlFor="contact-city" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Your City
                                        </label>
                                        <input
                                            id="contact-city"
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            placeholder="Kochi, Hyderabad, etc."
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.94rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                                    <div>
                                        <label htmlFor="contact-edition" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Edition Scope
                                        </label>
                                        <select
                                            id="contact-edition"
                                            value={formData.edition}
                                            onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                        >
                                            <option value="master">General / Multi-City Platform</option>
                                            <option value="kochi2027">Kochi Edition (Coming Soon)</option>
                                            <option value="hydoct18">Hyderabad 2026 (Completed Archive)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-category" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                            Enquiry Category
                                        </label>
                                        <select
                                            id="contact-category"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.94rem' }}
                                        >
                                            <option value="General Enquiry">General Enquiry</option>
                                            <option value="Kochi Edition Interest">Kochi Edition Updates</option>
                                            <option value="Partnership / Sponsorship">Partnership / Sponsorship</option>
                                            <option value="Volunteer Application">Volunteering</option>
                                            <option value="School / Corporate Participation">School / Corporate Participation</option>
                                            <option value="Host City Proposal">Potential Host City Proposal</option>
                                            <option value="Results & Certificate Support">Hyderabad 2026 Support</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                                        Message *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can our team assist you?"
                                        style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: errors.message ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.94rem', fontFamily: "'Inter', sans-serif" }}
                                    />
                                    {errors.message && <div role="alert" style={{ color: '#DC2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 600 }}>{errors.message}</div>}
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
                                            I consent to Flexon Sports Foundation storing this enquiry and contacting me in accordance with the{' '}
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
                                    {submitting ? 'Sending Enquiry...' : 'Submit Enquiry →'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fafbfc' }} />}>
            <ContactFormContent />
        </Suspense>
    );
}
