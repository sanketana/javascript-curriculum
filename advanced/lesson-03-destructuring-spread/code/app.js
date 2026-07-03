// Character Card Explorer — Session 3: destructuring, spread/rest, defaults
// No new look today. We clean up how we PULL data out of objects and how we
// COMBINE data — the modern-JS habits every framework assumes you have.

const heroes = [
  { name: "Goku",    anime: "Dragon Ball Z",   power: 9001, role: "Fighter" },
  { name: "Mikasa",  anime: "Attack on Titan", power: 8700, role: "Soldier" },
  { name: "Tanjiro", anime: "Demon Slayer",    power: 6800, role: "Slayer"  },
];

const villains = [
  { name: "Frieza", anime: "Dragon Ball Z", power: 12000, role: "Emperor"    },
  { name: "Muzan",  anime: "Demon Slayer",  power: 15000, role: "Demon King" },
];

// SPREAD (...) copies the items of an array into a new array.
// Here it merges two lists into one, without touching either original.
const characters = [...heroes, ...villains];

// ARRAY DESTRUCTURING pulls items out by position, in one line.
const [champion, runnerUp] = characters;
console.log(`Champion: ${champion.name}, Runner-up: ${runnerUp.name}`);

// DEFAULT PARAMETERS: if an argument is missing, the default fills in.
function makeCharacter(name, anime, power = 5000, role = "Rookie") {
  return { name, anime, power, role };
}

// Only two arguments given — power and role fall back to their defaults.
characters.push(makeCharacter("Yuki", "Original"));

// OBJECT SPREAD copies an object and lets you override some keys.
// This returns a NEW, stronger character and leaves the original untouched.
function ascend(c) {
  return { ...c, power: c.power + 3000, role: "Ascended " + c.role };
}
characters[0] = ascend(characters[0]);

function cardHTML(c) {
  // OBJECT DESTRUCTURING: pull the four fields into their own variables at once.
  // A missing role falls back to "Unknown".
  const { name, anime, power, role = "Unknown" } = c;

  const initial = name[0];
  const barWidth = Math.min(100, power / 100);
  return `
    <div class="card">
      <div class="avatar">${initial}</div>
      <h2>${name}</h2>
      <p class="anime">${anime}</p>
      <div class="bar"><span style="width: ${barWidth}%"></span></div>
      <p class="power">Power: ${power}</p>
      <p class="role">${role}</p>
    </div>
  `;
}

const board = document.querySelector("#board");

function render(list) {
  let html = "";
  for (const c of list) {
    html += cardHTML(c);
  }
  board.innerHTML = html;
}

render(characters);

const summary = document.querySelector("#summary");
summary.textContent = `Showing ${characters.length} characters`;

// REST PARAMETERS: collect any number of arguments into a real array.
// Useful when you don't know up front how many things will be passed.
function announce(title, ...names) {
  console.log(`${title}: ${names.length} fighters`);
  for (const n of names) {
    console.log(`- ${n}`);
  }
}
announce("Tournament", "Goku", "Mikasa", "Frieza", "Muzan");
