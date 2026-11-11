import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Photo & Media Gallery | FLEXATHON — The Global Goals Run",
  description: "Browse 100% authentic race-day photographs, campus course action, hydration points, finisher medals, and podium ceremonies across FLEXATHON editions.",
  alternates: {
    canonical: "https://flexathonrun.org/gallery",
  },
  openGraph: {
    title: "Official Photo & Media Gallery | FLEXATHON — The Global Goals Run",
    description: "Browse 100% authentic race-day photographs, campus course action, hydration points, finisher medals, and podium ceremonies across FLEXATHON editions.",
    url: "https://flexathonrun.org/gallery",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Official Photo & Media Gallery | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Photo & Media Gallery | FLEXATHON — The Global Goals Run",
    description: "Browse 100% authentic race-day photographs, campus course action, hydration points, finisher medals, and podium ceremonies across FLEXATHON editions.",
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
