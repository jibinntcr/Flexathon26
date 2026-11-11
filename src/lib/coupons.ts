import fs from "fs";
import path from "path";
import { getDataFilePath } from "@/lib/data-paths";

export interface Coupon {
  id: number;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  isActive: boolean;
  description?: string;
  timesUsed: number;
  maxUses?: number | null;
  expiryDate?: string | null;
  createdAt?: string;
}

const couponsPath = getDataFilePath("coupons.json");
const tmpCouponsPath = path.join("/tmp", "coupons.json");

declare global {
  var __inMemoryCoupons: Coupon[] | undefined;
}

let cwdFailedWrite = false;

function resolveCouponsPath(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || cwdFailedWrite) {
    if (fs.existsSync(tmpCouponsPath)) {
      return tmpCouponsPath;
    }
    if (fs.existsSync(couponsPath)) {
      try {
        fs.copyFileSync(couponsPath, tmpCouponsPath);
        return tmpCouponsPath;
      } catch (e) {
        // Fall back to default
      }
    }
  }

  // If tmpCouponsPath exists and is newer than couponsPath, use tmp
  try {
    if (fs.existsSync(tmpCouponsPath) && fs.existsSync(couponsPath)) {
      const tmpMtime = fs.statSync(tmpCouponsPath).mtimeMs;
      const cwdMtime = fs.statSync(couponsPath).mtimeMs;
      if (tmpMtime > cwdMtime) {
        return tmpCouponsPath;
      }
    }
  } catch {}

  return couponsPath;
}

export function getCoupons(): Coupon[] {
  try {
    const filePath = resolveCouponsPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const coupons: Coupon[] = JSON.parse(content);
      global.__inMemoryCoupons = coupons;
      return autoExpireCoupons(coupons);
    }

    if (fs.existsSync(couponsPath)) {
      const content = fs.readFileSync(couponsPath, "utf-8");
      const coupons: Coupon[] = JSON.parse(content);
      global.__inMemoryCoupons = coupons;
      return autoExpireCoupons(coupons);
    }

    // If disk read is unavailable, check in-memory cache
    if (global.__inMemoryCoupons && Array.isArray(global.__inMemoryCoupons) && global.__inMemoryCoupons.length > 0) {
      return autoExpireCoupons(global.__inMemoryCoupons);
    }

    const initialCoupons: Coupon[] = [
      {
        id: 1,
        code: "VEGA999",
        discountType: "percentage",
        discountValue: 10,
        isActive: true,
        description: "10% Special Registration Discount",
        timesUsed: 0,
        maxUses: null,
        expiryDate: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        code: "NILA10%",
        discountType: "percentage",
        discountValue: 10,
        isActive: true,
        description: "10%DISCOUNT",
        timesUsed: 3,
        maxUses: null,
        expiryDate: null,
        createdAt: "2026-08-27T05:02:35.159Z"
      }
    ];
    saveCoupons(initialCoupons);
    return initialCoupons;
  } catch (err) {
    console.error("Error reading coupons:", err);
    return global.__inMemoryCoupons || [];
  }
}

function autoExpireCoupons(coupons: Coupon[]): Coupon[] {
  let hasChanged = false;
  const now = new Date();

  for (const coupon of coupons) {
    if (coupon.expiryDate) {
      const expiry = coupon.expiryDate.includes("T")
        ? new Date(coupon.expiryDate)
        : new Date(`${coupon.expiryDate}T23:59:59.999`);
      
      if (expiry < now && coupon.isActive) {
        coupon.isActive = false;
        hasChanged = true;
      }
    }
  }

  if (hasChanged) {
    saveCoupons(coupons);
  }

  return coupons;
}

export function saveCoupons(coupons: Coupon[]): void {
  // Always update global in-memory cache first
  global.__inMemoryCoupons = [...coupons];

  // Attempt to write to process.cwd() coupons.json (local dev & writable environments)
  let wroteCwd = false;
  try {
    fs.writeFileSync(couponsPath, JSON.stringify(coupons, null, 2), "utf-8");
    wroteCwd = true;
    cwdFailedWrite = false;
  } catch (err) {
    cwdFailedWrite = true;
    // Expected on read-only environments like Vercel Lambda
  }

  // Also write to /tmp in serverless or if cwd write failed
  try {
    if (!wroteCwd || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      fs.writeFileSync(tmpCouponsPath, JSON.stringify(coupons, null, 2), "utf-8");
    }
  } catch (tmpErr) {
    console.error("Error writing to /tmp/coupons.json:", tmpErr);
  }
}

export function getOriginalAmountForCategory(category: string): number {
  const trimmed = (category || "").trim();
  if (/^3k/i.test(trimmed)) return 749;
  if (/^5k/i.test(trimmed)) return 999;
  if (/^10k/i.test(trimmed)) return 1099;
  return 1099;
}

export interface CouponValidationResult {
  valid: boolean;
  message: string;
  coupon?: Coupon;
  originalAmount?: number;
  discountAmount?: number;
  finalAmount?: number;
}

export function validateCoupon(rawCode: string, category: string): CouponValidationResult {
  const originalAmount = getOriginalAmountForCategory(category);
  if (!rawCode || !rawCode.trim()) {
    return {
      valid: false,
      message: "Please enter a coupon code."
    };
  }

  const code = rawCode.trim().toUpperCase();
  const coupons = getCoupons();
  const found = coupons.find(c => c.code.toUpperCase() === code);

  if (!found) {
    return {
      valid: false,
      message: "Invalid coupon code."
    };
  }

  if (!found.isActive) {
    return {
      valid: false,
      message: "This coupon code is no longer active."
    };
  }

  if (found.expiryDate) {
    const expiry = found.expiryDate.includes("T") 
      ? new Date(found.expiryDate) 
      : new Date(`${found.expiryDate}T23:59:59.999`);
    if (expiry < new Date()) {
      return {
        valid: false,
        message: "This coupon code has expired."
      };
    }
  }

  if (found.maxUses && found.timesUsed >= found.maxUses) {
    return {
      valid: false,
      message: "This coupon code has reached its maximum usage limit."
    };
  }

  let discountAmount = 0;
  if (found.discountType === "percentage") {
    discountAmount = Math.round((originalAmount * found.discountValue) / 100);
  } else {
    discountAmount = Math.min(originalAmount, found.discountValue);
  }

  const finalAmount = Math.max(0, originalAmount - discountAmount);

  return {
    valid: true,
    message: `${found.discountValue}${found.discountType === "percentage" ? "%" : "₹"} discount applied successfully!`,
    coupon: found,
    originalAmount,
    discountAmount,
    finalAmount
  };
}

export function recordCouponUsage(rawCode: string): void {
  if (!rawCode) return;
  const code = rawCode.trim().toUpperCase();
  const coupons = getCoupons();
  const index = coupons.findIndex(c => c.code.toUpperCase() === code);
  if (index !== -1) {
    coupons[index].timesUsed = (coupons[index].timesUsed || 0) + 1;
    saveCoupons(coupons);
  }
}
