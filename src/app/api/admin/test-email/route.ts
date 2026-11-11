import { NextResponse } from "next/server";
import { sendRegistrationNotification } from "@/lib/notifications";

async function handleTest(targetEmail: string) {
  const testPayload = {
    id: 999,
    name: "Test Runner",
    email: targetEmail,
    whatsapp: "+919497063919",
    eventCategory: "5Km",
    tshirtSize: "L",
    amount: 599,
    orderId: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    paymentId: "pay_test_brevo_12345",
    paidAt: new Date().toISOString(),
  };

  const result = await sendRegistrationNotification(testPayload);
  return result;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const testEmail = (searchParams.get("email") || "info@flexathonrun.org").trim();

    const result = await handleTest(testEmail);
    return NextResponse.json({
      success: result.emailSent,
      message: result.emailSent
        ? `Test confirmation email successfully sent to ${testEmail} via Brevo!`
        : "Failed to send email. Check Brevo API response details.",
      details: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    let testEmail = "";
    try {
      const body = await req.json();
      testEmail = (body?.email || "").trim();
    } catch {
      testEmail = "";
    }

    if (!testEmail) {
      testEmail = "info@flexathonrun.org";
    }

    const result = await handleTest(testEmail);
    return NextResponse.json({
      success: result.emailSent,
      message: result.emailSent
        ? `Test confirmation email successfully sent to ${testEmail} via Brevo!`
        : "Failed to send email. Check Brevo API response details.",
      details: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}

