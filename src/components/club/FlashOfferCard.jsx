import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { DiscountPill } from "./ui";
import { formatCOP } from "@/data/mockData";

export default function FlashOfferCard({ offer, onOpen }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(offer)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="shrink-0 w-[230px] text-left bg-surface rounded-2xl border border-border overflow-hidden"
    >
      <div className="relative h-32">
        <img src={offer.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-obsidian-fade" />
        <div className="absolute top-2 left-2"><DiscountPill discount={offer.discount} /></div>
        <div className="absolute top-2 right-2 inline-flex items-center gap-1 bg-coral text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
          <Clock size={10} /> {offer.expiresIn}
        </div>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground mb-0.5">{offer.businessName}</p>
        <p className="font-display font-semibold text-title text-sm leading-tight line-clamp-1">{offer.title}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-[hsl(var(--amethyst))] text-sm">{formatCOP(offer.promoPrice)}</span>
          <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground"><MapPin size={10} />{offer.distance}</span>
        </div>
      </div>
    </motion.button>
  );
}