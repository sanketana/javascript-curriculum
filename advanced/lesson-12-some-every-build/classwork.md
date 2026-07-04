# Session 12 — some, every & the Arc C Build Day

## Lesson Theme

Two quick new methods answer yes/no questions about a whole list — *is any of them true?* (`some`) and *are all of them true?* (`every`). Then the rest of the session is a build day: you wire together everything from Arc C — `map`, `filter`, `reduce`, and today's `some`/`every` — into one live dashboard. This is where the five methods stop being separate tricks and become a single toolkit.

## What You'll Build

A **Playlist Analyzer**: a dashboard over a list of tracks that shows a stats bar (total time, total plays, average — via `reduce`), yes/no badges ("Has a viral hit", "All under 5 min" — via `some`/`every`), a live search box (via `filter`), and the track list itself (via `map`). Type in the search and *the whole dashboard recomputes* — stats, badges, and rows all narrow to what you searched.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- `some` — does **at least one** item pass the test? → `true`/`false`
- `every` — do **all** items pass the test? → `true`/`false`
- Combining `map` + `filter` + `reduce` + `some`/`every` in one render
- A "recompute the whole view from a list" pattern that scales

**Thinking skills**
- Matching the array method to the question: transform, narrow, boil down, or check
- Seeing a dashboard as one function of its data — change the data, re-render everything
- Consolidating a whole arc of tools into a mental checklist

## In Class

**0:00–0:12 — `some` and `every`**
These two are easy, so they come first. Show them in the console:

```js
tracks.some((t) => t.plays >= 1000000);    // true  — is ANY track over a million?
tracks.every((t) => t.seconds < 300);      // false — is EVERY track under 5 minutes?
```

Both take a test and return a plain `true`/`false`. `some` stops and returns `true` at the first match; `every` returns `false` at the first failure. Contrast with `filter` (which returns the matching *items*) — `some`/`every` answer a *yes/no question* about the whole list. Ask the student to predict two: "is any track by Vesper?" and "is every track over 3 minutes?", then check.

*Worth one mention:* `every` on an **empty** array is `true` (there's nothing to fail), and `some` on an empty array is `false`. This matters once search filters everything out.

**Checkpoint 1 — the render contract (0:12–0:22)**
Establish the day's backbone: one `render(list)` function that rebuilds the *entire* dashboard from whatever list it's given. Start it with just the rows, using `map` from Session 9:

```js
const render = (list) => {
  board.innerHTML = list.length ? list.map(trackRow).join("") : `<p class="empty">No tracks match.</p>`;
};
render(tracks);
```

The whole build hangs off this: everything else is more things `render` computes from `list`.

**Checkpoint 2 — the stats bar with `reduce` (0:22–0:34)**
Inside `render`, add the stats — total time, total plays, average — each a `reduce` (Session 11). Use the `formatDuration` helper so seconds show as `mm:ss`. Test by eye: the numbers appear and look right.

**Checkpoint 3 — the badges with `some`/`every` (0:34–0:44)**
Add the two yes/no badges, styled green for yes and red for no:

```js
const hasViral = list.some((t) => t.plays >= 1000000);
const allShort = list.every((t) => t.seconds < 300);
```

Because `Aurora` is 5:12, `allShort` is `false` for the full list — the badge goes red. A real, honest answer computed from the data.

**Checkpoint 4 — live search ties it together (0:44–0:54)**
Wire the search box with `filter` (Session 10), and have it call `render(matches)`. Now the magic moment: type "lumen" and *the entire dashboard* — rows, stats, and badges — recomputes for just Lumen's tracks. One `render` function, fed a filtered list, updates everything. Point out how each Arc C method is doing exactly one job in one place.

**0:54–0:58 — Make it theirs**
The student adds one more piece: a third badge (`every` track over 3 minutes?), or a "longest track" stat via `reduce`, or make search match a third field.

**0:58–1:00 — Reflection**

## Reflection

- `some`, `every`, and `filter` all take a test. What does each give back, and how do you choose?
- Typing in the search box updated the stats and badges too, not just the rows. Why did that happen with only one `render` function?
- Name the four Arc C methods and, in a few words each, the job each one does.

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Playlist Analyzer; open with Live Server
- `style.css` — styling for the stats, badges, and rows (done for you)
- `app.js` — some/every demos, then the full dashboard built in four checkpoints
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Weekly Steps Tracker (for fast finishers)

*Optional. Reach for this when a student finishes the Playlist Analyzer with time to spare.*

Build a **Weekly Steps Tracker**: seven days of step counts against a 10,000 goal, summarised into a dashboard. Open `code/practice.html` with Live Server (one self-contained file).

The step up is assembling the **whole Arc C toolkit yourself** in an unfamiliar domain:

1. **`reduce` twice** — once for the weekly total (and average), once more to find the best day.
2. **`filter`** — how many days hit the goal (`filter(...).length`).
3. **`some` and `every`** — "Had a 15k day?" and "Goal met every day?" as badges.
4. **`map`** — one row per day, tagged "goal met" or "under goal".

Nothing here is new syntax — it's the five methods from the last four sessions, working together, which is exactly the skill Arc C was building toward.

**Challenges to push further** (pick any):
- Add a "current streak" — how many days in a row (from the end) hit the goal.
- Let the user change the goal in an input and re-render everything.
- Add a `reduce` that finds the *worst* day too.

---

## Notes for the Teacher

**Setup check before the session**
- This is a build day *and* introduces `some`/`every`. Keep the earlier lessons handy — the student is meant to recognise `map`/`filter`/`reduce` as things they already know, with only `some`/`every` genuinely new.

**Common student mistakes**
- **`some`/`every` predicate that returns a value, not a test (the bug hunt).** `some((t) => t.seconds)` is always `true` because a non-zero number is truthy. The test must be a *comparison* — `t.seconds > 240`. This is the homework bug hunt.
- **Confusing `some` with `filter`.** `filter` gives back the matching items (an array); `some` gives back a single `true`/`false`. If you only need to know "is there any?", `some` is clearer and stops early.
- **Recomputing stats outside `render`.** If stats are computed once at the top instead of inside `render`, they won't update when the search filters the list. The whole point of the day is that `render` recomputes *everything* from its `list` argument.
- **`every` on an empty list is `true`.** After a search that matches nothing, `every` returns `true` (vacuously). Usually harmless here, but worth knowing when a "yes" badge appears on an empty board.

**Anticipated questions**
- *"Isn't `some` just `filter(...).length > 0`?"* Result-wise yes, but `some` says the intent ("is there any?") and stops at the first match instead of building a whole array. Prefer it for yes/no checks.
- *"Why rebuild the entire dashboard on every keystroke?"* Because it keeps the model dead simple: the screen is a function of the list. This is exactly the idea frameworks like React automate — the student is doing by hand what React does for you.

**Pacing note**
This is a full session even for a strong student if they type it. If they finish early, the **Weekly Steps Tracker** extra-practice project (`code/practice.html`) has them assemble all five methods themselves in a new domain. If the student is slower, land the session at **Checkpoints 1–3** (rows + stats + badges) and add live search at the start of next session — a working analyzer without search is still a real result. Either way, this closes Arc C: take a moment to name the five-method toolkit the student now owns.
