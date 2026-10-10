import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { categories } from "@/data/mockData";

const orders = [
  { id: "recent", label: "Más reciente" },
  { id: "popular", label: "Popular" },
  { id: "price", label: "Menor precio" },
  { id: "discount", label: "Mayor descuento" },
];
const distances = ["500m", "1km", "3km", "5km", "10km"];

/* Content preferences that actually affect the feed: hidden categories are
   filtered out and the chosen order re-sorts the "Destacados" feed on Home. */
export default function ContentPreferences() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useApp();
  const { toast } = useToast();
  const [draft, setDraft] = useState(preferences);

  useEffect(() => { setDraft(preferences); }, [preferences]);

  const toggle = (list, id) => (prev) => ({ ...prev, [list]: prev[list].includes(id) ? prev[list].filter((x) => x !== id) : [...prev[list], id] });

  const save = () => {
    setPreferences(draft);
    toast({ title: "Preferencias guardadas" });
    navigate("/");
  };

  const cats = categories.filter((c) => c.id !== "destacados");

  return (
    <div className="pb-28">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Preferencias de contenido</h1>
      </header>

      <div className="px-4 py-4 space-y-6">
        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Categorías preferidas</p>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => {
              const on = draft.preferred.includes(c.id);
              return (
                <button key={c.id} onClick={() => setDraft(toggle("preferred", c.id))}
                  className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium border ${on ? "bg-mint/10 text-title border-mint" : "bg-surface text-foreground border-border"}`}>
                  {on && <Check size={13} className="text-mint" />}{c.emoji} {c.name}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Reducir u ocultar</p>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => {
              const on = draft.hidden.includes(c.id);
              return (
                <button key={c.id} onClick={() => setDraft(toggle("hidden", c.id))}
                  className={`inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium border ${on ? "bg-coral/10 text-coral border-coral/40" : "bg-surface text-foreground border-border"}`}>
                  {c.emoji} {c.name}{on ? " ✕" : ""}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">El contenido de estas categorías no aparecerá en tu feed Destacados.</p>
        </section>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Distancia máxima</p>
          <div className="flex flex-wrap gap-2">
            {distances.map((d) => (
              <button key={d} onClick={() => setDraft((p) => ({ ...p, maxDistance: d }))}
                className={`px-3.5 h-9 rounded-full text-sm font-medium border ${draft.maxDistance === d ? "bg-mint/10 text-title border-mint" : "bg-surface text-foreground border-border"}`}>{d}</button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Orden del feed</p>
          <div className="flex flex-wrap gap-2">
            {orders.map((o) => (
              <button key={o.id} onClick={() => setDraft((p) => ({ ...p, order: o.id }))}
                className={`px-3.5 h-9 rounded-full text-sm font-medium border ${draft.order === o.id ? "bg-mint/10 text-title border-mint" : "bg-surface text-foreground border-border"}`}>{o.label}</button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-30 p-4 glass border-t border-border">
        <button onClick={save} className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white">Guardar y volver al inicio</button>
      </div>
    </div>
  );
}