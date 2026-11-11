import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | FLEXATHON 2026",
  description: "Accessibility standards, digital inclusion policies, and on-ground accessibility provisions for FLEXATHON events.",
  alternates: {
    canonical: "https://flexathonrun.org/accessibility-statement",
  },
  openGraph: {
    title: "Accessibility Statement | FLEXATHON 2026",
    description: "Accessibility standards, digital inclusion policies, and on-ground accessibility provisions for FLEXATHON events.",
    url: "https://flexathonrun.org/accessibility-statement",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Accessibility Statement | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessibility Statement | FLEXATHON 2026",
    description: "Accessibility standards, digital inclusion policies, and on-ground accessibility provisions for FLEXATHON events.",
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
