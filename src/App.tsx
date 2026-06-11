import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Instagram from "./sections/Instagram";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// ─── Smooth scroll ────────────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

// ─── Cinematic Shader Intro ───────────────────────────────────────────────────
function ShaderIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const shader1Ref = useRef<HTMLDivElement>(null);
  const shader2Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    // Phase 1 (0–2s): Shader2 (waterPlane ripple) fades in full-screen
    tl.set(shader2Ref.current, { opacity: 0 })
      .set(shader1Ref.current, { opacity: 0 })
      .set(logoRef.current, { opacity: 0, scale: 0.75, y: 20 })
      .set(glowRef.current, { opacity: 0, scale: 0.5 })
      .set(taglineRef.current, { opacity: 0, y: 10 });

    tl.to(shader2Ref.current, { opacity: 1, duration: 1.8, ease: "power2.inOut" }, 0);

    // Phase 2 (1.5–3s): Logo materialises from the gradient
    tl.to(glowRef.current, { opacity: 1, scale: 1.4, duration: 1.4, ease: "power3.out" }, 1.5)
      .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 1.6);

    // Phase 3 (3–4.5s): Shader1 (turbulent plane) crossfades in — energy builds
    tl.to(shader1Ref.current, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, 3.0)
      .to(shader2Ref.current, { opacity: 0, duration: 1.2, ease: "power2.inOut" }, 3.0);

    // Tagline fades in
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 3.4);

    // Glow pulse loop (runs in parallel, killed when tl ends)
    gsap.to(glowRef.current, {
      scale: 1.8,
      opacity: 0.6,
      duration: 1.6,
      repeat: 4,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Phase 4 (5.5–6.5s): Logo blasts forward, everything fades to black
    tl.to(logoRef.current, {
      scale: 6,
      opacity: 0,
      duration: 0.9,
      ease: "power3.in",
    }, 5.2)
      .to(taglineRef.current, { opacity: 0, duration: 0.4 }, 5.2)
      .to(glowRef.current, { opacity: 0, duration: 0.4 }, 5.2)
      .to([shader1Ref.current, shader2Ref.current], {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      }, 5.4)
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, 5.8);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#000" }}
    >
      {/* ── Shader 2: waterPlane ripple (first phase) ── */}
      <div ref={shader2Ref} className="absolute inset-0" style={{ opacity: 0 }}>
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1}
          fov={40}
        >
          <ShaderGradient
            animate="on"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={4.79}
            cPolarAngle={115}
            cameraZoom={1}
            color1="#ee00d6"
            color2="#6bedfe"
            color3="#863ee4"
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={-0.5}
            positionY={0.1}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={0}
            rotationZ={235}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.2}
            uFrequency={5.5}
            uSpeed={0.1}
            uStrength={3.3}
            uTime={0.2}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* ── Shader 1: turbulent plane (second phase) ── */}
      <div ref={shader1Ref} className="absolute inset-0" style={{ opacity: 0 }}>
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1.5}
          fov={50}
        >
          <ShaderGradient
            animate="on"
            brightness={1}
            cAzimuthAngle={180}
            cDistance={4.51}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ee00d6"
            color2="#6bedfe"
            color3="#863ee4"
            envPreset="lobby"
            grain="on"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="plane"
            uAmplitude={1}
            uDensity={1.5}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={3.8}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* ── Logo glow halo ── */}
      <div
        ref={glowRef}
        className="absolute z-10 rounded-full"
        style={{
          width: 320,
          height: 320,
          background:
            "radial-gradient(ellipse at center, rgba(238,0,214,0.45) 0%, rgba(134,62,228,0.3) 40%, transparent 70%)",
          filter: "blur(32px)",
          opacity: 0,
        }}
      />

      {/* ── Logo ── */}
      <div
        ref={logoRef}
        className="relative z-20 flex flex-col items-center gap-5"
        style={{ opacity: 0 }}
      >
        <img
          src="/nish-logo.png"
          alt="DJ Nish"
          className="w-56 md:w-72"
          style={{
            filter: "drop-shadow(0 0 40px rgba(238,0,214,0.6)) drop-shadow(0 0 80px rgba(107,237,254,0.3))",
          }}
        />
      </div>

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        className="absolute z-20 bottom-16 text-xs tracking-[0.4em] uppercase font-light"
        style={{
          color: "rgba(255,255,255,0.55)",
          opacity: 0,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "0.4em",
        }}
      >
        DJ · Producer · Chicago
      </p>

      {/* ── Thin gradient progress line at very bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background: "linear-gradient(to right, #ee00d6, #863ee4, #6bedfe)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 6.3, ease: "linear" }}
      />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <ShaderIntro key="intro" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ pointerEvents: isLoading ? "none" : "auto", visibility: isLoading ? "hidden" : "visible" }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Gallery />
          <Instagram />
          <Booking />
          <Footer />
        </main>
      </motion.div>
    </>
  );
}
