import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, Info } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const controls = [
  { key: "showPosts", label: "Mostrar mis publicaciones", desc: "Otras personas verán tus publicaciones en tu perfil." },
  { key: "showLikes", label: "Mostrar mis Me gusta", desc: "Otras personas verán las ofertas que te gustaron." },
  { key: "showSaved", label: "Mostrar mis guardados", desc: "Otras personas verán lo que guardaste." },
  { key: "showReviews", label: "Mostrar mis opiniones", desc: "Otras personas verán y podrán calificar tus reseñas con coronas." },
];

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition-colors ${on ? "gradient-amethyst" : "bg-surface-hover border border-border"}`}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-0.5 w-5 h-5 rounded-full bg-white ${on ? "right-0.5" : "left-0.5"}`} />
    </button>
  );
}

/* Real privacy controls — persisted, and applied on the profile: when another
   person views a profile, sections turned off here do not appear. (In this
   prototype the "other viewer" is simulated with the Ver como otro toggle on
   the profile; with a backend these checks must run server-side too.) */
export default function PrivacySettings() {
  const navigate = useNavigate();
  const { privacy, setPrivacy } = useApp();

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Privacidad</h1>
      </header>

      <div className="px-4 py-4">
        <div className="flex items-start gap-2 p-3 rounded-xl bg-mint/10 border border-mint/30 mb-4">
          <Info size={16} className="text-mint mt-0.5 shrink-0" />
          <p className="text-xs text-foreground">Tú siempre puedes ver tu propia información. Estas opciones controlan lo que ven las demás personas en tu perfil.</p>
        </div>

        <p className="px-1 text-xs text-muted-foreground uppercase tracking-wide mb-1">Visibilidad del perfil</p>
        <div className="bg-surface border-y border-border divide-y divide-border">
          {controls.map((c) => (
            <div key={c.key} className="flex items-center gap-3 px-4 py-3.5">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><Eye size={16} className="text-muted-foreground" /></span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-title">{c.label}</p>
                <p className="text-[11px] text-muted-foreground">{c.desc}</p>
              </div>
              <Toggle on={privacy[c.key]} onClick={() => setPrivacy((p) => ({ ...p, [c.key]: !p[c.key] }))} />
            </div>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground mt-3">
          Puedes comprobar el resultado con el botón <span className="text-title font-medium">“Ver como otro”</span> en tu perfil.
        </p>
      </div>
    </div>
  );
}