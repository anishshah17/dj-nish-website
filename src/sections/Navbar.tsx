import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...navItems.map((l) => l.id), "booking"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMenu = () => setOpen(false);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-off-black/85 backdrop-blur-md border-b border-soft-gray/10" : ""
        }`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Brand logo only (no background) */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 focus:outline-none group">
            <img src="/nish-logo.png" alt="DJ Nish" className="h-24 w-24 transition-transform group-hover:scale-105" />
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                type="button"
                className={`relative px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                  active === item.id ? "text-neon-pink" : "text-soft-gray hover:text-white"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-surface"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <a
              href="https://square.link/u/f4MeDGUi"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-soft-gray transition-colors duration-200 hover:text-white"
            >
              Pay
            </a>
            <button
              onClick={() => scrollTo("booking")}
              type="button"
              className="ml-4 px-6 py-2 text-xs font-semibold uppercase tracking-[0.12em] rounded-full transition-all duration-300 text-white active:scale-95"
              style={{
                background: "#FF008C",
                border: "1px solid #FF008C",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Book
            </button>
          </nav>

          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span className="block h-0.5 w-6 origin-center bg-white" animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
            <motion.span className="block h-0.5 w-6 bg-white" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-0.5 w-6 origin-center bg-white" animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-off-black/96 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  type="button"
                  className="text-xl font-semibold text-white transition-colors hover:text-neon-pink uppercase tracking-[0.08em]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                href="https://square.link/u/f4MeDGUi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-xl font-semibold text-white transition-colors hover:text-neon-pink uppercase tracking-[0.08em]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
              >
                Pay
              </motion.a>
              <motion.button
                onClick={() => scrollTo("booking")}
                type="button"
                className="mt-4 px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] rounded-full text-white"
                style={{
                  background: "#FF008C",
                  border: "1px solid #FF008C",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.06 }}
              >
                Book Me
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
