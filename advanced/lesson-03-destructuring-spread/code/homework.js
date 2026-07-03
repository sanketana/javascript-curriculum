// Session 3 Homework — Destructuring, Spread/Rest, Defaults
// Open homework.html with Live Server, then open the console (F12) to check your work.

const fighter = { name: "Levi", anime: "Attack on Titan", power: 9500, role: "Captain" };

// --- Task 1: destructure ---
// In ONE line, pull name and power out of "fighter" into their own variables,
// then log:  Levi has 9500 power
// const { ... } = fighter;
// console.log(`...`);


// --- Task 2: object spread (no mutation) ---
// Write buffPower(character) that returns a NEW object just like the one passed in,
// but with power increased by 1000. It must NOT change the original.
function buffPower(character) {
  // return { ... };
}
// const stronger = buffPower(fighter);
// console.log(stronger.power);   // 10500
// console.log(fighter.power);    // still 9500 — proof you didn't mutate it


// --- Task 3: default parameters ---
// Write makeItem(name, price = 100, rarity = "common") that returns an object
// with those three keys. Test it with only a name, then with all three.
function makeItem(name, price, rarity) {
  // return { ... };
}
// console.log(makeItem("Potion"));                 // price 100, rarity "common"
// console.log(makeItem("Excalibur", 9999, "legendary"));


// --- Task 4: Bug hunt ---
// Two lines below are broken. They're commented out so the page still loads.
// Work out WHY each is wrong, then write corrected versions and uncomment them.
const squadA = ["Goku", "Mikasa"];
const squadB = ["Frieza", "Muzan"];

// const [a, b] = fighter;            // bug: using [ ] to destructure an OBJECT
// const merged = [squadA, squadB];   // bug: this NESTS the arrays instead of merging them

// your corrected versions:
// const { name, power } = fighter;
// const merged = [ ... ];
// console.log(merged.length);        // should be 4, not 2
