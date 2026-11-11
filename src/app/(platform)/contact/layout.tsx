import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Support | FLEXATHON — The Global Goals Run",
  description: "Connect with Flexon Sports Foundation for city editions, partnership collaborations, volunteering, and runner assistance across Indian host cities.",
  alternates: {
    canonical: "https://flexathonrun.org/contact",
  },
  openGraph: {
    title: "Contact & Support | FLEXATHON — The Global Goals Run",
    description: "Connect with Flexon Sports Foundation for city editions, partnership collaborations, volunteering, and runner assistance across Indian host cities.",
    url: "https://flexathonrun.org/contact",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Contact & Support | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Support | FLEXATHON — The Global Goals Run",
    description: "Connect with Flexon Sports Foundation for city editions, partnership collaborations, volunteering, and runner assistance across Indian host cities.",
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
