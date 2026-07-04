# Session 9 — forEach & map

## Lesson Theme

Since Arc A you've written the same loop over and over: start an empty string, walk a list with `for...of`, glue on a bit of HTML each time. It works, but it's noisy, and it's the same shape every single time. Today you meet the two array methods that make that pattern vanish — and you start Arc C, where the whole game is transforming arrays of data into exactly the shape you need.

## What You'll Build

A **Leaderboard** — the first piece of Arc C's data project. You'll render a table of players straight from an array using `map`, log and inspect the data with `forEach`, and feel how one line of `map(...).join("")` replaces the entire `let html = ""` loop you've been writing for eight sessions.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- `forEach` — run a function once for each item, for **side effects** (logging, updating)
- `map` — transform each item into a new one, returning a **new array**
- Why `map` is the natural way to turn data into HTML: `list.map(row).join("")`
- That `map` never changes the original array (the immutability habit, continued)

**Thinking skills**
- Choosing between "do something for each" (`forEach`) and "make a new list" (`map`)
- Seeing a loop's *intent* (transform vs act) instead of just its mechanics
- Recognising that most "loop over data and build something" tasks are really a `map`

## In Class

**0:00–0:08 — The loop we're about to delete**
Open Arc A's `render` (Session 2 or 4) and put the old shape on screen:

```js
let html = "";
for (const c of list) {
  html += cardHTML(c);
}
board.innerHTML = html;
```

Ask: how many times have you written almost exactly this? Name the ceremony — the empty string, the loop, the `+=`. Promise it's about to become one line. That anticipation is the hook.

**0:08–0:20 — `forEach`: do something for each**
Start with the gentler of the two. `forEach` runs a function once per item:

```js
players.forEach((p) => {
  console.log(`${p.name} has ${p.score} points`);
});
```

Emphasise what it's *for*: side effects — logging, updating something, reacting. It hands each item to your function and returns **nothing** (`undefined`). It's the `for...of` loop wearing nicer clothes. Have the student `forEach` to log a custom line.

*Predict-then-run:*

```js
const result = players.forEach((p) => p.name);
console.log(result);   // ?  (undefined — forEach doesn't build a value)
```

That `undefined` is the whole point: `forEach` acts, it doesn't produce.

**0:20–0:34 — `map`: make a new list**
Now the powerful one. `map` also visits every item, but it **collects** what your function returns into a brand-new array:

```js
const names = players.map((p) => p.name);
console.log(names);   // ["Aria", "Kento", "Diego", "Mina"]
```

Draw the picture: `map` takes an array of players and a "player → name" function, and gives back an array of names — same length, transformed contents. Show it building objects too, using spread from Session 3:

```js
const withBadges = players.map((p) => ({ ...p, badge: p.wins >= 15 ? "star" : "none" }));
```

Stress twice: `map` returns a **new** array; `players` is untouched. Verify with `console.log(players)` — unchanged.

**0:34–0:50 — The payoff: rendering with `map().join("")`**
Bring it home. A row is just a player transformed into an HTML string — that's a `map`. Then `join("")` glues the array of strings into one:

```js
const playerRow = (p) => `<div class="row">…${p.name}…</div>`;
board.innerHTML = players.map(playerRow).join("");
```

Run it — the leaderboard appears. Put it beside the Arc A loop from the opening. Same result, but the *intent* is now visible in one line: take the array, map each player to a row, join. Let the student sit with how much ceremony disappeared. Have them add a player to the array and watch the row appear with zero extra code.

**0:50–0:57 — Make it theirs**
The student maps the data a new way: an array of `"name: score"` strings, or a row that shows a "hot" tag when `wins >= 15`. Each is a small change to the mapping function.

**0:57–1:00 — Reflection**

## Reflection

- In one sentence each: what is `forEach` for, and what is `map` for?
- `map` gave back a new array and left the original alone. Why is that a good thing?
- The rendering line was `players.map(playerRow).join("")`. Explain what each of the three steps does.

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Leaderboard; open with Live Server (keep the console open)
- `style.css` — styling for the rows (done for you)
- `app.js` — forEach and map demos, then the map-based render
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Gradebook (for fast finishers)

*Optional. Reach for this when a student finishes the Leaderboard with time to spare.*

Build a **Gradebook**: a list of students with marks, each shown with a letter grade, plus a "how many passed" summary. Open `code/practice.html` with Live Server (one self-contained file).

The step up is `map` and `forEach` each doing a slightly bigger job:

1. **`map` with a helper.** `toGrade(marks)` turns a number into `"A"`/`"B"`/`"C"`/`"F"`, and the `map` uses it to give every student a new `grade` field — a derived value computed from existing data. This "add a computed field with map" move is everywhere in real apps.
2. **`map` then render.** The graded array is mapped again into rows and `join`ed — the same payoff pattern as class, chained.
3. **`forEach` to aggregate.** A `forEach` walks the students and counts how many passed into a running total, then shows "X of Y passed".

**Challenges to push further** (pick any):
- Add a `map` that produces the class's marks only, and show the highest (loop or `Math.max(...marks)`).
- Colour a row's grade differently for an "A" vs an "F" (the starter already has classes — use them).
- Add a second summary line: how many scored an "A".

---

## Notes for the Teacher

**Setup check before the session**
- Have an Arc A lesson open (Session 2 or 4) so the old `let html = ""` loop is visible for the before/after. The whole lesson is that contrast.

**Common student mistakes**
- **The block-body `return` trap (the big one).** `players.map((p) => { p.name })` returns an array of `undefined` — a `{ }` body needs an explicit `return`, or drop the braces: `(p) => p.name`. This is the homework bug hunt and it *will* happen in class. Same rule as Session 5's arrow functions, now biting inside `map`.
- **Using `map` when they mean `forEach`.** If you're not using the returned array, you want `forEach`. Using `map` just to log is a "code smell" — it builds an array of `undefined` and throws it away.
- **Forgetting `.join("")`.** Setting `innerHTML` to the *array* from `map` inserts commas between items (arrays stringify with commas). `join("")` is what glues them cleanly.
- **Expecting `map` to change the original.** It doesn't — it returns a new array. If they want the change to stick, they must assign it somewhere.

**Anticipated questions**
- *"Is `map` faster than a `for` loop?"* Speed isn't the point — clarity is. `map` says "transform this list" in a way a reader (and you, next week) understands instantly. Don't get drawn into micro-benchmarks.
- *"Can I still use a normal loop?"* Yes, and sometimes it's clearer. But for "turn this list into that list" or "turn this list into HTML", `map` is the idiom every codebase uses. React renders lists with `map` constantly — they're learning the real thing.
- *"What are the extra arguments I've seen, like index?"* `map` and `forEach` also pass the index and the whole array. Mention it exists; they'll use the index when they need it. Don't overload today.

**Pacing note**
If the student is quick, have them chain a couple of maps (add a field, then render) and confirm the original array is intact. If that isn't enough, move them to the **Gradebook** extra-practice project (`code/practice.html`), which adds a map-with-helper and a forEach aggregate. If the student is slower, land the session at "the leaderboard renders from one `map().join('')` line" — that alone is a satisfying, real payoff.
