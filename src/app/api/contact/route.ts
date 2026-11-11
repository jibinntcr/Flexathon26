import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath } from '@/lib/data-paths';

const ENQUIRIES_FILE = getDataFilePath('enquiries.json');
const CONTACTS_FILE = getDataFilePath('contacts.json');

// In-memory rate limit store (per IP)
const rateLimitMap = new Map<string, { count: number; windowStart: number; lastSignature: string; lastTime: number }>();

function sanitizeText(val: unknown, maxLen = 1000): string {
    if (typeof val !== 'string') return '';
    return val.replace(/[<>]/g, '').trim().slice(0, maxLen);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Bot honeypot check
        if (body.website && String(body.website).trim().length > 0) {
            return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
        }

        const name = sanitizeText(body.name, 120);
        const email = sanitizeText(body.email, 160).toLowerCase();
        const phone = sanitizeText(body.phone, 30);
        const city = sanitizeText(body.city, 100);
        const edition = sanitizeText(body.edition || 'master', 60) || 'master';
        const category = sanitizeText(body.category || body.subject || 'General Enquiry', 120);
        const subject = sanitizeText(body.subject || category || 'General Enquiry', 160);
        const organization = sanitizeText(body.organization, 160);
        const message = sanitizeText(body.message || `Interest registered for ${edition} (${category})`, 2500);
        const consent = Boolean(body.consent ?? true);
        const isTestLead = Boolean(body.isTestLead) || email.endsWith('@example.com') || email.includes('playwright-test');

        if (!name || name.length < 2) {
            return NextResponse.json({ error: 'Please enter your full name (at least 2 characters).' }, { status: 400 });
        }

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
        }

        if (phone && !/^[+\d\s\-()]{7,20}$/.test(phone)) {
            return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
        }

        if (!message || message.length < 3) {
            return NextResponse.json({ error: 'Please include a brief message or enquiry details.' }, { status: 400 });
        }

        if (body.requireConsent && !consent) {
            return NextResponse.json(
                { error: 'Please confirm your consent to be contacted regarding your enquiry.' },
                { status: 400 }
            );
        }

        // Rate-limit & duplicate check
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
        const now = Date.now();
        const signature = `${email}|${edition}|${category}|${message.slice(0, 80)}`;
        const rateEntry = rateLimitMap.get(ip);

        if (rateEntry) {
            if (now - rateEntry.lastTime < 15000 && rateEntry.lastSignature === signature) {
                return NextResponse.json(
                    { error: 'Duplicate submission received. We have already recorded your enquiry.' },
                    { status: 429 }
                );
            }
            if (now - rateEntry.windowStart < 60000) {
                if (rateEntry.count >= 12) {
                    return NextResponse.json(
                        { error: 'Too many submissions from your network. Please wait a minute and try again.' },
                        { status: 429 }
                    );
                }
                rateEntry.count += 1;
                rateEntry.lastSignature = signature;
                rateEntry.lastTime = now;
            } else {
                rateLimitMap.set(ip, { count: 1, windowStart: now, lastSignature: signature, lastTime: now });
            }
        } else {
            rateLimitMap.set(ip, { count: 1, windowStart: now, lastSignature: signature, lastTime: now });
        }

        // Load existing enquiries safely
        let enquiries: Record<string, unknown>[] = [];
        if (fs.existsSync(ENQUIRIES_FILE)) {
            try {
                const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
                enquiries = JSON.parse(raw);
                if (!Array.isArray(enquiries)) enquiries = [];
            } catch (e) {
                console.error('Error reading enquiries file:', e);
                enquiries = [];
            }
        }

        const newEnquiry = {
            id: `ENQ-${Date.now()}`,
            name,
            email,
            phone: phone || 'Not provided',
            city: city || (edition === 'kochi2027' ? 'Kochi' : edition === 'hydoct18' ? 'Hyderabad' : 'Not specified'),
            edition,
            category,
            organization: organization || undefined,
            subject,
            message,
            consent,
            isTestLead,
            status: 'New',
            createdAt: new Date().toISOString(),
        };

        enquiries.unshift(newEnquiry);
        fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));

        // Sync non-test leads to contacts.json with edition isolation tag
        if (!isTestLead) {
            try {
                let contacts: Record<string, unknown>[] = [];
                if (fs.existsSync(CONTACTS_FILE)) {
                    const rawContacts = fs.readFileSync(CONTACTS_FILE, 'utf8');
                    const parsed = JSON.parse(rawContacts);
                    if (Array.isArray(parsed)) contacts = parsed;
                }
                const tag = edition === 'kochi2027' ? `Kochi Interest (${category})` : `${edition.toUpperCase()} — ${category}`;
                const existingIdx = contacts.findIndex(
                    (c) => typeof c.email === 'string' && c.email.toLowerCase() === email && c.tag === tag
                );
                if (existingIdx === -1) {
                    contacts.push({
                        id: `cnt_${Date.now()}`,
                        name,
                        email,
                        phone: phone || '',
                        city: newEnquiry.city,
                        edition,
                        tag,
                        createdAt: newEnquiry.createdAt,
                    });
                    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
                }
            } catch (contactSyncErr) {
                console.error('Non-fatal contact sync warning:', contactSyncErr);
            }
        }

        // Send Email Notification via Brevo if configured (skip for automated test leads)
        const brevoKey = process.env.BREVO_API_KEY;
        if (brevoKey && !isTestLead) {
            try {
                await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'api-key': brevoKey,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        sender: { name: 'FLEXATHON Support', email: 'info@flexathonrun.org' },
                        to: [{ email: 'info@flexathonrun.org', name: 'FLEXATHON Admin' }],
                        replyTo: { email, name },
                        subject: `[FLEXATHON ${edition.toUpperCase()}] ${subject} — ${name}`,
                        htmlContent: `
                            <div style="font-family: sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                                <h2 style="color: #C5192D;">New FLEXATHON Platform Enquiry</h2>
                                <p><strong>Edition Scope:</strong> ${edition}</p>
                                <p><strong>Category:</strong> ${category}</p>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                                <p><strong>City:</strong> ${newEnquiry.city}</p>
                                ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ''}
                                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
                                <p><strong>Message:</strong></p>
                                <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 4px; border: 1px solid #eee;">${message}</p>
                            </div>
                        `,
                    }),
                });
            } catch (emailErr) {
                console.error('Failed to send Brevo notification:', emailErr);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Enquiry saved successfully.',
            enquiryId: newEnquiry.id,
            edition: newEnquiry.edition,
            category: newEnquiry.category,
        });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
