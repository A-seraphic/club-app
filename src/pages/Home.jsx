import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, MapPin } from "lucide-react";
import { Brand, BrandLockup } from "@/components/club/Brand";
import Splash from "@/components/club/Splash";
import StoryRail from "@/components/club/StoryRail";
import CategoryChips from "@/components/club/CategoryChips";
import FlashOfferCard from "@/components/club/FlashOfferCard";
import PromoCard from "@/components/club/PromoCard";
import CommentsSheet from "@/components/club/CommentsSheet";
import ReportSheet from "@/components/club/ReportSheet";
import LocationSheet from "@/components/club/LocationSheet";
import OfferSheet from "@/components/club/OfferSheet";
import { UserAvatar, LocationPill, SectionTitle, PromoCardSkeleton, IconButton } from "@/components/club/ui";
import { categories, businesses, offers, currentUser } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";

export default function Home() {
  const navigate = useNavigate();
  const { location, preferences } = useApp();
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem("club_splash"));
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("destacados");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [cityLabel, setCityLabel] = useState(location.label);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (cityLabel === location.label) return;
    setUpdating(true);
    setCityLabel(location.label);
    setLoading(true);
    const t = setTimeout(() => { setUpdating(false); setLoading(false); }, 900);
    return () => clearTimeout(t);
  }, [location.label]);

  useEffect(() => {
    if (showSplash) {
      const t = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("club_splash", "1");
      }, 2400);
      return () => clearTimeout(t);
    }
  }, [showSplash]);

  useEffect(() => {
    if (showSplash) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [showSplash, activeCat]);

  let visibleOffers = activeCat === "destacados" ? offers.slice() : offers.filter((o) => o.category === activeCat);
  visibleOffers = visibleOffers.filter((o) => !preferences.hidden.includes(o.category));
  if (activeCat === "destacados") {
    if (preferences.order === "popular") visibleOffers.sort((a, b) => b.likes - a.likes);
    else if (preferences.order === "price") visibleOffers.sort((a, b) => a.promoPrice - b.promoPrice);
    else if (preferences.order === "discount") visibleOffers.sort((a, b) => b.discount - a.discount);
  }
  const flashOffers = offers.filter((o) => o.tags.some((t) => ["HOY", "LIMITADO"].includes(t)));

  const [activeOffer, setActiveOffer] = useState(null);
  const openOffer = (o) => setActiveOffer(o);
  const openBusiness = (b) => navigate(`/business/${b.id}`);

  return (
    <div>
      {/* Splash overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-background grid place-items-center max-w-[480px] mx-auto px-6 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <Splash />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky top bar */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <BrandLockup />
          <div className="flex items-center gap-2">
            <LocationPill onClick={() => setLocationOpen(true)}>{location.label}</LocationPill>
            <IconButton onClick={() => navigate("/notifications")}><Bell size={20} /></IconButton>
            <button onClick={() => navigate("/profile")}><UserAvatar src={currentUser.avatar} size={36} /></button>
          </div>
        </div>
      </header>

      {/* Stories */}
      <div className="pt-1">
        <StoryRail businesses={businesses} onOpen={openBusiness} />
      </div>

      {/* Categories */}
      <CategoryChips categories={categories} active={activeCat} onSelect={setActiveCat} />

      {/* Flash offers rail */}
      <SectionTitle action={<span className="text-xs text-coral font-semibold">⚡ Termina pronto</span>}>
        Ofertas cerca de ti
      </SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
        {flashOffers.map((o) => (
          <FlashOfferCard key={o.id} offer={o} onOpen={openOffer} />
        ))}
      </div>

      {/* Main feed */}
      <SectionTitle>Descubre</SectionTitle>
      <div className="space-y-5 pb-6">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <PromoCardSkeleton key={i} />)
          : visibleOffers.map((o) => (
              <PromoCard key={o.id} offer={o} onOpen={openOffer} onComment={() => setCommentsOpen(true)} onReport={() => setReportOpen(true)} />
            ))}
      </div>

      {/* Updating overlay */}
      <AnimatePresence>
        {updating && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-background/80 backdrop-blur-sm grid place-items-center max-w-[480px] mx-auto"
          >
            <div className="text-center">
              <div className="grid place-items-center w-14 h-14 rounded-full gradient-amethyst glow-amethyst mx-auto mb-3">
                <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 rounded-full border-2 border-white border-t-transparent" />
              </div>
              <p className="font-display font-semibold text-title">Actualizando ofertas…</p>
              <p className="text-sm text-muted-foreground mt-0.5 inline-flex items-center gap-1 justify-center"><MapPin size={13} className="text-[hsl(var(--amethyst))]" /> {location.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <OfferSheet offer={activeOffer} onClose={() => setActiveOffer(null)} onBusiness={(b) => navigate(`/business/${b.id}`)} />
      <CommentsSheet open={commentsOpen} onClose={() => setCommentsOpen(false)} />
      <ReportSheet open={reportOpen} onClose={() => setReportOpen(false)} />
      <LocationSheet open={locationOpen} onClose={() => setLocationOpen(false)} />
    </div>
  );
}