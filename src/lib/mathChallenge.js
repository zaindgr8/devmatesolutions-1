// Utility for generating and cryptographically verifying Math CAPTCHAs

const MATH_SECRET = "devmate_sec_math_challenge_salt_2024";

export function generateMathChallenge() {
  const ops = [
    { a: Math.floor(Math.random() * 9) + 1, b: Math.floor(Math.random() * 9) + 1, op: "+" },
    { a: Math.floor(Math.random() * 9) + 5, b: Math.floor(Math.random() * 5) + 1, op: "-" },
    { a: Math.floor(Math.random() * 5) + 2, b: Math.floor(Math.random() * 5) + 2, op: "×" },
  ];
  const picked = ops[Math.floor(Math.random() * ops.length)];
  const answer = picked.op === "+" ? picked.a + picked.b
    : picked.op === "-" ? picked.a - picked.b
    : picked.a * picked.b;
  const ts = Date.now();
  const raw = `${answer}:${ts}:${MATH_SECRET}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  const token = `${ts}.${Math.abs(hash).toString(36)}`;
  return {
    question: `${picked.a} ${picked.op} ${picked.b}`,
    expectedAnswer: answer,
    token,
  };
}

export function verifyMathChallenge(userAnswer, token) {
  if (userAnswer === undefined || userAnswer === null || String(userAnswer).trim() === "") {
    return { success: false, reason: "missing_math_answer" };
  }
  if (!token || typeof token !== "string") {
    return { success: false, reason: "missing_math_token" };
  }
  const parts = token.split(".");
  if (parts.length !== 2) return { success: false, reason: "invalid_math_token" };
  const ts = Number(parts[0]);
  if (isNaN(ts) || Date.now() - ts > 15 * 60 * 1000) {
    return { success: false, reason: "expired_math_challenge" };
  }
  const numAnswer = parseInt(String(userAnswer).trim(), 10);
  if (isNaN(numAnswer)) return { success: false, reason: "invalid_math_answer" };

  const raw = `${numAnswer}:${ts}:${MATH_SECRET}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  const expectedHash = Math.abs(hash).toString(36);
  if (expectedHash !== parts[1]) {
    return { success: false, reason: "incorrect_math_answer" };
  }
  return { success: true };
}
