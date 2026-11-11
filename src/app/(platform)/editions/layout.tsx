import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "City Editions Directory | FLEXATHON — The Global Goals Run",
  description: "Browse completed and upcoming FLEXATHON host city editions across India, including the concluded Hyderabad 2026 flagship and the upcoming Kochi edition.",
  alternates: {
    canonical: "https://flexathonrun.org/editions",
  },
  openGraph: {
    title: "City Editions Directory | FLEXATHON — The Global Goals Run",
    description: "Browse completed and upcoming FLEXATHON host city editions across India, including the concluded Hyderabad 2026 flagship and the upcoming Kochi edition.",
    url: "https://flexathonrun.org/editions",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "City Editions Directory | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "City Editions Directory | FLEXATHON — The Global Goals Run",
    description: "Browse completed and upcoming FLEXATHON host city editions across India, including the concluded Hyderabad 2026 flagship and the upcoming Kochi edition.",
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
