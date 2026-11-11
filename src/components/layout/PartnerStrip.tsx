'use client';

import React from 'react';

interface PartnerStripProps {
    editionLabel?: string;
    showDiscoveryPlatforms?: boolean;
}

export default function PartnerStrip({
    editionLabel = 'Hyderabad 2026 Edition Partners',
    showDiscoveryPlatforms = true,
}: PartnerStripProps) {
    const discoveryPlatforms = [
        { name: 'BookMyShow', logo: '/assets/partners/1 BookMyShow.jpg' },
        { name: 'iFinish', logo: '/assets/partners/2 IFinish.png' },
        { name: 'India Running', logo: '/assets/partners/3 IndiaRunning.jpeg' },
        { name: 'Townscript', logo: '/assets/partners/4Townscript.png' },
        { name: 'CityWoofer', logo: '/assets/partners/5 CityWoofer.png' },
        { name: 'District', logo: '/assets/partners/6 District.png' },
    ];

    const hydPartners = [
        { role: 'Venue Partner • Hyderabad 2026', name: 'ESCI', logo: '/assets/partners/esci-logo.png', maxH: '68px', maxW: '160px' },
        { role: 'Hydration Partner • Hyderabad 2026', name: 'Tata Copper+', logo: '/assets/partners/tata-copper.png', maxH: '68px', maxW: '160px' },
        { role: 'Entertainment Partner • Hyderabad 2026', name: 'SMAAASH', logo: '/assets/partners/smaaash.png', maxH: '72px', maxW: '175px' },
        { role: 'Organic Nutrition Partner • Hyderabad 2026', name: 'Akshayakalpa Organic', logo: '/assets/partners/akshayakalpa.png', maxH: '80px', maxW: '185px' },
    ];

    return (
        <div
            style={{
                width: '100%',
                background: '#FFFFFF',
                borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                padding: '32px 24px',
            }}
        >
            <div
                style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '28px',
                }}
            >
                {/* Edition Partners Row */}
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '18px',
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                color: '#C5192D',
                                textTransform: 'uppercase',
                                letterSpacing: '1.8px',
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                padding: '5px 14px',
                                borderRadius: '999px',
                            }}
                        >
                            {editionLabel}
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                            gap: '18px',
                            alignItems: 'stretch',
                        }}
                    >
                        {hydPartners.map((p) => (
                            <div
                                key={p.name}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    padding: '18px 16px',
                                    background: '#F8FAFC',
                                    borderRadius: '14px',
                                    border: '1px solid #E2E8F0',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '0.68rem',
                                        fontWeight: 700,
                                        color: '#64748B',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {p.role}
                                </span>
                                <div
                                    style={{
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={p.logo}
                                        alt={`${p.name} (${p.role})`}
                                        style={{
                                            maxHeight: p.maxH,
                                            maxWidth: p.maxW,
                                            width: 'auto',
                                            height: 'auto',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Historical Discovery & Listing Platforms (Hyderabad 2026) */}
                {showDiscoveryPlatforms && (
                    <div
                        style={{
                            borderTop: '1px dashed #E2E8F0',
                            paddingTop: '22px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '14px',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#64748B',
                                textTransform: 'uppercase',
                                letterSpacing: '1.4px',
                                textAlign: 'center',
                            }}
                        >
                            Hyderabad 2026 Historical Event Discovery & Listing Platforms (Event Concluded • Registration Closed)
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '14px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {discoveryPlatforms.map((t, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: '#FFFFFF',
                                        padding: '8px 16px',
                                        borderRadius: '10px',
                                        border: '1px solid #E2E8F0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '48px',
                                    }}
                                >
                                    <img
                                        src={t.logo}
                                        alt={`${t.name} (Hyderabad 2026 Historical Discovery Platform)`}
                                        style={{
                                            maxHeight: '30px',
                                            maxWidth: '105px',
                                            width: 'auto',
                                            height: 'auto',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
