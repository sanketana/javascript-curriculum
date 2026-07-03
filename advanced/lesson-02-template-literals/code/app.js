// Character Card Explorer — Session 2: template literals
// Last session we built cards by gluing strings with +. It worked, but it was
// painful to read. Today we replace all of that with template literals.

const player = "Goku";
const level = 42;

// The old way: quotes, plus signs, and easy-to-lose spaces.
console.log("Player " + player + " is on level " + level + ".");

// The new way: backticks (`) with ${ } holes you drop values into.
console.log(`Player ${player} is on level ${level}.`);

// Anything that produces a value can go inside ${ } — not just variable names.
console.log(`${player.toUpperCase()} has ${level * 100} XP.`);

// Backtick strings can also span multiple lines, exactly as you type them.
console.log(`Line one
Line two`);

const characters = [
  { name: "Goku",    anime: "Dragon Ball Z",   power: 9001, role: "Fighter" },
  { name: "Mikasa",  anime: "Attack on Titan", power: 8700, role: "Soldier" },
  { name: "Levi",    anime: "Attack on Titan", power: 9500, role: "Captain" },
  { name: "Nezuko",  anime: "Demon Slayer",    power: 7200, role: "Demon"   },
  { name: "Tanjiro", anime: "Demon Slayer",    power: 6800, role: "Slayer"  },
];

// One card = one function that RETURNS the HTML for a single character.
// Read it top to bottom: it looks almost exactly like the HTML it produces.
function cardHTML(c) {
  const initial = c.name[0];
  const barWidth = Math.min(100, c.power / 100);
  return `
    <div class="card">
      <div class="avatar">${initial}</div>
      <h2>${c.name}</h2>
      <p class="anime">${c.anime}</p>
      <div class="bar"><span style="width: ${barWidth}%"></span></div>
      <p class="power">Power: ${c.power}</p>
      <p class="role">${c.role}</p>
    </div>
  `;
}

const board = document.querySelector("#board");

function render(list) {
  let html = "";
  for (const c of list) {
    html += cardHTML(c);   // ask the helper for each card, stack them up
  }
  board.innerHTML = html;
}

render(characters);

const summary = document.querySelector("#summary");
summary.textContent = `Showing ${characters.length} characters`;
