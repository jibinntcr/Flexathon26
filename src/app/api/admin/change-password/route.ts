import { NextResponse } from "next/server";
import fs from "fs";
import { verifyPassword, hashPassword, verifySession } from "../auth-utils";
import { getDataFilePath } from "@/lib/data-paths";

export async function POST(req: Request) {
  try {
    // Verify admin session cookie
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "Current and new passwords are required" }, { status: 400 });
    }

    const configPath = getDataFilePath("admin-config.json");
    if (!fs.existsSync(configPath)) {
      return NextResponse.json({ success: false, error: "Configuration file missing" }, { status: 500 });
    }

    let creds = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    
    // Auto-migrate plain password to PBKDF2 hash if necessary
    if (!creds.password.startsWith("pbkdf2_sha256$")) {
      creds.password = hashPassword(creds.password);
      fs.writeFileSync(configPath, JSON.stringify(creds, null, 2), "utf-8");
    }

    if (!verifyPassword(oldPassword, creds.password)) {
      return NextResponse.json({ success: false, error: "Incorrect current password" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "New password must be at least 6 characters long" }, { status: 400 });
    }

    // Encrypt and save new password
    creds.password = hashPassword(newPassword);
    fs.writeFileSync(configPath, JSON.stringify(creds, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Error in Next.js change-password handler:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred" }, { status: 500 });
  }
}
