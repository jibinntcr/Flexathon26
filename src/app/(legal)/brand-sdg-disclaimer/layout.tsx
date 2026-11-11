import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand & SDG Disclaimer | FLEXATHON",
  description: "Clarifications regarding independent organization, UN Sustainable Development Goals alignment, and trademark usage.",
  alternates: {
    canonical: "https://flexathonrun.org/brand-sdg-disclaimer",
  },
  openGraph: {
    title: "Brand & SDG Disclaimer | FLEXATHON",
    description: "Clarifications regarding independent organization, UN Sustainable Development Goals alignment, and trademark usage.",
    url: "https://flexathonrun.org/brand-sdg-disclaimer",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Brand & SDG Disclaimer | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand & SDG Disclaimer | FLEXATHON",
    description: "Clarifications regarding independent organization, UN Sustainable Development Goals alignment, and trademark usage.",
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
