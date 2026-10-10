import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Eye, Users, MapPin, Check } from "lucide-react";
import { getOffer, formatCOP } from "@/data/mockData";

const plans = [
  { days: 1, reach: "1.2k–2.5k", price: "$9.900", tag: "" },
  { days: 3, reach: "4k–8k", price: "$24.900", tag: "Popular" },
  { days: 7, reach: "10k–20k", price: "$49.900", tag: "Mejor valor" },
];

export default function BoostOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = getOffer(id);
  const [plan, setPlan] = useState(1);
  const [zone, setZone] = useState("Neiva");
  const [done, setDone] = useState(false);

  if (!offer) return <div className="p-8 text-center text-muted-foreground">Oferta no encontrada</div>;

  if (done) {
    return (
      <div className="min-h-[70vh] grid place-items-center px-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="grid place-items-center w-20 h-20 rounded-full gradient-amethyst glow-amethyst mx-auto mb-4"><Rocket size={36} className="text-white" /></div>
          <h2 className="font-display font-bold text-title text-xl">¡Oferta impulsada!</h2>
          <p className="text-sm text-muted-foreground mt-1">Tu oferta llegará a más personas en {zone}.</p>
          <button onClick={() => navigate("/business-panel")} className="mt-6 w-56 h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white">Volver al panel</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Promocionar oferta</h1>
      </header>

      <p className="px-4 mt-4 text-sm text-muted-foreground">Haz que más personas descubran tu oferta.</p>

      {/* Offer preview */}
      <div className="px-4 mt-3">
        <div className="bg-surface rounded-2xl border border-border overflow-hidden flex">
          <img src={offer.image} alt="" className="w-24 h-24 object-cover" />
          <div className="p-3 flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{offer.businessName}</p>
            <p className="text-sm font-semibold text-title truncate">{offer.title}</p>
            <p className="text-sm font-bold text-[hsl(var(--amethyst))]">{formatCOP(offer.promoPrice)}</p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="px-4 mt-5 space-y-3">
        {plans.map((p) => {
          const active = plan === p.days;
          return (
            <button key={p.days} onClick={() => setPlan(p.days)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${active ? "border-[hsl(var(--amethyst))] bg-[hsl(var(--amethyst))]/10 glow-amethyst" : "border-border bg-surface-hover"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-title">Impulsar por {p.days} {p.days === 1 ? "día" : "días"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Alcance estimado: {p.reach} personas</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-title">{p.price}</p>
                  {p.tag && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--amethyst))]/15 text-[hsl(var(--amethyst))]">{p.tag}</span>}
                </div>
              </div>
              {active && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 mt-2 text-xs text-[hsl(var(--amethyst))]"><Check size={13} /> Seleccionado</motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Targeting */}
      <div className="px-4 mt-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Segmentación</p>
        <div className="bg-surface rounded-2xl border border-border p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground"><MapPin size={15} /> Zona</span>
            <select value={zone} onChange={(e) => setZone(e.target.value)} className="bg-surface-hover border border-border rounded-lg px-2 py-1 text-title text-sm">
              {["Neiva", "Bogotá", "Cali", "Medellín"].map((z) => <option key={z}>{z}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground"><Users size={15} /> Público</span>
            <span className="text-title">Clientes de CLUB</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground"><Eye size={15} /> Categoría</span>
            <span className="text-title capitalize">{offer.category}</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setDone(true)} className="w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white inline-flex items-center justify-center gap-2">
          <Rocket size={18} /> Impulsar oferta
        </motion.button>
      </div>
    </div>
  );
}