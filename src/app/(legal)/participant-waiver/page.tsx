'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function ParticipantWaiverPage() {
    return (
        <LegalPageShell
            title="Participant Waiver &amp; Health Declaration"
            subtitle="Mandatory athletic waiver, assumption of physical risk, and medical declaration"
            effectiveDate="Effective Date: 17 August 2026 • Last Updated: October 2026"
        >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '24px', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        FLEXATHON — Participant Waiver &amp; Health Declaration
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '14px' }}>
                        This Participant Waiver &amp; Health Declaration applies to participation in <strong>FLEXATHON — The Global Goals Run</strong>, organised by <strong>Flexon Sports Foundation</strong>.
                    </p>
                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px 18px', fontSize: '14px', lineHeight: 1.8, color: '#334155', marginBottom: '14px' }}>
                        <strong>Flagship Edition:</strong> Hyderabad (ESCI Campus, Gachibowli • 18 October 2026 • Completed)<br />
                        <strong>Upcoming Edition:</strong> Kochi (Details TBA • Registration Interest Active)<br />
                        <strong>Categories:</strong> 3K Community Walk/Run, 5K Fitness Run, 10K Challenge
                    </div>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#0F172A', fontWeight: 600, marginBottom: '6px' }}>
                        Please read this declaration carefully before registering or participating.
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#64748B', margin: 0 }}>
                        By completing registration or starting the event, you confirm that you understand the physical nature of road running, voluntarily assume all inherent risks, and agree to comply with safety rules.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 1. Voluntary Participation */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>01.</span> Voluntary Participation &amp; Awareness
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            I confirm that my participation in FLEXATHON is entirely voluntary. I have chosen to take part knowing the distance, terrain, surface conditions, and environmental factors associated with the event.
                        </p>
                    </div>

                    {/* 2. Medical Fitness Declaration */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>02.</span> Physical Fitness &amp; Health Declaration
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '8px' }}>
                            I declare that I am physically fit, have sufficiently trained for the distance chosen, and do not suffer from any undisclosed medical condition, cardiovascular impairment, or injury that would make physical running unsafe.
                        </p>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            I understand that running against medical advice presents severe health risks and confirm I have sought medical clearance where advisable.
                        </p>
                    </div>

                    {/* 3. Assumption of Inherent Risk */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>03.</span> Assumption of Inherent Athletic Risk
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            I acknowledge that mass participation sporting events carry inherent risks, including fatigue, muscle sprains, dehydration, heat distress, falls, collisions with other participants, and uneven running surfaces. I knowingly and freely assume all such risks, both known and unknown.
                        </p>
                    </div>

                    {/* 4. Emergency Medical Treatment Consent */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>04.</span> Emergency Medical Treatment
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            In the event of an accident, exhaustion, or medical emergency during the event, I authorize designated event medical personnel and first responders to administer necessary first aid and arrange emergency hospitalization if deemed required.
                        </p>
                    </div>

                    {/* 5. Minor Participant Declaration */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>05.</span> Minor Participant Consent (Under 18)
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            If registering on behalf of a minor, the parent or lawful guardian confirms that they have read and consented to all terms of this waiver on behalf of the minor participant and assume full parental responsibility for their physical readiness.
                        </p>
                    </div>

                    {/* 6. Release & Limitation of Liability */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>06.</span> Release of Claims
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            To the extent permitted by Indian law, I release and hold harmless Flexon Sports Foundation, its trustees, event directors, coordinators, volunteers, medical partners, and venue authorities from any claim or loss arising out of my voluntary participation, except where resulting from gross negligence or intentional wrongdoing.
                        </p>
                    </div>

                    {/* Contact & Support */}
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>07.</span> Contact &amp; Safety Desk
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                            For questions regarding participant health protocols or safety arrangements:
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>FLEXATHON Safety &amp; Medical Desk:</strong> Flexon Sports Foundation<br />
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
