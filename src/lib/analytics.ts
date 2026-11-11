import fs from "fs";
import { getDataFilePath } from "@/lib/data-paths";

const ANALYTICS_FILE = getDataFilePath("analytics.json");
const REGISTRATIONS_FILE = getDataFilePath("registrations.json");

export interface DropoffLog {
  id: string;
  timestamp: string;
  stage: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  category?: string;
  amount?: number;
  coupon?: string;
  remark: string;
  status: "DROP_OFF" | "ERROR" | "ABANDONED" | "SUCCESS";
}

export interface AnalyticsData {
  totalPageViews: number;
  totalClicks: number;
  totalRegisterClicks: number;
  totalFormOpened: number;
  totalPaymentInitiated: number;
  totalPaymentCompleted: number;
  uniqueVisitors: string[];
  dailyStats: {
    [dateStr: string]: {
      pageViews: number;
      visitors: string[];
      clicks: number;
      registerClicks?: number;
      formOpened?: number;
      paymentInitiated?: number;
      paymentCompleted?: number;
    };
  };
  dropoffLogs: DropoffLog[];
  recentEvents: Array<{
    type: string;
    path: string;
    visitorId: string;
    label?: string;
    meta?: any;
    timestamp: string;
  }>;
}

function getInitialAnalytics(): AnalyticsData {
  return {
    totalPageViews: 0,
    totalClicks: 0,
    totalRegisterClicks: 0,
    totalFormOpened: 0,
    totalPaymentInitiated: 0,
    totalPaymentCompleted: 0,
    uniqueVisitors: [],
    dailyStats: {},
    dropoffLogs: [],
    recentEvents: []
  };
}

export function readAnalytics(): AnalyticsData {
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) {
      const initial = getInitialAnalytics();
      fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const raw = fs.readFileSync(ANALYTICS_FILE, "utf8");
    const data = JSON.parse(raw);
    return {
      totalPageViews: data.totalPageViews || 0,
      totalClicks: data.totalClicks || 0,
      totalRegisterClicks: data.totalRegisterClicks || 0,
      totalFormOpened: data.totalFormOpened || 0,
      totalPaymentInitiated: data.totalPaymentInitiated || 0,
      totalPaymentCompleted: data.totalPaymentCompleted || 0,
      uniqueVisitors: Array.isArray(data.uniqueVisitors) ? data.uniqueVisitors : [],
      dailyStats: data.dailyStats || {},
      dropoffLogs: Array.isArray(data.dropoffLogs) 
        ? data.dropoffLogs.filter(Boolean).map((log: any) => ({
            id: log?.id || `log_${Math.random().toString(36).substring(2, 7)}`,
            timestamp: log?.timestamp || new Date().toISOString(),
            stage: String(log?.stage || "CHECKOUT"),
            name: log?.name || undefined,
            whatsapp: log?.whatsapp || undefined,
            email: log?.email || undefined,
            category: log?.category || undefined,
            amount: log?.amount || undefined,
            coupon: log?.coupon || undefined,
            remark: log?.remark || "Participant activity recorded",
            status: log?.status || "DROP_OFF"
          }))
        : [],
      recentEvents: Array.isArray(data.recentEvents) ? data.recentEvents.filter(Boolean) : []
    };
  } catch (err) {
    console.error("Error reading analytics.json:", err);
    return getInitialAnalytics();
  }
}

export function saveAnalytics(data: AnalyticsData) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving analytics.json:", err);
  }
}

