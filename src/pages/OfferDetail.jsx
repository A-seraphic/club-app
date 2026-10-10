import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Bookmark, Share2, MessageCircle, MapPin, Clock, BadgeCheck, Copy, Check, Store } from "lucide-react";
import { BusinessAvatar, VerifiedBadge, DiscountPill, UrgencyTag, PrimaryButton, IconButton } from "@/components/club/ui";
import { getOffer, getBusiness, getBusinessOffers, formatCOP } from "@/data/mockData";
import PromoCard from "@/components/club/PromoCard";
import CommentsSheet from "@/components/club/CommentsSheet";

export default function OfferDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const offer = getOffer(id);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [bridge, setBridge] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(offer?.saved);
  const [liked, setLiked] = useState(offer?.liked);

  if (!offer) return <div className="p-8 text-center text-muted-foreground">Oferta no encontrada</div>;

  const business = getBusiness(offer.businessId);
  const moreOffers = getBusinessOffers(offer.businessId).filter((o) => o.id !== offer.id);
  const code = "CLUB" + offer.discount;

  const copyCode = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title">Oferta</h1>
      </header>

      {/* Hero */}
      <div className="relative h-72">
        <img src={offer.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-obsidian-fade" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <DiscountPill discount={offer.discount} />
          {offer.tags.map((t) => <UrgencyTag key={t} tone={t === "HOY" || t === "LIMITADO" ? "coral" : "gold"}>{t}</UrgencyTag>)}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <button onClick={() => navigate(`/business/${business.id}`)}><BusinessAvatar src={offer.businessAvatar} size={36} /></button>
          <button onClick={() => navigate(`/business/${business.id}`)} className="text-sm font-semibold text-white flex items-center gap-1">
            {offer.businessName}{offer.verified && <VerifiedBadge size={13} />}
          </button>
        </div>
      </div>

      <div className="px-4 -mt-4 relative">
        <div className="bg-surface rounded-2xl border border-border p-4">
          <h2 className="font-display font-bold text-title text-xl leading-tight">{offer.title}</h2>
          <p className="text-sm text-foreground mt-2 leading-relaxed">{offer.description}</p>
          <div className="flex items-end gap-3 mt-3">
            <span className="font-display font-bold text-[hsl(var(--amethyst))] text-2xl">{formatCOP(offer.promoPrice)}</span>
            <span className="text-sm text-muted-foreground line-through mb-1">{formatCOP(offer.originalPrice)}</span>
            <span className="ml-auto text-sm text-coral font-semibold">Ahorras {formatCOP(offer.originalPrice - offer.promoPrice)}</span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl border border-border p-3 flex items-center gap-2">
          <Clock size={16} className="text-coral" />
          <div><p className="text-[10px] text-muted-foreground uppercase">Termina</p><p className="text-sm font-semibold text-title">{offer.expiresIn}</p></div>
        </div>
        <div className="bg-surface rounded-2xl border border-border p-3 flex items-center gap-2">
          <MapPin size={16} className="text-[hsl(var(--amethyst))]" />
          <div><p className="text-[10px] text-muted-foreground uppercase">Distancia</p><p className="text-sm font-semibold text-title">{offer.distance}</p></div>
        </div>
      </div>

      {/* Conditions */}
      <div className="px-4 mt-4">
        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Condiciones</p>
          <p className="text-sm text-foreground leading-relaxed">{offer.conditions}</p>
          <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
            <span>📍 {offer.location}</span><span>🕘 {offer.hours}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 mt-4 flex items-center gap-2">
        <button onClick={() => setLiked((v) => !v)} className="grid place-items-center w-12 h-12 rounded-full bg-surface border border-border">
          <Heart size={20} className={liked ? "fill-coral text-coral" : "text-muted-foreground"} />
        </button>
        <button onClick={() => setCommentsOpen(true)} className="grid place-items-center w-12 h-12 rounded-full bg-surface border border-border">
          <MessageCircle size={20} className="text-muted-foreground" />
        </button>
        <button onClick={() => setSaved((v) => !v)} className="grid place-items-center w-12 h-12 rounded-full bg-surface border border-border">
          <Bookmark size={20} className={saved ? "fill-[hsl(var(--amethyst))] text-[hsl(var(--amethyst))]" : "text-muted-foreground"} />
        </button>
        <button className="grid place-items-center w-12 h-12 rounded-full bg-surface border border-border">
          <Share2 size={20} className="text-muted-foreground" />
        </button>
        <PrimaryButton className="flex-1" onClick={() => setBridge(true)}>Obtener oferta</PrimaryButton>
      </div>

      {/* More from business */}
      {moreOffers.length > 0 && (
        <div className="mt-8">
          <h3 className="px-4 font-display font-bold text-title text-lg mb-3">Más ofertas de {offer.businessName}</h3>
          <div className="space-y-5">
            {moreOffers.map((o) => <PromoCard key={o.id} offer={o} onOpen={(of) => navigate(`/offer/${of.id}`)} onComment={() => setCommentsOpen(true)} />)}
          </div>
        </div>
      )}

      {/* Bridge: publicación → empresa */}
      <AnimatePresence>
        {bridge && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBridge(false)} className="fixed inset-0 bg-black/70 z-40" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border p-6"
            >
              <div className="w-10 h-1.5 rounded-full bg-surface-hover mx-auto mb-4" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide text-center">Esta oferta pertenece a</p>
              <button onClick={() => { setBridge(false); navigate(`/business/${business.id}`); }} className="flex items-center gap-3 mt-3 w-full text-left">
                <BusinessAvatar src={business.avatar} size={56} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-title text-lg truncate">{business.name}</h3>
                    {business.verified && <VerifiedBadge size={16} />}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={11} /> {business.location}</p>
                </div>
              </button>
              <p className="text-sm text-foreground mt-3 leading-relaxed">{business.description}</p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => { setBridge(false); navigate(`/business/${business.id}`); }} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium inline-flex items-center justify-center gap-1.5"><Store size={17} /> Ver empresa</button>
                <PrimaryButton className="flex-[1.2]" onClick={() => { setBridge(false); setUnlocked(true); }}>Ver oferta</PrimaryButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unlock modal */}
      <AnimatePresence>
        {unlocked && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setUnlocked(false)} className="fixed inset-0 bg-black/70 z-40" />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border p-6"
            >
              <div className="text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="text-5xl mb-3">🎉</motion.div>
                <h3 className="font-display font-bold text-title text-xl">Oferta desbloqueada</h3>
                <p className="text-sm text-muted-foreground mt-1">Muestra este código en el negocio</p>
                <div className="mt-4 flex items-center justify-center gap-2 bg-surface-hover border border-dashed border-[hsl(var(--amethyst))] rounded-2xl py-4">
                  <span className="font-display font-bold text-2xl tracking-[0.3em] text-title">{code}</span>
                </div>
                <button onClick={copyCode} className="mt-3 inline-flex items-center gap-2 text-sm text-[hsl(var(--amethyst))] font-medium">
                  {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar código</>}
                </button>
                <div className="mt-5 text-left bg-surface-hover rounded-2xl p-4 space-y-1.5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Instrucciones</p>
                  <p className="text-sm text-foreground">1. Presenta el código en caja.</p>
                  <p className="text-sm text-foreground">2. Disfruta tu oferta exclusiva CLUB.</p>
                </div>
                <PrimaryButton className="w-full mt-5" onClick={() => setUnlocked(false)}>Listo</PrimaryButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CommentsSheet open={commentsOpen} onClose={() => setCommentsOpen(false)} />
    </div>
  );
}