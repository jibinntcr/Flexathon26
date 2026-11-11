"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const [captchaSvg, setCaptchaSvg] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Navigation tab state: 'home' | 'analytics' | 'logger' | 'coupons' | 'advertisement'
  const [activeTab, setActiveTab] = useState<"home" | "analytics" | "logger" | "coupons" | "advertisement">("home");
  const [analyticsSubTab, setAnalyticsSubTab] = useState<"all" | "success" | "errors">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Logger & User Reaction states (Powered by Python Backend)
  const [loggerData, setLoggerData] = useState<any | null>(null);
  const [loadingLogger, setLoadingLogger] = useState<boolean>(false);
  const [loggerFilterMood, setLoggerFilterMood] = useState<string>("ALL");
  const [loggerSearch, setLoggerSearch] = useState<string>("");

  // Change password states
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string>("");

  // Registrations state
  const [selectedRunner, setSelectedRunner] = useState<any | null>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [couponFilter, setCouponFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isReconciling, setIsReconciling] = useState<boolean>(false);
  const [reconcileResult, setReconcileResult] = useState<string | null>(null);
  const [updatingSizeId, setUpdatingSizeId] = useState<number | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Coupons state
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState<boolean>(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState<boolean>(false);
  const [isCreatingCoupon, setIsCreatingCoupon] = useState<boolean>(false);
  const [couponSearch, setCouponSearch] = useState<string>("");
  const [recentlyCreatedCouponId, setRecentlyCreatedCouponId] = useState<number | null>(null);
  const [newCouponCode, setNewCouponCode] = useState<string>("");
  const [newDiscountType, setNewDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [newDiscountValue, setNewDiscountValue] = useState<number>(10);
  const [newDescription, setNewDescription] = useState<string>("");
  const [newMaxUses, setNewMaxUses] = useState<string>("");
  const [newExpiryDate, setNewExpiryDate] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");
  const [couponSuccess, setCouponSuccess] = useState<string>("");

  // Advertisement & Broadcast Campaign state
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const DEFAULT_FLEXATHON_RAW_TEMPLATE = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>FLEXATHON 2026</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root {
      color-scheme: light;
      supported-color-schemes: light;
    }
    body, table, td, p, a, div, span {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    /* Prevent Dark Mode Inversion in Mobile Clients (Gmail, Apple Mail, Outlook) */
    u + .body .main-card,
    u + .body .bg-white,
    u + .body table,
    u + .body td {
      background-color: #ffffff !important;
      background: #ffffff !important;
    }
    @media (prefers-color-scheme: dark) {
      body, .bg-outer, table[class="bg-outer"] {
        background-color: #ffffff !important;
        background: #ffffff !important;
        color: #20242a !important;
      }
      .main-card, table[class="main-card"], .bg-white, td.bg-white {
        background-color: #ffffff !important;
        background: #ffffff !important;
        color: #20242a !important;
      }
      .text-dark {
        color: #171b20 !important;
      }
      .text-muted {
        color: #555e67 !important;
      }
    }
  </style>
</head>

<body class="bg-outer" bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#20242a;">

<!-- PREHEADER -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
  Join FLEXATHON 2026 – The Global Goals Run. 3K, 5K & 10K on 18 October 2026 at ESCI, Gachibowli.
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" class="bg-outer" style="background-color:#ffffff;background:#ffffff;">
<tr>
<td align="center" style="padding:20px 10px;background-color:#ffffff;">

<!-- MAIN CONTAINER -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" class="main-card bg-white"
       style="max-width:650px;background-color:#ffffff;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(0,0,0,0.06);">

<!-- SDG COLOR STRIP -->
<tr>
<td style="background-color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td height="6" bgcolor="#E5243B"></td>
<td bgcolor="#DDA63A"></td>
<td bgcolor="#4C9F38"></td>
<td bgcolor="#C5192D"></td>
<td bgcolor="#FF3A21"></td>
<td bgcolor="#26BDE2"></td>
<td bgcolor="#FCC30B"></td>
<td bgcolor="#A21942"></td>
<td bgcolor="#FD6925"></td>
<td bgcolor="#DD1367"></td>
<td bgcolor="#FD9D24"></td>
<td bgcolor="#3F7E44"></td>
<td bgcolor="#0A97D9"></td>
<td bgcolor="#56C02B"></td>
<td bgcolor="#00689D"></td>
<td bgcolor="#19486A"></td>
</tr>
</table>
</td>
</tr>

<!-- LOGO -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:28px 35px 15px 35px; background-color: #ffffff; text-align: left;">
<div style="background-color: #ffffff; display: inline-block;">
  <img src="https://flexathonrun.org/logo/logo.png"
       width="180"
       alt="FLEXATHON 2026"
       style="display:block;width:180px;max-width:180px;height:auto;border:0;background-color:#ffffff;">
</div>
</td>
</tr>

<!-- HERO -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:20px 35px 35px 35px;background-color:#ffffff;">

<div style="
font-size:11px;
font-weight:bold;
letter-spacing:1.2px;
color:#C5192D;
margin-bottom:12px;">
HYDERABAD EDITION · 2026
</div>

<h1 class="text-dark" style="
margin:0;
font-size:38px;
line-height:44px;
color:#171b20;
font-weight:800;">
Run for More Than<br>The Finish Line.
</h1>

<p class="text-muted" style="
margin:18px 0 0 0;
font-size:17px;
line-height:27px;
color:#555e67;">
Join <strong>FLEXATHON 2026 – The Global Goals Run</strong>,
bringing sport, community and purpose together in Hyderabad.
</p>

<!-- CTA -->
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:25px;">
<tr>
<td bgcolor="#C5192D" style="border-radius:7px;">
<a href="https://flexathonrun.org/"
   target="_blank"
   style="
   display:inline-block;
   padding:15px 28px;
   color:#ffffff;
   font-size:14px;
   font-weight:bold;
   text-decoration:none;
   letter-spacing:0.5px;">
REGISTER NOW →
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- EVENT DETAILS -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:0 35px 35px 35px;background-color:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f8fafc"
       style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">

<tr>

<td width="33%" valign="top"
    style="padding:20px;border-right:1px solid #e2e8f0;">
<div style="font-size:10px;color:#8a929a;font-weight:bold;">DATE</div>
<div style="margin-top:6px;font-size:15px;font-weight:bold;line-height:21px;color:#171b20;">
18 October<br>2026
</div>
</td>

<td width="33%" valign="top"
    style="padding:20px;border-right:1px solid #e2e8f0;">
<div style="font-size:10px;color:#8a929a;font-weight:bold;">VENUE</div>
<div style="margin-top:6px;font-size:15px;font-weight:bold;line-height:21px;color:#171b20;">
ESCI<br>Gachibowli
</div>
</td>

<td width="33%" valign="top"
    style="padding:20px;">
<div style="font-size:10px;color:#8a929a;font-weight:bold;">TIME</div>
<div style="margin-top:6px;font-size:15px;font-weight:bold;line-height:21px;color:#171b20;">
5:00 AM<br>Onwards
</div>
</td>

</tr>
</table>

</td>
</tr>

<!-- DISTANCES -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:10px 35px 35px 35px;background-color:#ffffff;">

<h2 class="text-dark" style="
margin:0;
color:#171b20;
font-size:24px;
font-weight:800;">
Choose Your Distance
</h2>

<p class="text-muted" style="
margin:6px 0 18px 0;
color:#555e67;
font-size:14px;">
Three distances. One shared purpose.
</p>

<table width="100%" cellpadding="0" cellspacing="0">
<tr>

<td width="33%" align="center" style="padding:4px;">
<table width="100%" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
<tr>
<td align="center" style="padding:18px 12px;">
<strong style="font-size:26px;color:#182027;font-weight:800;">3K</strong><br>
<span style="font-size:10px;color:#818991;font-weight:bold;letter-spacing:1px;">FUN RUN</span>
</td>
</tr>
</table>
</td>

<td width="33%" align="center" style="padding:4px;">
<table width="100%" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
<tr>
<td align="center" style="padding:18px 12px;">
<strong style="font-size:26px;color:#182027;font-weight:800;">5K</strong><br>
<span style="font-size:10px;color:#818991;font-weight:bold;letter-spacing:1px;">RUN</span>
</td>
</tr>
</table>
</td>

<td width="33%" align="center" style="padding:4px;">
<table width="100%" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
<tr>
<td align="center" style="padding:18px 12px;">
<strong style="font-size:26px;color:#182027;font-weight:800;">10K</strong><br>
<span style="font-size:10px;color:#818991;font-weight:bold;letter-spacing:1px;">RUN</span>
</td>
</tr>
</table>
</td>

</tr>
</table>

<p style="
margin:16px 0 0 0;
color:#C5192D;
font-size:14px;
font-weight:bold;">
Registrations starting from ₹599 onwards
</p>

</td>
</tr>

<!-- SDG 4 -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:0 35px 35px 35px;background-color:#ffffff;">

<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#fff7f7"
       style="background-color:#fff7f7;border-left:5px solid #C5192D;border-radius:8px;border:1px solid #fee2e2;border-left-width:5px;">

<tr>
<td style="padding:22px;">

<div style="
font-size:10px;
font-weight:bold;
color:#C5192D;
letter-spacing:1px;">
2026 GLOBAL GOAL
</div>

<h2 style="
margin:7px 0 8px 0;
font-size:21px;
color:#20252a;
font-weight:800;">
SDG 4 · Quality Education
</h2>

<p style="
margin:0;
font-size:14px;
line-height:23px;
color:#596169;">
Every FLEXATHON edition connects sport with one of the Sustainable
Development Goals. The Hyderabad 2026 edition highlights
Quality Education.
</p>

</td>
</tr>
</table>

</td>
</tr>

<!-- BENEFITS -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:0 35px 35px 35px;background-color:#ffffff;">

<h2 class="text-dark" style="
margin:0 0 17px 0;
font-size:24px;
color:#1c2126;
font-weight:800;">
Your FLEXATHON Experience
</h2>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td style="padding:10px 0;border-bottom:1px solid #eceff1;font-size:14px;color:#334155;">
✓ Run with friends, families, colleagues and communities
</td>
</tr>

<tr>
<td style="padding:10px 0;border-bottom:1px solid #eceff1;font-size:14px;color:#334155;">
✓ Choose from 3K, 5K and 10K categories
</td>
</tr>

<tr>
<td style="padding:10px 0;border-bottom:1px solid #eceff1;font-size:14px;color:#334155;">
✓ Finisher medal and E-Certificate
</td>
</tr>

<tr>
<td style="padding:10px 0;font-size:14px;color:#334155;">
✓ Run as part of a sporting initiative connected with the Global Goals
</td>
</tr>

</table>

</td>
</tr>

<!-- FINAL CTA -->
<tr>
<td align="center" class="bg-white" bgcolor="#f8fafc"
    style="padding:32px 35px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">

<h2 class="text-dark" style="
margin:0;
font-size:26px;
color:#1b2025;
font-weight:800;">
Your Starting Line Is Waiting.
</h2>

<p class="text-muted" style="
margin:9px 0 22px 0;
font-size:14px;
color:#626b73;">
Sunday, 18 October 2026 · ESCI, Gachibowli
</p>

<table cellpadding="0" cellspacing="0">
<tr>
<td bgcolor="#C5192D" style="border-radius:7px;">
<a href="https://flexathonrun.org/"
   target="_blank"
   style="
   display:inline-block;
   padding:15px 30px;
   color:#ffffff;
   font-size:14px;
   font-weight:bold;
   text-decoration:none;
   letter-spacing:0.5px;">
REGISTER FOR FLEXATHON
</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- CONTACT -->
<tr>
<td class="bg-white" bgcolor="#ffffff" style="padding:30px 35px;background-color:#ffffff;border-top:1px solid #e2e8f0;">

<h3 class="text-dark" style="
margin:0 0 17px 0;
color:#171b20;
font-size:18px;
font-weight:800;">
Contact FLEXATHON
</h3>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td style="padding:6px 0;color:#334155;font-size:13px;font-weight:600;">
Mohammed Raneef
</td>
<td align="right">
<a href="tel:+919497063919"
   style="color:#C5192D;font-size:13px;text-decoration:none;font-weight:700;">
+91 94970 63919
</a>
</td>
</tr>

<tr>
<td style="padding:6px 0;color:#334155;font-size:13px;font-weight:600;">
Sahaf
</td>
<td align="right">
<a href="tel:+919497063919"
   style="color:#C5192D;font-size:13px;text-decoration:none;font-weight:700;">
+91 94970 63919
</a>
</td>
</tr>

<tr>
<td style="padding:6px 0;color:#334155;font-size:13px;font-weight:600;">
Arun
</td>
<td align="right">
<a href="tel:+919605206461"
   style="color:#C5192D;font-size:13px;text-decoration:none;font-weight:700;">
+91 96052 06461
</a>
</td>
</tr>

</table>

<div style="
margin-top:18px;
padding-top:16px;
border-top:1px solid #e2e8f0;
font-size:13px;
line-height:23px;">

<a href="mailto:info@flexathonrun.org"
   style="color:#2563EB;text-decoration:none;font-weight:600;">
info@flexathonrun.org
</a>

<br>

<a href="https://flexathonrun.org/"
   target="_blank"
   style="color:#2563EB;text-decoration:none;font-weight:600;">
www.flexathonrun.org
</a>

</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" class="bg-white"
    bgcolor="#ffffff"
    style="
    padding:20px 25px;
    font-size:11px;
    line-height:17px;
    color:#64748b;
    background-color:#ffffff;
    border-top:1px solid #e2e8f0;">

<strong style="color:#0f172a;">
FLEXATHON 2026 · THE GLOBAL GOALS RUN
</strong>

<br>
Organised by Flexon Sports Foundation

<br><br>

18 October 2026 · ESCI, Gachibowli, Hyderabad

<br><br>

<a href="https://flexathonrun.org/"
   target="_blank"
   style="color:#2563EB;text-decoration:underline;">
Visit Website
</a>

</td>
</tr>

<!-- BOTTOM SDG STRIP -->
<tr>
<td style="background-color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td height="4" bgcolor="#E5243B"></td>
<td bgcolor="#DDA63A"></td>
<td bgcolor="#4C9F38"></td>
<td bgcolor="#C5192D"></td>
<td bgcolor="#26BDE2"></td>
<td bgcolor="#FCC30B"></td>
<td bgcolor="#A21942"></td>
<td bgcolor="#FD6925"></td>
<td bgcolor="#DD1367"></td>
<td bgcolor="#3F7E44"></td>
<td bgcolor="#0A97D9"></td>
<td bgcolor="#56C02B"></td>
<td bgcolor="#00689D"></td>
<td bgcolor="#19486A"></td>
</tr>
</table>
</td>
</tr>

</table>
<!-- END MAIN -->

</td>
</tr>
</table>

</body>
</html>`;

  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(false);
  const [campaignChannel, setCampaignChannel] = useState<"email" | "sms">("email");
  const [composerMode, setComposerMode] = useState<"visual" | "html">("html");
  const [campaignTemplate, setCampaignTemplate] = useState<"announcement" | "promo" | "raceday" | "custom" | "raw_html">("raw_html");
  const [customRawHtml, setCustomRawHtml] = useState<string>(DEFAULT_FLEXATHON_RAW_TEMPLATE);
  const [campaignSubject, setCampaignSubject] = useState<string>("🏃 FLEXATHON 2026 – The Global Goals Run | Hyderabad Edition");
  const [campaignPreheader, setCampaignPreheader] = useState<string>("Join FLEXATHON 2026 – The Global Goals Run. 3K, 5K & 10K on 18 October 2026 at ESCI, Gachibowli.");
  const [campaignHeadline, setCampaignHeadline] = useState<string>("Run for More Than The Finish Line.");
  const [campaignBody, setCampaignBody] = useState<string>(
    "We are thrilled to invite you to FLEXATHON 2026!\n\nWhether you are aiming for your personal best in the 10K, pushing your endurance in the 5K, or having fun with family & friends in the 3K Run, this is your moment to shine on the track.\n\n✨ All registered participants receive an official Dri-FIT event T-Shirt, finisher medal, timing certificate, and refreshments."
  );
  const [campaignCtaText, setCampaignCtaText] = useState<string>("Register for FLEXATHON 2026");
  const [campaignCtaUrl, setCampaignCtaUrl] = useState<string>("https://flexathonrun.org/");
  const [campaignPromoCode, setCampaignPromoCode] = useState<string>("FLEX2026");
  const [campaignPromoDiscount, setCampaignPromoDiscount] = useState<string>("20% OFF");
  
  // Campaign Attachments state
  const [campaignAttachments, setCampaignAttachments] = useState<{ name: string; size: number; type: string; content: string }[]>([]);
  const [attachmentError, setAttachmentError] = useState<string>("");
  
  // Recipient Import state
  const [recipientTab, setRecipientTab] = useState<"excel" | "txt" | "paste" | "runners" | "contacts">("excel");
  const [rawPasteText, setRawPasteText] = useState<string>("");
  const [importedRecipients, setImportedRecipients] = useState<{ email: string; name?: string; phone?: string; source?: string }[]>([]);
  const [importStats, setImportStats] = useState<{ total: number; valid: number; duplicates: number; invalid: number }>({ total: 0, valid: 0, duplicates: 0, invalid: 0 });
  const [recipientSearch, setRecipientSearch] = useState<string>("");
  const [recipientPage, setRecipientPage] = useState<number>(1);
  const [fileParsingLoading, setFileParsingLoading] = useState<boolean>(false);
  const [fileParsingMsg, setFileParsingMsg] = useState<string>("");

  // Saved Contact Book / Audience Directory state
  const [savedContacts, setSavedContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);
  const [contactSearch, setContactSearch] = useState<string>("");
  const [contactTagFilter, setContactTagFilter] = useState<string>("all");
  const [contactTags, setContactTags] = useState<string[]>([]);
  const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
  const [newContactName, setNewContactName] = useState<string>("");
  const [newContactEmail, setNewContactEmail] = useState<string>("");
  const [newContactPhone, setNewContactPhone] = useState<string>("");
  const [newContactTag, setNewContactTag] = useState<string>("General Leads");
  const [showSaveAudienceModal, setShowSaveAudienceModal] = useState<boolean>(false);
  const [saveAudienceTag, setSaveAudienceTag] = useState<string>("Marketing Leads");
  const [savingAudienceLoading, setSavingAudienceLoading] = useState<boolean>(false);
  const [audienceSaveMsg, setAudienceSaveMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Test send & Broadcast states
  const [testEmail, setTestEmail] = useState<string>("");
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);
  const [testSendResult, setTestSendResult] = useState<{ success: boolean; msg: string } | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastProgress, setBroadcastProgress] = useState<{ current: number; total: number; success: number; failed: number }>({ current: 0, total: 0, success: 0, failed: 0 });
  const [broadcastResult, setBroadcastResult] = useState<{ success: boolean; msg: string; delivered?: number; failed?: number } | null>(null);
  const [showConfirmBroadcastModal, setShowConfirmBroadcastModal] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [selectedCampaignDetail, setSelectedCampaignDetail] = useState<any | null>(null);

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return "-";
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const formatDOB = (dobString?: string) => {
    if (!dobString) return "-";
    try {
      const clean = dobString.trim();
      const parts = clean.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) {
          const formatted = d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
          const today = new Date();
          let age = today.getFullYear() - year;
          const m = today.getMonth() - month;
          if (m < 0 || (m === 0 && today.getDate() < day)) {
            age--;
          }
          if (age > 0 && age < 120) {
            return `${formatted} (${age}y)`;
          }
          return formatted;
        }
      }
      return clean;
    } catch {
      return dobString;
    }
  };

  // Check session cookie status & refresh captcha on mount
  useEffect(() => {
    fetchRegistrations();
    refreshCaptcha();
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCoupons();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "coupons") {
      fetchCoupons();
    }
    if (isAuthenticated && activeTab === "advertisement") {
      fetchCampaigns();
      fetchContacts();
    }
  }, [isAuthenticated, activeTab]);

  const refreshCaptcha = async () => {
    try {
      const res = await fetch(`/api/admin/captcha?t=${Date.now()}`);
      if (res.ok) {
        const svgText = await res.text();
        setCaptchaSvg(svgText);
      }
    } catch (err) {
      console.error("Captcha refresh error:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, captcha: captchaCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        fetchRegistrations();
        fetchCoupons();
      } else {
        setLoginError(data.error || "Login failed");
        refreshCaptcha();
        setCaptchaCode("");
      }
    } catch {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setShowPasswordModal(false), 1500);
      } else {
        setPasswordError(data.error || "Failed to change password");
      }
    } catch {
      setPasswordError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsAuthenticated(false);
    setRegistrations([]);
    setCoupons([]);
    setStats(null);
    setUsername("");
    setPassword("");
    setCaptchaCode("");
    refreshCaptcha();
  };

  const fetchRegistrations = async (pageTarget = 1) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: pageTarget.toString(),
        limit: "10",
        search,
        q: search,
        category,
        gender,
        coupon: couponFilter,
        dateFrom,
        dateTo,
      });
      const res = await fetch(`/api/admin/registrations?${query}`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setTotal(data.total ?? (data.registrations ? data.registrations.length : 0));
        setPage(data.page || pageTarget);
        setTotalPages(data.totalPages || 1);
        setStats(data.stats);
        if (data.analytics) {
          setAnalytics(data.analytics);
        }
        setIsAuthenticated(true);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search filter changes
  useEffect(() => {
    if (isAuthenticated) {
      const delayDebounce = setTimeout(() => {
        fetchRegistrations(1);
      }, 300);
      return () => clearTimeout(delayDebounce);
    }
  }, [search, category, gender, couponFilter, dateFrom, dateTo]);

  const handleExportCSV = async () => {
    try {
      const query = new URLSearchParams({
        search,
        q: search,
        category,
        gender,
        coupon: couponFilter,
        dateFrom,
        dateTo,
        export: "true",
      });
      const res = await fetch(`/api/admin/registrations?${query}`);
      if (!res.ok) {
        alert("Failed to export data");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `registrations_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Error exporting CSV data");
    }
  };

  const handleReconcilePayments = async () => {
    setIsReconciling(true);
    setReconcileResult(null);
    try {
      const res = await fetch("/api/admin/reconcile-payments", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.recoveredCount > 0) {
          setReconcileResult(`✅ Successfully recovered & synced ${data.recoveredCount} missing paid registration(s)!`);
          fetchRegistrations(1);
        } else {
          setReconcileResult(`✅ All ${data.totalPaymentsChecked} recent Razorpay payments are in sync.`);
        }
      } else {
        setReconcileResult(`⚠️ Reconciliation notice: ${data.error || "Could not complete auto-sync"}`);
      }
    } catch (err: any) {
      setReconcileResult(`⚠️ Network error during payment sync: ${err.message}`);
    } finally {
      setIsReconciling(false);
      setTimeout(() => setReconcileResult(null), 8000);
    }
  };

  const handleUpdateRunnerTshirtSize = async (id: number, newSize: string) => {
    setUpdatingSizeId(id);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, tshirt_size: newSize })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(prev => prev.map(r => r.id === id ? { ...r, tshirt_size: newSize } : r));
        if (selectedRunner && selectedRunner.id === id) {
          setSelectedRunner((prev: any) => ({ ...prev, tshirt_size: newSize }));
        }
        setUpdateMessage(`✅ T-Shirt size for participant #${id} updated to ${newSize}`);
        setTimeout(() => setUpdateMessage(null), 4000);
      } else {
        alert(`Failed to update T-Shirt size: ${data.error || "Server error"}`);
      }
    } catch (err: any) {
      alert(`Error updating T-Shirt size: ${err.message}`);
    } finally {
      setUpdatingSizeId(null);
    }
  };

  const handleUpdateRunnerField = async (id: number, field: string, value: string) => {
    setUpdatingSizeId(id);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, [field]: value })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
        if (selectedRunner && selectedRunner.id === id) {
          setSelectedRunner((prev: any) => ({ ...prev, [field]: value }));
        }
        setUpdateMessage(`✅ ${field.replace('_', ' ').toUpperCase()} updated to ${value}`);
        setTimeout(() => setUpdateMessage(null), 4000);
      } else {
        alert(`Failed to update ${field}: ${data.error || "Server error"}`);
      }
    } catch (err: any) {
      alert(`Error updating ${field}: ${err.message}`);
    } finally {
      setUpdatingSizeId(null);
    }
  };

  // Logger & User Journey API Action (Powered by Python Backend)
  const fetchLoggerData = async () => {
    setLoadingLogger(true);
    try {
      const res = await fetch("/api/admin/logger");
      if (res.ok) {
        const data = await res.json();
        setLoggerData(data);
      }
    } catch (err) {
      console.error("Error fetching logger intelligence data:", err);
    } finally {
      setLoadingLogger(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && (activeTab === "logger" || activeTab === "analytics")) {
      fetchLoggerData();
    }
  }, [isAuthenticated, activeTab]);

  // Coupon API Actions
  const fetchCoupons = async () => {
    // Only show loading spinner on initial load when no coupons are loaded yet
    if (coupons.length === 0) {
      setLoadingCoupons(true);
    }
    try {
      const res = await fetch(`/api/admin/coupons?_t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.coupons)) {
          setCoupons(data.coupons);
        }
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoadingCoupons(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = newCouponCode.trim().toUpperCase();
    if (!code || code.length < 2) {
      setCouponError("Coupon code must be at least 2 characters");
      return;
    }

    const val = Number(newDiscountValue);
    if (isNaN(val) || val <= 0) {
      setCouponError("Discount value must be a positive number");
      return;
    }

    if (newDiscountType === "percentage" && val > 100) {
      setCouponError("Percentage discount cannot exceed 100%");
      return;
    }

    setIsCreatingCoupon(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          discountType: newDiscountType,
          discountValue: val,
          description: newDescription.trim(),
          maxUses: newMaxUses && !isNaN(Number(newMaxUses)) ? Number(newMaxUses) : null,
          expiryDate: newExpiryDate || null,
          isActive: true
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCouponSuccess("Coupon created successfully!");
        const created = data.coupon;
        const newId = created?.id;
        if (newId) {
          setRecentlyCreatedCouponId(newId);
          setTimeout(() => setRecentlyCreatedCouponId(null), 6000);
        }

        if (Array.isArray(data.coupons)) {
          setCoupons(data.coupons);
        } else if (created) {
          setCoupons(prev => [created, ...prev.filter(c => c.id !== newId)]);
        }

        setNewCouponCode("");
        setNewDescription("");
        setNewDiscountValue(10);
        setNewMaxUses("");
        setNewExpiryDate("");
        // Immediately close modal and switch to coupons tab so user sees the new coupon instantly
        setShowAddCouponModal(false);
        setActiveTab("coupons");
        fetchCoupons();
      } else {
        setCouponError(data.error || "Failed to create coupon");
      }
    } catch {
      setCouponError("Network error. Please try again.");
    } finally {
      setIsCreatingCoupon(false);
    }
  };

  const handleToggleCoupon = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus })
      });
      if (res.ok) {
        setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
        fetchCoupons();
      } else {
        alert("Failed to toggle coupon status");
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  // ==========================================
  // ADVERTISEMENT & BROADCAST CAMPAIGN HANDLERS
  // ==========================================
  const fetchCampaigns = async () => {
    setLoadingCampaigns(true);
    try {
      const res = await fetch("/api/admin/campaigns");
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const handleTemplateSelect = (tmpl: "announcement" | "promo" | "raceday" | "custom" | "raw_html") => {
    setCampaignTemplate(tmpl);
    if (tmpl === "raw_html") {
      setComposerMode("html");
      if (!customRawHtml) {
        setCustomRawHtml(DEFAULT_FLEXATHON_RAW_TEMPLATE);
        setCampaignSubject("🏃 FLEXATHON 2026 – The Global Goals Run | Hyderabad Edition");
      }
      return;
    }

    setComposerMode("visual");
    if (tmpl === "announcement") {
      setCampaignSubject("🏃 Get Ready for FLEXATHON 2026 — Official Runner Announcement");
      setCampaignPreheader("Registration is open! Choose your challenge: 10K, 5K, or 3K Fun Run.");
      setCampaignHeadline("Join The Ultimate Marathon Experience: FLEXATHON 2026!");
      setCampaignBody(
        "We are thrilled to welcome you to the grand edition of FLEXATHON 2026.\n\nWhether you are an experienced runner striving for a new personal record or joining with family for fitness and fun, there is a race category tailored for everyone.\n\n✨ All registered runners receive an official Dri-FIT event T-Shirt, finisher medal, timing certificate, and race-day refreshments.\n\nRegister today to lock in your official runner slot!"
      );
      setCampaignCtaText("Register for FLEXATHON 2026");
      setCampaignCtaUrl("https://flexathonrun.org/registeration");
    } else if (tmpl === "promo") {
      setCampaignSubject("🎟️ Special Promo: Claim Your Discount on FLEXATHON 2026 Registration!");
      setCampaignPreheader("Use the exclusive promo code inside to save on your runner pass today.");
      setCampaignHeadline("Limited Time Discount: Save On Your Registration!");
      setCampaignBody(
        "Get ready to run and save! We are excited to offer you a special promotional discount on FLEXATHON 2026 registrations.\n\nEnter the promo code below at checkout to claim your savings instantly.\n\nSlots are filling up fast — make sure to register before the offer expires!"
      );
      setCampaignPromoCode("FLEX2026");
      setCampaignPromoDiscount("20% OFF");
      setCampaignCtaText("Claim Discount & Register Now");
      setCampaignCtaUrl("https://flexathonrun.org/registeration");
    } else if (tmpl === "raceday") {
      setCampaignSubject("📍 Important Race Day Guide & Schedule — FLEXATHON 2026");
      setCampaignPreheader("Everything you need to know about bib collection, race schedule, and venue details.");
      setCampaignHeadline("FLEXATHON 2026 Race Day Guide & Runner Instructions");
      setCampaignBody(
        "The countdown is on! Here is your essential guide for FLEXATHON 2026 race day.\n\n📋 Bib & Kit Collection: Available at the expo desk prior to flag-off.\n⏰ Flag-Off Schedule: 10K Run at 05:30 AM | 5K Run at 06:15 AM | 3K Fun Run at 06:45 AM.\n🚗 Parking & Entry: Follow the designated parking signage near the main arena.\n\nPlease arrive at least 30 minutes before your race category flag-off."
      );
      setCampaignCtaText("View Full Race Day Schedule");
      setCampaignCtaUrl("https://flexathonrun.org/the-run");
    } else if (tmpl === "custom") {
      setCampaignSubject("📢 Update from FLEXATHON 2026");
      setCampaignPreheader("Important announcement for all participants.");
      setCampaignHeadline("Official Event Update");
      setCampaignBody(
        "Dear Participant,\n\nWe are sharing an important update regarding FLEXATHON 2026.\n\nThank you for being a part of our fitness movement."
      );
      setCampaignCtaText("Visit Official Website");
      setCampaignCtaUrl("https://flexathonrun.org");
    }
  };

  const handleConvertVisualToRawHtml = () => {
    const generated = buildVisualTemplateHtml();
    setCustomRawHtml(generated);
    setComposerMode("html");
    setCampaignTemplate("raw_html");
  };

  const buildVisualTemplateHtml = () => {
    const logoUrl = "https://flexathonrun.org/logo/logo.png";
    const paragraphs = (campaignBody || "").split("\n\n").filter(p => p.trim()).map(p => `<p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">${p.replace(/\n/g, "<br/>")}</p>`).join("");

    let promoBox = "";
    if (campaignTemplate === "promo" && campaignPromoCode) {
      promoBox = `
        <div style="background: linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 100%); border: 2px dashed #DC2626; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <div style="font-size: 12px; font-weight: 800; color: #991B1B; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;">Special Promotional Offer</div>
          <div style="font-size: 28px; font-weight: 900; color: #DC2626; letter-spacing: 2px; margin-bottom: 6px;">${campaignPromoCode}</div>
          <div style="font-size: 14px; font-weight: 700; color: #B45309;">Enjoy ${campaignPromoDiscount || "Special Discount"} on checkout</div>
        </div>
      `;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${campaignSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; -webkit-font-smoothing: antialiased;">
  <!-- Hidden Preheader Text -->
  <div style="display: none; font-size: 1px; color: #F8FAFC; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${campaignPreheader || campaignSubject}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
          
          <!-- Header Logo -->
          <tr>
            <td align="center" style="padding: 28px 24px 20px; background-color: #FFFFFF; border-bottom: 1px solid #F1F5F9;">
              <img src="${logoUrl}" alt="FLEXATHON 2026" width="170" style="display: block; max-width: 170px; height: auto; border: 0;" />
            </td>
          </tr>

          <!-- Hero Graphic / Accent Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); padding: 30px 24px; text-align: center; color: #FFFFFF;">
              <span style="display: inline-block; padding: 4px 14px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">Official Broadcast</span>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.3; color: #FFFFFF;">${campaignHeadline}</h1>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 32px 28px;">
              ${paragraphs}
              ${promoBox}
              
              <!-- CTA Button -->
              ${campaignCtaText && campaignCtaUrl ? `
                <div style="text-align: center; margin: 32px 0 20px;">
                  <a href="${campaignCtaUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #DC2626 0%, #B91C1C 100%); color: #FFFFFF; font-size: 16px; font-weight: 800; text-decoration: none; padding: 14px 32px; border-radius: 30px; box-shadow: 0 4px 14px rgba(220,38,38,0.35); letter-spacing: 0.5px;">
                    ${campaignCtaText} →
                  </a>
                </div>
              ` : ""}

              <!-- Event Details Pill Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 28px; background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; padding: 16px;">
                <tr>
                  <td style="padding: 6px 12px; font-size: 13px; color: #64748B;">
                    <strong>Event:</strong> FLEXATHON 2026 Marathon
                  </td>
                  <td style="padding: 6px 12px; font-size: 13px; color: #64748B;">
                    <strong>Categories:</strong> 10K • 5K • 3K Run
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 12px; font-size: 13px; color: #64748B;">
                    <strong>Official Portal:</strong> <a href="https://flexathonrun.org" style="color: #DC2626; text-decoration: none; font-weight: 600;">flexathonrun.org</a>
                  </td>
                  <td style="padding: 6px 12px; font-size: 13px; color: #64748B;">
                    <strong>Support:</strong> info@flexathonrun.org
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 28px; background-color: #0F172A; color: #94A3B8; text-align: center; font-size: 12px; line-height: 1.6;">
              <div style="font-weight: 700; color: #FFFFFF; font-size: 13px; margin-bottom: 6px;">FLEXATHON 2026 Organizing Committee</div>
              <div>Empowering fitness, unity, and education through sports.</div>
              <div style="margin-top: 12px; color: #64748B; font-size: 11px;">
                You received this email because you registered or subscribed to FLEXATHON event updates.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  const cleanHtmlFences = (html: string): string => {
    if (!html) return html;
    let cleaned = html.trim();
    // Automatically strip markdown code fences: ```html, ```xml, ```htm, or ```
    cleaned = cleaned.replace(/^```(?:html?|xml)?\s*\n?/i, "");
    cleaned = cleaned.replace(/\n?```\s*$/i, "");
    return cleaned.trim();
  };

  const handleCustomHtmlChange = (val: string) => {
    const cleaned = cleanHtmlFences(val);
    setCustomRawHtml(cleaned);
  };

  const resolveHtmlWithLogo = (html: string): string => {
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
  };

  const handleInsertLogoTag = () => {
    setCustomRawHtml(prev => (prev ? prev + "\n{{LOGO}}\n" : "{{LOGO}}\n"));
  };

  const handleInsertLogoUrl = () => {
    setCustomRawHtml(prev => (prev ? prev + "https://flexathonrun.org/logo/logo.png" : "https://flexathonrun.org/logo/logo.png"));
  };

  const buildEmailHtml = () => {
    if (composerMode === "html" || campaignTemplate === "raw_html") {
      const raw = customRawHtml || `<div style="font-family: Arial, sans-serif; padding: 40px 20px; text-align: center; color: #64748B; background: #F8FAFC;">
        <h3 style="color: #1E293B; margin-bottom: 8px;">No Custom HTML Entered Yet</h3>
        <p style="margin: 0; font-size: 14px;">Paste or type your HTML code into the editor to preview your email.</p>
      </div>`;
      return resolveHtmlWithLogo(raw);
    }
    return buildVisualTemplateHtml();
  };

  const handleAttachmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setAttachmentError("");
    const maxFileSize = 5 * 1024 * 1024; // 5 MB per file
    const maxTotalSize = 10 * 1024 * 1024; // 10 MB total
    
    let currentTotalSize = campaignAttachments.reduce((sum, a) => sum + a.size, 0);
    const newAttachments: { name: string; size: number; type: string; content: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        setAttachmentError(`"${file.name}" is larger than 5 MB. Please choose files smaller than 5 MB.`);
        continue;
      }
      if (currentTotalSize + file.size > maxTotalSize) {
        setAttachmentError("Total attachment size exceeds the 10 MB limit for email delivery.");
        break;
      }

      if (campaignAttachments.some(a => a.name === file.name && a.size === file.size)) {
        continue;
      }

      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const res = reader.result as string;
            const content = res.includes(",") ? res.split(",")[1] : res;
            resolve(content);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newAttachments.push({
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          content: base64
        });
        currentTotalSize += file.size;
      } catch (err) {
        console.error("Error reading file attachment:", err);
      }
    }

    if (newAttachments.length > 0) {
      setCampaignAttachments(prev => [...prev, ...newAttachments]);
    }
    e.target.value = "";
  };

  const handleRemoveAttachment = (index: number) => {
    setCampaignAttachments(prev => prev.filter((_, i) => i !== index));
    setAttachmentError("");
  };

  const handleClearAttachments = () => {
    setCampaignAttachments([]);
    setAttachmentError("");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Recipient Processing & Deduplication
  const processAndSetRecipients = (rawItems: { email: string; name?: string; phone?: string; source?: string }[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const seen = new Set<string>();
    const validList: { email: string; name?: string; phone?: string; source?: string }[] = [];
    let duplicates = 0;
    let invalid = 0;

    for (const item of rawItems) {
      const cleanEmail = (item.email || "").trim().toLowerCase();
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        invalid++;
        continue;
      }
      if (seen.has(cleanEmail)) {
        duplicates++;
        continue;
      }
      seen.add(cleanEmail);
      validList.push({
        email: cleanEmail,
        name: item.name?.trim() || undefined,
        phone: item.phone?.trim() || undefined,
        source: item.source || "Manual"
      });
    }

    setImportedRecipients(validList);
    setImportStats({
      total: rawItems.length,
      valid: validList.length,
      duplicates,
      invalid
    });
    setRecipientPage(1);
  };

  // 1. Handle Excel / CSV file
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileParsingLoading(true);
    setFileParsingMsg(`Parsing ${file.name}...`);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const extracted: { email: string; name?: string; phone?: string; source: string }[] = [];
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const jsonRows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        for (const row of jsonRows) {
          if (Array.isArray(row)) {
            for (let colIdx = 0; colIdx < row.length; colIdx++) {
              const cellVal = String(row[colIdx] || "");
              const matches = cellVal.match(emailRegex);
              if (matches) {
                for (const match of matches) {
                  const possibleName = typeof row[0] === "string" && !row[0].includes("@") ? row[0] : undefined;
                  extracted.push({
                    email: match,
                    name: possibleName,
                    source: `Excel (${file.name})`
                  });
                }
              }
            }
          }
        }
      }

      processAndSetRecipients(extracted);
      setFileParsingMsg(`Extracted ${extracted.length} raw emails from ${file.name}`);
    } catch (err: any) {
      console.error("Excel parse error:", err);
      setFileParsingMsg(`Failed to parse Excel file: ${err?.message || "Invalid format"}`);
    } finally {
      setFileParsingLoading(false);
      e.target.value = "";
    }
  };

  // 2. Handle Notepad / TXT file
  const handleTxtUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileParsingLoading(true);
    setFileParsingMsg(`Reading ${file.name}...`);

    try {
      const text = await file.text();
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const matches = text.match(emailRegex) || [];
      const extracted = matches.map(email => ({
        email,
        source: `Notepad (${file.name})`
      }));

      processAndSetRecipients(extracted);
      setFileParsingMsg(`Found ${matches.length} emails in ${file.name}`);
    } catch (err: any) {
      setFileParsingMsg(`Error reading text file: ${err?.message}`);
    } finally {
      setFileParsingLoading(false);
      e.target.value = "";
    }
  };

  // 3. Handle Direct Paste
  const handlePasteChange = (text: string) => {
    setRawPasteText(text);
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex) || [];
    if (matches.length > 0) {
      const extracted = matches.map(email => ({
        email,
        source: "Direct Paste"
      }));
      processAndSetRecipients(extracted);
      setFileParsingMsg(`Extracted ${matches.length} email(s) from pasted text.`);
    }
  };

  const handlePasteProcess = () => {
    handlePasteChange(rawPasteText);
  };

  // 4. Handle Load Registered Runners
  const handleLoadRegisteredRunners = async () => {
    setFileParsingLoading(true);
    setFileParsingMsg("Fetching all registered runner emails from database...");
    try {
      const res = await fetch("/api/admin/registrations?limit=10000");
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.registrations)) {
        const extracted = data.registrations
          .filter((r: any) => r.email)
          .map((r: any) => ({
            email: r.email,
            name: r.name,
            phone: r.whatsapp || r.contact,
            source: "Registered Runner"
          }));
        processAndSetRecipients(extracted);
        setFileParsingMsg(`Loaded ${extracted.length} registered runners into campaign list.`);
      } else {
        setFileParsingMsg("Failed to load registrations.");
      }
    } catch (err: any) {
      setFileParsingMsg(`Error fetching registrations: ${err?.message}`);
    } finally {
      setFileParsingLoading(false);
    }
  };

  const handleDeleteRecipient = (emailToDelete: string) => {
    const updated = importedRecipients.filter(r => r.email !== emailToDelete);
    setImportedRecipients(updated);
    setImportStats(prev => ({ ...prev, valid: updated.length }));
  };

  const handleClearRecipients = () => {
    setImportedRecipients([]);
    setImportStats({ total: 0, valid: 0, duplicates: 0, invalid: 0 });
    setRawPasteText("");
    setFileParsingMsg("");
  };

  // Test Email Send
  const handleSendTestEmail = async () => {
    if (!testEmail || !testEmail.includes("@")) {
      setTestSendResult({ success: false, msg: "Please enter a valid test email address." });
      return;
    }

    setIsSendingTest(true);
    setTestSendResult(null);

    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "email",
          subject: `[TEST] ${campaignSubject}`,
          htmlContent: buildEmailHtml(),
          textContent: campaignBody,
          recipients: [{ email: testEmail.trim(), name: "Test Admin" }],
          templateName: campaignTemplate,
          isTest: true,
          attachments: campaignAttachments.map(a => ({ name: a.name, content: a.content }))
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestSendResult({ success: true, msg: `Test email successfully dispatched to ${testEmail} via Brevo!` });
      } else {
        setTestSendResult({ success: false, msg: data.error || (data.errors && data.errors[0]) || "Failed to send test email" });
      }
    } catch (err: any) {
      setTestSendResult({ success: false, msg: err?.message || "Network error while sending test email." });
    } finally {
      setIsSendingTest(false);
    }
  };

  // Broadcast to All Recipients
  const handleLaunchBroadcast = async () => {
    if (importedRecipients.length === 0) {
      alert("Please import or paste at least one valid recipient email address first.");
      return;
    }

    setShowConfirmBroadcastModal(false);
    setIsBroadcasting(true);
    setBroadcastResult(null);
    setBroadcastProgress({ current: 0, total: importedRecipients.length, success: 0, failed: 0 });

    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: campaignChannel,
          subject: campaignSubject,
          htmlContent: buildEmailHtml(),
          textContent: campaignBody,
          recipients: importedRecipients,
          templateName: campaignTemplate,
          isTest: false,
          attachments: campaignAttachments.map(a => ({ name: a.name, content: a.content }))
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBroadcastResult({
          success: true,
          msg: `Broadcast completed! Successfully delivered to ${data.delivered} recipients. (${data.failed} failed)`,
          delivered: data.delivered,
          failed: data.failed
        });
        fetchCampaigns();
      } else {
        setBroadcastResult({
          success: false,
          msg: data.error || "Failed to execute broadcast. Check Brevo API quota and logs.",
          delivered: data.delivered || 0,
          failed: data.failed || importedRecipients.length
        });
      }
    } catch (err: any) {
      setBroadcastResult({
        success: false,
        msg: err?.message || "Network exception during broadcast execution."
      });
    } finally {
      setIsBroadcasting(false);
    }
  };

  // ==========================================
  // SAVED CONTACT BOOK / AUDIENCE DIRECTORY HANDLERS
  // ==========================================
  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setSavedContacts(data.contacts || []);
        setContactTags(data.tags || []);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSaveImportedToContacts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (importedRecipients.length === 0) return;
    setSavingAudienceLoading(true);
    setAudienceSaveMsg(null);

    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contacts: importedRecipients.map(r => ({
            email: r.email,
            name: r.name,
            phone: r.phone,
            tag: saveAudienceTag.trim() || "Marketing Leads",
            source: r.source || "Bulk Import"
          }))
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAudienceSaveMsg({ success: true, text: `Successfully saved ${data.added} new contacts (${data.updated} updated) under "${saveAudienceTag}"!` });
        fetchContacts();
        setTimeout(() => {
          setShowSaveAudienceModal(false);
          setAudienceSaveMsg(null);
        }, 1500);
      } else {
        setAudienceSaveMsg({ success: false, text: data.error || "Failed to save contacts." });
      }
    } catch (err: any) {
      setAudienceSaveMsg({ success: false, text: err?.message || "Network error while saving contacts." });
    } finally {
      setSavingAudienceLoading(false);
    }
  };

  const handleAddSingleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactEmail.trim()) return;

    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            email: newContactEmail.trim(),
            name: newContactName.trim() || undefined,
            phone: newContactPhone.trim() || undefined,
            tag: newContactTag.trim() || "General Leads",
            source: "Manual Entry"
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewContactName("");
        setNewContactEmail("");
        setNewContactPhone("");
        setNewContactTag("General Leads");
        setShowAddContactModal(false);
        fetchContacts();
      } else {
        alert(data.error || "Failed to add contact");
      }
    } catch (err: any) {
      alert(err?.message || "Network error");
    }
  };

  const handleDeleteSavedContact = async (id: string) => {
    if (!confirm("Are you sure you want to remove this contact from your saved library?")) return;
    try {
      const res = await fetch(`/api/admin/contacts?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        fetchContacts();
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleLoadFromSavedContacts = (tagToLoad?: string) => {
    let contactsToLoad = savedContacts;
    if (tagToLoad && tagToLoad !== "all") {
      contactsToLoad = savedContacts.filter(c => (c.tag || "").toLowerCase() === tagToLoad.toLowerCase());
    }

    const items = contactsToLoad.map(c => ({
      email: c.email,
      name: c.name,
      phone: c.phone,
      source: `Contact Book (${c.tag || "Saved"})`
    }));

    processAndSetRecipients(items);
    setFileParsingMsg(`Loaded ${items.length} contacts from Contact Book${tagToLoad && tagToLoad !== "all" ? ` [${tagToLoad}]` : ""}.`);
  };

  const handleExportContactsCsv = () => {
    if (savedContacts.length === 0) {
      alert("No contacts in directory to export.");
      return;
    }
    const headers = ["Name", "Email", "Phone", "Tag/Group", "Source", "Date Added"];
    const rows = savedContacts.map(c => [
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      `"${(c.tag || "").replace(/"/g, '""')}"`,
      `"${(c.source || "").replace(/"/g, '""')}"`,
      `"${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `flexathon_audience_contacts_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate estimated total revenue
  const totalRevenue = (registrations || []).reduce((acc, r) => {
    const val = Number(r.payment?.amount || r.amount || 0);
    return acc + val;
  }, 0);

  // RENDER LOGIN SCREEN (Clean Modern Card)
  if (!isAuthenticated) {
    return (
      <div 
        style={{ 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          backgroundColor: "#F8FAFC",
          backgroundImage: "radial-gradient(circle at 50% 0%, #EFF6FF 0%, #F8FAFC 80%)",
          padding: "20px 16px",
          boxSizing: "border-box",
          maxWidth: "100vw",
          overflowX: "hidden"
        }}
      >
        <div 
          style={{ 
            width: "100%", 
            maxWidth: "400px", 
            backgroundColor: "#FFFFFF", 
            border: "1px solid #E2E8F0", 
            borderRadius: "20px", 
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.07)",
            boxSizing: "border-box"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <img 
              src="/logo/logo.png" 
              alt="Flexathon Logo" 
              style={{ height: "42px", width: "auto", objectFit: "contain", maxHeight: "46px" }} 
              onError={(e: any) => { e.currentTarget.src = "/logo.png"; }}
            />
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>Admin Portal</h2>
          <p style={{ fontSize: "14px", color: "#64748B", marginBottom: "28px" }}>Sign in to access registration logs and analytics</p>

          {loginError && (
            <div 
              style={{ 
                backgroundColor: "#FEF2F2", 
                border: "1px solid #FCA5A5", 
                borderRadius: "10px", 
                color: "#B91C1C", 
                padding: "12px", 
                fontSize: "13px", 
                marginBottom: "20px", 
                textAlign: "left" 
              }}
            >
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px", textAlign: "left" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Username</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ 
                  width: "100%", padding: "12px 14px", backgroundColor: "#F8FAFC", 
                  border: "1px solid #CBD5E1", borderRadius: "10px", color: "#0F172A", 
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
                placeholder="Enter admin username"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: "100%", padding: "12px 14px", backgroundColor: "#F8FAFC", 
                  border: "1px solid #CBD5E1", borderRadius: "10px", color: "#0F172A", 
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
                placeholder="Enter password"
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Verification Code (CAPTCHA)</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input 
                  type="text" 
                  required 
                  maxLength={5}
                  value={captchaCode}
                  onChange={(e) => setCaptchaCode(e.target.value)}
                  style={{ 
                    flex: 1, padding: "12px 14px", backgroundColor: "#F8FAFC", 
                    border: "1px solid #CBD5E1", borderRadius: "10px", color: "#0F172A", 
                    fontSize: "14px", outline: "none", textTransform: "uppercase", boxSizing: "border-box"
                  }}
                  placeholder="Code"
                />
                <div 
                  onClick={refreshCaptcha} 
                  title="Click to refresh CAPTCHA" 
                  style={{ 
                    cursor: "pointer", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    height: "44px", 
                    backgroundColor: "#F1F5F9", 
                    border: "1px solid #CBD5E1", 
                    borderRadius: "10px", 
                    padding: "0 10px",
                    userSelect: "none"
                  }}
                >
                  {captchaSvg ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: captchaSvg }} 
                      style={{ display: "flex", alignItems: "center", height: "100%" }} 
                    />
                  ) : (
                    <span style={{ fontSize: "12px", color: "#64748B", padding: "0 10px" }}>Loading...</span>
                  )}
                  <span style={{ color: "#2563EB", fontSize: "16px" }} title="Refresh CAPTCHA">↻</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              style={{ 
                width: "100%", padding: "13px", backgroundColor: "#2563EB", 
                color: "#FFFFFF", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 700, 
                cursor: "pointer", transition: "all 0.2s", marginTop: "8px", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER SHOPEERS-STYLE MODERN ADMIN DASHBOARD
  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        display: "flex",
      }}
      className="admin-page-container"
    >
      {/* MOBILE OVERLAY BACKDROP */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.4)", zIndex: 90,
            backdropFilter: "blur(4px)"
          }}
        />
      )}

      {/* LEFT NAVIGATION SIDEBAR (Shopeers Clean Light Style) */}
      <aside 
        style={{ 
          width: "250px", 
          minWidth: "250px",
          backgroundColor: "#FFFFFF", 
          borderRight: "1px solid #E2E8F0", 
          display: "flex", 
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
          zIndex: 100,
          boxShadow: "1px 0 3px rgba(0,0,0,0.02)"
        }}
        className={`admin-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
      >
        {/* Brand Logo Header */}
        <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img 
              src="/logo/logo.png" 
              alt="Flexathon Logo" 
              style={{ height: "36px", width: "auto", objectFit: "contain", maxHeight: "40px" }} 
              onError={(e: any) => { e.currentTarget.src = "/logo.png"; }}
            />
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="admin-mobile-toggle"
            style={{ display: "none", background: "none", border: "none", color: "#64748B", fontSize: "18px", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
          
          {/* 1. Dashboard / Home */}
          <button
            onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "home" ? "#EFF6FF" : "transparent",
              color: activeTab === "home" ? "#2563EB" : "#475569",
              fontSize: "14px",
              fontWeight: activeTab === "home" ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              if (activeTab !== "home") e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseOut={(e) => {
              if (activeTab !== "home") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={{ fontSize: "16px", color: activeTab === "home" ? "#2563EB" : "#64748B" }}>⊞</span>
            <span style={{ flex: 1 }}>Dashboard</span>
            {stats && (
              <span style={{ 
                fontSize: "11px", 
                backgroundColor: activeTab === "home" ? "#DBEAFE" : "#F1F5F9", 
                color: activeTab === "home" ? "#1D4ED8" : "#64748B", 
                padding: "2px 8px", 
                borderRadius: "12px", 
                fontWeight: 700 
              }}>
                {stats.totalRegistrations || 0}
              </span>
            )}
          </button>

          {/* 2. Analytics */}
          <button
            onClick={() => { setActiveTab("analytics"); setMobileMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "analytics" ? "#EFF6FF" : "transparent",
              color: activeTab === "analytics" ? "#2563EB" : "#475569",
              fontSize: "14px",
              fontWeight: activeTab === "analytics" ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              if (activeTab !== "analytics") e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseOut={(e) => {
              if (activeTab !== "analytics") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={{ fontSize: "16px", color: activeTab === "analytics" ? "#2563EB" : "#64748B" }}>📊</span>
            <span style={{ flex: 1 }}>Analytics</span>
          </button>

          {/* 3. User Activity & Reaction Logger (Python Powered) */}
          <button
            onClick={() => { setActiveTab("logger"); setMobileMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "logger" ? "#EFF6FF" : "transparent",
              color: activeTab === "logger" ? "#2563EB" : "#475569",
              fontSize: "14px",
              fontWeight: activeTab === "logger" ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              if (activeTab !== "logger") e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseOut={(e) => {
              if (activeTab !== "logger") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={{ fontSize: "16px", color: activeTab === "logger" ? "#2563EB" : "#64748B" }}>📜</span>
            <span style={{ flex: 1 }}>Activity Logger</span>
            {loggerData?.summary?.totalLogs > 0 && (
              <span style={{ fontSize: "11px", backgroundColor: "#FEF3C7", color: "#B45309", padding: "2px 8px", borderRadius: "12px", fontWeight: 700 }}>
                {loggerData.summary.totalLogs}
              </span>
            )}
          </button>

          {/* 4. Coupons */}
          <button
            onClick={() => { setActiveTab("coupons"); setMobileMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "coupons" ? "#EFF6FF" : "transparent",
              color: activeTab === "coupons" ? "#2563EB" : "#475569",
              fontSize: "14px",
              fontWeight: activeTab === "coupons" ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              if (activeTab !== "coupons") e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseOut={(e) => {
              if (activeTab !== "coupons") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={{ fontSize: "16px", color: activeTab === "coupons" ? "#2563EB" : "#64748B" }}>🎟️</span>
            <span style={{ flex: 1 }}>Coupons</span>
            {coupons.length > 0 && (
              <span style={{ fontSize: "11px", backgroundColor: "#DCFCE7", color: "#166534", padding: "2px 8px", borderRadius: "12px", fontWeight: 700 }}>
                {coupons.length}
              </span>
            )}
          </button>

          {/* 4. Advertisement & Broadcast Campaigns */}
          <button
            onClick={() => { setActiveTab("advertisement"); setMobileMenuOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "advertisement" ? "#EFF6FF" : "transparent",
              color: activeTab === "advertisement" ? "#2563EB" : "#475569",
              fontSize: "14px",
              fontWeight: activeTab === "advertisement" ? 700 : 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              if (activeTab !== "advertisement") e.currentTarget.style.backgroundColor = "#F1F5F9";
            }}
            onMouseOut={(e) => {
              if (activeTab !== "advertisement") e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span style={{ fontSize: "16px", color: activeTab === "advertisement" ? "#2563EB" : "#64748B" }}>📢</span>
            <span style={{ flex: 1 }}>Campaigns</span>
            <span style={{ fontSize: "10px", backgroundColor: "#FEF3C7", color: "#92400E", padding: "2px 6px", borderRadius: "10px", fontWeight: 800 }}>
              BREVO
            </span>
          </button>

          <div style={{ height: "1px", backgroundColor: "#F1F5F9", margin: "10px 0" }} />

          {/* Settings button */}
          <button
            onClick={() => {
              setPasswordError("");
              setPasswordSuccess("");
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setShowPasswordModal(true);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "transparent",
              color: "#475569",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "left"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#F1F5F9"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            <span style={{ fontSize: "16px", color: "#64748B" }}>⚙️</span>
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Promo / System Info Card */}
        <div style={{ 
          padding: "16px", 
          margin: "0 12px 14px", 
          backgroundColor: "#FFFFFF", 
          border: "1.5px solid #2563EB", 
          borderRadius: "14px", 
          color: "#0F172A",
          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.08)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <img 
              src="/logo/logo.png" 
              alt="Flexathon Logo" 
              style={{ height: "24px", width: "auto", objectFit: "contain", maxHeight: "28px" }} 
              onError={(e: any) => { e.currentTarget.src = "/logo.png"; }}
            />
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A", letterSpacing: "0.3px" }}>FLEXATHON 2026</span>
          </div>
          <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 12px 0", lineHeight: 1.4, fontWeight: 600 }}>
            Registration Live
          </p>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "8px 10px",
              backgroundColor: "#0F172A",
              border: "1px solid #0F172A",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.15s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#1E293B";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#0F172A";
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <div 
        style={{ 
          flex: 1, 
          minWidth: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        className="admin-main-content"
      >
        {/* TOP NAVBAR (Shopeers Style with Search & Action Controls) */}
        <header 
          style={{ 
            height: "70px", 
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E2E8F0", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 40,
            gap: "12px"
          }}
          className="admin-header"
        >
          {/* Left: Mobile Toggle + Flexible Search bar */}
          <div className="admin-search-wrapper" style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, maxWidth: "500px", minWidth: 0 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="admin-mobile-toggle"
              title="Toggle Menu"
              style={{
                display: "none",
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                color: "#334155",
                padding: "8px 10px",
                fontSize: "15px",
                cursor: "pointer",
                flexShrink: 0
              }}
            >
              ☰
            </button>
            <div style={{ position: "relative", width: "100%", minWidth: 0 }}>
              <input 
                type="text" 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search anything (Name, Email, WhatsApp, DOB)..."
                style={{ 
                  width: "100%", padding: "9px 36px 9px 14px", backgroundColor: "#F8FAFC", 
                  border: "1px solid #E2E8F0", borderRadius: "10px", color: "#0F172A", 
                  fontSize: "13px", outline: "none", boxSizing: "border-box"
                }}
              />
              <span className="admin-desktop-only" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "11px", color: "#94A3B8", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "4px", padding: "1px 5px" }}>⌘K</span>
            </div>
          </div>

          {/* Right actions */}
          <div className="admin-actions-wrapper" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div className="admin-desktop-only" style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "7px 12px", fontSize: "13px", color: "#475569", fontWeight: 500 }}>
              <span>📅</span>
              <span>2026 Event</span>
              <span style={{ color: "#94A3B8", fontSize: "10px" }}>▼</span>
            </div>

            <button
              onClick={() => {
                setActiveTab("coupons");
                setCouponError("");
                setCouponSuccess("");
                setNewCouponCode("");
                setNewDescription("");
                setNewDiscountValue(10);
                setNewMaxUses("");
                setNewExpiryDate("");
                setShowAddCouponModal(true);
              }}
              className="admin-btn-coupon"
              title="Add New Coupon"
              style={{
                padding: "8px 14px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                color: "#334155",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FFFFFF"}
            >
              <span>➕</span> <span className="admin-btn-text">Add Coupon</span>
            </button>

            <button
              onClick={handleReconcilePayments}
              disabled={isReconciling}
              className="admin-btn-reconcile"
              title="Sync & Reconcile Captured Razorpay Payments with Database"
              style={{
                padding: "8px 14px",
                backgroundColor: isReconciling ? "#F1F5F9" : "#10B981",
                border: "none",
                borderRadius: "10px",
                color: isReconciling ? "#64748B" : "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isReconciling ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: isReconciling ? "none" : "0 2px 8px rgba(16, 185, 129, 0.25)",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => { if (!isReconciling) e.currentTarget.style.backgroundColor = "#059669"; }}
              onMouseOut={(e) => { if (!isReconciling) e.currentTarget.style.backgroundColor = "#10B981"; }}
            >
              <span>{isReconciling ? "⏳" : "🔄"}</span> 
              <span className="admin-btn-text">{isReconciling ? "Syncing..." : "Sync Payments"}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="admin-btn-export"
              title="Export Registrations to CSV"
              style={{
                padding: "8px 14px",
                backgroundColor: "#2563EB",
                border: "none",
                borderRadius: "10px",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
            >
              <span>📥</span> <span className="admin-btn-text">Export</span>
            </button>

            <div className="admin-desktop-only" style={{ width: "1px", height: "24px", backgroundColor: "#E2E8F0", margin: "0 2px" }} />

            {/* Profile pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px" }}>
                AD
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main 
          style={{ flex: 1, padding: "28px", maxWidth: "1500px", width: "100%", boxSizing: "border-box" }}
          className="admin-dashboard-main"
        >
          {reconcileResult && (
            <div style={{
              marginBottom: "20px",
              padding: "14px 18px",
              borderRadius: "12px",
              backgroundColor: reconcileResult.startsWith("✅") ? "#ECFDF5" : "#FFFBEB",
              border: reconcileResult.startsWith("✅") ? "1.5px solid #10B981" : "1.5px solid #F59E0B",
              color: reconcileResult.startsWith("✅") ? "#065F46" : "#92400E",
              fontSize: "14px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <span>{reconcileResult}</span>
              <button
                onClick={() => setReconcileResult(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 800, fontSize: "16px" }}
              >
                ✕
              </button>
            </div>
          )}

          {updateMessage && (
            <div style={{
              marginBottom: "20px",
              padding: "14px 18px",
              borderRadius: "12px",
              backgroundColor: "#ECFDF5",
              border: "1.5px solid #10B981",
              color: "#065F46",
              fontSize: "14px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.1)"
            }}>
              <span>{updateMessage}</span>
              <button
                onClick={() => setUpdateMessage(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: 800, fontSize: "16px" }}
              >
                ✕
              </button>
            </div>
          )}
          
          {/* HEADER TITLE */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0", letterSpacing: "-0.5px" }}>
                {activeTab === "home" && "Dashboard"}
                {activeTab === "analytics" && "Analytics & Performance"}
                {activeTab === "logger" && "User Activity & Journey Logger"}
                {activeTab === "coupons" && "Coupon Code Management"}
                {activeTab === "advertisement" && "Advertisement & Broadcast Campaigns"}
              </h1>
              <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>
                {activeTab === "home" && "Live registration intelligence, race distribution, and participant directory"}
                {activeTab === "analytics" && "Funnel conversion rates, page views, and drop-off telemetry"}
                {activeTab === "logger" && "Python-analyzed human stories of visitor reactions, hesitation, drop-offs, and verified payments"}
                {activeTab === "coupons" && "Create, configure, and monitor discount promo codes"}
                {activeTab === "advertisement" && "Create, preview, and dispatch bulk promotional emails & broadcasts via Brevo API"}
              </p>
            </div>
          </div>

          {/* TAB 1: DASHBOARD HOME (KPI CARDS, CHARTS, PARTICIPANT DIRECTORY) */}
          {activeTab === "home" && (
            <>
              {/* TOP 4 METRIC CARDS (Live Collected Analytics Data & Submissions) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                
                {/* Card 1: Page Views */}
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>Page Views</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" fill="#2563EB" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
                  {analytics?.pageViews?.total?.toLocaleString("en-IN") || "0"}
                </span>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 700, 
                  backgroundColor: analytics?.pageViews?.isPositive ? "#ECFDF5" : "#FEE2E2", 
                  color: analytics?.pageViews?.isPositive ? "#10B981" : "#DC2626", 
                  padding: "2px 6px", 
                  borderRadius: "6px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "2px" 
                }}>
                  {analytics?.pageViews?.isPositive ? "▲" : "▼"} {analytics?.pageViews?.pct || "0.0"}%
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                vs. {analytics?.pageViews?.prevPeriod?.toLocaleString("en-IN") || 0} last period
              </div>
            </div>

            {/* Card 2: Visitors */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>Visitors</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
                  {analytics?.visitors?.total?.toLocaleString("en-IN") || "0"}
                </span>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 700, 
                  backgroundColor: analytics?.visitors?.isPositive ? "#ECFDF5" : "#FEE2E2", 
                  color: analytics?.visitors?.isPositive ? "#10B981" : "#DC2626", 
                  padding: "2px 6px", 
                  borderRadius: "6px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "2px" 
                }}>
                  {analytics?.visitors?.isPositive ? "▲" : "▼"} {analytics?.visitors?.pct || "0.0"}%
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                vs. {analytics?.visitors?.prevPeriod?.toLocaleString("en-IN") || 0} last period
              </div>
            </div>

            {/* Card 3: Click */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>Click</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563EB" stroke="#2563EB" strokeWidth="1">
                    <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 5.143z"/>
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
                  {analytics?.clicks?.total?.toLocaleString("en-IN") || "0"}
                </span>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 700, 
                  backgroundColor: analytics?.clicks?.isPositive ? "#ECFDF5" : "#FCE7F3", 
                  color: analytics?.clicks?.isPositive ? "#10B981" : "#DB2777", 
                  padding: "2px 6px", 
                  borderRadius: "6px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "2px" 
                }}>
                  {analytics?.clicks?.isPositive ? "▲" : "▼"} {analytics?.clicks?.pct || "0.0"}%
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                vs. {analytics?.clicks?.prevPeriod?.toLocaleString("en-IN") || 0} last period
              </div>
            </div>

            {/* Card 4: Submissions */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>Submissions</span>
                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
                  {analytics?.submissions?.total?.toLocaleString("en-IN") || (stats?.totalRegistrations || 0).toLocaleString("en-IN")}
                </span>
                <span style={{ 
                  fontSize: "11px", 
                  fontWeight: 700, 
                  backgroundColor: (analytics?.submissions?.isPositive ?? true) ? "#ECFDF5" : "#FEE2E2", 
                  color: (analytics?.submissions?.isPositive ?? true) ? "#10B981" : "#DC2626", 
                  padding: "2px 6px", 
                  borderRadius: "6px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "2px" 
                }}>
                  {(analytics?.submissions?.isPositive ?? true) ? "▲" : "▼"} {analytics?.submissions?.pct || "0.0"}%
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                vs. {analytics?.submissions?.prevPeriod?.toLocaleString("en-IN") || 0} last period
              </div>
            </div>

          </div>

          {/* MIDDLE ANALYTICS / VISUAL CHARTS ROW (Shopeers Split Graph Layout) */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "24px" }} className="admin-charts-grid">
            
            {/* Left Big Card: Performance Curve & Breakdown */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#64748B" }}>Revenue &amp; Registrations Growth</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginTop: "4px" }}>
                    <span style={{ fontSize: "26px", fontWeight: 800, color: "#0F172A" }}>₹{(totalRevenue / 1000).toFixed(1)}K</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#DCFCE7", color: "#16A34A", padding: "2px 6px", borderRadius: "6px" }}>▲ 24.4% vs. target</span>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 500, backgroundColor: "#F8FAFC", padding: "6px 12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                  Live Telemetry
                </div>
              </div>

              {/* Interactive Curved Area Graph (SVG) */}
              <div style={{ width: "100%", height: "160px", position: "relative", marginBottom: "20px" }}>
                <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Target line (Dashed) */}
                  <path 
                    d="M 0 110 Q 70 100, 140 105 T 280 80 T 420 50 T 500 45" 
                    fill="none" 
                    stroke="#CBD5E1" 
                    strokeWidth="2" 
                    strokeDasharray="4 4" 
                  />

                  {/* Actual Curve Area */}
                  <path 
                    d="M 0 120 Q 60 115, 120 100 T 240 60 T 360 85 T 440 35 T 500 40 L 500 150 L 0 150 Z" 
                    fill="url(#chartGradient)" 
                  />

                  {/* Actual Solid Line */}
                  <path 
                    d="M 0 120 Q 60 115, 120 100 T 240 60 T 360 85 T 440 35 T 500 40" 
                    fill="none" 
                    stroke="#2563EB" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                  />

                  {/* Highlight Point */}
                  <circle cx="360" cy="85" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                {/* Simulated Tooltip */}
                <div style={{ position: "absolute", left: "68%", top: "15%", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "6px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", pointerEvents: "none" }}>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>Active Pace</div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "#2563EB" }}>₹{(totalRevenue / 1000).toFixed(1)}k Collected</div>
                </div>
              </div>

              {/* Sub-Category Distribution Progress Bars */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", paddingTop: "12px", borderTop: "1px solid #F1F5F9" }}>
                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", borderLeft: "3px solid #2563EB" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>3Km Run</div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{stats?.categoryStats?.["3Km"] || 0} Runners</div>
                </div>
                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", borderLeft: "3px solid #10B981" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>5Km Run</div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{stats?.categoryStats?.["5Km"] || 0} Runners</div>
                </div>
                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", borderLeft: "3px solid #F59E0B" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>10Km Run</div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", marginTop: "2px" }}>{stats?.categoryStats?.["10Km"] || 0} Runners</div>
                </div>
              </div>
            </div>

            {/* Right Column: Category Distribution & Gender Diversity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Category Vertical Bar Chart (Shopeers Style) */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A" }}>Race Distribution</span>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>By Category</span>
                </div>

                {/* Vertical rounded bars */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: "110px", padding: "0 10px 6px" }}>
                  {stats?.categoryStats && Object.entries(stats.categoryStats).map(([cat, count]: any) => {
                    const maxVal = Math.max(...Object.values(stats.categoryStats).map(Number)) || 1;
                    const heightPct = Math.max(15, (Number(count) / maxVal) * 100);
                    const isTop = Number(count) === maxVal && Number(count) > 0;
                    return (
                      <div key={cat} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: isTop ? "#2563EB" : "#64748B" }}>{count}</span>
                        <div style={{ width: "28px", height: "70px", backgroundColor: "#F1F5F9", borderRadius: "8px", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
                          <div 
                            style={{ 
                              width: "100%", 
                              height: `${heightPct}%`, 
                              backgroundColor: isTop ? "#2563EB" : "#94A3B8", 
                              borderRadius: "8px",
                              transition: "height 0.5s ease"
                            }} 
                          />
                        </div>
                        <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>{cat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gender Diversity Ratio Card */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A" }}>Gender Breakdown</span>
                  <span style={{ fontSize: "11px", color: "#16A34A", fontWeight: 700, backgroundColor: "#DCFCE7", padding: "2px 6px", borderRadius: "4px" }}>Verified</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#0F172A" }}>
                      {stats?.genderStats?.Male || 0}M / {stats?.genderStats?.Female || 0}F
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
                      Others: {stats?.genderStats?.Others || 0}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <span style={{ padding: "4px 8px", backgroundColor: "#EFF6FF", color: "#2563EB", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>♂ Male</span>
                    <span style={{ padding: "4px 8px", backgroundColor: "#FDF2F8", color: "#DB2777", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>♀ Female</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* REGISTRATIONS DIRECTORY TABLE (Shopeers Table Style) */}
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              
              {/* Table Filter Top Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "14px" }}>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0" }}>Participant Directory</h3>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>Showing live registered runners</span>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                  
                  {/* Date Range Filter (Date From & Date To) */}
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "6px", 
                    backgroundColor: "#F8FAFC", 
                    border: (dateFrom || dateTo) ? "1.5px solid #2563EB" : "1px solid #E2E8F0", 
                    borderRadius: "10px", 
                    padding: "4px 10px",
                    transition: "all 0.15s"
                  }}>
                    <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>📅 From:</span>
                    <input 
                      type="date"
                      value={dateFrom}
                      onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                      style={{ 
                        backgroundColor: "transparent", 
                        border: "none", 
                        color: "#0F172A", 
                        fontSize: "12px", 
                        fontWeight: 600,
                        outline: "none",
                        cursor: "pointer"
                      }}
                      title="Filter registrations starting from this date"
                    />
                    <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>To:</span>
                    <input 
                      type="date"
                      value={dateTo}
                      onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                      style={{ 
                        backgroundColor: "transparent", 
                        border: "none", 
                        color: "#0F172A", 
                        fontSize: "12px", 
                        fontWeight: 600,
                        outline: "none",
                        cursor: "pointer"
                      }}
                      title="Filter registrations up to this date"
                    />
                    {(dateFrom || dateTo) && (
                      <button 
                        onClick={() => { setDateFrom(""); setDateTo(""); setPage(1); }}
                        style={{ 
                          border: "none", 
                          background: "none", 
                          color: "#EF4444", 
                          cursor: "pointer", 
                          fontSize: "12px", 
                          fontWeight: 700,
                          padding: "0 2px"
                        }}
                        title="Clear date range"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Race Category Filter */}
                  <select 
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    style={{ 
                      padding: "8px 12px", backgroundColor: "#F8FAFC", 
                      border: category ? "1.5px solid #2563EB" : "1px solid #E2E8F0", 
                      borderRadius: "10px", color: "#334155", 
                      fontSize: "13px", outline: "none", fontWeight: 500
                    }}
                  >
                    <option value="">All Categories</option>
                    <option value="3Km">3Km Run</option>
                    <option value="5Km">5Km Run</option>
                    <option value="10Km">10Km Run</option>
                  </select>

                  {/* Gender Filter */}
                  <select 
                    value={gender}
                    onChange={(e) => { setGender(e.target.value); setPage(1); }}
                    style={{ 
                      padding: "8px 12px", backgroundColor: "#F8FAFC", 
                      border: gender ? "1.5px solid #2563EB" : "1px solid #E2E8F0", 
                      borderRadius: "10px", color: "#334155", 
                      fontSize: "13px", outline: "none", fontWeight: 500
                    }}
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>

                  {/* Coupon Code Filter */}
                  <select 
                    value={couponFilter}
                    onChange={(e) => { setCouponFilter(e.target.value); setPage(1); }}
                    style={{ 
                      padding: "8px 12px", backgroundColor: "#F8FAFC", 
                      border: couponFilter ? "1.5px solid #2563EB" : "1px solid #E2E8F0", 
                      borderRadius: "10px", color: "#334155", 
                      fontSize: "13px", outline: "none", fontWeight: 500
                    }}
                  >
                    <option value="">🎟️ All Coupons</option>
                    <option value="WITH_COUPON">With Any Coupon</option>
                    <option value="NO_COUPON">Without Coupon (Full Price)</option>
                    {[...coupons].sort((a, b) => (b.id || 0) - (a.id || 0)).map((c) => (
                      <option key={c.id} value={c.code}>Coupon: {c.code}</option>
                    ))}
                  </select>

                  {/* Clear All Filters Button */}
                  {(search || category || gender || couponFilter || dateFrom || dateTo) && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setCategory("");
                        setGender("");
                        setCouponFilter("");
                        setDateFrom("");
                        setDateTo("");
                        setPage(1);
                      }}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        borderRadius: "10px",
                        color: "#DC2626",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                      title="Reset all active filters"
                    >
                      <span>✕</span> Reset
                    </button>
                  )}

                </div>
              </div>

              {/* Clean Shopeers Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontWeight: 600 }}>
                      <th style={{ padding: "12px 14px" }}>ID</th>
                      <th style={{ padding: "12px 14px", minWidth: "160px" }}>Participant</th>
                      <th style={{ padding: "12px 14px", minWidth: "150px" }}>Date of Registration</th>
                      <th style={{ padding: "12px 14px", minWidth: "140px" }}>Date of Birth</th>
                      <th style={{ padding: "12px 14px" }}>Gender</th>
                      <th style={{ padding: "12px 14px" }}>Blood</th>
                      <th style={{ padding: "12px 14px" }}>WhatsApp</th>
                      <th style={{ padding: "12px 14px" }}>Category</th>
                      <th style={{ padding: "12px 14px" }}>Size</th>
                      <th style={{ padding: "12px 14px" }}>Coupon</th>
                      <th style={{ padding: "12px 14px" }}>Amount</th>
                      <th style={{ padding: "12px 14px" }}>Status</th>
                      <th style={{ padding: "12px 14px", textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={13} style={{ padding: "32px", textAlign: "center", color: "#94A3B8" }}>Loading runner records...</td>
                      </tr>
                    ) : registrations.length === 0 ? (
                      <tr>
                        <td colSpan={13} style={{ padding: "32px", textAlign: "center", color: "#94A3B8" }}>No matching participants found</td>
                      </tr>
                    ) : (
                      registrations.map((reg: any) => (
                        <tr 
                          key={reg.id} 
                          style={{ 
                            borderBottom: "1px solid #F8FAFC", 
                            transition: "background-color 0.15s" 
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                        >
                          <td style={{ padding: "14px 14px", fontWeight: 700, color: "#64748B" }}>
                            #{reg.id}
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#EFF6FF", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E2E8F0" }}>
                                {reg.image_path && reg.image_path !== "/uploads/placeholder.png" ? (
                                  <img src={reg.image_path} alt={reg.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                  <span style={{ fontSize: "12px", color: "#2563EB", fontWeight: 700 }}>
                                    {(reg.name || "U")[0].toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, color: "#0F172A" }}>{reg.name}</div>
                                <div style={{ fontSize: "11px", color: "#94A3B8" }}>{reg.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 14px", whiteSpace: "nowrap", color: "#475569", fontSize: "12px", fontWeight: 600 }}>
                            {formatDateTime(reg.created_at || reg.payment?.paid_at || reg.registration_date)}
                          </td>
                          <td style={{ padding: "14px 14px", whiteSpace: "nowrap", color: "#0F172A", fontWeight: 600 }}>
                            {formatDOB(reg.dob || reg.date_of_birth)}
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            <span style={{
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              backgroundColor: reg.gender === "Female" ? "#FDF2F8" : reg.gender === "Male" ? "#EFF6FF" : "#F8FAFC",
                              color: reg.gender === "Female" ? "#DB2777" : reg.gender === "Male" ? "#2563EB" : "#64748B",
                              border: "1px solid #E2E8F0"
                            }}>
                              {reg.gender || "Not Specified"}
                            </span>
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 800, backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              🩸 {reg.blood_group || reg.bloodGroup || "-"}
                            </span>
                          </td>
                          <td style={{ padding: "14px 14px", whiteSpace: "nowrap", color: "#334155" }}>
                            {reg.whatsapp}
                          </td>
                          <td style={{ padding: "14px 14px", fontWeight: 600, color: "#0F172A" }}>
                            {reg.event_category}
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            <span style={{
                              padding: "3px 8px",
                              borderRadius: "6px",
                              backgroundColor: "#EFF6FF",
                              border: "1px solid #BFDBFE",
                              fontSize: "12px",
                              fontWeight: 800,
                              color: "#1D4ED8"
                            }}>
                              {reg.tshirt_size || reg.tshirtSize || "M"}
                            </span>
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            {reg.coupon_applied || reg.payment?.coupon_applied ? (
                              <span style={{ 
                                padding: "3px 6px", borderRadius: "6px", fontSize: "11px", fontWeight: 700,
                                backgroundColor: "#ECFDF5", color: "#059669",
                                display: "inline-flex", alignItems: "center", gap: "4px"
                              }}>
                                🎟️ {reg.coupon_applied || reg.payment?.coupon_applied}
                              </span>
                            ) : (
                              <span style={{ color: "#CBD5E1" }}>-</span>
                            )}
                          </td>
                          <td style={{ padding: "14px 14px", fontWeight: 700, color: "#0F172A" }}>
                            ₹{reg.payment?.amount || reg.amount || "-"}
                          </td>
                          <td style={{ padding: "14px 14px" }}>
                            <span style={{ 
                              padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700,
                              backgroundColor: "#DCFCE7", color: "#166534"
                            }}>
                              PAID
                            </span>
                          </td>
                          <td style={{ padding: "14px 14px", textAlign: "center" }}>
                            <button
                              onClick={() => setSelectedRunner(reg)}
                              style={{
                                padding: "5px 12px",
                                backgroundColor: "#F8FAFC",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                color: "#2563EB",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.15s",
                                whiteSpace: "nowrap"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#EFF6FF";
                                e.currentTarget.style.borderColor = "#BFDBFE";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#F8FAFC";
                                e.currentTarget.style.borderColor = "#E2E8F0";
                              }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #F1F5F9" }}>
                  <span style={{ fontSize: "13px", color: "#64748B" }}>
                    Showing page <strong>{page}</strong> of <strong>{totalPages}</strong> ({total} total results)
                  </span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      disabled={page <= 1}
                      onClick={() => fetchRegistrations(page - 1)}
                      style={{ 
                        padding: "6px 12px", backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1",
                        borderRadius: "8px", color: "#334155", cursor: page <= 1 ? "not-allowed" : "pointer", opacity: page <= 1 ? 0.4 : 1, fontSize: "13px", fontWeight: 600
                      }}
                    >
                      Previous
                    </button>
                    <button 
                      disabled={page >= totalPages}
                      onClick={() => fetchRegistrations(page + 1)}
                      style={{ 
                        padding: "6px 12px", backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1",
                        borderRadius: "8px", color: "#334155", cursor: page >= totalPages ? "not-allowed" : "pointer", opacity: page >= totalPages ? 0.4 : 1, fontSize: "13px", fontWeight: 600
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

            </div>
          </>
          )}

          {/* TAB 2: CONVERSION FUNNEL & DROP-OFF REMARKS ANALYTICS */}
          {activeTab === "analytics" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* SUB-TABS: SUCCESS vs ERRORS & DROP-OFFS */}
              <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #E2E8F0", paddingBottom: "14px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setAnalyticsSubTab("all")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: analyticsSubTab === "all" ? "#0F172A" : "#F1F5F9",
                      color: analyticsSubTab === "all" ? "#FFFFFF" : "#475569",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    📊 All Funnel Overview
                  </button>
                  <button
                    onClick={() => setAnalyticsSubTab("success")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: analyticsSubTab === "success" ? "#10B981" : "#ECFDF5",
                      color: analyticsSubTab === "success" ? "#FFFFFF" : "#065F46",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: analyticsSubTab === "success" ? "0 2px 8px rgba(16,185,129,0.25)" : "none",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span>🟢</span> Success &amp; Conversions ({analytics?.funnel?.paymentCompleted || total || 0})
                  </button>
                  <button
                    onClick={() => setAnalyticsSubTab("errors")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: analyticsSubTab === "errors" ? "#EF4444" : "#FEF2F2",
                      color: analyticsSubTab === "errors" ? "#FFFFFF" : "#991B1B",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: analyticsSubTab === "errors" ? "0 2px 8px rgba(239,68,68,0.25)" : "none",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <span>🔴</span> Errors &amp; Drop-offs ({analytics?.dropoffLogs?.length || 0})
                  </button>
                </div>

                <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                  Showing {analyticsSubTab === "success" ? "successful payments & conversion pipeline" : analyticsSubTab === "errors" ? "diagnostic error logs & abandoned checkouts" : "complete end-to-end telemetry"}
                </div>
              </div>

              {/* 1. CONVERSION FUNNEL VISUALIZER (Shown in ALL or SUCCESS view) */}
              {(analyticsSubTab === "all" || analyticsSubTab === "success") && (
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px" }}>🟢</span>
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0" }}>Visitor to Registration Conversion Funnel</h3>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0 0" }}>Step-by-step visitor intent, form interaction, and payment completion pipeline</p>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#EFF6FF", color: "#2563EB", padding: "4px 10px", borderRadius: "8px" }}>
                      Overall Conversion: {analytics?.funnel?.overallConversionPct || "0.0"}%
                    </span>
                  </div>

                  {/* Funnel 4-Stage Horizontal Flow Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "10px" }}>
                    
                    {/* Step 1: Website Visitors */}
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>1. Website Visitors</span>
                        <span style={{ fontSize: "14px" }}>👥</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>
                        {analytics?.funnel?.totalVisitors || 0}
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748B", marginTop: "4px" }}>
                        100% of website traffic
                      </div>
                    </div>

                    {/* Step 2: Register Now Touches */}
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px", borderLeft: "3px solid #2563EB" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", textTransform: "uppercase" }}>2. Click "Register Now"</span>
                        <span style={{ fontSize: "14px" }}>🏃</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>
                        {analytics?.funnel?.registerClicks || 0}
                      </div>
                      <div style={{ fontSize: "11px", color: "#2563EB", fontWeight: 700, marginTop: "4px" }}>
                        {analytics?.funnel?.visitorToCtaPct || "0.0"}% converted from visitors
                      </div>
                    </div>

                    {/* Step 3: Proceed Payment */}
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px", borderLeft: "3px solid #F59E0B" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#D97706", textTransform: "uppercase" }}>3. Proceed to Payment</span>
                        <span style={{ fontSize: "14px" }}>💳</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>
                        {analytics?.funnel?.paymentInitiated || 0}
                      </div>
                      <div style={{ fontSize: "11px", color: "#D97706", fontWeight: 700, marginTop: "4px" }}>
                        {analytics?.funnel?.ctaToFormPct || "0.0"}% filled &amp; clicked Pay
                      </div>
                    </div>

                    {/* Step 4: Completed Payment */}
                    <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px", borderLeft: "3px solid #10B981" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>4. Completed Submissions</span>
                        <span style={{ fontSize: "14px" }}>✅</span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>
                        {analytics?.funnel?.paymentCompleted || 0}
                      </div>
                      <div style={{ fontSize: "11px", color: "#059669", fontWeight: 700, marginTop: "4px" }}>
                        {analytics?.funnel?.paymentToSuccessPct || "0.0"}% successful payments
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* 2. DROP-OFF & ERROR DIAGNOSTIC REMARKS JOURNAL TABLE (Shown in ALL or ERRORS view) */}
              {(analyticsSubTab === "all" || analyticsSubTab === "errors") && (
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px" }}>🔴</span>
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0" }}>Drop-off &amp; Error Diagnostic Remarks Journal</h3>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: "4px 0 0 0" }}>Detailed reasons why visitors dropped off before completing payment or encountered errors</p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#64748B", backgroundColor: "#F8FAFC", padding: "6px 12px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                      Total Events Logged: <strong>{analytics?.dropoffLogs?.length || 0}</strong>
                    </span>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontWeight: 600 }}>
                          <th style={{ padding: "12px 14px" }}>Timestamp</th>
                          <th style={{ padding: "12px 14px" }}>Funnel Stage</th>
                          <th style={{ padding: "12px 14px", minWidth: "160px" }}>Runner / Contact</th>
                          <th style={{ padding: "12px 14px" }}>Category / Amount</th>
                          <th style={{ padding: "12px 14px" }}>Status</th>
                          <th style={{ padding: "12px 14px", minWidth: "260px" }}>Diagnostic Remark</th>
                          <th style={{ padding: "12px 14px", textAlign: "center" }}>Lead Recovery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!analytics?.dropoffLogs || analytics.dropoffLogs.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: "36px", textAlign: "center", color: "#94A3B8" }}>
                              No drop-off or payment errors recorded yet. Live telemetry is actively listening.
                            </td>
                          </tr>
                        ) : (
                          (analytics?.dropoffLogs || []).filter((log: any) => log && typeof log === "object").map((log: any, idx: number) => {
                            const stageStr = String(log?.stage || "CHECKOUT");
                            const statusStr = String(log?.status || "DROP_OFF");
                            const isSuccess = statusStr === "SUCCESS";
                            const isError = statusStr === "ERROR" || stageStr.includes("ERROR") || stageStr.includes("FAILED");
                            const isAbandoned = statusStr === "ABANDONED" || statusStr === "DROP_OFF" || stageStr === "PAYMENT_POPUP_DISMISSED";

                            return (
                              <tr key={log?.id || `log_${idx}`} style={{ borderBottom: "1px solid #F8FAFC" }}>
                                <td style={{ padding: "12px 14px", whiteSpace: "nowrap", color: "#64748B", fontSize: "12px" }}>
                                  {formatDateTime(log?.timestamp)}
                                </td>
                                <td style={{ padding: "12px 14px" }}>
                                  <span style={{
                                    padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700,
                                    backgroundColor: stageStr === "PAYMENT_POPUP_DISMISSED" ? "#FEF3C7" : isError ? "#FEE2E2" : "#EFF6FF",
                                    color: stageStr === "PAYMENT_POPUP_DISMISSED" ? "#B45309" : isError ? "#B91C1C" : "#1D4ED8"
                                  }}>
                                    {stageStr}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 14px" }}>
                                  <div style={{ fontWeight: 700, color: "#0F172A" }}>{log?.name || "Anonymous Visitor"}</div>
                                  {log?.whatsapp && (
                                    <div style={{ fontSize: "12px", color: "#2563EB", fontWeight: 600 }}>{log.whatsapp}</div>
                                  )}
                                  {log?.email && (
                                    <div style={{ fontSize: "11px", color: "#64748B" }}>{log.email}</div>
                                  )}
                                </td>
                                <td style={{ padding: "12px 14px" }}>
                                  <span style={{ fontWeight: 600, color: "#0F172A" }}>{log?.category || "Run"}</span>
                                  {log?.amount ? (
                                    <span style={{ display: "block", fontSize: "11px", color: "#64748B" }}>₹{log.amount}</span>
                                  ) : null}
                                </td>
                                <td style={{ padding: "12px 14px" }}>
                                  <span style={{
                                    padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700,
                                    backgroundColor: isSuccess ? "#DCFCE7" : isError ? "#FEE2E2" : isAbandoned ? "#FEF3C7" : "#F1F5F9",
                                    color: isSuccess ? "#15803D" : isError ? "#B91C1C" : isAbandoned ? "#B45309" : "#475569"
                                  }}>
                                    {statusStr}
                                  </span>
                                </td>
                                <td style={{ padding: "12px 14px", color: "#334155", fontSize: "13px", lineHeight: 1.4 }}>
                                  <div style={{ 
                                    padding: "6px 10px", 
                                    backgroundColor: isError ? "#FEF2F2" : isAbandoned ? "#FFFBEB" : "#F0FDF4", 
                                    border: `1px solid ${isError ? "#FCA5A5" : isAbandoned ? "#FDE68A" : "#BBF7D0"}`,
                                    borderRadius: "8px",
                                    fontWeight: 500
                                  }}>
                                    📌 {log?.remark || "Activity recorded"}
                                  </div>
                                </td>
                              <td style={{ padding: "12px 14px", textAlign: "center" }}>
                                {log.whatsapp ? (
                                  <a
                                    href={`https://wa.me/${String(log.whatsapp).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${log.name || "Runner"}, we noticed you were registering for FLEXATHON 2026 ${log.category ? `(${log.category} Run)` : ""}. Did you need any assistance completing your registration?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      padding: "6px 12px",
                                      backgroundColor: "#25D366",
                                      color: "#FFFFFF",
                                      borderRadius: "8px",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                      textDecoration: "none",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                      whiteSpace: "nowrap"
                                    }}
                                  >
                                    💬 Chat
                                  </a>
                                ) : (
                                  <span style={{ color: "#CBD5E1", fontSize: "12px" }}>-</span>
                                )}
                              </td>
                            </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: USER JOURNEY & ACTIVITY LOGGER (POWERED BY PYTHON BACKEND) */}
          {activeTab === "logger" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Python Backend Banner & Executive KPI Metrics */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "18px" }}>🐍</span>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                        User Reaction &amp; Activity Intelligence Logger
                      </h3>
                      <span style={{ fontSize: "11px", fontWeight: 700, backgroundColor: "#FEF3C7", color: "#B45309", padding: "3px 8px", borderRadius: "6px" }}>
                        Python Backend Engine
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                      Translates complex visitor events, drop-offs, hesitation, and errors into plain English human stories that anyone can understand.
                    </p>
                  </div>

                  <button
                    onClick={fetchLoggerData}
                    disabled={loadingLogger}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      borderRadius: "8px",
                      color: "#334155",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: loadingLogger ? "not-allowed" : "pointer"
                    }}
                  >
                    <span>🔄</span> {loadingLogger ? "Analyzing..." : "Refresh Intelligence"}
                  </button>
                </div>

                {/* 4 Summary Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "14px" }}>
                  
                  {/* Total Actions */}
                  <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Total Events Analyzed</span>
                      <span style={{ fontSize: "14px" }}>📊</span>
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A" }}>
                      {loggerData?.summary?.totalLogs || 0}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                      Conversion Rate: <strong>{loggerData?.summary?.overallConversionRate || "0%"}</strong>
                    </div>
                  </div>

                  {/* High Intent / Completed */}
                  <div style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#166534", textTransform: "uppercase" }}>High Intent / Completed</span>
                      <span style={{ fontSize: "14px" }}>🎉</span>
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#15803D" }}>
                      {loggerData?.summary?.totalSuccess || 0}
                    </div>
                    <div style={{ fontSize: "11px", color: "#166534", marginTop: "2px" }}>
                      Confirmed paid registrations
                    </div>
                  </div>

                  {/* Hesitation / Price Resistance */}
                  <div style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#92400E", textTransform: "uppercase" }}>Hesitation &amp; Abandoned</span>
                      <span style={{ fontSize: "14px" }}>🤔</span>
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#D97706" }}>
                      {loggerData?.summary?.totalLackOfInterest || 0}
                    </div>
                    <div style={{ fontSize: "11px", color: "#92400E", marginTop: "2px" }}>
                      Closed gateway or bounced
                    </div>
                  </div>

                  {/* Technical & Gateway Errors */}
                  <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "12px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#991B1B", textTransform: "uppercase" }}>System &amp; Bank Issues</span>
                      <span style={{ fontSize: "14px" }}>⚠️</span>
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#DC2626" }}>
                      {loggerData?.summary?.totalErrorsAndDropoffs || 0}
                    </div>
                    <div style={{ fontSize: "11px", color: "#991B1B", marginTop: "2px" }}>
                      Gateway declines / form errors
                    </div>
                  </div>

                </div>
              </div>

              {/* Actionable Intelligence Recommendation Banner */}
              {loggerData?.insights && (
                <div style={{
                  padding: "16px 20px",
                  borderRadius: "14px",
                  backgroundColor: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px"
                }}>
                  <span style={{ fontSize: "22px" }}>💡</span>
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 800, color: "#1E40AF", margin: "0 0 4px 0" }}>
                      Key Intelligence Insight: {loggerData.insights.topDropoffReason}
                    </h4>
                    <p style={{ fontSize: "13px", color: "#1E3A8A", margin: 0, lineHeight: 1.5 }}>
                      <strong>Action Recommendation:</strong> {loggerData.insights.primaryRecommendation}
                    </p>
                  </div>
                </div>
              )}

              {/* Filter & Search Bar */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "18px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
                  
                  {/* Search box */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "260px" }}>
                    <span style={{ fontSize: "16px", color: "#64748B" }}>🔍</span>
                    <input
                      type="text"
                      placeholder="Search by runner name, phone, email, or category..."
                      value={loggerSearch}
                      onChange={(e) => setLoggerSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "13px",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Mood Filter Buttons */}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[
                      { key: "ALL", label: "All Stories", icon: "🌐" },
                      { key: "SUCCESS", label: "Paid / High Intent", icon: "🎉" },
                      { key: "HESITATION", label: "Price Hesitation", icon: "🤔" },
                      { key: "LACK_OF_INTEREST", label: "Casual Drop-off", icon: "📉" },
                      { key: "ERROR", label: "System Errors", icon: "⚠️" },
                    ].map((btn) => (
                      <button
                        key={btn.key}
                        onClick={() => setLoggerFilterMood(btn.key)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: "none",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                          backgroundColor: loggerFilterMood === btn.key ? "#0F172A" : "#F1F5F9",
                          color: loggerFilterMood === btn.key ? "#FFFFFF" : "#475569",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {btn.icon} {btn.label}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

              {/* Humanized Log Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(() => {
                  const rawList = loggerData?.allLogs || [];
                  const filtered = rawList.filter((log: any) => {
                    if (loggerFilterMood !== "ALL" && log.type !== loggerFilterMood) {
                      return false;
                    }
                    if (loggerSearch.trim()) {
                      const q = loggerSearch.toLowerCase();
                      const combined = `${log.name || ""} ${log.contact || ""} ${log.email || ""} ${log.category || ""} ${log.story || ""} ${log.technicalReason || ""}`.toLowerCase();
                      if (!combined.includes(q)) return false;
                    }
                    return true;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "48px", textAlign: "center", color: "#94A3B8" }}>
                        <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>🔍</span>
                        <h4 style={{ fontSize: "16px", color: "#334155", margin: "0 0 6px 0" }}>No Matching User Stories Found</h4>
                        <p style={{ fontSize: "13px", margin: 0 }}>Try clearing your search query or choosing a different user reaction mood filter.</p>
                      </div>
                    );
                  }

                  return filtered.map((item: any, idx: number) => {
                    const tagBg = item.tagColor === "green" ? "#DCFCE7" : item.tagColor === "orange" ? "#FEF3C7" : item.tagColor === "red" ? "#FEE2E2" : "#F1F5F9";
                    const tagText = item.tagColor === "green" ? "#166534" : item.tagColor === "orange" ? "#92400E" : item.tagColor === "red" ? "#991B1B" : "#475569";
                    const borderColor = item.tagColor === "green" ? "#BBF7D0" : item.tagColor === "orange" ? "#FDE68A" : item.tagColor === "red" ? "#FECACA" : "#E2E8F0";

                    return (
                      <div
                        key={item.id || idx}
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: `1px solid ${borderColor}`,
                          borderRadius: "14px",
                          padding: "18px 22px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          transition: "all 0.15s ease"
                        }}
                      >
                        {/* Top Header Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "16px" }}>{item.moodIcon}</span>
                            <span style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              backgroundColor: tagBg,
                              color: tagText
                            }}>
                              {item.tag}
                            </span>
                            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                              • {item.mood}
                            </span>
                          </div>

                          <span style={{ fontSize: "12px", color: "#94A3B8" }}>
                            🕒 {item.friendlyTime}
                          </span>
                        </div>

                        {/* Plain English Narrative Story */}
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", lineHeight: 1.5 }}>
                          {item.story}
                        </div>

                        {/* Participant Details & Action Recommendations */}
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #F1F5F9",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          flexWrap: "wrap",
                          gap: "10px"
                        }}>
                          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "#475569" }}>
                            <div><strong>Name:</strong> {item.name || "Anonymous"}</div>
                            {item.contact && <div><strong>WhatsApp:</strong> <span style={{ color: "#2563EB", fontWeight: 600 }}>{item.contact}</span></div>}
                            {item.category && <div><strong>Race:</strong> {item.category}</div>}
                            {item.amount > 0 && <div><strong>Amount:</strong> ₹{item.amount}</div>}
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {item.contact && !item.isSuccess && (
                              <a
                                href={`https://wa.me/${String(item.contact).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${item.name || "Runner"}, we noticed you were registering for FLEXATHON 2026 (${item.category} Run). Did you need any assistance completing your registration? Use code NILA10% for a 10% discount!`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "#25D366",
                                  color: "#FFFFFF",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                💬 WhatsApp Recovery
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Recommendation Note */}
                        <div style={{ fontSize: "12px", color: "#64748B", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>💡</span>
                          <span><strong>Recommendation:</strong> {item.actionRecommendation}</span>
                        </div>

                      </div>
                    );
                  });
                })()}
              </div>

            </div>
          )}

          {/* TAB 3: ADD / DELETE COUPONS & DISCOUNT MANAGEMENT */}
          {activeTab === "coupons" && (
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "14px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" }}>Coupon Management</h3>
                  <span style={{ fontSize: "13px", color: "#64748B" }}>Create promo discounts, update active status, or delete existing coupons</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Search coupons..."
                      value={couponSearch}
                      onChange={(e) => setCouponSearch(e.target.value)}
                      style={{
                        padding: "9px 12px 9px 34px",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid #CBD5E1",
                        borderRadius: "10px",
                        fontSize: "13px",
                        outline: "none",
                        color: "#0F172A",
                        minWidth: "200px"
                      }}
                    />
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", color: "#94A3B8" }}>🔍</span>
                    {couponSearch && (
                      <button
                        onClick={() => setCouponSearch("")}
                        style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "14px", padding: 0 }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setCouponError("");
                      setCouponSuccess("");
                      setNewCouponCode("");
                      setNewDescription("");
                      setNewDiscountValue(10);
                      setNewMaxUses("");
                      setNewExpiryDate("");
                      setShowAddCouponModal(true);
                    }}
                    style={{
                      padding: "10px 18px",
                      backgroundColor: "#2563EB",
                      border: "none",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1D4ED8"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2563EB"}
                  >
                    <span>➕</span> Add New Coupon
                  </button>
                </div>
              </div>

              {(() => {
                const filteredCoupons = [...coupons]
                  .filter(c => {
                    if (!couponSearch.trim()) return true;
                    const term = couponSearch.toLowerCase().trim();
                    return (
                      (c.code && c.code.toLowerCase().includes(term)) ||
                      (c.description && c.description.toLowerCase().includes(term)) ||
                      (c.discountValue && String(c.discountValue).includes(term))
                    );
                  })
                  .sort((a, b) => (b.id || 0) - (a.id || 0));

                return (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #F1F5F9", color: "#64748B", fontWeight: 600 }}>
                          <th style={{ padding: "12px 14px" }}>Coupon Code</th>
                          <th style={{ padding: "12px 14px" }}>Discount Value</th>
                          <th style={{ padding: "12px 14px", minWidth: "160px" }}>Description</th>
                          <th style={{ padding: "12px 14px" }}>Times Used</th>
                          <th style={{ padding: "12px 14px" }}>Max Users</th>
                          <th style={{ padding: "12px 14px" }}>Expiry Date</th>
                          <th style={{ padding: "12px 14px" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingCoupons && coupons.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "#94A3B8" }}>Loading promotional coupons...</td>
                          </tr>
                        ) : coupons.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: "36px", textAlign: "center", color: "#94A3B8" }}>
                              No active coupons configured. Click <strong>"+ Add New Coupon"</strong> above to create one.
                            </td>
                          </tr>
                        ) : filteredCoupons.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ padding: "36px", textAlign: "center", color: "#94A3B8" }}>
                              No coupons matching &quot;{couponSearch}&quot;. <button onClick={() => setCouponSearch("")} style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Clear search filter</button>
                            </td>
                          </tr>
                        ) : (
                          filteredCoupons.map((c) => {
                            const isRecentlyCreated = recentlyCreatedCouponId === c.id;
                            return (
                              <tr 
                                key={c.id} 
                                style={{ 
                                  borderBottom: "1px solid #F8FAFC",
                                  backgroundColor: isRecentlyCreated ? "#F0FDF4" : "transparent",
                                  boxShadow: isRecentlyCreated ? "inset 4px 0 0 #16A34A" : "none",
                                  transition: "background-color 0.25s ease"
                                }}
                                onMouseOver={(e) => {
                                  if (!isRecentlyCreated) e.currentTarget.style.backgroundColor = "#F8FAFC";
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = isRecentlyCreated ? "#F0FDF4" : "transparent";
                                }}
                              >
                                <td style={{ padding: "14px 14px" }}>
                                  <span style={{ 
                                    padding: "5px 10px", 
                                    backgroundColor: isRecentlyCreated ? "#DCFCE7" : "#EFF6FF", 
                                    border: isRecentlyCreated ? "1.5px solid #86EFAC" : "1px solid #BFDBFE",
                                    color: isRecentlyCreated ? "#15803D" : "#2563EB", 
                                    borderRadius: "8px", 
                                    fontWeight: 800, 
                                    fontSize: "13px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    letterSpacing: "0.5px"
                                  }}>
                                    🎟️ {c.code}
                                    {isRecentlyCreated && (
                                      <span style={{ 
                                        fontSize: "10px", 
                                        backgroundColor: "#16A34A", 
                                        color: "#FFFFFF", 
                                        padding: "1px 6px", 
                                        borderRadius: "4px", 
                                        fontWeight: 900 
                                      }}>
                                        ✨ NEW
                                      </span>
                                    )}
                                  </span>
                                </td>
                                <td style={{ padding: "14px 14px" }}>
                                  <span style={{ 
                                    padding: "3px 8px", 
                                    borderRadius: "6px", 
                                    fontSize: "12px", 
                                    fontWeight: 700, 
                                    backgroundColor: "#DCFCE7", 
                                    color: "#166534" 
                                  }}>
                                    {c.discountValue}{c.discountType === "percentage" ? "% OFF" : " ₹ FLAT"}
                                  </span>
                                </td>
                                <td style={{ padding: "14px 14px", color: "#334155", fontWeight: 500 }}>
                                  {c.description || "-"}
                                </td>
                                <td style={{ padding: "14px 14px", fontWeight: 700, color: "#0F172A" }}>
                                  {c.timesUsed || 0} uses
                                </td>
                                <td style={{ padding: "14px 14px", color: "#64748B" }}>
                                  {c.maxUses ? (
                                    <span style={{ fontWeight: 600, color: "#1E293B" }}>{c.maxUses} Max</span>
                                  ) : (
                                    <span style={{ color: "#94A3B8" }}>Unlimited</span>
                                  )}
                                </td>
                                <td style={{ padding: "14px 14px", color: "#64748B", whiteSpace: "nowrap" }}>
                                  {(() => {
                                    if (!c.expiryDate) {
                                      return <span style={{ color: "#94A3B8" }}>No Expiry</span>;
                                    }
                                    const expiry = c.expiryDate.includes("T") ? new Date(c.expiryDate) : new Date(`${c.expiryDate}T23:59:59.999`);
                                    const isExpired = expiry < new Date();
                                    return (
                                      <span style={{ fontWeight: 600, color: isExpired ? "#DC2626" : "#1E293B" }}>
                                        {formatDateTime(c.expiryDate)}
                                        {isExpired && (
                                          <span style={{ 
                                            fontSize: "10px", 
                                            fontWeight: 800, 
                                            color: "#DC2626", 
                                            backgroundColor: "#FEE2E2", 
                                            padding: "1px 6px", 
                                            borderRadius: "4px", 
                                            display: "inline-block", 
                                            marginTop: "3px" 
                                          }}>
                                            EXPIRED
                                          </span>
                                        )}
                                      </span>
                                    );
                                  })()}
                                </td>
                                <td style={{ padding: "14px 14px" }}>
                                  {(() => {
                                    const expiry = c.expiryDate ? (c.expiryDate.includes("T") ? new Date(c.expiryDate) : new Date(`${c.expiryDate}T23:59:59.999`)) : null;
                                    const isExpired = expiry ? expiry < new Date() : false;
                                    const isMaxReached = c.maxUses && c.timesUsed >= c.maxUses;
                                    
                                    return (
                                      <button
                                        onClick={() => handleToggleCoupon(c.id, c.isActive)}
                                        title="Click to toggle coupon active status"
                                        style={{
                                          padding: "4px 10px", 
                                          borderRadius: "10px", 
                                          fontSize: "11px", 
                                          fontWeight: 800, 
                                          border: "none", 
                                          cursor: "pointer",
                                          backgroundColor: (!c.isActive || isExpired || isMaxReached) ? "#FEE2E2" : "#DCFCE7",
                                          color: (!c.isActive || isExpired || isMaxReached) ? "#991B1B" : "#166534",
                                          transition: "all 0.15s",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "4px"
                                        }}
                                      >
                                        {isExpired ? "🔴 INACTIVE (Expired)" : isMaxReached ? "⚠️ INACTIVE (Limit)" : c.isActive ? "● ACTIVE" : "○ INACTIVE"}
                                      </button>
                                    );
                                  })()}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
          )}

        </main>

        {/* RUNNER DETAILS MODAL */}
        {selectedRunner && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "540px", maxHeight: "90vh", overflowY: "auto",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px -12px rgba(0,0,0,0.15)",
              color: "#0F172A", padding: "28px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", borderBottom: "1px solid #F1F5F9", paddingBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", border: "2px solid #2563EB", backgroundColor: "#EFF6FF", flexShrink: 0 }}>
                    {selectedRunner.image_path ? (
                      <img src={selectedRunner.image_path} alt={selectedRunner.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#2563EB" }}>👤</div>
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#0F172A" }}>{selectedRunner.name}</h2>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "12px", backgroundColor: "#EFF6FF", color: "#2563EB" }}>
                        #FLX-{10000 + Number(selectedRunner.id)}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#64748B", margin: "3px 0 0 0" }}>
                      Reg: {formatDateTime(selectedRunner.created_at || selectedRunner.payment?.paid_at)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRunner(null)}
                  style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "20px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              {/* Grid info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>🎂 Date of Birth &amp; Age</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#2563EB", marginTop: "2px" }}>
                    {formatDOB(selectedRunner.dob || selectedRunner.date_of_birth)}
                  </div>
                </div>

                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>⚧ Gender</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginTop: "2px" }}>
                    {selectedRunner.gender || "Not Specified"}
                  </div>
                </div>

                <div style={{ backgroundColor: "#FEF2F2", borderRadius: "10px", padding: "12px", border: "1px solid #FECACA" }}>
                  <div style={{ fontSize: "11px", color: "#991B1B", fontWeight: 700 }}>🩸 Blood Group</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#DC2626", marginTop: "2px" }}>
                    {selectedRunner.blood_group || selectedRunner.bloodGroup || "Not Specified"}
                  </div>
                </div>

                <div style={{ backgroundColor: "#EFF6FF", borderRadius: "10px", padding: "12px", border: "1px solid #BFDBFE" }}>
                  <div style={{ fontSize: "11px", color: "#1E40AF", fontWeight: 700 }}>👕 T-Shirt Size</div>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: "#1D4ED8", marginTop: "2px" }}>
                    Size {selectedRunner.tshirt_size || selectedRunner.tshirtSize || "M"}
                  </div>
                </div>

                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>🏃 Race Category</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginTop: "2px" }}>
                    {selectedRunner.event_category || selectedRunner.category} Run
                  </div>
                </div>

                <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "12px", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>💳 Amount Paid</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#166534", marginTop: "2px" }}>
                    ₹{selectedRunner.payment?.amount || selectedRunner.amount || 0} INR
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div style={{ backgroundColor: "#F8FAFC", borderRadius: "10px", padding: "14px", border: "1px solid #E2E8F0", marginBottom: "16px", fontSize: "13px" }}>
                <div style={{ fontWeight: 700, color: "#334155", marginBottom: "8px" }}>Contact Details</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#64748B" }}>Email:</span>
                  <a href={`mailto:${selectedRunner.email}`} style={{ color: "#2563EB", textDecoration: "none", fontWeight: 600 }}>{selectedRunner.email}</a>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748B" }}>WhatsApp:</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600 }}>{selectedRunner.whatsapp}</span>
                    <a 
                      href={`https://wa.me/${String(selectedRunner.whatsapp || "").replace(/[^0-9]/g, "")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ padding: "2px 8px", backgroundColor: "#25D366", color: "#FFFFFF", borderRadius: "4px", fontSize: "11px", textDecoration: "none", fontWeight: 700 }}
                    >
                      Chat
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={() => setSelectedRunner(null)}
                  style={{
                    padding: "9px 18px", backgroundColor: "#0F172A", border: "none",
                    borderRadius: "10px", color: "#FFFFFF", cursor: "pointer", fontSize: "13px", fontWeight: 700
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD COUPON MODAL */}
        {showAddCouponModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "480px", padding: "30px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>Create Promotional Coupon</h2>
                <button onClick={() => setShowAddCouponModal(false)} style={{ background: "none", border: "none", color: "#94A3B8", fontSize: "20px", cursor: "pointer" }}>✕</button>
              </div>

              {couponError && <div style={{ padding: "10px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", color: "#B91C1C", fontSize: "13px", marginBottom: "14px" }}>{couponError}</div>}
              {couponSuccess && <div style={{ padding: "10px", backgroundColor: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "8px", color: "#166534", fontSize: "13px", marginBottom: "14px" }}>{couponSuccess}</div>}

              <form onSubmit={handleCreateCoupon} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. EARLYBIRD26, VIP100"
                    style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", textTransform: "uppercase", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Discount Type</label>
                    <select
                      value={newDiscountType}
                      onChange={(e) => setNewDiscountType(e.target.value as any)}
                      style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Discount Value *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newDiscountValue}
                      onChange={(e) => setNewDiscountValue(Number(e.target.value))}
                      style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Description</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. 10% Discount on Registration"
                    style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Max Users / Uses Limit</label>
                    <input
                      type="number"
                      min={1}
                      value={newMaxUses}
                      onChange={(e) => setNewMaxUses(e.target.value)}
                      placeholder="e.g. 50 (Blank = Unlimited)"
                      style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Expiry Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newExpiryDate}
                      onChange={(e) => setNewExpiryDate(e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button type="button" disabled={isCreatingCoupon} onClick={() => setShowAddCouponModal(false)} style={{ padding: "9px 14px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "8px", color: "#475569", fontWeight: 600, cursor: isCreatingCoupon ? "not-allowed" : "pointer" }}>Cancel</button>
                  <button type="submit" disabled={isCreatingCoupon} style={{ padding: "9px 18px", backgroundColor: isCreatingCoupon ? "#93C5FD" : "#2563EB", border: "none", borderRadius: "8px", color: "#FFFFFF", fontWeight: 700, cursor: isCreatingCoupon ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {isCreatingCoupon ? "Saving..." : "Save Coupon"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: ADVERTISEMENT & BROADCAST CAMPAIGNS (BREVO INTEGRATION) */}
        {activeTab === "advertisement" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* 1. TOP METRIC STAT CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              
              {/* Card 1: Total Campaigns Sent */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Total Campaigns</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                    📢
                  </div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#0F172A" }}>
                  {campaigns.length}
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                  Historical broadcasts recorded
                </div>
              </div>

              {/* Card 2: Total Emails Delivered */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Emails Delivered</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                    ✉️
                  </div>
                </div>
                <div style={{ fontSize: "28px", fontWeight: 800, color: "#166534" }}>
                  {campaigns.reduce((acc, c) => acc + (c.successCount || 0), 0)}
                </div>
                <div style={{ fontSize: "12px", color: "#166534", marginTop: "4px", fontWeight: 600 }}>
                  Successfully reached inboxes
                </div>
              </div>

              {/* Card 3: Active Channel */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Primary Channel</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                    ⚡
                  </div>
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#92400E" }}>
                  {campaignChannel === "email" ? "Email (Brevo API)" : "SMS Broadcast"}
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                  Transactional & Batch Dispatch
                </div>
              </div>

              {/* Card 4: Brevo Provider Status */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "20px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Brevo Integration</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                    🟢
                  </div>
                </div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#166534" }}>
                  Connected
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                  info@flexathonrun.org
                </div>
              </div>

            </div>

            {/* 2. BROADCAST CHANNEL SELECTOR & BANNER */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "16px 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>Broadcast Channel:</span>
                
                <button
                  type="button"
                  onClick={() => setCampaignChannel("email")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: campaignChannel === "email" ? "#2563EB" : "#F1F5F9",
                    color: campaignChannel === "email" ? "#FFFFFF" : "#475569",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span>📧</span> Email Broadcast (Brevo API)
                </button>

                <button
                  type="button"
                  onClick={() => setCampaignChannel("sms")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: campaignChannel === "sms" ? "#2563EB" : "#F1F5F9",
                    color: campaignChannel === "sms" ? "#FFFFFF" : "#475569",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span>📱</span> SMS Broadcast (Brevo SMS API)
                  <span style={{ fontSize: "10px", backgroundColor: "#FEF3C7", color: "#92400E", padding: "1px 6px", borderRadius: "8px" }}>Ready</span>
                </button>
              </div>

              <div style={{ fontSize: "12px", color: "#64748B" }}>
                Verified Sender: <strong style={{ color: "#0F172A" }}>FLEXATHON 2026 &lt;info@flexathonrun.org&gt;</strong>
              </div>
            </div>

            {/* BROADCAST PROGRESS / NOTIFICATION BANNER */}
            {broadcastResult && (
              <div style={{
                padding: "16px 20px",
                borderRadius: "12px",
                backgroundColor: broadcastResult.success ? "#DCFCE7" : "#FEF2F2",
                border: `1px solid ${broadcastResult.success ? "#86EFAC" : "#FCA5A5"}`,
                color: broadcastResult.success ? "#166534" : "#991B1B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14px" }}>
                    {broadcastResult.success ? "🎉 Broadcast Completed Successfully" : "⚠️ Broadcast Error"}
                  </div>
                  <div style={{ fontSize: "13px", marginTop: "2px" }}>{broadcastResult.msg}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setBroadcastResult(null)}
                  style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontWeight: 800, fontSize: "16px" }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* 3. MAIN WORKSPACE (2-COLUMN GRID: RECIPIENTS & COMPOSER/PREVIEW) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "24px" }} className="admin-charts-grid">
              
              {/* ======================================================== */}
              {/* LEFT COLUMN: RECIPIENT IMPORTER & AUDIENCE MANAGEMENT   */}
              {/* ======================================================== */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div>
                      <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0" }}>
                        1. Import Audience & Recipients
                      </h2>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                        Import via Excel (.xlsx, .csv), Notepad (.txt), Copy-Paste, or Registered Runners
                      </p>
                    </div>
                  </div>

                  {/* Recipient Source Tabs */}
                  <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid #E2E8F0", paddingBottom: "10px", marginBottom: "16px", overflowX: "auto" }}>
                    <button
                      type="button"
                      onClick={() => setRecipientTab("excel")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: recipientTab === "excel" ? "#EFF6FF" : "transparent",
                        color: recipientTab === "excel" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: recipientTab === "excel" ? 700 : 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      📁 Excel / CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientTab("txt")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: recipientTab === "txt" ? "#EFF6FF" : "transparent",
                        color: recipientTab === "txt" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: recipientTab === "txt" ? 700 : 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      📄 Notepad (.txt)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientTab("paste")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: recipientTab === "paste" ? "#EFF6FF" : "transparent",
                        color: recipientTab === "paste" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: recipientTab === "paste" ? 700 : 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      📋 Copy-Paste
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientTab("runners")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: recipientTab === "runners" ? "#EFF6FF" : "transparent",
                        color: recipientTab === "runners" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: recipientTab === "runners" ? 700 : 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap"
                      }}
                    >
                      👥 Registered Runners
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientTab("contacts")}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: recipientTab === "contacts" ? "#EFF6FF" : "transparent",
                        color: recipientTab === "contacts" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: recipientTab === "contacts" ? 700 : 500,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <span>💾 Contact Book</span>
                      {savedContacts.length > 0 && (
                        <span style={{ fontSize: "10px", backgroundColor: "#DBEAFE", color: "#1D4ED8", padding: "1px 6px", borderRadius: "8px", fontWeight: 800 }}>
                          {savedContacts.length}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Tab 1: Excel / CSV Upload */}
                  {recipientTab === "excel" && (
                    <div>
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px dashed #CBD5E1",
                          borderRadius: "12px",
                          padding: "26px 16px",
                          backgroundColor: "#F8FAFC",
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = "#2563EB"}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = "#CBD5E1"}
                      >
                        <span style={{ fontSize: "32px", marginBottom: "8px" }}>📊</span>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                          Upload Excel Spreadsheet or CSV File
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                          Supports .xlsx, .xls, and .csv files with email & phone columns
                        </span>
                        <span style={{ marginTop: "12px", padding: "6px 16px", backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "12px", fontWeight: 700, borderRadius: "6px" }}>
                          Browse File
                        </span>
                        <input
                          type="file"
                          accept=".xlsx, .xls, .csv"
                          onChange={handleExcelUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  )}

                  {/* Tab 2: Notepad (.txt) Upload */}
                  {recipientTab === "txt" && (
                    <div>
                      <label
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px dashed #CBD5E1",
                          borderRadius: "12px",
                          padding: "26px 16px",
                          backgroundColor: "#F8FAFC",
                          cursor: "pointer",
                          transition: "all 0.15s ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = "#2563EB"}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = "#CBD5E1"}
                      >
                        <span style={{ fontSize: "32px", marginBottom: "8px" }}>📄</span>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                          Upload Notepad (.txt) File
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>
                          Supports comma-separated, space-separated, or newline emails
                        </span>
                        <span style={{ marginTop: "12px", padding: "6px 16px", backgroundColor: "#2563EB", color: "#FFFFFF", fontSize: "12px", fontWeight: 700, borderRadius: "6px" }}>
                          Browse Text File
                        </span>
                        <input
                          type="file"
                          accept=".txt"
                          onChange={handleTxtUpload}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  )}

                  {/* Tab 3: Copy-Paste Text Area */}
                  {recipientTab === "paste" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <textarea
                        rows={5}
                        placeholder="Paste list of emails here (e.g. runner1@gmail.com, runner2@yahoo.com or one per line)..."
                        value={rawPasteText}
                        onChange={(e) => handlePasteChange(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "13px",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          backgroundColor: "#F8FAFC",
                          boxSizing: "border-box",
                          fontFamily: "monospace"
                        }}
                      />
                      <button
                        type="button"
                        onClick={handlePasteProcess}
                        style={{
                          padding: "10px 16px",
                          backgroundColor: "#2563EB",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: "pointer",
                          alignSelf: "flex-end"
                        }}
                      >
                        ⚡ Process & Extract Emails
                      </button>
                    </div>
                  )}

                  {/* Tab 4: Registered Runners Shortcut */}
                  {recipientTab === "runners" && (
                    <div style={{ padding: "20px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", textAlign: "center" }}>
                      <div style={{ fontSize: "28px", marginBottom: "6px" }}>👥</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                        Broadcast to All Registered FLEXATHON Runners
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B", marginTop: "4px", marginBottom: "16px" }}>
                        Instantly pulls all confirmed participant emails directly from the database
                      </div>
                      <button
                        type="button"
                        onClick={handleLoadRegisteredRunners}
                        disabled={fileParsingLoading}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#166534",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: fileParsingLoading ? "not-allowed" : "pointer"
                        }}
                      >
                        {fileParsingLoading ? "Fetching..." : "📥 Load All Registered Runners"}
                      </button>
                    </div>
                  )}

                  {/* Tab 5: Load from Saved Contact Book */}
                  {recipientTab === "contacts" && (
                    <div style={{ padding: "18px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: "#1E293B" }}>
                            Load from Saved Contact Book
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748B" }}>
                            Choose an audience group tag or load all saved contacts ({savedContacts.length})
                          </div>
                        </div>
                      </div>

                      {savedContacts.length === 0 ? (
                        <div style={{ padding: "16px", textAlign: "center", color: "#64748B", fontSize: "13px" }}>
                          No contacts saved yet. Import an Excel, TXT, or paste contacts, then click &quot;Save to Contact Book&quot; below.
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => handleLoadFromSavedContacts("all")}
                            style={{
                              padding: "8px 14px",
                              backgroundColor: "#2563EB",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            📥 Load All Saved Contacts ({savedContacts.length})
                          </button>

                          {contactTags.map((tag) => {
                            const count = savedContacts.filter(c => c.tag === tag).length;
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => handleLoadFromSavedContacts(tag)}
                                style={{
                                  padding: "8px 14px",
                                  backgroundColor: "#EFF6FF",
                                  color: "#1D4ED8",
                                  border: "1px solid #BFDBFE",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  cursor: "pointer"
                                }}
                              >
                                🏷️ {tag} ({count})
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Loading / Status Message */}
                  {fileParsingMsg && (
                    <div style={{ marginTop: "12px", padding: "8px 12px", backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", fontSize: "12px", color: "#1E40AF" }}>
                      {fileParsingMsg}
                    </div>
                  )}

                  {/* Real-time Import Telemetry Stats */}
                  <div style={{ marginTop: "20px", padding: "14px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A" }}>
                        Cleaned Audience Summary
                      </span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {importedRecipients.length > 0 && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setShowSaveAudienceModal(true);
                                setAudienceSaveMsg(null);
                              }}
                              style={{
                                padding: "4px 10px",
                                backgroundColor: "#DCFCE7",
                                border: "1px solid #86EFAC",
                                borderRadius: "6px",
                                color: "#166534",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                              }}
                            >
                              💾 Save to Contact Library
                            </button>
                            <button
                              type="button"
                              onClick={handleClearRecipients}
                              style={{ background: "transparent", border: "none", color: "#DC2626", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                            >
                              Clear All
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", textAlign: "center" }}>
                      <div style={{ padding: "8px", backgroundColor: "#DCFCE7", borderRadius: "8px" }}>
                        <div style={{ fontSize: "18px", fontWeight: 800, color: "#166534" }}>{importStats.valid}</div>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "#166534" }}>Valid Emails</div>
                      </div>
                      <div style={{ padding: "8px", backgroundColor: "#EFF6FF", borderRadius: "8px" }}>
                        <div style={{ fontSize: "18px", fontWeight: 800, color: "#1D4ED8" }}>{importStats.duplicates}</div>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "#1D4ED8" }}>Duplicates Removed</div>
                      </div>
                      <div style={{ padding: "8px", backgroundColor: "#FEF3C7", borderRadius: "8px" }}>
                        <div style={{ fontSize: "18px", fontWeight: 800, color: "#92400E" }}>{importStats.invalid}</div>
                        <div style={{ fontSize: "11px", fontWeight: 600, color: "#92400E" }}>Invalid Skipped</div>
                      </div>
                    </div>
                  </div>

                  {/* Recipient Search & List Preview */}
                  {importedRecipients.length > 0 ? (
                    <div style={{ marginTop: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569" }}>
                          Recipient List ({importedRecipients.length}):
                        </span>
                        <input
                          type="text"
                          placeholder="Search in loaded emails..."
                          value={recipientSearch}
                          onChange={(e) => setRecipientSearch(e.target.value)}
                          style={{
                            padding: "4px 10px",
                            fontSize: "12px",
                            borderRadius: "6px",
                            border: "1px solid #CBD5E1"
                          }}
                        />
                      </div>

                      <div style={{ maxHeight: "220px", overflowY: "auto", border: "1px solid #E2E8F0", borderRadius: "8px" }}>
                        {importedRecipients
                          .filter(r => !recipientSearch || r.email.toLowerCase().includes(recipientSearch.toLowerCase()) || (r.name && r.name.toLowerCase().includes(recipientSearch.toLowerCase())))
                          .slice(0, 100)
                          .map((r, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "8px 12px",
                                borderBottom: "1px solid #F1F5F9",
                                fontSize: "12px",
                                backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8FAFC"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ color: "#2563EB", fontWeight: 700 }}>•</span>
                                <div>
                                  <strong style={{ color: "#0F172A" }}>{r.email}</strong>
                                  {r.name && <span style={{ color: "#64748B", marginLeft: "6px" }}>({r.name})</span>}
                                </div>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "10px", color: "#94A3B8" }}>{r.source}</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRecipient(r.email)}
                                  style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "14px", padding: 0 }}
                                  title="Remove recipient"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                      {importedRecipients.length > 100 && (
                        <div style={{ fontSize: "11px", color: "#64748B", textAlign: "center", marginTop: "6px" }}>
                          Showing first 100 of {importedRecipients.length} recipients
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ marginTop: "16px", padding: "18px 14px", textAlign: "center", border: "1px dashed #CBD5E1", borderRadius: "10px", backgroundColor: "#F8FAFC", color: "#64748B" }}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>📬</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B" }}>No Recipients Loaded Yet</div>
                      <div style={{ fontSize: "11px", marginTop: "2px" }}>
                        Upload an Excel/CSV file, Notepad (.txt), or paste emails above to populate your broadcast audience.
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* ======================================================== */}
              {/* RIGHT COLUMN: CAMPAIGN COMPOSER & VISUAL PREVIEW         */}
              {/* ======================================================== */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div>
                      <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0" }}>
                        2. Campaign Composer & Templates
                      </h2>
                      <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                        Select a high-converting template or compose custom HTML
                      </p>
                    </div>
                  </div>

                  {/* Template Presets Selector */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "8px", marginBottom: "16px" }}>
                    {[
                      { id: "announcement", label: "🏷️ Announcement" },
                      { id: "promo", label: "🎟️ Promo Offer" },
                      { id: "raceday", label: "📍 Race Day Guide" },
                      { id: "custom", label: "✍️ Custom Form" },
                      { id: "raw_html", label: "💻 Raw HTML Code" }
                    ].map((tmpl) => (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => handleTemplateSelect(tmpl.id as any)}
                        style={{
                          padding: "8px 8px",
                          borderRadius: "8px",
                          border: campaignTemplate === tmpl.id ? "2px solid #2563EB" : "1px solid #E2E8F0",
                          backgroundColor: campaignTemplate === tmpl.id ? "#EFF6FF" : "#F8FAFC",
                          color: campaignTemplate === tmpl.id ? "#1D4ED8" : "#475569",
                          fontSize: "12px",
                          fontWeight: campaignTemplate === tmpl.id ? 800 : 600,
                          cursor: "pointer",
                          textAlign: "center",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>

                  {/* Mode Toggle Switch: Visual Form vs Raw HTML */}
                  <div style={{ display: "flex", gap: "4px", backgroundColor: "#F1F5F9", padding: "4px", borderRadius: "10px", marginBottom: "16px" }}>
                    <button
                      type="button"
                      onClick={() => setComposerMode("visual")}
                      style={{
                        flex: 1,
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: composerMode === "visual" ? "#FFFFFF" : "transparent",
                        color: composerMode === "visual" ? "#0F172A" : "#64748B",
                        fontSize: "12px",
                        fontWeight: composerMode === "visual" ? 700 : 500,
                        boxShadow: composerMode === "visual" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                        cursor: "pointer"
                      }}
                    >
                      🎨 Visual Form Builder
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setComposerMode("html");
                        if (!customRawHtml) {
                          handleConvertVisualToRawHtml();
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: composerMode === "html" ? "#FFFFFF" : "transparent",
                        color: composerMode === "html" ? "#2563EB" : "#64748B",
                        fontSize: "12px",
                        fontWeight: composerMode === "html" ? 700 : 500,
                        boxShadow: composerMode === "html" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <span>💻 Custom Raw HTML Code</span>
                      <span style={{ fontSize: "10px", backgroundColor: "#DBEAFE", color: "#1D4ED8", padding: "1px 6px", borderRadius: "8px", fontWeight: 800 }}>PRO</span>
                    </button>
                  </div>

                  {/* ======================================================== */}
                  {/* MODE A: RAW CUSTOM HTML CODE EDITOR                     */}
                  {/* ======================================================== */}
                  {composerMode === "html" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                          Email Subject Line *
                        </label>
                        <input
                          type="text"
                          required
                          value={campaignSubject}
                          onChange={(e) => setCampaignSubject(e.target.value)}
                          placeholder="e.g. Special Announcement from FLEXATHON 2026"
                          style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>
                            Paste / Write Custom HTML Code *
                          </label>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            <button
                              type="button"
                              onClick={handleInsertLogoTag}
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "#DCFCE7",
                                border: "1px solid #86EFAC",
                                borderRadius: "6px",
                                color: "#166534",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                              title="Inserts {{LOGO}} tag which loads the logo from the logo folder"
                            >
                              🖼️ Insert Logo Tag (&#123;&#123;LOGO&#125;&#125;)
                            </button>
                            <button
                              type="button"
                              onClick={handleInsertLogoUrl}
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "#F0FDF4",
                                border: "1px solid #BBF7D0",
                                borderRadius: "6px",
                                color: "#15803D",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                              title="Inserts official logo URL from logo folder"
                            >
                              🔗 Logo URL
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setCustomRawHtml(DEFAULT_FLEXATHON_RAW_TEMPLATE);
                                setCampaignSubject("🏃 FLEXATHON 2026 – The Global Goals Run | Hyderabad Edition");
                              }}
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "#FEF3C7",
                                border: "1px solid #FDE68A",
                                borderRadius: "6px",
                                color: "#92400E",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                              title="Loads the official FLEXATHON 2026 Global Goals Run template"
                            >
                              📋 Load Default Template
                            </button>
                            <button
                              type="button"
                              onClick={handleConvertVisualToRawHtml}
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "#EFF6FF",
                                border: "1px solid #BFDBFE",
                                borderRadius: "6px",
                                color: "#1D4ED8",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                            >
                              🔄 Load Form as HTML
                            </button>
                            <button
                              type="button"
                              onClick={() => setCustomRawHtml("")}
                              style={{
                                padding: "3px 8px",
                                backgroundColor: "#F1F5F9",
                                border: "none",
                                borderRadius: "6px",
                                color: "#64748B",
                                fontSize: "11px",
                                fontWeight: 600,
                                cursor: "pointer"
                              }}
                            >
                              Clear
                            </button>
                          </div>
                        </div>

                        <textarea
                          rows={14}
                          required
                          value={customRawHtml}
                          onChange={(e) => handleCustomHtmlChange(e.target.value)}
                          placeholder="<!DOCTYPE html><html><head></head><body><div style='text-align:center;'>{{LOGO}}</div><h1>Your Custom HTML Email</h1></body></html>"
                          spellCheck={false}
                          style={{
                            width: "100%",
                            padding: "14px",
                            backgroundColor: "#0F172A",
                            color: "#38BDF8",
                            border: "1px solid #334155",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                            lineHeight: "1.5",
                            boxSizing: "border-box",
                            tabSize: 2,
                            resize: "vertical"
                          }}
                        />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginTop: "6px", fontSize: "11px", color: "#64748B" }}>
                          <div>💡 <strong>Logo Auto-Loading:</strong> Place <code>&#123;&#123;LOGO&#125;&#125;</code>, <code>&#123;&#123;LOGO_URL&#125;&#125;</code>, <code>&lt;div id=&quot;logo-space&quot;&gt;&lt;/div&gt;</code>, <code>&lt;!-- LOGO --&gt;</code>, or <code>src=&quot;logo.png&quot;</code> anywhere in your code — it will automatically load from the logo folder (<code>/logo/logo.png</code>).</div>
                          <div>💡 Paste any custom HTML from Canva, Stripo, Mailchimp, or hand-coded templates. The live preview updates in real-time.</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ======================================================== */
                    /* MODE B: VISUAL FORM BUILDER                              */
                    /* ======================================================== */
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                          Email Subject Line *
                        </label>
                        <input
                          type="text"
                          required
                          value={campaignSubject}
                          onChange={(e) => setCampaignSubject(e.target.value)}
                          placeholder="e.g. 🏃 Get Ready for FLEXATHON 2026 — Official Runner Announcement"
                          style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                          Inbox Preview Preheader Text
                        </label>
                        <input
                          type="text"
                          value={campaignPreheader}
                          onChange={(e) => setCampaignPreheader(e.target.value)}
                          placeholder="Brief summary shown next to subject in runner's inbox..."
                          style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                          Hero Banner Headline
                        </label>
                        <input
                          type="text"
                          value={campaignHeadline}
                          onChange={(e) => setCampaignHeadline(e.target.value)}
                          placeholder="Main title on the email hero banner..."
                          style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      {/* Promo Box Settings (if promo template) */}
                      {campaignTemplate === "promo" && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px", backgroundColor: "#FEF2F2", borderRadius: "8px", border: "1px solid #FCA5A5" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#991B1B", marginBottom: "4px" }}>
                              Promo Coupon Code
                            </label>
                            <input
                              type="text"
                              value={campaignPromoCode}
                              onChange={(e) => setCampaignPromoCode(e.target.value.toUpperCase())}
                              placeholder="e.g. FLEX2026"
                              style={{ width: "100%", padding: "8px 10px", backgroundColor: "#FFFFFF", border: "1px solid #F87171", borderRadius: "6px", fontSize: "13px", fontWeight: 800, boxSizing: "border-box" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#991B1B", marginBottom: "4px" }}>
                              Discount Badge Text
                            </label>
                            <input
                              type="text"
                              value={campaignPromoDiscount}
                              onChange={(e) => setCampaignPromoDiscount(e.target.value)}
                              placeholder="e.g. 20% OFF"
                              style={{ width: "100%", padding: "8px 10px", backgroundColor: "#FFFFFF", border: "1px solid #F87171", borderRadius: "6px", fontSize: "13px", fontWeight: 700, boxSizing: "border-box" }}
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                          Announcement Message Body *
                        </label>
                        <textarea
                          rows={6}
                          required
                          value={campaignBody}
                          onChange={(e) => setCampaignBody(e.target.value)}
                          placeholder="Write your email body paragraphs here..."
                          style={{ width: "100%", padding: "12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", lineHeight: "1.6", boxSizing: "border-box" }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            CTA Button Text
                          </label>
                          <input
                            type="text"
                            value={campaignCtaText}
                            onChange={(e) => setCampaignCtaText(e.target.value)}
                            placeholder="e.g. Register for FLEXATHON 2026"
                            style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                            CTA Button URL
                          </label>
                          <input
                            type="text"
                            value={campaignCtaUrl}
                            onChange={(e) => setCampaignCtaUrl(e.target.value)}
                            placeholder="https://flexathonrun.org/registeration"
                            style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", boxSizing: "border-box" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* FILE ATTACHMENTS PROVISION                               */}
                  {/* ======================================================== */}
                  <div style={{
                    marginTop: "18px",
                    padding: "16px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>📎</span>
                        <div>
                          <label style={{ fontSize: "13px", fontWeight: 700, color: "#1E293B", margin: 0, display: "block" }}>
                            Email File Attachments (Optional)
                          </label>
                          <span style={{ fontSize: "11px", color: "#64748B" }}>
                            Attach brochures, route maps, schedule PDFs, images or banners (Max 5MB each, 10MB total)
                          </span>
                        </div>
                      </div>

                      {campaignAttachments.length > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563EB", backgroundColor: "#EFF6FF", padding: "3px 8px", borderRadius: "12px", border: "1px solid #BFDBFE" }}>
                            {campaignAttachments.length} file{campaignAttachments.length === 1 ? "" : "s"} ({formatFileSize(campaignAttachments.reduce((s, a) => s + a.size, 0))})
                          </span>
                          <button
                            type="button"
                            onClick={handleClearAttachments}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#DC2626",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                              padding: "2px 6px"
                            }}
                          >
                            Remove All
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Upload Input Button / Drop Zone */}
                    <div style={{
                      position: "relative",
                      border: "2px dashed #CBD5E1",
                      borderRadius: "10px",
                      padding: "14px 18px",
                      backgroundColor: "#FFFFFF",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.csv"
                        onChange={handleAttachmentUpload}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                          zIndex: 2
                        }}
                      />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", pointerEvents: "none" }}>
                        <span style={{ fontSize: "20px" }}>📁</span>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "#2563EB" }}>
                          Click to Browse or Drag & Drop Files to Attach
                        </div>
                        <div style={{ fontSize: "11px", color: "#94A3B8" }}>
                          Supports PDF, Images, Word, Excel, PowerPoint, Text & ZIP
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {attachmentError && (
                      <div style={{
                        marginTop: "8px",
                        padding: "8px 12px",
                        backgroundColor: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        borderRadius: "6px",
                        color: "#DC2626",
                        fontSize: "12px",
                        fontWeight: 600
                      }}>
                        ⚠️ {attachmentError}
                      </div>
                    )}

                    {/* Attached Files List */}
                    {campaignAttachments.length > 0 && (
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {campaignAttachments.map((file, idx) => {
                          const isPdf = file.name.toLowerCase().endsWith(".pdf");
                          const isImg = /\.(png|jpe?g|gif|webp)$/i.test(file.name);
                          const isDoc = /\.(docx?|txt)$/i.test(file.name);
                          const isSheet = /\.(xlsx?|csv)$/i.test(file.name);
                          const icon = isPdf ? "📄" : isImg ? "🖼️" : isDoc ? "📑" : isSheet ? "📊" : "📎";

                          return (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 12px",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                borderRadius: "8px",
                                fontSize: "12px"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                <span style={{ fontSize: "16px" }}>{icon}</span>
                                <span style={{ fontWeight: 600, color: "#1E293B" }}>{file.name}</span>
                                <span style={{ fontSize: "11px", color: "#64748B" }}>({formatFileSize(file.size)})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachment(idx)}
                                title={`Remove ${file.name}`}
                                style={{
                                  padding: "4px 8px",
                                  backgroundColor: "#FEE2E2",
                                  border: "1px solid #FCA5A5",
                                  borderRadius: "6px",
                                  color: "#DC2626",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  flexShrink: 0
                                }}
                              >
                                ✕ Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </div>

                {/* LIVE PREVIEW & TEST SEND CONTAINER */}
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  
                  {/* TARGET AUDIENCE STATUS BAR */}
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    backgroundColor: importedRecipients.length > 0 ? "#F0FDF4" : "#FEF3C7",
                    border: `1px solid ${importedRecipients.length > 0 ? "#BBF7D0" : "#FDE68A"}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>{importedRecipients.length > 0 ? "👥" : "⚠️"}</span>
                        <div>
                          <strong style={{ fontSize: "13px", color: importedRecipients.length > 0 ? "#166534" : "#92400E" }}>
                            Target Broadcast Audience: {importedRecipients.length} Recipient{importedRecipients.length === 1 ? "" : "s"}
                          </strong>
                          <div style={{ fontSize: "11px", color: importedRecipients.length > 0 ? "#15803D" : "#B45309" }}>
                            {importedRecipients.length > 0
                              ? "These email IDs will receive this exact campaign message upon launch."
                              : "No recipients loaded yet. Select an Excel, Notepad, or Paste list on the left to add recipients."}
                          </div>
                        </div>
                      </div>

                      {importedRecipients.length === 0 ? (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={handleLoadRegisteredRunners}
                            disabled={fileParsingLoading}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#166534",
                              color: "#FFFFFF",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            👥 Load Registered Runners
                          </button>
                          {savedContacts.length > 0 && (
                            <button
                              type="button"
                              onClick={() => handleLoadFromSavedContacts("all")}
                              style={{
                                padding: "5px 10px",
                                backgroundColor: "#2563EB",
                                color: "#FFFFFF",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                            >
                              💾 Load Contact Book ({savedContacts.length})
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleClearRecipients}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#DC2626",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer"
                          }}
                        >
                          Clear List
                        </button>
                      )}
                    </div>

                    {/* Quick Preview Chips of Loaded Emails */}
                    {importedRecipients.length > 0 && (
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        maxHeight: "80px",
                        overflowY: "auto",
                        paddingTop: "6px",
                        borderTop: "1px solid #DCFCE7"
                      }}>
                        {importedRecipients.slice(0, 20).map((r, idx) => (
                          <span
                            key={idx}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              backgroundColor: "#DCFCE7",
                              color: "#166534",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: 600
                            }}
                          >
                            {r.email}
                            <span
                              onClick={() => handleDeleteRecipient(r.email)}
                              style={{ cursor: "pointer", color: "#991B1B", fontWeight: "bold", marginLeft: "2px" }}
                              title="Remove"
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        {importedRecipients.length > 20 && (
                          <span style={{ fontSize: "11px", color: "#166534", fontWeight: 700, alignSelf: "center" }}>
                            +{importedRecipients.length - 20} more...
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                        3. Live Visual Preview
                      </h2>
                    </div>
                    
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice("desktop")}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: previewDevice === "desktop" ? "#2563EB" : "#F1F5F9",
                          color: previewDevice === "desktop" ? "#FFFFFF" : "#64748B",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                      >
                        💻 Desktop
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewDevice("mobile")}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "none",
                          backgroundColor: previewDevice === "mobile" ? "#2563EB" : "#F1F5F9",
                          color: previewDevice === "mobile" ? "#FFFFFF" : "#64748B",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                      >
                        📱 Mobile
                      </button>
                    </div>
                  </div>

                  {/* HTML Iframe Preview Container */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#F1F5F9",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0"
                  }}>
                    <iframe
                      srcDoc={buildEmailHtml()}
                      title="Email Preview"
                      style={{
                        width: previewDevice === "mobile" ? "375px" : "100%",
                        height: "440px",
                        border: "1px solid #CBD5E1",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                      }}
                    />
                  </div>

                  {/* Test Send & Launch Broadcast Action Bar */}
                  <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    
                    {/* Attachments indicator chip if files attached */}
                    {campaignAttachments.length > 0 && (
                      <div style={{
                        padding: "8px 12px",
                        backgroundColor: "#EFF6FF",
                        border: "1px solid #BFDBFE",
                        borderRadius: "8px",
                        fontSize: "12px",
                        color: "#1E40AF",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexWrap: "wrap"
                      }}>
                        <span>📎 <strong>{campaignAttachments.length} Attachment{campaignAttachments.length === 1 ? "" : "s"} will be sent with this email:</strong></span>
                        <span style={{ fontWeight: 600 }}>{campaignAttachments.map(a => a.name).join(", ")}</span>
                      </div>
                    )}

                    {/* Test Email Box */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <input
                        type="email"
                        placeholder="Enter test email (e.g. admin@example.com)..."
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          fontSize: "13px",
                          borderRadius: "8px",
                          border: "1px solid #CBD5E1",
                          backgroundColor: "#F8FAFC"
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleSendTestEmail}
                        disabled={isSendingTest}
                        style={{
                          padding: "10px 18px",
                          backgroundColor: "#475569",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: isSendingTest ? "not-allowed" : "pointer",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {isSendingTest ? "Sending Test..." : "🧪 Send Test Email"}
                      </button>
                    </div>

                    {testSendResult && (
                      <div style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        backgroundColor: testSendResult.success ? "#DCFCE7" : "#FEF2F2",
                        color: testSendResult.success ? "#166534" : "#991B1B"
                      }}>
                        {testSendResult.msg}
                      </div>
                    )}

                    <div style={{ height: "1px", backgroundColor: "#E2E8F0", margin: "4px 0" }} />

                    {/* MAIN LAUNCH BROADCAST BUTTON */}
                    <button
                      type="button"
                      onClick={() => setShowConfirmBroadcastModal(true)}
                      disabled={isBroadcasting || importedRecipients.length === 0}
                      style={{
                        padding: "14px 24px",
                        backgroundColor: importedRecipients.length > 0 ? "#DC2626" : "#CBD5E1",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: 800,
                        cursor: importedRecipients.length > 0 && !isBroadcasting ? "pointer" : "not-allowed",
                        boxShadow: importedRecipients.length > 0 ? "0 4px 14px rgba(220, 38, 38, 0.3)" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px"
                      }}
                    >
                      <span>🚀</span>
                      {isBroadcasting
                        ? "Broadcasting via Brevo API..."
                        : `Launch Broadcast to ${importedRecipients.length} Recipient${importedRecipients.length === 1 ? "" : "s"}`}
                    </button>

                  </div>

                </div>

              </div>

            </div>

            {/* ======================================================== */}
            {/* 4. CAMPAIGN HISTORY & DELIVERY LOGS TABLE                */}
            {/* ======================================================== */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0" }}>
                    Historical Broadcasts & Delivery Logs
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                    Track previous advertisement campaigns and deliverability metrics
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchCampaigns}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#F1F5F9",
                    color: "#475569",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  🔄 Refresh Logs
                </button>
              </div>

              {loadingCampaigns ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748B", fontSize: "14px" }}>
                  Loading campaign history...
                </div>
              ) : campaigns.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#64748B", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px dashed #E2E8F0" }}>
                  <div style={{ fontSize: "28px", marginBottom: "6px" }}>📬</div>
                  <div style={{ fontWeight: 700, color: "#1E293B" }}>No campaigns dispatched yet</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    Import an audience list above to send your first bulk announcement or discount promo.
                  </div>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #E2E8F0", color: "#64748B", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        <th style={{ padding: "12px 14px" }}>Date & Time</th>
                        <th style={{ padding: "12px 14px" }}>Subject</th>
                        <th style={{ padding: "12px 14px" }}>Channel</th>
                        <th style={{ padding: "12px 14px" }}>Recipients</th>
                        <th style={{ padding: "12px 14px" }}>Delivered / Failed</th>
                        <th style={{ padding: "12px 14px" }}>Status</th>
                        <th style={{ padding: "12px 14px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((cmp) => (
                        <tr key={cmp.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                          <td style={{ padding: "12px 14px", color: "#475569" }}>
                            {formatDateTime(cmp.timestamp)}
                          </td>
                          <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0F172A", maxWidth: "260px" }}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {cmp.subject}
                            </div>
                            <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>
                              {cmp.templateName || "Announcement"}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: 700,
                              backgroundColor: cmp.channel === "sms" ? "#FEF3C7" : "#EFF6FF",
                              color: cmp.channel === "sms" ? "#92400E" : "#1D4ED8"
                            }}>
                              {cmp.channel === "sms" ? "📱 SMS" : "📧 Email"}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0F172A" }}>
                            {cmp.totalRecipients || 0}
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{ color: "#166534", fontWeight: 700 }}>{cmp.successCount || 0}</span>
                            {" / "}
                            <span style={{ color: cmp.failedCount > 0 ? "#DC2626" : "#64748B" }}>{cmp.failedCount || 0}</span>
                          </td>
                          <td style={{ padding: "12px 14px" }}>
                            <span style={{
                              padding: "3px 8px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: 800,
                              backgroundColor: cmp.status === "COMPLETED" ? "#DCFCE7" : cmp.status === "PARTIAL" ? "#FEF3C7" : "#FEE2E2",
                              color: cmp.status === "COMPLETED" ? "#166534" : cmp.status === "PARTIAL" ? "#92400E" : "#991B1B"
                            }}>
                              {cmp.status}
                            </span>
                          </td>
                          <td style={{ padding: "12px 14px", textAlign: "right" }}>
                            <button
                              type="button"
                              onClick={() => setSelectedCampaignDetail(cmp)}
                              style={{
                                padding: "4px 10px",
                                backgroundColor: "#F1F5F9",
                                color: "#2563EB",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer"
                              }}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* 5. SAVED AUDIENCE & CONTACT DIRECTORY */}
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>📇 Saved Audience & Contact Directory</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, backgroundColor: "#EFF6FF", color: "#1D4ED8", padding: "2px 8px", borderRadius: "12px" }}>
                      {savedContacts.length} Contacts Saved
                    </span>
                  </h2>
                  <p style={{ fontSize: "12px", color: "#64748B", margin: 0 }}>
                    Manage saved contacts, phone numbers, and custom audience groups for one-click reuse in future marketing broadcasts.
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddContactModal(true)}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#2563EB",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span>➕</span> Add New Contact
                  </button>

                  <button
                    type="button"
                    onClick={handleExportContactsCsv}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "#F1F5F9",
                      color: "#334155",
                      border: "1px solid #CBD5E1",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span>📥</span> Export CSV
                  </button>

                  {savedContacts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleLoadFromSavedContacts(contactTagFilter)}
                      style={{
                        padding: "8px 14px",
                        backgroundColor: "#166534",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span>⚡</span> Load into Campaign
                    </button>
                  )}
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "16px", backgroundColor: "#F8FAFC", padding: "12px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748B" }}>Group Tag:</span>
                  <button
                    type="button"
                    onClick={() => setContactTagFilter("all")}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: 700,
                      border: "none",
                      backgroundColor: contactTagFilter === "all" ? "#2563EB" : "#E2E8F0",
                      color: contactTagFilter === "all" ? "#FFFFFF" : "#475569",
                      cursor: "pointer"
                    }}
                  >
                    All ({savedContacts.length})
                  </button>
                  {contactTags.map(tag => {
                    const tagCount = savedContacts.filter(c => c.tag === tag).length;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setContactTagFilter(tag)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: 700,
                          border: "none",
                          backgroundColor: contactTagFilter === tag ? "#2563EB" : "#E2E8F0",
                          color: contactTagFilter === tag ? "#FFFFFF" : "#475569",
                          cursor: "pointer"
                        }}
                      >
                        {tag} ({tagCount})
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      borderRadius: "6px",
                      border: "1px solid #CBD5E1",
                      backgroundColor: "#FFFFFF",
                      minWidth: "220px"
                    }}
                  />
                  {contactSearch && (
                    <button
                      type="button"
                      onClick={() => setContactSearch("")}
                      style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Contacts Table */}
              {loadingContacts ? (
                <div style={{ padding: "30px", textAlign: "center", color: "#64748B" }}>
                  Loading contacts directory...
                </div>
              ) : savedContacts.length === 0 ? (
                <div style={{ padding: "36px", textAlign: "center", color: "#64748B", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px dashed #CBD5E1" }}>
                  <div style={{ fontSize: "28px", marginBottom: "6px" }}>📇</div>
                  <div style={{ fontWeight: 700, color: "#1E293B" }}>No contacts in directory yet</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    Import an audience list or click &quot;Add New Contact&quot; to save leads and runners for future campaigns.
                  </div>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #E2E8F0", color: "#64748B", textTransform: "uppercase", fontSize: "11px" }}>
                        <th style={{ padding: "10px 12px" }}>Name</th>
                        <th style={{ padding: "10px 12px" }}>Email</th>
                        <th style={{ padding: "10px 12px" }}>Phone</th>
                        <th style={{ padding: "10px 12px" }}>Group / Tag</th>
                        <th style={{ padding: "10px 12px" }}>Source</th>
                        <th style={{ padding: "10px 12px" }}>Date Added</th>
                        <th style={{ padding: "10px 12px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedContacts
                        .filter(c => {
                          const matchesTag = contactTagFilter === "all" || (c.tag || "").toLowerCase() === contactTagFilter.toLowerCase();
                          const matchesSearch = !contactSearch || 
                            (c.email || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
                            (c.name || "").toLowerCase().includes(contactSearch.toLowerCase()) ||
                            (c.phone || "").includes(contactSearch) ||
                            (c.tag || "").toLowerCase().includes(contactSearch.toLowerCase());
                          return matchesTag && matchesSearch;
                        })
                        .map(c => (
                          <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0F172A" }}>
                              {c.name || "-"}
                            </td>
                            <td style={{ padding: "10px 12px", color: "#2563EB", fontFamily: "monospace" }}>
                              {c.email}
                            </td>
                            <td style={{ padding: "10px 12px", color: "#475569" }}>
                              {c.phone || "-"}
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              <span style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: 700, backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
                                {c.tag || "General"}
                              </span>
                            </td>
                            <td style={{ padding: "10px 12px", color: "#64748B", fontSize: "11px" }}>
                              {c.source || "Import"}
                            </td>
                            <td style={{ padding: "10px 12px", color: "#64748B", fontSize: "11px" }}>
                              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}
                            </td>
                            <td style={{ padding: "10px 12px", textAlign: "right" }}>
                              <button
                                type="button"
                                onClick={() => handleDeleteSavedContact(c.id)}
                                style={{
                                  padding: "3px 8px",
                                  backgroundColor: "#FEE2E2",
                                  color: "#DC2626",
                                  border: "none",
                                  borderRadius: "4px",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  cursor: "pointer"
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* CONFIRM BROADCAST MODAL */}
        {showConfirmBroadcastModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "480px", padding: "28px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A"
            }}>
              <div style={{ fontSize: "32px", textAlign: "center", marginBottom: "10px" }}>🚀</div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, textAlign: "center", margin: "0 0 6px 0" }}>
                Confirm Campaign Broadcast
              </h2>
              <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", margin: "0 0 20px 0" }}>
                You are about to launch a broadcast to <strong>{importedRecipients.length} recipients</strong> via Brevo API.
              </p>

              <div style={{ backgroundColor: "#F8FAFC", padding: "14px", borderRadius: "10px", border: "1px solid #E2E8F0", marginBottom: "20px", fontSize: "13px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div><strong>Subject:</strong> {campaignSubject}</div>
                <div><strong>Template:</strong> {campaignTemplate}</div>
                <div><strong>Total Recipients:</strong> {importedRecipients.length} valid email addresses</div>
                <div><strong>Sender:</strong> FLEXATHON 2026 &lt;info@flexathonrun.org&gt;</div>
                <div><strong>Attachments:</strong> {campaignAttachments.length > 0 ? `${campaignAttachments.length} file(s) (${campaignAttachments.map(a => a.name).join(", ")})` : "None"}</div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowConfirmBroadcastModal(false)}
                  style={{ padding: "10px 16px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "8px", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLaunchBroadcast}
                  style={{ padding: "10px 20px", backgroundColor: "#DC2626", border: "none", borderRadius: "8px", color: "#FFFFFF", fontWeight: 800, cursor: "pointer" }}
                >
                  Confirm & Send Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SAVE AUDIENCE TO CONTACT BOOK MODAL */}
        {showSaveAudienceModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "440px", padding: "28px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A"
            }}>
              <div style={{ fontSize: "32px", textAlign: "center", marginBottom: "10px" }}>💾</div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, textAlign: "center", margin: "0 0 6px 0" }}>
                Save List to Contact Book
              </h2>
              <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", margin: "0 0 20px 0" }}>
                Save <strong>{importedRecipients.length} valid contacts</strong> into your persistent directory for future campaigns.
              </p>

              {audienceSaveMsg && (
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginBottom: "16px",
                  backgroundColor: audienceSaveMsg.success ? "#DCFCE7" : "#FEF2F2",
                  color: audienceSaveMsg.success ? "#166534" : "#991B1B",
                  border: `1px solid ${audienceSaveMsg.success ? "#86EFAC" : "#FCA5A5"}`
                }}>
                  {audienceSaveMsg.text}
                </div>
              )}

              <form onSubmit={handleSaveImportedToContacts} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Audience Group / Tag Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Munich 2026 Leads, Excel July Blast, Corporate Runners"
                    value={saveAudienceTag}
                    onChange={(e) => setSaveAudienceTag(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      backgroundColor: "#F8FAFC",
                      fontSize: "13px",
                      boxSizing: "border-box"
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#64748B", marginTop: "4px", display: "block" }}>
                    Tagging allows you to filter and blast this exact group in 1-click later.
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSaveAudienceModal(false);
                      setAudienceSaveMsg(null);
                    }}
                    style={{ padding: "10px 16px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "8px", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingAudienceLoading}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#2563EB",
                      border: "none",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      cursor: savingAudienceLoading ? "not-allowed" : "pointer"
                    }}
                  >
                    {savingAudienceLoading ? "Saving..." : "💾 Save Contacts"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD SINGLE CONTACT MODAL */}
        {showAddContactModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "440px", padding: "28px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>
                  Add Contact to Directory
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  style={{ background: "transparent", border: "none", color: "#64748B", fontSize: "18px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSingleContact} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="runner@example.com"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", backgroundColor: "#F8FAFC", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", backgroundColor: "#F8FAFC", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", backgroundColor: "#F8FAFC", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Group Tag / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VIP, Corporate, Inquiry Lead"
                    value={newContactTag}
                    onChange={(e) => setNewContactTag(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #CBD5E1", backgroundColor: "#F8FAFC", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddContactModal(false)}
                    style={{ padding: "10px 16px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "8px", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 20px", backgroundColor: "#2563EB", border: "none", borderRadius: "8px", color: "#FFFFFF", fontWeight: 800, cursor: "pointer" }}
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CAMPAIGN DETAIL MODAL */}
        {selectedCampaignDetail && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "560px", padding: "28px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A", maxHeight: "85vh", overflowY: "auto"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>
                  Campaign Broadcast Details
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetail(null)}
                  style={{ background: "transparent", border: "none", color: "#64748B", fontSize: "18px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
                <div><strong>Subject:</strong> {selectedCampaignDetail.subject}</div>
                <div><strong>Timestamp:</strong> {formatDateTime(selectedCampaignDetail.timestamp)}</div>
                <div><strong>Channel:</strong> {selectedCampaignDetail.channel?.toUpperCase()}</div>
                <div><strong>Template:</strong> {selectedCampaignDetail.templateName}</div>
                <div><strong>Sender:</strong> {selectedCampaignDetail.senderName} &lt;{selectedCampaignDetail.senderEmail}&gt;</div>
                <div><strong>Attachments:</strong> {selectedCampaignDetail.attachmentNames && selectedCampaignDetail.attachmentNames.length > 0 ? `${selectedCampaignDetail.attachmentNames.length} file(s) (${selectedCampaignDetail.attachmentNames.join(", ")})` : "None"}</div>
                
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <div style={{ flex: 1, padding: "10px", backgroundColor: "#DCFCE7", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#166534" }}>{selectedCampaignDetail.successCount || 0}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#166534" }}>Delivered</div>
                  </div>
                  <div style={{ flex: 1, padding: "10px", backgroundColor: "#FEE2E2", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#991B1B" }}>{selectedCampaignDetail.failedCount || 0}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#991B1B" }}>Failed</div>
                  </div>
                  <div style={{ flex: 1, padding: "10px", backgroundColor: "#F1F5F9", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>{selectedCampaignDetail.totalRecipients || 0}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569" }}>Total</div>
                  </div>
                </div>

                {selectedCampaignDetail.recipientsSample && selectedCampaignDetail.recipientsSample.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Sample Recipients:</div>
                    <div style={{ padding: "10px", backgroundColor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0", fontFamily: "monospace", fontSize: "12px" }}>
                      {selectedCampaignDetail.recipientsSample.join(", ")}
                    </div>
                  </div>
                )}

                {selectedCampaignDetail.errors && selectedCampaignDetail.errors.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontWeight: 700, color: "#991B1B", marginBottom: "4px" }}>Delivery Exceptions / Rejections:</div>
                    <div style={{ padding: "10px", backgroundColor: "#FEF2F2", borderRadius: "8px", border: "1px solid #FCA5A5", fontSize: "12px", color: "#991B1B" }}>
                      {selectedCampaignDetail.errors.map((errStr: string, i: number) => (
                        <div key={i} style={{ marginBottom: "4px" }}>• {errStr}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaignDetail(null)}
                  style={{ padding: "8px 16px", backgroundColor: "#2563EB", color: "#FFFFFF", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD MODAL */}
        {showPasswordModal && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.5)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
            padding: "20px"
          }}>
            <div style={{
              width: "100%", maxWidth: "420px", padding: "30px",
              backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0",
              borderRadius: "20px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
              color: "#0F172A"
            }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>Change Admin Password</h2>
              <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {passwordError && <div style={{ padding: "10px", backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", color: "#B91C1C", fontSize: "13px" }}>{passwordError}</div>}
                {passwordSuccess && <div style={{ padding: "10px", backgroundColor: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "8px", color: "#166534", fontSize: "13px" }}>{passwordSuccess}</div>}

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Current Password</label>
                  <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>New Password</label>
                  <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Confirm New Password</label>
                  <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "8px", boxSizing: "border-box" }} />
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button type="button" onClick={() => setShowPasswordModal(false)} style={{ padding: "9px 14px", backgroundColor: "#F1F5F9", border: "none", borderRadius: "8px", color: "#475569", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                  <button type="submit" style={{ padding: "9px 18px", backgroundColor: "#2563EB", border: "none", borderRadius: "8px", color: "#FFFFFF", fontWeight: 700, cursor: "pointer" }}>Update Password</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .admin-charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: -250px !important;
            height: 100% !important;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          .admin-sidebar.mobile-open {
            left: 0 !important;
          }
          .admin-mobile-toggle {
            display: inline-block !important;
          }
        }
      `}</style>
    </div>
  );
}
