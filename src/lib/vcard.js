// Builds an RFC-2426 (vCard 3.0) contact card string from a profile object.
// vCard 3.0 (not 4.0) is used deliberately — it has the broadest, most
// reliable "tap to save contact" support across iOS and Android scanners.

function escapeVCardValue(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// vCard lines must be folded at 75 octets; long URL/NOTE lines otherwise
// break parsing on some Android contact apps.
function foldLine(line) {
  const MAX = 75;
  if (line.length <= MAX) return line;
  let result = line.slice(0, MAX);
  let rest = line.slice(MAX);
  while (rest.length > 0) {
    result += "\r\n " + rest.slice(0, MAX - 1);
    rest = rest.slice(MAX - 1);
  }
  return result;
}

function splitName(fullName = "") {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");
  if (parts.length === 1) return { first: parts[0] || "", last: "" };
  const first = parts.slice(0, -1).join(" ");
  const last = parts[parts.length - 1];
  return { first, last };
}

export function buildVCard(profile) {
  const {
    fullName = "",
    designation = "",
    department = "",
    company = "Devmate Solutions",
    phone = "",
    whatsapp = "",
    email = "",
    website = "https://devmatesolutions.com",
    location = "",
    linkedin = "",
    instagram = "",
    twitter = "",
    tiktok = "",
    facebook = "",
    notes = "",
  } = profile || {};

  const { first, last } = splitName(fullName);

  const lines = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`N:${escapeVCardValue(last)};${escapeVCardValue(first)};;;`);
  lines.push(`FN:${escapeVCardValue(fullName)}`);

  if (company || department) {
    lines.push(`ORG:${escapeVCardValue(company)}${department ? ";" + escapeVCardValue(department) : ""}`);
  }
  if (designation) lines.push(`TITLE:${escapeVCardValue(designation)}`);

  if (phone) lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCardValue(phone)}`);
  if (whatsapp && whatsapp !== phone) lines.push(`TEL;TYPE=CELL:${escapeVCardValue(whatsapp)}`);
  if (email) lines.push(`EMAIL;TYPE=WORK,INTERNET:${escapeVCardValue(email)}`);

  if (website) lines.push(`URL;TYPE=Work:${escapeVCardValue(website)}`);
  if (linkedin) lines.push(`URL;TYPE=LinkedIn:${escapeVCardValue(linkedin)}`);
  if (instagram) lines.push(`URL;TYPE=Instagram:${escapeVCardValue(instagram)}`);
  if (twitter) lines.push(`URL;TYPE=X:${escapeVCardValue(twitter)}`);
  if (tiktok) lines.push(`URL;TYPE=TikTok:${escapeVCardValue(tiktok)}`);
  if (facebook) lines.push(`URL;TYPE=Facebook:${escapeVCardValue(facebook)}`);

  // X-SOCIALPROFILE is read by iOS/Android contact apps to render proper
  // social icons (URL; above is the universal fallback for anything else).
  if (linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeVCardValue(linkedin)}`);
  if (instagram) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${escapeVCardValue(instagram)}`);
  if (twitter) lines.push(`X-SOCIALPROFILE;TYPE=twitter:${escapeVCardValue(twitter)}`);
  if (tiktok) lines.push(`X-SOCIALPROFILE;TYPE=tiktok:${escapeVCardValue(tiktok)}`);
  if (facebook) lines.push(`X-SOCIALPROFILE;TYPE=facebook:${escapeVCardValue(facebook)}`);

  if (location) lines.push(`ADR;TYPE=WORK:;;${escapeVCardValue(location)};;;;`);

  const noteBits = [notes, "Connect with Devmate Solutions — AI & software growth partners."]
    .filter(Boolean)
    .join(" ");
  lines.push(`NOTE:${escapeVCardValue(noteBits)}`);

  lines.push("END:VCARD");

  return lines.map(foldLine).join("\r\n");
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "devmate-contact";
}
