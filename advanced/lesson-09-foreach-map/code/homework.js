// Session 9 Homework — forEach and map
// Open homework.html with Live Server, then open the console (F12) to check your work.

const tracks = [
  { title: "Sunrise",  artist: "Lumen",  seconds: 210 },
  { title: "Drift",    artist: "Halcyon", seconds: 185 },
  { title: "Neon",     artist: "Lumen",  seconds: 240 },
  { title: "Echoes",   artist: "Vesper", seconds: 200 },
];

// --- Task 1: forEach for a side effect ---
// Use forEach to log one line per track: "Sunrise by Lumen".
// tracks.forEach(...);


// --- Task 2: map to a new array of values ---
// Use map to build an array of just the titles, then log it.
// Expected: ["Sunrise", "Drift", "Neon", "Echoes"]
// const titles = ...
// console.log(titles);


// --- Task 3: map to new objects ---
// Use map to build a new array where each track also has a "minutes" field,
// rounded to one decimal (seconds / 60). Do NOT change the original tracks.
// Hint: (t.seconds / 60).toFixed(1) gives a string like "3.5".
// const withMinutes = ...
// console.log(withMinutes);
// console.log(tracks[0].minutes);   // should be undefined — original untouched


// --- Task 4: Bug hunt ---
// This map is meant to build an array of "Title — Artist" strings, but it
// produces [undefined, undefined, undefined, undefined]. Find the one problem.
const labels = tracks.map((t) => {
  `${t.title} — ${t.artist}`;
});
console.log(labels);   // currently [undefined, undefined, undefined, undefined]
