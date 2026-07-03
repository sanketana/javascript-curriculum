// Session 5 Homework — Arrow Functions & Higher-Order Functions
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: convert to arrow functions ---
// Rewrite each of these as an arrow function stored in a const with the same name.
// Keep the behaviour identical.
function triple(n) {
  return n * 3;
}
function fullName(first, last) {
  return first + " " + last;
}
function isAdult(age) {
  return age >= 18;
}
// const triple = ...
// const fullName = ...
// const isAdult = ...


// --- Task 2: a higher-order function ---
// Write applyTwice(fn, value) that runs fn on value, then runs fn again on the
// result, and returns it. Example: applyTwice(triple, 2) → 18  (2→6→18)
// const applyTwice = ...
// console.log(applyTwice(triple, 2));   // 18


// --- Task 3: pass an anonymous function ---
// runLater takes a function and calls it after 500ms. Call runLater and pass it
// an ANONYMOUS arrow function that logs "Time's up!".
const runLater = (action) => {
  setTimeout(action, 500);
};
// runLater(...);


// --- Task 4: Bug hunt ---
// Each arrow function below is broken in a different way. They're commented out
// so the page still loads. Work out each fault, write a corrected version, and
// uncomment to test.
//   const half = n => => n / 2;               // bug 1: an extra =>
//   const welcome = (name) => { name + "!" };  // bug 2: block body returns nothing
//   const areaOf = w, h => w * h;              // bug 3: two params need ( )

// your corrected versions:
// const half = ...
// const welcome = ...
// const areaOf = ...
// console.log(half(10), welcome("Sam"), areaOf(3, 4));
