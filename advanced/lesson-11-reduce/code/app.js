// Leaderboard — Session 11: reduce
// map makes a new list. filter makes a smaller list. reduce is different:
// it boils a whole list down to ONE value — a total, an average, a winner.

const players = [
  { name: "Aria",  score: 2400, wins: 12, team: "Red"  },
  { name: "Kento", score: 3100, wins: 18, team: "Blue" },
  { name: "Diego", score: 1800, wins: 7,  team: "Red"  },
  { name: "Mina",  score: 2750, wins: 15, team: "Blue" },
  { name: "Ravi",  score: 2200, wins: 10, team: "Red"  },
];

// The long way you already know — a running total in an outside variable:
let totalTheHardWay = 0;
players.forEach((p) => { totalTheHardWay = totalTheHardWay + p.score; });

// reduce packages exactly that. The running total (the "accumulator") lives
// INSIDE the call. The 0 at the end is where it starts.
const totalScore = players.reduce((sum, p) => sum + p.score, 0);
console.log(totalScore);   // 12250 — same answer, one line

// Once you have a total, an average is easy.
const average = Math.round(totalScore / players.length);
console.log(average);      // 2450

// reduce can keep a WINNER, not just a number: carry "the best so far".
const topPlayer = players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
console.log(topPlayer.name);   // "Kento"

// The accumulator can be an OBJECT — here, a count of players per team.
const byTeam = players.reduce((counts, p) => {
  counts[p.team] = (counts[p.team] || 0) + 1;
  return counts;                 // ALWAYS return the accumulator for the next step
}, {});
console.log(byTeam);   // { Red: 3, Blue: 2 }

// Render: a stats bar from reduce, and the board from map (Session 9).
const stats = document.querySelector("#stats");
stats.innerHTML = `
  <div class="stat"><span>${totalScore}</span>Total points</div>
  <div class="stat"><span>${average}</span>Average</div>
  <div class="stat"><span>${topPlayer.name}</span>Top scorer</div>
`;

const board = document.querySelector("#board");
const playerRow = (p) => `
  <div class="row">
    <span class="name">${p.name}</span>
    <span class="team">${p.team}</span>
    <span class="score">${p.score}</span>
  </div>
`;
board.innerHTML = players.map(playerRow).join("");
