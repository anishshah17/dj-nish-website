import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Events from "./sections/Events";
import Records from "./sections/Records";
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
      {/* Animated waveform bars */}
      <div className="mb-12 flex items-end justify-center gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-gradient-to-t from-pink to-blue rounded-full"
            style={{ height: "8px" }}
            animate={{ height: [8, 32, 8] }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo and text */}
      <div className="relative mb-8 flex flex-col items-center gap-3">
        <img src="/nish-logo.png" alt="DJ Nish" className="h-16 w-auto rounded-xl bg-white p-2" />
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-muted font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          SOUND CHECK
        </motion.p>
      </div>

      {/* Progress bar */}
      <div className="relative h-px w-48 overflow-hidden bg-stroke rounded-full">
        <motion.div
          className="absolute inset-y-0 left-0 accent-gradient"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Percentage */}
      <motion.p
        className="mt-4 font-display text-4xl font-bold gradient-text tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {count}%
      </motion.p>
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
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted font-mono">{label}</p>
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
        <Events onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} />
        <Records onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })} />
        <Gallery />
        <Stats />
        <Instagram />
        <Booking />
        <Footer />
      </motion.main>
    </>
  );
}
