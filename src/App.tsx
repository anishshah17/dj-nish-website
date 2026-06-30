import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

import Navbar from "./sections/Navbar";
import ShaderHeroPage from "./sections/ShaderHeroPage";
import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Instagram from "./sections/Instagram";
import Booking from "./sections/Booking";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const INTRO_SHADER_COLORS = {
  primary: "#9f4f8f",
  secondary: "#2f6f8f",
  accent: "#6f4aa8",
};

const INTRO_GLOW_STYLE =
  "radial-gradient(ellipse at center, rgba(159,79,143,0.34) 0%, rgba(47,111,143,0.26) 42%, transparent 70%)";

const INTRO_LOGO_FILTER =
  "drop-shadow(0 0 46px rgba(159,79,143,0.48)) drop-shadow(0 0 96px rgba(47,111,143,0.34)) brightness(1.06)";

const INTRO_PROGRESS_GRADIENT =
  `linear-gradient(to right, ${INTRO_SHADER_COLORS.primary}, ${INTRO_SHADER_COLORS.accent}, ${INTRO_SHADER_COLORS.secondary})`;


// ─── Smooth scroll ────────────────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

// ─── Global Shader Background ─────────────────────────────────────────────────
// Renders once, fixed behind all sections. z-index -1 so it sits behind content.
function GlobalShaderBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <ShaderGradientCanvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          animate="on"
          brightness={1.6}
          cAzimuthAngle={180}
          cDistance={3.43}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#ff0090"
          color2="#2332db"
          color3="#ac58e1"
          envPreset="city"
          grain="on"
          lightType="env"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.3}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0.8}
          uDensity={1.3}
          uFrequency={4.5}
          uSpeed={0.2}
          uStrength={3.5}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}

// ─── Cinematic Shader Intro ───────────────────────────────────────────────────
function ShaderIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const shaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      },
    });

    tl.set(shaderRef.current, { opacity: 0 })
      .set(logoRef.current, { opacity: 0, scale: 0.8, y: 16 })
      .set(glowRef.current, { opacity: 0, scale: 0.6 })
      .set(taglineRef.current, { opacity: 0, y: 8 });

    // Phase 1: Shader fades in
    tl.to(shaderRef.current, { opacity: 1, duration: 1.8, ease: "power2.inOut" }, 0);

    // Phase 2: Logo + glow materialise
    tl.to(glowRef.current, { opacity: 1, scale: 1.3, duration: 1.4, ease: "power3.out" }, 1.4)
      .to(logoRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 1.5);

    // Phase 3: Tagline fades in
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 3.0);

    // Glow breathe
    gsap.to(glowRef.current, {
      scale: 1.7, opacity: 0.5, duration: 1.8,
      repeat: 3, yoyo: true, ease: "sine.inOut", delay: 1.4,
    });

    // Phase 4: Logo blasts forward, everything fades to black
    tl.to(logoRef.current, { scale: 7, opacity: 0, duration: 0.85, ease: "power3.in" }, 4.8)
      .to(taglineRef.current, { opacity: 0, duration: 0.35 }, 4.8)
      .to(glowRef.current, { opacity: 0, duration: 0.35 }, 4.8)
      .to(shaderRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 5.1)
      .to(containerRef.current, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, 5.4);

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
      {/* Intro uses its own shader instance (more vivid/fast for impact) */}
      <div ref={shaderRef} className="absolute inset-0" style={{ opacity: 0 }}>
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1.5}
          fov={40}
        >
          <ShaderGradient
            animate="on"
            brightness={1.05}
            cAzimuthAngle={180}
            cDistance={4.79}
            cPolarAngle={115}
            cameraZoom={1}
            color1={INTRO_SHADER_COLORS.primary}
            color2={INTRO_SHADER_COLORS.secondary}
            color3={INTRO_SHADER_COLORS.accent}
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={-0.5}
            positionY={0.1}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.22}
            rotationX={0}
            rotationY={0}
            rotationZ={235}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.5}
            uFrequency={5.5}
            uSpeed={0.18}
            uStrength={3.2}
            uTime={0.2}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* Glow halo */}
      <div
        ref={glowRef}
        className="absolute z-10 rounded-full pointer-events-none"
        style={{
          width: 360, height: 360,
          background: INTRO_GLOW_STYLE,
          filter: "blur(48px)",
          opacity: 0,
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative z-20 flex flex-col items-center" style={{ opacity: 0 }}>
        <img
          src="/nish-logo.png"
          alt="DJ Nish"
          className="w-60 md:w-80"
          style={{
            filter: INTRO_LOGO_FILTER,
          }}
        />
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="absolute z-20 bottom-20 text-[11px] tracking-[0.45em] uppercase font-light"
        style={{ color: "rgba(255,255,255,0.6)", opacity: 0, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        DJ · Producer · Chicago
      </p>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          background: INTRO_PROGRESS_GRADIENT,
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 5.85, ease: "linear" }}
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
      {/* ── Global shader: fixed behind every section ── */}
      <GlobalShaderBackground />

      <AnimatePresence>
        {isLoading && (
          <ShaderIntro key="intro" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          pointerEvents: isLoading ? "none" : "auto",
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        <Navbar />
        <main>
          <ShaderHeroPage />
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
