'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function TermsOfUsePage() {
    return (
        <LegalPageShell
            title="Terms &amp; Conditions"
            subtitle="Official registration, participation, and event governance agreement"
            effectiveDate="Effective Date: 17 August 2026 • Last Updated: October 2026"
        >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '24px', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        FLEXATHON — Terms &amp; Conditions
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                        These Terms &amp; Conditions (&quot;Terms&quot;) govern registration for, participation in and use of services
                        associated with <strong>FLEXATHON</strong>, including the official website at{' '}
                        <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'underline' }}>
                            https://flexathonrun.org/
                        </a>
                        .
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                        FLEXATHON is an initiative organised by <strong>Flexon Sports Foundation</strong> (&quot;Organiser&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;).
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '14px' }}>
                        By registering for FLEXATHON, purchasing an event registration, accepting these Terms electronically, or participating in the event, you confirm that you have read, understood and agreed to these Terms.
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#64748B', marginBottom: '8px' }}>
                        These Terms should be read together with the applicable:
                    </p>
                    <ul style={{ fontSize: '14px', lineHeight: 1.8, color: '#475569', paddingLeft: '20px', margin: '0 0 12px 0' }}>
                        <li><a href="/participant-waiver" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Participant Waiver and Health Declaration</a></li>
                        <li><a href="/privacy-policy" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy and Privacy Notice</a></li>
                        <li><a href="/refund-policy" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Refund and Cancellation Policy</a></li>
                        <li><a href="/safeguarding-policy" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Safeguarding Policy</a></li>
                        <li><a href="/disclaimer" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Legal Disclaimer</a></li>
                        <li>Event-specific instructions and race rules</li>
                    </ul>
                    <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#92400E', backgroundColor: '#FEF3C7', padding: '10px 14px', borderRadius: '8px', margin: 0, fontWeight: 500 }}>
                        Where registering a minor, the parent or legal guardian must complete the applicable consent requirements.
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 1. Event Scope */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>01.</span> Movement &amp; City Editions
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '10px' }}>
                            FLEXATHON — The Global Goals Run is a national multi-city initiative. Race parameters, including venue, route, start times, and distances, are defined independently per city edition (e.g. Hyderabad Flagship Edition, completed 18 October 2026; Kochi Edition, Coming Soon).
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>Organiser:</strong> Flexon Sports Foundation<br />
                            <strong>Official Website:</strong> <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 500 }}>https://flexathonrun.org/</a><br />
                            <strong>Helpdesk:</strong> <a href="mailto:info@flexathonrun.org" style={{ color: '#2563EB', fontWeight: 500 }}>info@flexathonrun.org</a> | +91 90749 34014
                        </div>
                    </div>

                    {/* 2-6. Registration & Eligibility */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>02–06.</span> Registration, Fees &amp; Eligibility
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Registration is confirmed upon receipt of accurate details and payment verification. Participants must meet age guidelines for their selected distance (e.g. 10K: age 14+; 5K: age 10+; 3K: open for all ages and families). Inaccurate registrations or intentional misrepresentation may lead to category reallocation or disqualification.
                        </p>
                    </div>

                    {/* 7-10. Health, Medical & Risk Waiver */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>07–10.</span> Health, Safety &amp; Medical Authority
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Running involves inherent physical exertion and cardiovascular demands. Participants affirm that they are medically fit. Race officials and medical personnel retain absolute authority to withdraw any runner exhibiting signs of severe distress, dehydration, or injury for their own safety.
                        </p>
                    </div>

                    {/* 11-15. Timing Chips, Results & Cash Awards */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>11–15.</span> Timing Chips, Awards &amp; Disqualification
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Timing chips are assigned to individual registered bibs. Any bib-swapping, route cutting, or unsportsmanlike conduct results in immediate disqualification. Cash prizes (such as the verified Hyderabad ₹60,000 purse with equal payout for men and women) are finalized only after technical chip scrutiny, route checkpoint verification, and mandatory ID validation.
                        </p>
                    </div>

                    {/* 16-19. Postponement, Cancellations & Kits */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>16–19.</span> Event Adjustments &amp; Entitlements
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            The Organiser reserves the right to make modifications to start times, route layout, or staging zones if necessitated by civil authorities, police instructions, extreme weather, or safety emergencies. Finisher medals are awarded only upon crossing the official finish line.
                        </p>
                    </div>

                    {/* 25-28. SDG Notice & Liability */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>25–28.</span> Independent SDG Alignment &amp; Liability
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            FLEXATHON references the UN Sustainable Development Goals for community education and awareness; this does not constitute United Nations sponsorship or official affiliation. To the maximum extent permitted by applicable Indian law, the Organiser shall not be liable for indirect damages or lost personal property.
                        </p>
                    </div>

                    {/* 36. Contact & Entire Agreement */}
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>36.</span> Contact &amp; Legal Notices
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                            For questions, official inquiries, or notices regarding these Terms:
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>FLEXATHON Race Management:</strong> Flexon Sports Foundation<br />
                            <strong>Email:</strong> <a href="mailto:info@flexathonrun.org" style={{ color: '#2563EB', fontWeight: 600 }}>info@flexathonrun.org</a><br />
                            <strong>Helpline:</strong> +91 90749 34014 | <strong>Operations Desk:</strong> +91 94970 63919<br />
                            <strong>Website:</strong> <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 600 }}>https://flexathonrun.org/</a>
                        </div>
                    </div>
                </div>
            </div>
        </LegalPageShell>
    );
}
