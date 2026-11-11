import { NextResponse } from "next/server";
import { signCaptcha } from "../auth-utils";

export async function GET() {
  try {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captchaText = "";
    for (let i = 0; i < 5; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Generate simple dynamic SVG with grid lines and captcha text
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="46" viewBox="0 0 150 46">
      <rect width="100%" height="100%" fill="#111827" />
      <line x1="10" y1="12" x2="140" y2="34" stroke="#374151" stroke-width="2" />
      <line x1="10" y1="34" x2="140" y2="12" stroke="#374151" stroke-width="2" />
      <line x1="30" y1="5" x2="120" y2="40" stroke="#1F2937" stroke-width="1.5" />
      <text x="22" y="32" font-family="Courier New, monospace" font-size="24" font-weight="bold" fill="#F2C66D" letter-spacing="10">${captchaText}</text>
    </svg>`;

    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
    const signedValue = signCaptcha(captchaText, expiry);

    const response = new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    response.cookies.set("captcha_token", signedValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 300, // 5 minutes
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Error generating captcha in Next.js API:", error);
    return new NextResponse("<svg></svg>", { status: 500 });
  }
}
