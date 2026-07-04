// Leaderboard — Session 10: filter and find
// In the Session 4 build day you wrote a search BY HAND: an empty array, a
// for-loop, an if, a push (remember filterByText?). Today one method is the
// whole thing — and find/findIndex handle "get me one" lookups.

const players = [
  { name: "Aria",  score: 2400, wins: 12, team: "Red"  },
  { name: "Kento", score: 3100, wins: 18, team: "Blue" },
  { name: "Diego", score: 1800, wins: 7,  team: "Red"  },
  { name: "Mina",  score: 2750, wins: 15, team: "Blue" },
  { name: "Ravi",  score: 2200, wins: 10, team: "Red"  },
];

// filter: keep every item that passes the test → a NEW, smaller array.
const strong = players.filter((p) => p.score >= 2500);
console.log(strong.map((p) => p.name));   // ["Kento", "Mina"]

// find: the FIRST item that passes → the item itself, or undefined if none.
const aria = players.find((p) => p.name === "Aria");
console.log(aria);                         // { name: "Aria", ... }
const nobody = players.find((p) => p.score > 9999);
console.log(nobody);                       // undefined — no one matched

// findIndex: the POSITION of the first match → a number, or -1 if none.
console.log(players.findIndex((p) => p.name === "Mina"));   // 3
console.log(players.findIndex((p) => p.name === "Zoe"));    // -1 (not found)

// Build: a live search box. filter replaces the entire hand-written loop.
const board = document.querySelector("#board");
const search = document.querySelector("#search");
const count = document.querySelector("#count");

const playerRow = (p) => `
  <div class="row">
    <span class="name">${p.name}</span>
    <span class="team">${p.team}</span>
    <span class="score">${p.score}</span>
  </div>
`;

const render = (list) => {
  if (list.length === 0) {
    board.innerHTML = `<p class="empty">No players match.</p>`;
  } else {
    board.innerHTML = list.map(playerRow).join("");
  }
  count.textContent = `${list.length} of ${players.length} players`;
};

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  // One line does what filterByText did in a whole loop back in Session 4:
  const matches = players.filter((p) => p.name.toLowerCase().includes(query));
  render(matches);
});

render(players);
