// Checks the details visitors enter for a voice demo. Used by both demo widgets and the API,
// so the browser and the server always agree on what's valid.
export function validateDemoLead({ customer_name, contact, email }) {
  const errors = {};

  const name = String(customer_name || "").trim();
  const letters = name.match(/\p{L}/gu) || [];
  if (!/^[\p{L}\p{M}' .-]+$/u.test(name) || letters.length < 2) {
    errors.customer_name = "Enter your name, using letters only.";
  }

  // Country code required, in the international format of 8 to 15 digits.
  const phone = String(contact || "").trim();
  const digits = phone.replace(/\D/g, "");
  if (!/^\+[\d\s()-]+$/.test(phone) || digits.length < 8 || digits.length > 15 || digits[0] === "0") {
    errors.contact = "Enter your number with country code, like +971 50 123 4567.";
  }

  if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/.test(String(email || "").trim())) {
    errors.email = "Enter a valid email, like name@company.com.";
  }

  return errors;
}