export function recordAnalyticsEvent(
  type: string,
  eventPath: string,
  visitorId: string,
  label?: string,
  meta?: any
) {
  const data = readAnalytics();
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const timestamp = now.toISOString();

  if (!data.dailyStats[dateStr]) {
    data.dailyStats[dateStr] = {
      pageViews: 0,
      visitors: [],
      clicks: 0,
      registerClicks: 0,
      formOpened: 0,
      paymentInitiated: 0,
      paymentCompleted: 0
    };
  }

  const dayBucket = data.dailyStats[dateStr];

  // Track unique visitor globally & per day
  if (visitorId && !data.uniqueVisitors.includes(visitorId)) {
    data.uniqueVisitors.push(visitorId);
  }
  if (visitorId && !dayBucket.visitors.includes(visitorId)) {
    dayBucket.visitors.push(visitorId);
  }

  if (type === "pageview") {
    data.totalPageViews = (data.totalPageViews || 0) + 1;
    dayBucket.pageViews = (dayBucket.pageViews || 0) + 1;

    if (eventPath === "/registeration" || eventPath.startsWith("/registeration")) {
      data.totalFormOpened = (data.totalFormOpened || 0) + 1;
      dayBucket.formOpened = (dayBucket.formOpened || 0) + 1;
    }
  } else if (type === "click") {
    data.totalClicks = (data.totalClicks || 0) + 1;
    dayBucket.clicks = (dayBucket.clicks || 0) + 1;

    // Check if this click was a Register CTA
    const lowerLabel = (label || "").toLowerCase();
    if (
      lowerLabel.includes("register") ||
      lowerLabel.includes("join the run") ||
      lowerLabel.includes("sign up") ||
      eventPath === "/registeration"
    ) {
      data.totalRegisterClicks = (data.totalRegisterClicks || 0) + 1;
      dayBucket.registerClicks = (dayBucket.registerClicks || 0) + 1;
    }
  } else if (type === "register_cta_click") {
    data.totalRegisterClicks = (data.totalRegisterClicks || 0) + 1;
    dayBucket.registerClicks = (dayBucket.registerClicks || 0) + 1;
  } else if (type === "proceed_payment") {
    data.totalPaymentInitiated = (data.totalPaymentInitiated || 0) + 1;
    dayBucket.paymentInitiated = (dayBucket.paymentInitiated || 0) + 1;
  } else if (type === "payment_completed") {
    data.totalPaymentCompleted = (data.totalPaymentCompleted || 0) + 1;
    dayBucket.paymentCompleted = (dayBucket.paymentCompleted || 0) + 1;
  }

  // Handle dropoff/error logging with diagnostic remarks
  if (type === "dropoff_log" || meta?.isDropoff) {
    const logEntry: DropoffLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      stage: meta?.stage || "CHECKOUT",
      name: meta?.name || undefined,
      whatsapp: meta?.whatsapp || meta?.contact || undefined,
      email: meta?.email || undefined,
      category: meta?.category || undefined,
      amount: meta?.amount || undefined,
      coupon: meta?.coupon || undefined,
      remark: meta?.remark || label || "Participant dropped off before completing payment",
      status: meta?.status || "DROP_OFF"
    };

    if (!Array.isArray(data.dropoffLogs)) {
      data.dropoffLogs = [];
    }
    data.dropoffLogs.unshift(logEntry);

    // Limit to latest 200 logs
    if (data.dropoffLogs.length > 200) {
      data.dropoffLogs = data.dropoffLogs.slice(0, 200);
    }
  }

  // Record to recent events (keep last 100)
  data.recentEvents.unshift({
    type,
    path: eventPath || "/",
    visitorId,
    label: label ? label.slice(0, 80) : undefined,
    meta: meta || undefined,
    timestamp
  });

  if (data.recentEvents.length > 100) {
    data.recentEvents = data.recentEvents.slice(0, 100);
  }

  saveAnalytics(data);
}

