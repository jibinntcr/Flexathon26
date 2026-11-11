'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function BrandSdgDisclaimerPage() {
    return (
        <LegalPageShell
            title="Brand Compliance &amp; SDG Notice"
            subtitle="Independent initiative framework and United Nations SDG branding alignment guidelines"
            effectiveDate="Last Updated: October 2026"
        >
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                <h2
                    style={{
                        fontSize: '22px',
                        fontWeight: 800,
                        color: '#0F172A',
                        marginBottom: '16px',
                        borderBottom: '2px solid #F1F5F9',
                        paddingBottom: '12px',
                    }}
                >
                    Brand Compliance &amp; Independent Alignment
                </h2>
                <div
                    style={{
                        backgroundColor: '#FEF3C7',
                        border: '1.5px solid #FDE68A',
                        borderRadius: '12px',
                        padding: '18px 22px',
                        marginBottom: '24px',
                        color: '#92400E',
                        fontSize: '15px',
                        lineHeight: 1.7,
                    }}
                >
                    <strong>Independent Initiative Notice:</strong> FLEXATHON — The Global Goals Run is an independent
                    grassroots sporting and community fitness initiative organised and operated by{' '}
                    <strong>Flexon Sports Foundation</strong>. It is not an official United Nations event, and references
                    to the UN Sustainable Development Goals (SDGs) are made solely for public education, community awareness,
                    and thematic alignment purposes.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15px', lineHeight: 1.75, color: '#334155' }}>
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            1. Absence of Endorsement or Affiliation
                        </h3>
                        <p style={{ margin: 0 }}>
                            Alignment with the Sustainable Development Goals does not imply endorsement, sponsorship,
                            direct partnership, or affiliation with the United Nations, the UN Department of Global
                            Communications, or any specific UN agency, fund, or programme.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            2. Adherence to Official SDG Guidelines
                        </h3>
                        <p style={{ margin: 0 }}>
                            All SDG logos, colour wheel iconography, and goal-specific colour systems are reproduced
                            strictly in accordance with the official{' '}
                            <em>United Nations Guidelines for Use of the SDG Logo, Colour Wheel and 17 Icons</em> for
                            non-commercial, public educational, and community awareness activities.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            3. Intellectual Property
                        </h3>
                        <p style={{ margin: 0 }}>
                            FLEXATHON, its associated wordmarks, running person logos, campaign slogans (&quot;United by Sport.
                            Driven by Global Goals.&quot;), and medal designs are proprietary marks of Flexon Sports Foundation.
                            Unauthorized commercial reproduction, re-branding, or distribution is strictly prohibited.
                        </p>
                    </div>

                    <div
                        style={{
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '10px',
                            padding: '18px 20px',
                            fontSize: '14.5px',
                        }}
                    >
                        <strong>Inquiries &amp; Permissions:</strong> For questions regarding trademark usage, branding assets,
                        or institutional collaborations, contact the communications team at{' '}
                        <a href="mailto:info@flexathonrun.org" style={{ color: '#C5192D', fontWeight: 700 }}>
                            info@flexathonrun.org
                        </a>
                        .
                    </div>
                </div>
            </div>
        </LegalPageShell>
    );
}
