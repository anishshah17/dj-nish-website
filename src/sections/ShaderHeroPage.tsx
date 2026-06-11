import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * ShaderHeroPage
 * A full-screen minimal landing page using ShaderGradientPage.tsx gradient.
 * Gradient: waterPlane · hot pink #ff0090 · deep blue #2332db · purple #ac58e1
 * Design: dark overlay + clean white type + logo centred
 */
export default function ShaderHeroPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Subtle mouse parallax on logo
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 35, damping: 16 });
  const y = useSpring(rawY, { stiffness: 35, damping: 16 });
  const logoX = useTransform(x, [-1, 1], [-12, 12]);
  const logoY = useTransform(y, [-1, 1], [-6, 6]);

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
      {/* ── Full-screen shader gradient ── */}
      <div className="absolute inset-0">
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.43}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff0090"
            color2="#2332db"
            color3="#ac58e1"
            envPreset="city"
            grain="off"
            lightType="env"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.2}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            type="waterPlane"
            uAmplitude={1}
            uDensity={1.3}
            uFrequency={5.5}
            uSpeed={0.5}
            uStrength={5.3}
            uTime={0}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>

      {/* ── Dark overlay — keeps text legible, preserves gradient colour ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Noise texture overlay for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-7 w-full max-w-4xl mx-auto">

        {/* Availability pill */}
        {mounted && (
          <motion.div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-300" />
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-medium text-white/70"
            >
              Available for bookings
            </span>
          </motion.div>
        )}

        {/* Logo — centrepiece with mouse parallax */}
        {mounted && (
          <motion.div
            style={{ x: logoX, y: logoY }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <motion.img
              src="/nish-logo.png"
              alt="DJ Nish"
              className="w-64 md:w-80 lg:w-96"
              style={{
                filter:
                  "drop-shadow(0 4px 32px rgba(0,0,0,0.6)) drop-shadow(0 0 64px rgba(255,0,144,0.25))",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* Tagline */}
        {mounted && (
          <motion.p
            className="text-xs md:text-sm tracking-[0.35em] uppercase font-light text-white/60"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            Weddings · Corporate · Private Events · Clubs
          </motion.p>
        )}

        {/* CTA buttons */}
        {mounted && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            {/* Primary — solid black/dark glass */}
            <motion.a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(16px)",
              }}
              whileHover={{
                background: "rgba(0,0,0,0.75)",
                borderColor: "rgba(255,255,255,0.5)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Set
            </motion.a>

            {/* Secondary — white ghost */}
            <motion.a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(16px)",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.22)",
                borderColor: "rgba(255,255,255,0.55)",
                color: "#fff",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Gallery
            </motion.a>
          </motion.div>
        )}

        {/* Stat strip */}
        {mounted && (
          <motion.div
            className="flex items-center gap-8 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { value: "5+", label: "Years" },
              { value: "200+", label: "Events" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      {mounted && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] font-mono text-white/25">
            Scroll
          </span>
          <div
            className="w-[1px] h-10 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <motion.div
              className="w-full bg-white"
              style={{ height: "50%" }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* ── Bottom gradient fade to dark ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(5,5,5,0.9))",
        }}
      />
    </section>
  );
}
