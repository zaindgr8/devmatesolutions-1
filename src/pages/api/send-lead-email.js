import { Resend } from 'resend';

// API Route: Send lead notification to contact@devmatesolutions.com
// Called whenever the FormApp (modal) captures a lead

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, country, contact, source } = req.body;

  if (!contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(RESEND_API_KEY);

  const receivedAt = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dubai',
    timeZoneName: 'short',
  });

  const sourceLabel = source || 'Website (FormModal)';

  const notificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Lead — DevMate Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#0d0d0d;padding:28px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:800;">
                📞 New Lead — Someone Wants a Call
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">Received on ${receivedAt}</p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#fef2f2;border-left:4px solid #c0392b;padding:16px 40px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#c0392b;">
                ACTION REQUIRED — Call this lead back within 60 seconds
              </p>
            </td>
          </tr>

          <!-- Source -->
          <tr>
            <td style="padding:20px 40px 0;">
              <span style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;color:#16a34a;font-size:12px;font-weight:700;padding:4px 12px;border-radius:100px;letter-spacing:0.5px;">
                Source: ${sourceLabel}
              </span>
            </td>
          </tr>

          <!-- Lead Details -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <h3 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#0d0d0d;">Lead Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;width:140px;">Name</td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#0d0d0d;">${name || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">Email</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    ${email ? `<a href="mailto:${email}" style="color:#c0392b;text-decoration:none;">${email}</a>` : '—'}
                  </td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">Phone</td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:800;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    <a href="tel:${country || ''}${contact}" style="color:#c0392b;text-decoration:none;font-size:17px;">${country || ''} ${contact}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <a href="tel:${country || ''}${contact}"
                style="display:inline-block;background:#c0392b;color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;">
                📞 Call Now: ${country || ''} ${contact}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 28px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#d1d5db;">DevMate Solutions Lead Notification System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    let fromAddress = 'DevMate Solutions <contact@devmatesolutions.com>';

    // ── 1. Management Notification Email ──────────────────────────
    let mgmtResult = await resend.emails.send({
      from: fromAddress,
      to: ['contact@devmatesolutions.com'],
      subject: `📞 New Lead: ${name || contact} — ${sourceLabel}`,
      html: notificationHtml,
      replyTo: email || undefined,
    });

    if (mgmtResult.error) {
      console.warn('Primary sender failed for mgmt email, trying fallback:', mgmtResult.error);
      fromAddress = 'DevMate Solutions <onboarding@resend.dev>';
      mgmtResult = await resend.emails.send({
        from: fromAddress,
        to: ['contact@devmatesolutions.com'],
        subject: `📞 New Lead: ${name || contact} — ${sourceLabel}`,
        html: notificationHtml,
        replyTo: email || undefined,
      });
    }

    if (mgmtResult.error) {
      console.error('Resend error (mgmt notification):', mgmtResult.error);
    }

    // ── 2. User Welcome / Intake Email (if email provided) ────────
    if (email && email.trim()) {
      const userFirstName = name && name.trim() ? name.trim().split(' ')[0] : 'there';
      const userWelcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to DevMate Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:36px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 30px rgba(0,0,0,0.06);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0d0d0d;padding:28px 36px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">
                <span style="color:#bd2120;">DevMate</span> Solutions
              </h1>
              <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;">
                CheckMate Your AI & Software Goals With Devmate!
              </p>
            </td>
          </tr>

          <!-- Hero Greeting -->
          <tr>
            <td style="padding:36px 36px 20px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#bd2120;">Request Received</p>
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:900;color:#0f172a;line-height:1.25;">
                Hi ${userFirstName}, we've received your request! 🚀
              </h2>
              <p style="margin:0;font-size:15px;color:#475569;line-height:1.65;">
                Thank you for reaching out to <strong>DevMate Solutions</strong>. Our solutions team has received your contact details and will connect with you shortly.
              </p>
            </td>
          </tr>

          <!-- PRIMARY FOCUS: AI Lead Management System -->
          <tr>
            <td style="padding:0 36px 24px;">
              <div style="background:#fef2f2;border:1.5px solid rgba(189,33,32,0.2);border-radius:12px;padding:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="display:inline-block;background:#bd2120;color:#ffffff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">
                        🤖 Primary Focus
                      </span>
                      <h3 style="margin:0 0 10px;font-size:18px;font-weight:800;color:#0d0d0d;">
                        AI Lead Management System
                      </h3>
                      <p style="margin:0 0 14px;font-size:14px;color:#475569;line-height:1.6;">
                        Looking to eliminate slow response times and automate your enquiry-to-viewing pipeline across <strong>WhatsApp, Bayut, Property Finder, Dubizzle &amp; Instagram</strong> in Arabic &amp; English?
                      </p>
                      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0d0d0d;">
                        ⚡ Simply reply to this email with your details to fast-track your setup:
                      </p>
                      <ul style="margin:0 0 18px;padding-left:18px;font-size:13px;color:#475569;line-height:1.6;">
                        <li><strong>Company / Brokerage Name</strong> &amp; Website</li>
                        <li><strong>Team Size</strong> (Number of active agents/closers)</li>
                        <li><strong>Current Lead Portals</strong> (Bayut, Property Finder, Meta Ads, WhatsApp, etc.)</li>
                        <li><strong>Estimated Monthly Enquiry Volume</strong></li>
                      </ul>

                      <table cellpadding="0" cellspacing="0" style="margin-top:8px;">
                        <tr>
                          <td>
                            <a href="https://wa.me/971542968754?text=Hi%20DevMate%2C%20I%20just%20submitted%20a%20request%20for%20the%20AI%20Lead%20Management%20System."
                              style="display:inline-block;background:#bd2120;color:#ffffff;font-size:13px;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none;box-shadow:0 3px 12px rgba(189,33,32,0.25);">
                              💬 WhatsApp Us Directly
                            </a>
                          </td>
                          <td style="padding-left:12px;">
                            <a href="https://www.devmatesolutions.com/aileadmanagement"
                              style="display:inline-block;background:#ffffff;color:#0d0d0d;border:1px solid #cbd5e1;font-size:13px;font-weight:700;padding:10px 18px;border-radius:8px;text-decoration:none;">
                              View System Details &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- SECONDARY FOCUS: Custom Software / App / AI Development -->
          <tr>
            <td style="padding:0 36px 32px;">
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;">
                <span style="display:inline-block;background:#e2e8f0;color:#475569;font-size:11px;font-weight:800;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
                  💡 Custom Software &amp; Tech
                </span>
                <h4 style="margin:0 0 8px;font-size:15px;font-weight:800;color:#0f172a;">
                  Have another Software or Product Query?
                </h4>
                <p style="margin:0 0 10px;font-size:13px;color:#64748b;line-height:1.6;">
                  We also design and engineer <strong>mobile apps (iOS &amp; Android), web platforms, enterprise CRMs, and custom AI agents</strong> for growing startups and global enterprises.
                </p>
                <p style="margin:0;font-size:13px;color:#334155;line-height:1.5;">
                  Feel free to reply directly with your project requirements or scope, and our engineering leads will review it before our call.
                </p>
              </div>
            </td>
          </tr>

          <!-- Direct Reply Note -->
          <tr>
            <td style="padding:0 36px 28px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#64748b;">
                You can reply directly to this email at <a href="mailto:contact@devmatesolutions.com" style="color:#bd2120;text-decoration:none;font-weight:600;">contact@devmatesolutions.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;border-top:1px solid #e2e8f0;padding:24px 36px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#334155;">
                DevMate Solutions · TechMate Solutions FZ LLC
              </p>
              <p style="margin:0 0 8px;font-size:11px;color:#94a3b8;">
                Dubai, UAE · Muscat, Oman · New York, USA
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                &copy; ${new Date().getFullYear()} DevMate Solutions. All rights reserved.
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

      // Send to user
      let userEmailResult = await resend.emails.send({
        from: fromAddress,
        to: [email.trim()],
        subject: `Welcome to DevMate Solutions — We've received your request! 🚀`,
        html: userWelcomeHtml,
        replyTo: 'contact@devmatesolutions.com',
      });

      if (userEmailResult.error) {
        console.warn('User welcome email failed:', userEmailResult.error);
      }
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Lead email error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