export function getAnalyticsMetricsSummary() {
  const data = readAnalytics();

  // Read actual registrations
  let registrations: any[] = [];
  try {
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const rawRegs = fs.readFileSync(REGISTRATIONS_FILE, "utf8");
      registrations = JSON.parse(rawRegs);
      if (!Array.isArray(registrations)) registrations = [];
    }
  } catch (err) {
    console.error("Error reading registrations for analytics:", err);
  }

  const now = new Date();
  const days14Ago = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const days7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let currentViews = 0;
  let prevViews = 0;
  let currentClicks = 0;
  let prevClicks = 0;

  const currentVisitorsSet = new Set<string>();
  const prevVisitorsSet = new Set<string>();

  Object.entries(data.dailyStats).forEach(([dateStr, stats]) => {
    const d = new Date(dateStr);
    if (d >= days7Ago) {
      currentViews += stats.pageViews || 0;
      currentClicks += stats.clicks || 0;
      (stats.visitors || []).forEach(v => currentVisitorsSet.add(v));
    } else if (d >= days14Ago && d < days7Ago) {
      prevViews += stats.pageViews || 0;
      prevClicks += stats.clicks || 0;
      (stats.visitors || []).forEach(v => prevVisitorsSet.add(v));
    }
  });

  // Calculate Submissions current vs previous period
  let currentSubmissions = 0;
  let prevSubmissions = 0;

  registrations.forEach(r => {
    const regDateStr = r.created_at || r.payment?.paid_at;
    if (regDateStr) {
      const regDate = new Date(regDateStr);
      if (!isNaN(regDate.getTime())) {
        if (regDate >= days7Ago) {
          currentSubmissions++;
        } else if (regDate >= days14Ago && regDate < days7Ago) {
          prevSubmissions++;
        }
      }
    }
  });

  const calcChange = (curr: number, prev: number) => {
    if (prev === 0) {
      return curr > 0 ? { pct: "100.0", isPositive: true } : { pct: "0.0", isPositive: true };
    }
    const diff = ((curr - prev) / prev) * 100;
    return {
      pct: Math.abs(diff).toFixed(1),
      isPositive: diff >= 0
    };
  };

  const pageViewsChange = calcChange(currentViews, prevViews);
  const visitorsChange = calcChange(currentVisitorsSet.size, prevVisitorsSet.size);
  const clicksChange = calcChange(currentClicks, prevClicks);
  const submissionsChange = calcChange(currentSubmissions, prevSubmissions);

  const totalVisitors = data.uniqueVisitors.length || 1;
  const registerClicks = data.totalRegisterClicks || 0;
  const formOpened = data.totalFormOpened || 0;
  const paymentInitiated = data.totalPaymentInitiated || 0;
  const paymentCompleted = Math.max(data.totalPaymentCompleted || 0, registrations.length);

  return {
    pageViews: {
      total: data.totalPageViews,
      currentPeriod: currentViews,
      prevPeriod: prevViews,
      pct: pageViewsChange.pct,
      isPositive: pageViewsChange.isPositive
    },
    visitors: {
      total: data.uniqueVisitors.length,
      currentPeriod: currentVisitorsSet.size,
      prevPeriod: prevVisitorsSet.size,
      pct: visitorsChange.pct,
      isPositive: visitorsChange.isPositive
    },
    clicks: {
      total: data.totalClicks,
      currentPeriod: currentClicks,
      prevPeriod: prevClicks,
      pct: clicksChange.pct,
      isPositive: clicksChange.isPositive
    },
    submissions: {
      total: registrations.length,
      currentPeriod: currentSubmissions,
      prevPeriod: prevSubmissions,
      pct: submissionsChange.pct,
      isPositive: submissionsChange.isPositive
    },
    funnel: {
      totalVisitors,
      registerClicks,
      formOpened,
      paymentInitiated,
      paymentCompleted,
      // Conversion rates
      visitorToCtaPct: totalVisitors > 0 ? ((registerClicks / totalVisitors) * 100).toFixed(1) : "0.0",
      ctaToFormPct: registerClicks > 0 ? ((formOpened / registerClicks) * 100).toFixed(1) : "0.0",
      formToPaymentPct: formOpened > 0 ? ((paymentInitiated / formOpened) * 100).toFixed(1) : "0.0",
      paymentToSuccessPct: paymentInitiated > 0 ? ((paymentCompleted / paymentInitiated) * 100).toFixed(1) : "0.0",
      overallConversionPct: totalVisitors > 0 ? ((paymentCompleted / totalVisitors) * 100).toFixed(1) : "0.0"
    },
    dropoffLogs: data.dropoffLogs || []
  };
}
