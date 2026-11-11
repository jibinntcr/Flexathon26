import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FLEXATHON Kochi Edition — Coming Soon | Kerala | The Global Goals Run',
    description:
        'FLEXATHON — The Global Goals Run is coming next to Kochi, Kerala. Register your interest to receive verified updates once the official event date, venue, race categories, and Global Goal focus are announced.',
    alternates: {
        canonical: 'https://flexathonrun.org/kochi2027',
    },
    openGraph: {
        title: 'FLEXATHON Kochi Edition — Coming Soon | Kerala',
        description:
            'Kochi, Kerala is the next announced host city for FLEXATHON — The Global Goals Run. Register your interest for verified updates.',
        url: 'https://flexathonrun.org/kochi2027',
        siteName: 'FLEXATHON — The Global Goals Run',
        images: [
            {
                url: '/assets/gallery/oct18/NIX09962.JPG',
                width: 1200,
                height: 630,
                alt: 'FLEXATHON Kochi Edition — Coming Soon',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
};

export default function KochiEditionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
