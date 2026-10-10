import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, ChevronDown, LifeBuoy, Mail, MessageCircle } from "lucide-react";

const faqs = [
  { q: "¿Cómo encuentro ofertas?", a: "En la pantalla de Inicio verás las ofertas cercanas. Usa las categorías o la sección Buscar para filtrar por tipo de negocio, distancia o descuento. También puedes preguntarle a CLUB AI desde Buscar." },
  { q: "¿Cómo utilizo una promoción?", a: "Abre la oferta, toca “Obtener oferta” y verás un código. Menciónalo o muéstralo en el negocio antes de que termine la vigencia indicada en la promoción." },
  { q: "¿Cómo guardo publicaciones u ofertas?", a: "Toca el ícono de marcador en una oferta o publicación. Todo lo guardado aparece en tu perfil, en la pestaña Guardados." },
  { q: "¿Cómo administro mi privacidad?", a: "Ve a Configuración → Privacidad. Ahí decides si otras personas ven tus publicaciones, Me gusta, guardados u opiniones. Tú siempre puedes ver tu propia información." },
  { q: "¿Cómo gestiono una cuenta empresarial?", a: "Si tu cuenta es empresarial, accedes al Panel de empresa desde el perfil o el menú. Ahí puedes crear y administrar ofertas." },
  { q: "¿Cómo reporto contenido?", a: "Usa el ícono de opciones (⋯) en una publicación, comentario u oferta y elige Reportar. También puedes reportar una oferta engañosa desde su detalle." },
  { q: "¿Cómo reporto una oferta incorrecta?", a: "Abre la oferta, toca el ícono de opciones y selecciona Reportar. Indica el motivo para que el equipo de moderación lo revise." },
  { q: "¿Qué es la calificación por coronas?", a: "Es el sistema de CLUB para evaluar qué tan útil es una reseña o comentario. Calificas de 1 a 5 coronas. Puedes cambiar o retirar tu calificación, pero no calificar tus propias reseñas." },
];

/* Help center — searchable FAQ with expandable answers, plus contact channels.
   Contact channels are left as configurable placeholders until the real
   support data is provided. */
export default function Help() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const t = q.toLowerCase().trim();
    if (!t) return faqs;
    return faqs.filter((f) => (f.q + f.a).toLowerCase().includes(t));
  }, [q]);

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Ayuda</h1>
      </header>

      <div className="px-4 py-4">
        <div className="flex items-center gap-2 h-11 rounded-full bg-surface-hover border border-border px-4 mb-4">
          <Search size={18} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca en las preguntas frecuentes" className="flex-1 bg-transparent text-sm text-title placeholder:text-muted-foreground outline-none" />
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Preguntas frecuentes</p>
        <div className="bg-surface border-y border-border divide-y divide-border">
          {filtered.length === 0 && <p className="px-4 py-6 text-sm text-muted-foreground text-center">Sin resultados para “{q}”.</p>}
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
                  <span className="text-sm text-title flex-1">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={16} className="text-muted-foreground" /></motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-wide mt-6 mb-1">Contacto</p>
        <div className="bg-surface border-y border-border divide-y divide-border">
          <ContactRow icon={Mail} label="Correo de soporte" value="Pendiente de configurar" pending />
          <ContactRow icon={MessageCircle} label="Chat / WhatsApp" value="Pendiente de configurar" pending />
        </div>
        <p className="text-[11px] text-muted-foreground mt-3">Los canales de contacto se completarán antes del lanzamiento. No se han inventado datos de soporte.</p>

        <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-surface-hover">
          <LifeBuoy size={16} className="text-mint" />
          <p className="text-xs text-foreground">¿No encuentras lo que buscas? Revisa la <button onClick={() => navigate("/legal/privacy")} className="text-mint font-medium">política de privacidad</button> o los <button onClick={() => navigate("/legal/terms")} className="text-mint font-medium">términos</button>.</p>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, pending }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><Icon size={16} className="text-muted-foreground" /></span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-title">{label}</p>
        <p className="text-[11px] text-muted-foreground">{value}</p>
      </div>
      {pending && <span className="text-[10px] text-muted-foreground bg-surface-hover rounded px-1.5 py-0.5">pendiente</span>}
    </div>
  );
}