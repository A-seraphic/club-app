import { motion } from "framer-motion";
import { Flag, EyeOff, ThumbsDown, Ban, Check } from "lucide-react";
import Sheet from "./Sheet";
import { useState } from "react";

const options = [
  { id: "report", icon: Flag, label: "Reportar", desc: "Contenido inapropiado o engañoso", tone: "text-coral" },
  { id: "hide", icon: EyeOff, label: "Ocultar", desc: "No mostrar esta publicación" },
  { id: "dislike", icon: ThumbsDown, label: "No me interesa", desc: "Ver menos contenido similar" },
  { id: "block", icon: Ban, label: "Bloquear usuario", desc: "Dejar de ver a este negocio", tone: "text-coral" },
];

export default function ReportSheet({ open, onClose }) {
  const [done, setDone] = useState(null);
  const reset = () => { setDone(null); onClose(); };
  return (
    <Sheet open={open} onClose={reset} title={done ? "" : "Opciones"}>
      {done ? (
        <div className="px-6 py-10 text-center">
          <div className="grid place-items-center w-16 h-16 rounded-full gradient-amethyst glow-amethyst mx-auto mb-4"><Check size={30} className="text-white" /></div>
          <h3 className="font-display font-bold text-title text-lg">Listo</h3>
          <p className="text-sm text-muted-foreground mt-1">{done}</p>
          <button onClick={reset} className="mt-5 w-44 h-11 rounded-full gradient-amethyst text-white font-semibold">Cerrar</button>
        </div>
      ) : (
        <div className="px-2 py-2">
          {options.map((o) => (
            <button key={o.id} onClick={() => setDone(o.label === "Reportar" ? "Gracias por tu reporte. Lo revisaremos." : `Hecho: ${o.label}.`)}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-hover text-left">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-surface-hover"><o.icon size={17} className={o.tone || "text-muted-foreground"} /></span>
              <div>
                <p className={`text-sm font-medium ${o.tone || "text-title"}`}>{o.label}</p>
                <p className="text-xs text-muted-foreground">{o.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Sheet>
  );
}