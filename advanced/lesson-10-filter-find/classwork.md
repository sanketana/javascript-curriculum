# Session 10 — filter, find & findIndex

## Lesson Theme

Last session `map` transformed a whole list. Today you learn to *narrow* one. `filter` keeps the items that pass a test; `find` grabs the first item that matches; `findIndex` tells you where it is. Together they replace every "search this list by hand" loop you've written — including the exact one you wrote by hand back in the Session 4 build day.

## What You'll Build

You give the **Leaderboard** a **live search box**: type a name and the board narrows as you type. Under the hood it's a single `filter` call — the same job that took a whole `filterByText` loop (empty array, `for`, `if`, `push`) in Session 4. You'll also use `find` and `findIndex` to look up individual players.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- `filter` — keep every item that passes a test → a **new, smaller array**
- `find` — the **first** item that passes → the item itself, or `undefined`
- `findIndex` — the **position** of the first match → a number, or `-1`
- Choosing between them by what you want back: a list, an item, or a position

**Thinking skills**
- Reading a search loop and seeing the `filter` hiding inside it
- Knowing that `find` can return `undefined` — and guarding for it
- Matching the tool to the return type you need

## In Class

**0:00–0:08 — The search we wrote by hand**
Reopen Session 4's `filterByText`:

```js
function filterByText(list, query) {
  const result = [];
  for (const c of list) {
    if (c.name.toLowerCase().includes(query)) {
      result.push(c);
    }
  }
  return result;
}
```

Name the shape: empty array, loop, if, push, return. This is *keep the items that match* — and it has a one-line name we're about to learn.

**0:08–0:22 — `filter`: keep what passes**
`filter` runs a test function on each item and keeps the ones that return `true`:

```js
const strong = players.filter((p) => p.score >= 2500);
```

Put it right next to `filterByText`. The five-line loop is now one line, and it reads like its intent: *keep players scoring 2500+*. Stress two things: the test returns `true`/`false` (a "predicate"), and `filter` gives back a **new, smaller array** — the original is untouched, exactly like `map`.

*Predict-then-run:*

```js
players.filter((p) => p.team === "Red").map((p) => p.name);   // ?
```

Chaining `filter` then `map` — narrow, then transform. Let them see the two methods compose.

**0:22–0:36 — `find` and `findIndex`: get one**
Sometimes you don't want a smaller list — you want *one* thing. That's `find`:

```js
const aria = players.find((p) => p.name === "Aria");   // the player object
const nobody = players.find((p) => p.score > 9999);    // undefined — nobody matched
```

The crucial difference from `filter`: `find` returns the **item itself** (not an array), or `undefined` if nothing matches. Show the trap on purpose — `nobody.score` throws, because `nobody` is `undefined`. That's why you often guard: `if (aria) { … }`.

Then `findIndex`, which returns the **position** instead of the item:

```js
players.findIndex((p) => p.name === "Mina");   // 3
players.findIndex((p) => p.name === "Zoe");    // -1  (not found)
```

The `-1` is the "not found" signal — worth pointing at, since it's how you check existence.

**0:36–0:52 — The build: live search with `filter`**
Wire the search box. Every keystroke filters the players and re-renders with last session's `map(...).join("")`:

```js
search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const matches = players.filter((p) => p.name.toLowerCase().includes(query));
  render(matches);
});
```

Type "a" — the board narrows; clear it — everyone's back. Put it beside Session 4's hand-written version one more time. Same behaviour, and now the *intent* is one readable line. Add the empty-state so searching "zzz" says "No players match" rather than showing a blank board.

**0:52–0:57 — Make it theirs**
The student adds a second filter — only players with `wins >= 10`, or only one team — and combines it with the search (filter the filtered result). They feel how filters stack.

**0:57–1:00 — Reflection**

## Reflection

- `filter`, `find`, `findIndex` — what does each one give you *back*? (A list? An item? A number?)
- `find` can return `undefined`. When does that happen, and why must you be careful with the result?
- Your search box replaced the Session 4 loop. What did the loop do that `filter` now does in one line?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Leaderboard with a search box; open with Live Server (keep the console open)
- `style.css` — styling for the rows and empty state (done for you)
- `app.js` — filter/find/findIndex demos, then the live-search build
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Shop Filter (for fast finishers)

*Optional. Reach for this when a student finishes the live search with time to spare.*

Build a **Shop Filter**: a product grid you narrow by category, an "in stock only" toggle, and a search box — all at once. Open `code/practice.html` with Live Server (one self-contained file).

The step up is **combining filters**, which is how real shopping sites work:

1. **Filters that stack.** `render` starts with all products and narrows *step by step*: first by category, then by stock, then by the search text. Each `filter` passes its smaller result into the next. Read it top to bottom and you can see the list shrinking.
2. **Filters driven by different controls.** A click sets the category, a checkbox toggles stock, typing changes the search — and all three feed the same `render`. One source of truth, re-filtered on every change.
3. **An empty state.** When nothing survives all three filters, the grid says so instead of going blank.

**Challenges to push further** (pick any):
- Add a "under ₹1000" toggle as a fourth filter.
- Use `find` to show a "Featured: <first in-stock product>" line above the grid.
- Show how many products each category has next to its button.

---

## Notes for the Teacher

**Setup check before the session**
- Have Session 4's `filterByText` open. The lesson's spine is "you wrote this by hand; here's the one-liner."

**Common student mistakes**
- **`filter` vs `find` confusion (the big one).** `filter` always returns an **array** (even with one match, it's an array of one); `find` returns the **item**. Using `filter` and then `.name` gives `undefined` — this is the homework bug hunt. Rule of thumb: want a list → `filter`; want one → `find`.
- **Forgetting `find` can be `undefined`.** Calling `.property` on a missing result throws. When a lookup might fail, guard with `if (result)` first.
- **Returning a value instead of true/false in `filter`.** The test should be a condition. `filter((p) => p.score)` "works" by truthiness but is unclear — write the comparison: `p.score >= 2500`.
- **`findIndex` not-found is `-1`, not `undefined`.** A common slip is checking `if (index)` — but `0` is a valid index and falsy. Check `if (index !== -1)`.

**Anticipated questions**
- *"Can I chain these?"* Yes — `filter(...).map(...)` is extremely common (narrow, then transform). Show it once; they'll use it constantly.
- *"Is `filter` the same as the search I wrote in Session 4?"* Effectively yes — `filter` is that loop, named and packaged. That's the whole point of today.
- *"What if I want the LAST match, or to count matches?"* Last match: there's `findLast`, but skip it. Counting: `filter(...).length`. Keep the toolbox to today's three.

**Pacing note**
If the student is quick, have them stack filters (search + team + min wins) and confirm the original array is intact. If that isn't enough, move them to the **Shop Filter** extra-practice project (`code/practice.html`), which combines three filters from three controls. If the student is slower, land the session at "the search box narrows the board with one `filter` line" — the direct payoff to Session 4 — and leave `findIndex` for a quick recap.
