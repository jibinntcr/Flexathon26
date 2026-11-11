import { NextResponse } from "next/server";
import fs from "fs";
import { verifySession } from "../auth-utils";
import { getDataFilePath } from "@/lib/data-paths";

const CAMPAIGNS_FILE = getDataFilePath("campaigns.json");

export interface CampaignRecord {
  id: string;
  timestamp: string;
  subject: string;
  channel: "email" | "sms";
  templateName?: string;
  totalRecipients: number;
  successCount: number;
  failedCount: number;
  senderEmail: string;
  senderName: string;
  status: "COMPLETED" | "PARTIAL" | "FAILED";
  previewSnippet?: string;
  recipientsSample?: string[];
  errors?: string[];
  attachmentsCount?: number;
  attachmentNames?: string[];
}

function readCampaigns(): CampaignRecord[] {
  try {
    if (!fs.existsSync(CAMPAIGNS_FILE)) {
      fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const data = fs.readFileSync(CAMPAIGNS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading campaigns.json:", err);
    return [];
  }
}

function saveCampaigns(campaigns: CampaignRecord[]) {
  try {
    fs.writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving campaigns.json:", err);
  }
}

export function cleanHtmlFences(html: string): string {
  if (!html) return html;
  let cleaned = html.trim();
  // Remove markdown code fences: ```html, ```xml, ```htm, or ```
  cleaned = cleaned.replace(/^```(?:html?|xml)?\s*\n?/i, "");
  cleaned = cleaned.replace(/\n?```\s*$/i, "");
  return cleaned.trim();
}

export function resolveHtmlWithLogo(html: string): string {
  if (!html) return html;
  const OFFICIAL_LOGO_URL = "https://flexathonrun.org/logo/logo.png";
  const OFFICIAL_LOGO_TAG = `<div style="background-color: #FFFFFF; padding: 14px 20px; text-align: center; border-radius: 10px; display: inline-block; margin: 0 auto; box-sizing: border-box;"><img src="${OFFICIAL_LOGO_URL}" alt="FLEXATHON 2026" width="160" style="max-width: 160px; height: auto; display: block; margin: 0 auto; border: 0; background-color: #FFFFFF;" /></div>`;

  let processed = cleanHtmlFences(html);

  // 1. Direct variable replacements
  processed = processed
    .replace(/\{\{\s*LOGO\s*\}\}/gi, OFFICIAL_LOGO_TAG)
    .replace(/\{\{\s*LOGO_IMAGE\s*\}\}/gi, OFFICIAL_LOGO_TAG)
    .replace(/\{\{\s*LOGO_SPACE\s*\}\}/gi, OFFICIAL_LOGO_TAG)
    .replace(/\{\{\s*LOGO_URL\s*\}\}/gi, OFFICIAL_LOGO_URL)
    .replace(/\{\{\s*LOGO_SRC\s*\}\}/gi, OFFICIAL_LOGO_URL);

  // 2. Relative or local image src references from logo folder
  processed = processed
    .replace(/src=["'](?:\/)?logo\/(?:logo\.png|Our%20logo\.jpeg|Our logo\.jpeg)["']/gi, `src="${OFFICIAL_LOGO_URL}"`)
    .replace(/src=["'](?:\/)?logo\.png["']/gi, `src="${OFFICIAL_LOGO_URL}"`)
    .replace(/src=["'](?:\/)?flexathon-(?:main-)?logo(?:-transparent)?\.png["']/gi, `src="${OFFICIAL_LOGO_URL}"`)
    .replace(/src=["'](?:PLACEHOLDER_LOGO|placeholder-logo|logo-placeholder|#logo)["']/gi, `src="${OFFICIAL_LOGO_URL}"`);

  // 3. HTML Comments indicating logo space
  processed = processed
    .replace(/<!--\s*(?:INSERT\s+)?LOGO(?:\s+SPACE|\s+HERE|\s+PLACEHOLDER)?\s*-->/gi, OFFICIAL_LOGO_TAG);

  // 4. Any empty logo div/container: <div id="logo-space"></div> or <td class="logo"></td>
  processed = processed
    .replace(/(<(?:div|td|section|span)[^>]*(?:id=["']logo(?:-space)?["']|class=["'][^"']*\blogo(?:-space)?\b[^"']*)[^>]*>)\s*(?:<!--.*?-->|\s*|\{\{.*?\}\})*(<\/(?:div|td|section|span)>)/gi, `$1${OFFICIAL_LOGO_TAG}$2`);

  return processed;
}

// GET: Retrieve campaign history
export async function GET(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const campaigns = readCampaigns();
    return NextResponse.json({
      success: true,
      campaigns: campaigns.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      brevoConfigured: Boolean(process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY),
      defaultSenderEmail: process.env.BREVO_SENDER_EMAIL || "info@flexathonrun.org",
      defaultSenderName: process.env.BREVO_SENDER_NAME || "FLEXATHON 2026"
    });
  } catch (err: any) {
    console.error("GET /api/admin/campaigns error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

// POST: Send campaign / test email via Brevo
export async function POST(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.split(";")
      .find(c => c.trim().startsWith("admin_session="))
      ?.split("=")[1];

    if (!sessionCookie || !verifySession(decodeURIComponent(sessionCookie))) {
      return NextResponse.json({ success: false, error: "Unauthorized session" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const {
      channel = "email",
      subject,
      htmlContent,
      textContent,
      recipients = [],
      templateName = "Custom Announcement",
      isTest = false,
      attachments = []
    } = body;

    const brevoApiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY || "";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || "info@flexathonrun.org";
    const senderName = process.env.BREVO_SENDER_NAME || "FLEXATHON 2026";

    if (!brevoApiKey) {
      return NextResponse.json({
        success: false,
        error: "Brevo API Key (BREVO_API_KEY) is not configured in server environment."
      }, { status: 400 });
    }

    if (channel === "sms") {
      // Brevo SMS channel handling (Schema & API ready)
      if (!Array.isArray(recipients) || recipients.length === 0) {
        return NextResponse.json({ success: false, error: "No phone numbers provided for SMS broadcast." }, { status: 400 });
      }

      let smsSuccess = 0;
      let smsFailed = 0;
      const errors: string[] = [];

      for (const phoneItem of recipients) {
        const rawPhone = typeof phoneItem === "string" ? phoneItem : phoneItem?.phone || phoneItem?.number;
        const cleanPhone = String(rawPhone || "").replace(/[^\d+]/g, "").trim();
        if (!cleanPhone) continue;

        try {
          const smsRes = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
            method: "POST",
            headers: {
              "api-key": brevoApiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              type: "transactional",
              sender: "FLEXATHON",
              recipient: cleanPhone,
              content: textContent || subject || "FLEXATHON 2026 update"
            })
          });
          const smsData = await smsRes.json();
          if (smsRes.ok) {
            smsSuccess++;
          } else {
            smsFailed++;
            errors.push(`${cleanPhone}: ${smsData.message || "Failed to deliver SMS"}`);
          }
        } catch (err: any) {
          smsFailed++;
          errors.push(`${cleanPhone}: ${err?.message || "Network error"}`);
        }
      }

      const campaignRecord: CampaignRecord = {
        id: `cmp_${Date.now()}_sms`,
        timestamp: new Date().toISOString(),
        subject: subject || "SMS Broadcast",
        channel: "sms",
        templateName: "SMS Broadcast",
        totalRecipients: recipients.length,
        successCount: smsSuccess,
        failedCount: smsFailed,
        senderEmail: senderEmail,
        senderName: senderName,
        status: smsFailed === 0 ? "COMPLETED" : smsSuccess > 0 ? "PARTIAL" : "FAILED",
        previewSnippet: (textContent || "").slice(0, 100),
        errors: errors.slice(0, 10)
      };

      if (!isTest) {
        const allCampaigns = readCampaigns();
        allCampaigns.unshift(campaignRecord);
        saveCampaigns(allCampaigns);
      }

      return NextResponse.json({
        success: smsSuccess > 0,
        delivered: smsSuccess,
        failed: smsFailed,
        total: recipients.length,
        errors: errors.slice(0, 5)
      });
    }

    // EMAIL CHANNEL (Brevo API)
    if (!subject || !subject.trim()) {
      return NextResponse.json({ success: false, error: "Email subject is required." }, { status: 400 });
    }

    if (!htmlContent || !htmlContent.trim()) {
      return NextResponse.json({ success: false, error: "Email message content is required." }, { status: 400 });
    }

    const resolvedHtml = resolveHtmlWithLogo(htmlContent);

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ success: false, error: "No recipient email addresses provided." }, { status: 400 });
    }

    // Filter and sanitize recipient email list
    const validRecipients: { email: string; name?: string }[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const seen = new Set<string>();

    for (const r of recipients) {
      const email = typeof r === "string" ? r.trim().toLowerCase() : (r.email || "").trim().toLowerCase();
      const name = typeof r === "object" ? (r.name || "").trim() : "";
      if (email && emailRegex.test(email) && !seen.has(email)) {
        seen.add(email);
        validRecipients.push({ email, name: name || undefined });
      }
    }

    if (validRecipients.length === 0) {
      return NextResponse.json({ success: false, error: "No valid email addresses found in the recipient list." }, { status: 400 });
    }

    // Sanitize and prepare attachments for Brevo API
    const validAttachments: { name: string; content?: string; url?: string }[] = [];
    if (Array.isArray(attachments)) {
      for (const att of attachments) {
        if (att && typeof att.name === "string" && att.name.trim()) {
          const cleanName = att.name.trim();
          let cleanContent = typeof att.content === "string" ? att.content.trim() : "";
          if (cleanContent.includes(",")) {
            cleanContent = cleanContent.split(",")[1];
          }
          if (cleanContent) {
            validAttachments.push({ name: cleanName, content: cleanContent });
          } else if (att.url && typeof att.url === "string") {
            validAttachments.push({ name: cleanName, url: att.url.trim() });
          }
        }
      }
    }

    console.log(`[BREVO BULK DISPATCH] Starting broadcast to ${validRecipients.length} recipients with ${validAttachments.length} attachments...`);

    let successCount = 0;
    let failedCount = 0;
    const dispatchErrors: string[] = [];

    // Chunk recipients into batches of 10 for reliable individual deliverability tracking & rate limit safety
    const chunkSize = 10;
    for (let i = 0; i < validRecipients.length; i += chunkSize) {
      const chunk = validRecipients.slice(i, i + chunkSize);
      
      await Promise.all(chunk.map(async (recipient) => {
        try {
          const payload: any = {
            sender: {
              name: senderName,
              email: senderEmail
            },
            to: [{
              email: recipient.email,
              name: recipient.name || "Participant"
            }],
            subject: subject.trim(),
            htmlContent: resolvedHtml,
            textContent: textContent || undefined
          };

          if (validAttachments.length > 0) {
            payload.attachment = validAttachments;
          }

          const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": brevoApiKey,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const brevoData = await brevoRes.json().catch(() => ({}));

          if (brevoRes.ok) {
            successCount++;
          } else {
            failedCount++;
            dispatchErrors.push(`${recipient.email}: ${brevoData.message || brevoData.code || "Delivery rejected"}`);
          }
        } catch (err: any) {
          failedCount++;
          dispatchErrors.push(`${recipient.email}: ${err?.message || "Network exception"}`);
        }
      }));

      // Small delay between chunks if list is large
      if (i + chunkSize < validRecipients.length) {
        await new Promise(r => setTimeout(r, 120));
      }
    }

    const campaignStatus: "COMPLETED" | "PARTIAL" | "FAILED" = 
      failedCount === 0 ? "COMPLETED" : successCount > 0 ? "PARTIAL" : "FAILED";

    const campaignRecord: CampaignRecord = {
      id: `cmp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      subject: subject.trim(),
      channel: "email",
      templateName: templateName || "Announcement",
      totalRecipients: validRecipients.length,
      successCount,
      failedCount,
      senderEmail,
      senderName,
      status: campaignStatus,
      previewSnippet: subject.trim(),
      recipientsSample: validRecipients.slice(0, 5).map(r => r.email),
      errors: dispatchErrors.slice(0, 10),
      attachmentsCount: validAttachments.length,
      attachmentNames: validAttachments.map(a => a.name)
    };

    // Save to campaigns.json if not a single test send
    if (!isTest) {
      const allCampaigns = readCampaigns();
      allCampaigns.unshift(campaignRecord);
      saveCampaigns(allCampaigns);
    }

    return NextResponse.json({
      success: successCount > 0,
      delivered: successCount,
      failed: failedCount,
      total: validRecipients.length,
      status: campaignStatus,
      errors: dispatchErrors.slice(0, 5)
    });
  } catch (err: any) {
    console.error("POST /api/admin/campaigns error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Internal server error" }, { status: 500 });
  }
}
