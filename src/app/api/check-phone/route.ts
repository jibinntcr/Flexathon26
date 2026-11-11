import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Phone uniqueness is no longer enforced to allow multiple registrations for families and group runners.
    return NextResponse.json({ exists: false, allowed: true });
  } catch (error: any) {
    console.error("Error in check-phone API:", error);
    return NextResponse.json({ exists: false, allowed: true });
  }
}
