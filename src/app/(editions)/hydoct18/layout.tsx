import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FLEXATHON 2026 Hyderabad (Completed) | 18 Oct 2026 • ESCI Gachibowli • SDG 4',
    description:
        'Official completed edition hub for FLEXATHON 2026 Hyderabad (18 October 2026, ESCI Campus, Gachibowli). Explore 3K, 5K, and 10K race archives, ₹60,000 prize pool, SDG 4 Quality Education spotlight, and commemorative runner cards.',
    alternates: {
        canonical: 'https://flexathonrun.org/hydoct18',
    },
    openGraph: {
        title: 'FLEXATHON 2026 Hyderabad — Successfully Concluded | SDG 4 Quality Education',
        description:
            '18 October 2026 • ESCI Campus, Gachibowli, Hyderabad • 3K / 5K / 10K • Organised by Flexon Sports Foundation.',
        url: 'https://flexathonrun.org/hydoct18',
        siteName: 'FLEXATHON — The Global Goals Run',
        images: [
            {
                url: '/flexathon-2026-hyderabad-social-share.png',
                width: 1200,
                height: 630,
                alt: 'FLEXATHON 2026 Hyderabad Edition',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
};

export default function HyderabadEditionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
