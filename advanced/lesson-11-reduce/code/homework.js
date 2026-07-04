// Session 11 Homework — reduce
// Open homework.html with Live Server, then open the console (F12) to check your work.

const tracks = [
  { title: "Sunrise", artist: "Lumen",   seconds: 210, plays: 1200 },
  { title: "Drift",   artist: "Halcyon", seconds: 185, plays: 430  },
  { title: "Neon",    artist: "Lumen",   seconds: 240, plays: 2600 },
  { title: "Echoes",  artist: "Vesper",  seconds: 200, plays: 980  },
  { title: "Pulse",   artist: "Halcyon", seconds: 175, plays: 1500 },
];

// --- Task 1: reduce to a total ---
// Use reduce to add up every track's "plays" into one number. Start at 0.
// Expected: 6710
// const totalPlays = ...
// console.log(totalPlays);


// --- Task 2: reduce to a winner ---
// Use reduce to find the LONGEST track (most seconds) and log its title.
// Carry "the longest so far" as the accumulator; start it at tracks[0].
// Expected: "Neon"
// const longest = ...
// console.log(longest.title);


// --- Task 3: reduce to an object ---
// Use reduce to count how many tracks each artist has. Start at {}.
// Expected: { Lumen: 2, Halcyon: 2, Vesper: 1 }
// Remember to RETURN the accumulator each step.
// const byArtist = ...
// console.log(byArtist);


// --- Task 4: Bug hunt ---
// This reduce is meant to total the plays but logs undefined. The reducer has a
// { } body and never returns, so the accumulator is never updated — it stays
// undefined the whole way through. Fix it.
const totalPlays = tracks.reduce((sum, t) => {
  sum + t.plays;
}, 0);
console.log(totalPlays);   // undefined — should be 6710
