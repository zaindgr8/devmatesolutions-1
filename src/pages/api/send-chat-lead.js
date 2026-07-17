import { Resend } from 'resend';

// API Route: Send chat lead notifications via Resend
// Sends to: (1) management@devmatesolutions.com, (2) the user's email

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, phone' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(RESEND_API_KEY);

  const requestDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dubai',
  });

  try {
    // ── 1. Email to User ──────────────────────────────────────────────────
    const userEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Query Initiated – Devmate Solutions</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#0d0d0d;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                <span style="color:#c0392b;">Devmate</span> Solutions
              </h1>
            </td>
          </tr>

          <!-- Content Banner -->
          <tr>
            <td style="padding:40px 40px 24px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c0392b;">Chat Inquiry Initiated</p>
              <h2 style="margin:0 0 16px;font-size:26px;font-weight:900;color:#0d0d0d;line-height:1.2;">
                Hello ${name},<br/>Welcome to Devmate Solutions!
              </h2>
              <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.7;">
                You have initiated your query with <strong>Devmate Solutions</strong>. Our assistant and expert team are ready to help you explore our full suite of software development, AI automation, and digital growth services.
              </p>
            </td>
          </tr>

          <!-- Contact Details Summary -->
          <tr>
            <td style="padding:32px 40px;background:#fafafa;border-bottom:1px solid #f0f0f0;">
              <h3 style="margin:0 0 16px;font-size:16px;font-weight:800;color:#0d0d0d;">Your Contact Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;">Full Name</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;">Email Address</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;">Contact Number</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${phone}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
              <h3 style="margin:0 0 12px;font-size:16px;font-weight:800;color:#0d0d0d;">What's Next?</h3>
              <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.6;">
                You can continue chatting with our interactive widget on the site, or our team will get in touch with you shortly. If you have immediate project requirements, feel free to book a direct consultation with our leadership.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;">
                Need assistance? Contact us directly at
                <a href="mailto:management@devmatesolutions.com" style="color:#c0392b;text-decoration:none;">management@devmatesolutions.com</a>
              </p>
              <p style="margin:0;font-size:12px;color:#d1d5db;">
                © ${new Date().getFullYear()} Devmate Solutions. All rights reserved.
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

    // ── 2. Email to Management ────────────────────────────────────────────
    const managementEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Chat Lead – Devmate Solutions</title>
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
                🔔 New Website Chat Lead
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">Received on ${requestDate} GST</p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#fef2f2;border-left:4px solid #c0392b;padding:16px 40px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#c0392b;">
                A user has shown interest and wants to learn more about our services!
              </p>
            </td>
          </tr>

          <!-- Lead Details -->
          <tr>
            <td style="padding:32px 40px;">
              <h3 style="margin:0 0 20px;font-size:16px;font-weight:800;color:#0d0d0d;">Lead Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;width:140px;">Full Name</td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#0d0d0d;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;border-top:1px solid #f0f0f0;">Email Address</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    <a href="mailto:${email}" style="color:#c0392b;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;border-top:1px solid #f0f0f0;">Contact Number</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    <a href="tel:${phone}" style="color:#c0392b;text-decoration:none;font-weight:600;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;color:#9ca3af;border-top:1px solid #f0f0f0;">Source</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">Website Live Chat Widget</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#d1d5db;">Devmate Solutions Internal Lead Notification System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    let fromAddress = 'Devmate Solutions <management@devmatesolutions.com>';

    // Send email to User
    let userEmailResult = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: '✓ You have initiated your query with Devmate Solutions',
      html: userEmailHtml,
    });

    // Fallback if domain sender is unverified in test environment
    if (userEmailResult.error) {
      console.warn('Failed sending from management@devmatesolutions.com. Fallback to onboarding@resend.dev. Error:', userEmailResult.error);
      fromAddress = 'Devmate Solutions <onboarding@resend.dev>';
      userEmailResult = await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: '✓ You have initiated your query with Devmate Solutions',
        html: userEmailHtml,
      });
    }

    if (userEmailResult.error) {
      console.error('Resend user email error:', userEmailResult.error);
      return res.status(500).json({
        error: `Failed to send confirmation email: ${userEmailResult.error.message || JSON.stringify(userEmailResult.error)}`,
      });
    }

    // Send email to Management
    let mgmtEmailResult = await resend.emails.send({
      from: fromAddress,
      to: ['management@devmatesolutions.com'],
      subject: `🔔 New Website Lead — ${name} (Devmate Services Inquiry)`,
      html: managementEmailHtml,
    });

    if (mgmtEmailResult.error) {
      console.error('Resend management notification error:', mgmtEmailResult.error);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead notification emails sent successfully',
    });
  } catch (error) {
    console.error('Chat lead email error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
