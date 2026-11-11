import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { verifySession } from '../auth-utils';
import { getDataFilePath } from '@/lib/data-paths';
import { Edition, EditionStatus, EDITIONS_DATA } from '@/lib/editions';

const EDITIONS_FILE = getDataFilePath('editions.json');
const VALID_STATUSES: EditionStatus[] = [
    'Draft',
    'Coming Soon',
    'Registration Open',
    'Registration Closed',
    'Sold Out',
    'Completed',
    'Archived',
];

function readEditions(): Edition[] {
    try {
        if (fs.existsSync(EDITIONS_FILE)) {
            return JSON.parse(fs.readFileSync(EDITIONS_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('Admin editions read error:', e);
    }
    return EDITIONS_DATA;
}

function saveEditions(editions: Edition[]) {
    fs.writeFileSync(EDITIONS_FILE, JSON.stringify(editions, null, 2));
}

export async function GET(req: NextRequest) {
    if (!verifySession(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ editions: readEditions() });
}

export async function PUT(req: NextRequest) {
    if (!verifySession(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { slug, status, statusBadgeText, eventDate, eventDateDisplay, venue, registrationUrl, published } = body;

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ error: 'Edition slug is required' }, { status: 400 });
        }

        const editions = readEditions();
        const idx = editions.findIndex((ed) => ed.slug === slug);
        if (idx === -1) {
            return NextResponse.json({ error: 'Edition not found' }, { status: 404 });
        }

        if (status && !VALID_STATUSES.includes(status)) {
            return NextResponse.json({ error: 'Invalid edition status' }, { status: 400 });
        }

        // Event-date & registration URL guard: cannot set Registration Open without a verified registrationUrl
        const nextStatus: EditionStatus = status ?? editions[idx].status;
        const nextRegUrl = registrationUrl !== undefined ? registrationUrl : editions[idx].registrationUrl;
        if (nextStatus === 'Registration Open' && (!nextRegUrl || String(nextRegUrl).trim().length === 0)) {
            return NextResponse.json(
                { error: 'Cannot set status to Registration Open without a verified registrationUrl.' },
                { status: 400 }
            );
        }

        editions[idx] = {
            ...editions[idx],
            status: nextStatus,
            statusBadgeText: typeof statusBadgeText === 'string' ? statusBadgeText.trim() : editions[idx].statusBadgeText,
            eventDate: eventDate !== undefined ? eventDate : editions[idx].eventDate,
            eventDateDisplay: typeof eventDateDisplay === 'string' ? eventDateDisplay.trim() : editions[idx].eventDateDisplay,
            venue: typeof venue === 'string' ? venue.trim() : editions[idx].venue,
            registrationUrl: nextRegUrl ? String(nextRegUrl).trim() : null,
            published: typeof published === 'boolean' ? published : editions[idx].published,
            updatedAt: new Date().toISOString(),
        };

        saveEditions(editions);
        return NextResponse.json({ success: true, edition: editions[idx] });
    } catch (err) {
        console.error('Admin editions PUT error:', err);
        return NextResponse.json({ error: 'Failed to update edition' }, { status: 500 });
    }
}
