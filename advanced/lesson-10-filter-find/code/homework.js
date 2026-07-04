// Session 10 Homework — filter, find, findIndex
// Open homework.html with Live Server, then open the console (F12) to check your work.

const tracks = [
  { title: "Sunrise", artist: "Lumen",   seconds: 210, plays: 1200 },
  { title: "Drift",   artist: "Halcyon", seconds: 185, plays: 430  },
  { title: "Neon",    artist: "Lumen",   seconds: 240, plays: 2600 },
  { title: "Echoes",  artist: "Vesper",  seconds: 200, plays: 980  },
  { title: "Pulse",   artist: "Halcyon", seconds: 175, plays: 1500 },
];

// --- Task 1: filter ---
// Build "popular" — every track with 1000 or more plays. Log the titles.
// Expected titles: ["Sunrise", "Neon", "Pulse"]
// const popular = ...
// console.log(popular.map((t) => t.title));


// --- Task 2: find ---
// Find the FIRST track by "Halcyon" and log its title.
// Expected: "Drift"
// const firstHalcyon = ...
// console.log(firstHalcyon.title);


// --- Task 3: findIndex (and the -1 check) ---
// Find the position of the track titled "Echoes" and log it.
// Then look for a track titled "Ghost" (which doesn't exist) and log THAT index
// too — it should be -1. Write an if-statement that logs "not found" when the
// index is -1.
// const echoesIndex = ...
// const ghostIndex = ...


// --- Task 4: Bug hunt ---
// This is meant to get the single track titled "Neon" and log its play count,
// but it crashes / logs the wrong thing. The wrong METHOD was used. Fix it.
const neon = tracks.filter((t) => t.title === "Neon");
console.log(neon.plays);   // undefined — filter gives back an ARRAY, not one track
