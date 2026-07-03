// Character Card Explorer — Session 1: the data model
// We build the "brain" of the app first: the data.
// Next session we make it look good.

// 1. A single character, modelled as an object.
//    An object groups related values together under labels (keys).
const goku = {
  name: "Goku",
  anime: "Dragon Ball Z",
  power: 9001,
  role: "Fighter",
};

// Reading values back out — two ways:
console.log(goku.name);       // dot notation — what you'll use most
console.log(goku["power"]);   // bracket notation — needed when the key is in a variable

// 2. Real apps hold MANY things, so we keep characters in an array of objects.
//    This "array of objects" shape is the single most common shape of data on the web.
const characters = [
  { name: "Goku",   anime: "Dragon Ball Z",   power: 9001, role: "Fighter" },
  { name: "Mikasa", anime: "Attack on Titan", power: 8700, role: "Soldier" },
  { name: "Levi",   anime: "Attack on Titan", power: 9500, role: "Captain" },
  { name: "Nezuko", anime: "Demon Slayer",    power: 7200, role: "Demon"   },
];

console.log(`We have ${characters.length} characters.`);
console.log(characters[0].name);   // first character's name: pick the item, then the property

// 3. Property shorthand.
//    When your variable name already matches the key, you can drop the ": value".
function makeCharacter(name, anime, power, role) {
  // longhand: { name: name, anime: anime, power: power, role: role }
  return { name, anime, power, role };   // shorthand — same object, far less noise
}

const tanjiro = makeCharacter("Tanjiro", "Demon Slayer", 6800, "Slayer");
characters.push(tanjiro);

// 4. Show them on the page.
//    For now we build the HTML the "old" way, by gluing strings together with +.
//    Notice how awkward this is to read — we will fix exactly this next session.
const board = document.querySelector("#board");

function render(list) {
  let html = "";
  for (const c of list) {
    html += "<div class='card'>" +
              "<h2>" + c.name + "</h2>" +
              "<p>" + c.anime + "</p>" +
              "<p>Power: " + c.power + "</p>" +
              "<p>Role: " + c.role + "</p>" +
            "</div>";
  }
  board.innerHTML = html;
}

render(characters);
