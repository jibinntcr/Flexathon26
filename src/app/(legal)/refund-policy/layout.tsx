import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | FLEXATHON 2026",
  description: "Official refund schedules, transfer rules, and cancellation policies for FLEXATHON 2026 registrations.",
  alternates: {
    canonical: "https://flexathonrun.org/refund-policy",
  },
  openGraph: {
    title: "Refund & Cancellation Policy | FLEXATHON 2026",
    description: "Official refund schedules, transfer rules, and cancellation policies for FLEXATHON 2026 registrations.",
    url: "https://flexathonrun.org/refund-policy",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Refund & Cancellation Policy | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund & Cancellation Policy | FLEXATHON 2026",
    description: "Official refund schedules, transfer rules, and cancellation policies for FLEXATHON 2026 registrations.",
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
