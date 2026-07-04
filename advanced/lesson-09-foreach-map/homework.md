# Session 9 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (F12 → Console). The file `code/homework.js` has a `tracks` array and four tasks in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — `forEach` for a side effect.**
Use `forEach` to log one line per track in the form `"Sunrise by Lumen"`. You're *doing* something for each track (logging), not building a new list — so `forEach` is the right tool.

**Task 2 — `map` to values.**
Use `map` to build an array of just the titles and log it. You should get `["Sunrise", "Drift", "Neon", "Echoes"]` — a new array, same length, transformed contents.

**Task 3 — `map` to new objects.**
Use `map` to build a new array where each track gains a `minutes` field (`(seconds / 60).toFixed(1)`). Then log `tracks[0].minutes` — it should be `undefined`, proving you built a *new* array and left the original tracks untouched.

**Task 4 — Bug hunt.**
The `labels` map is meant to produce `["Sunrise — Lumen", …]` but gives an array of `undefined`. The mapping function has a `{ }` body — what's missing? Fix it so the labels come out right. (Two valid fixes: add a `return`, or remove the braces.)

## Stretch (optional)

Render the tracks to the homework page instead of just logging. Add a `<div id="list"></div>` to `homework.html`, then set its `innerHTML` to `tracks.map(t => \`<p>${t.title} — ${t.artist}</p>\`).join("")`. This is the exact render pattern from class, in a new context.

Bring your finished `homework.js` to the next session — we add `filter` and `find`, so the leaderboard can *search* and *narrow* as well as display.
