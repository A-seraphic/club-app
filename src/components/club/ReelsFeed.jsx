import { useState } from "react";
import ReelCard from "./ReelCard";
import ReelCommentsSheet from "./ReelCommentsSheet";
import { useToast } from "@/components/ui/use-toast";

/* Vertical snap-scroll reels feed. Owns interactions: like/save/share/report
   on reels, and the comments sheet (add / like-comment / report-comment). */
export default function ReelsFeed({ reels, setReels }) {
  const { toast } = useToast();
  const [activeComments, setActiveComments] = useState(null);
  const activeReel = reels.find((r) => r.id === activeComments);

  const toggleLike = (id) =>
    setReels((rs) => rs.map((r) => (r.id === id ? { ...r, liked: !r.liked, likes: r.likes + (r.liked ? -1 : 1) } : r)));
  const toggleSave = (id) => {
    setReels((rs) => rs.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r)));
    toast({ title: reels.find((r) => r.id === id)?.saved ? "Quitado de guardados" : "Guardado 🔖" });
  };
  const share = () => toast({ title: "Compartido" });
  const reportReel = () => toast({ title: "Reporte enviado", description: "Lo revisaremos pronto." });

  const addComment = (reelId, text) =>
    setReels((rs) =>
      rs.map((r) =>
        r.id === reelId
          ? { ...r, comments: [{ id: "c" + Date.now(), user: "Tú", avatar: "https://i.pravatar.cc/150?img=5", text, time: "ahora", likes: 0, liked: false }, ...r.comments] }
          : r
      )
    );
  const likeComment = (reelId, cId) =>
    setReels((rs) =>
      rs.map((r) =>
        r.id === reelId
          ? { ...r, comments: r.comments.map((c) => (c.id === cId ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) } : c)) }
          : r
      )
    );
  const reportComment = () => toast({ title: "Comentario reportado", description: "Gracias por mantener la comunidad segura." });

  return (
    <>
      <div className="h-[calc(100dvh-8rem)] overflow-y-auto snap-y snap-mandatory no-scrollbar">
        {reels.map((r) => (
          <ReelCard
            key={r.id}
            reel={r}
            onLike={() => toggleLike(r.id)}
            onSave={() => toggleSave(r.id)}
            onShare={share}
            onComment={() => setActiveComments(r.id)}
            onReport={reportReel}
          />
        ))}
      </div>

      <ReelCommentsSheet
        open={!!activeComments}
        onClose={() => setActiveComments(null)}
        comments={activeReel?.comments || []}
        onAdd={(t) => addComment(activeComments, t)}
        onLike={(cId) => likeComment(activeComments, cId)}
        onReport={reportComment}
      />
    </>
  );
}