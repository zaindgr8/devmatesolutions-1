import { Resend } from 'resend';

// API Route: Send booking confirmation emails via Resend
// Sends to: (1) the user who booked, (2) management@devmatesolutions.com
// meetingType: 'ceo' (paid $299) | 'team' (free)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, reason, meetingType = 'ceo' } = req.body;
  const isTeam = meetingType === 'team';

  if (!name || !email || !phone || !reason) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(RESEND_API_KEY);

  const bookingDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Dubai',
  });

  try {
    // ── 1. Confirmation email to the user ────────────────────────
    const userEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Session Booked – DevMate Solutions</title>
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

          <!-- Hero -->
          <tr>
            <td style="padding:40px 40px 24px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c0392b;">Session Confirmed</p>
              <h2 style="margin:0 0 16px;font-size:28px;font-weight:900;color:#0d0d0d;line-height:1.2;">
                Your 1:1 Session<br/>Has Been Booked ✓
              </h2>
              <p style="margin:0;font-size:15px;color:#4b5563;line-height:1.7;">
                Hi <strong>${name}</strong>, thank you for booking a
                ${isTeam ? 'meeting with the <strong>DevMate Team</strong>' : '1:1 Discovery Session with <strong>Zain Ul Abideen Baloch</strong>, CEO &amp; Founder of DevMate Solutions'}.
                ${isTeam ? 'This is a <strong>free consultation</strong> — no payment required.' : 'Your payment of <strong>$299 USD</strong> has been received.'}
              </p>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding:32px 40px;background:#fafafa;border-bottom:1px solid #f0f0f0;">
              <h3 style="margin:0 0 20px;font-size:16px;font-weight:800;color:#0d0d0d;">What Happens Next</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 16px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;background:#c0392b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="color:#fff;font-size:13px;font-weight:800;">1</span>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.5;">
                          Our team will review your session request and reason for meeting.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;background:#c0392b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="color:#fff;font-size:13px;font-weight:800;">2</span>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.5;">
                          You will be contacted via email or phone to confirm the exact date &amp; time.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:32px;height:32px;background:#c0392b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="color:#fff;font-size:13px;font-weight:800;">3</span>
                        </td>
                        <td style="padding-left:12px;font-size:14px;color:#374151;line-height:1.5;">
                          Attend your 1:1 session with Zain and transform your business.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Session Details -->
          <tr>
            <td style="padding:32px 40px;border-bottom:1px solid #f0f0f0;">
              <h3 style="margin:0 0 20px;font-size:16px;font-weight:800;color:#0d0d0d;">Your Booking Details</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Name</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Email</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Contact Number</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Reason for Meeting</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${reason}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">${isTeam ? 'Session Type' : 'Amount Paid'}</span><br/>
                    <span style="font-size:15px;color:#0d0d0d;font-weight:600;">${isTeam ? 'Free Team Meeting' : '$299 USD — 1:1 CEO Discovery Session'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;">
                Questions? Reply to this email or reach us at
                <a href="mailto:management@devmatesolutions.com" style="color:#c0392b;text-decoration:none;">management@devmatesolutions.com</a>
              </p>
              <p style="margin:0;font-size:12px;color:#d1d5db;">
                © ${new Date().getFullYear()} DevMate Solutions. All rights reserved.
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

    // ── 2. Notification email to management ──────────────────────
    const managementEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${isTeam ? 'New Free Team Meeting Request' : 'New 1:1 CEO Session Booked'}</title>
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
                🔔 ${isTeam ? 'New Free Team Meeting Request' : 'New 1:1 CEO Session Booked'}
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#9ca3af;">Received on ${bookingDate}</p>
            </td>
          </tr>

          <!-- Alert banner -->
          <tr>
            <td style="background:#fef2f2;border-left:4px solid #c0392b;padding:16px 40px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#c0392b;">
                ACTION REQUIRED — Contact the client to confirm session time
              </p>
            </td>
          </tr>

          <!-- Client Details -->
          <tr>
            <td style="padding:32px 40px;">
              <h3 style="margin:0 0 20px;font-size:16px;font-weight:800;color:#0d0d0d;">Client Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;width:140px;">Name</td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#0d0d0d;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">Email</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    <a href="mailto:${email}" style="color:#c0392b;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">Phone</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">
                    <a href="tel:${phone}" style="color:#c0392b;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">Reason</td>
                  <td style="padding:12px 16px;font-size:15px;color:#0d0d0d;border-top:1px solid #f0f0f0;">${reason}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;border-top:1px solid #f0f0f0;">
                    ${isTeam ? 'Session Type' : 'Amount Paid'}
                  </td>
                  <td style="padding:12px 16px;font-size:15px;font-weight:700;color:#16a34a;border-top:1px solid #f0f0f0;">
                    ${isTeam ? 'Free Team Meeting' : '$299 USD ✓'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#d1d5db;">DevMate Solutions Internal Notification System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    let fromAddress = 'DevMate Solutions <management@devmatesolutions.com>';

    // Attempt sending user email
    let userEmailResult = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: isTeam
        ? '✓ Your Team Meeting Request is Confirmed — DevMate Solutions'
        : '✓ Your 1:1 Session is Booked — DevMate Solutions',
      html: userEmailHtml,
    });

    // Check if it failed due to unverified sender domain
    if (userEmailResult.error) {
      console.warn('Failed sending user email from management@devmatesolutions.com. Attempting fallback to onboarding@resend.dev. Error details:', userEmailResult.error);
      fromAddress = 'DevMate Solutions <onboarding@resend.dev>';
      userEmailResult = await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: isTeam
          ? '✓ Your Team Meeting Request is Confirmed — DevMate Solutions'
          : '✓ Your 1:1 Session is Booked — DevMate Solutions',
        html: userEmailHtml,
      });
    }

    if (userEmailResult.error) {
      console.error('Resend Error (user email):', JSON.stringify(userEmailResult.error));
      return res.status(500).json({
        error: `Failed to send confirmation email: ${userEmailResult.error.message || JSON.stringify(userEmailResult.error)}`,
      });
    }

    // Now send management notification email
    let mgmtEmailResult = await resend.emails.send({
      from: fromAddress,
      to: ['management@devmatesolutions.com'],
      subject: isTeam
        ? `🔔 New FREE Team Meeting Request — ${name}`
        : `🔔 New 1:1 CEO Session Booked — ${name}`,
      html: managementEmailHtml,
    });

    if (mgmtEmailResult.error) {
      console.error('Resend Error (mgmt email):', JSON.stringify(mgmtEmailResult.error));
      // User email already sent — don't fail the whole request
      console.warn('Management notification failed but user email was sent successfully.');
    }

    return res.status(200).json({
      success: true,
      message: 'Confirmation emails sent successfully',
    });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

