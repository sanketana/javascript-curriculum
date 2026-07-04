# Session 10 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has a `tracks` array and four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — `filter`.**
Build `popular` — every track with `plays` of 1000 or more — and log the titles. You should get `["Sunrise", "Neon", "Pulse"]`. Remember `filter` gives back a new array; the test just needs to return `true` or `false`.

**Task 2 — `find`.**
Find the *first* track by `"Halcyon"` and log its title (`"Drift"`). Note you get the track object itself back, so you can read `.title` straight off it.

**Task 3 — `findIndex` and the `-1` check.**
Log the index of the track titled `"Echoes"`. Then search for `"Ghost"` (which isn't there) — its index is `-1`. Write an `if` that logs `"not found"` when the index is `-1`. (Careful: check `=== -1`, not just falsy — index `0` is a real position.)

**Task 4 — Bug hunt.**
The code wants the single `"Neon"` track so it can log its `plays`, but it used `filter`, which returns an **array** — so `.plays` is `undefined`. Swap it to the right method so `neon.plays` reads `2600`.

## Stretch (optional)

Add a search box to the homework page that filters `tracks` by title *or* artist as you type (reuse the class pattern: `filter` + `includes` on both fields with `||`). Render matches with `map(...).join("")`. You're now combining Session 9 and Session 10 into a real search feature.

Bring your finished `homework.js` to the next session — we meet `reduce`, the array method that boils a whole list down to a single value (a total, an average, a winner).
