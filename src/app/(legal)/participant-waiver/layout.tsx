import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant Waiver & Health Declaration | FLEXATHON 2026",
  description: "Safety guidelines, health declaration, and participant waiver for FLEXATHON 2026 Hyderabad.",
  alternates: {
    canonical: "https://flexathonrun.org/participant-waiver",
  },
  openGraph: {
    title: "Participant Waiver & Health Declaration | FLEXATHON 2026",
    description: "Safety guidelines, health declaration, and participant waiver for FLEXATHON 2026 Hyderabad.",
    url: "https://flexathonrun.org/participant-waiver",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Participant Waiver & Health Declaration | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Participant Waiver & Health Declaration | FLEXATHON 2026",
    description: "Safety guidelines, health declaration, and participant waiver for FLEXATHON 2026 Hyderabad.",
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
