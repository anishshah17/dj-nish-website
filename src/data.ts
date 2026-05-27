export const mixes = [
  {
    id: 1,
    title: "Sunset Sessions Vol. 4",
    date: "2025-12-15",
    duration: 7200,
    genre: "Deep House",
  },
  {
    id: 2,
    title: "Neon Dreams EP Mix",
    date: "2025-11-02",
    duration: 5400,
    genre: "Melodic Techno",
  },
  {
    id: 3,
    title: "Warehouse Nights Vol. 12",
    date: "2025-09-20",
    duration: 9000,
    genre: "Techno",
  },
  {
    id: 4,
    title: "Garden Party Live Set",
    date: "2025-08-10",
    duration: 6000,
    genre: "Deep House",
  },
];

export const events = [
  {
    id: 1,
    date: "2026-06-15",
    venue: "The Underground",
    location: "Brooklyn, NY",
    status: "sold-out",
  },
  {
    id: 2,
    date: "2026-07-04",
    venue: "Rooftop Sessions",
    location: "Manhattan, NY",
    status: "tickets",
  },
  {
    id: 3,
    date: "2026-08-22",
    venue: "Beachside Festival",
    location: "Hamptons, NY",
    status: "tickets",
  },
  {
    id: 4,
    date: "2026-09-10",
    venue: "Warehouse District",
    location: "Jersey City, NJ",
    status: "coming-soon",
  },
];

export const records = [
  {
    id: 1,
    title: "Midnight Frequency",
    artist: "DJ Nish",
    year: "2025",
    genre: "Deep House",
    cover: "cover-1",
  },
  {
    id: 2,
    title: "Analog Dreams",
    artist: "DJ Nish",
    year: "2024",
    genre: "Melodic Techno",
    cover: "cover-2",
  },
  {
    id: 3,
    title: "Neon Pulse EP",
    artist: "DJ Nish",
    year: "2024",
    genre: "Techno",
    cover: "cover-3",
  },
  {
    id: 4,
    title: "Warehouse Tapes Vol. 1",
    artist: "DJ Nish",
    year: "2023",
    genre: "Techno",
    cover: "cover-4",
  },
];

const statusLabels: Record<string, string> = {
  "sold-out": "Sold Out",
  tickets: "Buy Tickets",
  "coming-soon": "Coming Soon",
};

const genreColors: Record<string, string> = {
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
