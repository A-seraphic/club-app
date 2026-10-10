import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Clock, MessageCircle, UserPlus } from "lucide-react";
import { UserAvatar } from "@/components/club/ui";
import { notifications } from "@/data/mockData";

const iconFor = (type) => {
  switch (type) {
    case "offer": return { icon: UserPlus, tone: "text-[hsl(var(--amethyst))]" };
    case "expiring": return { icon: Clock, tone: "text-coral" };
    case "like": return { icon: Heart, tone: "text-coral" };
    case "reply": return { icon: MessageCircle, tone: "text-[hsl(var(--amethyst))]" };
    default: return { icon: UserPlus, tone: "text-gold" };
  }
};

export default function Notifications() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="sticky top-0 z-30 glass border-b border-border px-4 h-14 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><ArrowLeft size={18} /></button>
        <h1 className="font-display font-bold text-title text-lg">Notificaciones</h1>
      </header>
      <div className="divide-y divide-border">
        {notifications.map((n, i) => {
          const { icon: Icon, tone } = iconFor(n.type);
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 px-4 py-4"
            >
              <div className="relative">
                <UserAvatar src={n.avatar} size={44} />
                <span className={`absolute -bottom-1 -right-1 grid place-items-center w-5 h-5 rounded-full bg-surface border border-border`}>
                  <Icon size={12} className={tone} />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-title">{n.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}