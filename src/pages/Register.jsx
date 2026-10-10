import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { localApi } from "@/api/localClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, ArrowLeft, UserPlus, User } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Brand, LogoMark } from "@/components/club/Brand";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import { useApp } from "@/lib/AppContext";
import { isValidEmail, isStrongPassword, passwordErrors } from "@/lib/authValidation";

function AppleIcon() {
  return <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white"><path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.02-.84.99-2.2 1.75-3.34 1.66-.14-1.13.42-2.34 1.1-3.13.74-.85 2.1-1.5 3.36-1.55zM20.5 17.36c-.57 1.32-.84 1.9-1.58 3.07-1.03 1.62-2.49 3.64-4.3 3.65-1.6.02-2.01-1.05-4.18-1.04-2.17.01-2.62 1.05-4.22 1.04-1.81-.02-3.19-1.83-4.22-3.45C-2.5 17.1-2.8 11.5-.4 8.5c1.36-1.7 3.5-2.8 5.5-2.8 2.03 0 3.3 1.12 4.97 1.12 1.62 0 2.6-1.12 4.95-1.12 1.77 0 3.65.97 4.99 2.64-4.39 2.4-3.68 8.66.49 9.02z"/></svg>;
}

export default function Register() {
  const navigate = useNavigate();
  const { userType } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [commercial, setCommercial] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Ingresa tu nombre"); return; }
    if (!isValidEmail(email)) { setError("El correo no tiene un formato válido"); return; }
    if (!isStrongPassword(password)) { setError("La contraseña no cumple los requisitos de seguridad"); return; }
    if (password !== confirmPassword) { setError("Las contraseñas no coinciden"); return; }
    if (!acceptTerms) { setError("Debes aceptar los Términos y la Política de privacidad"); return; }
    setLoading(true);
    try {
      await localApi.auth.register({ email, password });
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "No se pudo crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await localApi.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) localApi.auth.setToken(result.access_token);
      // Persist profile data on the real account (server-side).
      try { await localApi.auth.updateMe({ full_name: name.trim(), account_type: userType }); } catch { /* non-fatal */ }
      window.location.href = safeReturnTo();
    } catch (err) {
      setError(err.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await localApi.auth.resendOtp(email);
      toast({ title: "Código enviado", description: "Revisa tu correo para el nuevo código." });
    } catch (err) {
      setError(err.message || "No se pudo reenviar");
    }
  };

  if (showOtp) {
    return (
      <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto px-6 pt-16">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-10"><ArrowLeft size={16} /> Volver</Link>
        <LogoMark size={150} glow className="mb-1" />
        <h1 className="font-display font-bold text-title text-xl mt-6">Verifica tu correo</h1>
        <p className="text-sm text-muted-foreground mt-1">Enviamos un código a {email}</p>
        {error && <div className="mt-4 p-3 rounded-xl bg-coral/10 text-coral text-sm">{error}</div>}
        <div className="flex justify-center my-8">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} className="border-border bg-surface-hover text-title" />)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleVerify} disabled={loading || otpCode.length < 6} className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white flex items-center justify-center disabled:opacity-60">
          {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verificando…</> : "Verificar"}
        </motion.button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          ¿No recibiste el código? <button onClick={handleResend} className="text-[hsl(var(--amethyst))] font-medium">Reenviar</button>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[hsl(var(--amethyst))]/20 blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-72 h-72 rounded-full bg-[hsl(var(--coral))]/10 blur-3xl" />
      </div>
      <div className="relative px-6 pt-16 pb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-10"><ArrowLeft size={16} /> Volver</Link>
        <LogoMark size={200} glow className="mb-1" />
        <p className="text-sm text-muted-foreground mt-4">Únete a CLUB y descubre todas las ofertas cerca de ti.</p>
      </div>

      <div className="relative px-6 flex-1 space-y-3">
        <button onClick={() => localApi.auth.loginWithProvider("google", safeReturnTo())} className="w-full h-12 rounded-full bg-surface-hover border border-border text-title flex items-center justify-center hover:border-[hsl(var(--amethyst))]/50">
          <GoogleIcon className="w-5 h-5 mr-2" /> Continuar con Google
        </button>
        <button onClick={() => localApi.auth.loginWithProvider("apple", safeReturnTo())} className="w-full h-12 rounded-full bg-surface-hover border border-border text-title flex items-center justify-center hover:border-[hsl(var(--amethyst))]/50">
          <AppleIcon /> Continuar con Apple
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground">o</span></div>
        </div>

        {error && <div className="p-3 rounded-xl bg-coral/10 text-coral text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">Nombre</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="name" type="text" autoComplete="name" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">Correo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-muted-foreground">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
            {password && !isStrongPassword(password) && (
              <ul className="text-[11px] text-muted-foreground space-y-0.5">
                {passwordErrors(password).map((e) => <li key={e}>• {e}</li>)}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-muted-foreground">Confirmar contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="confirm" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
          </div>
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 accent-[hsl(var(--mint))]" />
              <span>Acepto los <Link to="/legal/terms" className="text-[hsl(var(--amethyst))] font-medium">Términos y condiciones</Link> y la <Link to="/legal/privacy" className="text-[hsl(var(--amethyst))] font-medium">Política de privacidad</Link>.</span>
            </label>
            <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <input type="checkbox" checked={commercial} onChange={(e) => setCommercial(e.target.checked)} className="mt-0.5 accent-[hsl(var(--mint))]" />
              <span>Quiero recibir comunicaciones comerciales opcionales de CLUB. (Opcional)</span>
            </label>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading || !acceptTerms} className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white flex items-center justify-center disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creando…</> : "Crear cuenta"}
          </motion.button>
        </form>
      </div>

      <p className="relative px-6 py-8 text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link to={"/login" + (safeReturnTo() !== "/" ? "?returnTo=" + encodeURIComponent(safeReturnTo()) : "")} className="text-[hsl(var(--amethyst))] font-medium">Iniciar sesión</Link>
      </p>
    </div>
  );
}