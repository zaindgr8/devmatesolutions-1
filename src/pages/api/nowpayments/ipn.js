// NOWPayments On-Ramp — IPN (Instant Payment Notification) Webhook
// POST /api/nowpayments/ipn
//
// NOWPayments signs each callback with HMAC-SHA512 over the JSON payload
// with keys sorted ALPHABETICALLY and RECURSIVELY. Get the sorting wrong
// and every signature check fails silently in production.
//
// Three things that kill IPN in production:
//   1. Returning anything other than 200 on a valid sig → infinite retries
//   2. WAF / Vercel bot protection blocking the route → whitelist this path
//   3. Reading the body twice (json() then text()) → signature always fails
//      — bodyParser is disabled; we read the raw stream exactly once.
//
// Docs: https://documenter.getpostman.com/view/7907941/2s93JqTRWN#callbacks

import crypto from "crypto";

const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;

// ---------------------------------------------------------------------------
// Recursive key-sort — MUST mirror what NOWPayments does before signing.
// A shallow sort (Object.keys().sort()) silently breaks nested objects.
// ---------------------------------------------------------------------------
function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, k) => {
        acc[k] = sortKeys(value[k]);
        return acc;
      }, {});
  }
  return value;
}

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------
function verifySignature(rawBody, signature) {
  if (!IPN_SECRET) {
    console.error("NOWPAYMENTS_IPN_SECRET is not set — all IPN calls will be rejected");
    return false;
  }
  if (!signature) return false;

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return false;
  }

  const expected = crypto
    .createHmac("sha512", IPN_SECRET)
    .update(JSON.stringify(sortKeys(payload)))
    .digest("hex");

  // Constant-time comparison guards against timing attacks.
  // Buffers must be the same length, so compare utf8 byte lengths first.
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Disable Next.js body parsing — we MUST read the raw stream exactly once.
// ---------------------------------------------------------------------------
export const config = {
  api: { bodyParser: false },
};

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Read raw body ONCE — used for both signature verification and JSON parse.
  const rawBody   = await readRawBody(req);
  const signature = req.headers["x-nowpayments-sig"];

  // 1. Reject missing signature early (before JSON parse).
  if (!signature) {
    console.warn("NOWPayments IPN: missing x-nowpayments-sig header");
    return res.status(400).json({ error: "Missing signature" });
  }

  // 2. Verify HMAC-SHA512 with recursively sorted keys.
  if (!verifySignature(rawBody, signature)) {
    console.warn("NOWPayments IPN: signature mismatch — payload rejected");
    return res.status(401).json({ error: "Invalid signature" });
  }

  // 3. Parse — safe to do after signature is confirmed.
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "Bad JSON" });
  }

  const {
    payment_id,
    payment_status,
    order_id,
    price_amount,
    price_currency,
    pay_amount,
    pay_currency,
    actually_paid,
  } = payload;

  console.log("NOWPayments IPN ✓ signature valid", {
    payment_id,
    payment_status,
    order_id,
    price_amount,
    price_currency,
    actually_paid,
    pay_currency,
  });

  // ---------------------------------------------------------------------------
  // Payment lifecycle:
  //   waiting → confirming → confirmed → sending → partially_paid
  //   → finished  (fully paid — fulfil order here)
  //   → failed | refunded | expired
  //
  // IMPORTANT: NOWPayments retries the IPN until it gets a 200.
  // Make all fulfilment logic idempotent (check DB status before acting).
  // ---------------------------------------------------------------------------
  switch (payment_status) {
    case "waiting":
    case "confirming":
      // Customer has initiated payment; nothing to fulfil yet.
      console.log(`⏳ Payment ${payment_status} — order ${order_id}`);
      break;

    case "confirmed":
    case "finished":
      // FULFIL HERE:
      //   - Check current order status in DB to avoid double-fulfilment
      //   - Mark order as PAID
      //   - Send receipt email
      //   - Book the session / unlock access / etc.
      console.log(`✅ Payment ${payment_status} — order ${order_id} | paid: ${actually_paid} ${pay_currency}`);
      // TODO: await db.markOrderPaid(order_id, { actually_paid, pay_currency });
      // TODO: await sendReceiptEmail({ order_id, price_amount, price_currency });
      break;

    case "partially_paid":
      // Customer underpaid — do NOT fulfil; flag for manual review.
      console.warn(`⚠️  Partially paid — order ${order_id} | paid: ${actually_paid} / ${price_amount} ${price_currency}`);
      // TODO: await db.markOrderPartiallyPaid(order_id, { actually_paid });
      break;

    case "failed":
    case "expired":
    case "refunded":
      // Mark closed in DB; do not fulfil.
      console.warn(`❌ Payment ${payment_status} — order ${order_id}`);
      // TODO: await db.markOrderClosed(order_id, payment_status);
      break;

    default:
      console.log(`ℹ️  Unknown status "${payment_status}" — order ${order_id}`);
  }

  // Always return 200 on a verified payload — NOWPayments retries on anything else.
  return res.status(200).json({ ok: true });
}
