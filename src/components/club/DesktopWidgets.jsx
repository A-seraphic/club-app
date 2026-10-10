import { useNavigate } from "react-router-dom";
import { TrendingUp, MapPin, Store } from "lucide-react";
import { offers, businesses, currentUser, formatCOP } from "@/data/mockData";
import { UserAvatar, BusinessAvatar, DiscountPill, SectionTitle } from "./ui";

export default function DesktopWidgets() {
  const navigate = useNavigate();
  const trending = [...offers].filter((o) => !o.expired).sort((a, b) => b.likes - a.likes).slice(0, 3);
  return (
    <aside className="hidden xl:block w-80 shrink-0 px-4 py-4 space-y-5">
      {/* Mini profile */}
      <button onClick={() => navigate("/profile")} className="w-full flex items-center gap-3 bg-surface rounded-2xl border border-border p-3 text-left">
        <UserAvatar src={currentUser.avatar} size={44} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-title truncate">{currentUser.name}</p>
          <p className="text-xs text-muted-foreground">{currentUser.followers} seguidores</p>
        </div>
      </button>

      {/* Trending */}
      <div>
        <h3 className="font-display font-bold text-title text-sm mb-2 flex items-center gap-1.5"><TrendingUp size={15} className="text-coral" /> Tendencias en Neiva</h3>
        <div className="space-y-2">
          {trending.map((o) => (
            <button key={o.id} onClick={() => navigate(`/offer/${o.id}`)} className="w-full flex items-center gap-2 bg-surface rounded-xl border border-border p-2 text-left hover:border-[hsl(var(--amethyst))]/40">
              <img src={o.image} alt="" className="w-11 h-11 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-title truncate">{o.title}</p>
                <p className="text-[11px] text-muted-foreground">{o.businessName}</p>
              </div>
              <DiscountPill discount={o.discount} />
            </button>
          ))}
        </div>
      </div>

      {/* Featured businesses */}
      <div>
        <h3 className="font-display font-bold text-title text-sm mb-2 flex items-center gap-1.5"><Store size={15} className="text-[hsl(var(--amethyst))]" /> Negocios destacados</h3>
        <div className="space-y-2">
          {businesses.slice(0, 4).map((b) => (
            <button key={b.id} onClick={() => navigate(`/business/${b.id}`)} className="w-full flex items-center gap-2 bg-surface rounded-xl border border-border p-2 text-left hover:border-[hsl(var(--amethyst))]/40">
              <BusinessAvatar src={b.avatar} size={36} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-title truncate">{b.name}</p>
                <p className="text-[11px] text-muted-foreground inline-flex items-center gap-0.5"><MapPin size={9} />{b.distance}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}