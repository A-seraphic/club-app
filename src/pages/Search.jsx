import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, SlidersHorizontal, X, MapPin, Sparkles, Users, Store } from "lucide-react";
import CategoryChips from "@/components/club/CategoryChips";
import PromoCard from "@/components/club/PromoCard";
import Sheet from "@/components/club/Sheet";
import SearchAI from "@/components/club/SearchAI";
import { Chip, EmptyState, SectionTitle, UserAvatar } from "@/components/club/ui";
import ReportSheet from "@/components/club/ReportSheet";
import OfferSheet from "@/components/club/OfferSheet";
import { categories, offers, businesses } from "@/data/mockData";
import { communityUsers } from "@/data/community";

const filterOptions = ["Más reciente", "Popular", "Menor precio", "Mayor descuento", "Abierto ahora", "Más cercano"];

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("offers");
  const [activeCat, setActiveCat] = useState("destacados");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [reportOpen, setReportOpen] = useState(false);
  const [activeOffer, setActiveOffer] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);

  const toggleFilter = (f) => setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const offerResults = offers.filter((o) => {
    const matchCat = activeCat === "destacados" || o.category === activeCat;
    const matchQuery = !query || (o.title + o.businessName + o.description).toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  const userResults = communityUsers.filter((u) => !query || (u.name + u.handle + u.bio).toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 h-11 rounded-full bg-surface-hover border border-border px-4">
            <SearchIcon size={18} className="text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={segment === "offers" ? "Buscar ofertas, negocios…" : "Buscar personas…"}
              className="flex-1 bg-transparent text-sm text-title placeholder:text-muted-foreground outline-none"
            />
            {query && <button onClick={() => setQuery("")}><X size={16} className="text-muted-foreground" /></button>}
          </div>
          <button onClick={() => setAiOpen(true)} aria-label="Preguntar a CLUB AI"
            className="grid place-items-center h-11 px-3 rounded-full gradient-amethyst glow-amethyst text-white text-xs font-semibold inline-flex items-center gap-1.5">
            <Sparkles size={15} /> CLUB AI
          </button>
          <button onClick={() => setFiltersOpen(true)} className="grid place-items-center w-11 h-11 rounded-full bg-surface-hover border border-border">
            <SlidersHorizontal size={18} className="text-title" />
          </button>
        </div>

        {/* Segment toggle */}
        <div className="flex items-center gap-1 mt-2 p-1 bg-surface-hover rounded-full">
          {[
            { id: "offers", label: "Ofertas", icon: Store },
            { id: "people", label: "Gente", icon: Users },
          ].map((s) => (
            <button key={s.id} onClick={() => setSegment(s.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 h-8 rounded-full text-xs font-medium ${segment === s.id ? "text-title" : "text-muted-foreground"}`}>
              {segment === s.id && <motion.span layoutId="seg-bg" className="absolute inset-0 bg-surface rounded-full border border-border" />}
              <s.icon size={13} className="relative" />
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>
      </header>

      {segment === "offers" ? (
        <>
          <CategoryChips categories={categories} active={activeCat} onSelect={setActiveCat} />

          {activeFilters.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2">
              {activeFilters.map((f) => <Chip key={f} active onClick={() => toggleFilter(f)}>{f} ✕</Chip>)}
            </div>
          )}

          <SectionTitle>{query ? `Resultados para "${query}"` : "Ofertas encontradas"}</SectionTitle>
          {offerResults.length === 0 ? (
            <EmptyState icon={SearchIcon} title="Sin resultados" subtitle="Prueba con otra búsqueda, cambia los filtros o pregúntale a CLUB AI." />
          ) : (
            <div className="space-y-5 pb-6">
              {offerResults.map((o) => (
                <PromoCard key={o.id} offer={o} onOpen={(offer) => setActiveOffer(offer)} onComment={() => {}} onReport={() => setReportOpen(true)} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <SectionTitle>{query ? `Personas para "${query}"` : "Personas en CLUB"}</SectionTitle>
          {userResults.length === 0 ? (
            <EmptyState icon={Users} title="Sin personas" subtitle="No encontramos usuarios para tu búsqueda." />
          ) : (
            <div className="px-4 space-y-2 pb-6">
              {userResults.map((u) => (
                <button key={u.id} onClick={() => navigate(`/user/${u.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-surface border border-border hover:border-mint/50 text-left">
                  <UserAvatar src={u.avatar} size={44} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-title truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.handle} · {u.reviews.length} reseñas</p>
                  </div>
                  <MapPin size={14} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <OfferSheet offer={activeOffer} onClose={() => setActiveOffer(null)} onBusiness={(b) => navigate(`/business/${b.id}`)} />
      <ReportSheet open={reportOpen} onClose={() => setReportOpen(false)} />
      <SearchAI open={aiOpen} onClose={() => setAiOpen(false)} />

      {/* Filters bottom sheet */}
      <Sheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filtros" maxH="88dvh"
        footer={
          <div className="flex gap-3 px-4 py-3 bg-surface">
            <button onClick={() => setActiveFilters([])} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium">Limpiar</button>
            <button onClick={() => setFiltersOpen(false)} className="flex-[1.4] h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white">Aplicar filtros</button>
          </div>
        }>
        <div className="px-4 py-4 space-y-5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2.5">Ordenar por</p>
            <div className="flex flex-wrap gap-2">{filterOptions.map((f) => <Chip key={f} active={activeFilters.includes(f)} onClick={() => toggleFilter(f)}>{f}</Chip>)}</div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2.5">Distancia máxima</p>
            <div className="flex flex-wrap gap-2">{["500m", "1km", "3km", "5km", "10km"].map((d) => <Chip key={d} active={activeFilters.includes(d)} onClick={() => toggleFilter(d)}><MapPin size={12} />{d}</Chip>)}</div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2.5">Descuento mínimo</p>
            <div className="flex flex-wrap gap-2">{["10%", "25%", "40%", "50%+"].map((d) => <Chip key={d} active={activeFilters.includes(d)} onClick={() => toggleFilter(d)}>{d}</Chip>)}</div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2.5">Precio</p>
            <div className="flex flex-wrap gap-2">{["$", "$$", "$$$"].map((d) => <Chip key={d} active={activeFilters.includes(d)} onClick={() => toggleFilter(d)}>{d}</Chip>)}</div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}