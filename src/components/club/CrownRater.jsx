import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LABELS = ["", "Poco útil", "Útil", "Muy útil", "Relevante", "Excelente"];

/* Interactive crown rater for a single review/comment.
   - 1–5 coronas with selected / animating / disabled states.
   - Tap to select (pending), Confirmar to save, Retirar to remove.
   - `disabled` blocks rating your own review.
   - Community counts are demo data; the user's own rating is real (local). */
export default function CrownRater({ review, myRating = 0, onConfirm, onRemove, disabled = false }) {
  const [pending, setPending] = useState(myRating);
  const [burst, setBurst] = useState(0);

  const count = review.crownCount + (myRating ? 1 : 0);
  const sum = review.crownSum + (myRating || 0);
  const avg = count ? sum / count : 0;

  const pick = (n) => {
    if (disabled) return;
    setPending(n);
    setBurst((b) => b + 1);
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-title">{review.biz}</span>
        <div className="flex items-center gap-1.5">
          <Crown size={13} className="fill-gold text-gold" />
          <span className="text-xs text-title font-medium">{avg ? avg.toFixed(1) : "—"}</span>
          <span className="text-xs text-muted-foreground">· {count} calif.</span>
          <span className="text-[9px] text-muted-foreground bg-surface-hover rounded px-1 py-0.5 ml-0.5">demo</span>
        </div>
      </div>
      <p className="text-sm text-foreground mt-2">{review.text}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{review.date}</p>

      <div className="mt-3 pt-3 border-t border-border">
        {disabled ? (
          <p className="text-xs text-muted-foreground">No puedes calificar tu propia reseña.</p>
        ) : (
          <>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Tu calificación:</span>
              <div className="inline-flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <motion.button
                    key={n}
                    type="button"
                    whileTap={{ scale: 1.35 }}
                    onClick={() => pick(n)}
                    aria-label={`${n} coronas`}
                    className="p-0 leading-none"
                  >
                    <Crown
                      size={24}
                      strokeWidth={1.8}
                      className={cn(n <= pending ? "fill-gold text-gold" : "fill-transparent text-muted-foreground/40")}
                    />
                  </motion.button>
                ))}
                <AnimatePresence>
                  {burst > 0 && pending > 0 && (
                    <motion.span
                      key={burst}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1.5 }}
                      exit={{ opacity: 0 }}
                      className="ml-1 text-mint"
                    >
                      <Sparkles size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs text-title ml-auto">{LABELS[pending] || ""}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onConfirm(pending)}
                disabled={pending === myRating || pending === 0}
                className="flex-1 h-10 rounded-full gradient-amethyst text-white text-sm font-semibold disabled:opacity-50"
              >
                {myRating ? "Actualizar" : "Confirmar"}
              </button>
              {myRating > 0 && (
                <button
                  onClick={onRemove}
                  className="inline-flex items-center gap-1 h-10 px-3 rounded-full bg-surface-hover border border-border text-sm text-muted-foreground"
                >
                  <Trash2 size={14} /> Retirar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}