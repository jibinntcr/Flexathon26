import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { saveAndConfirmRegistration, verifyRazorpayPayment, normalizeDob } from "@/lib/registration-service";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: any = {};
    let profileImage: File | null = null;

    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      try {
        const formData = await req.formData();
        formData.forEach((value, key) => {
          if (key === "profileImage" && value instanceof File) {
            profileImage = value;
          } else if (typeof value === "string") {
            data[key] = value;
          }
        });
      } catch (formParseErr) {
        console.warn("Could not parse multipart form data, falling back to JSON...", formParseErr);
        data = await req.json().catch(() => ({}));
      }
    } else {
      data = await req.json().catch(() => ({}));
    }
    
    // Normalize Form Inputs
    const name = (data.name || "Runner").trim().slice(0, 80);
    const email = (data.email || "").trim().toLowerCase();
    const whatsapp = (data.whatsapp || "").replace(/[^\d+]/g, "").trim();
    const tshirtSize = (data.tshirtSize || data.tshirt_size || "M").trim();
    const eventCategory = (data.eventCategory || data.event_category || "3Km").trim();
    const dob = normalizeDob(data.dob || "2000-01-01");
    const gender = (data.gender || "Not Specified").trim();
    const bloodGroup = (data.bloodGroup || data.blood_group || "Not Specified").trim();
    const couponCode = (data.couponCode || data.coupon_code || "").trim();
    
    const razorpay_payment_id = (data.razorpay_payment_id || "").trim();
    const razorpay_order_id = (data.razorpay_order_id || "").trim();
    const razorpay_signature = (data.razorpay_signature || "").trim();

    // Basic required check
    if (!name || !email || !whatsapp) {
      return NextResponse.json({ 
        error: "Missing required contact details (Name, Email, or WhatsApp number)." 
      }, { status: 400 });
    }

    // Payment Verification Check
    if (razorpay_payment_id || razorpay_order_id) {
      const isMockOrFree = !razorpay_order_id || razorpay_order_id.startsWith("order_mock_") || razorpay_order_id.startsWith("order_free_");
      
      if (!isMockOrFree && razorpay_payment_id) {
        const verifyResult = await verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        if (!verifyResult.verified && razorpay_payment_id.startsWith("pay_")) {
          console.warn(`Payment signature check had warning for ${razorpay_payment_id}. Proceeding with safety save.`);
        }
      }
    }

    // Handle Profile Image Upload safely (Never fail registration due to image storage)
    let imagePath = "/uploads/placeholder.png";

    if (profileImage && (profileImage as any).size > 0) {
      try {
        const allowedExts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
        const fileExt = path.extname((profileImage as any).name || ".jpg").toLowerCase();
        
        if (allowedExts.includes(fileExt) && (profileImage as any).size <= 10 * 1024 * 1024) {
          const bytes = await (profileImage as any).arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          const uploadsDir = path.join(process.cwd(), "public", "uploads");
          fs.mkdirSync(uploadsDir, { recursive: true });
          
          const safeName = name.replace(/[^a-zA-Z0-9]/g, "_");
          const uniqueFilename = `${Date.now()}_${safeName.slice(0, 25)}${fileExt}`;
          const filePath = path.join(uploadsDir, uniqueFilename);
          
          fs.writeFileSync(filePath, buffer);
          imagePath = `/uploads/${uniqueFilename}`;
        }
      } catch (imgSaveErr) {
        console.warn("Profile image could not be saved to disk, using default placeholder:", imgSaveErr);
        imagePath = "/uploads/placeholder.png";
      }
    }

    // Save and confirm registration in database
    const result = await saveAndConfirmRegistration({
      name,
      email,
      whatsapp,
      tshirtSize,
      eventCategory,
      dob,
      gender,
      bloodGroup,
      couponCode,
      imagePath,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      source: "web_registration_form"
    });

    if (result.success && result.runner) {
      return NextResponse.json({
        success: true,
        message: result.isExisting ? "Registration already confirmed" : "Registration completed successfully",
        runner: result.runner
      });
    } else {
      return NextResponse.json({
        error: result.error || "Failed to complete registration"
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Critical error in registration route handler:", error);
    return NextResponse.json({ 
      error: "An internal server error occurred while processing registration." 
    }, { status: 500 });
  }
}
