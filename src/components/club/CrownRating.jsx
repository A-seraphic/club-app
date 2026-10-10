import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

/* 5-crown rating (instead of stars). readOnly shows the community rating;
   interactive lets a user rate a review with coronitas. */
export default function CrownRating({ value = 0, max = 5, size = 16, readOnly = false, onChange, className = "" }) {
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${value} de ${max} coronitas`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value);
        return (
          <motion.button
            key={i}
            type="button"
            disabled={readOnly}
            whileTap={!readOnly ? { scale: 1.35 } : undefined}
            onClick={() => !readOnly && onChange?.(i + 1)}
            className={cn(readOnly ? "cursor-default" : "cursor-pointer", "p-0 leading-none")}
            aria-label={`${i + 1} coronita`}
          >
            <Crown
              size={size}
              strokeWidth={1.8}
              className={cn(filled ? "fill-gold text-gold" : "fill-transparent text-muted-foreground/40")}
            />
          </motion.button>
        );
      })}
    </div>
  );
}