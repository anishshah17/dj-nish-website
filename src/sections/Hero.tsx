import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 18 });
  const y = useSpring(rawY, { stiffness: 40, damping: 18 });
  const logoX = useTransform(x, [-1, 1], [-14, 14]);
  const logoY = useTransform(y, [-1, 1], [-8, 8]);
  const bgX = useTransform(x, [-1, 1], [8, -8]);
  const bgY = useTransform(y, [-1, 1], [4, -4]);

  const [mounted, setMounted] = useState(false);

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
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── ShaderGradient1 as subtle background layer (low opacity) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: bgX, y: bgY, opacity: 0.18 }}
      >
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          pixelDensity={0.8}
          fov={50}
        >
          <ShaderGradient
            animate="on"
            brightness={1}
            cAzimuthAngle={180}
            cDistance={4.51}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#d2691e"
            color2="#cd853f"
            color3="#deb887"
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
      </motion.div>

      {/* ── Vignette overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.85) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8 w-full max-w-5xl mx-auto">

        {/* Availability badge */}
        {mounted && (
          <motion.div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(210,105,30,0.05)",
              border: "1px solid rgba(210,105,30,0.1)",
              backdropFilter: "blur(8px)",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Available for bookings
            </span>
          </motion.div>
        )}

        {/* Logo — hero centrepiece with mouse parallax */}
        {mounted && (
          <motion.div
            className="relative"
            style={{ x: logoX, y: logoY }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rotating conic glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                transform: "scale(1.5)",
                background:
                  "conic-gradient(from 0deg, rgba(210,105,30,0.3), rgba(205,133,63,0.2), rgba(222,184,135,0.3), rgba(210,105,30,0.3))",
                filter: "blur(28px)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            {/* Soft static glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                transform: "scale(1.2)",
                background:
                  "radial-gradient(ellipse at center, rgba(210,105,30,0.25) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <motion.img
              src="/nish-logo.png"
              alt="DJ Nish"
              className="relative z-10 w-72 md:w-96 lg:w-[420px]"
              style={{
                filter:
                  "drop-shadow(0 0 32px rgba(210,105,30,0.45)) drop-shadow(0 0 64px rgba(205,133,63,0.2))",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* Tagline */}
        {mounted && (
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] uppercase font-light"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Weddings · Corporate · Private Events · Clubs
          </motion.p>
        )}

        {/* CTA row */}
        {mounted && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            {/* Primary */}
            <motion.a
              href="#booking"
              className="relative inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #d2691e 0%, #cd853f 50%, #deb887 100%)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "-100% 0",
                }}
                whileHover={{ backgroundPosition: "200% 0" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Book a Set</span>
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                border: "1px solid rgba(210,105,30,0.14)",
                color: "rgba(210,105,30,0.5)",
                background: "rgba(210,105,30,0.03)",
              }}
              whileHover={{
                borderColor: "rgba(210,105,30,0.5)",
                color: "rgba(210,105,30,0.9)",
                background: "rgba(210,105,30,0.06)",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Gallery
            </motion.a>
          </motion.div>
        )}

        {/* Social proof strip */}
        {mounted && (
          <motion.div
            className="flex items-center gap-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { value: "5+", label: "Years" },
              { value: "25+", label: "Events" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-lg font-bold"
                  style={{
                    background: "linear-gradient(135deg, #d2691e, #cd853f, #deb887)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Unbounded', sans-serif",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.25em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
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
          <span
            className="text-[9px] uppercase tracking-[0.35em] font-mono"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Scroll
          </span>
          <div
            className="w-[1px] h-10 overflow-hidden rounded-full"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <motion.div
              className="w-full"
              style={{
                background: "linear-gradient(to bottom, #d2691e, #deb887)",
                height: "50%",
              }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
