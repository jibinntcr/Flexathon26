import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Run — 3K, 5K & 10K Categories | FLEXATHON 2026 Hyderabad",
  description: "Discover the 3K Community Run, 5K Open Run, and 10K Challenge at ESCI Hyderabad on 18 October 2026. Timing, route maps, and ₹60,000 cash prizes.",
  alternates: {
    canonical: "https://flexathonrun.org/the-run",
  },
  openGraph: {
    title: "The Run — 3K, 5K & 10K Categories | FLEXATHON 2026 Hyderabad",
    description: "Discover the 3K Community Run, 5K Open Run, and 10K Challenge at ESCI Hyderabad on 18 October 2026. Timing, route maps, and ₹60,000 cash prizes.",
    url: "https://flexathonrun.org/the-run",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "The Run — 3K, 5K & 10K Categories | FLEXATHON 2026 Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Run — 3K, 5K & 10K Categories | FLEXATHON 2026 Hyderabad",
    description: "Discover the 3K Community Run, 5K Open Run, and 10K Challenge at ESCI Hyderabad on 18 October 2026. Timing, route maps, and ₹60,000 cash prizes.",
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
