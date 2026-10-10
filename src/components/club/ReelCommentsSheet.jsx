import { useState } from "react";
import { Heart, Flag, Send, Shield } from "lucide-react";
import Sheet from "./Sheet";
import { UserAvatar } from "./ui";
import { containsBadWord } from "@/data/reels";

/* Comments for a reel — Instagram-Reels style. Includes a safety filter that
   blocks comments with harmful language before they are posted, plus per-comment
   like and report. */
export default function ReelCommentsSheet({ open, onClose, comments, onAdd, onLike, onReport }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    if (containsBadWord(text)) {
      setError("Tu comentario contiene lenguaje no permitido y no se publicará.");
      return;
    }
    onAdd(text.trim());
    setText("");
    setError("");
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Comentarios"
      footer={
        <div className="p-3 flex items-center gap-2 bg-surface">
          <input
            value={text}
            onChange={(e) => { setText(e.target.value); setError(""); }}
            placeholder="Agrega un comentario…"
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="flex-1 h-10 rounded-full bg-surface-hover border border-border px-4 text-sm outline-none focus:border-mint"
          />
          <button onClick={submit} className="grid place-items-center w-10 h-10 rounded-full gradient-amethyst text-white shrink-0">
            <Send size={16} />
          </button>
        </div>
      }
    >
      <div className="px-4 py-3 space-y-4">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Shield size={13} className="text-mint" /> Comunidad segura: los comentarios con insultos se bloquean automáticamente.
        </p>
        {comments.length === 0 && <p className="text-center text-sm text-muted-foreground py-10">Sé el primero en comentar</p>}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <UserAvatar src={c.avatar} size={32} />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold text-title">{c.user}</span>{" "}
                <span className="text-muted-foreground">· {c.time}</span>
              </p>
              <p className="text-sm text-foreground mt-0.5 break-words">{c.text}</p>
              <div className="flex items-center gap-4 mt-1.5">
                <button onClick={() => onLike(c.id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart size={13} className={c.liked ? "fill-coral text-coral" : ""} /> {c.likes}
                </button>
                <button onClick={() => onReport(c.id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Flag size={13} /> Reportar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}