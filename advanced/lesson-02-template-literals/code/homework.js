// Session 2 Homework — Template Literals
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: rewrite with a template literal ---
// Rewrite this line using a backtick template literal instead of + signs.
// It should print exactly the same sentence.
const hero = "Mikasa";
const kills = 57;
console.log("Soldier " + hero + " recorded " + kills + " takedowns.");
// your version:
// console.log(`...`);


// --- Task 2: a multi-line profile ---
// Write a function profile(name, anime, power) that RETURNS a multi-line
// template literal that looks like this when logged:
//   Name: Levi
//   Anime: Attack on Titan
//   Power: 9500
function profile(name, anime, power) {
  // return `...`;
}
// console.log(profile("Levi", "Attack on Titan", 9500));


// --- Task 3: an expression inside ${ } ---
// Log ONE line that shouts the hero's name in capitals and doubles the kills,
// using expressions inside ${ }. Target output:  MIKASA scored 114!
// console.log(`...`);


// --- Task 4: Bug hunt ---
// Each line below is trying to be a template literal but is broken.
// Fix all three, then check the console.
const item = "Sword";
const cost = 300;
console.log('You bought a ${item}.');   // bug 1
console.log(`It cost $(cost) coins.`);  // bug 2
console.log(`Total: {cost} coins.`);    // bug 3
