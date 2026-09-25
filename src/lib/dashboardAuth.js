// Server-side auth helpers for the /dashboard AI Lead Management tool.
// Uses separate credentials: DASHBOARD_USERNAME / DASHBOARD_PASSWORD

import crypto from "crypto";

export const DASHBOARD_COOKIE_NAME = "dm_dashboard_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.QR_TOOL_COOKIE_SECRET; // reuse same secret
  if (!secret) throw new Error("QR_TOOL_COOKIE_SECRET is not set");
  return secret;
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function checkDashboardCredentials(username, password) {
  const expectedUser = process.env.DASHBOARD_USERNAME || "admin";
  const expectedPass = process.env.DASHBOARD_PASSWORD || "Devmate@2025!";
  if (!username || !password) return false;
  const userOk =
    username.length === expectedUser.length &&
    timingSafeEqual(username, expectedUser);
  const passOk =
    password.length === expectedPass.length &&
    timingSafeEqual(password, expectedPass);
  return userOk && passOk;
}

export function createDashboardSessionCookie(remember = true) {
  const username = process.env.DASHBOARD_USERNAME || "admin";
  const payload = `${username}.${Date.now()}`;
  const token = `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${DASHBOARD_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  // Unchecked "keep me signed in" -> session cookie, cleared when the browser closes.
  if (remember) parts.push(`Max-Age=${COOKIE_MAX_AGE_SECONDS}`);
  if (isProd) parts.push("Secure");
  return parts.join("; ");
}

export function clearDashboardSessionCookie() {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${DASHBOARD_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (isProd) parts.push("Secure");
  return parts.join("; ");
}

export function isValidDashboardSession(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encodedPayload, signature] = parts;
  let payload;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  } catch {
    return false;
  }
  let expectedSignature;
  try {
    expectedSignature = sign(payload);
  } catch {
    return false;
  }
  if (signature.length !== expectedSignature.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  cookieHeader.split(";").forEach((pair) => {
    const idx = pair.indexOf("=");
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    out[key] = decodeURIComponent(value);
  });
  return out;
}
