import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * ShaderHeroPage
 * Full-screen minimal landing page with a calmed ShaderGradientPage gradient.
 * Gradient: waterPlane · hot pink / deep blue / purple — slowed down, softened.
 */
export default function ShaderHeroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Subtle mouse parallax on logo
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 30, damping: 18 });
  const y = useSpring(rawY, { stiffness: 30, damping: 18 });
  const logoX = useTransform(x, [-1, 1], [-10, 10]);
  const logoY = useTransform(y, [-1, 1], [-5, 5]);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Full-screen shader gradient — calmed down ── */}
      <div className="absolute inset-0">
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            brightness={1.6}          // brighter landing page
            cAzimuthAngle={180}
            cDistance={3.43}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff0090"          // vivid pink
            color2="#2332db"          // vivid blue
            color3="#ac58e1"          // vivid purple
            envPreset="city"
            grain="on"               // grain on for texture/calm
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

      {/* ── Dark overlay — heavier to keep it moody and legible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Noise texture for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8 w-full max-w-4xl mx-auto">

        {/* Logo — centrepiece with mouse parallax */}
        {mounted && (
          <motion.div
            style={{ x: logoX, y: logoY }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <motion.img
              src="/nish-logo.png"
              alt="DJ Nish"
              className="w-64 md:w-80 lg:w-[400px]"
              style={{
                filter:
                  "drop-shadow(0 4px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 80px rgba(196,0,107,0.18))",
              }}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* CTA buttons */}
        {mounted && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            {/* Primary — dark glass */}
            <motion.a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white"
              style={{
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(18px)",
              }}
              whileHover={{
                background: "rgba(0,0,0,0.65)",
                borderColor: "rgba(255,255,255,0.45)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Set
            </motion.a>

            {/* Secondary — white ghost */}
            <motion.a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(18px)",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.16)",
                borderColor: "rgba(255,255,255,0.4)",
                color: "#fff",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Gallery
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      {mounted && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] font-mono text-white/20">
            Scroll
          </span>
          <div
            className="w-[1px] h-10 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="w-full bg-white/60"
              style={{ height: "50%" }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* ── Bottom fade to dark ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(5,5,5,0.95))",
        }}
      />
    </section>
  );
}
