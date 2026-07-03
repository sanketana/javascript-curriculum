// Session 7 Homework — Closures
// Open homework.html with Live Server, then open the console (F12) to check your work.

// --- Task 1: a greeter that remembers its greeting ---
// Write makeGreeter(greeting) that RETURNS a function. The returned function
// takes a name and returns `${greeting}, ${name}!`.
// Example: const hi = makeGreeter("Hello"); hi("Sam") → "Hello, Sam!"
// const makeGreeter = ...
// const hi = makeGreeter("Hello");
// console.log(hi("Sam"));      // "Hello, Sam!"
// console.log(hi("Aria"));     // "Hello, Aria!" — it REMEMBERED "Hello"


// --- Task 2: a multiplier factory ---
// Write makeMultiplier(factor) that returns a function multiplying its input by
// factor. Make a "double" and a "triple" from it; they must not interfere.
// const makeMultiplier = ...
// const double = makeMultiplier(2);
// const triple = makeMultiplier(3);
// console.log(double(5), triple(5));   // 10 15


// --- Task 3: private state (a mini bank) ---
// Write makeAccount(start) that keeps a PRIVATE balance and returns an object
// with deposit(amount) and balance(). There should be no way to set the balance
// directly from outside — only through deposit.
// const makeAccount = ...
// const acc = makeAccount(100);
// acc.deposit(50);
// console.log(acc.balance());   // 150


// --- Task 4: Bug hunt ---
// makeBrokenCounter is meant to count 1, 2, 3 across calls, but it prints 1, 1, 1.
// Find the one-line fault (where does "count" live?) and fix it.
const makeBrokenCounter = () => {
  return () => {
    let count = 0;          // think: does this run once, or every call?
    count = count + 1;
    return count;
  };
};
const c = makeBrokenCounter();
console.log(c(), c(), c());   // currently 1 1 1 — should be 1 2 3
