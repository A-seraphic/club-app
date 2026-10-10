import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Chip } from "./ui";

export default function CategoryChips({ categories, active, onSelect }) {
  const railRef = useRef(null);

  useEffect(() => {
    // subtle entrance
  }, []);

  return (
    <div className="relative">
      <div
        ref={railRef}
        className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3"
      >
        {categories.map((c) => (
          <Chip
            key={c.id}
            active={active === c.id}
            icon={c.emoji}
            onClick={() => onSelect(c.id)}
          >
            {c.name}
          </Chip>
        ))}
      </div>
      <motion.div
        layoutId="cat-indicator"
        className="hidden"
      />
    </div>
  );
}