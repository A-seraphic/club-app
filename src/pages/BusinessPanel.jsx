import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowLeft, Plus, Eye, Heart, Bookmark, MousePointerClick, Users, Rocket } from "lucide-react";
import { Brand } from "@/components/club/Brand";
import { offers, formatCOP } from "@/data/mockData";

const data = [
  { d: "Lun", v: 120 }, { d: "Mar", v: 240 }, { d: "Mié", v: 180 }, { d: "Jue", v: 320 }, { d: "Vie", v: 410 }, { d: "Sáb", v: 520 }, { d: "Dom", v: 380 },
];

const stats = [
  { icon: Eye, label: "Visualizaciones", value: "12.4k", tone: "text-[hsl(var(--amethyst))]" },
  { icon: Heart, label: "Likes", value: "3.2k", tone: "text-coral" },
  { icon: Bookmark, label: "Guardados", value: "890", tone: "text-[hsl(var(--amethyst))]" },
  { icon: MousePointerClick, label: "Clics", value: "1.1k", tone: "text-gold" },
  { icon: Users, label: "Seguidores", value: "12.4k", tone: "text-[hsl(var(--amethyst))]" },
  { icon: Rocket, label: "Ofertas activas", value: "4", tone: "text-coral" },
];

export default function BusinessPanel() {
  const navigate = useNavigate();
  const myOffers = offers.filter((o) => ["o1", "o5", "o8"].includes(o.id));

  return (
    <div className="pb-6">
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <div>
          <h1 className="font-display font-bold text-title text-lg leading-none">Panel de empresa</h1>
          <p className="text-[11px] text-muted-foreground">Burger Lab</p>
        </div>
        <button onClick={() => navigate("/create-offer")} className="ml-auto inline-flex items-center gap-1.5 gradient-amethyst text-white text-sm font-semibold px-4 h-9 rounded-full">
          <Plus size={16} /> Crear oferta
        </button>
      </header>

      {/* Stats grid */}
      <div className="px-4 mt-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-surface rounded-2xl border border-border p-4">
            <span className={`grid place-items-center w-9 h-9 rounded-full bg-surface-hover mb-2`}><s.icon size={16} className={s.tone} /></span>
            <p className="font-display font-bold text-title text-2xl">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-4 mt-5">
        <div className="bg-surface rounded-2xl border border-border p-4">
          <h3 className="font-display font-semibold text-title text-sm mb-3">Rendimiento semanal</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="d" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, color: "hsl(var(--title))", fontSize: 12 }} cursor={{ fill: "hsl(var(--amethyst) / 0.1)" }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="hsl(var(--amethyst))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* My offers */}
      <div className="px-4 mt-5">
        <h3 className="font-display font-bold text-title text-base mb-3">Mis ofertas</h3>
        <div className="space-y-2">
          {myOffers.map((o) => (
            <div key={o.id} className="bg-surface rounded-2xl border border-border p-3 flex items-center gap-3">
              <img src={o.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-title truncate">{o.title}</p>
                <p className="text-xs text-muted-foreground">{formatCOP(o.promoPrice)} · {o.discount}% OFF</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${o.expired ? "bg-surface-hover text-muted-foreground" : "bg-[hsl(var(--amethyst))]/15 text-[hsl(var(--amethyst))]"}`}>
                  {o.expired ? "Finalizada" : "Activa"}
                </span>
              </div>
              {!o.expired && (
                <button onClick={() => navigate(`/boost-offer/${o.id}`)} className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--amethyst))] bg-[hsl(var(--amethyst))]/10 px-3 h-8 rounded-full">
                  <Rocket size={13} /> Impulsar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}