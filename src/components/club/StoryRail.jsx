import { motion } from "framer-motion";
import { BusinessAvatar } from "./ui";

export default function StoryRail({ businesses, onOpen }) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-3">
      {businesses.map((b, i) => (
        <button key={b.id} onClick={() => onOpen(b)} className="flex flex-col items-center gap-1.5 shrink-0">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            <div className="p-[2px] rounded-full gradient-amethyst glow-amethyst">
              <div className="p-[2px] rounded-full bg-background">
                <BusinessAvatar src={b.avatar} size={62} className="rounded-full" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-coral ring-2 ring-background" />
          </motion.div>
          <span className="text-[11px] text-muted-foreground max-w-[64px] truncate">{b.name}</span>
        </button>
      ))}
    </div>
  );
}