import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Subtle mouse parallax for the logo
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 50, damping: 20 });
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });
  const logoX = useTransform(x, [-1, 1], [-10, 10]);
  const logoY = useTransform(y, [-1, 1], [-6, 6]);

  useEffect(() => {
    setReady(true);
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Ambient background — single soft glow, no clutter ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pink left */}
        <motion.div
          className="absolute top-0 left-0 w-[55vw] h-[55vw] rounded-full blur-[120px]"
          style={{ background: "rgba(255,0,140,0.06)", translateX: "-30%", translateY: "-30%" }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blue right */}
        <motion.div
          className="absolute bottom-0 right-0 w-[55vw] h-[55vw] rounded-full blur-[120px]"
          style={{ background: "rgba(21,184,255,0.06)", translateX: "30%", translateY: "30%" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-10">

        {/* Logo — the hero */}
        <motion.div
          className="relative"
          style={{ x: logoX, y: logoY }}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Soft glow behind logo — just one layer */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(160,32,240,0.2) 0%, rgba(255,0,140,0.1) 50%, transparent 80%)",
              transform: "scale(1.6)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/nish-logo.png"
            alt="DJ Nish"
            className="relative z-10 w-64 md:w-80 lg:w-96"
            style={{ filter: "drop-shadow(0 0 32px rgba(255,0,140,0.3))" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm md:text-base tracking-[0.25em] uppercase font-light"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          DJ · Producer · Chicago
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          {/* Primary */}
          <motion.a
            href="#booking"
            className="relative rounded-full px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FF008C 0%, #A020F0 50%, #15B8FF 100%)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer on hover */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              initial={{ backgroundPosition: "-100% 0" }}
              whileHover={{ backgroundPosition: "200% 0" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Book Now</span>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#gallery"
            className="rounded-full px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.55)",
              background: "rgba(255,255,255,0.03)",
            }}
            whileHover={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.9)",
              background: "rgba(255,255,255,0.06)",
              scale: 1.04,
            }}
            whileTap={{ scale: 0.97 }}
          >
            View Gallery
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll indicator — minimal ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.35em] font-mono"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Scroll
        </span>
        {/* Animated line */}
        <div
          className="w-[1px] h-8 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="w-full"
            style={{
              background: "linear-gradient(to bottom, #FF008C, #15B8FF)",
              height: "50%",
            }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
