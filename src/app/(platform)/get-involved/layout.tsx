import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved — Runners, Partners & Supporters | FLEXATHON 2026",
  description: "Join FLEXATHON 2026 Hyderabad as a participant, school, corporate team, or community partner.",
  alternates: {
    canonical: "https://flexathonrun.org/get-involved",
  },
  openGraph: {
    title: "Get Involved — Runners, Partners & Supporters | FLEXATHON 2026",
    description: "Join FLEXATHON 2026 Hyderabad as a participant, school, corporate team, or community partner.",
    url: "https://flexathonrun.org/get-involved",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Get Involved — Runners, Partners & Supporters | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Involved — Runners, Partners & Supporters | FLEXATHON 2026",
    description: "Join FLEXATHON 2026 Hyderabad as a participant, school, corporate team, or community partner.",
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
