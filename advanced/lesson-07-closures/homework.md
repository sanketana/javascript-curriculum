# Session 7 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — A greeter that remembers.**
Write `makeGreeter(greeting)` that returns a function. The returned function takes a `name` and returns `"<greeting>, <name>!"`. Make one greeter with `"Hello"` and call it with two different names — it should remember the greeting both times. That "remembering" is the closure.

**Task 2 — A multiplier factory.**
Write `makeMultiplier(factor)` that returns a function multiplying its input by `factor`. Build a `double` and a `triple` from it and confirm they don't interfere — each closure holds its own `factor`.

**Task 3 — Private state (a mini bank).**
Write `makeAccount(start)` that keeps a **private** balance and returns an object with `deposit(amount)` and `balance()`. The balance must only change through `deposit` — there should be no way to set it directly from outside. This is closure privacy doing a real job.

**Task 4 — Bug hunt.**
`makeBrokenCounter` should count 1, 2, 3 across calls but prints 1, 1, 1. There's one thing in the wrong place. Ask yourself: *does the line `let count = 0` run once, or every single call?* Move it so the count is remembered, and confirm you get 1, 2, 3.

## Stretch (optional)

Add a `withdraw(amount)` method to your `makeAccount` from Task 3 that refuses to let the balance go below zero (returns the balance unchanged and logs a warning if there aren't enough funds). Notice you're adding a new *public door* to the same *private* balance.

Bring your finished `homework.js` to the next session — we tackle `this`, the last and most confusing piece of the "functions" puzzle.
