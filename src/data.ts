// ─── Gallery ─────────────────────────────────────────────────────────────────
// Each item can be type "image" or "video".
// For images: set `image` to a URL or local path (e.g. "/photos/set1.jpg")
// For videos: set `video` to a URL or local path (e.g. "/videos/set1.mp4")
//             and `poster` to a thumbnail image shown before play.
// Optional fields enrich the lightbox caption:
//   - `subtitle`: short tagline shown below the title
//   - `event`:    venue / event type (e.g. "Alive 10-Year · Chicago, IL")
//   - `date`:     human-readable date shown as a small tag
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Alive 10-Year Celebration",
    subtitle: "Headline anniversary set under the disco balls",
    event: "Alive Nightclub · Chicago, IL",
    date: "May 2024",
    type: "image",
    image: "/gallery/IMG_0890.jpg",
  },
  {
    id: 2,
    title: "Purple Lights",
    subtitle: "Open-format set in a violet-hued booth",
    event: "Private Event · Chicago, IL",
    date: "Oct 2025",
    type: "image",
    image: "/gallery/IMG_1915.jpg",
  },
  {
    id: 3,
    title: "Backyard Set",
    subtitle: "House & open-format, sunset to last call",
    event: "Private Residence · Chicago Suburbs",
    date: "Aug 2025",
    type: "image",
    image: "/gallery/IMG_3765.jpg",
  },
  {
    id: 4,
    title: "Ignite Asha Junior Board",
    subtitle: "Community event set with a Bollywood blend",
    event: "Ignite Asha · Chicago, IL",
    date: "Sep 2025",
    type: "image",
    image: "/gallery/IMG_3967.jpg",
  },
  {
    id: 5,
    title: "Grad Party",
    subtitle: "Top-40 + throwbacks for a milestone night",
    event: "Private Grad Party · Chicago, IL",
    date: "Aug 2024",
    type: "image",
    image: "/gallery/My_Grad_Party_by_Portraits_by_CeCee.jpg",
  },
  {
    id: 6,
    title: "Live Set",
    subtitle: "30-minute club mix, melodic house to techno",
    event: "Live Recording · Chicago, IL",
    date: "May 2025",
    type: "video",
    video: "/gallery/IMG_5968.mp4",
    poster: "/gallery/IMG_0890.jpg",
  },
];

export type GalleryItem = {
  id: number;
  title: string;
  subtitle?: string;
  event?: string;
  date?: string;
  type: "image" | "video";
  image?: string;
  video?: string;
  poster?: string;
};

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
