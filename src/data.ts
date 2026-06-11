// ─── Gallery (replace images with your own) ──────────────────────────────────
export const galleryItems = [
  { id: 1, title: "Gallery Photo 1", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=85", rotation: "-rotate-3" },
  { id: 2, title: "Gallery Photo 2", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=85", rotation: "rotate-2" },
  { id: 3, title: "Gallery Photo 3", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=85", rotation: "rotate-3" },
  { id: 4, title: "Gallery Photo 4", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85", rotation: "-rotate-2" },
  { id: 5, title: "Gallery Photo 5", image: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=85", rotation: "-rotate-1" },
  { id: 6, title: "Gallery Photo 6", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=85", rotation: "rotate-3" },
];

// ─── Booking packages ────────────────────────────────────────────────────────
export const bookingPackages = [
  {
    id: "essential",
    name: "Essential",
    price: 500,
    deposit: 250,
    hours: 2,
    features: ["2-hour set", "Basic sound system", "DJ equipment provided", "Music consultation call"],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 1200,
    deposit: 600,
    hours: 4,
    features: ["4-hour set", "Premium sound system", "DJ equipment provided", "Pre-event consultation", "Custom playlist curation", "Lighting coordination"],
    popular: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 2500,
    deposit: 1250,
    hours: 8,
    features: ["Full-day / 8-hour set", "Festival-grade sound system", "Full DJ & production rig", "Dedicated event planning", "Custom intro & outro", "Live remixing", "Post-event mix recording"],
    popular: false,
  },
];

// ─── Nav ─────────────────────────────────────────────────────────────────────
export const navItems = [
  { id: "home", label: "Home" },
  { id: "gallery", label: "Gallery" },
  { id: "booking", label: "Booking" },
];

// ─── Socials ─────────────────────────────────────────────────────────────────
export const socials = [
  { platform: "Instagram", url: "https://instagram.com/djnish.chi" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
export const genreColors: Record<string, string> = {
  "Deep House": "var(--brand-pink)",
  Techno: "var(--brand-purple)",
  "Melodic Techno": "var(--brand-blue)",
};

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function genreColor(key: string): string {
  return genreColors[key] ?? "var(--text-muted)";
}

export function Logo({ className = "" }: { className?: string }) {
  return null;
}
