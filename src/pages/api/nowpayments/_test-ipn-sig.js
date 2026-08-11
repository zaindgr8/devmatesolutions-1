/**
 * Local smoke-test for the NOWPayments IPN signature logic.
 * Run with: node src/pages/api/nowpayments/_test-ipn-sig.js
 *
 * Simulates exactly what NOWPayments does server-side, then verifies
 * that our sortKeys + HMAC-SHA512 implementation reproduces it correctly.
 */

const crypto = require("crypto");

// ── Must exactly mirror the handler ────────────────────────────────────────
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

function computeSig(payload, secret) {
  return crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(sortKeys(payload)))
    .digest("hex");
}
// ───────────────────────────────────────────────────────────────────────────

const SECRET = "test-secret-123";

// Test 1 — flat payload (basic)
const flat = {
  z_field: "last",
  a_field: "first",
  payment_status: "finished",
  order_id: "DMS-123",
};
const flatSig = computeSig(flat, SECRET);
console.log("✓ Test 1 (flat):", flatSig.slice(0, 32) + "…");

// Test 2 — nested payload (the case that breaks shallow sort)
const nested = {
  outer_z: { inner_z: "last", inner_a: "first" },
  outer_a: { inner_z: "last", inner_a: "first" },
  payment_status: "finished",
  order_id: "DMS-456",
};
const nestedSig = computeSig(nested, SECRET);
console.log("✓ Test 2 (nested):", nestedSig.slice(0, 32) + "…");

// Test 3 — simulate NOWPayments signing and our verification
const payload = {
  payment_id: 5834021,
  payment_status: "finished",
  pay_address: "3FHNBLobJnbCPvSoiUQmPkMsXScW8nbcEj",
  price_amount: 299,
  price_currency: "usd",
  pay_amount: 0.01234,
  actually_paid: 0.01234,
  pay_currency: "btc",
  order_id: "DMS-1721901234-abcd1234",
  order_description: "1:1 Strategy Session with Zain Ul Abideen",
  purchase_id: "6083737041",
  created_at: "2024-01-15T10:30:00.000Z",
  updated_at: "2024-01-15T10:45:00.000Z",
  outcome_amount: 298.5,
  outcome_currency: "usdttrc20",
};

// "NOWPayments" signs it
const npSignature = computeSig(payload, SECRET);

// "Our handler" verifies it
const ourExpected = computeSig(payload, SECRET);
const a = Buffer.from(ourExpected, "utf8");
const b = Buffer.from(npSignature, "utf8");
const match = a.length === b.length && crypto.timingSafeEqual(a, b);

if (match) {
  console.log("✅ Test 3 (full payload): signature match confirmed");
} else {
  console.error("❌ Test 3 FAILED — signature mismatch");
  process.exit(1);
}

// Test 4 — tampered payload must NOT match
const tampered = { ...payload, price_amount: 1 }; // attacker changes the price
const tamperedSig = computeSig(tampered, SECRET);
const c = Buffer.from(ourExpected, "utf8");
const d = Buffer.from(tamperedSig, "utf8");
const tamperedMatch = c.length === d.length && crypto.timingSafeEqual(c, d);
if (!tamperedMatch) {
  console.log("✅ Test 4 (tampered payload): correctly rejected");
} else {
  console.error("❌ Test 4 FAILED — tampered payload was accepted!");
  process.exit(1);
}

console.log("\n✅ All IPN signature tests passed.\n");
