import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
  FaTiktok,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaDownload,
  FaPrint,
  FaRightFromBracket,
  FaFloppyDisk,
  FaTrash,
  FaPlus,
  FaTriangleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";

import { buildVCard, slugify } from "@/src/lib/vcard";
import { generateQrCanvas, canvasToDownload } from "@/src/lib/qrCanvas";
import { renderBusinessCardCanvas, renderQrOnlyCanvas } from "@/src/lib/renderBusinessCard";
import styles from "./DigitalCardStudio.module.css";

const DRAFT_KEY = "dm_qr_draft_v1";
const SAVED_KEY = "dm_qr_saved_cards_v1";

const DEFAULT_PROFILE = {
  fullName: "",
  designation: "",
  department: "",
  company: "Devmate Solutions",
  phone: "",
  whatsapp: "",
  email: "",
  website: "https://www.devmatesolutions.com",
  location: "",
  linkedin: "https://www.linkedin.com/company/144599158",
  instagram: "https://www.instagram.com/devmatesolutions/",
  twitter: "",
  tiktok: "",
  facebook: "https://www.facebook.com/devmatesolutions",
  notes: "",
};

function genId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function displayUrl(url = "") {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const FIELDS = {
  fullName: { label: "Full Name", placeholder: "e.g. Sarah Khan", required: true },
  designation: { label: "Designation / Title", placeholder: "e.g. Chief Executive Officer", required: true },
  department: { label: "Department (optional)", placeholder: "e.g. Growth, Engineering" },
  phone: { label: "Phone Number", placeholder: "+971 5X XXX XXXX" },
  whatsapp: { label: "WhatsApp (if different)", placeholder: "+971 5X XXX XXXX" },
  email: { label: "Work Email", placeholder: "you@devmatesolutions.com" },
  company: { label: "Company", placeholder: "Devmate Solutions" },
  website: { label: "Website", placeholder: "https://www.devmatesolutions.com" },
  location: { label: "Location (optional)", placeholder: "e.g. Business Bay, Dubai" },
  linkedin: { label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
  instagram: { label: "Instagram URL", placeholder: "https://instagram.com/..." },
  twitter: { label: "X / Twitter URL", placeholder: "https://x.com/..." },
  tiktok: { label: "TikTok URL", placeholder: "https://tiktok.com/@..." },
  facebook: { label: "Facebook URL", placeholder: "https://facebook.com/..." },
  notes: { label: "Personal tagline (optional)", placeholder: "e.g. Let's build something great." },
};

const DigitalCardStudio = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [activeId, setActiveId] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [busy, setBusy] = useState(null);
  const [status, setStatus] = useState("");
  const qrHolderRef = useRef(null);
  const statusTimer = useRef(null);

  // Load draft + saved cards once on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(draft) });
    } catch {}
    try {
      const saved = localStorage.getItem(SAVED_KEY);
      if (saved) setSavedCards(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist draft as the user types
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(profile));
      } catch {}
    }, 300);
    return () => clearTimeout(timer);
  }, [profile]);

  const vcardText = useMemo(() => buildVCard(profile), [profile]);

  const isValid =
    profile.fullName.trim().length > 1 &&
    profile.designation.trim().length > 1 &&
    (profile.phone.trim().length > 3 || profile.email.trim().length > 3);

  // Regenerate the live QR preview (debounced)
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const canvas = await generateQrCanvas(vcardText, { size: 280 });
        if (cancelled || !qrHolderRef.current) return;
        qrHolderRef.current.innerHTML = "";
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
        canvas.style.borderRadius = "14px";
        qrHolderRef.current.appendChild(canvas);
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [vcardText]);

  const flashStatus = (msg) => {
    setStatus(msg);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 3000);
  };

  const handleChange = (key) => (e) => {
    setProfile((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleNewCard = () => {
    setProfile(DEFAULT_PROFILE);
    setActiveId(null);
    flashStatus("Started a new card.");
  };

  const persistSavedCards = (next) => {
    setSavedCards(next);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {}
  };

  const handleSaveCard = () => {
    const id = activeId || genId();
    const entry = { id, savedAt: Date.now(), profile };
    const next = [entry, ...savedCards.filter((c) => c.id !== id)];
    persistSavedCards(next);
    setActiveId(id);
    flashStatus("Saved on this device.");
  };

  const handleLoadCard = (card) => {
    setProfile({ ...DEFAULT_PROFILE, ...card.profile });
    setActiveId(card.id);
    flashStatus(`Loaded ${card.profile.fullName || "card"}.`);
  };

  const handleDeleteCard = (id) => {
    persistSavedCards(savedCards.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const handleDownloadCard = async () => {
    setBusy("card");
    try {
      const qr = await generateQrCanvas(vcardText, { size: 700 });
      const canvas = await renderBusinessCardCanvas(profile, qr);
      canvasToDownload(canvas, `${slugify(profile.fullName)}-devmate-card.png`);
    } catch (err) {
      console.error(err);
      flashStatus("Couldn't generate the card. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleDownloadQr = async () => {
    setBusy("qr");
    try {
      const qr = await generateQrCanvas(vcardText, { size: 900 });
      const canvas = await renderQrOnlyCanvas(qr, profile);
      canvasToDownload(canvas, `${slugify(profile.fullName)}-qr.png`);
    } catch (err) {
      console.error(err);
      flashStatus("Couldn't generate the QR image. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const handleDownloadVcf = () => {
    const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(profile.fullName)}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = async () => {
    const win = window.open("", "_blank");
    setBusy("print");
    try {
      const qr = await generateQrCanvas(vcardText, { size: 700 });
      const canvas = await renderBusinessCardCanvas(profile, qr);
      const dataUrl = canvas.toDataURL("image/png");
      if (win) {
        win.document.write(
          `<!doctype html><html><head><title>${profile.fullName || "Devmate"} — Business Card</title></head>` +
            `<body style="margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff;">` +
            `<img src="${dataUrl}" style="width:100%;max-width:900px;" onload="window.print()" /></body></html>`
        );
        win.document.close();
      }
    } catch (err) {
      console.error(err);
      if (win) win.close();
      flashStatus("Couldn't prepare the print preview.");
    } finally {
      setBusy(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/qr/logout", { method: "POST" });
    router.replace(router.asPath);
  };

  const socialFields = [
    { key: "linkedin", icon: <FaLinkedinIn /> },
    { key: "instagram", icon: <FaInstagram /> },
    { key: "twitter", icon: <FaXTwitter /> },
    { key: "tiktok", icon: <FaTiktok /> },
    { key: "facebook", icon: <FaFacebookF /> },
  ];

  const renderInput = (key, type = "text") => {
    const meta = FIELDS[key];
    return (
      <div className={styles.field} key={key}>
        <label htmlFor={`f-${key}`}>
          {meta.label}
          {meta.required && <span className={styles.req}>*</span>}
        </label>
        <input
          id={`f-${key}`}
          type={type}
          placeholder={meta.placeholder}
          value={profile[key]}
          onChange={handleChange(key)}
        />
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <img src="/red-logo.png" alt="Devmate Solutions" />
          <div>
            <div className={styles.brandTitle}>Digital Business Card Studio</div>
            <div className={styles.brandSub}>Devmate Solutions · Internal Tool</div>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout} type="button">
          <FaRightFromBracket /> Logout
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.formPanel}>
          <div className={styles.formHeaderRow}>
            <h2>Your Details</h2>
            <button className={styles.ghostBtn} onClick={handleNewCard} type="button">
              <FaPlus /> New
            </button>
          </div>

          {!isValid && (
            <div className={styles.hint}>
              <FaTriangleExclamation />
              Add your name, title, and a phone or email to generate a working QR code.
            </div>
          )}

          <div className={styles.sectionLabel}>About You</div>
          <div className={styles.grid2}>
            {renderInput("fullName")}
            {renderInput("designation")}
          </div>
          <div className={styles.grid2}>
            {renderInput("department")}
            {renderInput("location")}
          </div>

          <div className={styles.sectionLabel}>Contact</div>
          <div className={styles.grid2}>
            {renderInput("phone", "tel")}
            {renderInput("whatsapp", "tel")}
          </div>
          {renderInput("email", "email")}

          <div className={styles.sectionLabel}>Company</div>
          <div className={styles.grid2}>
            {renderInput("company")}
            {renderInput("website", "url")}
          </div>

          <div className={styles.sectionLabel}>Socials</div>
          <div className={styles.socialGrid}>
            {socialFields.map(({ key, icon }) => (
              <div className={styles.field} key={key}>
                <label htmlFor={`f-${key}`}>
                  {icon} {FIELDS[key].label}
                </label>
                <input
                  id={`f-${key}`}
                  type="url"
                  placeholder={FIELDS[key].placeholder}
                  value={profile[key]}
                  onChange={handleChange(key)}
                />
              </div>
            ))}
          </div>

          {renderInput("notes")}

          <div className={styles.savedSection}>
            <div className={styles.formHeaderRow}>
              <h3>Saved on this device</h3>
              <button className={styles.ghostBtn} onClick={handleSaveCard} type="button">
                <FaFloppyDisk /> {activeId ? "Update" : "Save"}
              </button>
            </div>
            {savedCards.length === 0 ? (
              <p className={styles.emptyNote}>
                No saved cards yet on this browser. Useful if you're creating cards for multiple teammates from one
                device.
              </p>
            ) : (
              <ul className={styles.savedList}>
                {savedCards.map((card) => (
                  <li key={card.id} className={card.id === activeId ? styles.savedActive : ""}>
                    <button type="button" onClick={() => handleLoadCard(card)}>
                      <strong>{card.profile.fullName || "Untitled"}</strong>
                      <span>{card.profile.designation}</span>
                    </button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteCard(card.id)}
                      aria-label="Delete saved card"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className={styles.previewPanel}>
          <div className={styles.previewSticky}>
            <div className={styles.card}>
              <div className={styles.cardTopRow}>
                <img src="/red-logo.png" alt="" className={styles.cardLogo} />
                <div>
                  <div className={styles.cardBrand}>DevMate</div>
                  <div className={styles.cardBrandSub}>SOLUTIONS</div>
                </div>
              </div>

              <div className={styles.cardName}>{profile.fullName || "Your Name"}</div>
              <div className={styles.cardTitle}>{profile.designation || "Your Designation"}</div>
              <div className={styles.cardCompany}>
                {[profile.department, profile.company || "Devmate Solutions"].filter(Boolean).join(" • ")}
              </div>

              <div className={styles.cardDivider} />

              <ul className={styles.cardContactList}>
                {profile.phone && (
                  <li>
                    <FaPhone /> {profile.phone}
                  </li>
                )}
                {profile.email && (
                  <li>
                    <FaEnvelope /> {profile.email}
                  </li>
                )}
                {profile.website && (
                  <li>
                    <FaGlobe /> {displayUrl(profile.website)}
                  </li>
                )}
                {profile.location && (
                  <li>
                    <FaLocationDot /> {profile.location}
                  </li>
                )}
              </ul>

              <div className={styles.cardQrWrap}>
                <div className={styles.cardQrHolder} ref={qrHolderRef} />
                <span>Scan to save my contact</span>
              </div>

              <div className={styles.cardSocialRow}>
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                )}
                {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                    <FaInstagram />
                  </a>
                )}
                {profile.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer" title="X">
                    <FaXTwitter />
                  </a>
                )}
                {profile.tiktok && (
                  <a href={profile.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok">
                    <FaTiktok />
                  </a>
                )}
                {profile.facebook && (
                  <a href={profile.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                    <FaFacebookF />
                  </a>
                )}
                {profile.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleDownloadCard}
                disabled={!isValid || busy === "card"}
              >
                <FaDownload /> {busy === "card" ? "Generating…" : "Download Business Card (PNG)"}
              </button>
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleDownloadQr}
                  disabled={!isValid || busy === "qr"}
                >
                  <FaDownload /> QR Only
                </button>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handleDownloadVcf}
                  disabled={!isValid}
                >
                  <FaDownload /> vCard (.vcf)
                </button>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={handlePrint}
                  disabled={!isValid || busy === "print"}
                >
                  <FaPrint /> Print
                </button>
              </div>
            </div>

            {status && (
              <div className={styles.statusToast}>
                <FaCircleCheck /> {status}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DigitalCardStudio;
