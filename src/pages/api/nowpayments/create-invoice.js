// NOWPayments On-Ramp — Create Invoice
// Pages Router API handler (adapted from the App Router route.ts spec)
// POST /api/nowpayments/create-invoice

import { randomUUID } from "crypto";

const API  = process.env.NOWPAYMENTS_API_BASE;   // https://api.nowpayments.io/v1
const KEY  = process.env.NOWPAYMENTS_API_KEY;
const SITE = process.env.NEXT_PUBLIC_SITE_URL;   // https://www.devmatesolutions.com

// Server-side price list — never trust an amount sent from the browser.
const PRODUCTS = {
  "session-1on1":   { amount: 299,  label: "1:1 Strategy Session with Zain Ul Abideen" },
  "deposit-seo":    { amount: 750,  label: "SEO Retainer — Initial Deposit" },
  "deposit-web":    { amount: 1500, label: "Web Development — Project Deposit" },
  "invoice-custom": { amount: 0,    label: "DevMate Solutions — Invoice Payment" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!API || !KEY || !SITE) {
    console.error("NOWPayments env vars not configured");
    return res.status(500).json({ error: "Payment service not configured" });
  }

  try {
    const { productId, email, customAmount } = req.body || {};

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({ error: "Unknown product" });
    }

    // Only the custom-invoice path accepts a client-supplied amount, and it is bounded.
    let amount = product.amount;
    if (productId === "invoice-custom") {
      const parsed = Number(customAmount);
      if (!Number.isFinite(parsed) || parsed < 25 || parsed > 100000) {
        return res.status(400).json({ error: "Amount must be between 25 and 100 000 USD" });
      }
      amount = Math.round(parsed * 100) / 100;
    }

    const orderId = `DMS-${Date.now()}-${randomUUID().slice(0, 8)}`;

    const npRes = await fetch(`${API}/invoice`, {
      method: "POST",
      headers: { "x-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        price_amount:       amount,
        price_currency:     "usd",
        order_id:           orderId,
        order_description:  product.label,
        ipn_callback_url:   `${SITE}/api/nowpayments/ipn`,
        success_url:        `${SITE}/pay/success?order=${orderId}`,
        cancel_url:         `${SITE}/pay/cancelled?order=${orderId}`,
        customer_email:     email || undefined,
        is_fixed_rate:      true,   // locks the rate for the payment window
        is_fee_paid_by_user: false,
      }),
    });

    const data = await npRes.json();

    if (!npRes.ok) {
      console.error("NOWPayments invoice error", data);
      return res.status(502).json({ error: "Payment provider error" });
    }

    // TODO: persist { orderId, amount, productId, email, status: "created" } to your DB

    return res.status(200).json({ invoiceUrl: data.invoice_url, orderId });
  } catch (err) {
    console.error("create-invoice error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
