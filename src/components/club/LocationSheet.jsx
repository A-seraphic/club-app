import { useState } from "react";
import { MapPin, Navigation, Search, Star, X, Check, Loader2 } from "lucide-react";
import Sheet from "./Sheet";
import { useApp } from "@/lib/AppContext";

const cities = [
  "Neiva, Huila",
  "Bogotá, D.C.",
  "Medellín, Antioquia",
  "Cali, Valle del Cauca",
  "Barranquilla, Atlántico",
  "Cartagena, Bolívar",
  "Bucaramanga, Santander",
  "Pereira, Risaralda",
  "Manizales, Caldas",
  "Armenia, Quindío",
  "Ibagué, Tolima",
  "Santa Marta, Magdalena",
  "Villavicencio, Meta",
  "Cúcuta, Norte de Santander",
  "Montería, Córdoba",
];

export default function LocationSheet({ open, onClose }) {
  const { location, recentCities, changeLocation } = useApp();
  const [query, setQuery] = useState("");
  const [updating, setUpdating] = useState(null);

  const filtered = cities.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  const pick = (city) => {
    setUpdating(city);
    setTimeout(() => {
      changeLocation(city);
      setUpdating(null);
      onClose();
    }, 700);
  };

  return (
    <Sheet open={open} onClose={onClose} title="¿Dónde quieres descubrir ofertas?" maxH="86dvh">
      <div className="px-4 py-3">
        {/* Current */}
        <button
          onClick={() => pick(location.label)}
          className="w-full flex items-center gap-3 p-3 rounded-2xl border border-[hsl(var(--amethyst))]/40 bg-[hsl(var(--amethyst))]/10 mb-3"
        >
          <span className="grid place-items-center w-10 h-10 rounded-full gradient-amethyst glow-amethyst"><Navigation size={18} className="text-white" /></span>
          <div className="text-left flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Ubicación actual</p>
            <p className="text-sm font-semibold text-title truncate">{location.label}</p>
          </div>
          {updating === location.label ? <Loader2 size={18} className="text-[hsl(var(--amethyst))] animate-spin" /> : <Check size={18} className="text-[hsl(var(--amethyst))]" />}
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 h-11 rounded-full bg-surface-hover border border-border px-4 mb-4">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar ciudad…"
            className="flex-1 bg-transparent text-sm text-title placeholder:text-muted-foreground outline-none min-w-0"
          />
          {query && <button onClick={() => setQuery("")}><X size={15} className="text-muted-foreground" /></button>}
        </div>

        {/* Recent */}
        {!query && recentCities.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Recientes</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recentCities.map((c) => (
                <button key={c} onClick={() => pick(c)} className="inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-surface border border-border text-sm text-foreground hover:border-[hsl(var(--amethyst))]/50">
                  <MapPin size={13} className="text-[hsl(var(--amethyst))]" /> {c}
                </button>
              ))}
            </div>
          </>
        )}

        {/* City list */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{query ? "Resultados" : "Ciudades"}</p>
        <div className="space-y-1.5">
          {filtered.map((c) => (
            <button
              key={c}
              onClick={() => pick(c)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover text-left"
            >
              <MapPin size={16} className="text-muted-foreground shrink-0" />
              <span className="text-sm text-title flex-1 min-w-0 truncate">{c}</span>
              {location.label === c && <Check size={16} className="text-[hsl(var(--amethyst))]" />}
              {updating === c && <Loader2 size={16} className="text-[hsl(var(--amethyst))] animate-spin" />}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-6">
              <Star size={15} /> Pronto estaremos en más ciudades.
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}