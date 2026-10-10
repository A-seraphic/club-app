import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ImagePlus, Check } from "lucide-react";
import { Brand } from "@/components/club/Brand";
import { DiscountPill } from "@/components/club/ui";
import { categories, formatCOP } from "@/data/mockData";

export default function CreateOffer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", product: "", originalPrice: "", promoPrice: "", category: "comida",
    startDate: "", endDate: "", quantity: "", location: "Neiva, Huila", conditions: "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const discount = form.originalPrice && form.promoPrice ? Math.round(100 - (form.promoPrice / form.originalPrice) * 100) : 0;

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Crear nueva oferta</h1>
      </header>

      <div className="px-4 mt-4 space-y-4">
        <button className="w-full h-32 rounded-2xl border-2 border-dashed border-border bg-surface-hover flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImagePlus size={28} /><span className="text-sm">Agregar imagen de la oferta</span>
        </button>

        <Field label="Producto"><input value={form.product} onChange={(e) => set("product", e.target.value)} placeholder="Ej: Smash Burger Doble" className={inputCls} /></Field>
        <Field label="Título"><input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="2x1 en Smash Burgers" className={inputCls} /></Field>
        <Field label="Descripción"><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Describe la promoción…" className={`${inputCls} resize-none`} /></Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Precio anterior (COP)"><input type="number" value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} placeholder="38000" className={inputCls} /></Field>
          <Field label="Precio promocional"><input type="number" value={form.promoPrice} onChange={(e) => set("promoPrice", e.target.value)} placeholder="19000" className={inputCls} /></Field>
        </div>
        {discount > 0 && <span className="inline-flex"><DiscountPill discount={discount} /></span>}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Fecha inicial"><input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} className={inputCls} /></Field>
          <Field label="Fecha final"><input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} className={inputCls} /></Field>
        </div>
        <Field label="Cantidad disponible"><input type="number" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="100" className={inputCls} /></Field>
        <Field label="Ubicación"><input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls} /></Field>
        <Field label="Condiciones"><textarea value={form.conditions} onChange={(e) => set("conditions", e.target.value)} rows={2} placeholder="Restricciones, horario, etc." className={`${inputCls} resize-none`} /></Field>
        <Field label="Categoría">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
            {categories.filter((c) => c.id !== "destacados").map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
        </Field>

        {/* Preview */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Vista previa</p>
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="h-40 bg-surface-hover grid place-items-center text-muted-foreground text-sm">Imagen de la oferta</div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">Burger Lab</p>
              <p className="font-display font-bold text-title">{form.title || "Título de tu oferta"}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{form.description || "La descripción aparecerá aquí."}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-bold text-[hsl(var(--amethyst))]">{form.promoPrice ? formatCOP(Number(form.promoPrice)) : "$0"}</span>
                <span className="text-xs text-muted-foreground line-through">{form.originalPrice ? formatCOP(Number(form.originalPrice)) : "$0"}</span>
              </div>
            </div>
          </div>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate("/moderation", { state: { title: form.title, text: form.description } })}
          className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white">
          Publicar oferta
        </motion.button>
      </div>
    </div>
  );
}

const inputCls = "w-full h-12 rounded-2xl bg-surface-hover border border-border px-4 text-sm text-title placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--amethyst))]";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground uppercase tracking-wide">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}