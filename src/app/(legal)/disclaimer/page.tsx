'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function DisclaimerPage() {
    return (
        <LegalPageShell
            title="Legal Disclaimer"
            subtitle="Operational notices, health assumptions, and independent movement governance"
            effectiveDate="Effective Date: 17 August 2026 • Last Updated: October 2026"
        >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '20px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '15.5px', lineHeight: 1.75, color: '#334155', marginBottom: '14px', fontWeight: 500 }}>
                        This website, <a href="https://flexathonrun.org" style={{ color: '#2563EB', textDecoration: 'underline', fontWeight: 600 }}>flexathonrun.org</a>, is operated in connection with <strong>FLEXATHON</strong>, an independent sporting and social-impact initiative organised by <strong>Flexon Sports Foundation</strong>.
                    </p>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                        By accessing this website, registering for an event, or participating in any FLEXATHON activity, you acknowledge and agree to the following disclaimer, together with the applicable <a href="/terms-of-use" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Terms &amp; Conditions</a>, <a href="/participant-waiver" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Participant Waiver</a>, <a href="/privacy-policy" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>, <a href="/refund-policy" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Refund &amp; Cancellation Policy</a> and other event-specific rules published by the Organiser.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                    {/* 01. General Information */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>01.</span> General Information
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Information provided on this website is intended for general informational, promotional and registration purposes. While reasonable efforts ensure content is current, event details are subject to updates. Official notifications issued by the Organiser shall prevail.
                        </p>
                    </div>

                    {/* 02. Independent Initiative */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>02.</span> Independent Initiative — No UN Affiliation
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '10px' }}>
                            FLEXATHON is an independent sporting initiative and is not an official event or project of the United Nations. References to the UN Sustainable Development Goals (SDGs) are made solely for public awareness and community education.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Nothing on this website implies endorsement, sponsorship, or formal partnership by the United Nations or any UN agency.
                        </p>
                    </div>

                    {/* 03-06. Participant Health & Risk Assumption */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>03–06.</span> Health, Risk Assumption &amp; Medical Authority
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Each participant is personally responsible for determining whether they are medically fit to complete their selected race distance. Running involves physical exertion and risks including fatigue, dehydration, and unforeseen physical strain.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            On-route first aid and ambulance services are safety-support facilities. Official medical staff retain the authority to halt any participant whose health appears at risk.
                        </p>
                    </div>

                    {/* 08. Competition & Prizes */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>08.</span> Prizes &amp; Technical Verification
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Where competitive cash awards or medals are offered, payout is conditional on strict RFID chip timing verification, route checkpoint validation, identity confirmation, and statutory tax compliance under Indian regulations.
                        </p>
                    </div>

                    {/* 10-16. Liability & External Links */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>10–16.</span> External Links, Force Majeure &amp; Liability
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            To the maximum extent permitted by applicable Indian law, the Organiser shall not be liable for indirect losses, unforeseen weather interruptions, or civil authority directions beyond its reasonable control. External links operate under their respective operators&apos; policies.
                        </p>
                    </div>

                    {/* 20. Contact */}
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>20.</span> Contact &amp; Governance Desk
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '10px' }}>
                            Questions regarding this disclaimer or official event policies:
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>FLEXATHON Legal &amp; Compliance:</strong> Flexon Sports Foundation<br />
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
