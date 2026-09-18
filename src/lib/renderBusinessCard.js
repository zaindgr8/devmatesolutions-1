import { loadImage } from "@/src/lib/qrCanvas";

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const RED = "#bd2120";
const RED_BRIGHT = "#e5484d";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function displayUrl(url = "") {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

// Shrinks font-size until the string fits maxWidth, down to a floor size.
function fitText(ctx, text, maxWidth, startPx, floorPx, weight = 800) {
  let size = startPx;
  do {
    ctx.font = `${weight} ${size}px ${FONT}`;
    if (ctx.measureText(text).width <= maxWidth || size <= floorPx) break;
    size -= 2;
  } while (size > floorPx);
  return size;
}

// 1050x600 = a standard 3.5"x2" card at 300dpi — print-ready and a clean
// widescreen aspect for sharing digitally too.
export async function renderBusinessCardCanvas(profile, qrCanvas) {
  const W = 1050;
  const H = 600;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0d0d11");
  bg.addColorStop(1, "#1b1b22");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.88, H * 0.05, 10, W * 0.88, H * 0.05, W * 0.55);
  glow.addColorStop(0, "rgba(189,33,32,0.35)");
  glow.addColorStop(1, "rgba(189,33,32,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, 8, H);

  const padX = 58;
  let logo = null;
  try {
    logo = await loadImage("/red-logo.png");
  } catch {
    logo = null;
  }

  // Brand mark
  if (logo) ctx.drawImage(logo, padX, 40, 42, 42);
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 26px ${FONT}`;
  ctx.fillText("DevMate", padX + (logo ? 54 : 0), 68);
  ctx.fillStyle = RED;
  ctx.font = `700 11px ${FONT}`;
  ctx.fillText("S O L U T I O N S", padX + (logo ? 56 : 0), 84);

  const textMaxWidth = 560;

  // Name
  const nameSize = fitText(ctx, profile.fullName || "Your Name", textMaxWidth, 46, 30, 800);
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${nameSize}px ${FONT}`;
  ctx.fillText(profile.fullName || "Your Name", padX, 210);

  // Designation
  ctx.fillStyle = RED_BRIGHT;
  ctx.font = `600 21px ${FONT}`;
  ctx.fillText(profile.designation || "Team Member", padX, 244);

  // Company / department line
  const subLine = [profile.department, profile.company || "Devmate Solutions"]
    .filter(Boolean)
    .join("  •  ");
  ctx.fillStyle = "#9ca3af";
  ctx.font = `400 15px ${FONT}`;
  ctx.fillText(subLine, padX, 270);

  // Divider
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(padX, 300);
  ctx.lineTo(padX + 430, 300);
  ctx.stroke();

  // Contact rows
  const rows = [
    profile.phone && `\u{1F4DE}  ${profile.phone}`,
    profile.email && `✉️  ${profile.email}`,
    profile.website && `\u{1F310}  ${displayUrl(profile.website)}`,
    profile.location && `\u{1F4CD}  ${profile.location}`,
  ].filter(Boolean);

  ctx.fillStyle = "#e5e7eb";
  ctx.font = `500 17px ${FONT}`;
  let cy = 336;
  rows.forEach((row) => {
    ctx.fillText(row, padX, cy);
    cy += 30;
  });

  // Footer social handles
  const socials = [
    profile.linkedin && "LinkedIn",
    profile.instagram && "Instagram",
    profile.twitter && "X",
    profile.tiktok && "TikTok",
    profile.facebook && "Facebook",
  ].filter(Boolean);
  if (socials.length) {
    ctx.fillStyle = "#6b7280";
    ctx.font = `500 12px ${FONT}`;
    ctx.fillText(`Also on  ${socials.join("  •  ")}`, padX, H - 30);
  }

  // QR panel
  if (qrCanvas) {
    const panel = 372;
    const qx = W - panel - 56;
    const qy = (H - panel) / 2 - 14;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, qx, qy, panel, panel, 22);
    ctx.fill();
    const inner = panel - 44;
    ctx.drawImage(qrCanvas, qx + 22, qy + 22, inner, inner);

    ctx.fillStyle = "#0d0d11";
    ctx.font = `700 13px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("SCAN TO SAVE MY CONTACT", qx + panel / 2, qy + panel + 24);
    ctx.textAlign = "left";
  }

  return canvas;
}

// A clean, standalone QR export (e.g. for an email signature) with a small
// branded caption underneath.
export async function renderQrOnlyCanvas(qrCanvas, profile) {
  const size = qrCanvas.width;
  const footer = 130;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size + footer;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, 0, 0, size, size);

  ctx.textAlign = "center";
  ctx.fillStyle = "#0d0d11";
  ctx.font = `700 ${Math.round(size * 0.045)}px ${FONT}`;
  ctx.fillText(profile.fullName || "Devmate Solutions", size / 2, size + 46);

  ctx.fillStyle = RED;
  ctx.font = `600 ${Math.round(size * 0.032)}px ${FONT}`;
  ctx.fillText("Scan to save my contact", size / 2, size + 78);

  ctx.fillStyle = "#9ca3af";
  ctx.font = `400 ${Math.round(size * 0.026)}px ${FONT}`;
  ctx.fillText(displayUrl(profile.website || "devmatesolutions.com"), size / 2, size + 106);

  ctx.textAlign = "left";
  return canvas;
}
