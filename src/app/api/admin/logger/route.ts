import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { getDataFilePath } from "@/lib/data-paths";

export async function GET(req: Request) {
  try {
    const pythonScriptPath = path.join(process.cwd(), "scripts", "ops", "logger-service.py");

    if (!fs.existsSync(pythonScriptPath)) {
      return NextResponse.json({ error: "Logger service script not found" }, { status: 500 });
    }

    // Execute Python backend service
    const runPython = (): Promise<any> => {
      return new Promise((resolve) => {
        // Try 'python3', 'python', or 'py -3'
        const command = process.platform === "win32" ? "py -3 scripts/ops/logger-service.py" : "python3 scripts/ops/logger-service.py";
        
        exec(command, { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
          if (error || !stdout) {
            console.warn(`Python execution with '${command}' had note, attempting fallback 'python scripts/ops/logger-service.py'...`, stderr || error);
            
            exec("python scripts/ops/logger-service.py", { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }, (err2, stdout2) => {
              if (err2 || !stdout2) {
                console.error("Python logger execution fallback error:", err2);
                return resolve(null);
              }
              try {
                resolve(JSON.parse(stdout2));
              } catch (parseErr) {
                console.error("Failed to parse Python logger stdout2:", parseErr);
                resolve(null);
              }
            });
            return;
          }

          try {
            resolve(JSON.parse(stdout));
          } catch (parseErr) {
            console.error("Failed to parse Python logger stdout:", parseErr);
            resolve(null);
          }
        });
      });
    };

    let result = await runPython();

    // Node.js direct fallback in case Python interpreter is temporarily unmapped
    if (!result) {
      const analyticsPath = getDataFilePath("analytics.json");
      const registrationsPath = getDataFilePath("registrations.json");

      let analyticsData: any = {};
      let registrations: any[] = [];

      if (fs.existsSync(analyticsPath)) {
        try { analyticsData = JSON.parse(fs.readFileSync(analyticsPath, "utf-8")); } catch {}
      }
      if (fs.existsSync(registrationsPath)) {
        try { registrations = JSON.parse(fs.readFileSync(registrationsPath, "utf-8")); } catch {}
      }

      const dropoffLogs = analyticsData.dropoffLogs || [];
      const humanLogs: any[] = [];

      for (const r of registrations) {
        humanLogs.push({
          id: `reg_${r.id}`,
          timestamp: r.created_at || new Date().toISOString(),
          friendlyTime: new Date(r.created_at || Date.now()).toLocaleString("en-IN"),
          type: "SUCCESS",
          tag: "Payment Confirmed",
          tagColor: "green",
          mood: "High Intent / Completed",
          moodIcon: "🎉",
          name: r.name || "Runner",
          contact: r.whatsapp || "",
          email: r.email || "",
          category: r.event_category || "3Km",
          amount: r.amount || 0,
          story: `Runner ${r.name} successfully registered for the ${r.event_category} Run (#FLX-${10000 + (r.id || 0)}). Paid ₹${r.amount || 0}.`,
          technicalReason: `Payment ID: ${r.payment?.razorpay_payment_id || "N/A"}`,
          actionRecommendation: "Registration verified.",
          isSuccess: true,
          isError: false,
          isLackOfInterest: false
        });
      }

      for (const log of dropoffLogs) {
        const isSucc = log.status === "SUCCESS";
        const isErr = log.status === "ERROR" || String(log.stage).includes("ERROR") || String(log.stage).includes("FAILED");
        const isHesitation = String(log.stage).includes("DISMISSED") || String(log.stage).includes("POPUP");

        humanLogs.push({
          id: log.id || `log_${Math.random()}`,
          timestamp: log.timestamp || new Date().toISOString(),
          friendlyTime: new Date(log.timestamp || Date.now()).toLocaleString("en-IN"),
          type: isSucc ? "SUCCESS" : isHesitation ? "HESITATION" : isErr ? "ERROR" : "LACK_OF_INTEREST",
          tag: isSucc ? "Payment Confirmed" : isHesitation ? "Hesitation / Abandoned" : isErr ? "Payment Error" : "Lack of Interest",
          tagColor: isSucc ? "green" : isHesitation ? "orange" : isErr ? "red" : "amber",
          mood: isSucc ? "High Intent / Completed" : isHesitation ? "Price Resistance / Hesitation" : isErr ? "Technical Issue" : "Lost Interest",
          moodIcon: isSucc ? "✅" : isHesitation ? "🤔" : isErr ? "⚠️" : "📉",
          name: log.name || "Anonymous Visitor",
          contact: log.whatsapp || "",
          email: log.email || "",
          category: log.category || "Run",
          amount: log.amount || 0,
          story: isSucc 
            ? `Visitor ${log.name} completed checkout for ${log.category} Run (₹${log.amount}).`
            : isHesitation
            ? `Visitor ${log.name} was ready to register for ${log.category} Run (₹${log.amount}), entered details, but closed payment window without paying.`
            : `Visitor ${log.name} selected ${log.category} Run (₹${log.amount}), but left before completing payment.`,
          technicalReason: log.remark || "Session drop-off",
          actionRecommendation: isSucc ? "Runner confirmed." : "Send friendly reminder on WhatsApp.",
          isSuccess: isSucc,
          isError: isErr || isHesitation,
          isLackOfInterest: !isSucc && !isErr
        });
      }

      humanLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      result = {
        summary: {
          totalLogs: humanLogs.length,
          totalSuccess: humanLogs.filter(l => l.isSuccess).length,
          totalErrorsAndDropoffs: humanLogs.filter(l => l.isError).length,
          totalLackOfInterest: humanLogs.filter(l => l.isLackOfInterest).length,
          overallConversionRate: `${((humanLogs.filter(l => l.isSuccess).length / (analyticsData.totalPageViews || 1)) * 100).toFixed(1)}%`,
          paymentDropoffRate: `${((humanLogs.filter(l => l.isError).length / (analyticsData.totalPaymentInitiated || 1)) * 100).toFixed(1)}%`,
          healthStatus: "Active"
        },
        insights: {
          topDropoffReason: "Payment popup dismissed before completing UPI transfer",
          topCategory: "10Km Run",
          primaryRecommendation: "Offer a discount coupon or send automated WhatsApp reminders."
        },
        allLogs: humanLogs,
        successLogs: humanLogs.filter(l => l.isSuccess),
        errorLogs: humanLogs.filter(l => l.isError)
      };
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Logger API route error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
