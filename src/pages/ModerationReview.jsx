import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertTriangle, PenLine, Send } from "lucide-react";

const steps = ["Contenido", "Lenguaje", "Categoría", "Información", "Seguridad"];
const flaggedWords = /basura|ladrones|estúpido|idiota|maldito|estafa|fraude/i;

export default function ModerationReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { text = "", title = "" } = location.state || {};
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const flagged = flaggedWords.test(text + title);
  const [showWarning, setShowWarning] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (step >= steps.length) { setDone(true); setShowWarning(flagged); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 450);
    return () => clearTimeout(t);
  }, [step]);

  if (done && !showWarning) {
    return (
      <div className="min-h-[70vh] grid place-items-center px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="grid place-items-center w-20 h-20 rounded-full gradient-amethyst glow-amethyst mx-auto mb-4"><Check size={36} className="text-white" /></div>
          <h2 className="font-display font-bold text-title text-xl">¡Publicación aprobada!</h2>
          <p className="text-sm text-muted-foreground mt-1">Tu oferta ya está visible en CLUB.</p>
          <button onClick={() => navigate("/business-panel")} className="mt-6 w-56 h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white">Ver en el panel</button>
        </motion.div>
      </div>
    );
  }

  if (showWarning) {
    return (
      <div className="px-4 pt-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-surface rounded-2xl border border-gold/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-gold/15"><AlertTriangle size={20} className="text-gold" /></span>
            <div>
              <h2 className="font-display font-bold text-title">Tu publicación podría necesitar cambios</h2>
              <p className="text-xs text-muted-foreground">Utilizaste lenguaje que puede interpretarse como agresivo.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Texto original</p>
              <p className="text-sm text-foreground bg-surface-hover rounded-xl p-3">{edited ? "Tu experiencia con este restaurante no fue satisfactoria. Considero que el servicio podría mejorar." : (text || "Este restaurante es una basura, son unos ladrones.")}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Sugerencia de CLUB AI</p>
              <p className="text-sm text-foreground bg-surface-hover rounded-xl p-3">“Tu experiencia con este restaurante no fue satisfactoria. Considero que el servicio podría mejorar.”</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setEdited(true)} className="flex-1 h-11 rounded-full bg-surface-hover border border-border text-title font-medium inline-flex items-center justify-center gap-1.5"><PenLine size={16} /> Editar</button>
            <button onClick={() => navigate("/business-panel")} className="flex-1 h-11 rounded-full gradient-amethyst glow-amethyst text-white font-semibold inline-flex items-center justify-center gap-1.5"><Send size={16} /> Publicar de todas formas</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-8">
      <div className="w-full max-w-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-6">
          <h2 className="font-display font-bold text-title text-xl">Revisando publicación…</h2>
          <p className="text-sm text-muted-foreground mt-1">CLUB verifica cada publicación antes de publicarla.</p>
        </motion.div>
        <div className="space-y-3">
          {steps.map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "pending";
            return (
              <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-surface rounded-xl border border-border p-3">
                <span className={`grid place-items-center w-7 h-7 rounded-full ${state === "done" ? "gradient-amethyst" : state === "active" ? "bg-surface-hover border border-[hsl(var(--amethyst))]" : "bg-surface-hover"}`}>
                  {state === "done" ? <Check size={15} className="text-white" /> : state === "active" ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3 h-3 rounded-full border-2 border-[hsl(var(--amethyst))] border-t-transparent" /> : null}
                </span>
                <span className={`text-sm ${state === "pending" ? "text-muted-foreground" : "text-title"}`}>{s}</span>
                {state === "done" && <Check size={15} className="ml-auto text-[hsl(var(--amethyst))]" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}