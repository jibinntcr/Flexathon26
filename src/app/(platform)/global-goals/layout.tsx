import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Goals Alignment | UN Sustainable Development Goals | FLEXATHON",
  description: "How FLEXATHON channels the power of mass participation sport into awareness and grassroots action for the 17 UN Sustainable Development Goals.",
  alternates: {
    canonical: "https://flexathonrun.org/global-goals",
  },
  openGraph: {
    title: "Global Goals Alignment | UN Sustainable Development Goals | FLEXATHON",
    description: "How FLEXATHON channels the power of mass participation sport into awareness and grassroots action for the 17 UN Sustainable Development Goals.",
    url: "https://flexathonrun.org/global-goals",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Global Goals Alignment | UN Sustainable Development Goals | FLEXATHON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Goals Alignment | UN Sustainable Development Goals | FLEXATHON",
    description: "How FLEXATHON channels the power of mass participation sport into awareness and grassroots action for the 17 UN Sustainable Development Goals.",
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
