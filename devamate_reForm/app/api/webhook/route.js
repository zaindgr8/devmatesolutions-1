import { NextResponse } from "next/server";

const WEBHOOK_URLS = {
  "Hotel Booking — DXB": "https://hook.us2.make.com/lvger5j3udmgtz2vy1a4dx1xav0d3v8s",
  "Hotel Booking DXB": "https://hook.us2.make.com/lvger5j3udmgtz2vy1a4dx1xav0d3v8s",
  "Hotel Booking — DXB (English)": "https://hook.us2.make.com/lvger5j3udmgtz2vy1a4dx1xav0d3v8s",
  "Hotel Booking — DXB (Arabic)": "https://hook.eu2.make.com/icaj9kajo7gnv33lspcxkvdai8234vcf",
  "Hotel Booking DXB Arabic": "https://hook.eu2.make.com/icaj9kajo7gnv33lspcxkvdai8234vcf",
  "Dubai Real Estate": "https://hook.eu2.make.com/31ya9oqu7xbzar8jv025ul9k4fxzc9l6",
  "Emirates- Customer Care": "https://hook.us2.make.com/ni88x21vbju2w7u9mqjy6kwdwm8goi7a",
  "Emirates — Customer Care": "https://hook.us2.make.com/ni88x21vbju2w7u9mqjy6kwdwm8goi7a",
  "Emirates Customer Care": "https://hook.us2.make.com/ni88x21vbju2w7u9mqjy6kwdwm8goi7a",
  "Dubai Fun Broker": "https://hook.eu2.make.com/meox66njhc6x7cc388ra1qf3qp7ams1m",
  "Dubai Fun Broker (Russian)": "https://hook.eu1.make.com/q3qlta7no5t5alsdyv37n76woy2q2527",
};

const DEFAULT_WEBHOOK_URL =
  "https://hook.eu2.make.com/31ya9oqu7xbzar8jv025ul9k4fxzc9l6";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PRIMARY_NOTIFICATION_EMAIL = process.env.LEAD_NOTIFICATION_EMAIL || "contact@devmatesolutions.com";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "DevMate Leads <contact@devmatesolutions.com>";

async function sendEmailNotification(body) {
  const formName = body?.form || "Lead Form";
  const name = body?.name || "N/A";
  const email = body?.email && body.email.trim() !== "" ? body.email.trim() : "Not provided";
  const countryCode = body?.country ? `+${body.country}` : "";
  const contact = body?.contact ? `${countryCode} ${body.contact}`.trim() : "N/A";
  const language = body?.language || null;
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" });

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #dc2626; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
          New Lead Submission
        </h2>
        <p style="color: #dc2626; font-size: 14px; font-weight: 600; margin: 6px 0 0 0;">${formName}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px; width: 35%;">Form Name</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 500; font-size: 14px;">${formName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px;">Full Name</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 600; font-size: 14px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px;">Email Address</td>
            <td style="padding: 12px 8px; color: #0f172a; font-size: 14px;">
              ${email !== "Not provided" ? `<a href="mailto:${email}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${email}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px;">Phone Number</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 500; font-size: 14px;">${contact}</td>
          </tr>
          ${language ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px;">Language</td>
            <td style="padding: 12px 8px; color: #0f172a; font-weight: 500; font-size: 14px;">${language}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 8px; color: #64748b; font-weight: 600; font-size: 13px;">Time Received</td>
            <td style="padding: 12px 8px; color: #64748b; font-size: 13px;">${timestamp} (GST)</td>
          </tr>
        </tbody>
      </table>

      <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px; text-align: center; color: #64748b; font-size: 12px;">
        Sent automatically from <strong>DevMate Solutions Lead System</strong>
      </div>
    </div>
  `;

  try {
    // Primary attempt to contact@devmatesolutions.com
    let response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [PRIMARY_NOTIFICATION_EMAIL],
        subject: `New Lead: ${name} - ${formName}`,
        html: htmlContent,
      }),
    });

    let resData = await response.json();
    console.log("Resend API primary response:", resData);

    // Fallback: If domain contact@devmatesolutions.com is unverified on Resend free tier during testing, send to registered owner email
    if (!response.ok && resData?.message?.includes("testing emails to your own email address")) {
      console.warn("Target domain unverified on Resend. Falling back to registered account owner email (zangbang360@gmail.com).");
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "DevMate Leads <onboarding@resend.dev>",
          to: ["zangbang360@gmail.com"],
          subject: `[DevMate Lead] ${name} - ${formName} (Target: ${PRIMARY_NOTIFICATION_EMAIL})`,
          html: htmlContent,
        }),
      });
      resData = await response.json();
      console.log("Resend API fallback response:", resData);
    }

    return { ok: response.ok, data: resData };
  } catch (err) {
    console.error("Error sending Resend email:", err);
    return { ok: false, error: err.message };
  }
}

