import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Logo animation: Each letter morphs in with unique timing
  const getLetterVariants = (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  });

  // Track mouse for reactive gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 pt-32 pb-20"
    >
      {/* Reactive gradient background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple/5 to-black" />

        {/* Animated blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-pink/20 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 80, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue/20 rounded-full blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -80, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mouse-reactive gradient overlay */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink/10 to-blue/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePos.x - 192,
            y: mousePos.y - 192,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Elegant NISH Logo - Letter by letter reveal */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter leading-none font-display">
            {["D", "J"].map((char, i) => (
              <motion.span
                key={`dj-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <br />
            {["N", "I", "S", "H"].map((char, i) => (
              <motion.span
                key={`nish-${i}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i + 2) * 0.15, duration: 0.6 }}
                className="inline-block gradient-text"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-2xl text-muted font-light tracking-wide max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Creating unforgettable experiences through music
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button className="accent-gradient rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-[0_0_60px_rgba(243,6,130,0.8)] hover:scale-105">
            Book Now
          </button>
          <button className="glass rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:scale-105">
            Watch Live Sets
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest text-muted">Scroll</span>
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
