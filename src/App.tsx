import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Instagram from "./sections/Instagram";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// ─── Loading screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.classList.add("loading");

    const start = performance.now();
    let frame = 0;
    let completed = false;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / 2700, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.round(eased * 100);
      setCount(nextCount);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (!completed) {
        completed = true;
        window.setTimeout(() => {
          document.body.classList.remove("loading");
          onComplete();
        }, 400);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-screen animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-pink/30 rounded-full blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 80, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue/30 rounded-full blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -80, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Animated waveform bars */}
        <div className="flex items-end justify-center gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-pink to-blue rounded-full"
              style={{ height: "8px" }}
              animate={{ height: [8, 48, 8] }}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Logo and text */}
        <div className="relative flex flex-col items-center gap-4">
          <img src="/nish-logo.png" alt="DJ Nish" className="h-24 w-auto rounded-xl bg-white p-3" />
          <motion.p
            className="text-sm uppercase tracking-[0.4em] text-muted font-display font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            INITIALIZING
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 w-64 overflow-hidden bg-stroke rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Percentage */}
        <motion.p
          className="text-5xl font-display font-black gradient-text tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {count}%
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Stats strip ─────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    ["10+", "Years Experience"],
    ["500+", "Sets Performed"],
    ["100%", "Satisfied Clients"],
  ];
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-[8px] border border-stroke bg-stroke px-0 md:grid-cols-3">
        {stats.map(([value, label]) => (
          <motion.div
            key={label}
            className="bg-bg p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-6xl font-bold gradient-text md:text-7xl">{value}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading ? <LoadingScreen onComplete={() => setIsLoading(false)} /> : null}
      </AnimatePresence>

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero />
        <About />
        <Gallery />
        <Stats />
        <Instagram />
        <Booking />
        <Footer />
      </motion.main>
    </>
  );
}