async function sendUserSalesPitchEmail(body) {
  const userEmail = body?.email && body.email.trim() !== "" ? body.email.trim() : null;
  if (!userEmail) {
    console.log("No user email provided. Skipping user sales pitch email.");
    return { ok: true, skipped: true };
  }

  const name = body?.name || "there";
  const formName = body?.form || "AI Call Assistant Demo";

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #1e293b; border-radius: 12px; background-color: #090d16; color: #f8fafc;">
      <!-- Header / Logo -->
      <div style="text-align: center; border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
          DEVMATE <span style="color: #dc2626;">SOLUTIONS</span>
        </h1>
        <p style="color: #64748b; font-size: 11px; font-weight: 600; letter-spacing: 0.2em; margin: 4px 0 0 0; text-transform: uppercase;">
          DXB | NY | MUSCAT
        </p>
      </div>

      <!-- Content -->
      <div style="line-height: 1.6; font-size: 15px; color: #cbd5e1;">
        <p style="font-size: 17px; font-weight: 600; color: #ffffff; margin-top: 0;">
          Hi ${name},
        </p>

        <p>
          Thank you for trying out our <strong style="color: #ffffff;">AI Call Assistant Demo</strong> for <strong style="color: #dc2626;">${formName}</strong>!
        </p>

        <p>
          We hope you experienced how conversational AI can transform lead capture, booking workflows, and customer engagement in real-time.
        </p>

        <!-- Callout Box -->
        <div style="background-color: #0f172a; border-left: 4px solid #dc2626; border-radius: 6px; padding: 18px 20px; margin: 24px 0;">
          <h3 style="color: #ffffff; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">
            Want a Custom AI Agent for Your Business?
          </h3>
          <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
            We design and deploy custom, enterprise-grade AI Voice and Chat Assistants tailored to your specific industry, CRM integration, and operational workflows.
          </p>
        </div>

        <p style="font-size: 15px; color: #ffffff; font-weight: 600; margin-bottom: 8px;">
          Let's discuss your custom use case:
        </p>
        <p style="margin-top: 0;">
          Reply directly to this email or reach out to us at 
          <a href="mailto:contact@devmatesolutions.com" style="color: #dc2626; text-decoration: underline; font-weight: 600;">contact@devmatesolutions.com</a> 
          and let us know what specific features or workflow automation you are interested in.
        </p>
      </div>

      <!-- Footer -->
      <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; font-size: 13px; color: #64748b;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #94a3b8;">DevMate Solutions Team</p>
        <p style="margin: 0;">
          <a href="https://devmatesolutions.com" style="color: #dc2626; text-decoration: none;">devmatesolutions.com</a> | 
          <a href="mailto:contact@devmatesolutions.com" style="color: #64748b; text-decoration: none;">contact@devmatesolutions.com</a>
        </p>
      </div>
    </div>
  `;

  try {
    let response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [userEmail],
        subject: `Your AI Call Assistant Demo Experience – DevMate Solutions`,
        html: htmlContent,
      }),
    });

    let resData = await response.json();
    console.log("Resend API user sales pitch email response:", resData);

    // Fallback: If domain contact@devmatesolutions.com is unverified on Resend free tier during testing, send via onboarding domain or fallback owner email
    if (!response.ok && resData?.message?.includes("testing emails to your own email address")) {
      console.warn("User email domain unverified on Resend sandbox mode. Sending fallback copy to registered account owner email.");
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "DevMate Leads <onboarding@resend.dev>",
          to: ["zangbang360@gmail.com"],
          subject: `[Sales Pitch Demo Mail] Intended recipient: ${userEmail} - ${formName}`,
          html: htmlContent,
        }),
      });
      resData = await response.json();
      console.log("Resend API user sales pitch fallback response:", resData);
    }

    return { ok: response.ok, data: resData };
  } catch (err) {
    console.error("Error sending user sales pitch email:", err);
    return { ok: false, error: err.message };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    let targetWebhookUrl = WEBHOOK_URLS[body?.form];
    if (!targetWebhookUrl && body?.language === "Arabic") {
      targetWebhookUrl = "https://hook.eu2.make.com/icaj9kajo7gnv33lspcxkvdai8234vcf";
    }
    if (!targetWebhookUrl) {
      targetWebhookUrl = DEFAULT_WEBHOOK_URL;
    }

    console.log("API Route: Received data:", body);

    // Run Make.com webhook forward, internal lead email & user sales pitch email in parallel
    const [webhookResult, adminEmailResult, userEmailResult] = await Promise.allSettled([
      fetch(targetWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      sendEmailNotification(body),
      sendUserSalesPitchEmail(body),
    ]);

    let webhookSuccess = false;
    let responseData = "";

    if (webhookResult.status === "fulfilled") {
      const response = webhookResult.value;
      webhookSuccess = response.ok;
      responseData = await response.text();
      console.log("API Route: Webhook response status:", response.status);
    } else {
      console.error("API Route: Webhook error:", webhookResult.reason);
    }

    if (adminEmailResult.status === "fulfilled") {
      console.log("API Route: Resend Admin Lead Email status:", adminEmailResult.value);
    } else {
      console.error("API Route: Resend Admin Lead Email error:", adminEmailResult.reason);
    }

    if (userEmailResult.status === "fulfilled") {
      console.log("API Route: Resend User Sales Pitch Email status:", userEmailResult.value);
    } else {
      console.error("API Route: Resend User Sales Pitch Email error:", userEmailResult.reason);
    }

    if (webhookSuccess || (adminEmailResult.status === "fulfilled" && adminEmailResult.value?.ok)) {
      return NextResponse.json(
        { success: true, message: "Data processed successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to forward lead data",
          details: responseData,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Route: Error processing submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process form submission",
      },
      { status: 500 }
    );
  }
}
