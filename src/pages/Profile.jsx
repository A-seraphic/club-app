import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Bookmark, Star, Grid3x3, Heart, MapPin, Camera, Image as ImageIcon, Crown, ShieldCheck, Pencil, Eye } from "lucide-react";
import { UserAvatar, PrimaryButton } from "@/components/club/ui";
import { Brand } from "@/components/club/Brand";
import { useApp } from "@/lib/AppContext";
import { currentUser, offers, posts } from "@/data/mockData";
import PromoCard from "@/components/club/PromoCard";
import CrownRating from "@/components/club/CrownRating";
import ReviewCard from "@/components/club/ReviewCard";
import { reputation, userReviews } from "@/data/reels";

const banners = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=900&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f39cc1f?w=900&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80",
];

export default function Profile() {
  const navigate = useNavigate();
  const { likes, saves, privacy, userType, profile } = useApp();
  const [tab, setTab] = useState("posts");
  const [banner, setBanner] = useState(profile.banner || banners[0]);
  const [editing, setEditing] = useState(false);
  const [viewAsOther, setViewAsOther] = useState(false);

  const likedOffers = offers.filter((o) => likes.has(o.id));
  const savedOffers = offers.filter((o) => saves.has(o.id));

  const tabs = [
    { id: "posts", label: "Publicaciones", icon: Grid3x3, show: privacy.showPosts },
    { id: "likes", label: "Me gusta", icon: Heart, show: privacy.showLikes },
    { id: "saved", label: "Guardados", icon: Bookmark, show: privacy.showSaved },
    { id: "reviews", label: "Opiniones", icon: Star, show: privacy.showReviews },
  ].filter((t) => !viewAsOther || t.show);

  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center justify-between">
        <Brand size="md" logo />
        <button onClick={() => navigate("/settings")} className="grid place-items-center w-10 h-10 rounded-full bg-surface-hover border border-border">
          <Settings size={18} className="text-title" />
        </button>
      </header>

      {/* Banner */}
      <div className="relative h-40 group">
        <img src={banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <button onClick={() => setEditing((v) => !v)} className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
          <Camera size={13} /> Cambiar banner
        </button>
        {editing && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto no-scrollbar">
            {banners.map((b) => (
              <button key={b} onClick={() => { setBanner(b); setEditing(false); }} className="shrink-0">
                <img src={b} alt="" className="w-16 h-12 rounded-lg object-cover border-2 border-white/70" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Identity */}
      <div className="px-4 -mt-12 relative">
        <div className="relative inline-block">
          <UserAvatar src={profile.avatar} size={88} ring className="border-4 border-background" />
          <button className="absolute bottom-0 right-0 grid place-items-center w-7 h-7 rounded-full gradient-amethyst border-2 border-background">
            <Camera size={13} className="text-white" />
          </button>
        </div>
        <div className="mt-3">
          <h1 className="font-display font-bold text-title text-2xl">{userType === "business" ? profile.businessName : profile.name}</h1>
          <p className="text-sm text-muted-foreground">{profile.username}</p>
          <p className="text-sm text-foreground mt-2 leading-relaxed">{userType === "business" ? profile.description : profile.bio}</p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-2"><MapPin size={12} />{profile.location}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {[
            { v: currentUser.posts, l: "Posts" },
            { v: currentUser.followers, l: "Seguidores" },
            { v: currentUser.following, l: "Siguiendo" },
            { v: "8.4k", l: "Likes" },
          ].map((s) => (
            <div key={s.l} className="bg-surface rounded-xl border border-border p-2.5 text-center">
              <p className="font-display font-bold text-title text-base">{s.v}</p>
              <p className="text-[10px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Crown reputation — how much the community trusts this person's reviews */}
        <div className="mt-4 bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={18} className="text-gold" />
              <span className="font-display font-bold text-title">Reputación</span>
            </div>
            <CrownRating value={reputation.level} readOnly size={16} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div>
              <p className="font-display font-bold text-title text-base">{reputation.helpfulVotes}</p>
              <p className="text-[10px] text-muted-foreground">Votos útiles</p>
            </div>
            <div>
              <p className="font-display font-bold text-title text-base">{reputation.likesOnComments}</p>
              <p className="text-[10px] text-muted-foreground">Likes en comentarios</p>
            </div>
            <div>
              <p className="font-display font-bold text-mint text-base">{reputation.reliability}%</p>
              <p className="text-[10px] text-muted-foreground">Confiabilidad</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-mint" /> Tus reseñas se califican con coronitas según qué tan útiles son para la comunidad.
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          {userType === "business" ? (
            <PrimaryButton className="flex-1" onClick={() => navigate("/business-panel")}>Panel de empresa</PrimaryButton>
          ) : (
            <PrimaryButton className="flex-1" onClick={() => navigate("/post")}>Compartir descubrimiento</PrimaryButton>
          )}
          <button onClick={() => navigate("/edit-profile")} aria-label="Editar perfil" className="grid place-items-center w-12 h-12 rounded-full bg-surface-hover border border-border">
            <Pencil size={18} className="text-title" />
          </button>
        </div>
        <button onClick={() => setViewAsOther((v) => !v)} className="mt-3 inline-flex items-center gap-1.5 text-xs text-mint font-medium">
          <Eye size={13} /> {viewAsOther ? "Ver como yo (propietario)" : "Ver como otra persona"}
        </button>
      </div>

      {viewAsOther && (
        <div className="mx-4 mt-4 p-2.5 rounded-xl bg-mint/10 border border-mint/30 text-xs text-foreground">
          Estás viendo este perfil como lo vería otra persona. Las secciones que mantienes privadas no aparecen.
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border mt-6 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="shrink-0 flex items-center justify-center gap-1.5 px-5 py-3 text-sm relative">
            <t.icon size={16} className={tab === t.id ? "text-[hsl(var(--amethyst))]" : "text-muted-foreground"} />
            <span className={tab === t.id ? "text-title font-medium" : "text-muted-foreground"}>{t.label}</span>
            {tab === t.id && <motion.span layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--amethyst))]" />}
          </button>
        ))}
      </div>

      <div className="pt-4 pb-6">
        {tab === "posts" && (
          <div className="space-y-5">
            {posts.slice(0, 2).map((p) => (
              <div key={p.id} className="px-4">
                <div className="bg-surface rounded-2xl border border-border p-4">
                  <p className="text-sm text-foreground">{p.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{p.date} · {p.businessName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "likes" && (
          likedOffers.length ? (
            <div className="space-y-5">
              {likedOffers.map((o) => <PromoCard key={o.id} offer={o} onOpen={(of) => navigate(`/offer/${of.id}`)} onComment={() => {}} />)}
            </div>
          ) : <p className="text-center text-sm text-muted-foreground py-10">Aún no has dado like a ofertas</p>
        )}
        {tab === "saved" && (
          savedOffers.length ? (
            <div className="space-y-5">
              {savedOffers.map((o) => <PromoCard key={o.id} offer={o} onOpen={(of) => navigate(`/offer/${of.id}`)} onComment={() => {}} />)}
            </div>
          ) : <p className="text-center text-sm text-muted-foreground py-10">Aún no has guardado ofertas</p>
        )}
        {tab === "reviews" && (
          <div className="px-4 space-y-3">
            {userReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}