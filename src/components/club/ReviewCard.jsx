import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import CrownRating from "./CrownRating";
import { useToast } from "@/components/ui/use-toast";

/* A review left by the user. The community rates it with coronitas (shown as a
   readOnly average), and any visitor can add their own crown rating + mark it
   as useful — this is how CLUB signals how reliable a person's reviews are. */
export default function ReviewCard({ review }) {
  const { toast } = useToast();
  const [myRating, setMyRating] = useState(0);
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="bg-surface rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-title">{review.biz}</span>
        <div className="flex items-center gap-1.5">
          <CrownRating value={review.crowns} readOnly size={13} />
          <span className="text-xs text-muted-foreground">({review.ratingsCount})</span>
        </div>
      </div>
      <p className="text-sm text-foreground mt-2">{review.text}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Califica:</span>
          <CrownRating
            value={myRating}
            size={15}
            onChange={(v) => { setMyRating(v); toast({ title: "Gracias por calificar esta reseña 👑" }); }}
          />
        </div>
        <button
          onClick={() => {
            setHelpful((v) => !v);
            if (!helpful) toast({ title: "Marcada como útil" });
          }}
          className="inline-flex items-center gap-1 text-xs"
        >
          <ThumbsUp size={14} className={helpful ? "fill-mint text-mint" : "text-muted-foreground"} /> Útil
        </button>
      </div>
    </div>
  );
}