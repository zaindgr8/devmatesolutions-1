"use client";

import React, { useState } from "react";

const FormApp = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const country = form.country.value;
    const contact = form.contact.value;

    // Detect source page for the notification email
    const source =
      typeof window !== "undefined"
        ? window.location.pathname === "/aileadmanagement"
          ? "AI Lead Management Page"
          : `Website (${window.location.pathname})`
        : "Website";

    try {
      // 1. Send to Make.com webhook (primary CRM flow)
      const res = await fetch(
        "https://hook.eu2.make.com/1zy2xcx4j4twvg8f1gbjqbcxlstd2r6v",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, country, contact, source }),
        }
      );

      if (res.ok) {
        setSuccess(true);
        form.reset();

        // 2. Fire lead notification email (non-blocking — don't await)
        fetch("/api/send-lead-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, country, contact, source }),
        }).catch((err) => console.warn("Lead email notification failed:", err));

      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white dark:bg-[#18181b] rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-4 border border-gray-100 dark:border-gray-800 relative"
    >

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <label htmlFor="name" className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="YOUR FULL NAME"
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#e11d48]/30 transition w-full"
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="ENTER YOUR EMAIL"
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#e11d48]/30 transition w-full"
          />
        </label>
      </div>
      <label htmlFor="contact" className="flex flex-col gap-1 w-full mt-2">
        <span className="text-sm font-medium text-foreground">
          Phone number <span className="text-[#e11d48]">*</span>
        </span>
        <div className="flex gap-2 w-full">
          <select
            name="country"
            aria-label="Country code"
            className="px-2 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none max-h-48 overflow-y-auto w-24 sm:w-28"
            defaultValue="+971"
          >
            <option value="+973">🇧🇭 +973</option>
            <option value="+32">🇧🇪 +32</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+39">🇮🇹 +39</option>
            <option value="+965">🇰🇼 +965</option>
            <option value="+31">🇳🇱 +31</option>
            <option value="+968">🇴🇲 +968</option>
            <option value="+92">🇵🇰 +92</option>
            <option value="+48">🇵🇱 +48</option>
            <option value="+974">🇶🇦 +974</option>
            <option value="+966">🇸🇦 +966</option>
            <option value="+34">🇪🇸 +34</option>
            <option value="+46">🇸🇪 +46</option>
            <option value="+41">🇨🇭 +41</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+1">🇺🇸 +1</option>
          </select>
          <input
            id="contact"
            type="tel"
            name="contact"
            required
            placeholder="ENTER YOUR CONTACT NUMBER"
            className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#e11d48]/30 transition w-full"
          />
        </div>
      </label>
      <button
        type="submit"
        className="mt-4 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-lg py-3 font-semibold text-lg shadow transition focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 w-full"
        disabled={loading}
      >
        {loading ? "Sending..." : "Get Call Now"}
      </button>
      {success && (
        <p className="text-green-600 text-center text-sm mt-2">
          Submitted successfully! You will receive the call within next 60
          seconds!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
};

export default FormApp;
