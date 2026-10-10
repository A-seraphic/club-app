import { motion } from "framer-motion";

const LOGO_URL = "https://media.base44.com/images/public/6ab418b9dcc2c28e605a46b0/021c3e75d_WhatsApp_Image_2026-09-23_at_80825_PM-removebg-preview.png";

/* Official transparent CLUB logo (crown over C + "LUB"). Always rendered with
   object-contain so the crown keeps its exact proportion and is never cropped
   or deformed. No background container — it floats directly on the UI. */
function Brand({ size = "md", glow = false, className = "", logo = false }) {
  if (logo) {
    const w = { sm: 88, md: 116, lg: 168, xl: 220 }[size];
    return (
      <img
        src={LOGO_URL}
        alt="CLUB"
        className={`object-contain ${className}`}
        style={{
          width: w,
          height: "auto",
          filter: glow ? "drop-shadow(0 0 6px hsl(var(--mint) / 0.55)) drop-shadow(0 0 16px hsl(var(--mint) / 0.30))" : undefined,
        }}
      />
    );
  }
  const sizes = { sm: "text-2xl", md: "text-3xl", lg: "text-5xl", xl: "text-7xl" };
  return (
    <span
      className={`font-display font-extrabold tracking-tight ${sizes[size]} ${className}`}
      style={glow ? { textShadow: "0 0 28px hsl(var(--mint) / 0.5)" } : undefined}
    >
      <span className="text-title">CL</span>
      <span className="bg-gradient-to-br from-[hsl(var(--mint))] to-[hsl(var(--gold))] bg-clip-text text-transparent">UB</span>
    </span>
  );
}

export { Brand };
export default Brand;

/* Header lockup — the logo floats directly on the header background with a
   diffuse radial glow behind it. NO rectangle, card, border or solid fill:
   only a soft mint illumination + a small gold touch near the crown, blurred
   so the edges melt into the header. Opacity is lower in light mode (cleaner,
   less luminous) and full in dark mode. */
export function BrandLockup({ subtitle }) {
  return (
    <div className="relative flex flex-col leading-none">
      {/* Soft radial illumination behind the logo — diffuse, no edges */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[180%] blur-2xl pointer-events-none opacity-70 dark:opacity-100"
        style={{ background: "radial-gradient(ellipse at 50% 42%, hsl(var(--mint) / 0.22), transparent 70%)" }}
      />
      {/* Small gold touch near the crown (top-left of the C) */}
      <div
        aria-hidden
        className="absolute left-[34%] top-[6%] w-[55%] h-[55%] -translate-x-1/2 -translate-y-1/2 blur-2xl pointer-events-none opacity-60 dark:opacity-100"
        style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.18), transparent 65%)" }}
      />
      <div className="relative">
        <Brand size="md" logo glow />
      </div>
      {subtitle && (
        <span className="relative text-[10px] font-medium text-muted-foreground tracking-[0.25em] uppercase mt-1.5">{subtitle}</span>
      )}
    </div>
  );
}

/* Standalone logo mark — preserves crown proportion at any size. */
export function LogoMark({ size = 180, glow = false, className = "" }) {
  return (
    <img
      src={LOGO_URL}
      alt="CLUB"
      className={`object-contain ${className}`}
      style={{
        width: size,
        height: "auto",
        filter: glow ? "drop-shadow(0 0 8px hsl(var(--mint) / 0.6)) drop-shadow(0 0 20px hsl(var(--mint) / 0.35))" : undefined,
      }}
    />
  );
}