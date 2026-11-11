import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Online registrations for FLEXATHON 2026 are officially closed
    return NextResponse.json(
      {
        error: "Online registrations for FLEXATHON 2026 are officially closed as maximum participant capacity has been reached.",
        closed: true
      },
      { status: 403 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Registrations are officially closed" },
      { status: 403 }
    );
  }
}
