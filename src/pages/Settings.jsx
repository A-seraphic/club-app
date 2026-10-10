import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, User, Bell, MapPin, SlidersHorizontal, Shield, HelpCircle, LogOut, Palette, FileText, Cookie, Lock } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { useApp } from "@/lib/AppContext";
import { useAuth } from "@/lib/AuthContext";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "gradient-amethyst" : "bg-surface-hover border border-border"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-0.5 w-5 h-5 rounded-full bg-white ${on ? "right-0.5" : "left-0.5"}`} />
    </button>
  );
}

function Row({ item, navigate, onLogout }) {
  if (item.radio) {
    return (
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-3 mb-3">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><item.icon size={16} className="text-muted-foreground" /></span>
          <span className="text-sm text-title">{item.label}</span>
        </div>
        <div className="flex gap-2">
          {["system", "light", "dark"].map((t) => (
            <button key={t} onClick={() => item.setTheme(t)}
              className={`flex-1 h-10 rounded-xl border-2 text-xs font-medium capitalize transition-all ${item.theme === t ? "border-mint bg-mint/10 text-title" : "border-border bg-surface-hover text-muted-foreground"}`}>
              {t === "system" ? "Sistema" : t === "light" ? "Claro" : "Oscuro"}
            </button>
          ))}
        </div>
      </div>
    );
  }
  const onClick = () => {
    if (item.danger) onLogout();
    else if (item.to) navigate(item.to);
  };
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5">
      <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><item.icon size={16} className={item.danger ? "text-coral" : "text-muted-foreground"} /></span>
      <span className={`text-sm flex-1 text-left ${item.danger ? "text-coral" : "text-title"}`}>{item.label}</span>
      {item.toggle ? (
        <Toggle on={item.on} onClick={() => item.setPrivacy((p) => ({ ...p, [item.key]: !p[item.key] }))} />
      ) : (
        <>
          {item.value && <span className="text-xs text-muted-foreground">{item.value}</span>}
          {!item.danger && <ChevronRight size={16} className="text-muted-foreground" />}
        </>
      )}
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { location, clearUserData } = useApp();
  const { logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const doLogout = () => {
    setConfirmLogout(false);
    // 1. Clear private local data (likes, saves, profile, preferences, ratings).
    clearUserData();
    // 2. Real logout via the auth provider: clears the token and hard-redirects
    //    to /login so the session cannot be restored and the nav stack resets.
    logout("/login");
  };

  const groups = [
    { title: "Apariencia", items: [{ icon: Palette, label: "Tema", radio: true, theme, setTheme }] },
    { title: "Cuenta", items: [
      { icon: User, label: "Editar perfil", to: "/edit-profile" },
      { icon: Lock, label: "Privacidad", to: "/privacy" },
      { icon: Bell, label: "Notificaciones", to: "/notification-settings" },
      { icon: MapPin, label: "Ubicación", value: location?.label || "Neiva, Huila" },
    ] },
    { title: "Preferencias", items: [
      { icon: SlidersHorizontal, label: "Preferencias de contenido", to: "/content-preferences" },
      { icon: Shield, label: "Seguridad", to: "/security" },
    ] },
    { title: "Soporte y legal", items: [
      { icon: HelpCircle, label: "Ayuda", to: "/help" },
      { icon: FileText, label: "Política de privacidad", to: "/legal/privacy" },
      { icon: FileText, label: "Términos y condiciones", to: "/legal/terms" },
      { icon: Cookie, label: "Política de cookies", to: "/legal/cookies" },
      { icon: LogOut, label: "Cerrar sesión", danger: true },
    ] },
  ];

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Configuración</h1>
      </header>
      <div className="py-4 space-y-6">
        {groups.map((grp) => (
          <div key={grp.title}>
            <p className="px-4 text-xs text-muted-foreground uppercase tracking-wide mb-1">{grp.title}</p>
            <div className="bg-surface border-y border-border divide-y divide-border">
              {grp.items.map((it) => <Row key={it.label} item={it} navigate={navigate} onLogout={() => setConfirmLogout(true)} />)}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={confirmLogout} onOpenChange={setConfirmLogout}>
        <AlertDialogContent className="max-w-[420px] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Cerrar sesión</AlertDialogTitle>
            <AlertDialogDescription>¿Seguro que quieres salir? Se cerrará tu sesión y se borrarán los datos privados de este dispositivo. Tendrás que volver a iniciar sesión para acceder a tus contenidos.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={doLogout} className="rounded-full bg-coral text-white hover:bg-coral">Cerrar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}