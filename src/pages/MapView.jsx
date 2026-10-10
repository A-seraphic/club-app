import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Navigation } from "lucide-react";
import { businesses, offers } from "@/data/mockData";

export default function MapView() {
  const navigate = useNavigate();
  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Cerca de ti</h1>
        <button className="ml-auto grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><Navigation size={16} className="text-[hsl(var(--amethyst))]" /></button>
      </header>

      {/* Mock map */}
      <div className="relative h-72 mx-4 mt-4 rounded-2xl overflow-hidden border border-border bg-[hsl(240_9%_7%)]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        {businesses.slice(0, 5).map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 16 }}
            className="absolute"
            style={{ top: `${20 + i * 14}%`, left: `${15 + i * 16}%` }}
          >
            <div className="relative">
              <span className="block w-3 h-3 rounded-full bg-coral ring-4 ring-coral/30 animate-pulse" />
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] bg-surface border border-border rounded-full px-2 py-0.5 text-title">{b.name}</div>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-3 left-3 text-[10px] text-muted-foreground bg-surface/80 px-2 py-1 rounded-full">Mapa simulado · Neiva</div>
      </div>

      <h2 className="px-4 mt-5 font-display font-bold text-title text-lg mb-2">Establecimientos cercanos</h2>
      <div className="space-y-2 px-4">
        {businesses.map((b) => (
          <button key={b.id} onClick={() => navigate(`/business/${b.id}`)} className="w-full flex items-center gap-3 bg-surface rounded-2xl border border-border p-3 text-left">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-surface-hover"><MapPin size={16} className="text-[hsl(var(--amethyst))]" /></span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-title">{b.name}</p>
              <p className="text-xs text-muted-foreground">{b.location} · {b.distance}</p>
            </div>
            <span className="text-xs text-coral font-semibold">{offers.filter((o) => o.businessId === b.id).length} ofertas</span>
          </button>
        ))}
      </div>
    </div>
  );
}