/**
 * POST /api/freya-calendar
 * Cal.com for Freya's voice calls. The Cal.com API key stays on the server.
 *
 *   { action: "slots", date?: "YYYY-MM-DD", timezone }   → up to 8 open slots (on `date`, or spread over the next days)
 *   { action: "book", start_time, name, email, timezone, phone?, notes? }
 *        → { booked: true, label, uid, meeting_url } once Cal.com has booked it and emailed the invite
 */

const API = "https://api.cal.com/v2";
const EVENT_TYPE_ID = Number(process.env.CALCOM_EVENT_TYPE_ID || 7530377);
const MAX_DAYS_AHEAD = 14;
const MAX_SLOTS = 8;

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim());

function validTz(tz) {
  try { new Intl.DateTimeFormat("en-US", { timeZone: tz }); return tz; } catch { return "Asia/Dubai"; }
}

const label = (iso, timeZone) =>
  new Date(iso).toLocaleString("en-US", { timeZone, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });

async function cal(path, { version, method = "GET", body } = {}) {
  const r = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.CALCOM_API_KEY}`,
      "cal-api-version": version,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(12_000),
  });
  const json = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, json };
}

async function slots({ date, timezone }) {
  const now = Date.now();
  let start = new Date(now + 60 * 60_000); // matches the event type's 1-hour minimum notice
  let end = new Date(now + 7 * 86_400_000);
  if (date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "date must be YYYY-MM-DD." };
    const day = Date.parse(`${date}T12:00:00Z`);
    if (day < now - 86_400_000 || day > now + MAX_DAYS_AHEAD * 86_400_000) {
      return { slots: [], note: "That day is in the past or too far ahead. Offer days within the next two weeks." };
    }
    start = new Date(Math.max(start.getTime(), day - 36 * 3_600_000));
    end = new Date(day + 36 * 3_600_000);
  }
  const q = new URLSearchParams({
    eventTypeId: String(EVENT_TYPE_ID),
    start: start.toISOString(),
    end: end.toISOString(),
    timeZone: timezone,
  });
  const r = await cal(`/slots?${q}`, { version: "2024-09-04" });
  if (!r.ok) throw new Error(`Cal.com slots ${r.status}: ${JSON.stringify(r.json).slice(0, 200)}`);

  // data is { "YYYY-MM-DD" (in the visitor's zone): [{ start }] }
  const hour = (iso) => Number(new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", hourCycle: "h23" }).format(new Date(iso)));
  const sociable = (list) => list.filter((s) => hour(s.start) >= 8 && hour(s.start) < 20);
  let days = Object.entries(r.json.data || {}).filter(([d]) => !date || d === date);
  // Prefer times within the visitor's waking hours; only fall back to the rest when nothing fits.
  const friendly = days.map(([d, list]) => [d, sociable(list)]).filter(([, list]) => list.length);
  if (friendly.length) days = friendly;
  // Spread the options across days rather than eight back-to-back slots on the first day.
  const picked = date
    ? days.flatMap(([, list]) => list)
    : days.flatMap(([, list]) => [list[0], list[Math.floor(list.length / 3)], list[Math.floor((2 * list.length) / 3)]].filter(Boolean))
        .filter((s, i, all) => all.findIndex((x) => x.start === s.start) === i);
  return {
    timezone,
    slots: picked.slice(0, MAX_SLOTS).map((s) => ({
      start_time: new Date(s.start).toISOString(),
      label: `${label(s.start, timezone)} (${timezone})`,
    })),
  };
}

async function book({ start_time, name, email, timezone, phone, notes }) {
  if (!start_time || Number.isNaN(Date.parse(start_time))) return { error: "start_time must be one of the slots from check_availability." };
  if (!name || !isEmail(email)) return { error: "A name and a valid email are required to book." };

  const r = await cal("/bookings", {
    version: "2024-08-13",
    method: "POST",
    body: {
      start: new Date(start_time).toISOString(),
      eventTypeId: EVENT_TYPE_ID,
      attendee: {
        name: String(name).slice(0, 100),
        email: email.trim().toLowerCase(),
        timeZone: timezone,
        language: "en",
        ...(phone ? { phoneNumber: String(phone).replace(/[^\d+]/g, "") } : {}),
      },
      ...(notes ? { bookingFieldsResponses: { notes: String(notes).slice(0, 500) } } : {}),
      metadata: { source: "freya-voice" },
    },
  });
  if (!r.ok || r.json.status === "error") {
    const msg = r.json.error?.message || r.json.message || r.status;
    console.error("Cal.com booking failed:", JSON.stringify(r.json).slice(0, 300));
    return { error: `The calendar couldn't book that time (${String(msg).slice(0, 120)}). Check availability again and offer another slot.` };
  }
  const b = r.json.data || {};
  return { booked: true, uid: b.uid, label: label(b.start || start_time, timezone), meeting_url: b.meetingUrl || b.location || "" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.CALCOM_API_KEY) return res.status(503).json({ error: "Calendar is not connected." });

  const body = req.body || {};
  const timezone = validTz(body.timezone);
  try {
    if (body.action === "slots") return res.status(200).json(await slots({ date: body.date, timezone }));
    if (body.action === "book") return res.status(200).json(await book({ ...body, timezone }));
    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    console.error("Freya calendar error:", err.message);
    return res.status(502).json({ error: "The calendar is unavailable right now." });
  }
}
