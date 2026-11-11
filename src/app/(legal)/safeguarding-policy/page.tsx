'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function SafeguardingPolicyPage() {
    return (
        <LegalPageShell
            title="Safeguarding Policy"
            subtitle="Standards for minor and vulnerable participant protection, supervision protocols, and reporting"
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
                    Child &amp; Vulnerable Participant Safeguarding Policy
                </h2>

                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155', marginBottom: '20px' }}>
                    FLEXATHON and <strong>Flexon Sports Foundation</strong> believe that sports must always be a safe,
                    nurturing, and inspiring space. We enforce strict safeguarding policies to protect minors, vulnerable
                    adults, and student participants during all events, training sessions, and promotional activities.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '15px', lineHeight: 1.75, color: '#334155' }}>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px 22px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            1. Mandatory Parental / Guardian Consent
                        </h3>
                        <p style={{ margin: 0, color: '#475569' }}>
                            Participants under 18 years of age must have an explicit parental or legal guardian consent declaration
                            submitted during registration. For student cohorts registered through schools or colleges, an authorized
                            faculty coordinator must accompany and supervise the group on race day.
                        </p>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px 22px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            2. Volunteer &amp; Crew Screening
                        </h3>
                        <p style={{ margin: 0, color: '#475569' }}>
                            All volunteers, marshals, medical personnel, and staff assigned to youth staging zones, baggage counters,
                            or water stations undergo screening and mandatory briefing regarding appropriate conduct, zero-tolerance
                            physical/verbal boundaries, and emergency escort protocols.
                        </p>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px 22px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            3. Photography &amp; Media Safeguarding
                        </h3>
                        <p style={{ margin: 0, color: '#475569' }}>
                            Official photographers are vetted and instructed to capture dignified, sporting imagery only.
                            Photographs are used for event documentation, celebration of athletic achievement, and promotion of
                            fitness causes. Any parent or guardian wishing to request removal of a specific photo from public
                            digital galleries can do so via an expedited review process.
                        </p>
                    </div>

                    <div
                        style={{
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '10px',
                            padding: '18px 20px',
                            color: '#991B1B',
                        }}
                    >
                        <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0' }}>
                            Designated Safeguarding Officer &amp; Reporting
                        </h3>
                        <p style={{ margin: '0 0 10px 0', fontSize: '14.5px', lineHeight: 1.6 }}>
                            If you witness or suspect any safeguarding breach, misconduct, or unsafe situation during a FLEXATHON
                            event, report it immediately to the Information/Medical Desk or contact our designated officer:
                        </p>
                        <div style={{ fontSize: '14.5px' }}>
                            <strong>Email:</strong>{' '}
                            <a
                                href="mailto:info@flexathonrun.org?subject=Safeguarding%20Urgent%20Notice"
                                style={{ color: '#991B1B', fontWeight: 700, textDecoration: 'underline' }}
                            >
                                info@flexathonrun.org
                            </a>
                            <br />
                            <strong>Helpline:</strong>{' '}
                            <a href="tel:+919074934014" style={{ color: '#991B1B', fontWeight: 700 }}>
                                +91 90749 34014
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </LegalPageShell>
    );
}
