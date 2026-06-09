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
// LOADING SCREEN — minimal, clean, no overlap
// ─────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf: number;
    let done = false;

    const tick = (now: number) => {
      const t = Math.min((now - start) / 2200, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done) {
        done = true;
        // Brief pause at 100%, then slide curtain up
        setTimeout(() => {
          if (curtainRef.current) {
            gsap.to(curtainRef.current, {
              yPercent: -100,
              duration: 0.85,
              ease: "power2.inOut",
              onComplete: () => {
                document.body.style.overflow = "";
                onComplete();
              },
            });
          }
        }, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
    >
      {/* Single soft ambient glow — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,32,240,0.07) 0%, transparent 100%)",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="/nish-logo.png"
          alt="DJ Nish"
          className="w-48 md:w-56"
          style={{ filter: "drop-shadow(0 0 24px rgba(255,0,140,0.25))" }}
        />
      </motion.div>

      {/* Progress line — bottom of screen */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, #FF008C, #A020F0, #15B8FF)",
          width: `${progress}%`,
          transition: "width 0.1s linear",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
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
    setTimeout(() => setContentVisible(true), 60);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.6 }}
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
