import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;

    const letters = nameRef.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out",
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 pt-32 pb-20"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-64 -left-64 w-96 h-96 bg-pink/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 120, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-64 -right-64 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -120, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple/15 rounded-full blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8 glass-sm px-4 py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink to-blue animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-muted font-display font-semibold">
            Available to Book
          </span>
        </motion.div>

        {/* Main heading */}
        <h1
          ref={nameRef}
          className="text-7xl md:text-8xl lg:text-9xl font-display font-black leading-none mb-8 tracking-tighter"
        >
          {"DJ NISH".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Roles with stagger */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {["DJ", "Producer", "Sound Architect"].map((role, i) => (
            <motion.div
              key={role}
              className="glass-sm px-5 py-2 text-sm md:text-base font-medium uppercase tracking-wide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              {role}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <button className="group relative px-8 py-4 text-sm font-bold uppercase tracking-wider accent-gradient rounded-full text-white overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(243,6,130,0.6)]">
            <span className="relative z-10">Listen to Mixes</span>
          </button>
          <button className="group relative px-8 py-4 text-sm font-bold uppercase tracking-wider glass rounded-full text-white transition-all hover:bg-white/10">
            <span className="relative z-10">Book a Set</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
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
