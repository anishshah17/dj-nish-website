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

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-stroke/60" : ""
        }`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 focus:outline-none">
            <img src="/nish-logo.png" alt="DJ Nish" className="h-9 w-auto rounded-md bg-white p-1" />
            <span className="font-display text-lg font-bold gradient-text hidden sm:block">DJ Nish</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
                  active === item.id ? "text-text-primary" : "text-muted hover:text-text-primary"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="ml-4 accent-gradient rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_24px_rgba(243,6,130,0.45)] hover:brightness-110 active:scale-95"
            >
              Book Me
            </button>
          </nav>

          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span className="block h-0.5 w-6 bg-text-primary origin-center" animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
            <motion.span className="block h-0.5 w-6 bg-text-primary" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="block h-0.5 w-6 bg-text-primary origin-center" animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
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
                  className="text-2xl font-display font-bold text-text-primary hover:gradient-text transition-colors"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("booking")}
                className="accent-gradient mt-4 rounded-full px-10 py-3 text-lg font-semibold text-white"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
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
