import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import SignatureSound from "./sections/SignatureSound";
import EventTypes from "./sections/EventTypes";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// LOADING SCREEN — fully isolated, no overlap
// ─────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"building" | "spinning" | "reveal">("building");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf: number;
    let done = false;

    const tick = (now: number) => {
      const t = Math.min((now - start) / 2500, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        setPhase("spinning");
        setTimeout(() => {
          setPhase("reveal");
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 1.0,
              ease: "power3.inOut",
              onComplete: () => {
                document.body.style.overflow = "";
                onComplete();
              },
            });
          }
        }, 800);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const spinDuration =
    phase === "building"
      ? Math.max(0.06, 2.2 - progress * 0.02)
      : phase === "spinning"
      ? 0.07
      : 0.04;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Ambient gradient blobs */}
      <motion.div
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,0,140,0.22) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.25, 1], x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-60 -right-60 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(21,184,255,0.22) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,32,240,0.18) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Logo with animated glow halo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "backOut" }}
        >
          <motion.div
            className="absolute -inset-8 rounded-full blur-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,0,140,0.6), rgba(160,32,240,0.6), rgba(21,184,255,0.6))",
            }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.85, 1.1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src="/nish-logo.png"
            alt="DJ Nish"
            className="relative z-10 w-56 md:w-72 drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 40px rgba(255,0,140,0.5))" }}
          />
        </motion.div>

        {/* Spinning vinyl record */}
        <motion.div
          className="relative w-16 h-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "backOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #111 0%, #1a1a1a 45%, #0a0a0a 100%)",
              boxShadow: "0 0 30px rgba(255,0,140,0.5), 0 0 60px rgba(160,32,240,0.3)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }}
          >
            {[22, 16, 10, 5].map((r, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-gray-700/50"
                style={{ inset: `${r}px` }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: "linear-gradient(135deg, #FF008C, #A020F0, #15B8FF)" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Equalizer bars */}
        <motion.div
          className="flex items-end gap-1 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{
                background: "linear-gradient(to top, #FF008C, #A020F0, #15B8FF)",
                minHeight: "3px",
              }}
              animate={{
                height: [
                  `${6 + Math.random() * 22}px`,
                  `${6 + Math.random() * 22}px`,
                  `${6 + Math.random() * 22}px`,
                ],
              }}
              transition={{
                duration: 0.3 + Math.random() * 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                delay: i * 0.03,
              }}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="flex flex-col items-center gap-2 w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #FF008C, #A020F0, #15B8FF)",
              }}
            />
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 font-mono">
              {phase === "reveal" ? "READY" : phase === "spinning" ? "DROPPING IN" : "LOADING"}
            </span>
            <span className="text-[9px] font-mono font-bold text-white/40">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setContentVisible(true), 80);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        style={{ visibility: contentVisible ? "visible" : "hidden" }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <SignatureSound />
          <EventTypes />
          <Gallery />
          <Testimonials />
          <Booking />
          <Footer />
        </main>
      </motion.div>
    </>
  );
}
