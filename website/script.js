const referenceForm = document.getElementById("reference-form");
const referencesGrid = document.getElementById("references-grid");
const yearEl = document.getElementById("year");
const instagramForm = document.getElementById("instagram-form");
const instagramGrid = document.getElementById("instagram-grid");

const referenceName = document.getElementById("ref-name");
const referenceEvent = document.getElementById("ref-event");
const referenceQuote = document.getElementById("ref-quote");
const instagramUrl = document.getElementById("instagram-url");

const referencesKey = "nish.references";
const instagramKey = "nish.instagram";

const starterReferences = [
  {
    id: crypto.randomUUID(),
    name: "The Midtown Lounge",
    event: "Friday Night Residency",
    quote: "NISH reads the room perfectly and keeps the crowd engaged all night."
  },
  {
    id: crypto.randomUUID(),
    name: "Aria + Daniel",
    event: "Wedding Reception",
    quote: "Professional, smooth, and energetic from first dance to last song."
  }
];

const starterInstagram = ["https://www.instagram.com/p/C8N1f-Mv9rF/"];

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
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

function renderReferences(items) {
  referencesGrid.innerHTML = "";

  if (!items.length) {
    referencesGrid.innerHTML = '<p class="card">No references yet. Add your first testimonial above.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card reference-card";
    card.innerHTML = `
      <button class="remove-btn" type="button" data-remove-reference="${item.id}">Remove</button>
      <div class="reference-meta"><strong>${escapeHtml(item.name)}</strong> · ${escapeHtml(item.event)}</div>
      <p>"${escapeHtml(item.quote)}"</p>
    `;
    referencesGrid.appendChild(card);
  });
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

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

let references = getSavedItems(referencesKey, starterReferences);
let instagramLinks = getSavedItems(instagramKey, starterInstagram);

renderReferences(references);
renderInstagram(instagramLinks);

referenceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = referenceName.value.trim();
  const eventType = referenceEvent.value.trim();
  const quote = referenceQuote.value.trim();

  if (!name || !eventType || !quote) return;

  references = [{ id: crypto.randomUUID(), name, event: eventType, quote }, ...references];
  saveItems(referencesKey, references);
  renderReferences(references);
  referenceForm.reset();
});

referencesGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const id = target.dataset.removeReference;
  if (!id) return;

  references = references.filter((item) => item.id !== id);
  saveItems(referencesKey, references);
  renderReferences(references);
});

instagramForm.addEventListener("submit", (event) => {
  event.preventDefault();

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

instagramGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const rawIndex = target.dataset.removeInstagram;
  if (rawIndex === undefined) return;
  const index = Number(rawIndex);
  if (Number.isNaN(index)) return;

  instagramLinks = instagramLinks.filter((_, i) => i !== index);
  saveItems(instagramKey, instagramLinks);
  renderInstagram(instagramLinks);
});
