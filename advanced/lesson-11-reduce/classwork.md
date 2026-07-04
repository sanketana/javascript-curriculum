# Session 11 — reduce

## Lesson Theme

`map` turned a list into another list. `filter` turned a list into a smaller list. Today's method turns a whole list into **one value** — a total, an average, a winner, a summary. `reduce` has a reputation for being the hard one, but it's really just a pattern you've already been using by hand — a running total — given a proper home. Learn it and you can compute *anything* from a list.

## What You'll Build

You turn the **Leaderboard** into a real analyzer by adding a **stats bar**: total points, average score, and the current top scorer — every number computed with `reduce`. This is the piece that makes the leaderboard feel finished, and it sets up next session's build day.

## Tools Used

- Visual Studio Code with the Live Server extension
- A modern browser and its developer console (F12)
- No libraries, no installs

## What You'll Learn

**JavaScript skills**
- `reduce` — combine a whole array into a single value using an **accumulator**
- The two parts: the **reducer** `(acc, item) => newAcc` and the **starting value**
- Reducing to a number (total), to an item (a winner), and to an object (a tally)
- Why you must **return the accumulator** every step

**Thinking skills**
- Seeing the "running total" pattern hiding in loops you've already written
- Choosing the right *starting value* for the job (`0`, `{}`, the first item)
- Recognising that `map` and `filter` are really special cases of `reduce`

## Concept Explainer: What `reduce` Really Is

**Start from something you already do.** You've written this shape many times — a running total in an outside variable:

```js
let total = 0;
players.forEach((p) => { total = total + p.score; });
```

There's a variable that *accumulates* (`total`), a starting value (`0`), and a rule for updating it each step (`total + p.score`). That's *exactly* what `reduce` is — it just moves the accumulator *inside* the method so the whole thing is one self-contained expression:

```js
const total = players.reduce((sum, p) => sum + p.score, 0);
//                            └── reducer ──┘         └ start
```

**The two pieces.** `reduce` takes a **reducer function** and a **starting value**. The reducer receives two things: the accumulator so far (`sum`) and the current item (`p`). Whatever it *returns* becomes the accumulator for the next item. The `0` at the end is where the accumulator starts.

**Trace it, step by step.** This is the whole secret — watch the accumulator travel:

| Step | `sum` coming in | current player | `sum + p.score` returned |
|------|-----------------|----------------|--------------------------|
| start | `0` | — | — |
| 1 | `0` | Aria (2400) | `2400` |
| 2 | `2400` | Kento (3100) | `5500` |
| 3 | `5500` | Diego (1800) | `7300` |
| 4 | `7300` | Mina (2750) | `10050` |
| 5 | `10050` | Ravi (2200) | `12250` |

The last value returned — `12250` — is what `reduce` gives back. That's it. Everything else is choosing what the accumulator *is* and how you update it.

**It's not only for numbers.** The accumulator can be anything. Start it at the first player and keep "the best so far", and you've found the top scorer. Start it at `{}` and add a key each step, and you've built a tally of players per team. Same machine, different starting value and rule.

**Where it comes from, and why it's the powerful one.** `reduce` is an old idea from functional programming, where it's often called **fold** — you "fold" a list down onto a single accumulated result, like folding a long strip of paper down to one square. It's considered the most *fundamental* of the array methods for a real reason: `map` and `filter` can both be built *out of* `reduce` (a `map` is a reduce that accumulates a new array; a `filter` is a reduce that only pushes items that pass). You won't do that in practice — `map` and `filter` are clearer for their jobs — but it's why people call `reduce` the "Swiss Army knife" of arrays. When no other method fits, `reduce` can always do it.

**The one rule people forget:** *always return the accumulator.* If your reducer has a `{ }` body and forgets to `return`, the next step gets `undefined` and everything falls apart. Keep that rule and `reduce` stops being scary.

## In Class

**0:00–0:12 — From running total to `reduce`**
Open `app.js` and show the `forEach` running-total version first — the thing they already know. Name its three parts (accumulator, start, update rule). Then reveal `reduce` as the same three parts packed into one line. Walk the trace table above slowly, out loud, pointing at how `sum` carries from row to row. This trace is the lesson; don't rush it.

**0:12–0:22 — Total and average on screen**
Compute `totalScore` with `reduce`, then `average` from it. Put both into the stats bar. Real numbers, from the data, in two lines. Have the student add a player and watch the total update with zero extra code.

*Predict-then-run:*

```js
const count = players.reduce((n) => n + 1, 0);   // ?  (5 — reduce doesn't have to use the item)
```

**0:22–0:38 — Reducing to a winner, and to an object**
Two accumulators that aren't numbers. First, "the best so far":

