'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HyderabadWinnersShowcase from '@/components/editions/HyderabadWinnersShowcase';
import { ASSETS } from '@/lib/assets';
import { SITE_CONFIG } from '@/lib/siteConfig';

interface VerifiedRunner {
    id: number;
    registrationId: string;
    name: string;
    category: string;
    cityOrg: string;
    whatsappMasked: string;
    emailMasked: string;
    tshirtSize?: string | null;
}

export default function HyderabadResultsPage() {
    const [phone, setPhone] = useState('');
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [matchedRunners, setMatchedRunners] = useState<VerifiedRunner[] | null>(null);

    // Initial state: unverified sample preview
    const [runnerName, setRunnerName] = useState('PARTICIPANT NAME');
    const [category, setCategory] = useState<'10K' | '5K' | '3K'>('10K');
    const [regId, setRegId] = useState('#FLX-SAMPLE');
    const [cityOrg, setCityOrg] = useState('HYDERABAD RUNNERS');
    const [isVerifiedRecord, setIsVerifiedRecord] = useState(false);

    const certCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handlePhoneLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        const digits = phone.replace(/\D/g, '');
        if (digits.length < 7) {
            setSearchError('Please enter a valid 10-digit registered mobile number.');
            return;
        }
        setSearching(true);
        setSearchError('');
        try {
            const res = await fetch(`/api/runner-card?phone=${encodeURIComponent(digits)}`);
            const data = await res.json();
            if (res.ok && data.success && Array.isArray(data.runners) && data.runners.length > 0) {
                setMatchedRunners(data.runners);
                selectRunner(data.runners[0]);
            } else {
                setMatchedRunners([]);
                setSearchError(
                    data.message ||
                        'No registration record matched this mobile number. Please check the number used during registration or contact the support desk.'
                );
                setIsVerifiedRecord(false);
            }
        } catch {
            setSearchError('Could not connect to verification service. Please try again or submit a support ticket.');
            setIsVerifiedRecord(false);
        } finally {
            setSearching(false);
        }
    };

    const selectRunner = (r: VerifiedRunner) => {
        setRunnerName((r.name || 'PARTICIPANT').toUpperCase());
        const cat = r.category?.includes('3') ? '3K' : r.category?.includes('5') ? '5K' : '10K';
        setCategory(cat);
        setRegId(r.registrationId || `#FLX-${10000 + (r.id || 1)}`);
        setCityOrg((r.cityOrg || 'FLEXATHON RUNNER').toUpperCase());
        setIsVerifiedRecord(true);
    };

    // Draw 1600x1130 Ceremonial Finisher E-Certificate
    useEffect(() => {
        const canvas = certCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = 1600;
        const H = 1130;
        canvas.width = W;
        canvas.height = H;

        const drawCertificate = (logoImg?: HTMLImageElement, sdgImg?: HTMLImageElement) => {
            // 1. Background Ivory & Subtle Grid
            ctx.fillStyle = '#FCFBF7';
            ctx.fillRect(0, 0, W, H);

            // Outer Navy Frame
            ctx.fillStyle = '#071324';
            ctx.fillRect(28, 28, W - 56, H - 56);

            // Inner Ivory Canvas
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(48, 48, W - 96, H - 96);

            // Double Gold & Crimson Accent Borders
            ctx.strokeStyle = '#C5192D';
            ctx.lineWidth = 4;
            ctx.strokeRect(64, 64, W - 128, H - 128);

            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 2;
            ctx.strokeRect(76, 76, W - 152, H - 152);

            // Top Ribbon Header Bar
            const grad = ctx.createLinearGradient(76, 76, W - 76, 210);
            grad.addColorStop(0, '#071324');
            grad.addColorStop(0.5, '#0F2542');
            grad.addColorStop(1, '#071324');
            ctx.fillStyle = grad;
            ctx.fillRect(76, 76, W - 152, 135);

            // Draw FLEXATHON Logo if loaded
            if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
                const lh = 76;
                const lw = (logoImg.naturalWidth / logoImg.naturalHeight) * lh;
                ctx.drawImage(logoImg, 115, 105, lw, lh);
            } else {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = "900 38px 'Barlow Condensed', sans-serif";
                ctx.textAlign = 'left';
                ctx.fillText('FLEXATHON 2026', 115, 155);
            }

            // Top Right Edition Badge in Header
            ctx.textAlign = 'right';
            ctx.fillStyle = '#FDE047';
            ctx.font = "800 18px 'Inter', sans-serif";
            ctx.fillText('EDITION 01 • HYDERABAD FLAGSHIP ARCHIVE', W - 115, 132);
            ctx.fillStyle = '#CBD5E1';
            ctx.font = "600 15px 'Inter', sans-serif";
            ctx.fillText('SUNDAY, 18 OCTOBER 2026 • ESCI CAMPUS, GACHIBOWLI', W - 115, 162);

            // Certificate Title
            ctx.textAlign = 'center';
            ctx.fillStyle = '#C5192D';
            ctx.font = "800 19px 'Inter', sans-serif";
            ctx.fillText('FLEXON SPORTS FOUNDATION • THE GLOBAL GOALS RUN', W / 2, 275);

            ctx.fillStyle = '#071324';
            ctx.font = "900 58px 'Barlow Condensed', 'Inter', sans-serif";
            ctx.fillText('OFFICIAL FINISHER & PARTICIPATION CERTIFICATE', W / 2, 342);

            // Decorative Gold Divider
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(W / 2 - 220, 368);
            ctx.lineTo(W / 2 + 220, 368);
            ctx.stroke();

            ctx.fillStyle = '#475569';
            ctx.font = "600 22px 'Inter', sans-serif";
            ctx.fillText('This is proudly presented to', W / 2, 422);

            // Runner Name
            ctx.fillStyle = '#071324';
            ctx.font = "900 68px 'Inter', sans-serif";
            ctx.fillText((runnerName.trim() || 'PARTICIPANT').toUpperCase(), W / 2, 508);

            // Name underline
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(W / 2 - 340, 532);
            ctx.lineTo(W / 2 + 340, 532);
            ctx.stroke();

            // Affiliation / City
            ctx.fillStyle = '#64748B';
            ctx.font = "700 20px 'Inter', sans-serif";
            ctx.fillText(`${(cityOrg.trim() || 'FLEXATHON RUNNER').toUpperCase()}  •  BIB / REG ID: ${regId}`, W / 2, 572);

            // Achievement Citation
            const catFull =
                category === '10K'
                    ? '10K TIMED GLOBAL GOALS CHALLENGE'
                    : category === '5K'
                    ? '5K TIMED FITNESS RUN'
                    : '3K COMMUNITY FUN RUN';

            ctx.fillStyle = '#1E293B';
            ctx.font = "500 23px 'Inter', sans-serif";
            ctx.fillText(
                'for successfully completing the inaugural Hyderabad edition of FLEXATHON 2026 in the',
                W / 2,
                635
            );

            // Category Pill Box
            const pillW = 560;
            const pillH = 64;
            const pillX = W / 2 - pillW / 2;
            const pillY = 662;
            ctx.fillStyle = category === '10K' ? '#C5192D' : category === '5K' ? '#1D4ED8' : '#15803D';
            ctx.beginPath();
            ctx.roundRect(pillX, pillY, pillW, pillH, 32);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.font = "900 28px 'Inter', sans-serif";
            ctx.fillText(catFull, W / 2, pillY + 42);

            // SDG 4 Purpose Statement
            ctx.fillStyle = '#475569';
            ctx.font = "600 20px 'Inter', sans-serif";
            ctx.fillText(
                'Advancing United Nations Sustainable Development Goal 4: Quality Education',
                W / 2,
                775
            );

            // Bottom 3-Column Credentials Bar
            const footerY = 860;

            // Left: Event Venue & Date Box
            ctx.textAlign = 'left';
            ctx.fillStyle = '#071324';
            ctx.font = "800 18px 'Inter', sans-serif";
            ctx.fillText('HOST VENUE & DATE', 130, footerY);
            ctx.fillStyle = '#475569';
            ctx.font = "600 16px 'Inter', sans-serif";
            ctx.fillText('Engineering Staff College of India (ESCI)', 130, footerY + 28);
            ctx.fillText('Gachibowli, Hyderabad • 18 October 2026', 130, footerY + 52);
            ctx.fillStyle = isVerifiedRecord ? '#059669' : '#DC2626';
            ctx.font = "800 15px 'Inter', sans-serif";
            const refCode = `FLX-HYD26-${regId.replace(/[^A-Z0-9]/gi, '') || 'SAMPLE'}`;
            ctx.fillText(
                isVerifiedRecord
                    ? `✓ OFFICIAL VERIFIED RECORD • REF: ${refCode}`
                    : '⚠️ UNVERIFIED SAMPLE PREVIEW • NOT AN OFFICIAL CERTIFICATE',
                130,
                footerY + 82
            );

            // Center: SDG 4 Badge
            if (sdgImg && sdgImg.complete && sdgImg.naturalWidth > 0) {
                ctx.drawImage(sdgImg, W / 2 - 55, footerY - 15, 110, 110);
            }

            // Right: Organizer Signature Block
            ctx.textAlign = 'right';
            ctx.fillStyle = '#071324';
            ctx.font = "800 18px 'Inter', sans-serif";
            ctx.fillText('ORGANISED BY', W - 130, footerY);
            ctx.fillStyle = '#C5192D';
            ctx.font = "900 22px 'Inter', sans-serif";
            ctx.fillText('Flexon Sports Foundation', W - 130, footerY + 32);
            ctx.fillStyle = '#475569';
            ctx.font = "600 16px 'Inter', sans-serif";
            ctx.fillText('Official Race Committee • www.flexathonrun.org', W - 130, footerY + 58);
            ctx.fillStyle = '#64748B';
            ctx.font = "700 14px 'Inter', sans-serif";
            ctx.fillText('United by Sport. Driven by Global Goals.', W - 130, footerY + 82);

            // Prominent Diagonal Watermark for Unverified Records
            if (!isVerifiedRecord) {
                ctx.save();
                ctx.translate(W / 2, H / 2);
                ctx.rotate(-0.35);
                ctx.textAlign = 'center';

                // Semi-transparent red banner box
                ctx.fillStyle = 'rgba(220, 38, 38, 0.08)';
                ctx.fillRect(-680, -70, 1360, 140);
                ctx.strokeStyle = 'rgba(220, 38, 38, 0.35)';
                ctx.lineWidth = 3.5;
                ctx.strokeRect(-680, -70, 1360, 140);

                ctx.fillStyle = 'rgba(185, 28, 28, 0.42)';
                ctx.font = "900 50px 'Inter', sans-serif";
                ctx.fillText('SAMPLE PREVIEW • UNVERIFIED RECORD', 0, 10);

                ctx.font = "700 20px 'Inter', sans-serif";
                ctx.fillStyle = 'rgba(185, 28, 28, 0.52)';
                ctx.fillText('OFFICIAL CERTIFICATE DOWNLOAD REQUIRES VERIFIED PARTICIPANT LOOKUP', 0, 44);

                ctx.restore();
            }
        };

        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        const sdg = new Image();
        sdg.crossOrigin = 'anonymous';

        let loaded = 0;
        const onAssetDone = () => {
            loaded += 1;
            if (loaded >= 2) {
                drawCertificate(logo, sdg);
            }
        };
        logo.onload = onAssetDone;
        logo.onerror = onAssetDone;
        sdg.onload = onAssetDone;
        sdg.onerror = onAssetDone;

        logo.src = ASSETS.brand.flexathonLogoTransparent;
        sdg.src = ASSETS.editions.sdg4Badge;
    }, [runnerName, category, regId, cityOrg, isVerifiedRecord]);

    const handleDownloadCert = () => {
        if (!isVerifiedRecord) {
            setSearchError('Official certificate download is locked until verified via your registered mobile number.');
            return;
        }
        const canvas = certCanvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        const safeName = (runnerName.trim() || 'Runner').replace(/\s+/g, '_');
        link.download = `FLEXATHON-2026-Hyderabad-Official-Certificate-${safeName}-${category}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div style={{ background: '#F8FAFC', color: '#0c1e33', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header activePage="editions" />
            <main>
                {/* HERO HEADER */}
                <section
                    style={{
                        background: 'linear-gradient(135deg, #071324 0%, #0f243c 60%, #1e293b 100%)',
                        color: '#FFFFFF',
                        padding: '56px 24px',
                        borderBottom: '3px solid #C5192D',
                    }}
                >
                    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '14px', fontSize: '0.84rem', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link href="/hydoct18" style={{ color: '#93C5FD', textDecoration: 'none', fontWeight: 700 }}>
                                ← Back to Hyderabad 2026 Flagship Hub
                            </Link>
                            <span style={{ color: '#475569' }}>|</span>
                            <Link href="/hydoct18/social-card" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                                🪪 Open 1254×1254 Runner Social Card Studio →
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
                            ✓ Hyderabad 2026 — Official Finisher Verification &amp; E-Certificate Portal
                        </span>
                        <h1
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                margin: '0 0 12px',
                                lineHeight: 1.05,
                            }}
                        >
                            HYDERABAD 2026 RESULTS &amp; FINISHER E-CERTIFICATES
                        </h1>
                        <p style={{ color: '#CBD5E1', fontSize: '1.02rem', maxWidth: '760px', lineHeight: 1.6, margin: 0 }}>
                            Verify your FLEXATHON 2026 Hyderabad registration by mobile number or customize your runner details below to download your official high-resolution Finisher &amp; Participation E-Certificate (`18 October 2026 • ESCI Gachibowli`).
                        </p>
                    </div>
                </section>

                {/* OFFICIAL HYDERABAD 2026 PODIUM CHAMPIONS & WINNERS */}
                <HyderabadWinnersShowcase />

                {/* INTERACTIVE VERIFICATION & CERTIFICATE STUDIO */}
                <section style={{ padding: '48px 24px 72px', maxWidth: '1240px', margin: '0 auto' }}>
                    {/* Step 1: Phone Lookup Bar */}
                    <div
                        style={{
                            background: '#FFFFFF',
                            borderRadius: '20px',
                            border: '1.5px solid #E2E8F0',
                            padding: '28px 32px',
                            boxShadow: '0 10px 30px rgba(12, 30, 51, 0.05)',
                            marginBottom: '32px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C5192D', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                    Step 1 • Participant Authentication &amp; Lookup
                                </span>
                                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', margin: '4px 0 0', color: '#0c1e33' }}>
                                    Verify Your Official Result by Registered Mobile Number
                                </h2>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                    style={{
                                        fontSize: '0.78rem',
                                        fontWeight: 800,
                                        padding: '5px 14px',
                                        borderRadius: '999px',
                                        background: isVerifiedRecord ? '#ECFDF5' : '#FEF2F2',
                                        color: isVerifiedRecord ? '#059669' : '#DC2626',
                                        border: isVerifiedRecord ? '1px solid #A7F3D0' : '1px solid #FECACA',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}
                                >
                                    <span>{isVerifiedRecord ? '✓' : '🔒'}</span>
                                    <span>{isVerifiedRecord ? 'Authenticated Record Active' : 'Official Download Locked'}</span>
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handlePhoneLookup} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (searchError) setSearchError('');
                                }}
                                placeholder="Enter registered 10-digit mobile number (e.g. 9876543210)..."
                                style={{
                                    flex: '1 1 280px',
                                    padding: '13px 16px',
                                    borderRadius: '10px',
                                    border: '1.5px solid #CBD5E1',
                                    fontSize: '0.96rem',
                                    fontWeight: 600,
                                    color: '#0c1e33',
                                }}
                            />
                            <button
                                type="submit"
                                disabled={searching}
                                style={{
                                    background: '#C5192D',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '13px 26px',
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '1.05rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: searching ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {searching ? 'Searching Database...' : '🔍 Authenticate & Unlock Certificate'}
                            </button>
                        </form>

                        {searchError && (
                            <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '0.88rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                <span>{searchError}</span>
                                <Link
                                    href="/contact?edition=hydoct18&category=Results+%26+Certificate+Support"
                                    style={{ color: '#C5192D', fontWeight: 800, textDecoration: 'underline' }}
                                >
                                    Submit Support Ticket →
                                </Link>
                            </div>
                        )}

                        {matchedRunners && matchedRunners.length > 0 && (
                            <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {matchedRunners.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => selectRunner(r)}
                                        style={{
                                            padding: '10px 16px',
                                            borderRadius: '10px',
                                            border: regId === r.registrationId ? '2px solid #10B981' : '1px solid #CBD5E1',
                                            background: regId === r.registrationId ? '#ECFDF5' : '#FFFFFF',
                                            color: '#0c1e33',
                                            fontWeight: 800,
                                            fontSize: '0.86rem',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ✓ {r.name} ({r.category} • {r.registrationId})
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Step 2: Live Certificate Preview + Customization Controls */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                            gap: '28px',
                            alignItems: 'start',
                        }}
                    >
                        {/* Left: High-Res Certificate Canvas Preview */}
                        <div
                            style={{
                                background: '#071324',
                                borderRadius: '22px',
                                padding: '24px',
                                color: '#FFFFFF',
                                boxShadow: '0 16px 40px rgba(7, 19, 36, 0.16)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    📄 Official Finisher E-Certificate Preview (1600 × 1130 px)
                                </span>
                                <span
                                    style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        color: isVerifiedRecord ? '#6EE7B7' : '#FCA5A5',
                                        background: isVerifiedRecord ? 'rgba(16,185,129,0.16)' : 'rgba(239,68,68,0.2)',
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                        border: isVerifiedRecord ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(239,68,68,0.4)',
                                    }}
                                >
                                    {isVerifiedRecord ? '✓ Verified Record Active' : '⚠️ Sample Preview • Watermarked'}
                                </span>
                            </div>

                            <div
                                style={{
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    border: isVerifiedRecord ? '2px solid rgba(212, 175, 55, 0.55)' : '2px solid rgba(239, 68, 68, 0.45)',
                                    background: '#FFFFFF',
                                }}
                            >
                                <canvas ref={certCanvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>

                            {/* Verification Warning or Success Banner */}
                            {!isVerifiedRecord ? (
                                <div
                                    style={{
                                        marginTop: '16px',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        background: 'rgba(239, 68, 68, 0.14)',
                                        border: '1px solid rgba(239, 68, 68, 0.35)',
                                        color: '#FECDD3',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    <strong>🔒 Official Download Locked:</strong> This preview is watermarked. To generate and download your authoritative, unwatermarked Finisher E-Certificate, authenticate your registered phone number in Step 1.
                                </div>
                            ) : (
                                <div
                                    style={{
                                        marginTop: '16px',
                                        padding: '12px 16px',
                                        borderRadius: '10px',
                                        background: 'rgba(16, 185, 129, 0.16)',
                                        border: '1px solid rgba(16, 185, 129, 0.45)',
                                        color: '#A7F3D0',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    <strong>✓ Authenticated Participant Record:</strong> Finisher certificate unlocked for <strong>{runnerName}</strong> ({category} • Ref: {regId}). Official record fields are locked to preserve certificate authenticity.
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                                <button
                                    type="button"
                                    onClick={handleDownloadCert}
                                    disabled={!isVerifiedRecord}
                                    style={{
                                        flex: '1 1 240px',
                                        padding: '15px 22px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isVerifiedRecord
                                            ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                            : '#334155',
                                        color: isVerifiedRecord ? '#FFFFFF' : '#94A3B8',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 900,
                                        fontSize: '1.12rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        cursor: isVerifiedRecord ? 'pointer' : 'not-allowed',
                                        boxShadow: isVerifiedRecord ? '0 6px 20px rgba(16, 185, 129, 0.35)' : 'none',
                                    }}
                                >
                                    {isVerifiedRecord
                                        ? '⬇️ Download Official Finisher Certificate (PNG)'
                                        : '🔒 Official Download Locked — Verify Above'}
                                </button>
                                <Link
                                    href={`/hydoct18/social-card?name=${encodeURIComponent(runnerName)}&category=${encodeURIComponent(category)}&city=${encodeURIComponent(cityOrg)}`}
                                    style={{
                                        flex: '1 1 200px',
                                        padding: '15px 20px',
                                        borderRadius: '10px',
                                        background: '#C5192D',
                                        color: '#FFFFFF',
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '1.05rem',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                    }}
                                >
                                    🪪 Create Matching Runner Card →
                                </Link>
                            </div>
                        </div>

                        {/* Right: Certificate Details & Support Desk */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    border: '1.5px solid #E2E8F0',
                                    padding: '28px',
                                    boxShadow: '0 8px 24px rgba(12, 30, 51, 0.04)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', margin: 0, color: '#0c1e33' }}>
                                        {isVerifiedRecord ? '🔒 Verified Participant Details' : 'Preview Certificate Details'}
                                    </h3>
                                    {isVerifiedRecord && (
                                        <span style={{ fontSize: '0.72rem', background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: 800 }}>
                                            LOCKED
                                        </span>
                                    )}
                                </div>
                                <p style={{ fontSize: '0.88rem', color: '#64748B', margin: '0 0 20px', lineHeight: 1.5 }}>
                                    {isVerifiedRecord
                                        ? 'Official result fields are locked to preserve certificate authenticity. Need a spelling or timing correction? Use the official support links below.'
                                        : 'Preview mode: You may type a name or choose a category below to test sample rendering. Official certificates require phone verification in Step 1.'}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                                            Participant Full Name {isVerifiedRecord ? '(Locked)' : ''}
                                        </label>
                                        <input
                                            type="text"
                                            value={runnerName}
                                            maxLength={28}
                                            readOnly={isVerifiedRecord}
                                            disabled={isVerifiedRecord}
                                            onChange={(e) => setRunnerName(e.target.value.toUpperCase())}
                                            style={{
                                                width: '100%',
                                                padding: '11px 14px',
                                                borderRadius: '8px',
                                                border: '1px solid #CBD5E1',
                                                fontSize: '0.95rem',
                                                fontWeight: 700,
                                                boxSizing: 'border-box',
                                                background: isVerifiedRecord ? '#F8FAFC' : '#FFFFFF',
                                                color: isVerifiedRecord ? '#475569' : '#0c1e33',
                                                cursor: isVerifiedRecord ? 'not-allowed' : 'text',
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                                            Race Category Completed {isVerifiedRecord ? '(Locked)' : ''}
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                            {(['10K', '5K', '3K'] as const).map((cat) => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    disabled={isVerifiedRecord}
                                                    onClick={() => setCategory(cat)}
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        border: category === cat ? '2px solid #C5192D' : '1px solid #CBD5E1',
                                                        background: category === cat ? '#FEF2F2' : '#F8FAFC',
                                                        color: category === cat ? '#C5192D' : '#334155',
                                                        fontWeight: 800,
                                                        fontSize: '0.9rem',
                                                        cursor: isVerifiedRecord ? 'not-allowed' : 'pointer',
                                                        opacity: isVerifiedRecord && category !== cat ? 0.45 : 1,
                                                    }}
                                                >
                                                    {cat} {cat === '3K' ? 'Fun Run' : 'Timed'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                                                Bib / Registration ID
                                            </label>
                                            <input
                                                type="text"
                                                value={regId}
                                                maxLength={16}
                                                readOnly={isVerifiedRecord}
                                                disabled={isVerifiedRecord}
                                                onChange={(e) => setRegId(e.target.value.toUpperCase())}
                                                style={{
                                                    width: '100%',
                                                    padding: '11px 14px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #CBD5E1',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700,
                                                    boxSizing: 'border-box',
                                                    background: isVerifiedRecord ? '#F8FAFC' : '#FFFFFF',
                                                    color: isVerifiedRecord ? '#475569' : '#0c1e33',
                                                    cursor: isVerifiedRecord ? 'not-allowed' : 'text',
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                                                Club / Organization
                                            </label>
                                            <input
                                                type="text"
                                                value={cityOrg}
                                                maxLength={26}
                                                readOnly={isVerifiedRecord}
                                                disabled={isVerifiedRecord}
                                                onChange={(e) => setCityOrg(e.target.value.toUpperCase())}
                                                style={{
                                                    width: '100%',
                                                    padding: '11px 14px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #CBD5E1',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700,
                                                    boxSizing: 'border-box',
                                                    background: isVerifiedRecord ? '#F8FAFC' : '#FFFFFF',
                                                    color: isVerifiedRecord ? '#475569' : '#0c1e33',
                                                    cursor: isVerifiedRecord ? 'not-allowed' : 'text',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Separate Commemorative Card Callout */}
                                    <div
                                        style={{
                                            marginTop: '6px',
                                            padding: '14px',
                                            borderRadius: '10px',
                                            background: '#FFF1F2',
                                            border: '1px solid #FECDD3',
                                            fontSize: '0.84rem',
                                            color: '#991B1B',
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        <strong>Looking for a customizable social card?</strong> The official certificate above is locked to verified race records. To upload your own photo and customize runner tags for Instagram, use the{' '}
                                        <Link href="/hydoct18/social-card" style={{ color: '#C5192D', fontWeight: 800, textDecoration: 'underline' }}>
                                            Commemorative Runner Card Studio →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Official Timing & Correction Desk Box */}
                            <div
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: '20px',
                                    border: '1px solid #E2E8F0',
                                    padding: '24px 28px',
                                }}
                            >
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                    Official Timing &amp; Certificate Correction Desk
                                </div>
                                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
                                    Need assistance with your RFID timing classification, certificate spelling, or podium credentials? Contact the Flexon Sports Foundation race desk directly.
                                </p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <a
                                        href={SITE_CONFIG.contacts.whatsappHelpdeskPrefill}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: '#16A34A',
                                            color: '#FFFFFF',
                                            padding: '10px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.82rem',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        💬 WhatsApp ({SITE_CONFIG.contacts.helpline})
                                    </a>
                                    <a
                                        href={`mailto:${SITE_CONFIG.contacts.email}?subject=Certificate%20Correction%20Request%20-%20${encodeURIComponent(regId)}`}
                                        style={{
                                            background: '#0F172A',
                                            color: '#FFFFFF',
                                            padding: '10px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.82rem',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        ✉️ Request Timing Correction
                                    </a>
                                    <Link
                                        href="/contact?edition=hydoct18&category=Results+%26+Certificate+Support"
                                        style={{
                                            background: '#F1F5F9',
                                            color: '#0c1e33',
                                            padding: '10px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.82rem',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Support Ticket Form
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
