import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      // Zoom-in effect on title
      gsap.fromTo(
        titleRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" }
      );

      // Stagger in the role text
      const roles = titleRef.current?.querySelectorAll(".role-text");
      if (roles) {
        gsap.fromTo(
          roles,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.4, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-bg pt-24 md:pt-32"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-pink/20 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center md:px-10">
        {/* Main title with zoom effect */}
        <motion.div
          ref={titleRef}
          className="mb-8 flex flex-col items-center gap-4"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "backOut" }}
        >
          <h1 className="font-display text-7xl md:text-9xl font-black leading-none gradient-text tracking-tighter">
            DJ NISH
          </h1>
        </motion.div>

        {/* Role text */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {["DJ", "Producer", "Sound Architect"].map((role, i) => (
            <motion.span
              key={role}
              className="role-text text-sm md:text-base uppercase tracking-[0.3em] text-muted font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="accent-gradient rounded-full px-8 py-3.5 text-sm font-bold text-white uppercase tracking-wider transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.6)] hover:brightness-110 active:scale-95">
            Listen to Mixes
          </button>
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="gradient-ring relative rounded-full text-sm text-text-primary"
          >
            <span className="relative block rounded-full bg-bg px-8 py-3.5 font-bold uppercase tracking-wider">
              Book a Set
            </span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted font-mono">Scroll</span>
          <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
