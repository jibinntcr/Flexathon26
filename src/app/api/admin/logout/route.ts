import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    response.cookies.delete("admin_session");
    return response;
  } catch (error: any) {
    console.error("Error logging out in Next.js API:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred" }, { status: 500 });
  }
}
