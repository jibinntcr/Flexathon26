import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | FLEXATHON 2026 Hyderabad Support",
  description: "Get in touch with the FLEXATHON team and Flexon Sports Foundation for registration queries, event support, and partnerships.",
  alternates: {
    canonical: "https://flexathonrun.org/contact",
  },
  openGraph: {
    title: "Contact Us | FLEXATHON 2026 Hyderabad Support",
    description: "Get in touch with the FLEXATHON team and Flexon Sports Foundation for registration queries, event support, and partnerships.",
    url: "https://flexathonrun.org/contact",
    siteName: "FLEXATHON",
    images: [
      {
        url: "https://flexathonrun.org/flexathon-2026-hyderabad-social-share.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Us | FLEXATHON 2026 Hyderabad Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | FLEXATHON 2026 Hyderabad Support",
    description: "Get in touch with the FLEXATHON team and Flexon Sports Foundation for registration queries, event support, and partnerships.",
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
