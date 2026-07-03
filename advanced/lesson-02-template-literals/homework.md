# Session 2 — Homework

Spend about 30–40 minutes on this before the next session. Everything runs in the browser — no installs.

**How to work:** open `code/homework.html` with Live Server, then open the console (press F12, then click "Console"). The file `code/homework.js` has four tasks with instructions in the comments. Uncomment the lines as you finish each task.

## The tasks

**Task 1 — Rewrite with a template literal.**
Take the `+`-glued sentence and rewrite it using a backtick template literal. Your version should print exactly the same sentence — you're changing *how* it's built, not *what* it says.

**Task 2 — A multi-line profile.**
Write `profile(name, anime, power)` so it returns a **multi-line** template literal. When logged it should read across three lines: `Name: …`, `Anime: …`, `Power: …`. Let the backticks do the line breaks for you — no `\n`.

**Task 3 — An expression inside `${ }`.**
Log one line that both shouts the hero's name in capitals and doubles the kills, using expressions inside `${ }`. Target output: `MIKASA scored 114!`. (Hints: `.toUpperCase()` and `kills * 2`.)

**Task 4 — Bug hunt.**
Three lines are each *trying* to be a template literal but are broken in a different way. Fix all three so they print sensible sentences with the real values filled in.
- One uses the wrong kind of quote.
- One uses the wrong bracket after the dollar sign.
- One is missing something small but essential.

## Stretch (optional)

Go back to the main `app.js` (Session 2) and give `cardHTML` one more interpolated field of your own — maybe a `<p>` that shows `${c.name}'s power is ${c.power > 8000 ? "elite" : "solid"}`. Confirm every card updates.

Bring your finished `homework.js` to the next session.
