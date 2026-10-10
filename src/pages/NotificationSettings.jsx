import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bell } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const items = [
  { key: "followers", label: "Nuevos seguidores", desc: "Cuando alguien empieza a seguirte." },
  { key: "likes", label: "Me gusta", desc: "Cuando alguien da like a tu contenido." },
  { key: "comments", label: "Comentarios", desc: "Cuando comentan tus publicaciones o reseñas." },
  { key: "replies", label: "Respuestas", desc: "Cuando responden tus comentarios." },
  { key: "newPromos", label: "Promociones de empresas seguidas", desc: "Nuevas ofertas de negocios que sigues." },
  { key: "expiring", label: "Ofertas guardadas por vencer", desc: "Aviso cuando una oferta guardada termina pronto." },
  { key: "recommendations", label: "Recomendaciones", desc: "Sugerencias según tus preferencias." },
  { key: "commercial", label: "Comunicaciones comerciales", desc: "Promociones y novedades opcionales de CLUB." },
];

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "gradient-amethyst" : "bg-surface-hover border border-border"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-0.5 w-5 h-5 rounded-full bg-white ${on ? "right-0.5" : "left-0.5"}`} />
    </button>
  );
}

/* Notification preferences — persisted locally. These control which in-app
   notifications are surfaced. Push delivery is not yet integrated (noted
   honestly below); when it is, these toggles will gate it. */
export default function NotificationSettings() {
  const navigate = useNavigate();
  const { notifSettings, setNotifSettings } = useApp();

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Notificaciones</h1>
      </header>

      <div className="px-4 py-4">
        <p className="text-xs text-muted-foreground mb-3">Elige qué avisos quieres recibir. Los cambios se guardan automáticamente.</p>
        <div className="bg-surface border-y border-border divide-y divide-border">
          {items.map((it) => (
            <div key={it.key} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><Bell size={16} className="text-muted-foreground" /></span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-title">{it.label}</p>
                <p className="text-[11px] text-muted-foreground">{it.desc}</p>
              </div>
              <Toggle on={notifSettings[it.key]} onClick={() => setNotifSettings((s) => ({ ...s, [it.key]: !s[it.key] }))} />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-3">Nota: las notificaciones push del sistema aún no están integradas. Estos ajustes controlan los avisos dentro de la app.</p>
      </div>
    </div>
  );
}