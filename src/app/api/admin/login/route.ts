import { NextResponse } from "next/server";
import fs from "fs";
import { verifyPassword, hashPassword, verifyCaptchaToken, signSession } from "../auth-utils";
import { getDataFilePath } from "@/lib/data-paths";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, password, captcha } = body;
    const trimmedCaptcha = (captcha || "").trim();

    if (!username || !password || !captcha) {
      return NextResponse.json({ success: false, error: "Username, password and CAPTCHA are required" }, { status: 400 });
    }

    // CAPTCHA Validation (support TEST bypass for testing)
    const isTestBypass = trimmedCaptcha.toUpperCase() === "TEST";
    if (!isTestBypass) {
      const captchaCookie = req.headers.get("cookie")?.split(";")
        .find(c => c.trim().startsWith("captcha_token="))
        ?.split("=")[1];
      
      if (!captchaCookie || !verifyCaptchaToken(decodeURIComponent(captchaCookie), trimmedCaptcha)) {
        return NextResponse.json({ success: false, error: "Invalid or expired CAPTCHA code" }, { status: 400 });
      }
    }

    // Load credentials
    const configPath = getDataFilePath("admin-config.json");
    let creds = { username: "jibintcr", password: "" };
    
    // Default fallback password hashed with pbkdf2
    const defaultHashed = hashPassword("master123$#");

    if (fs.existsSync(configPath)) {
      try {
        creds = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        // Auto-migrate plain password to PBKDF2 hash if necessary
        if (!creds.password.startsWith("pbkdf2_sha256$")) {
          creds.password = hashPassword(creds.password);
          fs.writeFileSync(configPath, JSON.stringify(creds, null, 2), "utf-8");
        }
      } catch {
        creds = { username: "jibintcr", password: defaultHashed };
      }
    } else {
      creds = { username: "jibintcr", password: defaultHashed };
      fs.writeFileSync(configPath, JSON.stringify(creds, null, 2), "utf-8");
    }

    if (username !== creds.username || !verifyPassword(password, creds.password)) {
      return NextResponse.json({ success: false, error: "Incorrect username or password" }, { status: 401 });
    }

    // Login successful - Set session cookie
    const expiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours
    const token = signSession(expiry);

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 43200, // 12 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Error in Next.js admin login handler:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred" }, { status: 500 });
  }
}
