import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, KeyRound, Monitor, Trash2, ShieldCheck, AlertTriangle, X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useApp } from "@/lib/AppContext";
import { useToast } from "@/components/ui/use-toast";

/* Security center — honest about what works and what needs a backend.
   - Change password / sessions / login activity: require the auth backend
     (noted as pending).
   - Account deletion: a confirmation flow that, in this prototype, clears
     local data and logs out. With a backend it must request deletion server-side. */
export default function Security() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearUserData } = useApp();
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const pending = (label) => toast({ title: `${label} requiere backend`, description: "Aún no está disponible en este prototipo." });

  const deleteAccount = () => {
    clearUserData();
    toast({ title: "Cuenta eliminada (demo)", description: "Se borraron los datos locales y se cerró la sesión." });
    setTimeout(() => logout("/login"), 600);
  };

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Seguridad</h1>
      </header>

      <div className="px-4 py-4 space-y-6">
        <div className="flex items-start gap-2 p-3 rounded-xl bg-mint/10 border border-mint/30">
          <ShieldCheck size={16} className="text-mint mt-0.5 shrink-0" />
          <p className="text-xs text-foreground">Tu sesión se gestiona con el sistema de autenticación de CLUB. Las funciones marcadas como <span className="font-medium">pendiente</span> requieren el backend de cuentas.</p>
        </div>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Cuenta</p>
          <div className="bg-surface border-y border-border divide-y divide-border">
            <Row icon={KeyRound} label="Cambiar contraseña" onClick={() => pending("Cambiar contraseña")} pending />
            <Row icon={Monitor} label="Sesiones activas" onClick={() => pending("Sesiones activas")} pending />
            <Row icon={Monitor} label="Actividad de inicio de sesión" onClick={() => pending("Actividad de inicio de sesión")} pending />
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Recuperación</p>
          <div className="bg-surface border-y border-border divide-y divide-border">
            <Row icon={ShieldCheck} label="Recuperar cuenta" onClick={() => navigate("/forgot-password")} />
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Zona de riesgo</p>
          <div className="bg-surface border-y border-border">
            <button onClick={() => setConfirmDelete(true)} className="w-full flex items-center gap-3 px-4 py-3.5">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-coral/10"><Trash2 size={16} className="text-coral" /></span>
              <div className="flex-1 text-left">
                <p className="text-sm text-coral">Eliminar cuenta</p>
                <p className="text-[11px] text-muted-foreground">Borra tus datos y cierra la sesión.</p>
              </div>
            </button>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmDelete(false)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-title text-lg">Eliminar cuenta</h3>
                <button onClick={() => setConfirmDelete(false)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><X size={18} /></button>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-coral/10 mb-4">
                <AlertTriangle size={16} className="text-coral mt-0.5 shrink-0" />
                <p className="text-xs text-foreground">Esta acción borrará tus datos locales (likes, guardados, perfil, preferencias y calificaciones) y cerrará tu sesión. En una versión con backend, esto enviaría una solicitud de eliminación al servidor.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(false)} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium">Cancelar</button>
                <button onClick={deleteAccount} className="flex-[1.2] h-12 rounded-full bg-coral text-white font-semibold">Eliminar definitivamente</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ icon: Icon, label, onClick, pending }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5">
      <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><Icon size={16} className="text-muted-foreground" /></span>
      <span className="text-sm text-title flex-1 text-left">{label}</span>
      {pending && <span className="text-[10px] text-muted-foreground bg-surface-hover rounded px-1.5 py-0.5">pendiente</span>}
    </button>
  );
}