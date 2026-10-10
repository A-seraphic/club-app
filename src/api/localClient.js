// Cliente local de autenticación (modo demo).
// Reemplaza al SDK de Base44: guarda usuarios y sesión en el localStorage del navegador.
// Sirve para desarrollar y probar la interfaz sin backend.
// Para producción, reemplaza este archivo por tu backend real (Supabase, Firebase, tu API...)
// manteniendo los mismos nombres de función.

const USERS_KEY = "club_users";
const PENDING_KEY = "club_pending_users";
const SESSION_KEY = "club_session";
const RESET_KEY = "club_reset_tokens";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const normEmail = (e) => String(e || "").trim().toLowerCase();
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random().toString(16).slice(2)}`;

async function hash(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const publicUser = (u) => {
  const { password_hash, ...rest } = u;
  return rest;
};

export const getSessionToken = () => localStorage.getItem(SESSION_KEY);

const currentUser = () => {
  const id = getSessionToken();
  if (!id) return null;
  return read(USERS_KEY, []).find((u) => u.id === id) || null;
};

const auth = {
  async register({ email, password }) {
    const mail = normEmail(email);
    if (read(USERS_KEY, []).some((u) => u.email === mail)) {
      throw new ApiError("Ya existe una cuenta con este correo", 409);
    }
    const pending = read(PENDING_KEY, []).filter((p) => p.email !== mail);
    pending.push({ email: mail, password_hash: await hash(password) });
    write(PENDING_KEY, pending);
    console.info("[modo local] No se envía correo. Para verificar, escribe cualquier código de 6 dígitos.");
    return {};
  },

  async resendOtp() {
    console.info("[modo local] No se envía correo. Usa cualquier código de 6 dígitos.");
    return {};
  },

  async verifyOtp({ email, otpCode }) {
    const mail = normEmail(email);
    const pending = read(PENDING_KEY, []);
    const entry = pending.find((p) => p.email === mail);
    if (!entry || !/^\d{6}$/.test(String(otpCode || ""))) {
      throw new ApiError("Código inválido", 400);
    }
    const users = read(USERS_KEY, []);
    const user = {
      id: uid(),
      email: mail,
      password_hash: entry.password_hash,
      role: users.length === 0 ? "admin" : "user", // el primer usuario es admin
      full_name: "",
      created_date: new Date().toISOString(),
    };
    write(USERS_KEY, [...users, user]);
    write(PENDING_KEY, pending.filter((p) => p.email !== mail));
    return { access_token: user.id, user: publicUser(user) };
  },

  setToken(token) {
    localStorage.setItem(SESSION_KEY, token);
  },

  async loginViaEmailPassword(email, password) {
    const mail = normEmail(email);
    const user = read(USERS_KEY, []).find((u) => u.email === mail);
    if (!user || user.password_hash !== (await hash(password))) {
      throw new ApiError("Correo o contraseña incorrectos", 401);
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return { access_token: user.id, user: publicUser(user) };
  },

  loginWithProvider() {
    window.alert("El inicio de sesión con Google o Apple no está disponible en modo local.");
  },

  async me() {
    const user = currentUser();
    if (!user) throw new ApiError("No autenticado", 401);
    return publicUser(user);
  },

  async isAuthenticated() {
    return !!currentUser();
  },

  async updateMe(data) {
    const user = currentUser();
    if (!user) throw new ApiError("No autenticado", 401);
    const { id, email, role, password_hash, ...allowed } = data || {};
    const updated = { ...user, ...allowed };
    write(USERS_KEY, read(USERS_KEY, []).map((u) => (u.id === user.id ? updated : u)));
    return publicUser(updated);
  },

  logout(redirectUrl = "/login") {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = redirectUrl;
  },

  redirectToLogin(returnUrl) {
    const back = returnUrl ? `?returnTo=${encodeURIComponent(returnUrl)}` : "";
    window.location.href = `/login${back}`;
  },

  async resetPasswordRequest(email) {
    const mail = normEmail(email);
    if (read(USERS_KEY, []).some((u) => u.email === mail)) {
      const token = uid();
      const tokens = read(RESET_KEY, {});
      tokens[token] = { email: mail, expires: Date.now() + 60 * 60 * 1000 };
      write(RESET_KEY, tokens);
      console.info(`[modo local] No se envía correo. Enlace para restablecer: ${window.location.origin}/reset-password?token=${token}`);
    }
    return {};
  },

  async resetPassword({ resetToken, newPassword }) {
    const tokens = read(RESET_KEY, {});
    const entry = tokens[resetToken];
    if (!entry || entry.expires < Date.now()) {
      throw new ApiError("El enlace no es válido o expiró", 400);
    }
    const password_hash = await hash(newPassword);
    write(USERS_KEY, read(USERS_KEY, []).map((u) => (u.email === entry.email ? { ...u, password_hash } : u)));
    delete tokens[resetToken];
    write(RESET_KEY, tokens);
    return {};
  },
};

const app = {
  async getPublicSettings() {
    return { id: "local", public_settings: {} };
  },
};

export const localApi = { auth, app };
