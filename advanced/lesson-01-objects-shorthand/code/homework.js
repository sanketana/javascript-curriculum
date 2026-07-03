// Session 1 Homework — Character Card Explorer
// Open homework.html with Live Server, then open the console (F12) to check your work.
// Do the tasks in order. Uncomment the log lines as you go.

// --- Task 1: your own character ---
// Create an object called "myHero" with these four keys: name, anime, power, role.
// Then log its name using DOT notation and its power using BRACKET notation.

// const myHero = ...
// console.log(myHero.name);
// console.log(myHero["power"]);


// --- Task 2: an array of three villains ---
// Make an array called "villains" holding three character objects
// (same four keys). Then log how many villains there are.

// const villains = ...
// console.log(`There are ${villains.length} villains.`);


// --- Task 3: property shorthand ---
// Finish makeVillain so it RETURNS an object using shorthand
// (no "key: value" repetition).
function makeVillain(name, anime, power, role) {
  // return ...
}


// --- Task 4: Bug hunt ---
// listNames is meant to log every character's name, but it has TWO bugs.
// Find and fix them, then uncomment the last line to test it on your villains.
// Hint: check the loop variable, and how you read a property off an object.
function listNames(chars) {
  for (const c of char) {
    console.log(c[name]);
  }
}

// listNames(villains);
