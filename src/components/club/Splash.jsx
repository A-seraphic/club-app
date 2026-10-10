import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const LOGO_URL = "https://media.base44.com/images/public/6ab418b9dcc2c28e605a46b0/021c3e75d_WhatsApp_Image_2026-09-23_at_80825_PM-removebg-preview.png";

/* Resolves the active theme (dark / light / system) to a boolean isDark,
   matching the same logic the ThemeProvider uses to set the .dark class. */
function useIsDark() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(mq.matches);
      const h = (e) => setIsDark(e.matches);
      mq.addEventListener("change", h);
      return () => mq.removeEventListener("change", h);
    }
    setIsDark(theme === "dark");
  }, [theme]);
  return isDark;
}

/* Minimalist promo element that appears briefly around the logo. */
function PromoBit({ children, className = "", delay = 0, gold = false }) {
  return (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
      transition={{ delay, duration: 0.7, times: [0, 0.2, 0.7, 1], ease: "easeOut" }}
      className={`absolute z-30 text-xs font-extrabold tracking-wide ${gold ? "text-gold" : "text-mint"} ${className}`}
      style={{ textShadow: gold ? "0 0 10px hsl(var(--gold) / 0.5)" : "0 0 10px hsl(var(--mint) / 0.5)" }}
    >
      {children}
    </motion.span>
  );
}

/* CLUB splash — a brand animation representing "you just found an opportunity".
   Adaptive to the app theme (dark/light). Sequence ~2s:
   expectativa → descubrimiento → corona+logo → destello → promo bits →
   respiración → indicador discreto. No spinner, no explosion, no green flood. */
export default function Splash() {
  const isDark = useIsDark();

  const halo = isDark
    ? "radial-gradient(circle, hsl(var(--mint) / 0.30), transparent 66%)"
    : "radial-gradient(circle, hsl(var(--mint) / 0.16), transparent 66%)";
  const goldHalo = isDark
    ? "radial-gradient(circle, hsl(var(--gold) / 0.20), transparent 60%)"
    : "radial-gradient(circle, hsl(var(--gold) / 0.12), transparent 60%)";
  const ambient = isDark
    ? "radial-gradient(120% 80% at 50% 42%, hsl(var(--mint) / 0.06), transparent 60%)"
    : "radial-gradient(120% 80% at 50% 42%, hsl(var(--mint) / 0.05), transparent 60%)";
  const spark = isDark ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)";

  return (
    <div className="relative w-full h-full grid place-items-center overflow-hidden">
      {/* Ambient base gradient — very subtle, theme-aware, no edges */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: ambient }}
      />

      {/* PHASE 1 — discovery: a location pin appears with a pulse ring ("what's near me") */}
      <motion.div
        aria-hidden
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.7, times: [0, 0.25, 0.7, 1], ease: "easeOut" }}
        className="absolute pointer-events-none text-mint"
        style={{ filter: "drop-shadow(0 0 10px hsl(var(--mint) / 0.6))" }}
      >
        <MapPin size={26} strokeWidth={2.4} />
      </motion.div>
      <motion.span
        aria-hidden
        initial={{ scale: 0.4, opacity: 0.5 }}
        animate={{ scale: 2.6, opacity: [0.5, 0] }}
        transition={{ duration: 0.95, ease: "easeOut" }}
        className="absolute w-10 h-10 rounded-full border border-mint/50 pointer-events-none"
      />

      {/* PHASE 2 — soft expansion at center (mint + gold touch), elegant, no explosion */}
      <motion.div
        aria-hidden
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 0.85, 0] }}
        transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: halo }}
      />
      <motion.div
        aria-hidden
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 0.6, 0] }}
        transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: goldHalo }}
      />

      {/* Logo group + subtitle + discreet indicator */}
      <div className="relative flex flex-col items-center gap-6 z-10 px-6">
        <div className="relative grid place-items-center">
          {/* PHASE 3+4+7 — logo appears as one unit (crown + CLUB) with fade,
              scale 0.9→1 and a subtle breathing (1→1.015→1) at the end */}
          <motion.img
            src={LOGO_URL}
            alt="CLUB"
            initial={{ scale: 0.9, opacity: 0, y: 12 }}
            animate={{ scale: [0.9, 1, 1.015, 1], opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.7, times: [0, 0.42, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "min(62vw, 260px)", height: "auto", filter: "drop-shadow(0 0 6px hsl(var(--mint) / 0.5)) drop-shadow(0 0 16px hsl(var(--mint) / 0.28))" }}
            className="object-contain relative z-10"
          />

          {/* PHASE 5 — a quick spark sweeps from the crown downward across the
              logo (crown-first cue: "you discovered something special") */}
          <motion.div
            aria-hidden
            initial={{ y: "-130%", opacity: 0 }}
            animate={{ y: "130%", opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1.05, duration: 0.7, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
            <div className="absolute left-0 right-0 h-1/2 blur-md" style={{ background: `linear-gradient(180deg, transparent, ${spark}, transparent)` }} />
          </motion.div>

          {/* PHASE 6 — minimalist promo elements, appear and disappear quickly */}
          <PromoBit delay={1.25} className="left-[-10%] top-[8%]">%</PromoBit>
          <PromoBit delay={1.45} className="right-[-8%] top-[26%]" gold>OFF</PromoBit>
          <PromoBit delay={1.62} className="left-[4%] bottom-[2%]">🔥</PromoBit>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-[10px] font-medium text-muted-foreground tracking-[0.32em] uppercase"
        >
          Descubre lo local
        </motion.span>

        {/* PHASE 10 — discreet loading indicator (3 dots) shown after the animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ delay: 1.85, duration: 0.5, times: [0, 0.6, 1] }}
          className="flex items-center gap-1.5 -mt-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-mint/70"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}