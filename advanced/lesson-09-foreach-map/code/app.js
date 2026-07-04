// Leaderboard — Session 9: forEach and map
// Since Arc A you've written the same loop again and again to build HTML:
//   let html = ""; for (const p of list) { html += row(p); }
// Today two array methods retire that pattern for good.

const players = [
  { name: "Aria",  score: 2400, wins: 12 },
  { name: "Kento", score: 3100, wins: 18 },
  { name: "Diego", score: 1800, wins: 7  },
  { name: "Mina",  score: 2750, wins: 15 },
];

// forEach: run a function for EACH item. Perfect for side effects like logging.
// It returns nothing — you use it to DO something, not to build a value.
players.forEach((p) => {
  console.log(`${p.name} has ${p.score} points`);
});

// map: transform each item into a NEW one, handing back a brand-new array.
// The original array is never changed.
const names = players.map((p) => p.name);
console.log(names);   // ["Aria", "Kento", "Diego", "Mina"]

// map can build new objects too — here, each player plus a computed badge.
const withBadges = players.map((p) => {
  return { ...p, badge: p.wins >= 15 ? "star" : "none" };
});
console.log(withBadges);

// The real payoff: rendering. Turn each player into a row, join into one string.
const board = document.querySelector("#board");

const playerRow = (p) => `
  <div class="row">
    <span class="name">${p.name}</span>
    <span class="score">${p.score}</span>
    <span class="wins">${p.wins} wins</span>
  </div>
`;

board.innerHTML = players.map(playerRow).join("");
// Compare with Arc A: no "let html = ''", no for-loop, no "html +=". One line:
// take the array, map each item to a row, join the rows together.
