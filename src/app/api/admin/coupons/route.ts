import { NextResponse } from "next/server";
import { verifySession } from "../auth-utils";
import { getCoupons, saveCoupons, Coupon } from "@/lib/coupons";

function checkAdminAuth(req: Request): boolean {
  const sessionCookie = req.headers.get("cookie")?.split(";")
    .find(c => c.trim().startsWith("admin_session="))
    ?.split("=")[1];

  if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
    return false;
  }
  return true;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all coupons
export async function GET(req: Request) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const coupons = getCoupons();
    return NextResponse.json(
      { success: true, coupons },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error: any) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// POST create a new coupon
export async function POST(req: Request) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json();
    const rawCode = (body.code || "").trim().toUpperCase();
    const discountType = body.discountType === "fixed" ? "fixed" : "percentage";
    const discountValue = Number(body.discountValue);
    const description = (body.description || "").trim();
    const maxUses = body.maxUses ? Number(body.maxUses) : null;
    const expiryDate = body.expiryDate ? (body.expiryDate as string).trim() : null;
    const isActive = body.isActive !== false;

    if (!rawCode || rawCode.length < 2) {
      return NextResponse.json({ success: false, error: "Coupon code must be at least 2 characters" }, { status: 400 });
    }

    if (isNaN(discountValue) || discountValue <= 0) {
      return NextResponse.json({ success: false, error: "Discount value must be a positive number" }, { status: 400 });
    }

    if (discountType === "percentage" && discountValue > 100) {
      return NextResponse.json({ success: false, error: "Percentage discount cannot exceed 100%" }, { status: 400 });
    }

    const coupons = getCoupons();
    const codeExists = coupons.some(c => c.code.toUpperCase() === rawCode);
    if (codeExists) {
      return NextResponse.json({ success: false, error: `Coupon code '${rawCode}' already exists` }, { status: 400 });
    }

    const nextId = coupons.length > 0 ? Math.max(...coupons.map(c => c.id || 0)) + 1 : 1;

    const newCoupon: Coupon = {
      id: nextId,
      code: rawCode,
      discountType,
      discountValue,
      isActive,
      description: description || `${discountValue}${discountType === "percentage" ? "%" : "₹"} Discount Coupon`,
      timesUsed: 0,
      maxUses,
      expiryDate,
      createdAt: new Date().toISOString()
    };

    // Place new coupon at index 0 so it appears at the very top of lists
    coupons.unshift(newCoupon);
    saveCoupons(coupons);

    return NextResponse.json({
      success: true,
      message: "Coupon created successfully",
      coupon: newCoupon,
      coupons
    });
  } catch (error: any) {
    console.error("Error creating coupon:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// PATCH toggle status or update coupon
export async function PATCH(req: Request) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json();
    const id = Number(body.id);
    if (!id) {
      return NextResponse.json({ success: false, error: "Coupon ID is required" }, { status: 400 });
    }

    const coupons = getCoupons();
    const index = coupons.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }

    if (typeof body.isActive === "boolean") {
      coupons[index].isActive = body.isActive;
    }
    if (body.description !== undefined) {
      coupons[index].description = body.description;
    }
    if (body.discountType !== undefined) {
      coupons[index].discountType = body.discountType === "fixed" ? "fixed" : "percentage";
    }
    if (body.discountValue !== undefined) {
      const val = Number(body.discountValue);
      if (val > 0) coupons[index].discountValue = val;
    }
    if (body.maxUses !== undefined) {
      coupons[index].maxUses = body.maxUses ? Number(body.maxUses) : null;
    }
    if (body.expiryDate !== undefined) {
      coupons[index].expiryDate = body.expiryDate || null;
    }

    saveCoupons(coupons);

    return NextResponse.json({
      success: true,
      message: "Coupon updated successfully",
      coupon: coupons[index],
      coupons
    });
  } catch (error: any) {
    console.error("Error updating coupon:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// DELETE a coupon
export async function DELETE(req: Request) {
  try {
    if (!checkAdminAuth(req)) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    let id = idParam ? Number(idParam) : null;

    if (!id) {
      try {
        const body = await req.json();
        id = Number(body.id);
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Coupon ID is required" }, { status: 400 });
    }

    const coupons = getCoupons();
    const index = coupons.findIndex(c => c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }

    const removed = coupons.splice(index, 1)[0];
    saveCoupons(coupons);

    return NextResponse.json({
      success: true,
      message: `Coupon '${removed.code}' deleted successfully`,
      coupons
    });
  } catch (error: any) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

