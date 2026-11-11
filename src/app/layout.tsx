import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/webflow-base.css";
import "@/styles/animations.css";
import "@/styles/lenis.css";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import FloatingSocialButtons from "@/components/layout/FloatingSocialButtons";
import AnalyticsTracker from "@/components/core/AnalyticsTracker";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://flexathonrun.org'),
  title: {
    default: "FLEXATHON | The Global Goals Run — 17 Goals. One Movement. Every City.",
    template: "%s | FLEXATHON — The Global Goals Run",
  },
  description:
    "FLEXATHON — The Global Goals Run is a multi-city running movement organised by Flexon Sports Foundation, connecting healthier lifestyles, stronger communities, and the 17 UN Sustainable Development Goals across Indian cities.",
  keywords: [
    "FLEXATHON",
    "FLEXATHON The Global Goals Run",
    "Flexon Sports Foundation",
    "17 Global Goals Run",
    "FLEXATHON Hyderabad 2026",
    "FLEXATHON Kochi",
    "UN Sustainable Development Goals run",
    "community running movement India",
  ],
  authors: [{ name: "Flexon Sports Foundation", url: "https://flexonsports.org" }],
  creator: "Flexon Sports Foundation",
  publisher: "Flexon Sports Foundation",
  applicationName: "FLEXATHON",
  alternates: {
    canonical: "https://flexathonrun.org/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://flexathonrun.org/",
    siteName: "FLEXATHON — The Global Goals Run",
    title: "FLEXATHON | 17 Goals. One Movement. Every City.",
    description:
      "United by Sport. Driven by Global Goals. Organised by Flexon Sports Foundation. Explore completed Hyderabad 2026 and upcoming Kochi Edition.",
    images: [
      {
        url: "https://flexathonrun.org/assets/gallery/oct18/NIX09262.JPG",
        width: 1200,
        height: 630,
        alt: "FLEXATHON – The Global Goals Run",
        type: "image/jpeg",
      },
      {
        url: "https://flexathonrun.org/assets/brand/flexathon-2026-hyderabad-social-share.jpg",
        width: 1600,
        height: 840,
        alt: "FLEXATHON – The Global Goals Run",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLEXATHON | 17 Goals. One Movement. Every City.",
    description: "United by Sport. Driven by Global Goals. Organised by Flexon Sports Foundation.",
    images: ["https://flexathonrun.org/assets/gallery/oct18/NIX09262.JPG"],
    creator: "@flexathon_run",
    site: "@flexathon_run",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdEvent = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "FLEXATHON 2026 Hyderabad – The Global Goals Run (Completed)",
  "description": "Inaugural Hyderabad edition of FLEXATHON – The Global Goals Run held on 18 October 2026 at ESCI Campus, Gachibowli, Hyderabad, spotlighting SDG 4 Quality Education.",
  "startDate": "2026-10-18T05:30:00+05:30",
  "endDate": "2026-10-18T10:30:00+05:30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "url": "https://flexathonrun.org/hydoct18",
  "image": [
    "https://flexathonrun.org/assets/brand/flexathon-2026-hyderabad-social-share.jpg",
    "https://flexathonrun.org/flexathon-main-logo.png"
  ],
  "location": {
    "@type": "Place",
    "name": "Engineering Staff College of India (ESCI)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Old Bombay Road, Gachibowli",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500032",
      "addressCountry": "IN"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Flexon Sports Foundation",
    "url": "https://flexonsports.org/",
    "logo": "https://flexathonrun.org/flexathon-main-logo.png"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "3K Fun Run (Historical Fee)",
      "price": "749",
      "priceCurrency": "INR",
      "url": "https://flexathonrun.org/hydoct18",
      "availability": "https://schema.org/SoldOut"
    },
    {
      "@type": "Offer",
      "name": "5K Timed Run (Historical Fee)",
      "price": "999",
      "priceCurrency": "INR",
      "url": "https://flexathonrun.org/hydoct18",
      "availability": "https://schema.org/SoldOut"
    },
    {
      "@type": "Offer",
      "name": "10K Timed Run (Historical Fee)",
      "price": "1099",
      "priceCurrency": "INR",
      "url": "https://flexathonrun.org/hydoct18",
      "availability": "https://schema.org/SoldOut"
    }
  ]
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Flexon Sports Foundation",
  "alternateName": "FLEXATHON — The Global Goals Run",
  "url": "https://flexathonrun.org/",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Flexon Sports Foundation",
    "url": "https://flexonsports.org/"
  },
  "logo": "https://flexathonrun.org/flexathon-main-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9074934014",
    "contactType": "customer service",
    "email": "info@flexathonrun.org",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Telugu", "Malayalam"]
  },
  "sameAs": [
    "https://flexonsports.org/",
    "https://www.instagram.com/flexathon_official"
  ]
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FLEXATHON — The Global Goals Run",
  "alternateName": "17 Goals. One Movement. Every City.",
  "url": "https://flexathonrun.org/"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-wf-domain="day1-run.webflow.io" data-wf-site="6a01f769fb0d9bd286987755" className="w-mod-js" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-58N2F5D5');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KK5YRWSWDQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KK5YRWSWDQ');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58N2F5D5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <div data-barba="wrapper">
          <AnalyticsTracker />
          {children}
          <FloatingSocialButtons />
        </div>
      </body>
    </html>
  );
}
