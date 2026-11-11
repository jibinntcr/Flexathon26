import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 Edition: Quality Education (SDG 4) | FLEXATHON",
  description: "The 2026 Hyderabad edition of FLEXATHON champions UN SDG Goal 4: Quality Education, advancing awareness and community-driven learning opportunities.",
  alternates: {
    canonical: "https://flexathonrun.org/2026-quality-education",
  },
  openGraph: {
    title: "2026 Edition: Quality Education (SDG 4) | FLEXATHON",
    description: "The 2026 Hyderabad edition of FLEXATHON champions UN SDG Goal 4: Quality Education, advancing awareness and community-driven learning opportunities.",
    url: "https://flexathonrun.org/2026-quality-education",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "2026 Edition: Quality Education (SDG 4) | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 Edition: Quality Education (SDG 4) | FLEXATHON",
    description: "The 2026 Hyderabad edition of FLEXATHON champions UN SDG Goal 4: Quality Education, advancing awareness and community-driven learning opportunities.",
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
