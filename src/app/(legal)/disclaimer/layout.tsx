import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer | FLEXATHON",
  description: "Official legal disclaimer and SDG alignment notice for FLEXATHON organised by Flexon Sports Foundation.",
  alternates: {
    canonical: "https://flexathonrun.org/disclaimer",
  },
  openGraph: {
    title: "Legal Disclaimer | FLEXATHON",
    description: "Official legal disclaimer and SDG alignment notice for FLEXATHON organised by Flexon Sports Foundation.",
    url: "https://flexathonrun.org/disclaimer",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Disclaimer | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Disclaimer | FLEXATHON",
    description: "Official legal disclaimer and SDG alignment notice for FLEXATHON organised by Flexon Sports Foundation.",
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
