import { AnimatePresence, motion } from "framer-motion";
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

// Loading screen with spinning record
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const recordRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      const spinSpeed = 360 * (progress ** 1.5) * 20;
      if (recordRef.current) {
        recordRef.current.style.transform = `rotate(${spinSpeed}deg)`;
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      if (!completed) {
        completed = true;

        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
              document.body.classList.remove("loading");
              onComplete();
            },
          });
        }
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="relative w-48 h-48 mb-4">
          <div
            ref={recordRef}
            className="absolute inset-0 rounded-full border-8 border-gray-800 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 50%),
                radial-gradient(circle, #000 0%, #1a1a1a 50%, #000 100%)
              `,
            }}
          >
            <div className="absolute inset-0 rounded-full opacity-30">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-gray-700"
                  style={{
                    inset: `${i * 8}px`,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink via-purple to-blue flex items-center justify-center shadow-lg">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <span className="text-xs font-bold text-white text-center">DJ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-2 -right-8 w-24 h-2 bg-gray-600 rounded-full origin-left transform -rotate-12 shadow-lg">
            <div className="absolute right-0 w-3 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>

        <motion.p
          className="text-sm uppercase tracking-[0.4em] text-muted font-display font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING
        </motion.p>

        <div className="relative h-1 w-64 overflow-hidden bg-stroke rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient"
            style={{ width: `${count}%` }}
          />
        </div>

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
        <SignatureSound />
        <EventTypes />
        <Gallery />
        <Testimonials />
        <Booking />
        <Footer />
      </motion.main>
    </>
  );
}
