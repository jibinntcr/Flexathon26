import { NextResponse } from "next/server";
import fs from "fs";
import { getDataFilePath } from "@/lib/data-paths";

const dbPath = getDataFilePath("registrations.json");

function maskPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.length <= 4) return cleaned;
  return cleaned.slice(0, 3) + " •••• " + cleaned.slice(-3);
}

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "";
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

function parseCategory(rawCategory: string): string {
  if (!rawCategory) return "10K";
  const upper = rawCategory.toUpperCase();
  if (upper.includes("3K") || upper.includes("3KM") || upper === "3") return "3K";
  if (upper.includes("5K") || upper.includes("5KM") || upper === "5") return "5K";
  if (upper.includes("10K") || upper.includes("10KM") || upper === "10") return "10K";
  return "10K";
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPhone = (searchParams.get("phone") || searchParams.get("whatsapp") || "").trim();

    if (!rawPhone) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid mobile number." },
        { status: 400 }
      );
    }

    const digitsOnly = rawPhone.replace(/\D/g, "");
    if (digitsOnly.length < 7) {
      return NextResponse.json(
        { success: false, message: "Please enter at least a 7 to 10-digit mobile number." },
        { status: 400 }
      );
    }

    const last10 = digitsOnly.slice(-10);

    let registrations: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        registrations = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading registrations.json:", err);
        registrations = [];
      }
    }

    // Match registrations by phone
    const matched = registrations.filter((r) => {
      const regPhone = String(r.whatsapp || r.contact || r.phone || "").replace(/\D/g, "");
      if (!regPhone) return false;
      return regPhone.slice(-10) === last10 || regPhone === digitsOnly;
    });

    if (matched.length === 0) {
      return NextResponse.json({
        success: false,
        message: `No active registration found for mobile number ending in ${last10.slice(-4)}. You can still create and customize your official card manually below.`,
        runners: []
      });
    }

    const runners = matched.map((r) => ({
      id: r.id,
      registrationId: `#FLX-${10000 + (Number(r.id) || 0)}`,
      name: (r.name || "Runner").trim().toUpperCase(),
      category: parseCategory(r.event_category || r.category || "10K"),
      photoUrl: r.image_path || null,
      cityOrg: (r.organisation || r.city || "FLEXATHON RUNNER").trim().toUpperCase(),
      whatsappMasked: maskPhone(r.whatsapp || r.contact || ""),
      emailMasked: maskEmail(r.email || ""),
      createdAt: r.created_at || r.paidAt || null,
      gender: r.gender || null,
      tshirtSize: r.tshirt_size || null
    }));

    return NextResponse.json({
      success: true,
      count: runners.length,
      runners,
      message: `Found ${runners.length} registration${runners.length === 1 ? "" : "s"} for this mobile number.`
    });
  } catch (error: any) {
    console.error("Error fetching runner card details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
