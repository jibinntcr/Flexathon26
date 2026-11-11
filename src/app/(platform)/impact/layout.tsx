import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact & Social Mission | FLEXATHON",
  description: "Measurable social impact, educational initiatives, and sustainability outcomes driven by the FLEXATHON community.",
  alternates: {
    canonical: "https://flexathonrun.org/impact",
  },
  openGraph: {
    title: "Impact & Social Mission | FLEXATHON",
    description: "Measurable social impact, educational initiatives, and sustainability outcomes driven by the FLEXATHON community.",
    url: "https://flexathonrun.org/impact",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Impact & Social Mission | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact & Social Mission | FLEXATHON",
    description: "Measurable social impact, educational initiatives, and sustainability outcomes driven by the FLEXATHON community.",
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
