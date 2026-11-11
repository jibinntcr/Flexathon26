import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FLEXATHON & Flexon Sports Foundation",
  description: "Official Privacy Policy for FLEXATHON and Flexon Sports Foundation compliant with DPDP Act 2023.",
  alternates: {
    canonical: "https://flexathonrun.org/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | FLEXATHON & Flexon Sports Foundation",
    description: "Official Privacy Policy for FLEXATHON and Flexon Sports Foundation compliant with DPDP Act 2023.",
    url: "https://flexathonrun.org/privacy-policy",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy | FLEXATHON & Flexon Sports Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | FLEXATHON & Flexon Sports Foundation",
    description: "Official Privacy Policy for FLEXATHON and Flexon Sports Foundation compliant with DPDP Act 2023.",
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
