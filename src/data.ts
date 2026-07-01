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
    title: "Alive 10-Year Gala",
    subtitle: "Headline anniversary set under the disco balls",
    event: "Chicago Marriott · Naperville, IL",
    date: "May 2025",
    type: "image",
    image: "/gallery/IMG_0890.jpg",
  },
  {
    id: 2,
    title: "Halloween Party",
    subtitle: "Open-format set at a private Hallowen party",
    event: "VFW · Naperville, IL",
    date: "Oct 2025",
    type: "image",
    image: "/gallery/IMG_1915.jpg",
  },
  {
    id: 3,
    title: "Pool Party Mix",
    subtitle: "Upbeat and friendly mix for a neighborhood pool party",
    event: "Hobson West Club · Naperville, IL",
    date: "Aug 2025",
    type: "image",
    image: "/gallery/IMG_3765.jpg",
  },
  {
    id: 4,
    title: "Ignite Asha Junior Board",
    subtitle: "Community event supporting women in South Asia",
    event: "Ignite Asha · Hinsdale, IL",
    date: "Sep 2025",
    type: "image",
    image: "/gallery/IMG_3967.jpg",
  },
  {
    id: 5,
    title: "Elementary School Clap-Out",
    subtitle: "Kid-friendly set for a elementary school clap-out",
    event: "Steck Elementary School · Aurora, IL",
    date: "May 2026",
    type: "image",
    image: "/gallery/IMG_1167.jpg",
  },
  {
    id: 6,
    title: "Alive Gala Mix",
    subtitle: "A short video clip from a live set at Alive 10-Year",
    event: "Naperville, IL · Chicago Marriott",
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
