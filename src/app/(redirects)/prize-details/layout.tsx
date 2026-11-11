import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prize Details — ₹60,000 Total Cash Prize Pool | FLEXATHON 2026 Hyderabad",
  description: "Official ₹60,000 cash prize pool breakdowns, eligibility rules, and podium honours for 5K and 10K timed runners at FLEXATHON 2026, ESCI Hyderabad.",
  alternates: {
    canonical: "https://flexathonrun.org/prize-details",
  },
  openGraph: {
    title: "Prize Details — ₹60,000 Total Cash Prize Pool | FLEXATHON 2026 Hyderabad",
    description: "Official ₹60,000 cash prize pool breakdowns, eligibility rules, and podium honours for 5K and 10K timed runners at FLEXATHON 2026, ESCI Hyderabad.",
    url: "https://flexathonrun.org/prize-details",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Prize Details — ₹60,000 Total Cash Prize Pool | FLEXATHON 2026 Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prize Details — ₹60,000 Total Cash Prize Pool | FLEXATHON 2026 Hyderabad",
    description: "Official ₹60,000 cash prize pool breakdowns, eligibility rules, and podium honours for 5K and 10K timed runners at FLEXATHON 2026, ESCI Hyderabad.",
    images: ["https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg"],
  },
};

export default function PrizeDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
