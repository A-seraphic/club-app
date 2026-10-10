import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Responsive bottom sheet — centered, no horizontal offset, keyboard-friendly.
 * Use `left-0 right-0 mx-auto` instead of translate to avoid subpixel drift on mobile.
 */
export default function Sheet({ open, onClose, title, children, footer, maxH = "85dvh" }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
            className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] z-50 bg-surface rounded-t-3xl border-t border-border flex flex-col"
            style={{ maxHeight: maxH }}
          >
            <div className="relative pt-2">
              <div className="w-10 h-1.5 rounded-full bg-surface-hover mx-auto" />
            </div>
            {title && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <h3 className="font-display font-bold text-title">{title}</h3>
                <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-full bg-surface-hover"><X size={18} /></button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
            {footer && <div className="shrink-0 border-t border-border">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}