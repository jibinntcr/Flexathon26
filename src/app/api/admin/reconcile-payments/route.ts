import { NextResponse } from "next/server";
import fs from "fs";
import Razorpay from "razorpay";
import { getDataFilePath } from "@/lib/data-paths";
import { saveAndConfirmRegistration } from "@/lib/registration-service";

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TPiHIbfb87seGH";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "NwdwLO2GEghGflAuFXth804O";

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Razorpay credentials not configured." }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: keyId.trim(),
      key_secret: keySecret.trim(),
    });

    const paymentsResponse = await razorpay.payments.all({ count: 50 });
    const payments = paymentsResponse.items || [];

    const dbPath = getDataFilePath("registrations.json");
    let registrations: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        registrations = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      } catch {
        registrations = [];
      }
    }

    let recoveredCount = 0;
    const recoveredList: any[] = [];

    for (const payment of payments as any[]) {
      const isPaid = payment.status === "captured" || payment.status === "authorized";
      if (!isPaid) continue;

      const paymentId = String(payment.id);
      const orderId = payment.order_id ? String(payment.order_id) : "";
      const amountRupees = payment.amount ? Number(payment.amount) / 100 : 0;
      let notes = payment.notes || {};

      // If key attributes are missing on payment, attempt to read from order notes
      if (orderId && (!notes.couponCode || !notes.gender || notes.gender === "Not Specified")) {
        try {
          const orderObj: any = await razorpay.orders.fetch(orderId);
          if (orderObj && orderObj.notes) {
            notes = { ...orderObj.notes, ...notes };
          }
        } catch (fetchErr) {
          // Ignore order fetch errors and proceed with payment notes
        }
      }

      // Check if already in DB
      const alreadyInDb = registrations.some(r => 
        r.payment?.razorpay_payment_id === paymentId || 
        (orderId && r.payment?.razorpay_order_id === orderId)
      );

      if (!alreadyInDb) {
        const name = notes.name || payment.description || (payment.email ? payment.email.split("@")[0] : "Runner");
        const email = notes.email || payment.email || "";
        const phone = notes.phone || payment.contact || "";
        const category = notes.category || "3Km";
        const tshirtSize = notes.tshirtSize || notes.tshirt_size || "M";
        const bloodGroup = notes.bloodGroup || notes.blood_group || "Not Specified";
        const gender = notes.gender || "Not Specified";
        const dob = notes.dob || "2000-01-01";
        const couponCode = notes.couponCode && notes.couponCode !== "NONE" ? notes.couponCode : "";
        const paymentTimestamp = payment.created_at ? new Date(payment.created_at * 1000).toISOString() : new Date().toISOString();

        const recResult = await saveAndConfirmRegistration({
          name,
          email,
          whatsapp: phone,
          eventCategory: category,
          tshirtSize,
          bloodGroup,
          gender,
          dob,
          couponCode,
          amount: amountRupees,
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          created_at: paymentTimestamp,
          paid_at: paymentTimestamp,
          source: "admin_payment_reconciliation"
        });

        if (recResult.success && recResult.runner) {
          recoveredCount++;
          recoveredList.push({
            name,
            phone,
            email,
            category,
            paymentId,
            orderId,
            regId: recResult.runner.regId
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      recoveredCount,
      recoveredList,
      totalPaymentsChecked: payments.length
    });
  } catch (error: any) {
    console.error("Admin payment reconciliation error:", error);
    return NextResponse.json({ error: error?.message || "Reconciliation failed" }, { status: 500 });
  }
}
