import { useState } from "react";
import { Heart, Send, Sparkles } from "lucide-react";
import { UserAvatar } from "./ui";
import Sheet from "./Sheet";
import { commentsData } from "@/data/mockData";

export default function CommentsSheet({ open, onClose, title = "Comentarios" }) {
  const [comments, setComments] = useState(commentsData);
  const [text, setText] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  const flagged = /basura|ladrones|estúpido|idiota|maldito/i.test(text);

  const send = () => {
    if (!text.trim()) return;
    setComments([{ id: Date.now(), user: "Tú", avatar: "https://i.pravatar.cc/150?img=5", text, time: "ahora", likes: 0 }, ...comments]);
    setText("");
    setShowSuggest(false);
  };

  return (
    <Sheet open={open} onClose={onClose} title={title} maxH="88dvh">
      <div className="px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{comments.length} comentarios</span>
      </div>
      <div className="px-4 space-y-4 pb-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <UserAvatar src={c.avatar} size={36} />
            <div className="flex-1">
              <div className="bg-surface-hover rounded-2xl px-3 py-2">
                <p className="text-sm font-semibold text-title">{c.user}</p>
                <p className="text-sm text-foreground">{c.text}</p>
              </div>
              <div className="flex items-center gap-4 mt-1 px-2 text-xs text-muted-foreground">
                <span>{c.time}</span>
                <button className="inline-flex items-center gap-1"><Heart size={12} /> {c.likes}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-surface border-t border-border px-4 py-3">
        {flagged && (
          <div className="mb-2 rounded-2xl border border-gold/40 bg-gold/10 p-3 text-xs text-foreground">
            <p className="font-semibold text-title flex items-center gap-1.5 mb-1">⚠️ ¿Quieres reformular tu comentario?</p>
            <p>Tu comentario podría interpretarse como ofensivo.</p>
            <button onClick={() => setShowSuggest((v) => !v)} className="text-[hsl(var(--amethyst))] font-medium mt-1.5">
              {showSuggest ? "Ocultar sugerencia" : "Ver sugerencia"}
            </button>
            {showSuggest && (
              <div className="mt-2 bg-surface-hover rounded-xl p-2.5">
                <p className="text-foreground">“Comparte tu experiencia de forma constructiva para ayudar a la comunidad.”</p>
                <button onClick={() => setText("Mi experiencia no fue satisfactoria, considero que el servicio podría mejorar.")} className="text-[hsl(var(--amethyst))] font-medium mt-1.5">Usar sugerencia</button>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe un comentario…"
            className="flex-1 h-11 rounded-full bg-surface-hover border border-border px-4 text-sm text-title placeholder:text-muted-foreground outline-none focus:border-[hsl(var(--amethyst))]"
          />
          <button onClick={send} className="grid place-items-center w-11 h-11 rounded-full gradient-amethyst glow-amethyst shrink-0">
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </Sheet>
  );
}