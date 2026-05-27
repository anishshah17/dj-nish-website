import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { socials } from "../data";

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent" />

      {/* Marquee */}
      <div className="relative z-10 mb-14 w-[200%] overflow-hidden whitespace-nowrap">
        <div ref={marqueeRef} className="flex w-max gap-8 font-display text-7xl italic text-white/8 md:text-9xl">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>MAKE IT ELECTRIC &bull;</span>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={`c-${i}`}>MAKE IT ELECTRIC &bull;</span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10 lg:px-16">
        <img src="/nish-logo.png" alt="DJ Nish logo" className="mb-8 w-44 rounded-[8px] bg-white p-2" />
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Now booking</p>
        <h2 className="mb-8 max-w-3xl text-5xl leading-none text-text-primary md:text-7xl">
          Make the next room feel <span className="font-display italic gradient-text">electric</span>.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:booking@djnish.com"
            className="gradient-ring relative rounded-full text-sm text-text-primary"
          >
            <span className="relative block rounded-full bg-bg px-7 py-3.5">booking@djnish.com</span>
          </a>
          <button
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            className="accent-gradient rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.4)] hover:brightness-110"
          >
            Book a Set
          </button>
        </div>

        <div className="mt-16 flex w-full flex-col items-center justify-between gap-6 border-t border-stroke pt-8 text-xs uppercase tracking-[0.2em] text-muted md:flex-row">
          <div className="flex flex-wrap justify-center gap-5">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-text-primary"
              >
                {social.platform}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for bookings
          </div>
          <p>&copy; {new Date().getFullYear()} DJ Nish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
