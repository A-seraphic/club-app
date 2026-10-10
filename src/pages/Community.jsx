import { useState } from "react";
import { Plus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ReelsFeed from "@/components/club/ReelsFeed";
import PublishReelSheet from "@/components/club/PublishReelSheet";
import { useToast } from "@/components/ui/use-toast";
import { reels as initialReels } from "@/data/reels";
import { currentUser } from "@/data/mockData";

/* Community = a Reels-style feed of recommendation videos. Users can publish
   their own recommendations and comment on others. Safety: harmful-language
   comments are auto-blocked and any reel/comment can be reported. */
export default function Community() {
  const { toast } = useToast();
  const [reels, setReels] = useState(initialReels);
  const [publishOpen, setPublishOpen] = useState(false);

  const addReel = (data) => {
    setReels((rs) => [
      {
        id: "r" + Date.now(),
        authorName: currentUser.name,
        authorHandle: currentUser.username,
        avatar: currentUser.avatar,
        businessId: data.businessId,
        businessName: data.businessName,
        caption: data.caption,
        video: data.video,
        poster: data.poster,
        likes: 0, liked: false, saved: false, shares: 0,
        comments: [],
      },
      ...rs,
    ]);
    toast({ title: "¡Recomendación publicada! 🎉" });
  };

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-30 glass border-b border-border h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="font-display font-bold text-title text-xl">Comunidad</h1>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-mint bg-mint/10 border border-mint/30 rounded-full px-2 py-0.5">
            <ShieldCheck size={11} /> Segura
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setPublishOpen(true)}
          aria-label="Publicar recomendación"
          className="grid place-items-center w-10 h-10 rounded-full gradient-amethyst glow-amethyst text-white"
        >
          <Plus size={20} />
        </motion.button>
      </header>

      <ReelsFeed reels={reels} setReels={setReels} />

      <PublishReelSheet open={publishOpen} onClose={() => setPublishOpen(false)} onPublish={addReel} />
    </div>
  );
}