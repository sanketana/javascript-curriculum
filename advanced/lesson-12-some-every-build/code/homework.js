// Session 12 Homework — some, every (and combining Arc C methods)
// Open homework.html with Live Server, then open the console (F12) to check your work.

const tracks = [
  { title: "Sunrise", artist: "Lumen",   seconds: 210, plays: 1200000 },
  { title: "Drift",   artist: "Halcyon", seconds: 185, plays: 430000  },
  { title: "Neon",    artist: "Lumen",   seconds: 240, plays: 2600000 },
  { title: "Echoes",  artist: "Vesper",  seconds: 200, plays: 980000  },
  { title: "Pulse",   artist: "Halcyon", seconds: 175, plays: 1500000 },
];

// --- Task 1: some ---
// Use some to check whether ANY track is by "Vesper". Log the true/false result.
// Expected: true
// const hasVesper = ...
// console.log(hasVesper);


// --- Task 2: every ---
// Use every to check whether ALL tracks are longer than 2 minutes (120 seconds).
// Log the true/false result.
// Expected: true
// const allOverTwoMin = ...
// console.log(allOverTwoMin);


// --- Task 3: combine Arc C ---
// In one expression, compute the TOTAL plays of only the "Lumen" tracks.
// Hint: filter to Lumen, then reduce the plays. Expected: 3800000
// const lumenPlays = ...
// console.log(lumenPlays);


// --- Task 4: Bug hunt ---
// hasLongTrack is meant to be true only if some track is over 4 minutes (240s),
// but it's ALWAYS true. The predicate returns a number (which is truthy), not a
// comparison. Fix it so it returns a true/false test.
const hasLongTrack = tracks.some((t) => t.seconds);
console.log(hasLongTrack);   // always true — should be false (none exceed 240s)
