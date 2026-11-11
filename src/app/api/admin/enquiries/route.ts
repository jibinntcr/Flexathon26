import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { verifySession } from '../auth-utils';
import { getDataFilePath } from '@/lib/data-paths';

const ENQUIRIES_FILE = getDataFilePath('enquiries.json');

export async function GET(req: NextRequest) {
    if (!verifySession(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        if (!fs.existsSync(ENQUIRIES_FILE)) {
            return NextResponse.json({ enquiries: [] });
        }
        const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
        const enquiries = JSON.parse(raw);
        return NextResponse.json({ enquiries: Array.isArray(enquiries) ? enquiries : [] });
    } catch (err) {
        console.error('Admin enquiries read error:', err);
        return NextResponse.json({ error: 'Failed to read enquiries' }, { status: 500 });
    }
}
