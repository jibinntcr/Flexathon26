import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const couponCode = body.couponCode || body.code || "";
    const category = body.category || "3Km";

    const result = validateCoupon(couponCode, category || "3Km");
    if (!result.valid) {
      return NextResponse.json({
        valid: false,
        message: result.message
      }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      code: result.coupon?.code,
      discountType: result.coupon?.discountType,
      discountValue: result.coupon?.discountValue,
      originalAmount: result.originalAmount,
      discountAmount: result.discountAmount,
      finalAmount: result.finalAmount,
      message: result.message
    });
  } catch (error: any) {
    console.error("Error in verify-coupon:", error);
    return NextResponse.json({ valid: false, message: "Failed to verify coupon" }, { status: 500 });
  }
}
