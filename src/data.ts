// ─── Mixes ───────────────────────────────────────────────────────────────────
export const mixes = [
  { id: 1, title: "Sunset Sessions Vol. 4", date: "2025-12-15", duration: 7200, genre: "Deep House" },
  { id: 2, title: "Neon Dreams EP Mix", date: "2025-11-02", duration: 5400, genre: "Melodic Techno" },
  { id: 3, title: "Warehouse Nights Vol. 12", date: "2025-09-20", duration: 9000, genre: "Techno" },
  { id: 4, title: "Garden Party Live Set", date: "2025-08-10", duration: 6000, genre: "Deep House" },
];

// ─── Events ──────────────────────────────────────────────────────────────────
export const events = [
  { id: 1, date: "2026-06-15", venue: "The Underground", location: "Brooklyn, NY", status: "sold-out" },
  { id: 2, date: "2026-07-04", venue: "Rooftop Sessions", location: "Manhattan, NY", status: "tickets" },
  { id: 3, date: "2026-08-22", venue: "Beachside Festival", location: "Hamptons, NY", status: "tickets" },
  { id: 4, date: "2026-09-10", venue: "Warehouse District", location: "Jersey City, NJ", status: "coming-soon" },
];

// ─── Records ─────────────────────────────────────────────────────────────────
export const records = [
  { id: 1, title: "Midnight Frequency", artist: "DJ Nish", year: "2025", genre: "Deep House", cover: "cover-1" },
  { id: 2, title: "Analog Dreams", artist: "DJ Nish", year: "2024", genre: "Melodic Techno", cover: "cover-2" },
  { id: 3, title: "Neon Pulse EP", artist: "DJ Nish", year: "2024", genre: "Techno", cover: "cover-3" },
  { id: 4, title: "Warehouse Tapes Vol. 1", artist: "DJ Nish", year: "2023", genre: "Techno", cover: "cover-4" },
];

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
  { id: "music", label: "Music" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
];

// ─── Socials ─────────────────────────────────────────────────────────────────
export const socials = [
  { platform: "Instagram", url: "https://instagram.com" },
  { platform: "SoundCloud", url: "https://soundcloud.com" },
  { platform: "Mixcloud", url: "https://mixcloud.com" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const statusLabels: Record<string, string> = {
  "sold-out": "Sold Out",
  tickets: "Buy Tickets",
  "coming-soon": "Coming Soon",
};

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

export function statusLabel(key: string): string {
  return statusLabels[key] ?? key;
}

export function genreColor(key: string): string {
  return genreColors[key] ?? "var(--text-muted)";
}

export function Logo({ className = "" }: { className?: string }) {
  return null; // replaced by img in Navbar
}
