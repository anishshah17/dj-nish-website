import { useEffect, useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { galleryItems, type GalleryItem } from "../data";

// ── Play icon ─────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white drop-shadow-lg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ── Video badge ───────────────────────────────────────────────────────────────
function VideoBadge() {
  return (
    <span
      className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold"
      style={{
        background: "rgba(255,0,144,0.75)",
        backdropFilter: "blur(8px)",
        color: "#fff",
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5"><path d="M8 5v14l11-7z" /></svg>
      Video
    </span>
  );
}

// ── Lightbox caption ──────────────────────────────────────────────────────────
function LightboxCaption({ item }: { item: GalleryItem }) {
  return (
    <div
      className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md rounded-xl px-5 py-4"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/45 font-medium">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: item.type === "video" ? "#ff0090" : "#6bedfe" }}
        />
        <span>{item.type === "video" ? "Video" : "Photo"}</span>
        {item.date && (
          <>
            <span className="text-white/20">·</span>
            <span>{item.date}</span>
          </>
        )}
      </div>
      <h3
        className="mt-1.5 text-base sm:text-lg text-white font-semibold leading-snug"
        style={{ fontFamily: "'Unbounded', sans-serif" }}
      >
        {item.title}
      </h3>
      {item.subtitle && (
        <p className="mt-1 text-sm text-white/55 leading-relaxed">{item.subtitle}</p>
      )}
      {item.event && (
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-white/35 font-medium">
          {item.event}
        </p>
      )}
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Reset state when the active item changes, and prime the video for playback.
  useEffect(() => {
    setVideoFailed(false);
    if (item.type === "video" && videoRef.current) {
      const v = videoRef.current;
      v.currentTime = 0;
      // Some browsers (Safari) block autoplay without a user gesture; play() may
      // reject silently. Swallow the error so the user can press play manually.
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          /* ignore – the native controls let the user start playback */
        });
      }
    }
  }, [item]);

  // Keyboard support: Esc closes the lightbox.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Pause the video when the lightbox unmounts.
  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
      >
        <motion.div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" && !videoFailed ? (
            <video
              key={`video-${item.id}`}
              ref={videoRef}
              src={item.video}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full aspect-video bg-black"
              style={{ display: "block" }}
              onError={() => setVideoFailed(true)}
            >
              Your browser does not support the video tag.
            </video>
          ) : item.type === "video" && videoFailed ? (
            <div className="w-full aspect-video flex flex-col items-center justify-center gap-3 bg-black/80 text-white/70 text-sm">
              <p>This video couldn't be loaded.</p>
              <a
                href={item.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff0090] underline underline-offset-4"
              >
                Open video in a new tab
              </a>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-[16/10] object-cover"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2.5 transition-all duration-200 z-10"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              color: "#fff",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,0,144,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Caption */}
          <LightboxCaption item={item} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, index, isInView, onClick }: {
  item: GalleryItem;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const isVideo = item.type === "video";
  const thumbnail = isVideo ? item.poster : item.image;
  const isTall = index % 3 === 0;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        minHeight: isTall ? "26rem" : "18rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: "easeOut" }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      role="button"
      aria-label={`Open ${item.type}: ${item.title}`}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ minHeight: "inherit" }}
        />
      )}

      {/* Video badge */}
      {isVideo && <VideoBadge />}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background: "rgba(255,0,144,0.8)",
            boxShadow: "0 0 32px rgba(255,0,144,0.5)",
          }}
        >
          {isVideo ? (
            <PlayIcon />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          )}
        </div>
      </div>

      {/* Bottom gradient + title */}
      <div
        className="absolute inset-x-0 bottom-0 p-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }}
      >
        <h3
          className="text-sm font-semibold text-white"
          style={{ fontFamily: "'Unbounded', sans-serif" }}
        >
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="mt-1 text-xs text-white/55 line-clamp-1">{item.subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────────
export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.35em] font-medium"
            style={{ color: "rgba(255,0,144,0.8)" }}
          >
            Gallery
          </span>
          <h2
            className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Behind the decks
          </h2>
          <p className="mt-4 text-white/40 text-base leading-relaxed max-w-xl">
            Moments from stages, clubs, and late-night sets. Click any photo or video to expand.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox key={`lightbox-${selected.id}`} item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Play icon ─────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white drop-shadow-lg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ── Video badge ───────────────────────────────────────────────────────────────
function VideoBadge() {
  return (
    <span
      className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold"
      style={{
        background: "rgba(255,0,144,0.75)",
        backdropFilter: "blur(8px)",
        color: "#fff",
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5"><path d="M8 5v14l11-7z" /></svg>
      Video
    </span>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              ref={videoRef}
              src={item.video}
              poster={item.poster}
              controls
              autoPlay
              className="w-full aspect-video object-cover"
              style={{ display: "block" }}
            />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-[16/10] object-cover"
            />
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2.5 transition-all duration-200"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              color: "#fff",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,0,144,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.6)"; }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Caption */}
          <div
            className="absolute bottom-4 left-4 rounded-xl px-4 py-2.5"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-medium">
              {item.type === "video" ? "Video" : "Photo"}
            </p>
            <p className="mt-0.5 text-sm text-white font-medium">{item.title}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Gallery card ──────────────────────────────────────────────────────────────
function GalleryCard({ item, index, isInView, onClick }: {
  item: GalleryItem;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const isVideo = item.type === "video";
  const thumbnail = isVideo ? item.poster : item.image;
  const isTall = index % 3 === 0;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        minHeight: isTall ? "26rem" : "18rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: "easeOut" }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ minHeight: "inherit" }}
        />
      )}

      {/* Video badge */}
      {isVideo && <VideoBadge />}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background: "rgba(255,0,144,0.8)",
            boxShadow: "0 0 32px rgba(255,0,144,0.5)",
          }}
        >
          {isVideo ? (
            <PlayIcon />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          )}
        </div>
      </div>

      {/* Bottom gradient + title */}
      <div
        className="absolute inset-x-0 bottom-0 p-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      >
        <h3 className="text-sm font-semibold text-white/90">{item.title}</h3>
      </div>
    </motion.div>
  );
}

// ── Gallery section ───────────────────────────────────────────────────────────
export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.35em] font-medium"
            style={{ color: "rgba(255,0,144,0.8)" }}
          >
            Gallery
          </span>
          <h2
            className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            Behind the decks
          </h2>
          <p className="mt-4 text-white/40 text-base leading-relaxed max-w-xl">
            Moments from stages, clubs, and late-night sets. Click any photo or video to expand.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
              onClick={() => setSelected(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
