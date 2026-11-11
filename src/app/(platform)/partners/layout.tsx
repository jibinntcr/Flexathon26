import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Collaborations | FLEXATHON 2026",
  description: "Partner with FLEXATHON 2026. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
  alternates: {
    canonical: "https://flexathonrun.org/partners",
  },
  openGraph: {
    title: "Partners & Collaborations | FLEXATHON 2026",
    description: "Partner with FLEXATHON 2026. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
    url: "https://flexathonrun.org/partners",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Partners & Collaborations | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Collaborations | FLEXATHON 2026",
    description: "Partner with FLEXATHON 2026. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
    images: ["https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg"],
  },
};

export default function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
