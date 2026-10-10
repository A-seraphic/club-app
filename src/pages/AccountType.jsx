import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Store, ArrowRight } from "lucide-react";
import { Brand, LogoMark } from "@/components/club/Brand";
import { useApp } from "@/lib/AppContext";

const types = [
  { id: "client", icon: User, emoji: "👤", title: "Soy cliente", desc: "Quiero descubrir promociones, comprar y compartir experiencias.", features: ["Descubrir ofertas", "Guardar y dar like", "Comentar y reseñar"] },
  { id: "business", icon: Store, emoji: "🏢", title: "Soy empresa", desc: "Quiero publicar productos, promociones y conectar con clientes.", features: ["Publicar ofertas", "Panel de estadísticas", "Promocionar con premium"] },
];

export default function AccountType() {
  const navigate = useNavigate();
  const { setUserType } = useApp();
  const [selected, setSelected] = useState(null);

  const continue_ = () => {
    if (!selected) return;
    setUserType(selected);
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto relative px-6 pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[hsl(var(--amethyst))]/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-[hsl(var(--coral))]/10 blur-3xl" />
      </div>
      <div className="relative">
        <LogoMark size={200} glow />
        <h1 className="font-display font-bold text-title text-2xl mt-8">¿Cómo utilizarás CLUB?</h1>
        <p className="text-sm text-muted-foreground mt-1">Elige tu tipo de cuenta. Puedes cambiarlo después.</p>
      </div>

      <div className="relative mt-8 space-y-3">
        {types.map((t) => {
          const active = selected === t.id;
          return (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(t.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${active ? "border-[hsl(var(--amethyst))] bg-[hsl(var(--amethyst))]/10 glow-amethyst" : "border-border bg-surface-hover"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid place-items-center w-12 h-12 rounded-xl text-2xl ${active ? "gradient-amethyst" : "bg-surface"}`}>{t.emoji}</span>
                <div>
                  <p className="font-display font-bold text-title">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </div>
              <motion.div initial={false} animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-2 mt-3">
                  {t.features.map((f) => (
                    <span key={f} className="text-[11px] px-2.5 py-1 rounded-full bg-surface border border-border text-foreground">{f}</span>
                  ))}
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        disabled={!selected}
        onClick={continue_}
        className="relative mt-8 w-full h-12 rounded-full gradient-amethyst glow-amethyst font-display font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
      >
        Continuar <ArrowRight size={18} />
      </motion.button>
      <button onClick={() => navigate("/login")} className="relative mt-3 text-sm text-muted-foreground">Ya tengo cuenta</button>
    </div>
  );
}