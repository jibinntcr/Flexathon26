import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Social Media Card — FLEXATHON 2026 Hyderabad",
  description: "Download your official personalized FLEXATHON 2026 social media runner card using your registered mobile number. Share your participation with friends and family!",
  alternates: {
    canonical: "https://flexathonrun.org/social-card",
  },
  openGraph: {
    title: "Download Social Media Card — FLEXATHON 2026 Hyderabad",
    description: "Download your official personalized FLEXATHON 2026 social media runner card using your registered mobile number. Share your participation with friends and family!",
    url: "https://flexathonrun.org/social-card",
    siteName: "FLEXATHON 2026",
    images: [
      {
        url: "https://flexathonrun.org/card-template-base.png",
        width: 1200,
        height: 1200,
        alt: "FLEXATHON 2026 Social Media Card Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Social Media Card — FLEXATHON 2026 Hyderabad",
    description: "Download your official personalized FLEXATHON 2026 social media runner card using your registered mobile number.",
    images: ["https://flexathonrun.org/card-template-base.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
