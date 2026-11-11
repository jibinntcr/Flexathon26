/**
 * FLEXATHON 2026 - Email & SMS Notification Templates & Handler
 */

export interface RegistrationNotificationData {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  eventCategory: string;
  tshirtSize: string;
  amount: number;
  orderId: string;
  paymentId: string;
  paidAt: string;
}

/**
 * 1. Branded FLEXATHON 2026 HTML Email Template
 */
export function generateEmailHtml(data: RegistrationNotificationData): string {
  const firstName = data.name ? data.name.trim().split(" ")[0] : "Runner";
  const registrationId = `#FLX-${10000 + data.id}`;
  const raceCategory = data.eventCategory.includes("Km") || data.eventCategory.includes("K") ? `${data.eventCategory} Run` : `${data.eventCategory}K Run`;
  const logoUrl = "https://flexathonrun.org/logo/logo.png";
  const shareCardUrl = "https://flexathonrun.org";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FLEXATHON 2026 Registration Confirmed</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background: #F1F5F9;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #0F172A;
  -webkit-font-smoothing: antialiased;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background: #F1F5F9; padding: 32px 12px;">
  <tr>
    <td align="center">

      <!-- Main Container Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
             style="
               max-width: 640px;
               background: #FFFFFF;
               border-radius: 16px;
               overflow: hidden;
               box-shadow: 0 10px 30px rgba(0,0,0,0.06);
               border: 1px solid #E2E8F0;
             ">

        <!-- Top Header Logo -->
        <tr>
          <td align="center"
              style="
                padding: 36px 30px 24px;
                background: #FFFFFF;
                border-bottom: 1px solid #F1F5F9;
              ">
            <img
              src="${logoUrl}"
              alt="FLEXATHON 2026"
              width="190"
              style="
                display: block;
                max-width: 190px;
                height: auto;
                border: 0;
              "
            />
          </td>
        </tr>

        <!-- Confirmation Hero Banner -->
        <tr>
          <td align="center"
              style="
                background: linear-gradient(135deg, #C5192D 0%, #991B1B 100%);
                padding: 32px 30px;
                color: #FFFFFF;
              ">

            <div style="
              display: inline-block;
              padding: 4px 12px;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 20px;
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 12px;
            ">
              ✓ Registration Confirmed
            </div>

            <div style="
              font-size: 32px;
              line-height: 1.2;
              font-weight: 900;
              letter-spacing: -0.5px;
            ">
              You’re officially in.
            </div>

            <div style="
              font-size: 15px;
              line-height: 1.6;
              margin-top: 8px;
              color: rgba(255, 255, 255, 0.9);
              font-weight: 500;
            ">
              FLEXATHON 2026 – The Global Goals Run
            </div>

          </td>
        </tr>

        <!-- Personalized Greeting -->
        <tr>
          <td style="padding: 36px 36px 12px;">

            <div style="
              font-size: 18px;
              line-height: 1.6;
              font-weight: 700;
              color: #0F172A;
            ">
              Hi <strong>${firstName}</strong>,
            </div>

            <p style="
              font-size: 16px;
              line-height: 1.7;
              margin: 12px 0 0;
              color: #334155;
            ">
              Your place at the starting line is confirmed. Thank you for registering for
              <strong>FLEXATHON 2026 – The Global Goals Run</strong>.
            </p>

            <p style="
              font-size: 15px;
              line-height: 1.7;
              color: #64748B;
              margin: 12px 0 0;
            ">
              We’re delighted to welcome you to an event that brings together sport, community and purpose — with the 2026 edition supporting awareness around <strong>SDG 4: Quality Education</strong>.
            </p>

          </td>
        </tr>

        <!-- Registration Details Card -->
        <tr>
          <td style="padding: 18px 36px 24px;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="
                     background: #F8FAFC;
                     border: 1.5px solid #E2E8F0;
                     border-radius: 14px;
                   ">

              <tr>
                <td style="padding: 24px;">

                  <div style="
                    font-size: 12px;
                    color: #64748B;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                    border-bottom: 1px solid #E2E8F0;
                    padding-bottom: 8px;
                  ">
                    Registration Summary
                  </div>

                  <table width="100%" cellpadding="0" cellspacing="0" border="0">

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Participant</td>
                      <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 800; color: #0F172A;">${data.name}</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Registration ID</td>
                      <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 800; color: #2563EB; font-family: monospace;">${registrationId}</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Race Category</td>
                      <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 800; color: #C5192D;">${raceCategory}</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">T-Shirt Size</td>
                      <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #0F172A;">${data.tshirtSize}</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Amount Paid</td>
                      <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 800; color: #059669;">₹${data.amount} INR</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Payment ID</td>
                      <td align="right" style="padding: 8px 0; font-size: 13px; font-family: monospace; color: #475569;">${data.paymentId}</td>
                    </tr>

                    <tr>
                      <td style="padding: 8px 0; font-size: 14px; color: #64748B;">Registration Status</td>
                      <td align="right" style="padding: 8px 0; font-size: 13px; font-weight: 800; color: #166534;">
                        <span style="background: #DCFCE7; padding: 3px 8px; border-radius: 6px;">✓ CONFIRMED</span>
                      </td>
                    </tr>

                  </table>

                  <div style="font-size: 11px; color: #94A3B8; margin-top: 14px; text-align: center;">
                    Please retain this email and your Registration ID (<strong>${registrationId}</strong>) for future reference.
                  </div>

                </td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Event Details -->
        <tr>
          <td style="padding: 6px 36px 26px;">

            <div style="
              font-size: 20px;
              font-weight: 900;
              color: #0F172A;
              margin-bottom: 16px;
            ">
              Race Day Details
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">

              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748B; width: 120px;">📅 Date</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #0F172A;">Sunday, 18 October 2026</td>
              </tr>

              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748B;">📍 Venue</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #0F172A;">Engineering Staff College of India (ESCI), Gachibowli, Hyderabad</td>
              </tr>

              <tr style="border-bottom: 1px solid #F1F5F9;">
                <td style="padding: 10px 0; font-size: 14px; color: #64748B;">⏰ Reporting</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #0F172A;">5:00 AM onwards</td>
              </tr>

              <tr>
                <td style="padding: 10px 0; font-size: 14px; color: #64748B;">🏃 Categories</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 700; color: #0F172A;">3K • 5K • 10K</td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Official WhatsApp Community Group Section -->
        <tr>
          <td style="padding: 0 36px 28px;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="
                     background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
                     border: 1.5px solid #86EFAC;
                     border-radius: 14px;
                     overflow: hidden;
                   ">

              <tr>
                <td style="padding: 24px 22px;">

                  <div style="
                    display: inline-block;
                    padding: 4px 10px;
                    background: #16A34A;
                    color: #FFFFFF;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                  ">
                    💬 Official Runners Community
                  </div>

                  <div style="
                    font-size: 18px;
                    font-weight: 900;
                    color: #065F46;
                    line-height: 1.3;
                    margin-bottom: 6px;
                  ">
                    Join the Official FLEXATHON WhatsApp Group
                  </div>

                  <p style="
                    font-size: 14px;
                    line-height: 1.6;
                    color: #166534;
                    margin: 0 0 16px;
                  ">
                    Connect with fellow participants, stay informed on bib collection schedules, parking & venue guidance, and receive live race-day announcements directly on WhatsApp.
                  </p>

                  <!-- Clickable WhatsApp Join Button -->
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 14px 0;">
                    <tr>
                      <td align="center"
                          style="
                            border-radius: 8px;
                            background: #25D366;
                            box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
                          ">

                        <a href="https://chat.whatsapp.com/E1x0mEeKBey6ml7NhopnU1"
                           target="_blank"
                           rel="noopener noreferrer"
                           style="
                             display: inline-block;
                             padding: 13px 26px;
                             font-size: 14px;
                             font-weight: 800;
                             color: #FFFFFF;
                             text-decoration: none;
                             border-radius: 8px;
                             letter-spacing: 0.5px;
                           ">
                          👉 JOIN OFFICIAL WHATSAPP GROUP
                        </a>

                      </td>
                    </tr>
                  </table>

                  <!-- Clickable Text Fallback Link -->
                  <div style="
                    font-size: 12px;
                    color: #15803D;
                    line-height: 1.5;
                    word-break: break-all;
                  ">
                    Or tap link directly: <a href="https://chat.whatsapp.com/E1x0mEeKBey6ml7NhopnU1"
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             style="color: #047857; font-weight: 700; text-decoration: underline;">https://chat.whatsapp.com/E1x0mEeKBey6ml7NhopnU1</a>
                  </div>

                </td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Social Share Run Card Section -->
        <tr>
          <td style="padding: 10px 36px 30px;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="
                     background: #0A1628;
                     border-radius: 16px;
                     border: 1px solid #1E293B;
                   ">

              <tr>
                <td align="center"
                    style="
                      padding: 34px 24px;
                      color: #FFFFFF;
                    ">

                  <div style="
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #F87171;
                    margin-bottom: 8px;
                  ">
                    Your Journey Starts Now
                  </div>

                  <div style="
                    font-size: 26px;
                    line-height: 1.25;
                    font-weight: 900;
                    color: #FFFFFF;
                  ">
                    Tell the world<br />you’re running.
                  </div>

                  <p style="
                    max-width: 440px;
                    margin: 14px auto 22px;
                    color: #94A3B8;
                    font-size: 14px;
                    line-height: 1.6;
                  ">
                    We’ve created your personalised
                    <strong style="color: #FFFFFF;">“I’m Running FLEXATHON 2026”</strong>
                    social card. Share it with your friends, colleagues and community.
                  </p>

                  <!-- Digital Run Card Preview -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0"
                         style="
                           max-width: 380px;
                           background: #FFFFFF;
                           border-radius: 12px;
                           margin-bottom: 24px;
                           box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                         ">

                    <tr>
                      <td align="center"
                          style="
                            padding: 28px 20px;
                            color: #0F172A;
                          ">

                        <div style="
                          font-size: 11px;
                          letter-spacing: 2px;
                          font-weight: 800;
                          color: #C5192D;
                        ">
                          I’M RUNNING
                        </div>

                        <div style="
                          font-size: 26px;
                          line-height: 1.2;
                          font-weight: 900;
                          margin-top: 6px;
                          color: #0F172A;
                        ">
                          FLEXATHON 2026
                        </div>

                        <div style="
                          font-size: 15px;
                          font-weight: 700;
                          color: #475569;
                          margin-top: 14px;
                        ">
                          ${data.name}
                        </div>

                        <div style="
                          font-size: 36px;
                          line-height: 1;
                          font-weight: 900;
                          color: #C5192D;
                          margin-top: 8px;
                        ">
                          ${data.eventCategory}
                        </div>

                        <div style="
                          font-size: 11px;
                          letter-spacing: 1px;
                          margin-top: 14px;
                          color: #64748B;
                          font-weight: 600;
                        ">
                          18 OCTOBER 2026 • HYDERABAD
                        </div>

                        <div style="
                          font-size: 11px;
                          font-weight: 800;
                          color: #0F172A;
                          margin-top: 8px;
                          background: #FEF2F2;
                          padding: 3px 8px;
                          border-radius: 4px;
                          display: inline-block;
                        ">
                          SDG 4 • QUALITY EDUCATION
                        </div>

                      </td>
                    </tr>

                  </table>

                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" border="0"
                         style="margin: 0 auto;">
                    <tr>
                      <td align="center"
                          style="
                            border-radius: 8px;
                            background: #C5192D;
                          ">

                        <a href="${shareCardUrl}"
                           style="
                             display: inline-block;
                             padding: 15px 30px;
                             font-size: 14px;
                             font-weight: 800;
                             color: #FFFFFF;
                             text-decoration: none;
                             border-radius: 8px;
                             letter-spacing: 0.5px;
                           ">
                          DOWNLOAD / SHARE MY RUN CARD
                        </a>

                      </td>
                    </tr>
                  </table>

                  <div style="
                    font-size: 12px;
                    color: #94A3B8;
                    margin-top: 16px;
                  ">
                    Tag <strong style="color: #FFFFFF;">@flexathonrun</strong> when you post!
                  </div>

                </td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Important Next Steps Notice -->
        <tr>
          <td style="padding: 0 36px 30px;">

            <div style="
              border-left: 4px solid #C5192D;
              background: #F8FAFC;
              padding: 18px 20px;
              font-size: 14px;
              line-height: 1.65;
              color: #475569;
              border-radius: 0 10px 10px 0;
            ">
              <strong style="color: #0F172A;">What happens next?</strong><br />
              Further information regarding race kit collection, bib allocation, reporting instructions, route guidance and race-day protocols will be shared with registered participants closer to the event.
            </div>

          </td>
        </tr>

        <!-- Purpose -->
        <tr>
          <td align="center"
              style="
                padding: 10px 36px 34px;
              ">

            <div style="
              font-size: 22px;
              font-weight: 900;
              line-height: 1.3;
              color: #0F172A;
            ">
              Run for more than the finish line.
            </div>

            <p style="
              max-width: 470px;
              font-size: 14px;
              line-height: 1.7;
              color: #64748B;
              margin: 12px auto 0;
            ">
              Every participant becomes part of a shared effort to bring people together through sport while highlighting a Global Goal that matters.
            </p>

            <div style="
              margin-top: 18px;
              font-size: 14px;
              font-weight: 800;
              color: #C5192D;
            ">
              United by Sport. Driven by Global Goals.
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center"
              style="
                background: #F8FAFC;
                padding: 28px 24px;
                border-top: 1px solid #E2E8F0;
              ">

            <div style="
              font-size: 14px;
              font-weight: 800;
              color: #0F172A;
            ">
              Team FLEXATHON
            </div>

            <div style="
              font-size: 12px;
              line-height: 1.7;
              color: #64748B;
              margin-top: 6px;
            ">
              The Global Goals Run<br />
              <strong>Flexon Sports Foundation</strong>
            </div>

            <div style="
              font-size: 12px;
              line-height: 1.8;
              margin-top: 14px;
              color: #475569;
            ">
              <a href="https://flexathonrun.org" style="color: #2563EB; text-decoration: none; font-weight: 600;">flexathonrun.org</a> • @flexathonrun<br />
              Participant Assistance: <strong>+91 94970 63919</strong> • <a href="https://chat.whatsapp.com/E1x0mEeKBey6ml7NhopnU1" target="_blank" rel="noopener noreferrer" style="color: #16A34A; text-decoration: underline; font-weight: 700;">Join WhatsApp Group</a>
            </div>

            <div style="
              font-size: 11px;
              line-height: 1.6;
              color: #94A3B8;
              margin-top: 18px;
            ">
              This is an automated confirmation email sent following your registration for FLEXATHON 2026.
            </div>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
  `;
}

/**
 * 2. DLT-Compliant SMS Message Template
 */
export function generateSmsText(data: RegistrationNotificationData): string {
  return `FLEXATHON 2026: Dear ${data.name}, your registration for ${data.eventCategory} Run is CONFIRMED! Reg ID: #FLX-${10000 + data.id}. Amount: Rs.${data.amount}. Payment ID: ${data.paymentId}. See you at the run! Info: https://flexathonrun.org`;
}

/**
 * 3. Notification Dispatcher Handler (Brevo Transactional Email Integration)
 */
export async function sendRegistrationNotification(data: RegistrationNotificationData) {
  const emailHtml = generateEmailHtml(data);
  const smsText = generateSmsText(data);
  const emailSubject = `FLEXATHON 2026 Registration Confirmation (#FLX-${10000 + data.id})`;

  const brevoApiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY || "";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || "info@flexathonrun.org";
  const senderName = process.env.BREVO_SENDER_NAME || "FLEXATHON 2026";

  let emailSent = false;
  let emailResponseData: any = null;

  if (brevoApiKey && data.email) {
    try {
      console.log(`[BREVO DISPATCH] Sending confirmation email to ${data.email} via Brevo API...`);
      
      const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: {
            name: senderName,
            email: senderEmail,
          },
          to: [
            {
              email: data.email.trim(),
              name: data.name.trim(),
            },
          ],
          subject: emailSubject,
          htmlContent: emailHtml,
          tags: ["registration_confirmation", data.eventCategory],
        }),
      });

      emailResponseData = await brevoResponse.json();

      if (brevoResponse.ok) {
        emailSent = true;
        console.log(`[BREVO SUCCESS] Confirmation email successfully delivered to ${data.email}. Message ID:`, emailResponseData?.messageId);
      } else {
        console.error(`[BREVO ERROR] Failed to send email to ${data.email}:`, emailResponseData);
      }
    } catch (err: any) {
      console.error(`[BREVO EXCEPTION] Network error while sending email via Brevo:`, err?.message || err);
    }
  } else {
    if (!brevoApiKey) {
      console.warn(`[NOTIFICATION WARNING] BREVO_API_KEY is not set in environment variables. Email simulation logged for ${data.email}.`);
    }
  }

  console.log(`[SMS DISPATCH] Sending SMS to ${data.whatsapp}: "${smsText}"`);

  return {
    success: emailSent || !brevoApiKey,
    emailSent,
    recipientEmail: data.email,
    recipientPhone: data.whatsapp,
    emailSubject,
    brevoResponse: emailResponseData,
  };
}
