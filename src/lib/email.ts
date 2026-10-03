// Resend email notification service for Creative Forge Digital Competition entries

export interface EmailAttachment {
  filename: string;
  content: Buffer | string; // Buffer or base64 string
  contentType?: string;
}

export interface CompetitionEmailData {
  entryId: string;
  entriesCount: number;
  timestamp: string;
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
  residentAge18: boolean;
  instagramHandle: string | null;
  noInstagram: boolean;
  facebookHandle: string | null;
  noFacebook: boolean;
  tiktokHandle: string | null;
  noTikTok: boolean;
  coupleNames: string;
  weddingDate: string;
  weddingHashtag: string;
  coupleEmail: string | null;
  couplePhone: string | null;
  commentLink: string | null;
  hasCommentScreenshot: boolean;
  confirmFollow: boolean;
  hasFollowProof1: boolean;
  hasFollowProof2: boolean;
  hasStoryScreenshot: boolean;
  termsAccepted: boolean;
  marketingConsent: boolean;
  clientIp?: string | null;
  userAgent?: string | null;
}

export async function sendCompetitionNotificationEmail(
  data: CompetitionEmailData,
  attachments: EmailAttachment[] = []
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Resend API key is not configured in RESEND_API_KEY.");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const fromEmail =
    process.env.RESEND_FROM ||
    "Creative Forge Digital <competition@creativeforgedigital.co.za>";

  // Parse recipients (defaults to admin & danielle)
  const envRecipients = process.env.RESEND_NOTIFY_EMAILS;
  const recipients: string[] = envRecipients
    ? envRecipients.split(",").map((e) => e.trim()).filter(Boolean)
    : ["admin@creativeforgedigital.co.za", "danielle@creativeforgedigital.co.za"];

  const subject = `New Competition Entry: ${data.fullName} (${data.entryId}) — ${data.coupleNames} [${data.entriesCount} ${data.entriesCount === 2 ? "Entries" : "Entry"}]`;

  // Format base64 attachments for Resend
  const formattedAttachments = attachments.map((att) => ({
    filename: att.filename,
    content: Buffer.isBuffer(att.content)
      ? att.content.toString("base64")
      : att.content,
  }));

  // Build HTML email body
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #F6F3EE; color: #1C1A17; margin: 0; padding: 24px 12px; line-height: 1.55; }
    .container { max-width: 660px; margin: 0 auto; background: #ffffff; border: 1px solid #DFD9CE; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .gold-bar { height: 4px; background: linear-gradient(90deg, #D4AF37 0%, #F3E5AB 50%, #B8860B 100%); }
    .header { background: #121212; color: #ffffff; padding: 34px 30px; text-align: left; }
    .brand-kicker { font-size: 10px; text-transform: uppercase; letter-spacing: 0.28em; color: #BDB7AB; margin-bottom: 10px; font-weight: 600; }
    .title { font-family: "Georgia", "Playfair Display", serif; font-size: 28px; font-weight: normal; margin: 0 0 10px 0; color: #ffffff; letter-spacing: -0.01em; }
    .badge { display: inline-block; background: #262626; color: #FFFFFF; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; padding: 5px 12px; margin-right: 6px; border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; }
    .badge-gold { background: #B8860B; color: #FFFFFF; border-color: #D4AF37; }
    .admin-action-bar { background: #F8F5F0; border-bottom: 1px solid #E6E0D5; padding: 14px 30px; text-align: right; }
    .admin-btn { display: inline-block; background: #121212; color: #ffffff !important; text-decoration: none; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.18em; padding: 10px 18px; border-radius: 2px; }
    .body { padding: 32px 30px; }
    .couple-highlight { background: #FAF7F2; border: 1px solid #E2DCD1; border-left: 4px solid #121212; padding: 18px 22px; margin-bottom: 26px; }
    .couple-title { font-family: "Georgia", serif; font-size: 22px; color: #121212; margin: 0 0 4px 0; font-weight: normal; }
    .couple-sub { font-size: 12px; color: #6E685F; text-transform: uppercase; letter-spacing: 0.16em; font-weight: 600; margin: 0; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.24em; color: #8A847A; border-bottom: 1px solid #ECE7DE; padding-bottom: 6px; margin: 26px 0 12px 0; font-weight: 700; }
    .section-title:first-child { margin-top: 0; }
    .table-details { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table-details td { padding: 9px 0; vertical-align: top; border-bottom: 1px solid #F5F1EB; }
    .table-details td.label { width: 36%; color: #756F66; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
    .table-details td.value { width: 64%; color: #121212; font-weight: 600; }
    .table-details td.value a { color: #121212; text-decoration: underline; }
    .callout { background: #F8F5F0; border: 1px solid #E2DCD1; padding: 16px 20px; margin: 20px 0; font-size: 12px; line-height: 1.6; }
    .footer { background: #EFEAE1; padding: 24px 30px; font-size: 11px; color: #6E685F; text-transform: uppercase; letter-spacing: 0.18em; text-align: center; border-top: 1px solid #E2DCD1; }
  </style>
</head>
<body>
  <div class="container">
    <div class="gold-bar"></div>
    <div class="header">
      <div style="margin-bottom: 14px;">
        <img src="https://wedding.creativeforgedigital.co.za/images/cfd-logo.png" alt="Creative Forge Digital" width="52" height="52" style="border-radius: 50%; border: 1px solid #E0D9CC; display: inline-block; background-color: #000000;" />
      </div>
      <div class="brand-kicker">Creative Forge Digital • Official Competition Submission</div>
      <h1 class="title">Win a Bespoke Wedding Website</h1>
      <div>
        <span class="badge">Ref: ${data.entryId}</span>
        <span class="badge ${data.entriesCount === 2 ? "badge-gold" : ""}">
          ${data.entriesCount === 2 ? "★ 2 Entries (Bonus Story Included)" : "1 Standard Entry"}
        </span>
      </div>
    </div>

    <div class="admin-action-bar">
      <a href="https://wedding.creativeforgedigital.co.za/adminpanellogin" class="admin-btn" target="_blank">
        Open Admin Control Room ↗
      </a>
    </div>

    <div class="body">
      <!-- Couple Highlight Hero -->
      <div class="couple-highlight">
        <h2 class="couple-title">${data.coupleNames}</h2>
        <p class="couple-sub">Wedding Date: ${data.weddingDate} (2027 Confirmed) • ${data.weddingHashtag}</p>
      </div>
      <!-- 01. Entrant -->
      <div class="section-title">01. Entrant Details</div>
      <table class="table-details">
        <tr>
          <td class="label">Full Name</td>
          <td class="value">${data.fullName}</td>
        </tr>
        <tr>
          <td class="label">Relationship</td>
          <td class="value">${data.relationship}</td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number</td>
          <td class="value"><a href="tel:${data.phone}">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">SA Resident 18+</td>
          <td class="value">${data.residentAge18 ? "Yes (Verified)" : "No"}</td>
        </tr>
        <tr>
          <td class="label">Submission Time</td>
          <td class="value">${data.timestamp}</td>
        </tr>
      </table>

      <!-- 02. Social Handles -->
      <div class="section-title">02. Social Media Handles</div>
      <table class="table-details">
        <tr>
          <td class="label">Instagram</td>
          <td class="value">
            ${
              data.noInstagram
                ? "<em>No Instagram account</em>"
                : data.instagramHandle
                ? `<a href="https://instagram.com/${data.instagramHandle}" target="_blank">@${data.instagramHandle}</a>`
                : "<em>Not provided</em>"
            }
          </td>
        </tr>
        <tr>
          <td class="label">Facebook</td>
          <td class="value">
            ${
              data.noFacebook
                ? "<em>No Facebook account</em>"
                : data.facebookHandle || "<em>Not provided</em>"
            }
          </td>
        </tr>
        <tr>
          <td class="label">TikTok</td>
          <td class="value">
            ${
              data.noTikTok
                ? "<em>No TikTok account</em>"
                : data.tiktokHandle
                ? `<a href="https://tiktok.com/@${data.tiktokHandle}" target="_blank">@${data.tiktokHandle}</a>`
                : "<em>Not provided</em>"
            }
          </td>
        </tr>
      </table>

      <!-- 03. Wedding Details -->
      <div class="section-title">03. The 2027 Wedding</div>
      <table class="table-details">
        <tr>
          <td class="label">Couple's Names</td>
          <td class="value">${data.coupleNames}</td>
        </tr>
        <tr>
          <td class="label">Wedding Date</td>
          <td class="value"><strong>${data.weddingDate}</strong> (Confirmed 2027)</td>
        </tr>
        <tr>
          <td class="label">Wedding Hashtag</td>
          <td class="value">${data.weddingHashtag}</td>
        </tr>
        ${
          data.coupleEmail
            ? `<tr><td class="label">Couple's Email</td><td class="value">${data.coupleEmail}</td></tr>`
            : ""
        }
        ${
          data.couplePhone
            ? `<tr><td class="label">Couple's Phone</td><td class="value">${data.couplePhone}</td></tr>`
            : ""
        }
      </table>

      <!-- 04. Social Proof & Files -->
      <div class="section-title">04. Engagement Verification &amp; Attachments</div>
      <table class="table-details">
        <tr>
          <td class="label">Comment Link (3 friends)</td>
          <td class="value">${data.commentLink ? data.commentLink : "<em>Not provided (Screenshot used)</em>"}</td>
        </tr>
        <tr>
          <td class="label">Comment Screenshot</td>
          <td class="value">${data.hasCommentScreenshot ? "Attached to this email" : "None uploaded (Link used)"}</td>
        </tr>
        <tr>
          <td class="label">Confirmed Followed (2+ platforms)</td>
          <td class="value">${data.confirmFollow ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td class="label">Follow Proof Photo #1</td>
          <td class="value">${data.hasFollowProof1 ? "Attached to this email" : "None uploaded"}</td>
        </tr>
        <tr>
          <td class="label">Follow Proof Photo #2</td>
          <td class="value">${data.hasFollowProof2 ? "Attached to this email" : "None uploaded"}</td>
        </tr>
        <tr>
          <td class="label">Instagram Story Screenshot</td>
          <td class="value">${data.hasStoryScreenshot ? "Attached to this email (Bonus entry awarded)" : "None uploaded"}</td>
        </tr>
      </table>

      ${
        formattedAttachments.length > 0
          ? `
        <div class="callout">
          <strong>📎 ${formattedAttachments.length} Image File(s) Attached:</strong><br />
          ${formattedAttachments.map((a) => `• ${a.filename}`).join("<br />")}
        </div>
      `
          : ""
      }

      <!-- 05. Governance & Consent -->
      <div class="section-title">05. Legal &amp; Compliance</div>
      <table class="table-details">
        <tr>
          <td class="label">Terms &amp; Conditions Accepted</td>
          <td class="value">${data.termsAccepted ? "Yes (CPA compliant)" : "No"}</td>
        </tr>
        <tr>
          <td class="label">POPIA Marketing Consent</td>
          <td class="value">${data.marketingConsent ? "Opted In" : "Declined"}</td>
        </tr>
        <tr>
          <td class="label">Client IP</td>
          <td class="value">${data.clientIp || "N/A"}</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      Creative Forge Digital • Johannesburg • South Africa<br />
      Consumer Protection Act &amp; POPIA Monitored
    </div>
  </div>
</body>
</html>
  `;

  // Build plain text fallback
  const text = `
CREATIVE FORGE DIGITAL — NEW COMPETITION ENTRY
==================================================
Reference Code: ${data.entryId}
Official Tally: ${data.entriesCount} ${data.entriesCount === 2 ? "Entries (Bonus Story Included)" : "Entry"}
Submitted: ${data.timestamp}

01. ENTRANT DETAILS
--------------------------------------------------
Full Name: ${data.fullName}
Relationship: ${data.relationship}
Email: ${data.email}
Phone: ${data.phone}
SA Resident (18+): ${data.residentAge18 ? "Yes" : "No"}

02. SOCIAL MEDIA HANDLES
--------------------------------------------------
Instagram: ${data.noInstagram ? "No account" : data.instagramHandle || "N/A"}
Facebook: ${data.noFacebook ? "No account" : data.facebookHandle || "N/A"}
TikTok: ${data.noTikTok ? "No account" : data.tiktokHandle || "N/A"}

03. THE 2027 WEDDING
--------------------------------------------------
Couple's Names: ${data.coupleNames}
Wedding Date: ${data.weddingDate} (Confirmed 2027)
Wedding Hashtag: ${data.weddingHashtag}
Couple Email: ${data.coupleEmail || "N/A"}
Couple Phone: ${data.couplePhone || "N/A"}

04. ENGAGEMENT VERIFICATION
--------------------------------------------------
Comment Link (3 friends): ${data.commentLink || "N/A"}
Comment Screenshot: ${data.hasCommentScreenshot ? "Attached" : "Not uploaded"}
Confirmed Following (2+ platforms): ${data.confirmFollow ? "Yes" : "No"}
Follow Proof Photo 1: ${data.hasFollowProof1 ? "Attached" : "Not uploaded"}
Follow Proof Photo 2: ${data.hasFollowProof2 ? "Attached" : "Not uploaded"}
Story Screenshot: ${data.hasStoryScreenshot ? "Attached (Bonus Entry)" : "Not uploaded"}
Attached Files: ${formattedAttachments.length}

05. LEGAL & CONSENTS
--------------------------------------------------
Terms Accepted: ${data.termsAccepted ? "Yes" : "No"}
Marketing Consent: ${data.marketingConsent ? "Opted In" : "Declined"}
IP: ${data.clientIp || "N/A"}
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject,
        html,
        text,
        attachments: formattedAttachments.length > 0 ? formattedAttachments : undefined,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("Resend API returned an error:", resData);
      return { success: false, error: resData.message || "Resend API error" };
    }

    console.log(`Competition notification email sent successfully via Resend. ID: ${resData.id}`);
    return { success: true, id: resData.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error contacting Resend";
    console.error("Failed to send competition notification email:", message);
    return { success: false, error: message };
  }
}
