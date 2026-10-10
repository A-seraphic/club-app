import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, Clock, Phone, UserPlus, Check, Plus, LayoutDashboard, Instagram, Facebook, Twitter, Globe, Music2, ExternalLink } from "lucide-react";
import { BusinessAvatar, VerifiedBadge, PrimaryButton, SecondaryButton } from "@/components/club/ui";
import { getBusiness, getBusinessOffers } from "@/data/mockData";
import PromoCard from "@/components/club/PromoCard";

const tabs = [
  { id: "offers", label: "Ofertas" },
  { id: "posts", label: "Publicaciones" },
  { id: "reviews", label: "Opiniones" },
  { id: "info", label: "Información" },
];

const socialByBusiness = {
  b1: { instagram: "@burgerlab", facebook: "/burgerlab", tiktok: "@burgerlab", website: "https://burgerlab.co" },
  b2: { instagram: "@cafecentral", whatsapp: "https://wa.me/573001112233", website: "https://cafecentral.co" },
  b3: { instagram: "@urbanwear", tiktok: "@urbanwear", twitter: "@urbanwear", website: "https://urbanwear.co" },
  b4: { facebook: "/cinenova", instagram: "@cinenova", website: "https://cinenova.co" },
  b5: { instagram: "@pizzahouse", whatsapp: "https://wa.me/573004445566", website: "https://pizzahouse.co" },
  b6: { instagram: "@fitzone", tiktok: "@fitzone", website: "https://fitzone.co" },
  b7: { instagram: "@glowbeauty", facebook: "/glowbeauty", website: "https://glowbeauty.co" },
};

function SocialLinks({ businessId }) {
  const s = socialByBusiness[businessId];
  if (!s) return null;
  const items = [
    s.instagram && { icon: Instagram, label: s.instagram, href: `https://instagram.com/${s.instagram.replace("@", "")}` },
    s.facebook && { icon: Facebook, label: s.facebook, href: `https://facebook.com${s.facebook}` },
    s.tiktok && { icon: Music2, label: s.tiktok, href: `https://tiktok.com/${s.tiktok}` },
    s.twitter && { icon: Twitter, label: s.twitter, href: `https://twitter.com/${s.twitter.replace("@", "")}` },
    s.whatsapp && { icon: Phone, label: "WhatsApp", href: s.whatsapp },
  ].filter(Boolean);
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Encuéntranos también en</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <a key={i} href={it.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 h-10 rounded-full bg-surface border border-border text-sm text-foreground hover:border-[hsl(var(--amethyst))]/50">
            <it.icon size={16} className="text-[hsl(var(--amethyst))]" /> <span className="truncate max-w-[120px]">{it.label}</span>
          </a>
        ))}
      </div>
      {s.website && (
        <a href={s.website} target="_blank" rel="noreferrer" className="mt-3 w-full h-11 rounded-full gradient-amethyst glow-amethyst text-white text-sm font-semibold inline-flex items-center justify-center gap-1.5">
          <ExternalLink size={16} /> Visitar sitio oficial
        </a>
      )}
    </div>
  );
}

export default function BusinessProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const business = getBusiness(id);
  const [tab, setTab] = useState("offers");
  const [following, setFollowing] = useState(false);

  if (!business) return <div className="p-8 text-center text-muted-foreground">Negocio no encontrado</div>;
  const offers = getBusinessOffers(business.id);

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg truncate">{business.name}</h1>
      </header>

      {/* Cover */}
      <div className="relative h-36">
        <img src={business.cover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="px-4 -mt-10 relative">
        <div className="flex items-end gap-3">
          <BusinessAvatar src={business.avatar} size={72} className="border-4 border-background" />
          <div className="pb-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-display font-bold text-title text-xl">{business.name}</h2>
              {business.verified && <VerifiedBadge size={16} />}
            </div>
            <p className="text-xs text-muted-foreground">{business.categoryLabel} · {business.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <span className="inline-flex items-center gap-1"><Star size={14} className="fill-gold text-gold" /> {business.rating}</span>
          <span className="text-muted-foreground">{business.followers} seguidores</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock size={12} /> {business.hours}</span>
        </div>

        <p className="text-sm text-foreground mt-3 leading-relaxed">{business.description}</p>

        <div className="flex gap-2 mt-4">
          <PrimaryButton className="flex-1" onClick={() => setFollowing((v) => !v)}>
            {following ? <><Check size={16} className="inline mr-1" />Siguiendo</> : <><UserPlus size={16} className="inline mr-1" />Seguir</>}
          </PrimaryButton>
          <SecondaryButton className="flex-1" onClick={() => navigate("/map")}><MapPin size={16} className="inline mr-1" />Ubicación</SecondaryButton>
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={() => navigate("/create-offer")} className="flex-1 h-11 rounded-full gradient-amethyst glow-amethyst text-white text-sm font-semibold inline-flex items-center justify-center gap-1.5"><Plus size={16} /> Publicar oferta</button>
          <button onClick={() => navigate("/business-panel")} className="flex-1 h-11 rounded-full bg-surface-hover border border-border text-title text-sm font-medium inline-flex items-center justify-center gap-1.5"><LayoutDashboard size={16} /> Panel</button>
        </div>
        <button className="w-full mt-2 text-sm text-muted-foreground inline-flex items-center justify-center gap-1.5"><Phone size={14} /> Contacto</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mt-6 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="shrink-0 px-5 py-3 text-sm relative">
            <span className={tab === t.id ? "text-title font-medium" : "text-muted-foreground"}>{t.label}</span>
            {tab === t.id && <motion.span layoutId="biz-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--amethyst))]" />}
          </button>
        ))}
      </div>

      <div className="pt-4">
        {tab === "offers" && (
          offers.length ? (
            <div className="space-y-5">
              {offers.map((o) => <PromoCard key={o.id} offer={o} onOpen={(of) => navigate(`/offer/${of.id}`)} onComment={() => {}} />)}
            </div>
          ) : <p className="text-center text-sm text-muted-foreground py-10">Sin ofertas activas</p>
        )}
        {tab === "posts" && <p className="text-center text-sm text-muted-foreground py-10">Próximamente</p>}
        {tab === "reviews" && (
          <div className="px-4 space-y-3">
            {[
              { user: "Valentina R.", text: "Excelente atención y la oferta fue real. ¡Volveré!", stars: 5 },
              { user: "Andrés L.", text: "Buen lugar, aunque demoró un poco el pedido.", stars: 4 },
            ].map((r, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-title">{r.user}</span>
                  <div className="flex">{Array.from({ length: r.stars }).map((_, s) => <Star key={s} size={12} className="fill-gold text-gold" />)}</div>
                </div>
                <p className="text-sm text-foreground mt-2">{r.text}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "info" && (
          <div className="px-4 space-y-4">
            <div className="space-y-3">
              {[
                ["Categoría", business.categoryLabel],
                ["Ubicación", business.location],
                ["Horario", business.hours],
                ["Calificación", `${business.rating} ⭐`],
                ["Seguidores", business.followers],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between bg-surface rounded-2xl border border-border p-4">
                  <span className="text-sm text-muted-foreground">{k}</span>
                  <span className="text-sm text-title font-medium">{v}</span>
                </div>
              ))}
            </div>
            <SocialLinks businessId={business.id} />
          </div>
        )}
      </div>
    </div>
  );
}