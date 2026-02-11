const root = document.documentElement;
const body = document.body;
const introScene = document.getElementById("intro-scene");
const siteHeader = document.getElementById("site-header");
const yearEl = document.getElementById("year");

const instagramForm = document.getElementById("instagram-form");
const instagramGrid = document.getElementById("instagram-grid");
const instagramUrl = document.getElementById("instagram-url");

const featurePanels = Array.from(document.querySelectorAll("[data-feature-panel]"));

const instagramKey = "nish.instagram";
const starterInstagram = [
  "https://www.instagram.com/p/C8N1f-Mv9rF/"
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getSavedItems(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function normalizeInstagramLink(url) {
  try {
    const parsed = new URL(url.trim());
    if (!parsed.hostname.includes("instagram.com")) {
      return null;
    }
    return parsed.href.endsWith("/") ? parsed.href : `${parsed.href}/`;
  } catch {
    return null;
  }
}

function renderInstagram(items) {
  if (!instagramGrid) return;

  instagramGrid.innerHTML = "";

  items.forEach((link, index) => {
    const safeLink = normalizeInstagramLink(link);
    if (!safeLink) return;

    const card = document.createElement("article");
    card.className = "instagram-card";
    card.innerHTML = `
      <button class="remove-btn" type="button" data-remove-instagram="${index}">Remove</button>
      <blockquote class="instagram-media" data-instgrm-permalink="${safeLink}" data-instgrm-version="14"></blockquote>
    `;

    instagramGrid.appendChild(card);
  });

  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }

  if (!instagramGrid.children.length) {
    instagramGrid.innerHTML = '<p class="card">No Instagram posts yet. Add a post URL above.</p>';
  }
}

function prepareRevealItems() {
  featurePanels.forEach((panel) => {
    const revealItems = panel.querySelectorAll("[data-reveal-item]");
    revealItems.forEach((item, index) => {
      item.style.setProperty("--delay-index", index.toString());
    });
  });
}

function initPanelReveals() {
  if (!featurePanels.length) return;

  body.classList.add("motion-enabled");
  prepareRevealItems();

  const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = (panel) => panel.classList.add("is-visible");

  if (shouldReduceMotion || !("IntersectionObserver" in window)) {
    featurePanels.forEach(reveal);
    return;
  }

  const panelObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  featurePanels.forEach((panel) => panelObserver.observe(panel));
}

function setIntroProgress() {
  if (!introScene) return;

  const maxTravel = introScene.offsetHeight - window.innerHeight;
  if (maxTravel <= 0) {
    root.style.setProperty("--scene-progress", "0");
    siteHeader?.classList.remove("is-visible");
    return;
  }

  const { top } = introScene.getBoundingClientRect();
  const traveled = clamp(-top, 0, maxTravel);
  const progress = traveled / maxTravel;

  root.style.setProperty("--scene-progress", progress.toFixed(4));

  if (siteHeader) {
    siteHeader.classList.toggle("is-visible", progress > 0.44);
  }
}

let ticking = false;

function onScroll() {
  if (ticking) return;

  ticking = true;
  requestAnimationFrame(() => {
    setIntroProgress();
    ticking = false;
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

let instagramLinks = getSavedItems(instagramKey, starterInstagram);
renderInstagram(instagramLinks);

instagramForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!instagramUrl) return;

  const normalized = normalizeInstagramLink(instagramUrl.value);
  if (!normalized) {
    alert("Please enter a valid Instagram post link.");
    return;
  }

  instagramLinks = [normalized, ...instagramLinks];
  saveItems(instagramKey, instagramLinks);
  renderInstagram(instagramLinks);
  instagramForm.reset();
});

instagramGrid?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const rawIndex = target.dataset.removeInstagram;
  if (rawIndex === undefined) return;

  const index = Number(rawIndex);
  if (Number.isNaN(index)) return;

  instagramLinks = instagramLinks.filter((_, itemIndex) => itemIndex !== index);
  saveItems(instagramKey, instagramLinks);
  renderInstagram(instagramLinks);
});

initPanelReveals();
setIntroProgress();

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
