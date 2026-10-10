import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, MapPin } from "lucide-react";
import { UserAvatar } from "./ui";

function Action({ icon: Icon, count, active, activeClass, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <motion.span whileTap={{ scale: 1.35 }} className="grid place-items-center w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm">
        <Icon size={24} className={active ? activeClass : "text-white"} />
      </motion.span>
      <span className="text-xs text-white font-medium">{count}</span>
    </button>
  );
}

/* One vertical reel — full-bleed video, tap to play/pause, mute toggle, right
   action rail (like/comment/share/save/more) and bottom author + caption +
   business tag. Only plays while in view (IntersectionObserver). */
export default function ReelCard({ reel, onLike, onSave, onShare, onComment, onReport }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) {
          v.play().catch(() => {});
          setPlaying(true);
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div ref={rootRef} className="relative h-full w-full bg-black snap-start snap-always overflow-hidden">
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        autoPlay
        muted
        loop
        playsInline
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

      {/* Pause indicator */}
      {!playing && (
        <button onClick={togglePlay} className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm">
            <Play size={28} className="text-white fill-white" />
          </span>
        </button>
      )}

      {/* Mute toggle */}
      <button onClick={toggleMute} className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-sm">
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Right action rail */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
        <Action icon={Heart} count={reel.likes} active={reel.liked} activeClass="fill-coral text-coral" onClick={onLike} />
        <Action icon={MessageCircle} count={reel.comments.length} onClick={onComment} />
        <Action icon={Share2} count={reel.shares} onClick={onShare} />
        <Action icon={Bookmark} active={reel.saved} activeClass="fill-[hsl(var(--mint))] text-[hsl(var(--mint))]" onClick={onSave} />
        <button onClick={onReport} className="grid place-items-center w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm">
          <MoreHorizontal size={22} className="text-white" />
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute left-3 right-16 bottom-24 text-white">
        <div className="flex items-center gap-2 mb-2">
          <UserAvatar src={reel.avatar} size={36} className="border-white/40" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{reel.authorName}</p>
            <p className="text-xs text-white/70 truncate">{reel.authorHandle}</p>
          </div>
        </div>
        <p className="text-sm leading-snug line-clamp-3">{reel.caption}</p>
        <button
          onClick={() => navigate(`/business/${reel.businessId}`)}
          className="mt-2 inline-flex items-center gap-1 text-xs bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1"
        >
          <MapPin size={12} /> {reel.businessName}
        </button>
      </div>
    </div>
  );
}