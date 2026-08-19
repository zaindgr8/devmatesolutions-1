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
    // Try sending from the verified domain first
    let result = await resend.emails.send({
      from: 'DevMate Solutions <contact@devmatesolutions.com>',
      to: ['contact@devmatesolutions.com'],
      subject: `📞 New Lead: ${name || contact} — ${sourceLabel}`,
      html: notificationHtml,
      replyTo: email || undefined,
    });

    // Fallback to resend's default sender if domain not verified
    if (result.error) {
      console.warn('Primary sender failed, trying fallback:', result.error);
      result = await resend.emails.send({
        from: 'DevMate Solutions <onboarding@resend.dev>',
        to: ['contact@devmatesolutions.com'],
        subject: `📞 New Lead: ${name || contact} — ${sourceLabel}`,
        html: notificationHtml,
        replyTo: email || undefined,
      });
    }

    if (result.error) {
      console.error('Resend error:', result.error);
      return res.status(500).json({ error: 'Failed to send notification email' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Lead email error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
