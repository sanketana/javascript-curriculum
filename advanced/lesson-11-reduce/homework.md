# Session 11 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has a `tracks` array and four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — reduce to a total.**
Add up every track's `plays` into one number, starting at `0`. You should get `6710`. This is the plain "running total" — the accumulator is a number.

**Task 2 — reduce to a winner.**
Find the *longest* track (most `seconds`) and log its title (`"Neon"`). Here the accumulator is a **track**, not a number — carry "the longest so far" and start it at `tracks[0]`.

**Task 3 — reduce to an object.**
Count how many tracks each artist has, starting at `{}`. Expected: `{ Lumen: 2, Halcyon: 2, Vesper: 1 }`. Remember the golden rule — **return the accumulator** each step, or the next step gets `undefined`.

**Task 4 — Bug hunt.**
The reduce that should total `plays` logs `undefined`. The reducer has a `{ }` body and never returns, so the accumulator is never updated — it stays `undefined` the whole way through (the `sum + t.plays` you compute each step is simply thrown away). Fix it — add a `return`, or drop the braces so the expression returns on its own.

## Stretch (optional)

Using one `reduce`, build a `{ totalPlays, totalSeconds }` summary object of the whole playlist in a single pass (start at `{ totalPlays: 0, totalSeconds: 0 }`). This is the "many stats, one pass" pattern — the same idea as the Receipt practice project.

Bring your finished `homework.js` to the next session. It's the Arc C **build day**: you'll combine `map`, `filter`, and `reduce` — plus `some`/`every` — into one finished data dashboard.
