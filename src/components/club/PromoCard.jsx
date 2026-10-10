import { motion } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Share2, MapPin, MoreHorizontal } from "lucide-react";
import { BusinessAvatar, DiscountPill, UrgencyTag, VerifiedBadge } from "./ui";
import { formatCOP } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";

export default function PromoCard({ offer, onOpen, onComment, onReport }) {
  const { likes, saves, toggleLike, toggleSave } = useApp();
  const liked = likes.has(offer.id);
  const saved = saves.has(offer.id);
  const baseCount = offer.likes;
  const likeCount = baseCount + (liked ? 1 : 0) - (offer.liked ? 1 : 0);
  const expired = offer.expired;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="px-4"
    >
      <div className={`bg-surface rounded-2xl border border-border overflow-hidden relative ${expired ? "opacity-60" : ""}`}>
        {/* Hero */}
        <button onClick={() => onOpen(offer)} className="block w-full text-left relative">
          <div className="relative h-60">
            <img src={offer.image} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 gradient-obsidian-fade" />
            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap items-center">
              <DiscountPill discount={offer.discount} />
              {offer.promoted && <UrgencyTag tone="gold">Promocionado</UrgencyTag>}
              {offer.tags.filter(t => t !== "PROMOCIONADO").map((t) => (
                <UrgencyTag key={t} tone={t === "HOY" || t === "LIMITADO" ? "coral" : t === "NEW" ? "amethyst" : "surface"}>{t}</UrgencyTag>
              ))}
            </div>
            {expired && (
              <div className="absolute inset-0 grid place-items-center bg-black/50">
                <span className="px-4 py-2 rounded-full bg-surface border border-border text-title font-display font-bold text-sm">OFERTA FINALIZADA</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <BusinessAvatar src={offer.businessAvatar} size={32} />
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  {offer.businessName}
                  {offer.verified && <VerifiedBadge size={13} />}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <button onClick={() => onOpen(offer)} className="block text-left flex-1">
              <h3 className="font-display font-bold text-title text-base leading-snug">{offer.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{offer.description}</p>
            </button>
            {onReport && (
              <button onClick={onReport} className="grid place-items-center w-8 h-8 rounded-full hover:bg-surface-hover shrink-0">
                <MoreHorizontal size={18} className="text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex items-end justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-title text-lg">{formatCOP(offer.promoPrice)}</span>
              <span className="text-xs text-muted-foreground line-through">{formatCOP(offer.originalPrice)}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} /> {offer.distance}
            </span>
          </div>

          {/* Social bar */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <button onClick={() => toggleLike(offer.id)} className="inline-flex items-center gap-1.5 text-sm">
              <motion.span whileTap={{ scale: 1.5 }} key={liked ? "l" : "u"} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
                <Heart size={20} className={liked ? "fill-coral text-coral" : "text-muted-foreground"} />
              </motion.span>
              <span className={liked ? "text-title font-medium" : "text-muted-foreground"}>{likeCount.toLocaleString()}</span>
            </button>
            <button onClick={onComment} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle size={20} /> <span>{offer.comments}</span>
            </button>
            <button onClick={() => toggleSave(offer.id)} className="inline-flex items-center">
              <motion.span whileTap={{ scale: 0.8 }} key={saved ? "s" : "u"} initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
                <Bookmark size={20} className={saved ? "fill-[hsl(var(--amethyst))] text-[hsl(var(--amethyst))]" : "text-muted-foreground"} />
              </motion.span>
            </button>
            <button className="inline-flex items-center text-muted-foreground">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}