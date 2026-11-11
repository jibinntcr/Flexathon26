import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { getDataFilePath } from '@/lib/data-paths';
import { Edition, EDITIONS_DATA } from '@/lib/editions';

const EDITIONS_FILE = getDataFilePath('editions.json');

function loadEditionsFromDisk(): Edition[] {
    try {
        if (fs.existsSync(EDITIONS_FILE)) {
            const raw = fs.readFileSync(EDITIONS_FILE, 'utf8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error('Failed to read editions.json:', err);
    }
    return EDITIONS_DATA;
}

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get('slug');
    const allEditions = loadEditionsFromDisk();
    // Never expose unpublished or Draft editions publicly
    const publishedEditions = allEditions.filter((ed) => ed.published && ed.status !== 'Draft');

    if (slug) {
        const match = publishedEditions.find((ed) => ed.slug.toLowerCase() === slug.toLowerCase());
        if (!match) {
            return NextResponse.json({ error: 'Edition not found' }, { status: 404 });
        }
        return NextResponse.json({ edition: match });
    }

    return NextResponse.json({ editions: publishedEditions });
}
