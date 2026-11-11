import editionsRaw from '../../data/editions.json';

export type EditionStatus =
    | 'Draft'
    | 'Coming Soon'
    | 'Registration Open'
    | 'Registration Closed'
    | 'Sold Out'
    | 'Completed'
    | 'Archived';

export interface RaceCategory {
    distance: string;
    name: string;
    startTime: string;
    reportingTime: string;
    price: number | null;
    priceLabel: string;
    timing: string;
    ageEligibility: string;
    perks: string[];
    capacity: string;
}

export interface ScheduleItem {
    time: string;
    title: string;
    detail: string;
}

export interface PrizePlace {
    place: string;
    amount: string;
}

export interface PrizeCategory {
    distance: string;
    subPoolLabel: string;
    men: PrizePlace[];
    women: PrizePlace[];
}

export interface EditionPartner {
    scope: 'edition' | 'national';
    editionSlug?: string;
    category: string;
    name: string;
    logo: string;
    url?: string;
}

export interface EditionGalleryItem {
    id: string;
    src: string;
    alt: string;
    caption: string;
    category: string;
}

export interface Edition {
    id: string;
    slug: string;
    publicPath: string;
    city: string;
    state: string;
    year: number | null;
    editionName: string;
    statusBadgeText: string;
    eventDate: string | null;
    eventDateDisplay: string;
    timezone: string;
    venue: string;
    venueAddress: string;
    mapUrl: string | null;
    description: string;
    heroAsset: string;
    imageGallery: EditionGalleryItem[];
    sdgFocusIds: number[];
    raceCategories: RaceCategory[];
    schedule: ScheduleItem[];
    routes: {
        summary: string;
        startPoint: string;
        finishPoint: string;
    } | null;
    kitCollection: {
        status: string;
        notes: string;
    } | null;
    prizes: {
        totalPool: number;
        totalPoolLabel: string;
        categories: PrizeCategory[];
        note: string;
    } | null;
    raceRules: string[];
    faq: { q: string; a: string }[];
    partners: EditionPartner[];
    discoveryPlatforms: { name: string; logo: string }[];
    organizer: string;
    contact: {
        email: string;
        phone: string;
        whatsapp: string;
    };
    registrationProvider: string | null;
    registrationUrl: string | null;
    registrationOpenAt: string | null;
    registrationCloseAt: string | null;
    resultsUrl: string | null;
    certificatesUrl: string | null;
    runnerCardSettings: {
        enabled: boolean;
        route: string | null;
        mode: 'commemorative' | 'active' | 'disabled';
    };
    status: EditionStatus;
    published: boolean;
    seoTitle: string;
    metaDescription: string;
    ogImage: string;
    createdAt: string;
    updatedAt: string;
}

export const EDITIONS_DATA: Edition[] = editionsRaw as unknown as Edition[];

export function getPublishedEditions(): Edition[] {
    return EDITIONS_DATA.filter((ed) => ed.published && ed.status !== 'Draft');
}

export function getEditionBySlug(slug: string, allowUnpublished = false): Edition | undefined {
    const normalized = slug.trim().toLowerCase();
    const found = EDITIONS_DATA.find((ed) => ed.slug.toLowerCase() === normalized);
    if (!found) return undefined;
    if (!allowUnpublished && (!found.published || found.status === 'Draft')) {
        return undefined;
    }
    return found;
}

/**
 * Safety guard: Registration CTA may ONLY activate when:
 * 1) Edition is published
 * 2) Status is explicitly 'Registration Open'
 * 3) A non-empty verified registrationUrl exists
 * 4) Event date is not in the past relative to current date
 */
export function isRegistrationActive(edition: Edition): boolean {
    if (!edition.published || edition.status !== 'Registration Open') {
        return false;
    }
    if (!edition.registrationUrl || edition.registrationUrl.trim().length === 0) {
        return false;
    }
    if (edition.eventDate) {
        const eventDayEnd = new Date(`${edition.eventDate}T23:59:59+05:30`).getTime();
        if (!Number.isNaN(eventDayEnd) && Date.now() > eventDayEnd) {
            return false;
        }
    }
    return true;
}

export function getEditionCtaConfig(edition: Edition): {
    primaryLabel: string;
    primaryHref: string;
    statusLabel: string;
    statusTone: 'completed' | 'coming-soon' | 'open' | 'closed';
    canRegister: boolean;
} {
    const canRegister = isRegistrationActive(edition);
    if (canRegister && edition.registrationUrl) {
        return {
            primaryLabel: `Register for ${edition.city}`,
            primaryHref: edition.registrationUrl,
            statusLabel: 'Registration Open',
            statusTone: 'open',
            canRegister: true,
        };
    }

    switch (edition.status) {
        case 'Completed':
        case 'Archived':
            return {
                primaryLabel: `Explore ${edition.city} Edition`,
                primaryHref: edition.publicPath,
                statusLabel: 'Completed',
                statusTone: 'completed',
                canRegister: false,
            };
        case 'Coming Soon':
            return {
                primaryLabel: `Explore ${edition.city} Edition`,
                primaryHref: edition.publicPath,
                statusLabel: 'Coming Soon',
                statusTone: 'coming-soon',
                canRegister: false,
            };
        case 'Registration Closed':
        case 'Sold Out':
        default:
            return {
                primaryLabel: `Explore ${edition.city} Edition`,
                primaryHref: edition.publicPath,
                statusLabel: edition.status === 'Sold Out' ? 'Sold Out' : 'Registration Closed',
                statusTone: 'closed',
                canRegister: false,
            };
    }
}
