import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Sparkles } from "lucide-react";
import Sheet from "./Sheet";
import { DiscountPill } from "./ui";
import { clientAnswer, clientSuggestions } from "@/lib/ai";

/* CLUB AI integrated into Search — a bottom sheet that answers over the real
   demo offer data and lets the user open a promotion. No invented offers. */
export default function SearchAI({ open, onClose }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    const res = clientAnswer(q);
    setMessages((m) => [...m, { role: "user", text: q }, { role: "ai", ...res }]);
    setInput("");
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="CLUB AI"
      footer={
        <div className="px-4 py-3 border-t border-border flex items-center gap-2 bg-surface">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe tu pregunta…"
            className="flex-1 h-11 rounded-full bg-surface-hover border border-border px-4 text-sm text-title placeholder:text-muted-foreground outline-none focus:border-mint"
          />
          <button onClick={() => send()} className="grid place-items-center w-11 h-11 rounded-full gradient-amethyst glow-amethyst shrink-0">
            <Send size={18} className="text-white" />
          </button>
        </div>
      }
    >
      <div className="px-4 py-3 flex items-center gap-2 border-b border-border">
        <span className="grid place-items-center w-8 h-8 rounded-full gradient-amethyst glow-amethyst"><Sparkles size={14} className="text-white" /></span>
        <p className="text-xs text-muted-foreground">Pregúntame por ofertas, promociones o negocios cercanos. Respondo con los datos disponibles en CLUB.</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {clientSuggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-2 rounded-full bg-surface-hover border border-border text-foreground hover:border-mint/50">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            {m.role === "user" ? (
              <div className="max-w-[80%] gradient-amethyst text-white rounded-2xl rounded-br-sm px-3.5 py-2 text-sm">{m.text}</div>
            ) : (
              <div className="w-full">
                <div className="bg-surface-hover rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm text-foreground inline-block">{m.text}</div>
                {m.offers?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.offers.map((o) => (
                      <button key={o.id} onClick={() => { onClose(); navigate(`/offer/${o.id}`); }} className="w-full flex items-center gap-2 bg-surface-hover rounded-xl p-2 text-left hover:border-mint/50 border border-transparent">
                        <img src={o.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-title truncate">{o.title}</p>
                          <p className="text-[11px] text-muted-foreground">{o.businessName} · {o.distance}</p>
                        </div>
                        <DiscountPill discount={o.discount} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </Sheet>
  );
}