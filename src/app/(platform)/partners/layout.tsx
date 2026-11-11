import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Ecosystem | FLEXATHON — The Global Goals Run",
  description: "Partner with FLEXATHON — The Global Goals Run. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
  alternates: {
    canonical: "https://flexathonrun.org/partners",
  },
  openGraph: {
    title: "Partners & Ecosystem | FLEXATHON — The Global Goals Run",
    description: "Partner with FLEXATHON — The Global Goals Run. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
    url: "https://flexathonrun.org/partners",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Partners & Ecosystem | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Ecosystem | FLEXATHON — The Global Goals Run",
    description: "Partner with FLEXATHON — The Global Goals Run. Institutional, corporate, and community partnership opportunities for India's premier Global Goals running movement.",
    images: ["https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg"],
  },
};

export default function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
