import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FLEXATHON 2026 Hyderabad",
  description: "Find answers to common questions about FLEXATHON 2026 registration, categories, timing chips, bib distribution, venue, and race day schedule.",
  alternates: {
    canonical: "https://flexathonrun.org/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | FLEXATHON 2026 Hyderabad",
    description: "Find answers to common questions about FLEXATHON 2026 registration, categories, timing chips, bib distribution, venue, and race day schedule.",
    url: "https://flexathonrun.org/faqs",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Frequently Asked Questions | FLEXATHON 2026 Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | FLEXATHON 2026 Hyderabad",
    description: "Find answers to common questions about FLEXATHON 2026 registration, categories, timing chips, bib distribution, venue, and race day schedule.",
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
