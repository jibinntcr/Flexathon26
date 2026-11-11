import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | FLEXATHON 2026",
  description: "Official Terms and Conditions governing participation, registration, and use of services for FLEXATHON 2026.",
  alternates: {
    canonical: "https://flexathonrun.org/terms-of-use",
  },
  openGraph: {
    title: "Terms & Conditions | FLEXATHON 2026",
    description: "Official Terms and Conditions governing participation, registration, and use of services for FLEXATHON 2026.",
    url: "https://flexathonrun.org/terms-of-use",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Terms & Conditions | FLEXATHON 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | FLEXATHON 2026",
    description: "Official Terms and Conditions governing participation, registration, and use of services for FLEXATHON 2026.",
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
