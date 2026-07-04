// Session 8 Homework — the `this` keyword
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: a method that uses this ---
// Write a "dog" object with a name of "Rex" and a speak() method that returns
// `${this.name} says woof`. Log dog.speak().
// const dog = ...
// console.log(dog.speak());   // "Rex says woof"


// --- Task 2: keep this through a delay ---
// counter.bump() adds one to counter.count. Make bump run after 100ms so it
// really increments counter.count — WITHOUT losing `this`.
// (Hint: setTimeout(counter.bump, 100) would break. Wrap it in an arrow.)
const counter = {
  count: 0,
  bump() {
    this.count = this.count + 1;
    console.log("count is now " + this.count);
  },
};
// setTimeout(...);   // should log "count is now 1"


// --- Task 3: an object that schedules itself ---
// Give "timer" an announce() method that logs `${this.label} fired`, then run it
// after 200ms with `this` still meaning timer.
const timer = {
  label: "Timer",
  // announce() { ... },
};
// setTimeout(...);   // should log "Timer fired"


// --- Task 4: Bug hunt ---
// gadget.report() is meant to log "Gizmo power 3", but it logs the wrong thing
// because the setTimeout uses a regular function, which loses `this`.
// Run it, see the bug, then fix it by making the callback an arrow function.
const gadget = {
  name: "Gizmo",
  power: 3,
  report() {
    setTimeout(function () {
      console.log(this.name + " power " + this.power);   // this is NOT gadget here
    }, 100);
  },
};
gadget.report();   // currently logs the wrong values — fix the callback above
