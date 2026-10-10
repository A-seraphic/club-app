import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ImagePlus, MapPin, Tag, Sparkles, X, Check } from "lucide-react";
import { Brand } from "@/components/club/Brand";
import { PrimaryButton, SecondaryButton, Chip } from "@/components/club/ui";
import { categories, businesses } from "@/data/mockData";

const postTypes = [
  { id: "offer", label: "Oferta" },
  { id: "rec", label: "Recomendación" },
  { id: "review", label: "Opinión" },
  { id: "event", label: "Evento" },
  { id: "discovery", label: "Descubrimiento" },
];

export default function Post() {
  const navigate = useNavigate();
  const [type, setType] = useState("offer");
  const [text, setText] = useState("");
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("comida");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [published, setPublished] = useState(false);

  const generateAI = () => {
    setAiResult({
      title: "🔥 2x1 Solo Hoy en Burger Lab",
      hook: "¿Hambre de verdad? Llévate dos smash burgers por el precio de una.",
      description: "Solo por hoy, nuestras famosas smash burgers dobles están en 2x1. Carne 100% local, pan artesanal y el sabor que te hace volver.",
      cta: "Menciona CLUB en caja y desbloquea tu oferta.",
      hashtags: "#2x1 #BurgerLab #Neiva #OfertasCLUB #SoloHoy",
    });
  };

  if (published) {
    return (
      <div className="min-h-[70vh] grid place-items-center px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="grid place-items-center w-20 h-20 rounded-full gradient-amethyst glow-amethyst mx-auto mb-4">
            <Check size={36} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-title text-xl">¡Publicado!</h2>
          <p className="text-sm text-muted-foreground mt-1">Tu descubrimiento ya está en el feed de CLUB.</p>
          <PrimaryButton className="w-56 mt-6" onClick={() => navigate("/")}>Volver al inicio</PrimaryButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Publicar</h1>
      </header>

      <div className="px-4 py-4 space-y-5">
        <div>
          <p className="text-sm font-semibold text-title mb-3">¿Qué quieres compartir?</p>
          <div className="flex flex-wrap gap-2">
            {postTypes.map((t) => (
              <Chip key={t.id} active={type === t.id} onClick={() => setType(t.id)}>{t.label}</Chip>
            ))}
          </div>
        </div>

        <button onClick={() => setAiOpen(true)} className="w-full flex items-center gap-3 p-4 rounded-2xl border border-[hsl(var(--amethyst))]/40 bg-[hsl(var(--amethyst))]/10">
          <Sparkles className="text-[hsl(var(--amethyst))]" />
          <span className="text-sm font-semibold text-title">Crear con IA</span>
          <span className="ml-auto text-xs text-muted-foreground">Genera tu publicación</span>
        </button>

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Descripción</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Cuéntale a la comunidad qué encontraste…"
            className="w-full mt-2 rounded-2xl bg-surface-hover border border-border p-4 text-sm text-title placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--amethyst))] resize-none"
          />
        </div>

        <button className="w-full h-32 rounded-2xl border-2 border-dashed border-border bg-surface-hover flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImagePlus size={28} />
          <span className="text-sm">Agregar fotografía</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1"><Tag size={11} />Negocio</label>
            <select value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full mt-2 h-12 rounded-2xl bg-surface-hover border border-border px-3 text-sm text-title outline-none">
              <option value="">Selecciona</option>
              {businesses.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1"><MapPin size={11} />Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 h-12 rounded-2xl bg-surface-hover border border-border px-3 text-sm text-title outline-none">
              {categories.filter((c) => c.id !== "destacados").map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Precio (COP)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="w-full mt-2 h-12 rounded-2xl bg-surface-hover border border-border px-3 text-sm text-title outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Descuento %</label>
            <input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0" className="w-full mt-2 h-12 rounded-2xl bg-surface-hover border border-border px-3 text-sm text-title outline-none" />
          </div>
        </div>

        <PrimaryButton className="w-full" onClick={() => setPublished(true)}>Publicar</PrimaryButton>
      </div>

      {/* AI modal */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAiOpen(false)} className="fixed inset-0 bg-black/70 z-40" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-border sticky top-0 bg-surface">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[hsl(var(--amethyst))]" />
                  <h3 className="font-display font-bold text-title">Asistente IA</h3>
                </div>
                <button onClick={() => setAiOpen(false)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><X size={18} /></button>
              </div>
              {!aiResult ? (
                <div className="px-4 py-4 space-y-4">
                  <p className="text-sm text-muted-foreground">¿Qué quieres promocionar?</p>
                  <input placeholder="Producto" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                  <input placeholder="Descuento" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                  <input placeholder="Público objetivo" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Estilo" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                    <input placeholder="Tono" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                  </div>
                  <input placeholder="Información adicional" className="w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title outline-none" />
                  <PrimaryButton className="w-full" onClick={generateAI}>Generar publicación</PrimaryButton>
                </div>
              ) : (
                <div className="px-4 py-4 space-y-4">
                  <div className="rounded-2xl border border-border bg-surface-hover p-4 space-y-3">
                    <div><p className="text-xs text-muted-foreground uppercase">Título</p><p className="text-sm font-semibold text-title">{aiResult.title}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase">Gancho</p><p className="text-sm text-foreground">{aiResult.hook}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase">Descripción</p><p className="text-sm text-foreground">{aiResult.description}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase">Call to action</p><p className="text-sm text-foreground">{aiResult.cta}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase">Hashtags</p><p className="text-sm text-[hsl(var(--amethyst))]">{aiResult.hashtags}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <SecondaryButton className="flex-1" onClick={() => setAiResult(null)}>Regenerar</SecondaryButton>
                    <PrimaryButton className="flex-1" onClick={() => { setText(aiResult.description); setAiOpen(false); }}>Usar</PrimaryButton>
                  </div>
                </div>
              )}
              {/* Prompt generator section */}
              {!aiResult && (
                <div className="px-4 pb-6">
                  <div className="rounded-2xl border border-[hsl(var(--amethyst))]/30 bg-[hsl(var(--amethyst))]/5 p-4 mt-4">
                    <p className="text-sm font-semibold text-title mb-2">Generador de prompts</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Tipo de imagen", "Producto", "Estilo", "Iluminación", "Ambiente", "Colores", "Formato"].map((f) => (
                        <input key={f} placeholder={f} className="h-10 rounded-xl bg-surface-hover border border-border px-3 text-xs text-title outline-none" />
                      ))}
                    </div>
                    <SecondaryButton className="w-full mt-3" onClick={() => setAiResult({ ...aiResult, title: "Prompt generado", hook: "Prompt:", description: "Fotografía de producto, comida, iluminación cálida, ambiente premium, tonos amethyst y coral, formato vertical 9:16, alta resolución, estilo editorial.", cta: "", hashtags: "#foodphotography #premium" })}>Generar prompt</SecondaryButton>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}