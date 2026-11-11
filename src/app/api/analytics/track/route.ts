import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    let visitorId = req.cookies.get("_flx_vid")?.value;
    let isNewVisitor = false;

    if (!visitorId) {
      // Generate unique visitor identifier
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      isNewVisitor = true;
    }

    let type = "pageview";
    let path = "/";
    let label: string | undefined = undefined;
    let meta: any = undefined;

    try {
      const body = await req.json();
      if (body.type) type = body.type;
      if (typeof body.path === "string") path = body.path;
      if (typeof body.label === "string") label = body.label;
      if (body.meta) meta = body.meta;
    } catch {
      // If text or beacon payload
      const text = await req.text().catch(() => "");
      try {
        const parsed = JSON.parse(text);
        if (parsed.type) type = parsed.type;
        if (typeof parsed.path === "string") path = parsed.path;
        if (typeof parsed.label === "string") label = parsed.label;
        if (parsed.meta) meta = parsed.meta;
      } catch {}
    }

    recordAnalyticsEvent(type, path, visitorId, label, meta);

    const res = NextResponse.json({ success: true, visitorId });
    if (isNewVisitor) {
      res.cookies.set("_flx_vid", visitorId, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60, // 1 year
        sameSite: "lax",
        httpOnly: false
      });
    }
    return res;
  } catch (err) {
    console.error("Error in /api/analytics/track POST:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    let visitorId = req.cookies.get("_flx_vid")?.value;
    let isNewVisitor = false;

    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      isNewVisitor = true;
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") === "click" ? "click" : "pageview";
    const path = searchParams.get("path") || "/";
    const label = searchParams.get("label") || undefined;

    recordAnalyticsEvent(type, path, visitorId, label);

    const res = NextResponse.json({ success: true, visitorId });
    if (isNewVisitor) {
      res.cookies.set("_flx_vid", visitorId, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
        sameSite: "lax",
        httpOnly: false
      });
    }
    return res;
  } catch (err) {
    console.error("Error in /api/analytics/track GET:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
