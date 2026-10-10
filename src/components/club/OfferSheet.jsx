import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Copy, Check, Store, Share2, Heart, Bookmark } from "lucide-react";
import { BusinessAvatar, VerifiedBadge, DiscountPill, UrgencyTag } from "./ui";
import { getBusiness, formatCOP } from "@/data/mockData";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useApp } from "@/lib/AppContext";

/**
 * Responsive offer modal.
 *  - Mobile/tablet: bottom sheet, ~90dvh, centered, safe-area aware, no overflow.
 *  - Desktop: centered dialog, max-w-md, scrollable.
 */
export default function OfferSheet({ offer, onClose, onBusiness }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(offer?.liked);
  const [saved, setSaved] = useState(offer?.saved);
  const { toggleLike, toggleSave } = useApp();

  if (!offer) return null;
  const business = getBusiness(offer.businessId);
  const code = "CLUB" + offer.discount;
  const copy = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const goBusiness = () => { onClose(); onBusiness?.(business); };

  const Header = (
    <div className="relative h-52 shrink-0">
      <img src={offer.image} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      <div className="absolute top-3 left-3 right-12 flex gap-1.5 flex-wrap items-center">
        <DiscountPill discount={offer.discount} />
        {offer.tags.map((t) => (
          <UrgencyTag key={t} tone={t === "HOY" || t === "LIMITADO" ? "coral" : "gold"}>{t}</UrgencyTag>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white"
      >
        <X size={18} />
      </button>
    </div>
  );

  const Body = (
    <div className="px-4 py-4 space-y-4">
      {/* Business row */}
      <button onClick={goBusiness} className="flex items-center gap-3 w-full text-left">
        <BusinessAvatar src={offer.businessAvatar} size={44} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-title truncate">{offer.businessName}</span>
            {offer.verified && <VerifiedBadge size={14} />}
          </div>
          <span className="text-xs text-muted-foreground">{business?.categoryLabel} · {business?.location}</span>
        </div>
        <Store size={18} className="text-muted-foreground" />
      </button>

      {/* Title + desc */}
      <div>
        <h2 className="font-display font-bold text-title text-xl leading-tight">{offer.title}</h2>
        <p className="text-sm text-foreground mt-2 leading-relaxed">{offer.description}</p>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3 flex-wrap">
        <span className="font-display font-bold text-title text-2xl">{formatCOP(offer.promoPrice)}</span>
        <span className="text-sm text-muted-foreground line-through mb-1">{formatCOP(offer.originalPrice)}</span>
        <span className="ml-auto text-sm text-mint font-semibold">Ahorras {formatCOP(offer.originalPrice - offer.promoPrice)}</span>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-hover rounded-2xl border border-border p-3 flex items-center gap-2">
          <Clock size={16} className="text-coral" />
          <div><p className="text-[10px] text-muted-foreground uppercase">Termina</p><p className="text-sm font-semibold text-title">{offer.expiresIn}</p></div>
        </div>
        <div className="bg-surface-hover rounded-2xl border border-border p-3 flex items-center gap-2">
          <MapPin size={16} className="text-mint" />
          <div><p className="text-[10px] text-muted-foreground uppercase">Distancia</p><p className="text-sm font-semibold text-title">{offer.distance}</p></div>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-surface-hover rounded-2xl border border-border p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Condiciones</p>
        <p className="text-sm text-foreground leading-relaxed">{offer.conditions}</p>
        <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {offer.location}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {offer.hours}</span>
        </div>
      </div>

      {/* Quick interactions */}
      <div className="flex items-center gap-2">
        <button onClick={() => setLiked((v) => !v)} className="grid place-items-center w-11 h-11 rounded-full bg-surface-hover border border-border">
          <Heart size={18} className={liked ? "fill-coral text-coral" : "text-muted-foreground"} />
        </button>
        <button onClick={() => { toggleSave?.(offer.id); setSaved((v) => !v); }} className="grid place-items-center w-11 h-11 rounded-full bg-surface-hover border border-border">
          <Bookmark size={18} className={saved ? "fill-mint text-mint" : "text-muted-foreground"} />
        </button>
        <button className="grid place-items-center w-11 h-11 rounded-full bg-surface-hover border border-border">
          <Share2 size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );

  const Actions = unlocked ? (
    <div className="px-4 py-4 space-y-3">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="text-4xl mb-1">🎉</motion.div>
        <h3 className="font-display font-bold text-title text-lg">Oferta desbloqueada</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Muestra este código en el negocio</p>
        <div className="mt-3 flex items-center justify-center gap-2 bg-surface-hover border border-dashed border-mint rounded-2xl py-4">
          <span className="font-display font-bold text-2xl tracking-[0.3em] text-title">{code}</span>
        </div>
        <button onClick={copy} className="mt-2 inline-flex items-center gap-2 text-sm text-mint font-medium">
          {copied ? <><Check size={15} /> Copiado</> : <><Copy size={15} /> Copiar código</>}
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={goBusiness} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium inline-flex items-center justify-center gap-1.5"><Store size={17} /> Ver empresa</button>
        <button onClick={onClose} className="flex-[1.2] h-12 rounded-full gradient-amethyst glow-amethyst text-white font-display font-semibold">Listo</button>
      </div>
    </div>
  ) : (
    <div className="px-4 py-4 flex gap-2">
      <button onClick={goBusiness} className="flex-1 h-12 rounded-full bg-surface-hover border border-border text-title font-medium inline-flex items-center justify-center gap-1.5"><Store size={17} /> Ver empresa</button>
      <button onClick={() => setUnlocked(true)} className="flex-[1.3] h-12 rounded-full gradient-amethyst glow-amethyst text-white font-display font-semibold">Obtener oferta</button>
    </div>
  );

  const content = (
    <div className="flex flex-col h-full">
      {Header}
      <div className="flex-1 overflow-y-auto no-scrollbar">{Body}</div>
      <div className="shrink-0 border-t border-border bg-surface">{Actions}</div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/65 z-50" />
      {isDesktop ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-0 z-50 grid place-items-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-md bg-surface rounded-3xl border border-border overflow-hidden max-h-[88dvh] flex flex-col">
            {content}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border flex flex-col"
          style={{ maxHeight: "92dvh", paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="relative pt-2 shrink-0">
            <div className="w-10 h-1.5 rounded-full bg-surface-hover mx-auto" />
          </div>
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}