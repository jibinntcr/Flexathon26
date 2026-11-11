import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/checkout.js",
        destination: "/js/razorpay-checkout.js",
      },
      {
        source: "/slater.app/19899/59817.js",
        destination: "/js/animations.js",
      },
      {
        source: "/fonts.gstatic.com/s/:path*",
        destination: "/fonts/:path*",
      },
      {
        source: "/cdn.prod.website-files.com/6a01f769fb0d9bd286987755/:path*",
        destination: "/assets/ui/:path*",
      },
      {
        source: "/vendor/webflow/:path*",
        destination: "/assets/ui/:path*",
      },
      {
        source: "/logo/:path*",
        destination: "/assets/brand/:path*",
      },
      {
        source: "/flexathon-logo-transparent.png",
        destination: "/assets/brand/flexathon-logo-transparent.png",
      },
      {
        source: "/flexathon-logo-full.png",
        destination: "/assets/brand/flexathon-logo-full.png",
      },
      {
        source: "/logo.png",
        destination: "/assets/brand/logo.png",
      },
      {
        source: "/flexathon-2026-hyderabad-social-share.jpg",
        destination: "/assets/brand/flexathon-2026-hyderabad-social-share.jpg",
      },
      {
        source: "/newAssets/flexon-sports-exact-transparent.png",
        destination: "/assets/brand/flexon-sports-exact-transparent.png",
      },
      {
        source: "/newAssets/flexon-sports-exact.png",
        destination: "/assets/brand/flexon-sports-exact.png",
      },
      {
        source: "/newAssets/flexon-sports-logo.png",
        destination: "/assets/brand/flexon-sports-logo.png",
      },
      {
        source: "/newAssets/flexonsports-trimmed.png",
        destination: "/assets/brand/flexonsports-trimmed.png",
      },
      {
        source: "/newAssets/esci-logo.png",
        destination: "/assets/partners/esci-logo.png",
      },
      {
        source: "/newAssets/tata-copper.png",
        destination: "/assets/partners/tata-copper.png",
      },
      {
        source: "/newAssets/tata-copper.svg",
        destination: "/assets/partners/tata-copper.svg",
      },
      {
        source: "/newAssets/smaaash.png",
        destination: "/assets/partners/smaaash.png",
      },
      {
        source: "/newAssets/akshayakalpa.png",
        destination: "/assets/partners/akshayakalpa.png",
      },
      {
        source: "/newAssets/district-by-zomato.png",
        destination: "/assets/partners/district-by-zomato.png",
      },
      {
        source: "/newAssets/partner-strip.png",
        destination: "/assets/partners/partner-strip.png",
      },
      {
        source: "/newAssets/:path*",
        destination: "/assets/editions/:path*",
      },
      {
        source: "/tickettingPlatforms/:path*",
        destination: "/assets/partners/:path*",
      },
      {
        source: "/sdg-logos/:path*",
        destination: "/assets/sdgs/:path*",
      },
      {
        source: "/sdg4_illustration.png",
        destination: "/assets/sdgs/sdg4_illustration.png",
      },
      {
        source: "/socialcards/:path*",
        destination: "/assets/social-cards/:path*",
      },
      {
        source: "/cardAssets/:path*",
        destination: "/assets/social-cards/presets/:path*",
      },
      {
        source: "/card-template-base.png",
        destination: "/assets/social-cards/card-template-base.png",
      },
      {
        source: "/hero/:path*",
        destination: "/assets/hero/:path*",
      },
      {
        source: "/about_globe_visual.png",
        destination: "/assets/hero/about_globe_visual.png",
      },
      {
        source: "/hero-bg.mp4",
        destination: "/assets/hero/hero-bg.mp4",
      },
      {
        source: "/hero-poster.jpg",
        destination: "/assets/hero/hero-poster.jpg",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://cdn.jsdelivr.net https://slater.app https://cdn.prod.website-files.com https://d3e54v103j8qbb.cloudfront.net https://checkout.razorpay.com https://cdn.razorpay.com https://*.razorpay.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://slater.app https://cdn.prod.website-files.com https://fonts.googleapis.com; img-src 'self' data: blob: https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://cdn.prod.website-files.com https://d3e54v103j8qbb.cloudfront.net https://*.razorpay.com https://cdn.razorpay.com; media-src 'self' data: blob: https://cdn.prod.website-files.com; font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://slater.app https://cdn.jsdelivr.net https://api.razorpay.com https://lumberjack.razorpay.com https://*.razorpay.com; frame-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com https://api.razorpay.com https://checkout.razorpay.com https://*.razorpay.com; frame-ancestors 'self';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(self \"https://api.razorpay.com\" \"https://checkout.razorpay.com\"), accelerometer=(self \"https://api.razorpay.com\" \"https://checkout.razorpay.com\"), gyroscope=(self \"https://api.razorpay.com\" \"https://checkout.razorpay.com\")",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
