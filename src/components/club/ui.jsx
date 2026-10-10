import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Clock } from "lucide-react";

/* ---------- Avatars ---------- */
export function UserAvatar({ src, size = 40, ring = false, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn("rounded-full object-cover border border-border", ring && "ring-2 ring-[hsl(var(--amethyst))] ring-offset-2 ring-offset-background", className)}
    />
  );
}

export function BusinessAvatar({ src, size = 40, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      style={{ width: size, height: size }}
      className={cn("rounded-xl object-cover border border-border", className)}
    />
  );
}

/* ---------- Badges & pills ---------- */
export function VerifiedBadge({ size = 14 }) {
  return <BadgeCheck size={size} className="text-gold shrink-0" aria-label="Negocio verificado" />;
}

export function DiscountPill({ discount, className = "" }) {
  return (
    <span className={cn("inline-flex items-center font-display font-bold text-black px-2.5 py-1 rounded-full text-xs bg-mint", className)}>
      {discount}% OFF
    </span>
  );
}

export function UrgencyTag({ children, tone = "coral", className = "" }) {
  const tones = {
    coral: "bg-coral text-white",
    gold: "bg-gold text-black",
    amethyst: "bg-amethyst text-white",
    surface: "bg-surface-hover text-title",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Chip({ active, children, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full text-sm font-medium transition-all duration-300 border",
        active
          ? "bg-mint/10 text-title border-mint"
          : "bg-surface text-foreground border-border hover:border-mint/50"
      )}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      {children}
    </button>
  );
}

export function Pill({ children, className = "" }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-hover text-foreground border border-border", className)}>
      {children}
    </span>
  );
}

/* ---------- Buttons ---------- */
export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn("h-12 rounded-full font-display font-semibold text-white gradient-amethyst glow-amethyst active:scale-95 transition-transform", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn("h-12 rounded-full font-medium text-foreground bg-surface-hover border border-border active:scale-95 transition-transform", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function IconButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      className={cn("grid place-items-center w-10 h-10 rounded-full text-foreground hover:bg-surface-hover transition-colors", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ---------- Text helpers ---------- */
export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between px-4 mt-6 mb-3">
      <h2 className="font-display font-bold text-title text-xl">{children}</h2>
      {action}
    </div>
  );
}

export function Meta({ icon: Icon, children, className = "" }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Icon size={12} />{children}
    </span>
  );
}

export function LocationPill({ children, onClick }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 px-3 h-8 rounded-full bg-surface-hover border border-border text-sm text-foreground">
      <MapPin size={14} className="text-mint" />
      {children}
    </button>
  );
}

/* ---------- Skeletons ---------- */
export function Shimmer({ className = "" }) {
  return <div className={cn("shimmer rounded-xl", className)} />;
}

export function PromoCardSkeleton() {
  return (
    <div className="px-4">
      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <Shimmer className="w-full h-56 rounded-none" />
        <div className="p-4 space-y-3">
          <Shimmer className="h-4 w-2/3" />
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-4/5" />
          <div className="flex justify-between pt-2">
            <Shimmer className="h-6 w-24 rounded-full" />
            <Shimmer className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="grid place-items-center w-16 h-16 rounded-full bg-surface-hover border border-border mb-4">
        <Icon className="text-muted-foreground" />
      </div>
      <p className="font-display font-semibold text-title">{title}</p>
      {subtitle && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{subtitle}</p>}
    </div>
  );
}