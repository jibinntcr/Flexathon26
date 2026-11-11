'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function AccessibilityStatementPage() {
    return (
        <LegalPageShell
            title="Accessibility Statement"
            subtitle="Details on website compliance and physical event accessibility support"
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
                    Accessibility Support &amp; Digital Inclusion
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155', marginBottom: '16px' }}>
                    FLEXATHON and Flexon Sports Foundation are dedicated to ensuring digital accessibility
                    for individuals of all abilities and providing an inclusive physical environment during
                    all race editions. We continually improve the user experience for everyone and apply relevant
                    accessibility standards (WCAG 2.1 Level AA principles).
                </p>
                <div
                    style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '20px',
                        marginBottom: '24px',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#0F172A',
                            marginBottom: '10px',
                        }}
                    >
                        Physical Race Day Accommodations
                    </h3>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#475569', margin: 0 }}>
                        FLEXATHON strives to provide accessible routes, dedicated staging areas, and supportive
                        volunteers for runners and walkers across our venues. If you require specific assistance,
                        a guide runner, wheelchair assistance, or reasonable accommodations on race day, please
                        contact our participant support desk in advance.
                    </p>
                </div>
                <div
                    style={{
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: '10px',
                        padding: '18px 20px',
                        fontSize: '14.5px',
                        color: '#991B1B',
                    }}
                >
                    <strong>Assistance Contact:</strong> If you encounter accessibility barriers on this website or
                    require race accommodation details, please reach out to our accessibility coordinator at{' '}
                    <a
                        href="mailto:info@flexathonrun.org?subject=Accessibility%20Support%20Request"
                        style={{ color: '#C5192D', fontWeight: 700, textDecoration: 'underline' }}
                    >
                        info@flexathonrun.org
                    </a>{' '}
                    or call our helpline at{' '}
                    <a href="tel:+919074934014" style={{ color: '#C5192D', fontWeight: 700 }}>
                        +91 90749 34014
                    </a>
                    .
                </div>
            </div>
        </LegalPageShell>
    );
}
