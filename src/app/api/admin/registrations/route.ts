import { NextResponse } from "next/server";
import fs from "fs";
import { verifySession } from "../auth-utils";
import { getDataFilePath } from "@/lib/data-paths";
import { getAnalyticsMetricsSummary } from "@/lib/analytics";

export async function GET(req: Request) {
  try {
    // 1. Verify admin session cookie
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || searchParams.get("search") || "").trim().toLowerCase();
    const category = (searchParams.get("category") || "").trim();
    const gender = (searchParams.get("gender") || "").trim();
    const couponFilter = (searchParams.get("coupon") || searchParams.get("couponCode") || "").trim().toUpperCase();
    const dateFrom = (searchParams.get("dateFrom") || searchParams.get("fromDate") || "").trim();
    const dateTo = (searchParams.get("dateTo") || searchParams.get("toDate") || "").trim();
    const isExport = (searchParams.get("export") || "").trim().toLowerCase() === "true";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(0, parseInt(searchParams.get("limit") || "0", 10));

    // 3. Read registrations database
    const dbPath = getDataFilePath("registrations.json");
    let registrations: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        registrations = JSON.parse(fileContent);
      } catch {
        registrations = [];
      }
    }

    // 4. Apply filters
    let filtered = registrations.filter(r => {
      if (q) {
        const nameMatch = (r.name || "").toLowerCase().includes(q);
        const emailMatch = (r.email || "").toLowerCase().includes(q);
        const phoneMatch = (r.whatsapp || "").toLowerCase().includes(q);
        const dobMatch = (r.dob || r.date_of_birth || "").toLowerCase().includes(q);
        const bloodMatch = (r.blood_group || "").toLowerCase().includes(q);
        const genderMatch = (r.gender || "").toLowerCase().includes(q);
        const categoryMatch = (r.event_category || "").toLowerCase().includes(q);
        const idMatch = String(r.id || "").toLowerCase().includes(q) || `#flx-${10000 + Number(r.id || 0)}`.toLowerCase().includes(q);
        const orderMatch = (r.payment?.order_id || "").toLowerCase().includes(q);
        const paymentIdMatch = (r.payment?.razorpay_payment_id || "").toLowerCase().includes(q);
        const couponMatch = (r.coupon_applied || r.payment?.coupon_applied || "").toLowerCase().includes(q);
        
        if (!nameMatch && !emailMatch && !phoneMatch && !dobMatch && !bloodMatch && !genderMatch && !categoryMatch && !idMatch && !orderMatch && !paymentIdMatch && !couponMatch) {
          return false;
        }
      }
      if (category && r.event_category !== category) {
        return false;
      }
      if (gender && r.gender !== gender) {
        return false;
      }
      if (couponFilter) {
        const applied = (r.coupon_applied || r.payment?.coupon_applied || "").toUpperCase();
        if (couponFilter === "WITH_COUPON") {
          if (!applied) return false;
        } else if (couponFilter === "NO_COUPON") {
          if (applied) return false;
        } else {
          if (applied !== couponFilter) return false;
        }
      }

      // Date Range Filter (Date From & Date To)
      const regTime = new Date(r.created_at || r.payment?.paid_at || 0).getTime();
      if (dateFrom) {
        const fromTimestamp = new Date(`${dateFrom}T00:00:00.000Z`).getTime();
        if (regTime < fromTimestamp) return false;
      }
      if (dateTo) {
        const toTimestamp = new Date(`${dateTo}T23:59:59.999Z`).getTime();
        if (regTime > toTimestamp) return false;
      }

      return true;
    });

    // Sort by created_at descending
    filtered.sort((a, b) => {
      const timeA = new Date(a.created_at || a.payment?.paid_at || 0).getTime();
      const timeB = new Date(b.created_at || b.payment?.paid_at || 0).getTime();
      return timeB - timeA;
    });

    // 5. Handle CSV Export
    if (isExport) {
      const csvHeader = "ID,Name,Email,WhatsApp,Date of Birth,Gender,Event Category,T-Shirt Size,Blood Group,Coupon Code,Discount Amount,Original Amount,Amount Paid,Invoice Order ID,Razorpay Payment ID,Razorpay Order ID,Payment Status,Paid At,Profile Picture Path,Registration Date";
      
      const escapeCsv = (val: any) => {
        const valStr = String(val || "").replace(/"/g, '""');
        return `"${valStr}"`;
      };

      const csvLines = [csvHeader];
      for (const r of filtered) {
        if (!r) continue;
        const p = r?.payment || {};
        const couponCode = r?.coupon_applied || p?.coupon_applied || "";
        const discountAmount = r?.discount_amount || p?.discount_amount || 0;
        const originalAmount = r?.original_amount || (p?.amount ? (Number(p.amount) + Number(discountAmount)) : "");
        const line = [
          escapeCsv(r?.id),
          escapeCsv(r?.name),
          escapeCsv(r?.email),
          escapeCsv(r?.whatsapp),
          escapeCsv(r?.dob || r?.date_of_birth),
          escapeCsv(r?.gender),
          escapeCsv(r?.event_category),
          escapeCsv(r?.tshirt_size),
          escapeCsv(r?.blood_group),
          escapeCsv(couponCode),
          escapeCsv(discountAmount),
          escapeCsv(originalAmount),
          escapeCsv(p?.amount || r?.amount),
          escapeCsv(p?.order_id),
          escapeCsv(p?.razorpay_payment_id),
          escapeCsv(p?.razorpay_order_id),
          escapeCsv(p?.status),
          escapeCsv(p?.paid_at),
          escapeCsv(r?.image_path),
          escapeCsv(r?.created_at)
        ];
        csvLines.push(line.join(","));
      }

      const csvData = csvLines.join("\r\n");

      return new NextResponse(csvData, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="registrations.csv"',
        },
      });
    }

    // 6. Calculate stats
    const stats = {
      totalRegistrations: registrations.length,
      categoryStats: {
        "3Km": 0,
        "5Km": 0,
        "10Km": 0,
        "21Km": 0
      } as Record<string, number>,
      genderStats: {
        "Male": 0,
        "Female": 0,
        "Others": 0
      } as Record<string, number>,
      couponStats: {
        totalWithCoupon: 0,
        totalWithoutCoupon: 0,
        totalDiscountGiven: 0,
        couponsBreakdown: {} as Record<string, number>
      }
    };

    for (const r of registrations) {
      const couponCode = (r.coupon_applied || r.payment?.coupon_applied || "").toUpperCase();
      const discount = Number(r.discount_amount || r.payment?.discount_amount || 0);
      if (couponCode) {
        stats.couponStats.totalWithCoupon++;
        stats.couponStats.totalDiscountGiven += discount;
        stats.couponStats.couponsBreakdown[couponCode] = (stats.couponStats.couponsBreakdown[couponCode] || 0) + 1;
      } else {
        stats.couponStats.totalWithoutCoupon++;
      }
    }

    for (const r of filtered) {
      const catVal = r.event_category;
      if (catVal && catVal in stats.categoryStats) {
        stats.categoryStats[catVal]++;
      }
      let genVal = r.gender;
      if (genVal === "Transgender" || genVal === "Other") {
        genVal = "Others";
      }
      if (genVal && genVal in stats.genderStats) {
        stats.genderStats[genVal]++;
      }
    }

    // 7. Paginate results
    const total = filtered.length;
    let paginatedRegistrations = filtered;
    let totalPages = 1;

    if (limit > 0) {
      totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      paginatedRegistrations = filtered.slice(startIndex, startIndex + limit);
    }

    const analytics = getAnalyticsMetricsSummary();

    return NextResponse.json({
      success: true,
      registrations: paginatedRegistrations,
      total,
      page,
      limit: limit || total,
      totalPages,
      stats,
      analytics
    });
  } catch (error: any) {
    console.error("Error fetching registrations in Next.js API:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    // 1. Verify admin session cookie
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { id, tshirt_size, tshirtSize, blood_group, bloodGroup, gender, dob, name } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Participant ID is required" }, { status: 400 });
    }

    const newTshirtSize = (tshirt_size || tshirtSize || "").trim();
    const newBloodGroup = (blood_group || bloodGroup || "").trim();
    const newGender = (gender || "").trim();
    const newDob = (dob || "").trim();
    const newName = (name || "").trim();

    const dbPath = getDataFilePath("registrations.json");
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ success: false, error: "Database not found" }, { status: 404 });
    }

    let registrations: any[] = [];
    try {
      registrations = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    } catch {
      return NextResponse.json({ success: false, error: "Failed to read database" }, { status: 500 });
    }

    const runnerIndex = registrations.findIndex(r => String(r.id) === String(id));
    if (runnerIndex === -1) {
      return NextResponse.json({ success: false, error: "Participant not found" }, { status: 404 });
    }

    if (newTshirtSize) {
      registrations[runnerIndex].tshirt_size = newTshirtSize;
      if (registrations[runnerIndex].payment) {
        const cat = registrations[runnerIndex].event_category || "Run";
        registrations[runnerIndex].payment.items_purchased = `${cat} Run (Size ${newTshirtSize})`;
      }
    }

    if (newBloodGroup) {
      registrations[runnerIndex].blood_group = newBloodGroup;
    }

    if (newGender) {
      registrations[runnerIndex].gender = newGender;
    }

    if (newDob) {
      registrations[runnerIndex].dob = newDob;
    }

    if (newName) {
      registrations[runnerIndex].name = newName;
    }

    // Atomic write
    const tempPath = `${dbPath}.tmp_${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(registrations, null, 2), "utf-8");
    fs.renameSync(tempPath, dbPath);

    return NextResponse.json({
      success: true,
      message: "Participant updated successfully",
      runner: registrations[runnerIndex]
    });
  } catch (error: any) {
    console.error("Error updating participant:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to update participant" }, { status: 500 });
  }
}
