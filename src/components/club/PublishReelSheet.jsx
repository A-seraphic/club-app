import { useState } from "react";
import { Video, Shield } from "lucide-react";
import Sheet from "./Sheet";
import { PrimaryButton } from "./ui";
import { businesses } from "@/data/mockData";
import { sampleVideos } from "@/data/reels";

/* Publish a recommendation reel — pick a business, write a caption, choose a
   short video. Mock flow: no real upload, but the safety note signals that
   content goes through review before it is visible. */
export default function PublishReelSheet({ open, onClose, onPublish }) {
  const [bizId, setBizId] = useState(businesses[0].id);
  const [caption, setCaption] = useState("");
  const [videoIdx, setVideoIdx] = useState(0);

  const publish = () => {
    const biz = businesses.find((b) => b.id === bizId);
    onPublish({
      businessId: biz.id,
      businessName: biz.name,
      caption: caption.trim() || `Recomendación de ${biz.name}`,
      video: sampleVideos[videoIdx].video,
      poster: sampleVideos[videoIdx].poster,
    });
    setCaption("");
    setVideoIdx(0);
    onClose();
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Recomendar en video"
      footer={
        <div className="p-3">
          <PrimaryButton className="w-full" onClick={publish}>Publicar recomendación</PrimaryButton>
        </div>
      }
    >
      <div className="px-4 py-4 space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Negocio</label>
          <select
            value={bizId}
            onChange={(e) => setBizId(e.target.value)}
            className="mt-1 w-full h-11 rounded-xl bg-surface-hover border border-border px-3 text-sm text-foreground outline-none focus:border-mint"
          >
            {businesses.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">¿Qué recomiendas?</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder="Cuenta por qué vale la pena…"
            className="mt-1 w-full rounded-xl bg-surface-hover border border-border p-3 text-sm resize-none outline-none focus:border-mint"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Elige un video</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {sampleVideos.map((v, i) => (
              <button
                key={i}
                onClick={() => setVideoIdx(i)}
                className={`relative aspect-[9/16] rounded-xl overflow-hidden border-2 ${videoIdx === i ? "border-mint" : "border-border"}`}
              >
                <img src={v.poster} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-black/60 rounded grid place-items-center w-5 h-5">
                  <Video size={11} className="text-white" />
                </span>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Shield size={13} className="text-mint" /> Tu video pasa por revisión automática antes de publicarse.
        </p>
      </div>
    </Sheet>
  );
}