'use client';

import React from 'react';
import LegalPageShell from '@/components/legal/LegalPageShell';

export default function RefundPolicyPage() {
    return (
        <LegalPageShell
            title="Refund &amp; Cancellation Policy"
            subtitle="Transparent guidelines for ticket cancellations, duplicate payments, and event deferrals"
            effectiveDate="Effective Date: 17 August 2026 • Last Updated: October 2026"
        >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '24px', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '12px' }}>
                        FLEXATHON — Refund &amp; Cancellation Policy
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', marginBottom: '14px' }}>
                        This Refund &amp; Cancellation Policy applies to participant registrations for <strong>FLEXATHON — The Global Goals Run</strong>, organised by <strong>Flexon Sports Foundation</strong>.
                    </p>
                    <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#64748B', margin: 0 }}>
                        By completing a registration, participants acknowledge and agree to this Policy together with the <a href="/terms-of-use" style={{ color: '#2563EB', fontWeight: 500 }}>FLEXATHON Terms &amp; Conditions</a>.
                    </p>
                </div>

                {/* Refund Schedule Table */}
                <div style={{ marginBottom: '32px', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '20px', overflowX: 'auto' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#C5192D' }}>⚡</span> Cancellation &amp; Refund Schedule
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #CBD5E1', color: '#0F172A' }}>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Request Timeline</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Refund Percentage</th>
                                <th style={{ padding: '10px 12px', fontWeight: 700 }}>Processing Terms</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: '#334155' }}>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '12px' }}><strong>30+ Days Prior</strong> to Race Day</td>
                                <td style={{ padding: '12px', color: '#059669', fontWeight: 700 }}>75% Refund</td>
                                <td style={{ padding: '12px' }}>Excludes gateway fees and administrative overhead</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                                <td style={{ padding: '12px' }}><strong>15 to 29 Days Prior</strong></td>
                                <td style={{ padding: '12px', color: '#D97706', fontWeight: 700 }}>50% Refund</td>
                                <td style={{ padding: '12px' }}>Kit production and customized bib allotment initiated</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px' }}><strong>Less than 15 Days</strong> / No-Show</td>
                                <td style={{ padding: '12px', color: '#DC2626', fontWeight: 700 }}>Non-Refundable</td>
                                <td style={{ padding: '12px' }}>Personalized bib printed and runner insurance finalized</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 01. Duplicate Payments */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>01.</span> Duplicate or Erroneous Transactions
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Where multiple transactions occur for a single participant entry due to network or gateway timeouts, verified duplicate charges will be refunded <strong>100%</strong> to the original payment source upon prompt reporting to our helpdesk with transaction references.
                        </p>
                    </div>

                    {/* 02. Medical Withdrawal */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>02.</span> Medical Injury or Illness Withdrawal
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            If an unforeseen medical condition or injury prevents a runner from participating, the registration may be deferred to the subsequent city edition or granted partial credit upon submission of an authentic medical certificate issued by a registered medical practitioner at least 7 days before race day.
                        </p>
                    </div>

                    {/* 03. Postponement or Force Majeure */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>03.</span> Event Postponement &amp; Force Majeure
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            If an event must be rescheduled due to adverse extreme weather, public health directives, or civil authority instructions, confirmed registrations automatically transfer to the rescheduled date. If a participant cannot attend the revised date, an option for edition transfer or voucher credit will be provided.
                        </p>
                    </div>

                    {/* 04. Bib Transfer Rules */}
                    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>04.</span> Strict Transfer Rules
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', margin: 0 }}>
                            Race bibs and timing chips are strictly non-transferable to other individuals without official authorization from race management. Unofficial bib transfers void all medical insurance coverage, chip timing legitimacy, and award eligibility.
                        </p>
                    </div>

                    {/* Support Desk */}
                    <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                            <span style={{ color: '#C5192D', fontSize: '15px', fontWeight: 800 }}>05.</span> Refund &amp; Billing Support
                        </h3>
                        <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#475569', marginBottom: '12px' }}>
                            To submit a cancellation, duplicate payment notice, or deferral request:
                        </p>
                        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '18px', fontSize: '14px', lineHeight: 1.8, color: '#334155' }}>
                            <strong>FLEXATHON Ticketing &amp; Accounts Desk:</strong> Flexon Sports Foundation<br />
                            <strong>Email:</strong> <a href="mailto:info@flexathonrun.org?subject=Refund%20Request" style={{ color: '#2563EB', fontWeight: 600 }}>info@flexathonrun.org</a><br />
                            <strong>Helpline:</strong> +91 90749 34014 | <strong>Operations Desk:</strong> +91 94970 63919<br />
                            <strong>Website:</strong> <a href="https://flexathonrun.org/" style={{ color: '#2563EB', fontWeight: 600 }}>https://flexathonrun.org/</a>
                        </div>
                    </div>
                </div>
            </div>
        </LegalPageShell>
    );
}
