# Session 4 — Homework

This is a build day, so your homework *extends the app you built in class* rather than separate console exercises. Open `code/index.html` with Live Server and edit `code/app.js`. Spend about 40 minutes.

Do these in order — each builds on the last, and all of them use only Arc A tools (no new syntax).

**Task 1 — Sort by power (a plain loop, no `.sort()` yet).**
Add a button labelled "Strongest first" that re-renders the characters from highest power to lowest. Write your own `sortByPower(list)` that returns a *new* sorted array using a loop (a simple selection sort is fine). Do not change the original `characters` array — return a fresh one, the same immutable habit as spread.

**Task 2 — Filter by minimum power.**
Add a number input "Min power". When it changes, show only characters whose power is at least that number. Reuse the "make a smaller list, then `render` it" pattern from search. Bonus: make search and min-power work *together* (filter by text, then filter that result by power).

**Task 3 — A "power up" button on the whole roster.**
Add a button that gives every character +500 power and re-renders. Build the new roster immutably: loop over `characters`, and for each one push `{ ...c, power: c.power + 500 }` into a new array, then assign it back. Watch every power bar grow.

**Task 4 — Guard against empty adds.**
Right now the form requires name and anime via HTML. Add a JavaScript check too: if the trimmed name is empty, don't add — just return early. Test by trying to add a character whose name is only spaces.

## Stretch (optional)

Make the roster survive a refresh with `localStorage`: after every change, save `characters` with `localStorage.setItem("characters", JSON.stringify(characters))`, and load it on start. (We'll cover `JSON.stringify` properly in Arc E — this is just a preview if you're curious.)

Bring your extended `app.js` to the next session. Arc B begins, and we start looking closely at *functions themselves*.
