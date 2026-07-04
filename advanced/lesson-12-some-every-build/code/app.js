// Playlist Analyzer — Session 12: some, every + Arc C BUILD DAY
// Two last array methods, then we wire EVERYTHING from Arc C into one live
// dashboard: map to render, filter to search, reduce for stats, some/every for
// yes/no checks.

const tracks = [
  { title: "Sunrise", artist: "Lumen",   seconds: 210, plays: 1200000 },
  { title: "Drift",   artist: "Halcyon", seconds: 185, plays: 430000  },
  { title: "Neon",    artist: "Lumen",   seconds: 240, plays: 2600000 },
  { title: "Echoes",  artist: "Vesper",  seconds: 200, plays: 980000  },
  { title: "Pulse",   artist: "Halcyon", seconds: 175, plays: 1500000 },
  { title: "Aurora",  artist: "Lumen",   seconds: 312, plays: 640000  },
  { title: "Tides",   artist: "Vesper",  seconds: 195, plays: 320000  },
  { title: "Ember",   artist: "Halcyon", seconds: 220, plays: 1100000 },
];

// some: does AT LEAST ONE item pass the test? → true / false
console.log(tracks.some((t) => t.plays >= 1000000));   // true — several are over a million
// every: do ALL items pass the test? → true / false
console.log(tracks.every((t) => t.seconds < 300));     // false — "Aurora" is 312s

// --- helpers ---
const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const formatPlays = (n) => `${(n / 1000000).toFixed(1)}M`;

const trackRow = (t) => `
  <div class="row">
    <span class="title">${t.title}</span>
    <span class="artist">${t.artist}</span>
    <span class="dur">${formatDuration(t.seconds)}</span>
    <span class="plays">${formatPlays(t.plays)}</span>
  </div>
`;

const board = document.querySelector("#board");
const statsEl = document.querySelector("#stats");
const badgesEl = document.querySelector("#badges");
const search = document.querySelector("#search");

// One render function that recomputes the WHOLE dashboard from a list.
const render = (list) => {
  // map → rows (Session 9)
  board.innerHTML = list.length
    ? list.map(trackRow).join("")
    : `<p class="empty">No tracks match.</p>`;

  // reduce → stats (Session 11)
  const totalSeconds = list.reduce((sum, t) => sum + t.seconds, 0);
  const totalPlays = list.reduce((sum, t) => sum + t.plays, 0);
  const avgPlays = list.length ? totalPlays / list.length : 0;
  statsEl.innerHTML = `
    <div class="stat"><span>${list.length}</span>tracks</div>
    <div class="stat"><span>${formatDuration(totalSeconds)}</span>total time</div>
    <div class="stat"><span>${formatPlays(totalPlays)}</span>total plays</div>
    <div class="stat"><span>${(avgPlays / 1000000).toFixed(2)}M</span>avg plays</div>
  `;

  // some / every → yes/no badges (Session 12)
  const hasViral = list.some((t) => t.plays >= 1000000);
  const allShort = list.every((t) => t.seconds < 300);
  badgesEl.innerHTML = `
    <span class="badge ${hasViral ? "yes" : "no"}">${hasViral ? "Has a viral hit" : "No viral hits"}</span>
    <span class="badge ${allShort ? "yes" : "no"}">${allShort ? "All under 5 min" : "Has a long track"}</span>
  `;
};

// filter → live search (Session 10)
search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const matches = tracks.filter(
    (t) => t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query)
  );
  render(matches);
});

render(tracks);
