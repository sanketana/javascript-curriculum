// Character Card Explorer — Session 4: BUILD DAY (Arc A capstone)
// No new syntax today. You assemble everything from Sessions 1-3 into a
// finished, interactive app: live search, and a form that adds new characters.

// "let", not "const": we rebuild this list (immutably) whenever a card is added.
let characters = [
  { name: "Goku",    anime: "Dragon Ball Z",   power: 9001, role: "Fighter"    },
  { name: "Mikasa",  anime: "Attack on Titan", power: 8700, role: "Soldier"    },
  { name: "Levi",    anime: "Attack on Titan", power: 9500, role: "Captain"    },
  { name: "Nezuko",  anime: "Demon Slayer",    power: 7200, role: "Demon"      },
  { name: "Tanjiro", anime: "Demon Slayer",    power: 6800, role: "Slayer"     },
  { name: "Frieza",  anime: "Dragon Ball Z",   power: 12000, role: "Emperor"   },
];

// From Session 3: defaults fill in anything the caller leaves out.
function makeCharacter(name, anime, power = 5000, role = "Rookie") {
  return { name, anime, power, role };
}

// From Sessions 2-3: destructure, then build the card with a template literal.
function cardHTML(c) {
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
const summary = document.querySelector("#summary");

function render(list) {
  if (list.length === 0) {
    board.innerHTML = `<p class="empty">No characters match your search.</p>`;
  } else {
    let html = "";
    for (const c of list) {
      html += cardHTML(c);
    }
    board.innerHTML = html;
  }
  summary.textContent = `Showing ${list.length} of ${characters.length} characters`;
}

// SEARCH — filter with a plain loop (the filter() array method comes later).
function filterByText(list, query) {
  const q = query.toLowerCase();
  const result = [];
  for (const c of list) {
    if (c.name.toLowerCase().includes(q) || c.anime.toLowerCase().includes(q)) {
      result.push(c);
    }
  }
  return result;
}

const search = document.querySelector("#search");
search.addEventListener("input", function () {
  render(filterByText(characters, search.value));
});

// ADD — read the form, build a character, add it immutably with array spread.
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const animeInput = document.querySelector("#anime");
const powerInput = document.querySelector("#power");
const roleInput = document.querySelector("#role");

form.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading on submit

  const name = nameInput.value.trim();
  const anime = animeInput.value.trim();
  const powerValue = powerInput.value;   // "" if the user left it blank
  const role = roleInput.value.trim();

  // Pass undefined for blanks so makeCharacter's defaults take over.
  const newChar = makeCharacter(
    name,
    anime,
    powerValue ? Number(powerValue) : undefined,
    role ? role : undefined
  );

  // A NEW array with the newcomer added — we don't push into the old one.
  characters = [...characters, newChar];

  form.reset();
  search.value = "";
  render(characters);
});

render(characters);
