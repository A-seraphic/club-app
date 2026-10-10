import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BadgeCheck, UserPlus, Crown, ShieldOff } from "lucide-react";
import { UserAvatar, PrimaryButton } from "@/components/club/ui";
import CrownRater from "@/components/club/CrownRater";
import { useApp } from "@/lib/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { getCommunityUser } from "@/data/community";

/* Public profile of another user. Shows their reviews, each rateable with
   coronas. Respects the user's privacy: if they hid their reviews, that
   section is not shown to others. */
export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCrownRating, rateComment, removeCrownRating } = useApp();
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("reviews");

  const user = getCommunityUser(id);
  if (!user) {
    return (
      <div className="px-6 py-20 text-center">
        <p className="font-display font-bold text-title text-lg">Usuario no encontrado</p>
        <button onClick={() => navigate("/search")} className="mt-4 text-mint text-sm font-medium">Volver a Buscar</button>
      </div>
    );
  }

  const canSeeReviews = user.privacy.showReviews;
  const totalCrowns = user.reviews.reduce((s, r) => s + r.crownCount, 0);

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg truncate">{user.name}</h1>
      </header>

      <div className="px-4 pt-5">
        <div className="flex items-center gap-3">
          <UserAvatar src={user.avatar} size={80} ring />
          <div className="min-w-0">
            <p className="font-display font-bold text-title text-xl flex items-center gap-1">{user.name} {user.verified && <BadgeCheck size={16} className="text-gold" />}</p>
            <p className="text-sm text-muted-foreground">{user.handle}</p>
            <p className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin size={12} />{user.location}</p>
          </div>
        </div>
        <p className="text-sm text-foreground mt-3">{user.bio}</p>

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Crown size={13} className="fill-gold text-gold" /> {totalCrowns} calificaciones en sus reseñas (demo)</span>
        </div>

        <div className="flex gap-2 mt-4">
          <PrimaryButton className="flex-1" onClick={() => { setFollowing((v) => !v); toast({ title: following ? "Dejaste de seguir" : "Ahora sigues a " + user.name }); }}>
            {following ? "Siguiendo" : "Seguir"}
          </PrimaryButton>
          <button onClick={() => toast({ title: "Reporte enviado", description: "Gracias por mantener la comunidad segura." })} className="grid place-items-center w-12 h-12 rounded-full bg-surface-hover border border-border">
            <UserPlus size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-border mt-6">
        <button onClick={() => setTab("reviews")} className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 text-sm relative">
          <Crown size={16} className={tab === "reviews" ? "text-gold" : "text-muted-foreground"} />
          <span className={tab === "reviews" ? "text-title font-medium" : "text-muted-foreground"}>Reseñas</span>
          {tab === "reviews" && <motion.span layoutId="user-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
        </button>
      </div>

      <div className="pt-4 pb-6 px-4 space-y-3">
        {tab === "reviews" && (
          canSeeReviews ? (
            user.reviews.length ? (
              user.reviews.map((r) => (
                <CrownRater
                  key={r.id}
                  review={r}
                  myRating={getCrownRating(r.id)}
                  onConfirm={(v) => { rateComment(r.id, v); toast({ title: `Calificaste con ${v} coronas 👑` }); }}
                  onRemove={() => { removeCrownRating(r.id); toast({ title: "Retiraste tu calificación" }); }}
                />
              ))
            ) : <p className="text-center text-sm text-muted-foreground py-10">Esta persona aún no ha publicado reseñas</p>
          ) : (
            <div className="flex flex-col items-center text-center py-12">
              <ShieldOff size={28} className="text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Este usuario mantiene sus reseñas privadas.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}