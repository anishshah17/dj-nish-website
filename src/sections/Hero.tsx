import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Floating particle component
function Particle({ index }: { index: number }) {
  const size = 2 + Math.random() * 4;
  const x = Math.random() * 100;
  const duration = 6 + Math.random() * 12;
  const delay = Math.random() * 8;
  const colors = ["#FF008C", "#A020F0", "#15B8FF", "#FF008C", "#A020F0"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10px",
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
      }}
      animate={{
        y: [0, -(300 + Math.random() * 400)],
        x: [0, (Math.random() - 0.5) * 200],
        opacity: [0, 0.8, 0.8, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      mouseX.set(((e.clientX - rect.left) - cx) / cx);
      mouseY.set(((e.clientY - rect.top) - cy) / cy);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 -z-10">
        {/* Deep dark base */}
        <div className="absolute inset-0" style={{ background: "#050505" }} />

        {/* Radial gradient matching logo colors */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(160,32,240,0.12) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Pink blob — top left */}
        <motion.div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,0,140,0.18) 0%, transparent 70%)" }}
          animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Blue blob — bottom right */}
        <motion.div
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(21,184,255,0.18) 0%, transparent 70%)" }}
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {mounted && Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 pb-20 w-full max-w-6xl mx-auto text-center">

        {/* Availability badge */}
        <motion.div
          className="mb-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-mono uppercase tracking-widest"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: "#15B8FF" }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>Available to book · Chicago, IL</span>
        </motion.div>

        {/* Logo — the hero centerpiece */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "backOut" }}
          style={{
            x: springX.get() ? springX : undefined,
            y: springY.get() ? springY : undefined,
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-12 rounded-full blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(255,0,140,0.3), rgba(160,32,240,0.3), rgba(21,184,255,0.3), rgba(255,0,140,0.3))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner glow */}
          <motion.div
            className="absolute -inset-6 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(255,0,140,0.4) 0%, rgba(160,32,240,0.3) 40%, transparent 70%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/nish-logo.png"
            alt="DJ Nish"
            className="relative z-10 w-72 md:w-96 lg:w-[480px]"
            style={{ filter: "drop-shadow(0 0 60px rgba(255,0,140,0.6)) drop-shadow(0 0 120px rgba(160,32,240,0.4))" }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl font-light tracking-[0.2em] max-w-xl mb-4"
          style={{ color: "rgba(255,255,255,0.55)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          Creating unforgettable experiences through music
        </motion.p>

        {/* Genre tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {["House", "Hip-Hop", "Bollywood", "Open Format", "EDM"].map((tag, i) => (
            <motion.span
              key={tag}
              className="text-xs font-mono uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.4 }}
              whileHover={{
                background: "rgba(255,0,140,0.1)",
                borderColor: "rgba(255,0,140,0.4)",
                color: "#FF008C",
                scale: 1.05,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.button
            className="relative overflow-hidden rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-white"
            style={{
              background: "linear-gradient(135deg, #FF008C, #A020F0, #15B8FF)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #FF008C, #A020F0, #15B8FF)",
                filter: "blur(20px)",
                opacity: 0,
              }}
              whileHover={{ opacity: 0.8 }}
            />
            <span className="relative z-10">Book Now</span>
          </motion.button>

          <motion.button
            className="rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-white"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{
              background: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.3)",
              scale: 1.06,
            }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Live Sets
          </motion.button>
        </motion.div>

        {/* Animated equalizer bars at bottom */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{
                background: "linear-gradient(to top, #FF008C, #A020F0, #15B8FF)",
                minHeight: "4px",
              }}
              animate={{
                height: [`${4 + Math.random() * 16}px`, `${4 + Math.random() * 16}px`, `${4 + Math.random() * 16}px`],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.05,
              }}
            />
          ))}
          <motion.span
            className="ml-3 text-[9px] font-mono uppercase tracking-[0.3em]"
            style={{ color: "rgba(255,255,255,0.2)" }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
