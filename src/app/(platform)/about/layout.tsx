import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FLEXATHON | United by Sport, Driven by Global Goals",
  description: "Learn about FLEXATHON, an independent sporting and social-impact platform organised by Flexon Sports Foundation connecting community running with the Global Goals.",
  alternates: {
    canonical: "https://flexathonrun.org/about",
  },
  openGraph: {
    title: "About FLEXATHON | United by Sport, Driven by Global Goals",
    description: "Learn about FLEXATHON, an independent sporting and social-impact platform organised by Flexon Sports Foundation connecting community running with the Global Goals.",
    url: "https://flexathonrun.org/about",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "About FLEXATHON | United by Sport, Driven by Global Goals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FLEXATHON | United by Sport, Driven by Global Goals",
    description: "Learn about FLEXATHON, an independent sporting and social-impact platform organised by Flexon Sports Foundation connecting community running with the Global Goals.",
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
