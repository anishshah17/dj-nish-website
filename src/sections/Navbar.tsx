import { useState, useEffect } from "react";
import { navItems, Logo } from "../data";

interface NavbarProps {
  onNavigate: (id: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setScrolled(window.scrollY > 20);
    }, 100);
    return () => clearInterval(iv);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-stroke/50 bg-dark/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-bold text-text-primary">DJ NISH</span>
        </button>

        {/* Nav items */}
        <div className="hidden items-center gap-8 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm transition-colors ${
                activeSection === item.id
                  ? "text-pink"
                  : "text-muted hover:text-text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("booking")}
            className="accent-gradient rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_0_15px_rgba(243,6,130,0.4)] active:scale-95"
          >
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-text-primary"
          aria-label="Menu"
          onClick={() => onNavigate("menu")}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
