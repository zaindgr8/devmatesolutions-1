// Client-only QR rendering helpers for the /qr Digital Business Card studio.
// The QR payload is the vCard itself (not a URL), so a scan saves the
// contact immediately — no server/database needed for this to work.

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Logo covers ~7% of the QR area, centered — comfortably inside the ~30%
// damage budget that error-correction level "H" can recover from.
export async function generateQrCanvas(
  text,
  { size = 480, logoSrc = "/red-logo.png" } = {}
) {
  const QRCode = (await import("qrcode")).default;
  const canvas = document.createElement("canvas");

  await QRCode.toCanvas(canvas, text, {
    width: size,
    margin: 1,
    errorCorrectionLevel: "H",
    color: { dark: "#101014", light: "#ffffff" },
  });

  if (!logoSrc) return canvas;

  const ctx = canvas.getContext("2d");
  const logo = await loadImage(logoSrc).catch(() => null);
  if (!logo) return canvas;

  const logoSize = size * 0.2;
  const pad = logoSize * 0.16;
  const x = (size - logoSize) / 2;
  const y = (size - logoSize) / 2;

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, x - pad, y - pad, logoSize + pad * 2, logoSize + pad * 2, logoSize * 0.18);
  ctx.fill();

  ctx.drawImage(logo, x, y, logoSize, logoSize);
  return canvas;
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function canvasToDownload(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
