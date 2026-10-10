// Shared auth validation helpers — used by Register and ResetPassword so the
// rules live in one place. Client-side checks guide the user; the auth
// backend enforces the authoritative rules on register / reset / login.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_RE.test((email || "").trim());
}

export const PASSWORD_MIN = 8;

// Returns a list of unmet password requirements (Spanish).
export function passwordErrors(pw) {
  const p = pw || "";
  const errs = [];
  if (p.length < PASSWORD_MIN) errs.push("Al menos 8 caracteres");
  if (!/[a-zA-Z]/.test(p)) errs.push("Al menos una letra");
  if (!/[0-9]/.test(p)) errs.push("Al menos un número");
  return errs;
}

export function isStrongPassword(pw) {
  return passwordErrors(pw).length === 0;
}