# Session 8 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — A method that uses `this`.**
Write a `dog` object with `name` `"Rex"` and a `speak()` method returning `"Rex says woof"` using `this.name`. Log `dog.speak()`. Notice the object is right before the dot, so `this` is the dog.

**Task 2 — Keep `this` through a delay.**
`counter.bump()` increments `counter.count`. Make it run after 100ms so it really updates the counter — *without* losing `this`. Passing `counter.bump` straight to `setTimeout` would break it; wrap the call in an arrow instead.

**Task 3 — An object that schedules itself.**
Give `timer` an `announce()` method that logs `"Timer fired"` using `this.label`, then run it after 200ms with `this` still meaning `timer`.

**Task 4 — Bug hunt.**
`gadget.report()` should log `"Gizmo power 3"` but logs the wrong values, because its `setTimeout` uses a **regular** function, which gets its own `this`. Run it, see the bug, then change that callback to an **arrow** function so it borrows the right `this`.

## Stretch (optional)

Go back to the Widget Workshop stopwatch. Add a `lap()` method that pushes the current `this.seconds` into a `this.laps` array and logs all laps so far. Wire it to a new "Lap" button (remember: `() => stopwatch.lap()`). You're adding one more method that leans on `this`.

Bring your finished `homework.js` to the next session. **Arc B is complete.** Next we open Arc C and start *wrangling data* — taking whole arrays of objects and transforming them with `forEach` and `map`, the tools that will finally replace the hand-written loops you've been using since Arc A.