```js
const topPlayer = players.reduce((best, p) => (p.score > best.score ? p : best), players[0]);
```

Trace it: the accumulator is a *player*, and each step keeps whichever scored higher. Then the object accumulator — a tally per team:

```js
const byTeam = players.reduce((counts, p) => {
  counts[p.team] = (counts[p.team] || 0) + 1;
  return counts;      // <-- point hard at this line
}, {});
```

Make the "always return the accumulator" rule loud here — it's the `{ }`-body reducer where forgetting `return` bites. Add the top scorer to the stats bar.

**0:38–0:50 — Finish the stats bar**
Assemble the three stats (total, average, top scorer) into the bar, and render the board with `map` from Session 9. Step back: the leaderboard now *analyses*, not just displays. Every stat is a `reduce`.

**0:50–0:57 — Make it theirs**
The student adds a fourth stat with `reduce`: total wins, or the *lowest* scorer, or a count of players per team shown as text.

**0:57–1:00 — Reflection**

## Reflection

- What are the two things you give `reduce`, and what does the reducer function return?
- Walk the accumulator through a 3-item sum in your own words, like the trace table.
- One reducer forgot to `return` the accumulator. What goes wrong, and why?

## Starter Materials

Everything is in this lesson's `code/` folder:

- `index.html` — the Leaderboard with a stats bar; open with Live Server (keep the console open)
- `style.css` — styling for the stat tiles and rows (done for you)
- `app.js` — the running-total intro, then total/average/top-scorer/tally with reduce
- `homework.html` + `homework.js` — for homework; see `homework.md`
- `practice.html` — the optional extra-practice project (self-contained); see the next section

## Additional Practice Project — Receipt (for fast finishers)

*Optional. Reach for this when a student finishes the stats bar with time to spare.*

Build a **Receipt**: a shopping cart that prints line items and a total. Open `code/practice.html` with Live Server (one self-contained file).

The step up is a single `reduce` computing **several stats at once**:

1. **An object accumulator with two running totals.** One `reduce` walks the cart and keeps both the total money (`price × qty` summed) *and* the total number of units — in one pass, in one accumulator object `{ total, units }`.
2. **The starting value sets the shape.** The reduce starts at `{ total: 0, units: 0 }`, so the accumulator has both fields ready from step one. Choosing the starting value *is* choosing what you're building.
3. **`return acc` every step.** With a `{ }`-body reducer, this is the line that makes or breaks it — exactly the rule from class.

**Challenges to push further** (pick any):
- Add a `count` of distinct line items and show it too (all in the same reduce).
- Add a "most expensive line" to the accumulator (`price × qty`) and show it.
- Apply a 5% discount to the grand total (compute from the reduce result).

---

## Notes for the Teacher

**Setup check before the session**
- This is the hard-idea session of the arc. Budget time for the trace table — students who *see* the accumulator travel get `reduce`; students who only see the finished one-liner usually don't.

**Common student mistakes**
- **Forgetting to return the accumulator (the number-one bug).** A `{ }`-body reducer that doesn't `return` passes `undefined` forward — number totals come out `undefined`, and object builds crash (you try to read a key off `undefined`). This is the homework bug hunt. Drill the rule: *the reducer's return value IS the next accumulator.*
- **Forgetting or mis-choosing the starting value.** No start value makes `reduce` use the first item as the accumulator — which quietly changes behaviour and breaks object builds. Teach "always pass a starting value" (`0`, `{}`, or the first item on purpose).
- **Reaching for `reduce` when `map`/`filter` fit.** If you're making a new list, that's `map`/`filter`. `reduce` is for boiling *down* to a single value. Don't let its power tempt them to use it everywhere.
- **Confusing accumulator and item order.** It's `(accumulator, item)` — the running result first, the current element second. Getting them backwards is a common slip.

**Anticipated questions**
- *"Why is this called reduce?"* Because it *reduces* many values to one. In other languages it's "fold" — same idea. The name describes the shape of the result: many in, one out.
- *"Could I just use a `forEach` with an outside variable?"* Yes — and for a quick total that's fine. `reduce` shines when you want the whole computation self-contained (no stray variable), and it's the idiom other developers expect for "combine a list into a value".
- *"This feels harder than map and filter."* It is — honestly say so. It's the most general and the most flexible, which is exactly why it takes a beat longer to click. The trace table is the way in.

**Pacing note**
If the student is quick, have them reduce to something creative — a string that lists all names, or the team with more players. If that isn't enough, move them to the **Receipt** extra-practice project (`code/practice.html`), where one reduce tracks two totals at once. If the student is slower, land the session at "total and average on the stats bar" — a real, satisfying result — and treat the object-accumulator tally as a stretch you demo rather than one they write.
