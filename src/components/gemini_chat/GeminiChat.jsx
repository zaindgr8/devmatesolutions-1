"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./GeminiChat.module.css";
import { SUGGESTION_CHIPS } from "./devmate-persona";

/* ─── Devmate logo mark as SVG (matches brand) ─── */
const DevmateMark = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
    <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.15)" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
      fill="#fff" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">D</text>
  </svg>
);

/* ─── Send icon ─── */
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Chat icon for launcher ─── */
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.15)"/>
    <circle cx="8" cy="10" r="1" fill="white"/>
    <circle cx="12" cy="10" r="1" fill="white"/>
    <circle cx="16" cy="10" r="1" fill="white"/>
  </svg>
);

/* ─── Close icon ─── */
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
    <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

/* ─── Markdown Link Parser ─── */
const renderMessage = (text) => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <a 
        key={match.index} 
        href={match[2]} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#f87171', textDecoration: 'underline' }}
      >
        {match[1]}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hi! I'm Sarah, Manager at Devmate Solutions. Welcome! How can I help you today?",
  },
];

export default function GeminiChat() {
  const [open, setOpen]               = useState(false);
  const [messages, setMessages]       = useState(INITIAL_MESSAGES);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);

  /* Lead collection state */
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [leadName, setLeadName]               = useState("");
  const [leadEmail, setLeadEmail]             = useState("");
  const [leadPhone, setLeadPhone]             = useState("");
  const [formSubmitting, setFormSubmitting]   = useState(false);
  const [formError, setFormError]             = useState("");

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  /* Check session storage for existing lead info */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("devmate_chat_lead");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.name && parsed.email && parsed.phone) {
            setLeadName(parsed.name);
            setLeadEmail(parsed.email);
            setLeadPhone(parsed.phone);
            setIsFormSubmitted(true);
          }
        } catch (e) {
          console.error("Error parsing saved chat lead:", e);
        }
      }
    }
  }, []);

  /* auto-scroll */
  useEffect(() => {
    if (isFormSubmitted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isFormSubmitted]);

  /* focus input when opened and form is submitted */
  useEffect(() => {
    if (open && isFormSubmitted) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, isFormSubmitted]);

  /* Submit lead form */
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim() || !leadPhone.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadEmail.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/send-chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn("Lead email response warning:", data);
      }

      const leadData = {
        name: leadName.trim(),
        email: leadEmail.trim(),
        phone: leadPhone.trim(),
      };
      if (typeof window !== "undefined") {
        sessionStorage.setItem("devmate_chat_lead", JSON.stringify(leadData));
      }
      setIsFormSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setIsFormSubmitted(true);
    } finally {
      setFormSubmitting(false);
    }
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "API error");
      }

      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Gemini chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having a bit of connectivity trouble right now. Please reach out to us at devmatesolutions.com or try again shortly!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Chip click — sends a pre-filled message directly (bypasses the input state)
  const sendChip = useCallback(async (text) => {
    if (loading) return;
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      if (!res.ok) throw new Error("API error");
      const { reply } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble right now. Please visit devmatesolutions.com or book a meeting with our team!" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  return (
    <>
      {/* ── Launcher button ── */}
      {!open && (
        <button
          className={styles.launcherBtn}
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          title="Chat with Devmate Solutions"
        >
          <ChatIcon />
        </button>
      )}

      {/* ── Chat window ── */}
      {open && (
        <div className={styles.chatWindow} role="dialog" aria-label="Devmate Solutions Chat">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatar}>
              <DevmateMark />
            </div>
            <div className={styles.headerInfo}>
              <p className={styles.headerName}>Devmate Solutions</p>
              <p className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Sarah · Manager · Online
              </p>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {!isFormSubmitted ? (
            /* ── Pre-Chat Lead Form ── */
            <form className={styles.leadFormContainer} onSubmit={handleLeadSubmit}>
              <div className={styles.leadFormHeader}>
                <h3 className={styles.leadFormTitle}>Welcome to Devmate</h3>
                <p className={styles.leadFormSubtitle}>
                  Please enter your details below to start chatting with our team.
                </p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter Your Name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address *</label>
                <input
                  type="email"
                  className={styles.formInput}
                  placeholder="Enter Your Email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Contact Number *</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  placeholder="Enter Your Contact Number"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  required
                />
              </div>

              {formError && <p className={styles.formErrorText}>{formError}</p>}

              <button
                type="submit"
                className={styles.formSubmitBtn}
                disabled={formSubmitting}
              >
                {formSubmitting ? "Starting Chat..." : "Start Chat"}
              </button>
            </form>
          ) : (
            /* ── Active Chat Window ── */
            <>
              {/* Suggestion chips — only shown before user sends first message */}
              {messages.length === 1 && !loading && (
                <div className={styles.chips}>
                  {SUGGESTION_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      className={styles.chip}
                      onClick={() => sendChip(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Messages */}
              <div className={styles.messages}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${styles.bubble} ${
                      msg.role === "user" ? styles.bubbleUser : styles.bubbleBot
                    }`}
                  >
                    {renderMessage(msg.content)}
                  </div>
                ))}

                {loading && (
                  <div className={styles.typing}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={styles.inputArea}>
                <textarea
                  ref={inputRef}
                  className={styles.inputField}
                  placeholder="Type a message..."
                  value={input}
                  rows={1}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  disabled={loading}
                />
                <button
                  className={styles.sendBtn}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </div>
            </>
          )}

          <div className={styles.footer}>
            Powered by AI · <a href="https://devmatesolutions.com" target="_blank" rel="noopener noreferrer">devmatesolutions.com</a>
          </div>
        </div>
      )}
    </>
  );
}

