'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function PrivacyPolicyPage() {
    return (
        <LegalPageShell
            title="Privacy Policy"
            subtitle="Compliant with the Digital Personal Data Protection Act, 2023 (DPDP)"
            effectiveDate="Effective Date: 17 August 2026 • Last Updated: October 2026"
        >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '24px', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        FLEXATHON — Privacy Policy
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                        At <strong>FLEXATHON</strong>, organised by <strong>Flexon Sports Foundation</strong>, we respect your privacy
                        and are committed to handling personal information responsibly, transparently and securely.
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                        This Privacy Policy explains how we collect, use, store, share and protect personal information when you:
                    </p>
                    <ul style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', paddingLeft: '20px', margin: '0 0 12px 0' }}>
                        <li>Visit <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'underline' }}>https://flexathonrun.org/</a>;</li>
                        <li>Register for a FLEXATHON event;</li>
                        <li>Purchase or obtain an event registration;</li>
                        <li>Participate in a FLEXATHON race or activity;</li>
                        <li>Contact us;</li>
                        <li>Volunteer, partner or collaborate with us;</li>
                        <li>Subscribe to communications;</li>
                        <li>Interact with our digital platforms; or</li>
                        <li>Otherwise provide personal information to us.</li>
                    </ul>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                        For the purposes of applicable data-protection law, Flexon Sports Foundation is responsible for determining the purposes for which personal information collected directly by FLEXATHON is processed.
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#64748B', margin: 0 }}>
                        This Privacy Policy should be read together with our <a href="/terms-of-use" style={{ color: '#2563EB', fontWeight: 500 }}>Terms &amp; Conditions</a>, <a href="/participant-waiver" style={{ color: '#2563EB', fontWeight: 500 }}>Participant Waiver</a>, <a href="/refund-policy" style={{ color: '#2563EB', fontWeight: 500 }}>Refund &amp; Cancellation Policy</a>, <a href="/safeguarding-policy" style={{ color: '#2563EB', fontWeight: 500 }}>Safeguarding Policy</a>, <a href="/disclaimer" style={{ color: '#2563EB', fontWeight: 500 }}>Legal Disclaimer</a> and any specific privacy notice displayed when information is collected.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 1. Who We Are */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>01.</span> Who We Are
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '10px' }}>
                            FLEXATHON is an independent sporting and social-impact initiative organised by Flexon Sports Foundation.
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>Legal Entity:</strong> Flexon Sports Foundation<br />
                            <strong>Website:</strong> <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 500 }}>https://flexathonrun.org/</a><br />
                            <strong>Email:</strong> <a href="mailto:info@flexathonrun.org" style={{ color: '#2563EB', fontWeight: 500 }}>info@flexathonrun.org</a><br />
                            <strong>Official Helpline:</strong> +91 90749 34014 | <strong>Operations Desk:</strong> +91 94970 63919
                        </div>
                    </div>

                    {/* 2. Scope of This Privacy Policy */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>02.</span> Scope of This Privacy Policy
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            This Privacy Policy applies to personal information collected by or on behalf of FLEXATHON through our website, registration systems, authorised event platforms, communications, event activities and related services.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            It does not govern the independent privacy practices of third-party websites or platforms that operate under their own privacy policies.
                        </p>
                    </div>

                    {/* 3. Personal Information We May Collect */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>03.</span> Personal Information We May Collect
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            The information collected depends on how you interact with FLEXATHON. When you register for an event, we may collect:
                        </p>
                        <ul style={{ fontSize: '14px', lineHeight: 1.75, color: '#475569', paddingLeft: '20px', margin: '0 0 8px 0' }}>
                            <li>Full name;</li>
                            <li>Email address;</li>
                            <li>Mobile or WhatsApp number;</li>
                            <li>Date of birth &amp; age;</li>
                            <li>Gender, where required for event administration;</li>
                            <li>Selected race category;</li>
                            <li>T-shirt size;</li>
                            <li>Blood group, where requested;</li>
                            <li>Emergency-contact information;</li>
                            <li>Address or location information where required;</li>
                            <li>Participant photograph or profile image, where submitted;</li>
                            <li>Registration number, race bib number, timing information, race results; and</li>
                            <li>Other information reasonably necessary to manage participation.</li>
                        </ul>
                    </div>

                    {/* 4. Health and Emergency Information */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>04.</span> Health and Emergency Information
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            For participant safety, we may request limited health or emergency-related information such as blood group, emergency-contact details, and voluntary medical disclosures. Access is limited strictly to authorized medical and safety coordinators.
                        </p>
                    </div>

                    {/* 5. Information Relating to Children and Minors */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>05.</span> Information Relating to Children and Minors
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Where information relating to a minor is collected, we require verifiable consent from a parent or lawful guardian. We do not use children&apos;s personal information for behavioral advertising or profiling.
                        </p>
                    </div>

                    {/* 6. Payment Information */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>06.</span> Payment Information
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Payments for registrations are processed through PCI-DSS compliant payment gateways. We receive transaction verification references only.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#DC2626', fontWeight: 600, margin: 0 }}>
                            FLEXATHON will never request your banking password, UPI PIN, card PIN or OTP.
                        </p>
                    </div>

                    {/* 7-10. Technical & Processing Operations */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>07–10.</span> Data Usage, Cookies &amp; Operations
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            We process personal information exclusively for event registration, race logistics, timing/results verification, safety coordination, official certificates, and customer support. Cookies are used solely for essential site functionality and aggregated traffic diagnostics.
                        </p>
                    </div>

                    {/* 11-16. Communications, Media & Results */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>11–16.</span> Communications, Media &amp; Public Results
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            For timed categories (5K and 10K), participant name, bib number, category, net chip time, and rank are publicly published as official sporting results. Private details (phone, email, emergency contacts) are strictly protected and never published.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Event photos and video footage capture sporting moments and community celebrations in compliance with our Safeguarding Policy.
                        </p>
                    </div>

                    {/* 17. Zero Data Sale Guarantee */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>17.</span> Zero Sale of Personal Information
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#059669', fontWeight: 700, margin: 0 }}>
                            FLEXATHON and Flexon Sports Foundation do not sell, rent, or trade participant personal information to third parties or commercial sponsors.
                        </p>
                    </div>

                    {/* 21-27. Retention, Security & Participant Rights */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>21–27.</span> Data Security, Retention &amp; DPDP Rights
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            Under the Digital Personal Data Protection Act (DPDP Act, 2023), participants retain the right to access, correct, update, or request erasure of personal data, as well as submit grievances.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            We implement SSL encryption, restricted administrative access, and strict data retention schedules. Records are retained only for legally mandated periods (such as accounting audits and dispute verification) and securely destroyed thereafter.
                        </p>
                    </div>

                    {/* 36. Contact & Grievance Officer */}
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>36.</span> Contact &amp; Grievance Redressal
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                            For questions, data access requests, or privacy concerns:
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>Privacy &amp; Grievance Desk:</strong> Flexon Sports Foundation<br />
                            <strong>Email:</strong> <a href="mailto:info@flexathonrun.org" style={{ color: '#2563EB', fontWeight: 600 }}>info@flexathonrun.org</a><br />
                            <strong>Official Helpline:</strong> +91 90749 34014 | <strong>Operations Desk:</strong> +91 94970 63919<br />
                            <strong>Website:</strong> <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 600 }}>https://flexathonrun.org/</a>
                        </div>
                    </div>
                </div>
            </div>
        </LegalPageShell>
    );
}
