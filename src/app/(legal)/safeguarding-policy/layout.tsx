import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safeguarding Policy | FLEXATHON 2026",
  description: "Commitment to the protection, safety, and welfare of children, young participants, and vulnerable adults at FLEXATHON.",
  alternates: {
    canonical: "https://flexathonrun.org/safeguarding-policy",
  },
  openGraph: {
    title: "Safeguarding Policy | FLEXATHON 2026",
    description: "Commitment to the protection, safety, and welfare of children, young participants, and vulnerable adults at FLEXATHON.",
    url: "https://flexathonrun.org/safeguarding-policy",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Safeguarding Policy | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safeguarding Policy | FLEXATHON 2026",
    description: "Commitment to the protection, safety, and welfare of children, young participants, and vulnerable adults at FLEXATHON.",
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
