import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { localApi } from "@/api/localClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { Brand, LogoMark } from "@/components/club/Brand";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";
import { useState } from "react";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-white"><path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.02-.84.99-2.2 1.75-3.34 1.66-.14-1.13.42-2.34 1.1-3.13.74-.85 2.1-1.5 3.36-1.55zM20.5 17.36c-.57 1.32-.84 1.9-1.58 3.07-1.03 1.62-2.49 3.64-4.3 3.65-1.6.02-2.01-1.05-4.18-1.04-2.17.01-2.62 1.05-4.22 1.04-1.81-.02-3.19-1.83-4.22-3.45C-2.5 17.1-2.8 11.5-.4 8.5c1.36-1.7 3.5-2.8 5.5-2.8 2.03 0 3.3 1.12 4.97 1.12 1.62 0 2.6-1.12 4.95-1.12 1.77 0 3.65.97 4.99 2.64-4.39 2.4-3.68 8.66.49 9.02z"/></svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await localApi.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo;
    } catch (err) {
      setError(err.message || "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[hsl(var(--amethyst))]/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-[hsl(var(--coral))]/10 blur-3xl" />
      </div>

      <div className="relative px-6 pt-16 pb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-10"><ArrowLeft size={16} /> Volver</Link>
        <LogoMark size={200} glow className="mb-1" />
        <p className="text-sm text-muted-foreground mt-4">Bienvenido de vuelta. Descubre lo que está pasando cerca de ti.</p>
      </div>

      <div className="relative px-6 flex-1 space-y-3">
        <Button variant="outline" className="w-full h-12 bg-surface-hover border-border text-title hover:border-[hsl(var(--amethyst))]/50" onClick={() => localApi.auth.loginWithProvider("google", returnTo)}>
          <GoogleIcon className="w-5 h-5 mr-2" /> Continuar con Google
        </Button>
        <Button variant="outline" className="w-full h-12 bg-surface-hover border-border text-title hover:border-[hsl(var(--amethyst))]/50" onClick={() => localApi.auth.loginWithProvider("apple", returnTo)}>
          <AppleIcon /> Continuar con Apple
        </Button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground">o</span></div>
        </div>

        {error && <div className="p-3 rounded-xl bg-coral/10 text-coral text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">Correo</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-muted-foreground">Contraseña</Label>
              <Link to="/forgot-password" className="text-xs text-[hsl(var(--amethyst))] hover:underline">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 bg-surface-hover border-border text-title placeholder:text-muted-foreground" required />
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white flex items-center justify-center disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ingresando…</> : "Iniciar sesión"}
          </motion.button>
        </form>
      </div>

      <p className="relative px-6 py-8 text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link to={"/account-type"} className="text-[hsl(var(--amethyst))] font-medium">Crear una</Link>
      </p>
    </div>
  );
}