import { Resend } from "resend";
import { QR_COOKIE_NAME, isValidSessionToken, parseCookies } from "@/src/lib/qrAuth";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // 1. Authenticate using the signed session cookie
  const cookies = parseCookies(req.headers.cookie);
  const authenticated = isValidSessionToken(cookies[QR_COOKIE_NAME]);
  if (!authenticated) {
    return res.status(401).json({ ok: false, error: "Unauthorized session" });
  }

  const { profile = {}, action = "created" } = req.body || {};
  const {
    fullName = "",
    designation = "",
    department = "",
    company = "Devmate Solutions",
    phone = "",
    whatsapp = "",
    email = "",
    website = "https://www.devmatesolutions.com",
    location = "",
    linkedin = "",
    instagram = "",
    twitter = "",
    tiktok = "",
    facebook = "",
    notes = "",
  } = profile;

  if (!fullName.trim() && !email.trim() && !phone.trim()) {
    return res.status(400).json({ ok: false, error: "Missing required contact details" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({ ok: false, error: "Email service not configured" });
  }

  const resend = new Resend(RESEND_API_KEY);

  const timestamp = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dubai",
    timeZoneName: "short",
  });

  const cleanPhoneDigits = (phone || "").replace(/\D/g, "");
  const cleanWaDigits = (whatsapp || phone || "").replace(/\D/g, "");

  const actionLabels = {
    created: "Card Created / Updated",
    downloaded_card: "Business Card (PNG) Downloaded",
    downloaded_qr: "QR Code Only Downloaded",
    downloaded_vcf: "vCard (.vcf) Downloaded",
    printed: "Business Card Sent to Print",
    saved: "Card Saved on Device",
  };
  const actionText = actionLabels[action] || "Card Details Submitted";

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Digital Business Card Details — DevMate Solutions</title>
</head>
<body style="margin:0;padding:0;background:#0d0f12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f12;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#14171d;border:1px solid #262b35;border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #1b1e26 0%, #0d0f12 100%);padding:28px 36px;border-bottom:1px solid #262b35;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                      <span style="color:#bd2120;">DevMate</span> Solutions
                    </div>
                    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9ca3af;text-transform:uppercase;margin-top:2px;">
                      Internal Digital Business Card Studio
                    </div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:5px 12px;background:#bd2120;color:#ffffff;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;">
                      ${escapeHtml(actionText)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Hero -->
          <tr>
            <td style="padding:32px 36px 20px;background:#181b22;border-bottom:1px solid #262b35;">
              <div style="font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">
                New Team Card Details Submitted
              </div>
              <div style="font-size:26px;font-weight:800;color:#ffffff;line-height:1.2;">
                ${escapeHtml(fullName || "DevMate Team Member")}
              </div>
              <div style="font-size:15px;color:#bd2120;font-weight:700;margin-top:4px;">
                ${escapeHtml(designation || "Title not specified")}
                ${department ? ` <span style="color:#6b7280;">•</span> <span style="color:#9ca3af;">${escapeHtml(department)}</span>` : ""}
              </div>
              <div style="font-size:12px;color:#6b7280;margin-top:8px;">
                Recorded at ${escapeHtml(timestamp)}
              </div>
            </td>
          </tr>

          <!-- Detail Table -->
          <tr>
            <td style="padding:28px 36px;">
              <div style="font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#9ca3af;margin-bottom:16px;">
                Contact &amp; Account Information
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;width:140px;border-bottom:1px solid #212631;">Full Name:</td>
                  <td style="padding:10px 0;color:#ffffff;font-weight:700;border-bottom:1px solid #212631;">
                    ${escapeHtml(fullName || "—")}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Designation / Title:</td>
                  <td style="padding:10px 0;color:#ffffff;font-weight:600;border-bottom:1px solid #212631;">
                    ${escapeHtml(designation || "—")}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Department:</td>
                  <td style="padding:10px 0;color:#ffffff;border-bottom:1px solid #212631;">
                    ${escapeHtml(department || "—")}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Company:</td>
                  <td style="padding:10px 0;color:#ffffff;border-bottom:1px solid #212631;">
                    ${escapeHtml(company || "Devmate Solutions")}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Location:</td>
                  <td style="padding:10px 0;color:#ffffff;border-bottom:1px solid #212631;">
                    ${escapeHtml(location || "—")}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Work Email:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    ${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#bd2120;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>` : '<span style="color:#6b7280;">—</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Phone Number:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    ${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#bd2120;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>` : '<span style="color:#6b7280;">—</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">WhatsApp:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    ${cleanWaDigits ? `<a href="https://wa.me/${cleanWaDigits}" style="color:#22c55e;text-decoration:none;font-weight:600;">${escapeHtml(whatsapp || phone)}</a>` : '<span style="color:#6b7280;">—</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Website:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    ${website ? `<a href="${escapeHtml(website)}" style="color:#93c5fd;text-decoration:none;">${escapeHtml(website)}</a>` : '<span style="color:#6b7280;">—</span>'}
                  </td>
                </tr>
                ${linkedin ? `
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">LinkedIn:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    <a href="${escapeHtml(linkedin)}" style="color:#93c5fd;text-decoration:none;">${escapeHtml(linkedin)}</a>
                  </td>
                </tr>` : ""}
                ${instagram ? `
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Instagram:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    <a href="${escapeHtml(instagram)}" style="color:#93c5fd;text-decoration:none;">${escapeHtml(instagram)}</a>
                  </td>
                </tr>` : ""}
                ${twitter ? `
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">X / Twitter:</td>
                  <td style="padding:10px 0;border-bottom:1px solid #212631;">
                    <a href="${escapeHtml(twitter)}" style="color:#93c5fd;text-decoration:none;">${escapeHtml(twitter)}</a>
                  </td>
                </tr>` : ""}
                ${notes ? `
                <tr>
                  <td style="padding:10px 0;color:#9ca3af;border-bottom:1px solid #212631;">Personal Notes:</td>
                  <td style="padding:10px 0;color:#e5e7eb;border-bottom:1px solid #212631;font-style:italic;">
                    "${escapeHtml(notes)}"
                  </td>
                </tr>` : ""}
              </table>

              <!-- Quick action CTAs -->
              <div style="margin-top:28px;">
                ${email ? `
                  <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#bd2120;color:#ffffff;font-size:13px;font-weight:700;padding:10px 22px;border-radius:6px;text-decoration:none;margin-right:10px;">
                    ✉️ Reply via Email
                  </a>
                ` : ""}
                ${cleanWaDigits ? `
                  <a href="https://wa.me/${cleanWaDigits}" style="display:inline-block;background:#1f242d;border:1px solid #323846;color:#22c55e;font-size:13px;font-weight:700;padding:10px 22px;border-radius:6px;text-decoration:none;">
                    💬 Open WhatsApp
                  </a>
                ` : ""}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0f1116;padding:20px 36px;border-top:1px solid #262b35;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                Sent automatically by DevMate Solutions Digital Business Card Tool (<a href="https://www.devmatesolutions.com/qr" style="color:#9ca3af;text-decoration:none;">devmatesolutions.com/qr</a>)
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const subject = `📇 New Digital Business Card: ${fullName || "Team Member"} — ${designation || "Devmate Solutions"}`;

  try {
    let fromAddress = "DevMate Solutions <contact@devmatesolutions.com>";
    let result = await resend.emails.send({
      from: fromAddress,
      to: ["contact@devmatesolutions.com"],
      subject,
      html: emailHtml,
      replyTo: email || undefined,
    });

    if (result.error) {
      console.warn("Retrying with fallback sender onboarding@resend.dev:", result.error);
      fromAddress = "DevMate Solutions <onboarding@resend.dev>";
      result = await resend.emails.send({
        from: fromAddress,
        to: ["contact@devmatesolutions.com"],
        subject,
        html: emailHtml,
        replyTo: email || undefined,
      });
    }

    if (result.error) {
      console.error("Resend API error sending card notification:", result.error);
      return res.status(500).json({ ok: false, error: result.error.message || "Email send failed" });
    }

    return res.status(200).json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("Server error in /api/qr/notify:", err);
    return res.status(500).json({ ok: false, error: err.message || "Internal server error" });
  }
}
